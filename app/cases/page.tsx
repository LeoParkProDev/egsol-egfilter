import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "../data/cases";
import { SITE } from "../data/site";

const BASE_URL = "https://evergreen-filter.vercel.app";

export const metadata: Metadata = {
  title: "납품 사례 | 병원·공장·클린룸 필터 공급 사례 모음",
  description:
    "병동 공조 헤파 일괄 납품, 설비 교체 시 4규격 동시 발주, 부직포롤 정기 납품, 비표준 맞춤 제작까지. 실제 납품 건을 문제·해결·규격·결과 순으로 정리했습니다. 고객 정보는 담지 않았습니다.",
  keywords:
    "에어필터 납품 사례,헤파필터 납품,병원 필터 납품 사례,공장 공조기 필터 교체 사례,비표준 필터 제작 사례,부직포롤 정기납품,미듐필터 대량 납품",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "납품 사례 | 에버그린필터",
    description:
      "병원 병동부터 반도체 협력사 설비, 공장 AHU까지. 어떤 현장에서 어떤 규격이 몇 장 나갔는지 정리한 납품 사례 모음입니다.",
    url: `${BASE_URL}/cases`,
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
};

export default function CasesPage() {
  const hasPhone = Boolean(SITE.phone);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "납품 사례", item: `${BASE_URL}/cases` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "에버그린필터 납품 사례",
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${BASE_URL}/cases#${c.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <nav aria-label="breadcrumb" className="text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-[#176b50] transition-colors">
            홈
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">납품 사례</span>
        </nav>

        <header className="mt-8 text-center">
          <span className="eyebrow">
            납품 사례
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black text-gray-900 leading-[1.25] text-balance">
            어떤 현장에서 <span className="text-[#176b50]">어떤 규격</span>이 나갔는지
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            실제 납품 건을 문제 → 해결 → 규격 → 결과 순으로 정리했습니다.
            <br className="hidden md:block" />
            비슷한 현장을 찾아 그대로 읽으시면 됩니다.
          </p>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            거래처 상호와 담당자, 지역, 금액은 적지 않았습니다. 남긴 것은 현장 유형과 규격·수량,
            그리고 그때 무엇이 문제였는지뿐입니다.
          </p>
        </header>

        <section className="mt-14 space-y-5">
          <h2 className="sr-only">납품 사례 목록</h2>
          {caseStudies.map((c) => (
            <article
              key={c.slug}
              id={c.slug}
              className="scroll-mt-24 bg-white border border-gray-200 rounded-2xl p-7 md:p-9"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold">
                <span className="text-[#176b50] bg-brand-green/10 border border-brand-green/25 px-3 py-1 rounded-md">
                  {c.sector}
                </span>
                <span className="text-gray-400">{c.site}</span>
              </div>

              <h3 className="mt-4 text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
                {c.title}
              </h3>

              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-extrabold tracking-wide text-gray-400">
                    이런 상황이었습니다
                  </dt>
                  <dd className="mt-1.5 text-gray-700 leading-[1.85]">{c.problem}</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold tracking-wide text-gray-400">
                    이렇게 진행했습니다
                  </dt>
                  <dd className="mt-1.5 text-gray-700 leading-[1.85]">{c.solution}</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold tracking-wide text-gray-400">
                    납품 사양
                  </dt>
                  <dd className="mt-1.5">
                    <span className="inline-block rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 font-bold text-gray-900">
                      {c.spec}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold tracking-wide text-gray-400">결과</dt>
                  <dd className="mt-1.5 text-gray-700 leading-[1.85]">{c.result}</dd>
                </div>
              </dl>

              {c.related.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2 border-t border-gray-100 pt-5">
                  {c.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-brand-green/45 hover:text-[#176b50]"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl bg-gray-100 border border-gray-200 px-6 py-6">
          <h2 className="text-sm font-extrabold text-gray-900">사례를 읽으실 때</h2>
          <p className="mt-3 text-sm text-gray-600 leading-[1.9]">
            취급 품목은 헤파필터, 미듐필터(미디움필터), 부직포·프리필터, 부직포롤 네 가지입니다.
            저희가 맡는 범위는 자재를 규격에 맞게 만들어 보내드리는 데까지이고, 필터를 뜯고 끼우는
            교체 작업은 각 현장의 시설팀이나 협력 시공사가 진행했습니다. 표준 규격표에 없는 치수는
            라벨 사진이나 필터 바깥 치수(틀 끝에서 끝) 실측값만 있으면 당일 견적, 3~7일 제작입니다.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-14 bg-surface-dark rounded-3xl px-8 md:px-10 py-10 text-center text-white">
          <h2 className="text-2xl font-black text-balance">
            비슷한 현장이 있으셨나요?
          </h2>
          <p className="mt-3 text-white/60 leading-relaxed">
            기존 필터 라벨 사진이나 실측 치수 한 줄이면 규격을 확정해 드립니다. 규격을 모르셔도
            현장 사진부터 보내주시면 됩니다.
            <br className="hidden sm:block" />
            {SITE.replyPromise}.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SITE.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center kakao-dot gap-2.5 border border-white/40 text-white font-extrabold px-7 py-3.5 rounded-md transition-transform hover:-translate-y-0.5"
            >
              카카오톡으로 사진 보내기
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white font-extrabold px-7 py-3.5 rounded-md transition-transform hover:-translate-y-0.5"
            >
              견적서 양식으로 문의
            </Link>
            {hasPhone && (
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white font-extrabold px-7 py-3.5 rounded-md transition-transform hover:-translate-y-0.5"
              >
                전화 {SITE.phone}
              </a>
            )}
          </div>
          <p className="mt-6 text-sm text-white/45">
            메일도 괜찮습니다 —{" "}
            <a href={`mailto:${SITE.email}`} className="font-bold underline">
              {SITE.email}
            </a>
            {hasPhone && <span className="ml-2">· {SITE.hours}</span>}
          </p>
        </section>
      </div>
    </main>
  );
}
