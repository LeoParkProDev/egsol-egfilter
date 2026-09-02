import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "../../data/industries";
import { guideText, guidesFor, sizesFor } from "../../lib/related";

const BASE_URL = "https://evergreen-filter.vercel.app";
const KAKAO_URL = "https://pf.kakao.com/_zjkxab";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = industries.find((i) => i.slug === slug);
  if (!data) return { title: "페이지를 찾을 수 없습니다" };

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `/industry/${data.slug}` },
    openGraph: {
      title: `${data.metaTitle} | 에버그린필터`,
      description: data.metaDescription,
      url: `${BASE_URL}/industry/${data.slug}`,
      siteName: "에버그린필터",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const data = industries.find((i) => i.slug === slug);
  if (!data) notFound();

  const others = industries.filter((i) => i.slug !== data.slug);

  // 함께 보는 가이드·관련 규격은 업종 keywords로 related 엔진이 고른다 (app/lib/related.ts).
  const relatedGuideList = guidesFor(data.keywords, 4);
  const relatedSizes = sizesFor(
    [data.keywords, ...relatedGuideList.map(guideText)].join(" "),
    4,
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
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
      {
        "@type": "ListItem",
        position: 2,
        name: `${data.name} 필터`,
        item: `${BASE_URL}/industry/${data.slug}`,
      },
    ],
  };

  return (
    <main className="bg-[#06090f] break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(13,36,64,0.9) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-20 text-center">
          <nav aria-label="breadcrumb" className="text-xs font-semibold text-white/40">
            <Link href="/" className="hover:text-[#8ff2d8] transition-colors">
              홈
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{data.name} 필터</span>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2.5 bg-brand-green/10 border border-brand-green/25 rounded-full px-5 py-2 text-sm font-bold text-[#8ff2d8]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_10px_#10b981]" />
            {data.badge}
          </div>

          <h1 className="mt-8 text-3xl md:text-5xl font-black leading-[1.22] tracking-tight max-w-3xl mx-auto text-balance">
            <span className="sr-only">{data.name} 필터 — </span>
            {data.heroTitle[0]}{" "}
            <span className="bg-gradient-to-r from-[#8ff2d8] to-accent bg-clip-text text-transparent">
              {data.heroTitle[1]}
            </span>
            {data.heroTitle[2]}
          </h1>

          <p className="mt-7 text-base md:text-lg text-white/60 font-medium max-w-xl mx-auto leading-relaxed">
            {data.heroDesc}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-green to-[#0ec98f] text-[#03170f] font-extrabold px-8 py-4 rounded-full shadow-[0_10px_34px_rgba(16,185,129,0.35)] transition-transform hover:-translate-y-0.5"
            >
              필터 사진 보내고 3분 견적
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 text-white font-extrabold px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5"
            >
              견적서 양식으로 문의
            </Link>
          </div>
          <p className="mt-6 text-xs md:text-sm text-white/40 font-semibold">
            10년+ 산업·클린룸 필터 경력 · 누적 거래처 500+ · 세금계산서 발행
          </p>
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-brand-green font-black text-sm tracking-widest uppercase">
            Problem
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight max-w-2xl text-balance">
            {data.painsHeading}
          </h2>
          <p className="mt-5 text-gray-500 text-lg max-w-xl">{data.painsSub}</p>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {data.pains.map((p) => (
              <div
                key={p.who}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-xs font-extrabold tracking-wide text-[#0b9e6e]">
                  {p.who}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-gray-900">{p.title}</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-brand-green font-black text-sm tracking-widest uppercase">
            Solution
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight text-balance">
            {data.name} 권장 필터 구성
          </h2>
          <p className="mt-5 text-gray-500 text-lg max-w-xl">
            부위별 오염원에 맞춘 구성입니다. 현장 사진 한 장이면 규격까지 맞춰 제안해
            드립니다.
          </p>

          <div className="mt-12 overflow-x-auto bg-white border border-gray-200 rounded-2xl">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-[0.7rem] uppercase tracking-[0.14em] text-gray-400">
                  <th className="px-6 py-4 font-bold">적용 부위</th>
                  <th className="px-6 py-4 font-bold">필터 구성</th>
                  <th className="px-6 py-4 font-bold">권장 등급</th>
                  <th className="px-6 py-4 font-bold">비고</th>
                </tr>
              </thead>
              <tbody>
                {data.setups.map((row, i) => (
                  <tr
                    key={row.area}
                    className={i < data.setups.length - 1 ? "border-b border-gray-100" : ""}
                  >
                    <td className="px-6 py-4 font-bold text-gray-900">{row.area}</td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">{row.filter}</td>
                    <td className="px-6 py-4 font-bold text-[#0b9e6e] tabular-nums">
                      {row.grade}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 max-w-3xl border-[1.5px] border-dashed border-brand-green/50 rounded-2xl px-8 py-6 text-gray-500">
            <strong className="text-gray-900 font-extrabold">알아두세요.</strong>{" "}
            {data.setupNote}
          </div>

          <p className="mt-6 text-sm text-gray-400">
            등급 기준이 궁금하시다면{" "}
            <Link
              href="/guide/air-filter-grade-guide"
              className="font-bold text-[#0b9e6e] hover:underline"
            >
              에어필터 등급 총정리
            </Link>
            와{" "}
            <Link
              href="/guide/hepa-filter-replacement-cycle"
              className="font-bold text-[#0b9e6e] hover:underline"
            >
              헤파필터 교체주기 가이드
            </Link>
            를 참고하세요.
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-brand-green font-black text-sm tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900">
            {data.name} 필터, 자주 묻는 질문
          </h2>

          <div className="mt-12 space-y-3">
            {data.faqs.map((faq, i) => (
              <details
                key={faq.q}
                className="group bg-white border border-gray-200 rounded-2xl open:border-brand-green/45 transition-colors"
                open={i === 0}
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
        </div>
      </section>

      {/* ═══ 다른 산업 분야 ═══ */}
      <section className="bg-surface py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-extrabold text-gray-900">다른 분야 필터 안내</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((i) => (
              <Link
                key={i.slug}
                href={`/industry/${i.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
              >
                <span className="block text-xs font-bold text-gray-400">{i.nameEn}</span>
                <span className="mt-1 flex items-center justify-between font-extrabold text-gray-900">
                  {i.name} 필터
                  <span className="text-[#0b9e6e] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </Link>
            ))}
            <Link
              href="/medical"
              className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="block text-xs font-bold text-gray-400">Medical</span>
              <span className="mt-1 flex items-center justify-between font-extrabold text-gray-900">
                병원·의료시설 필터
                <span className="text-[#0b9e6e] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 함께 보는 가이드 · 관련 규격 ═══ */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-extrabold text-gray-900">
            이 현장 담당자가 함께 보는 가이드
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            같은 고민을 하는 담당자들이 실제로 많이 여는 글입니다.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {relatedGuideList.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className="group bg-surface border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 text-[0.65rem] font-extrabold">
                  <span className="text-[#0b9e6e] bg-brand-green/10 border border-brand-green/25 px-2.5 py-0.5 rounded-full">
                    {g.category}
                  </span>
                  <span className="text-gray-400">읽는 시간 {g.readTime}</span>
                </div>
                <span className="mt-3 block font-bold text-gray-900 leading-snug">
                  {g.title}
                </span>
              </Link>
            ))}
          </div>

          {relatedSizes.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-extrabold text-gray-900">관련 규격</h2>
              <p className="mt-2 text-sm text-gray-500">
                이 현장에서 자주 나오는 치수입니다. 목록에 없는 치수는 바깥 치수(틀 끝에서 끝)
                실측값이나 라벨 사진만 있으면 3~7일 맞춤 제작합니다.
              </p>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedSizes.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/size/${s.slug}`}
                    className="rounded-xl border border-gray-200 bg-surface px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-brand-green/45 hover:text-[#0b9e6e]"
                  >
                    {s.w}×{s.h}×{s.t}
                    <span className="mt-0.5 block text-xs font-semibold text-gray-400">
                      {s.type}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        className="relative overflow-hidden text-white text-center py-24 md:py-28"
        style={{
          background:
            "radial-gradient(ellipse 60% 90% at 50% 110%, rgba(16,185,129,0.18) 0%, transparent 60%), #06090f",
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-balance">
            지금 설비의 필터,
            <br />
            언제 교체했는지 <em className="not-italic text-[#8ff2d8]">기억나시나요?</em>
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-lg mx-auto">
            기억나지 않는다면 그게 신호입니다. 필터 사진 한 장 보내주시면, 나머지는 저희가
            합니다.
          </p>
          <div className="mt-11 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-extrabold px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5"
            >
              카카오톡으로 사진 보내기
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 text-white font-extrabold px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5"
            >
              견적서 양식으로 문의
            </Link>
          </div>
          <p className="mt-7 text-sm text-white/40">
            소량 구매는{" "}
            <a
              href="https://smartstore.naver.com/egfilter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-bold hover:underline"
            >
              네이버 스마트스토어
            </a>
            에서 바로 주문 가능합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
