import type { MetadataRoute } from "next";
import { products } from "./data/products";
import { specialties } from "./data/specialties";
import { guides } from "./data/guides";
import { industries } from "./data/industries";
import { filterSizes } from "./data/sizes";
import { services } from "./data/services";

const BASE_URL = "https://evergreen-filter.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const specialtyPages: MetadataRoute.Sitemap = specialties.map((s) => ({
    url: `${BASE_URL}/medical/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE_URL}/guide/${g.slug}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${BASE_URL}/industry/${i.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const sizePages: MetadataRoute.Sitemap = filterSizes.map((s) => ({
    url: `${BASE_URL}/size/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/service/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/medical`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...specialtyPages,
    ...industryPages,
    {
      url: `${BASE_URL}/size`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...sizePages,
    {
      url: `${BASE_URL}/service`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...servicePages,
    ...productPages,
    {
      url: `${BASE_URL}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guidePages,
    {
      url: `${BASE_URL}/guide`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/glossary`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/cases`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/quote`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
