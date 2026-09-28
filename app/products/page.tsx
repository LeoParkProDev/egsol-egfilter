import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../data/products";
import { filterSizes, sizeLabel } from "../data/sizes";

const BASE_URL = "https://evergreen-filter.vercel.app";

export const metadata: Metadata = {
  title: "산업용 에어필터 제품 찾기 | 규격·옵션별 카탈로그",
  description:
    "프리필터, 헤파필터, 미듐필터, 부직포롤필터의 용도와 제품 정보를 비교하고 23개 등록 규격을 확인하세요. 상세 옵션과 판매 조건은 스마트스토어에서 확인할 수 있습니다.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "산업용 에어필터 제품 찾기 | 규격·옵션별 카탈로그",
    description: "네 가지 필터 제품군과 등록된 규격을 살펴보세요.",
    url: `${BASE_URL}/products`,
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
};

const FAMILY_LABEL: Record<string, string> = {
  "pre-filter": "프리필터",
  "hepa-filter": "헤파필터",
  "medium-filter": "미듐필터",
  "roll-filter": "부직포롤",
};

export default function ProductsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "제품 찾기", item: `${BASE_URL}/products` },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "에버그린필터 제품군",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${BASE_URL}/products/${product.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">제품 카탈로그</span>
          <h1 className="mt-3 text-3xl font-black text-gray-900 md:text-4xl">필요한 에어필터 제품 찾기</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            여과 단계와 설비에 맞는 제품군을 살펴본 뒤, 기존 필터의 치수와 등급을 대조해 보세요.
            등록 규격은 제품군별로 모아 두었습니다.
          </p>
        </header>

        <nav aria-label="제품군 바로가기" className="mt-8 flex flex-wrap justify-center gap-2">
          {products.map((product) => (
            <a key={product.slug} href={`#${product.slug}`} className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:border-brand-green/50">
              {product.name}
            </a>
          ))}
        </nav>

        <details className="mt-6 rounded-2xl border border-gray-200 bg-white px-5 py-4">
          <summary className="cursor-pointer font-bold text-gray-800">구매 전 규격 확인 방법</summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-extrabold text-gray-900">프레임형 필터</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                기존 제품의 가로·세로·두께, 여과 등급, 프레임 재질과 개스킷 여부를 함께 확인하세요.
                표기 치수와 실제 장착부가 다를 수 있으니 기존 라벨이나 설비 정보도 대조해 주세요.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-gray-900">부직포롤</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                롤 제품은 프레임형 가로×세로×두께 규격이 아닙니다. 두께(T), 원단 폭(mm), 롤 길이(m)를
                확인하고 재단 여유분도 고려하세요. 옵션과 최종 가격·배송 조건은 판매처에서 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </details>

        <div className="mt-12 space-y-8">
          {products.map((product) => {
            const familySizes = filterSizes.filter((size) => size.type === FAMILY_LABEL[product.slug]);
            return (
              <section key={product.slug} id={product.slug} className="scroll-mt-8 rounded-3xl border border-gray-200 bg-white p-6 md:p-9">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl">
                    <h2 className="text-2xl font-black text-gray-900">{product.name}</h2>
                    <p className="mt-3 leading-relaxed text-gray-600">{product.shortDesc}</p>
                    <p className="mt-3 text-sm text-gray-500">적용 예: {product.applications.join(" · ")}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <a href={product.href} target="_blank" rel="noopener noreferrer" data-cta-placement="product_hub_store" data-product-category={product.slug} className="rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white hover:brightness-110">
                      스마트스토어 옵션 확인
                    </a>
                    <Link href={`/products/${product.slug}`} className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 hover:border-gray-500 hover:text-gray-900">
                      제품 정보 보기
                    </Link>
                  </div>
                </div>

                <div className="mt-7 border-t border-gray-100 pt-5">
                  <h3 className="text-sm font-extrabold text-gray-800">등록된 규격 ({familySizes.length})</h3>
                  {familySizes.length > 0 ? (
                    <ul className="mt-3 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                      {familySizes.map((size) => (
                        <li key={size.slug}>
                          <Link href={`/size/${size.slug}`} className="block rounded-lg border border-gray-200 px-3 py-3 text-sm font-bold text-gray-700 hover:border-brand-green/50 hover:text-[#176b50]">
                            {sizeLabel(size)} <span className="font-medium text-gray-400">· {size.grade.split(" ")[0]}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      등록된 롤 규격이 없습니다. 두께·폭·길이 옵션은 스마트스토어에서 확인해 주세요.
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed text-gray-500">
          이 목록은 등록된 제품군과 규격 안내입니다. 판매 옵션, 재고, 가격 및 배송 조건은 스마트스토어 상품 페이지에서 확인해 주세요.
        </p>
      </div>
    </main>
  );
}
