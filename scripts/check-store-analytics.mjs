import assert from "node:assert/strict";

const {
  classifyAnchor,
  clickMetadataParams,
  naverConversionType,
} = await import("../app/lib/analytics.ts");

const allowedUrls = [
  ["https://smartstore.naver.com/egfilter/category/ALL", "smartstore_click"],
  ["https://pf.kakao.com/_example", "kakao_click"],
  ["https://pf.kakao.com/_example/chat", "kakao_click"],
  ["https://smartstore.naver.com/egfilter/products/123456789", "smartstore_click"],
  ["tel:+82212345678", "phone_click"],
];

for (const [href, expected] of allowedUrls) {
  assert.equal(classifyAnchor(href), expected, `expected ${href} to classify as ${expected}`);
}

const rejectedUrls = [
  "https://smartstore.naver.com.evil.example/category/ALL",
  "https://evil.example/smartstore.naver.com/category/ALL",
  "https://pf.kakao.com.evil.example/_example",
  "https://user:password@smartstore.naver.com/egfilter/category/ALL",
  "https://smartstore.naver.com:444/egfilter/category/ALL",
  "http://smartstore.naver.com/egfilter/category/ALL",
  "javascript:alert(1)",
  "/smartstore.naver.com/category/ALL",
  "not a URL",
];

for (const href of rejectedUrls) {
  assert.equal(classifyAnchor(href), null, `expected ${href} to be rejected`);
}

assert.deepEqual(
  clickMetadataParams(
    "https://smartstore.naver.com/egfilter/category/ALL?customer_email=private@example.com#reviews",
    {
      ctaPlacement: "product_detail",
      productCategory: "hepa",
      productCode: "h13_filter",
    },
  ),
  {
    cta_placement: "product_detail",
    product_category: "hepa",
    product_code: "h13_filter",
    destination_path: "/egfilter/category/ALL",
  },
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/egfilter/category/ALL", {
    ctaPlacement: "user@example.com",
    productCategory: "medium filters",
    productCode: "phone-01012345678",
  }),
  { destination_path: "/egfilter/category/ALL" },
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/?customer_email=private@example.com"),
  {},
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/account/private@example.com"),
  {},
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/egfilter/products/123456789"),
  { destination_path: "/egfilter/products/123456789" },
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/main/products/987654321"),
  { destination_path: "/main/products/987654321" },
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/egfilter/products/123456789", {
    productCode: "phone-010-1234-5678",
  }),
  { destination_path: "/egfilter/products/123456789" },
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/egfilter/products/123456789", {
    productCode: "H_610_610_150",
  }),
  {
    product_code: "H_610_610_150",
    destination_path: "/egfilter/products/123456789",
  },
);
assert.deepEqual(
  clickMetadataParams("https://smartstore.naver.com/egfilter/category/ALL/"),
  { destination_path: "/egfilter/category/ALL/" },
);
assert.deepEqual(
  clickMetadataParams("https://pf.kakao.com/_example/chat?customer_email=private@example.com"),
  { destination_path: "/_example/chat" },
);
assert.deepEqual(clickMetadataParams("tel:+82212345678", { ctaPlacement: "footer_phone" }), {
  cta_placement: "footer_phone",
});
assert.equal(naverConversionType("smartstore_click"), null);

console.log("Store analytics checks passed.");
