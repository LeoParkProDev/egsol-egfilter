import type { Metadata } from "next";
import Link from "next/link";
import { faqGroups } from "../data/faq";
import { SITE } from "../data/site";

const BASE_URL = "https://evergreen-filter.vercel.app";

const allItems = faqGroups.flatMap((g) => g.items);

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 규격·등급·맞춤 제작·병원 납품 총정리",
  description:
    "헤파필터 세척, 594×594와 610×610 차이, 수술실 등급 기준, 단종 필터 대체 제작, 정기 납품과 구매 품의 서류까지. 현장에서 실제로 받는 질문 50여 개를 주제별로 정리했습니다.",
  keywords:
    "에어필터 자주묻는질문,헤파필터 세척,필터 규격 실측,594 610 차이,수술실 필터 등급,단종 필터 대체,필터 맞춤 제작,정기 납품,미듐필터,미디움필터",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "자주 묻는 질문 | 에버그린필터",
    description:
      "규격 실측부터 등급 선택, 맞춤 제작, 병원·공장 납품, 서류와 납기까지 — 현장 질문 50여 개를 주제별로 정리했습니다.",
    url: `${BASE_URL}/faq`,
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
};

export default function FAQPage() {
  const hasPhone = Boolean(SITE.phone);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ko",
    mainEntity: allItems.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "자주 묻는 질문", item: `${BASE_URL}/faq` },
    ],
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6">
        <nav aria-label="breadcrumb" className="text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-[#0b9e6e] transition-colors">
            홈
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">자주 묻는 질문</span>
        </nav>

        <header className="mt-8 text-center">
          <span className="text-[#0b9e6e] font-black text-sm tracking-widest uppercase">
            FAQ
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black text-gray-900 leading-[1.25] text-balance">
            현장에서 <span className="text-[#0b9e6e]">실제로 받는 질문</span>만 모았습니다
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            규격 실측부터 등급 선택, 맞춤 제작, 병원·공장 납품, 서류와 납기까지.
            <br className="hidden md:block" />{" "}
            전화로 가장 많이 여쭤보시는 순서대로 정리했습니다.
          </p>
        </header>

        {/* 그룹 점프 링크 */}
        <nav
          aria-label="주제 바로가기"
          className="mt-10 bg-white border border-gray-200 rounded-2xl px-5 py-5"
        >
          <p className="text-[0.7rem] font-extrabold tracking-[0.12em] uppercase text-gray-400">
            주제 바로가기
          </p>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {faqGroups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-brand-green/10 border border-gray-200 hover:border-brand-green/40 text-sm font-bold text-gray-700 hover:text-[#0b9e6e] px-3.5 py-2 rounded-full transition-colors"
                >
                  {group.title}
                  <span className="text-xs font-extrabold text-gray-400 tabular-nums">
                    {group.items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 그룹별 Q&A */}
        <div className="mt-12 space-y-12">
          {faqGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
                {group.title}
              </h2>
              <div className="mt-6 space-y-3">
                {group.items.map((faq) => (
                  <details
                    key={faq.q}
                    className="group bg-white border border-gray-200 rounded-2xl open:border-brand-green/45 transition-colors"
                  >
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-start justify-between gap-4 px-6 py-5 font-bold text-gray-900 leading-snug">
                      {faq.q}
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-xl font-light text-[#0b9e6e] transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-6 pb-6 text-sm text-gray-500 leading-[1.85]">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 더 읽을거리 */}
        <section className="mt-14">
          <h2 className="text-lg font-extrabold text-gray-900">더 자세히 보시려면</h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            <Link
              href="/guide"
              className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="text-[0.65rem] font-extrabold tracking-wide text-[#0b9e6e]">
                가이드
              </span>
              <span className="mt-1.5 block font-bold text-gray-900 leading-snug">
                교체주기·등급 선택 심화 가이드
              </span>
            </Link>
            <Link
              href="/glossary"
              className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="text-[0.65rem] font-extrabold tracking-wide text-[#0b9e6e]">
                용어집
              </span>
              <span className="mt-1.5 block font-bold text-gray-900 leading-snug">
                차압·MPPS·ePM까지 필터 용어 정리
              </span>
            </Link>
            <Link
              href="/service"
              className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="text-[0.65rem] font-extrabold tracking-wide text-[#0b9e6e]">
                서비스
              </span>
              <span className="mt-1.5 block font-bold text-gray-900 leading-snug">
                정기 납품·맞춤 제작 거래 방식
              </span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 bg-surface-dark rounded-3xl px-8 md:px-10 py-10 text-center text-white">
          <h2 className="text-2xl font-black text-balance">
            찾으시는 답이 없으면, 필터 사진 한 장이면 됩니다
          </h2>
          <p className="mt-3 text-white/60 leading-relaxed">
            라벨 사진이나 실측 치수(필터 바깥 치수, 틀 끝에서 끝)를 보내주시면 규격·등급을
            확인해 견적을 드립니다.
            <br className="hidden sm:block" />
            {SITE.replyPromise}.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SITE.kakaoUrl}
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
            {hasPhone && (
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white font-extrabold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
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
