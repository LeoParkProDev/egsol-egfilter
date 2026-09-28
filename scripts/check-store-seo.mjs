#!/usr/bin/env node

const baseUrl = process.argv[2]?.replace(/\/$/, "");
if (!baseUrl) {
  console.error("Usage: node scripts/check-store-seo.mjs <base-url>");
  process.exit(2);
}

const expectedFamilies = ["pre-filter", "hepa-filter", "medium-filter", "roll-filter"];
const productionOrigin = "https://evergreen-filter.vercel.app";
const familyHrefBySlug = new Map();
const sizeFamilyByPath = new Map();
const [{ storeCatalogByCode }, { filterSizes }] = await Promise.all([
  import("../app/data/store-catalog.ts"),
  import("../app/data/sizes.ts"),
]);
const errors = [];
const pages = new Map();

async function fetchText(path) {
  const url = new URL(path, `${baseUrl}/`);
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${url.pathname}: HTTP ${response.status}`);
  return response.text();
}

function hrefs(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
}

function anchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>/gi)].map((match) => {
    const attributes = Object.fromEntries(
      [...match[1].matchAll(/([\w-]+)=["']([^"']*)["']/g)].map((attribute) => [
        attribute[1].toLowerCase(),
        attribute[2].replaceAll("&amp;", "&"),
      ]),
    );
    return attributes;
  });
}

function canonicalHref(html) {
  return html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i)?.[1];
}

function jsonLdValues(html, path) {
  const values = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      values.push(JSON.parse(match[1]));
    } catch {
      errors.push(`${path}: malformed JSON-LD block`);
    }
  }
  return values;
}

function hasOffers(value) {
  if (!value || typeof value !== "object") return false;
  return Object.entries(value).some(([key, nested]) =>
    key.toLowerCase() === "offers" || hasOffers(nested),
  );
}

function checkPage(path, html) {
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) errors.push(`${path}: expected exactly one H1`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) errors.push(`${path}: missing title`);
  const description = html.match(/<meta\b(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']([^"']*)["'])[^>]*>/i)?.[1]?.trim();
  if (!description) errors.push(`${path}: missing or empty meta description`);
  const canonical = canonicalHref(html);
  const canonicalUrl = canonical ? new URL(canonical, `${baseUrl}/`) : null;
  if (!canonicalUrl || canonicalUrl.origin !== productionOrigin || canonicalUrl.pathname !== path || canonicalUrl.search || canonicalUrl.hash) {
    errors.push(`${path}: missing or incorrect canonical`);
  }
  const structuredData = jsonLdValues(html, path);
  if (structuredData.length === 0) errors.push(`${path}: no parseable JSON-LD found`);
  if (structuredData.some(hasOffers)) errors.push(`${path}: JSON-LD contains an Offers field`);
  pages.set(path, { html, title, description });
}

try {
  const [hubHtml, sitemapXml] = await Promise.all([fetchText("/products"), fetchText("/sitemap.xml")]);
  checkPage("/products", hubHtml);

  const hubAnchors = anchors(hubHtml);
  const hubLinks = hubAnchors.filter((anchor) => anchor.href).map((anchor) => new URL(anchor.href, `${baseUrl}/`).pathname);
  for (const slug of expectedFamilies) {
    if (!hubLinks.includes(`/products/${slug}`)) errors.push(`/products: missing family link /products/${slug}`);
    const storeCta = hubAnchors.find((anchor) =>
      anchor["data-cta-placement"] === "product_hub_store" && anchor["data-product-category"] === slug,
    );
    if (!storeCta) {
      errors.push(`/products: missing tracked product_hub_store CTA for ${slug}`);
    } else {
      familyHrefBySlug.set(slug, new URL(storeCta.href, `${baseUrl}/`).href);
    }
  }
  const sizeLinks = [...new Set(hubLinks.filter((path) => /^\/size\/[^/]+$/.test(path)))];
  if (sizeLinks.length !== 23) errors.push(`/products: expected 23 unique size links, found ${sizeLinks.length}`);

  const sitemapLocations = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
  const sitemapPaths = new Set(sitemapLocations.map((url) => url.pathname));
  const productHubCount = sitemapLocations.filter((url) => url.pathname === "/products").length;
  if (productHubCount !== 1) errors.push(`/sitemap.xml: expected /products exactly once, found ${productHubCount}`);
  for (const path of ["/products", ...expectedFamilies.map((slug) => `/products/${slug}`), ...sizeLinks]) {
    if (!sitemapPaths.has(path)) errors.push(`/sitemap.xml: missing ${path}`);
  }

  for (const familySlug of expectedFamilies) {
    const section = hubHtml.match(new RegExp(`<section\\b(?=[^>]*\\bid=["']${familySlug}["'])[^>]*>([\\s\\S]*?)<\\/section>`, "i"))?.[1];
    if (!section) {
      errors.push(`/products: missing product family section ${familySlug}`);
      continue;
    }
    for (const href of hrefs(section)) {
      const url = new URL(href, `${baseUrl}/`);
      if (/^\/size\/[^/]+$/.test(url.pathname)) sizeFamilyByPath.set(url.pathname, familySlug);
    }
  }

  const detailPaths = [
    ...expectedFamilies.map((slug) => `/products/${slug}`),
    ...sizeLinks,
  ];
  const results = await Promise.all(detailPaths.map(async (path) => [path, await fetchText(path)]));
  for (const [path, html] of results) {
    checkPage(path, html);
    const productSlug = path.startsWith("/products/") ? path.split("/").at(-1) : sizeFamilyByPath.get(path);
    const expectedPlacement = path.startsWith("/products/") ? "product_category_top" : "size_page_top";
    const expectedHref = familyHrefBySlug.get(productSlug);
    const topCta = anchors(html).find((anchor) => anchor["data-cta-placement"] === expectedPlacement);
    if (!topCta) {
      errors.push(`${path}: missing ${expectedPlacement} Smartstore CTA`);
    } else {
      const actualHref = new URL(topCta.href, `${baseUrl}/`).href;
      const productCode = topCta["data-product-code"];
      if (path.startsWith("/size/") && productCode) {
        const sizeSlug = path.split("/").at(-1);
        const size = filterSizes.find((entry) => entry.slug === sizeSlug);
        const verifiedProduct = storeCatalogByCode[productCode];
        if (!size || size.variants.length !== 1 || size.variants[0].code !== productCode) {
          errors.push(`${path}: direct product CTA code is not the sole registered size variant`);
        } else if (!verifiedProduct || actualHref !== verifiedProduct.url) {
          errors.push(`${path}: direct product CTA URL does not match the verified catalog mapping for ${productCode}`);
        }
      } else if (productCode) {
        errors.push(`${path}: product code is only allowed on a verified single-variant size page`);
      } else if (!productSlug || !expectedHref || actualHref !== expectedHref) {
        errors.push(`${path}: ${expectedPlacement} CTA does not link to its expected product family category`);
      }
    }

    if (path.startsWith("/size/")) {
      const sizeSlug = path.split("/").at(-1);
      const size = filterSizes.find((entry) => entry.slug === sizeSlug);
      const variantCtas = anchors(html).filter((anchor) => anchor["data-cta-placement"] === "size_variant");
      if (!size || variantCtas.length !== size.variants.length) {
        errors.push(`${path}: size_variant CTA count does not match its registered options`);
      } else {
        const familySlug = sizeFamilyByPath.get(path);
        const categoryHref = familyHrefBySlug.get(familySlug);
        for (const variantCta of variantCtas) {
          const productCode = variantCta["data-product-code"];
          const actualHref = new URL(variantCta.href, `${baseUrl}/`).href;
          if (productCode) {
            const variant = size.variants.find((entry) => entry.code === productCode);
            const verifiedProduct = storeCatalogByCode[productCode];
            if (!variant || !verifiedProduct || actualHref !== verifiedProduct.url) {
              errors.push(`${path}: size_variant CTA code/URL does not match its registered variant and verified catalog URL`);
            }
          } else if (!categoryHref || actualHref !== categoryHref) {
            errors.push(`${path}: size_variant CTA without a verified product code must use its family category URL`);
          }
        }
      }
    }
  }

  const titles = new Map();
  for (const [path, page] of pages) {
    if (!page.title) continue;
    const paths = titles.get(page.title) ?? [];
    paths.push(path);
    titles.set(page.title, paths);
  }
  for (const [title, paths] of titles) {
    if (paths.length > 1) errors.push(`duplicate title "${title}": ${paths.join(", ")}`);
  }
  const descriptions = new Map();
  for (const [path, page] of pages) {
    if (!page.description) continue;
    const paths = descriptions.get(page.description) ?? [];
    paths.push(path);
    descriptions.set(page.description, paths);
  }
  for (const [description, paths] of descriptions) {
    if (paths.length > 1) errors.push(`duplicate meta description on ${paths.join(", ")}: "${description}"`);
  }
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

if (errors.length) {
  console.error(`Store SEO check failed (${errors.length} issue${errors.length === 1 ? "" : "s"}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Store SEO check passed: /products, 4 product pages, and 23 size pages at ${baseUrl}`);
