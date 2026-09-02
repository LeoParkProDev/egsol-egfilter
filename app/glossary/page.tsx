import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms, type GlossaryTerm } from "../data/glossary";
import { SITE } from "../data/site";

const BASE_URL = "https://evergreen-filter.vercel.app";

export const metadata: Metadata = {
  title: "에어필터 용어집 | 헤파·미듐·차압·ePM 용어 한 번에",
  description:
    "H13·H14와 EN 1822, F7·G4와 ISO 16890, 차압·면속도·환기횟수, AHU·FFU·헤파박스까지. 견적서와 도면에 나오는 에어필터 용어를 현장 기준으로 풀어 정리했습니다.",
  keywords:
    "에어필터 용어,헤파필터 용어,H13 H14,EN 1822,ISO 16890,ePM1,차압,면속도,환기횟수,AHU,FFU,미듐필터,미디움필터,MPPS",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "에어필터 용어집 | 에버그린필터",
    description:
      "등급·규격부터 구조·운용·설비·의료·거래 용어까지. 견적서와 도면에 나오는 필터 용어를 현장 기준으로 정리했습니다.",
    url: `${BASE_URL}/glossary`,
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
};

// 한글 초성 추출용. 쌍자음은 대표 자음 묶음으로 합친다(ㄲ→ㄱ).
const CHOSEONG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];
const CHOSEONG_MERGE: Record<string, string> = {
  "ㄲ": "ㄱ",
  "ㄸ": "ㄷ",
  "ㅃ": "ㅂ",
  "ㅆ": "ㅅ",
  "ㅉ": "ㅈ",
};

/** 용어 첫 글자로 인덱스 키를 만든다. 한글은 초성, 숫자는 "0-9", 그 외는 대문자 알파벳. */
function indexKey(term: string): string {
  const code = term.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) {
    const cho = CHOSEONG[Math.floor((code - 0xac00) / 588)];
    return CHOSEONG_MERGE[cho] ?? cho;
  }
  const first = term.charAt(0).toUpperCase();
  if (first >= "0" && first <= "9") return "0-9";
  return first;
}

interface GlossarySection {
  key: string;
  id: string;
  items: GlossaryTerm[];
}

/** glossaryTerms 배열 순서를 그대로 유지한 채 인덱스 키별로 묶는다. */
function groupByIndex(): GlossarySection[] {
  const sections: GlossarySection[] = [];
  for (const item of glossaryTerms) {
    const key = indexKey(item.term);
    const last = sections[sections.length - 1];
    if (last && last.key === key) last.items.push(item);
    else sections.push({ key, id: `idx-${key}`, items: [item] });
  }
  return sections;
}

export default function GlossaryPage() {
  const sections = groupByIndex();
  const bySlug = new Map(glossaryTerms.map((t) => [t.slug, t] as const));
  const hasPhone = Boolean(SITE.phone);

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${BASE_URL}/glossary`,
    name: "에어필터 용어집",
    description:
      "헤파·미듐·프리필터의 등급과 규격, 구조, 운용 지표, 설비, 의료·거래 용어를 현장 기준으로 정리한 용어집입니다.",
    url: `${BASE_URL}/glossary`,
    inLanguage: "ko",
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/glossary#${t.slug}`,
      name: t.term,
      alternateName: t.en,
      description: t.short,
      url: `${BASE_URL}/glossary#${t.slug}`,
      inDefinedTermSet: `${BASE_URL}/glossary`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "용어집", item: `${BASE_URL}/glossary` },
    ],
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6">
        <nav aria-label="breadcrumb" className="text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-[#176b50] transition-colors">
            홈
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">용어집</span>
        </nav>

        <header className="mt-8 text-center">
          <span className="eyebrow">
            필터 용어집
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black text-gray-900 leading-[1.25] text-balance">
            견적서에 나오는 <span className="text-[#176b50]">필터 용어</span>, 여기서
            찾으세요
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            H13과 EN 1822, F7과 ePM, 차압과 면속도, AHU와 FFU까지.
            <br className="hidden md:block" />
            도면과 견적서에서 마주치는 용어를 현장 기준으로 풀어 두었습니다.
          </p>
          <p className="mt-3 text-sm font-semibold text-gray-400 tabular-nums">
            총 {glossaryTerms.length}개 용어
          </p>
        </header>

        {/* 초성·알파벳 인덱스 */}
        <nav
          aria-label="초성·알파벳 인덱스"
          className="mt-10 bg-white border border-gray-200 rounded-2xl px-5 py-5"
        >
          <p className="text-[0.7rem] font-extrabold tracking-[0.12em] uppercase text-gray-400">
            초성·알파벳 인덱스
          </p>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-w-9 items-center justify-center bg-gray-50 hover:bg-brand-green/10 border border-gray-200 hover:border-brand-green/40 text-sm font-extrabold text-gray-700 hover:text-[#176b50] px-3 py-2 rounded-md transition-colors"
                >
                  {section.key}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 용어 목록 */}
        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
                {section.key}
              </h2>

              <div className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <article
                    key={item.slug}
                    id={item.slug}
                    className="scroll-mt-24 bg-white border border-gray-200 rounded-2xl px-6 py-6 md:px-7 md:py-7"
                  >
                    <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-lg md:text-xl font-extrabold text-gray-900">
                        {item.term}
                      </span>
                      {item.en && (
                        <span className="text-xs font-bold tracking-wide text-gray-400">
                          {item.en}
                        </span>
                      )}
                    </h3>

                    <p className="mt-3 text-[0.95rem] font-bold text-[#176b50] leading-relaxed">
                      {item.short}
                    </p>

                    {item.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="mt-3.5 text-sm text-gray-600 leading-[1.85]"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {item.related && item.related.length > 0 && (
                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                        <span className="text-[0.7rem] font-extrabold tracking-[0.1em] uppercase text-gray-400">
                          관련 용어
                        </span>
                        {item.related.map((slug) => {
                          const target = bySlug.get(slug);
                          if (!target) return null;
                          return (
                            <a
                              key={slug}
                              href={`#${target.slug}`}
                              className="inline-flex items-center bg-gray-50 hover:bg-brand-green/10 border border-gray-200 hover:border-brand-green/40 text-xs font-bold text-gray-600 hover:text-[#176b50] px-3 py-1.5 rounded-md transition-colors"
                            >
                              {target.term}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 더 읽을거리 */}
        <section className="mt-14">
          <h2 className="text-lg font-extrabold text-gray-900">이어서 보시면 좋은 페이지</h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            <Link
              href="/faq"
              className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="text-[0.65rem] font-extrabold tracking-wide text-[#176b50]">
                자주 묻는 질문
              </span>
              <span className="mt-1.5 block font-bold text-gray-900 leading-snug">
                실측·등급·납기 현장 질문 모음
              </span>
            </Link>
            <Link
              href="/guide"
              className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="text-[0.65rem] font-extrabold tracking-wide text-[#176b50]">
                가이드
              </span>
              <span className="mt-1.5 block font-bold text-gray-900 leading-snug">
                교체주기·등급 선택 심화 가이드
              </span>
            </Link>
            <Link
              href="/service"
              className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="text-[0.65rem] font-extrabold tracking-wide text-[#176b50]">
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
            용어보다 필터 사진 한 장이 빠릅니다
          </h2>
          <p className="mt-3 text-white/60 leading-relaxed">
            라벨 사진이나 실측 치수(필터 바깥 치수, 틀 끝에서 끝)를 보내주시면 등급·규격을
            확인해 견적을 드립니다.
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
