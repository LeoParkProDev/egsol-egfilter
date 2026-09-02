import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "../../data/guides";
import { guideText, relatedGuides, sizesFor } from "../../lib/related";

const BASE_URL = "https://evergreen-filter.vercel.app";
const KAKAO_URL = "https://pf.kakao.com/_zjkxab";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "가이드를 찾을 수 없습니다" };

  return {
    title: guide.metaTitle,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guide/${guide.slug}` },
    openGraph: {
      title: `${guide.metaTitle} | 에버그린필터`,
      description: guide.description,
      url: `${BASE_URL}/guide/${guide.slug}`,
      siteName: "에버그린필터",
      locale: "ko_KR",
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
    },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  // 관련 가이드·관련 규격은 related 엔진이 본문에서 뽑아낸다 (app/lib/related.ts).
  const others = relatedGuides(guide.slug, 4);
  const relatedSizes = sizesFor(guideText(guide), 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    inLanguage: "ko",
    author: { "@type": "Organization", name: "에버그린필터", url: BASE_URL },
    publisher: { "@type": "Organization", name: "에버그린필터", url: BASE_URL },
    mainEntityOfPage: `${BASE_URL}/guide/${guide.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "필터 가이드", item: `${BASE_URL}/guide` },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${BASE_URL}/guide/${guide.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
        <nav aria-label="breadcrumb" className="text-xs font-semibold text-gray-500">
          <Link href="/guide" className="hover:text-[#0b9e6e] transition-colors">
            필터 가이드
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{guide.category}</span>
        </nav>

        <header className="mt-6">
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="text-[#0b9e6e] bg-brand-green/10 border border-brand-green/25 px-3 py-1 rounded-full">
              {guide.category}
            </span>
            <span className="text-gray-400">읽는 시간 {guide.readTime}</span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-black text-gray-900 leading-[1.3] text-balance">
            {guide.title}
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">{guide.intro}</p>
        </header>

        <div className="mt-10 space-y-10">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
                {section.heading}
              </h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-[17px] md:text-base text-gray-700 leading-[1.85]">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
                      <span className="mt-[0.55em] w-1.5 h-1.5 shrink-0 rounded-full bg-brand-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="table-scroll-hint mt-5 overflow-x-auto bg-white border border-gray-200 rounded-2xl">
                  <table className="w-full min-w-[560px] text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-left text-[0.7rem] uppercase tracking-[0.12em] text-gray-400">
                        {section.table.headers.map((h) => (
                          <th key={h} className="px-5 py-3.5 font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, i) => (
                        <tr
                          key={row[0]}
                          className={
                            i < section.table!.rows.length - 1
                              ? "border-b border-gray-100"
                              : ""
                          }
                        >
                          {row.map((cell, j) => (
                            <td
                              key={`${row[0]}-${j}`}
                              className={`px-5 py-3.5 ${
                                j === 0
                                  ? "font-bold text-gray-900 tabular-nums"
                                  : "text-gray-600"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            자주 묻는 질문
          </h2>
          <div className="mt-6 space-y-3">
            {guide.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white border border-gray-200 rounded-2xl open:border-brand-green/45 transition-colors"
              >
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 px-6 py-5 font-bold text-gray-900">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl font-light text-[#0b9e6e] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 bg-surface-dark rounded-3xl px-8 md:px-10 py-10 text-center text-white">
          <h2 className="text-2xl font-black text-balance">
            글로 판단이 어려우시면, 필터 사진 한 장이면 됩니다
          </h2>
          <p className="mt-3 text-white/60">
            기존 필터 라벨 또는 실측 사진을 보내주시면 등급·규격 확인 후 당일 견적을
            드립니다.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#FEE500] text-[#3C1E1E] font-extrabold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
            >
              카카오톡으로 사진 보내기
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white font-extrabold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
            >
              견적서 양식으로 문의
            </Link>
          </div>
        </section>

        {/* 다른 가이드 */}
        <section className="mt-14">
          <h2 className="text-lg font-extrabold text-gray-900">함께 읽으면 좋은 가이드</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
              >
                <span className="text-[0.65rem] font-extrabold tracking-wide text-[#0b9e6e]">
                  {g.category}
                </span>
                <span className="mt-1.5 block font-bold text-gray-900 leading-snug">
                  {g.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 관련 규격 — 본문에 등장한 치수를 규격 페이지로 연결한다 */}
        {relatedSizes.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-extrabold text-gray-900">관련 규격</h2>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedSizes.map((s) => (
                <Link
                  key={s.slug}
                  href={`/size/${s.slug}`}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-brand-green/45 hover:text-[#0b9e6e]"
                >
                  {s.w}×{s.h}×{s.t}
                  <span className="mt-0.5 block text-xs font-semibold text-gray-400">{s.type}</span>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              전체 규격은{" "}
              <Link href="/size" className="font-bold text-[#0b9e6e] hover:underline">
                규격별 필터 찾기
              </Link>
              에서 확인하실 수 있고, 목록에 없는 치수는 바깥 치수(틀 끝에서 끝) 실측값만 있으면
              3~7일 맞춤 제작합니다.
            </p>
          </section>
        )}
      </article>
    </main>
  );
}
