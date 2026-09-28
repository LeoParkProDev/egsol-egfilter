import Link from "next/link";
import { products } from "../data/products";
import { SITE } from "../data/site";

interface GuideInquiryProps {
  guideSlug: "air-filter-grade-guide" | "h13-vs-h14";
}

const inquiryCopy = {
  "air-filter-grade-guide": {
    title: "등급과 규격을 함께 확인하고 싶다면",
    description:
      "기존 필터의 라벨 사진과 바깥 치수, 필요한 수량을 보내주세요. 표시된 등급과 필터 종류를 확인해 견적을 안내해 드립니다.",
  },
  "h13-vs-h14": {
    title: "기존 필터 사양을 기준으로 문의하세요",
    description:
      "H13·H14 표기가 있는 라벨 사진과 바깥 치수, 필요한 수량을 보내주세요. 기존 사양과 사용 공간을 함께 확인할 수 있습니다.",
  },
} satisfies Record<GuideInquiryProps["guideSlug"], { title: string; description: string }>;

export default function GuideInquiry({ guideSlug }: GuideInquiryProps) {
  const copy = inquiryCopy[guideSlug];
  const recommendedSlugs =
    guideSlug === "air-filter-grade-guide" ? ["hepa-filter", "medium-filter"] : ["hepa-filter"];
  const recommendedProducts = recommendedSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product) => product !== undefined);

  return (
    <aside
      aria-label="필터 문의 안내"
      className="mt-10 rounded-2xl border border-brand-green/20 bg-white px-6 py-6 md:px-8"
    >
      <h2 className="text-lg font-extrabold text-gray-900">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{copy.description}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {recommendedProducts.map((product) => (
          <a
            key={product.slug}
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-placement="guide_store"
            data-product-category={product.slug}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-green px-5 py-3 text-center font-bold text-white transition-colors hover:bg-[#145b43]"
          >
            {product.name} 스마트스토어에서 보기
          </a>
        ))}
        <Link
          href="/quote"
          data-cta-placement="guide_inline"
          data-guide-slug={guideSlug}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-center font-bold text-gray-800 transition-colors hover:bg-gray-50"
        >
          규격이 다르면 사진 견적 문의
        </Link>
        {SITE.phone && (
          <a
            href={SITE.phoneHref}
            data-cta-placement="guide_inline"
            data-guide-slug={guideSlug}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-gray-300 px-5 py-3 font-bold text-gray-800 transition-colors hover:bg-gray-50"
          >
            전화 {SITE.phone}
          </a>
        )}
      </div>
    </aside>
  );
}
