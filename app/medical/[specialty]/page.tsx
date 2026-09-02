import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specialties } from "../../data/specialties";
import { guideText, guidesFor, sizesFor } from "../../lib/related";
import LaminarFlow from "../../components/LaminarFlow";

const BASE_URL = "https://evergreen-filter.vercel.app";
const KAKAO_URL = "https://pf.kakao.com/_zjkxab";

// 층류 급기 단면도는 수술실 계열 진료과에만 붙인다. 치과·한의원 등에는 해당 없음.
const LAMINAR_SPECIALTIES = new Set(["operating-room", "ophthalmology", "orthopedics"]);

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

  // 함께 보는 가이드·관련 규격은 진료과 keywords로 related 엔진이 고른다 (app/lib/related.ts).
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
    <main className="bg-paper break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ═══ HERO ═══ */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 pt-10 pb-16 md:pt-14 md:pb-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <nav
              aria-label="breadcrumb"
              className="flex items-center gap-2 text-[13px] text-gray-500"
            >
              <Link href="/medical" className="transition-colors hover:text-primary">
                병원·의료시설 필터
              </Link>
              <span className="text-gray-300">/</span>
              <span className="font-medium text-gray-900">{data.name}</span>
            </nav>

            <span className="eyebrow mt-6">{data.badge}</span>

            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.22] tracking-[-0.02em] text-gray-900 text-balance md:text-[2.75rem] md:leading-[1.2]">
              <span className="sr-only">{data.name} 헤파필터 — </span>
              {data.heroTitle[0]} <span className="text-primary">{data.heroTitle[1]}</span>
              {data.heroTitle[2]}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-[1.75] text-gray-500 md:text-[17px]">
              {data.heroDesc}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-4 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                필터 사진 보내고 3분 견적
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-md border border-gray-900 px-6 py-4 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                견적서 양식으로 문의
              </Link>
            </div>
            <p className="mt-6 text-[13px] text-gray-500">
              10년+ 의료·클린룸 필터 경력 · 누적 거래처 500+ · 품의 서류 대응
            </p>
          </div>

          {/* 권장 구성 패널 — 이 페이지의 핵심 표를 히어로에서 바로 보여준다 */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white lg:col-span-5">
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
              <span className="text-sm font-semibold text-gray-900">
                {data.name} 권장 구성
              </span>
              <span className="font-mono text-[11px] tracking-[0.06em] text-gray-500">
                RECOMMENDED
              </span>
            </div>
            {data.setups.map((row, i) => (
              <div
                key={row.area}
                className={`grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-center gap-3 px-5 py-4 ${
                  i < data.setups.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div>
                  <span className="block text-sm font-semibold text-gray-900">{row.area}</span>
                  <span className="mt-0.5 block text-xs leading-[1.5] text-gray-500">
                    {row.note}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-sm font-semibold text-primary">
                    {row.grade}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">{row.filter}</span>
                </div>
              </div>
            ))}
            <p className="border-t border-gray-200 bg-surface px-5 py-4 text-xs leading-[1.6] text-gray-500">
              {data.setupNote}
            </p>
          </div>
        </div>
      </section>

      {/* 수술실 계열은 층류 급기 구조를 단면도로 먼저 보여준다 */}
      {LAMINAR_SPECIALTIES.has(data.slug) && (
        <section className="bg-white pt-4 pb-16 md:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <LaminarFlow />
          </div>
        </section>
      )}

      {/* ═══ PROBLEM ═══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="eyebrow">
            문제
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight max-w-2xl text-balance">
            {data.painsHeading}
          </h2>
          <p className="mt-5 text-gray-500 text-lg max-w-xl">{data.painsSub}</p>

          <div className="rule-ink mt-10 grid gap-x-8 gap-y-9 md:grid-cols-3">
            {data.pains.map((p) => (
              <div key={p.who} className="pt-6">
                <span className="font-mono text-xs text-gray-500">{p.who}</span>
                <h3 className="mt-2.5 text-[19px] font-semibold leading-snug text-gray-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION — 권장 구성 ═══ */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="eyebrow">
            권장 구성
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight text-balance">
            {data.name} 권장 필터 구성
          </h2>
          <p className="mt-5 text-gray-500 max-w-xl leading-[1.7]">
            공간별 오염원에 맞춘 구성입니다. 현장 사진 한 장이면 규격까지 맞춰 제안해
            드립니다.
          </p>

          <div className="table-scroll-hint rule-ink mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface text-left font-mono text-[11px] tracking-[0.06em] text-gray-500">
                  <th className="px-5 py-3 font-medium">AREA</th>
                  <th className="px-5 py-3 font-medium">FILTER</th>
                  <th className="px-5 py-3 font-medium">GRADE</th>
                  <th className="px-5 py-3 font-medium">NOTE</th>
                </tr>
              </thead>
              <tbody>
                {data.setups.map((row, i) => (
                  <tr
                    key={row.area}
                    className={i < data.setups.length - 1 ? "border-b border-gray-100" : ""}
                  >
                    <td className="px-5 py-4 font-semibold text-gray-900">{row.area}</td>
                    <td className="px-5 py-4 text-gray-700">{row.filter}</td>
                    <td className="px-5 py-4 font-mono font-semibold text-primary">
                      {row.grade}
                    </td>
                    <td className="px-5 py-4 text-gray-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 max-w-3xl rounded-md border border-gray-200 bg-white px-6 py-5 text-sm leading-[1.7] text-gray-500">
            <strong className="font-semibold text-gray-900">알아두세요.</strong>{" "}
            {data.setupNote}
          </div>

          <p className="mt-6 text-sm text-gray-500">
            등급 기준이 궁금하시다면{" "}
            <Link
              href="/guide/h13-vs-h14"
              className="font-bold text-[#176b50] hover:underline"
            >
              H13 vs H14 차이 가이드
            </Link>
            와{" "}
            <Link
              href="/guide/hepa-filter-replacement-cycle"
              className="font-bold text-[#176b50] hover:underline"
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
          <span className="eyebrow">
            진행 방식
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight text-balance">
            원장님 시간은 3분이면 충분합니다
          </h2>
          <div className="rule-ink mt-10 grid gap-x-8 gap-y-9 md:grid-cols-3">
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
              <div key={s.step} className="pt-6">
                <span className="font-mono text-xs text-gray-500">STEP {s.step}</span>
                <h3 className="mt-2.5 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <span className="eyebrow">
            자주 묻는 질문
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
                    className="shrink-0 text-xl font-light text-[#176b50] transition-transform group-open:rotate-45"
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
                  <span className="text-[#176b50] group-hover:translate-x-1 transition-transform">
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
                <span className="text-[#176b50] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 함께 보는 가이드 · 관련 규격 ═══ */}
      <section className="bg-surface py-16 md:py-20 border-t border-gray-100">
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
                className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 text-[0.65rem] font-extrabold">
                  <span className="text-[#176b50] bg-brand-green/10 border border-brand-green/25 px-2.5 py-0.5 rounded-md">
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
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-brand-green/45 hover:text-[#176b50]"
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
      <section className="bg-paper px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-xl bg-surface-dark px-8 py-12 md:px-16 md:py-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-paper md:text-[2rem]">
              지금 천장 위 필터, 언제 교체했는지{" "}
              <em className="not-italic text-[#8fd9c0]">기억나시나요?</em>
            </h2>
            <p className="mt-3.5 leading-[1.7] text-paper/70">
              기억나지 않는다면 그게 신호입니다. 필터 사진 한 장 보내주시면, 나머지는 저희가
              합니다.
            </p>
            <p className="mt-5 text-sm text-paper/45">
              소량 구매는{" "}
              <a
                href="https://smartstore.naver.com/egfilter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/70 underline underline-offset-2 hover:text-paper"
              >
                네이버 스마트스토어
              </a>
              에서 바로 주문 가능합니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="kakao-dot inline-flex items-center justify-center gap-2.5 rounded-md bg-paper px-6 py-4 font-semibold text-gray-900 transition-colors hover:bg-white"
            >
              카카오톡으로 사진 보내기
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-md border border-paper/40 px-6 py-4 font-semibold text-paper transition-colors hover:bg-white/5"
            >
              견적서 양식으로 문의
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
