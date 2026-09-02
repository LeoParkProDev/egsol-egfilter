import type { Metadata } from "next";
import Link from "next/link";
import { services } from "../data/services";
import { SITE } from "../data/site";

const BASE_URL = "https://evergreen-filter.vercel.app";

export const metadata: Metadata = {
  title: "서비스 | 정기 납품·맞춤 제작·병원/관공서 납품·협력사 공급",
  description:
    "필터를 어떤 방식으로 받으실지 고르세요. 정기 납품과 연간 단가 계약, 무료 필터 실사표, 비표준 맞춤 제작, 병원·관공서 납품, 설비업체 파트너까지 6가지 거래 방식을 정리했습니다.",
  keywords:
    "에어필터 정기납품,필터 실사표,비표준 필터 제작,병원 필터 납품,관공서 필터 납품,필터 협력사,연간 단가 계약,필터 공급업체",
  alternates: { canonical: "/service" },
  openGraph: {
    title: "서비스 | 에버그린필터",
    description:
      "정기 납품·연간 단가 계약, 무료 필터 실사표, 비표준 맞춤 제작, 병원·관공서 납품, 설비업체 파트너. 필터를 받는 방식부터 정리해 드립니다.",
    url: `${BASE_URL}/service`,
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ServiceHubPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "서비스", item: `${BASE_URL}/service` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "에버그린필터 서비스",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${BASE_URL}/service/${s.slug}`,
    })),
  };

  const hasPhone = Boolean(SITE.phone);

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
          <Link href="/" className="hover:text-[#0b9e6e] transition-colors">
            홈
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">서비스</span>
        </nav>

        <header className="mt-8 text-center">
          <span className="text-[#0b9e6e] font-black text-sm tracking-widest uppercase">
            Service
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black text-gray-900 leading-[1.25] text-balance">
            필터를 <span className="text-[#0b9e6e]">어떻게 받으실지</span>부터 고르세요
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            같은 헤파필터라도 병원 구매과와 시공업체가 필요한 방식은 다릅니다.
            <br className="hidden md:block" />
            제품 목록보다 거래 방식을 먼저 정리해 두었습니다.
          </p>
        </header>

        <section className="mt-14">
          <h2 className="sr-only">서비스 목록</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/service/${s.slug}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-brand-green/45"
              >
                <div className="flex items-center gap-3 text-xs font-extrabold">
                  <span className="text-[#0b9e6e] bg-brand-green/10 border border-brand-green/25 px-3 py-1 rounded-full">
                    {s.badge}
                  </span>
                  <span className="text-gray-400 tracking-wide uppercase">{s.nameEn}</span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-gray-900 leading-snug">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {s.heroDesc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0b9e6e]">
                  자세히 보기
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-gray-100 border border-gray-200 px-6 py-6">
          <h2 className="text-sm font-extrabold text-gray-900">먼저 알려드릴 점</h2>
          <p className="mt-3 text-sm text-gray-600 leading-[1.9]">
            취급 품목은 헤파필터, 미듐필터(미디움필터), 부직포·프리필터, 부직포롤 네 가지입니다.
            저희가 하는 일은 필터 자재를 공급하는 것이고, 필터를 뜯고 끼우는 교체 작업은 시설팀이나
            협력 시공사가 진행합니다. 위 여섯 가지는 제품이 아니라 그 자재를 받으시는 방식의
            차이입니다.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-14 bg-surface-dark rounded-3xl px-8 md:px-10 py-10 text-center text-white">
          <h2 className="text-2xl font-black text-balance">
            어떤 방식이 맞는지 모르겠다면
          </h2>
          <p className="mt-3 text-white/60 leading-relaxed">
            현장 사진 몇 장과 대략의 설비 수만 알려주시면, 어느 방식이 맞을지 먼저 정리해
            드립니다. 고르고 오실 필요 없습니다.
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
              카카오톡으로 상담하기
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
