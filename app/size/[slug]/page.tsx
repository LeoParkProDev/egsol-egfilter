import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { filterSizes, relatedSizes } from "../../data/sizes";

const BASE_URL = "https://evergreen-filter.vercel.app";
const KAKAO_URL = "https://pf.kakao.com/_zjkxab";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return filterSizes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const size = filterSizes.find((s) => s.slug === slug);
  if (!size) return { title: "규격을 찾을 수 없습니다" };

  return {
    title: size.metaTitle,
    description: size.metaDescription,
    keywords: size.keywords,
    alternates: { canonical: `/size/${size.slug}` },
    openGraph: {
      title: `${size.metaTitle} | 에버그린필터`,
      description: size.metaDescription,
      url: `${BASE_URL}/size/${size.slug}`,
      siteName: "에버그린필터",
      locale: "ko_KR",
      type: "website",
    },
  };
}

const TYPE_HREF: Record<string, string> = {
  헤파필터: "/products/hepa-filter",
  미듐필터: "/products/medium-filter",
  프리필터: "/products/pre-filter",
};

export default async function SizePage({ params }: Props) {
  const { slug } = await params;
  const size = filterSizes.find((s) => s.slug === slug);
  if (!size) notFound();

  const related = relatedSizes(size);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: size.title,
    description: size.metaDescription,
    brand: { "@type": "Brand", name: "에버그린필터" },
    category: size.type,
    additionalProperty: [
      { "@type": "PropertyValue", name: "가로", value: `${size.w}mm` },
      { "@type": "PropertyValue", name: "세로", value: `${size.h}mm` },
      { "@type": "PropertyValue", name: "두께", value: `${size.t}mm` },
      { "@type": "PropertyValue", name: "등급", value: size.grade },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: size.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "규격별 필터", item: `${BASE_URL}/size` },
      { "@type": "ListItem", position: 3, name: size.title, item: `${BASE_URL}/size/${size.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6">
        <nav aria-label="breadcrumb" className="text-xs font-semibold text-gray-400">
          <Link href="/size" className="hover:text-[#0b9e6e] transition-colors">
            규격별 필터
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{size.type}</span>
        </nav>

        <header className="mt-6">
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="text-[#0b9e6e] bg-brand-green/10 border border-brand-green/25 px-3 py-1 rounded-full">
              {size.type}
            </span>
            <span className="text-gray-400">{size.grade}</span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-black text-gray-900 leading-[1.3]">
            {size.title}
          </h1>
          {size.summary.map((p) => (
            <p key={p.slice(0, 24)} className="mt-4 text-lg text-gray-600 leading-relaxed">
              {p}
            </p>
          ))}
        </header>

        {/* 규격 명세 */}
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            규격 명세
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="w-36 px-4 py-3 text-left font-bold text-gray-500 bg-gray-50">치수 (mm)</th>
                  <td className="px-4 py-3 font-extrabold text-gray-900">
                    {size.w} × {size.h} × {size.t}(T)
                  </td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-500 bg-gray-50">인치 환산</th>
                  <td className="px-4 py-3 text-gray-700">{size.inch}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-500 bg-gray-50">필터 종류</th>
                  <td className="px-4 py-3 text-gray-700">
                    <Link href={TYPE_HREF[size.type]} className="text-[#0b9e6e] font-bold hover:underline">
                      {size.type}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-500 bg-gray-50">여과 등급</th>
                  <td className="px-4 py-3 text-gray-700">{size.grade}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 선택 가능 사양 */}
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            선택 가능 사양
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-4 py-3 font-bold">사양</th>
                  <th className="px-4 py-3 font-bold">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {size.variants.map((v) => (
                  <tr key={v.code}>
                    <td className="px-4 py-3 font-bold text-gray-800">{v.label}</td>
                    <td className="px-4 py-3 text-gray-600">{v.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 주 사용처 */}
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            주 사용처
          </h2>
          <ul className="mt-4 space-y-2.5">
            {size.usage.map((u) => (
              <li key={u} className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="mt-[0.55em] w-1.5 h-1.5 shrink-0 rounded-full bg-brand-green" />
                {u}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-gray-700 leading-[1.85]">{size.pairing}</p>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            자주 묻는 질문
          </h2>
          <div className="mt-4 space-y-4">
            {size.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer font-bold text-gray-900 list-none flex justify-between gap-4">
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-45 transition-transform">＋</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-[1.85]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-8 text-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            이 규격이 맞는지 확실하지 않으신가요?
          </h2>
          <p className="mt-3 text-gray-300 leading-relaxed">
            기존 필터 라벨 또는 실측 사진을 보내주시면 규격·등급 확인 후 당일 견적을 드립니다.
            표준 규격에 없는 사이즈도 3~7일 맞춤 제작합니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#FEE500] px-6 py-3 font-extrabold text-gray-900 hover:brightness-95 transition"
            >
              카카오톡으로 사진 견적
            </a>
            <Link
              href="/quote"
              className="rounded-xl bg-brand-green px-6 py-3 font-extrabold text-white hover:brightness-110 transition"
            >
              견적 요청하기
            </Link>
          </div>
        </section>

        {/* 관련 규격 */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-extrabold text-gray-900">다른 규격 보기</h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/size/${r.slug}`}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:border-brand-green/40 hover:text-[#0b9e6e] transition"
                >
                  {r.w}×{r.h}×{r.t}
                  <span className="block text-xs font-semibold text-gray-400 mt-0.5">{r.type}</span>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              전체 규격은{" "}
              <Link href="/size" className="text-[#0b9e6e] font-bold hover:underline">
                규격별 필터 찾기
              </Link>
              에서, 실측 방법은{" "}
              <Link href="/guide/hepa-filter-size-guide" className="text-[#0b9e6e] font-bold hover:underline">
                헤파필터 규격표 가이드
              </Link>
              에서 확인하세요.
            </p>
          </section>
        )}
      </article>
    </main>
  );
}
