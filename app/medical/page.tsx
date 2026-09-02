import type { Metadata } from "next";
import Link from "next/link";
import { specialties } from "../data/specialties";

export const metadata: Metadata = {
  title: "병원·수술실 헤파필터 | 안과·피부과 의료시설 전문",
  description:
    "수술실·안과·피부과·음압병실 전문 헤파필터. H13·H14 등급(EN 1822), 비표준 규격 맞춤 제작, 전국 배송. 필터 사진 한 장이면 당일 견적.",
  keywords:
    "병원 헤파필터,수술실 헤파필터,안과 수술실 필터,피부과 시술실 필터,음압병실 헤파필터,의료시설 헤파필터,H13 필터,H14 필터",
  alternates: { canonical: "/medical" },
  openGraph: {
    title: "병원·수술실 헤파필터 전문 | 에버그린필터",
    description:
      "수술실·안과·피부과·음압병실 전문 헤파필터. H13·H14 등급, 규격 맞춤 제작, 전국 배송. 필터 사진 한 장이면 당일 견적.",
    url: "https://evergreen-filter.vercel.app/medical",
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
};

const KAKAO_URL = "https://pf.kakao.com/_zjkxab";

const pains = [
  {
    who: "인증·점검 시즌",
    title: "“필터 교체 대장 보여주세요”",
    desc: "의료기관 인증평가와 정기 점검에서 공기질 관리 이력은 반드시 확인됩니다. 그때 찾기 시작하면 늦습니다.",
  },
  {
    who: "환자 리뷰 시대",
    title: "“병원 특유의 냄새가 나요”",
    desc: "환자는 진료 실력을 평가하지 못해도 공기는 즉시 느낍니다. 리뷰 한 줄이 신규 환자의 첫인상이 됩니다.",
  },
  {
    who: "조용한 성능 저하",
    title: "필터는 고장 나지 않습니다",
    desc: "서서히 막힐 뿐입니다. 차압이 오르면 풍량이 떨어지고 전기요금이 올라가는데, 눈에 보이는 신호는 없습니다.",
  },
];

const segments = [
  {
    tag: "수술실 · OR",
    grade: "H14",
    title: "수술실 헤파필터",
    desc: "수술대 상부 급기(라미나 플로우)의 최종단. 밀봉 개스킷과 누설 없는 설치가 핵심이며, 차압 기준 교체 주기를 함께 관리해 드립니다.",
    specs: [
      { label: "권장 등급", value: "H14 (EN 1822)", hl: true },
      { label: "적용 위치", value: "급기 디퓨저 · 공조기 최종단" },
      { label: "교체 주기", value: "6~12개월 (차압 기준)" },
    ],
  },
  {
    tag: "안과 · 라식/백내장",
    grade: "H14",
    title: "안과 수술실 헤파필터",
    desc: "안내(眼內) 수술은 입자 하나가 안내염으로 이어질 수 있어 청정도 관리가 특히 엄격합니다. 소형 수술실 비표준 규격 맞춤 제작이 가장 많은 분야입니다.",
    specs: [
      { label: "권장 등급", value: "H13~H14 (EN 1822)", hl: true },
      { label: "적용 위치", value: "레이저실 · 수술실 급기부" },
      { label: "특이 사항", value: "소형 커스텀 규격 대응" },
    ],
  },
  {
    tag: "피부과 · 시술실",
    grade: "H13",
    title: "피부과 시술실 헤파필터",
    desc: "레이저 시술 연기(플룸)와 미세 분진은 시술자와 환자가 함께 마십니다. 시술실 급기 청정도를 헤파 등급으로 끌어올리고 프리필터로 수명을 늘립니다.",
    specs: [
      { label: "권장 등급", value: "H13 (EN 1822)", hl: true },
      { label: "적용 위치", value: "시술실 급기 · 공기청정 유닛" },
      { label: "특이 사항", value: "프리필터 병행 권장" },
    ],
  },
  {
    tag: "병동 · 음압격리병실",
    grade: "H14",
    title: "병동·음압병실 헤파필터",
    desc: "음압격리병실은 배기 공기를 헤파필터로 거른 뒤 배출하는 것이 원칙입니다. 병동 공용부·회복실 급기까지 병원 전체를 일괄 관리하세요.",
    specs: [
      { label: "권장 등급", value: "H13~H14 (EN 1822)", hl: true },
      { label: "적용 위치", value: "음압병실 배기단 · 병동 공조" },
      { label: "특이 사항", value: "교체 일정 일괄 관리" },
    ],
  },
];

const steps = [
  {
    title: "필터 사진을 카톡으로",
    desc: "기존 필터 라벨 또는 가로×세로×두께 실측 사진을 보내주세요. 진료 사이 쉬는 시간이면 충분합니다.",
    time: "원장님 소요 시간 — 3분",
  },
  {
    title: "당일 견적 + 등급 제안",
    desc: "규격 확인 후 진료과에 맞는 등급·수량·프레임 옵션별 견적서를 당일 회신합니다. 견적서·거래명세서 등 품의 서류를 함께 드립니다.",
    time: "저희 소요 시간 — 당일",
  },
  {
    title: "배송, 그리고 다음 교체 알림",
    desc: "전국 배송으로 받으시고 끝. 교체 주기가 되면 저희가 먼저 연락드립니다. 재주문은 메시지 한 통입니다.",
    time: "이후 원장님 할 일 — 없음",
  },
];

const specRows = [
  { item: "여과 등급", value: "H13 ~ H14 (EN 1822)", note: "진료과별 등급 제안" },
  { item: "여과 효율", value: "99.97 ~ 99.995% (0.3μm MPPS)", note: "초미세 입자 기준" },
  { item: "미디어", value: "유리섬유(Glass Fiber)", note: "저차압 고효율" },
  { item: "프레임", value: "알루미늄 · 스테인리스 · MDF", note: "의료시설은 AL/SUS 권장" },
  { item: "규격", value: "610×610 · 305×610mm 외", note: "비표준 맞춤 제작 가능" },
  { item: "교체 주기", value: "6~12개월", note: "차압 기준 관리 안내" },
];

const faqs = [
  {
    q: "수술실 헤파필터 교체 주기는 어떻게 되나요?",
    a: "일반적으로 6~12개월이며, 정확한 시점은 차압계 수치로 판단하는 것이 원칙입니다. 초기 차압 대비 2배 수준에 도달하면 교체를 권장하며, 프리필터를 함께 운용하면 헤파필터 수명을 크게 늘릴 수 있습니다.",
  },
  {
    q: "H13과 H14 등급은 어떤 차이가 있나요?",
    a: "EN 1822 기준으로 H13은 99.95% 이상, H14는 99.995% 이상의 포집 효율을 갖습니다. 수술실 최종단에는 H14를, 시술실·병동 급기에는 H13을 권장하는 것이 일반적입니다.",
  },
  {
    q: "안과 수술실(라식·백내장)에는 어떤 필터가 필요한가요?",
    a: "안내 수술은 감염 리스크 관리가 특히 엄격해 H13~H14 등급을 권장합니다. 안과 수술실은 비표준 소형 규격이 많아 맞춤 제작 문의가 가장 많은 분야이기도 합니다. 기존 필터 사진을 보내주시면 동일 규격으로 제작해 드립니다.",
  },
  {
    q: "음압격리병실 배기용 필터도 공급하나요?",
    a: "네. 음압격리병실은 배기 공기를 헤파필터로 여과한 뒤 배출해야 하며, 배기단용 H13~H14 필터와 교체 시 오염 방지를 위한 안내를 함께 제공합니다.",
  },
  {
    q: "기존 필터 규격을 모르는데 견적이 가능한가요?",
    a: "가능합니다. 설치된 필터의 라벨 사진이나 프레임 실측 치수(가로×세로×두께)를 카카오톡으로 보내주시면 규격을 확인해 당일 견적을 드립니다.",
  },
  {
    q: "병원 행정 절차에 필요한 서류 대응이 가능한가요?",
    a: "네. 견적서·거래명세서 등 병원 행정에 필요한 서류를 함께 준비해 드립니다. 증빙 처리 방식은 주문 경로에 따라 사전에 확인해 드리며, 데스크(실장님)와 직접 진행하실 수 있습니다.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "홈",
      item: "https://evergreen-filter.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "병원·의료시설 헤파필터",
      item: "https://evergreen-filter.vercel.app/medical",
    },
  ],
};

export default function MedicalPage() {
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
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 pt-12 pb-14 md:pt-16 md:pb-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="eyebrow">병원 · 안과 · 피부과 · 수술실 전문 HEPA</span>

            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.2] tracking-[-0.02em] text-gray-900 text-balance md:text-[3rem] md:leading-[1.16]">
              <span className="sr-only">병원·수술실 헤파필터 — </span>
              원장님 병원의 평판은 <span className="font-mono text-primary">0.3μm</span>
              에서 갈립니다
            </h1>

            <p className="mt-6 max-w-xl text-base leading-[1.75] text-gray-500 md:text-[17px]">
              인테리어와 장비는 눈에 보이지만, 공기는 보이지 않습니다.{" "}
              <strong className="font-semibold text-gray-800">수술실·시술실 전문 헤파필터</strong>
              를 병원 규격에 맞춰 제작하고, 교체 시기까지 대신 기억해 드립니다.
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

          {/* 여과 스펙 패널 */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white lg:col-span-5">
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
              <span className="text-sm font-semibold text-gray-900">의료시설 여과 사양</span>
              <span className="font-mono text-[11px] tracking-[0.06em] text-gray-500">
                H14 FILTRATION LAYER
              </span>
            </div>
            {[
              { num: "99.995", unit: "%", label: "0.3μm 입자 포집 효율" },
              { num: "H13·14", unit: "", label: "EN 1822 인증 등급" },
              { num: "당일", unit: "", label: "규격 확인 시 견적 회신" },
              { num: "전국", unit: "", label: "표준·비표준 규격 배송" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${
                  i < 3 ? "border-b border-gray-100" : ""
                }`}
              >
                <span className="text-[13px] text-gray-500">{s.label}</span>
                <span className="font-mono text-sm font-semibold text-gray-900">
                  {s.num}
                  {s.unit && <small className="ml-0.5 text-primary">{s.unit}</small>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="eyebrow">
            문제
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight max-w-xl text-balance">
            개원 이후, 공조를 챙기는 사람이 아무도 없습니다
          </h2>
          <p className="mt-5 text-gray-500 text-lg max-w-xl">
            진료·직원·마케팅은 원장님이 다 챙기지만, 천장 위 필터는 인테리어 업체가 떠난
            순간부터 무관리 상태가 됩니다.
          </p>

          <div className="rule-ink mt-10 grid gap-x-8 gap-y-9 md:grid-cols-3">
            {pains.map((p) => (
              <div key={p.who} className="pt-6">
                <span className="font-mono text-xs text-gray-500">{p.who}</span>
                <h3 className="mt-2.5 text-[19px] font-semibold leading-snug text-gray-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>

          <blockquote className="mt-12 max-w-3xl rounded-xl bg-surface-dark px-8 py-9 text-lg font-medium leading-[1.6] text-paper/85 md:px-10 md:text-xl">
            수술 잘하는 병원은 많습니다.
            <br />
            <em className="not-italic text-[#8fd9c0]">
              공기까지 관리한다고 말할 수 있는 병원
            </em>
            은 드뭅니다.
            <span className="mt-4 block text-xs text-paper/45">
              — 이 한 줄이 원장님 병원의 차별화 포인트가 됩니다
            </span>
          </blockquote>
        </div>
      </section>

      {/* ═══ SOLUTION — 진료과별 ═══ */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="eyebrow">
            권장 구성
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight text-balance">
            진료과별로 답이 다릅니다
          </h2>
          <p className="mt-5 text-gray-500 text-lg max-w-xl">
            같은 헤파필터라도 수술실과 시술실의 요구 조건은 다릅니다. 현장 사진 한 장이면
            등급부터 규격까지 맞춰 제안해 드립니다.
          </p>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {segments.map((seg) => (
              <div
                key={seg.title}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 transition-colors hover:border-primary/45"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-7 top-7 font-mono text-sm font-semibold text-gray-300"
                >
                  {seg.grade}
                </span>
                <span className="inline-block text-[0.7rem] font-extrabold tracking-wider text-[#176b50] bg-brand-green/10 border border-brand-green/25 px-3 py-1 rounded-md">
                  {seg.tag}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-gray-900">{seg.title}</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed md:min-h-[76px]">
                  {seg.desc}
                </p>
                <dl className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-sm">
                  {seg.specs.map((s) => (
                    <div key={s.label} className="flex gap-4">
                      <dt className="w-22 shrink-0 text-gray-400 font-semibold">{s.label}</dt>
                      <dd className={`font-bold ${s.hl ? "text-[#176b50]" : "text-gray-800"}`}>
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-sm font-bold text-gray-400">
              개원가 진료과목별 전문 안내 페이지도 준비되어 있습니다
            </p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialties.map((s) => (
                <Link
                  key={s.slug}
                  href={`/medical/${s.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 평판 마케팅 밴드 ═══ */}
      <section className="bg-paper px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-xl bg-surface-dark px-8 py-12 md:px-16 md:py-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">
              평판
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-paper text-balance md:text-[2rem]">
              필터 교체가
              <br />
              마케팅 소재가 됩니다
            </h2>
            <p className="mt-4 leading-[1.75] text-paper/70">
              &ldquo;저희는 수술실 공기를{" "}
              <strong className="font-semibold text-[#8fd9c0]">H14 등급 헤파필터</strong>로
              관리합니다&rdquo; — 블로그·인스타그램·상담 멘트에 쓸 수 있는 한 줄을 드립니다.
              교체 이력과 등급 자료를 정리해 드리니, 환자에게 보여줄 수 있는{" "}
              <strong className="font-semibold text-[#8fd9c0]">근거 있는 청정 관리 스토리</strong>가
              생깁니다.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.04] p-6">
            <div className="rounded-md border border-white/10 bg-white/5 px-5 py-4 text-sm text-paper/75">
              <b className="tracking-widest text-[#8fd9c0]">★★★★★</b>
              <span className="block mt-1.5">
                &ldquo;수술실 공기까지 등급 관리한다고 설명해주셔서 믿음이 갔어요. 이런 병원
                처음이에요.&rdquo;
              </span>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 px-5 py-4 text-sm text-paper/75">
              <b className="tracking-widest text-[#8fd9c0]">★★★★★</b>
              <span className="block mt-1.5">
                &ldquo;대기실 공기가 확실히 쾌적해요. 아이 데리고 다니기 좋아요.&rdquo;
              </span>
            </div>
            <p className="text-center text-[0.7rem] text-paper/40">
              환자 리뷰 예시 — 공기 관리가 리뷰 언어로 번역되는 방식
            </p>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="eyebrow">
            진행 방식
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 leading-tight text-balance">
            원장님 시간은 3분이면 충분합니다
          </h2>
          <p className="mt-5 text-gray-500 text-lg max-w-xl">
            규격을 몰라도 됩니다. 지금 천장에 있는 필터 라벨 사진 한 장이면 시작됩니다.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white border border-gray-200 rounded-2xl p-8">
                <span className="text-xs font-black tracking-[0.18em] text-[#176b50]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-gray-900">{step.title}</h3>
                <p className="mt-2.5 text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                <span className="inline-block mt-4 text-xs font-extrabold text-[#176b50] bg-brand-green/10 px-3 py-1 rounded-md">
                  {step.time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-11 max-w-2xl border-[1.5px] border-dashed border-brand-green/50 rounded-2xl px-8 py-6 text-gray-500">
            <strong className="text-gray-900 font-extrabold">
              실장님께 이 페이지만 전달하셔도 됩니다.
            </strong>{" "}
            규격 확인부터 행정 서류(견적서·거래명세서)까지 데스크와 직접 진행
            가능하도록 안내해 드립니다.
          </div>
        </div>
      </section>

      {/* ═══ SPEC ═══ */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <span className="eyebrow">
            사양
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900">
            의료시설용 헤파필터 사양
          </h2>

          <div className="mt-12 overflow-x-auto bg-white border border-gray-200 rounded-2xl">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-[0.7rem] uppercase tracking-[0.14em] text-gray-400">
                  <th className="px-6 py-4 font-bold">항목</th>
                  <th className="px-6 py-4 font-bold">사양</th>
                  <th className="px-6 py-4 font-bold">비고</th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr
                    key={row.item}
                    className={i < specRows.length - 1 ? "border-b border-gray-100" : ""}
                  >
                    <td className="px-6 py-4 text-gray-500 font-semibold">{row.item}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 tabular-nums">
                      {row.value}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            * 가동 시간, 프리필터 유무, 외기 조건에 따라 실제 교체 주기는 달라집니다. 견적 시
            함께 안내해 드립니다.{" "}
            <Link href="/products/hepa-filter" className="font-bold text-[#176b50] hover:underline">
              헤파필터 제품 상세 보기 →
            </Link>
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <span className="eyebrow">
            자주 묻는 질문
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900">자주 묻는 질문</h2>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
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
