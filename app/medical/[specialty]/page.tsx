import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specialties } from "../../data/specialties";

const BASE_URL = "https://evergreen-filter.vercel.app";
const KAKAO_URL = "https://pf.kakao.com/_zjkxab";

interface Props {
  params: Promise<{ specialty: string }>;
}

export function generateStaticParams() {
  return specialties.map((s) => ({ specialty: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty } = await params;
  const data = specialties.find((s) => s.slug === specialty);
  if (!data) return { title: "페이지를 찾을 수 없습니다" };

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `/medical/${data.slug}` },
    openGraph: {
      title: `${data.metaTitle} | 에버그린필터`,
      description: data.metaDescription,
      url: `${BASE_URL}/medical/${data.slug}`,
      siteName: "에버그린필터",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function SpecialtyPage({ params }: Props) {
  const { specialty } = await params;
  const data = specialties.find((s) => s.slug === specialty);
  if (!data) notFound();

  const others = specialties.filter((s) => s.slug !== data.slug);

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
        name: "병원·의료시설 헤파필터",
        item: `${BASE_URL}/medical`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${data.name} 필터`,
        item: `${BASE_URL}/medical/${data.slug}`,
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
            <Link href="/medical" className="hover:text-[#8ff2d8] transition-colors">
              병원·의료시설 필터
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{data.name}</span>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2.5 bg-brand-green/10 border border-brand-green/25 rounded-full px-5 py-2 text-sm font-bold text-[#8ff2d8]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_10px_#10b981]" />
            {data.badge}
          </div>

          <h1 className="mt-8 text-3xl md:text-5xl font-black leading-[1.22] tracking-tight max-w-3xl mx-auto text-balance">
            <span className="sr-only">{data.name} 헤파필터 — </span>
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
            10년+ 의료·클린룸 필터 경력 · 누적 거래처 500+ · 세금계산서 발행
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

      {/* ═══ SOLUTION — 권장 구성 ═══ */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-brand-green font-black text-sm tracking-widest uppercase">
            Solution
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight text-balance">
            {data.name} 권장 필터 구성
          </h2>
          <p className="mt-5 text-gray-500 text-lg max-w-xl">
            공간별 오염원에 맞춘 구성입니다. 현장 사진 한 장이면 규격까지 맞춰 제안해
            드립니다.
          </p>

          <div className="mt-12 overflow-x-auto bg-white border border-gray-200 rounded-2xl">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-[0.7rem] uppercase tracking-[0.14em] text-gray-400">
                  <th className="px-6 py-4 font-bold">적용 공간</th>
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
              href="/guide/h13-vs-h14"
              className="font-bold text-[#0b9e6e] hover:underline"
            >
              H13 vs H14 차이 가이드
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

      {/* ═══ PROCESS 요약 ═══ */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-brand-green font-black text-sm tracking-widest uppercase">
            Process
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight text-balance">
            원장님 시간은 3분이면 충분합니다
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                title: "필터 사진을 카톡으로",
                desc: "기존 필터 라벨 또는 가로×세로×두께 실측 사진을 보내주세요.",
              },
              {
                step: "02",
                title: "당일 견적 + 등급 제안",
                desc: "규격 확인 후 등급·수량·프레임 옵션별 견적서를 당일 회신합니다.",
              },
              {
                step: "03",
                title: "배송, 그리고 교체 알림",
                desc: "전국 배송으로 받으시고 끝. 교체 시기가 되면 먼저 연락드립니다.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-white border border-gray-200 rounded-2xl p-8">
                <span className="text-xs font-black tracking-[0.18em] text-[#0b9e6e]">
                  {s.step}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-gray-900">{s.title}</h3>
                <p className="mt-2.5 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-surface py-20 md:py-28">
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

      {/* ═══ 다른 진료과 ═══ */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-extrabold text-gray-900">다른 진료과 필터 안내</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/medical/${s.slug}`}
                className="group bg-surface border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
              >
                <span className="block text-xs font-bold text-gray-400">{s.nameEn}</span>
                <span className="mt-1 flex items-center justify-between font-extrabold text-gray-900">
                  {s.name} 필터
                  <span className="text-[#0b9e6e] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </Link>
            ))}
            <Link
              href="/medical"
              className="group bg-surface border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
            >
              <span className="block text-xs font-bold text-gray-400">Medical</span>
              <span className="mt-1 flex items-center justify-between font-extrabold text-gray-900">
                수술실·음압병실 필터
                <span className="text-[#0b9e6e] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>
          </div>
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
            지금 천장 위 필터,
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
