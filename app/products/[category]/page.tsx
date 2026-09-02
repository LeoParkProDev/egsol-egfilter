import { notFound } from "next/navigation";
import { products, colorMap } from "../../data/products";
import { guides } from "../../data/guides";
import Link from "next/link";
import { Metadata } from "next";

const relatedGuideSlugs: Record<string, string[]> = {
  "pre-filter": ["hepa-filter-replacement-cycle", "air-filter-grade-guide"],
  "hepa-filter": ["h13-vs-h14", "hepa-filter-size-guide", "hepa-filter-replacement-cycle"],
  "medium-filter": ["air-filter-grade-guide", "hepa-filter-replacement-cycle"],
  "roll-filter": ["air-filter-grade-guide"],
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    category: product.slug,
  }));
}

const BASE_URL = "https://evergreen-filter.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.category);

  if (!product) {
    return { title: "제품을 찾을 수 없습니다" };
  }

  return {
    title: `${product.name}(${product.nameEn}) | 규격·등급·교체주기`,
    description: `${product.shortDesc} ${product.applications.join(", ")} 적용. 규격 맞춤 제작, 당일 견적, 전국 배송.`,
    keywords: [
      product.name,
      product.nameEn,
      `${product.name} 가격`,
      `${product.name} 규격`,
      `${product.name} 교체주기`,
      // 같은 제품의 다른 표기(미듐/미디움 등)로 검색하는 유입을 놓치지 않기 위함
      ...(product.aliases ?? []),
      ...(product.aliases ?? []).map((a) => `${a} 가격`),
      ...product.applications,
    ].join(","),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name}(${product.nameEn}) | 에버그린필터`,
      description: product.shortDesc,
      url: `${BASE_URL}/products/${product.slug}`,
      siteName: "에버그린필터",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.category);

  if (!product) {
    notFound();
  }

  const colors = colorMap[product.color];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} (${product.nameEn})`,
    description: product.description,
    brand: { "@type": "Brand", name: "에버그린필터" },
    url: `${BASE_URL}/products/${product.slug}`,
    category: "에어필터",
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: `${BASE_URL}/products/${product.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          돌아가기
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          
          {product.slug === "hepa-filter" && (
            <Link
              href="/medical"
              className="flex items-center justify-between gap-4 bg-brand-green/10 border border-brand-green/30 rounded-2xl px-6 py-4 mb-8 group"
            >
              <span className="text-sm md:text-base font-bold text-gray-800">
                병원·안과·피부과·수술실 용도라면 — 의료시설 전문 페이지에서 확인하세요
              </span>
              <span className="shrink-0 font-black text-brand-green group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          )}

          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex-1">
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${colors.bg} ${colors.text} mb-4`}>
                  {product.nameEn}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-sm font-bold bg-gray-50 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">주요 적용 분야</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-center text-gray-700">
                      <svg className={`w-5 h-5 mr-2 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">상세 스펙</h2>
                <dl className="divide-y divide-gray-100">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="py-3 flex flex-col sm:flex-row sm:gap-4">
                      <dt className="text-sm font-bold text-gray-500 w-32">{spec.label}</dt>
                      <dd className="text-sm text-gray-900 mt-1 sm:mt-0">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">권장 교체 주기</h2>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-xl font-medium">
                  {product.replacementCycle}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  {product.name} 자주 묻는 질문
                </h2>
                <div className="space-y-3">
                  {product.faqs.map((faq, i) => (
                    <details
                      key={faq.q}
                      className="group bg-gray-50 border border-gray-100 rounded-xl"
                      open={i === 0}
                    >
                      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 px-5 py-4 font-bold text-gray-900 text-sm">
                        {faq.q}
                        <span
                          aria-hidden="true"
                          className={`shrink-0 text-lg font-light ${colors.text} transition-transform group-open:rotate-45`}
                        >
                          +
                        </span>
                      </summary>
                      <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">관련 가이드</h2>
                <div className="flex flex-col gap-2.5">
                  {(relatedGuideSlugs[product.slug] ?? [])
                    .map((slug) => guides.find((g) => g.slug === slug))
                    .filter((g) => g !== undefined)
                    .map((g) => (
                      <Link
                        key={g.slug}
                        href={`/guide/${g.slug}`}
                        className="group flex items-center justify-between gap-4 bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors"
                      >
                        {g.title.split(" — ")[0]}
                        <span className={`shrink-0 ${colors.text} group-hover:translate-x-1 transition-transform`}>→</span>
                      </Link>
                    ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  스마트스토어 구매
                </a>
                <a
                  href="/quote"
                  className="flex-1 text-center bg-white border-2 border-primary text-primary hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-xl transition-all"
                >
                  대량 견적 문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
