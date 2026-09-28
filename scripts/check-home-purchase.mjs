import assert from 'node:assert/strict';

// Catches missing/misdirected purchase links when homepage cards are redesigned.
const base = process.argv[2];
assert.ok(base, 'Usage: node scripts/check-home-purchase.mjs <base-url>');
const response = await fetch(new URL('/', base));
assert.equal(response.status, 200);
const html = await response.text();
const cards = [...html.matchAll(/<a\b[^>]*data-cta-placement="home_product_store"[^>]*>/g)].map(([tag]) => {
  const attr = (name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1]?.replaceAll('&amp;', '&');
  return { category: attr('data-product-category'), href: attr('href') };
});
const expected = {
  'pre-filter': '9728cdd20dc84ebdbee8601bd21e49b5',
  'hepa-filter': '73f05f21f01145c2b5bcef71caa81639',
  'medium-filter': 'fa2d50909bf8410b9fa379356a84f429',
  'roll-filter': 'd060caacb48a4cb3ab9c86678374422a',
};
assert.equal(cards.length, 4, 'Each homepage product family needs its own tracked purchase link');
for (const [category, id] of Object.entries(expected)) {
  const matches = cards.filter(card => card.category === category);
  assert.equal(matches.length, 1, `Missing/duplicate ${category} purchase link`);
  const destination = new URL(matches[0].href);
  assert.equal(destination.origin, 'https://smartstore.naver.com');
  assert.equal(destination.pathname, `/egfilter/category/${id}`);
}
assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
assert.ok(html.includes('tel:01020553958'), 'Phone fallback must remain');
console.log('Homepage purchase paths passed: all four product families, one H1, phone fallback.');
