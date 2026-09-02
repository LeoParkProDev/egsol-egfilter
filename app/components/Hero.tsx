import Link from "next/link";
import { SITE } from "../data/site";

/** 히어로 우측 스펙 패널의 행. 값은 모노스페이스로 자릿수를 맞춘다. */
const specRows = [
  { label: "헤파 등급", value: "H13 · H14 (EN 1822)" },
  { label: "표준 규격", value: "610 · 594 계열 재고 출고" },
  { label: "비표준 제작", value: "실측만으로 3 – 7 일", accent: true },
  { label: "서류", value: "견적서 · 거래명세서 · 세금계산서" },
];

const trustPoints = ["영업일 30분 내 1차 회신", "세금계산서 · 거래명세서", "전국 납품"];

export default function Hero() {
  return (
    <section className="bg-paper break-keep">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        {/* 좌: 카피 + CTA */}
        <div className="lg:col-span-7">
          <span className="eyebrow">병원 수술실 · 클린룸 · 공장 공조 에어필터</span>

          <h1 className="mt-7 text-[2rem] leading-[1.22] font-semibold tracking-[-0.02em] text-gray-900 sm:text-4xl md:text-[3.25rem] md:leading-[1.18] text-balance">
            필터 라벨 사진 한 장이면
            <br className="hidden sm:block" /> 당일 견적, 규격 없어도 제작
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.75] text-gray-500 md:text-lg">
            <span className="whitespace-nowrap">헤파(H13·H14)</span> ·{" "}
            <span className="whitespace-nowrap">미듐(미디움)</span> ·{" "}
            <span className="whitespace-nowrap">부직포·프리</span> ·{" "}
            <span className="whitespace-nowrap">부직포롤</span>. 표준 규격은 재고 출고,
            비표준은 실측만으로 3~7일 맞춤 제작해 전국 납품합니다.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <svg
                className="h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2l1.3-2h6l1.3 2h1.2A2.5 2.5 0 0 1 20 8.5V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                <circle cx="12" cy="12.5" r="3.5" />
              </svg>
              사진으로 견적 받기
            </Link>
            <a
              href={SITE.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="kakao-dot inline-flex items-center justify-center gap-2.5 rounded-md border border-gray-900 px-6 py-4 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              카카오톡 상담
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-gray-500">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* 우: 스펙 패널 — 플리츠 무늬 + 여과 곡선 */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white lg:col-span-5">
          <div className="relative h-[168px] border-b border-gray-200 bg-surface">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 520 168"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <pattern id="hero-pleat" width="14" height="14" patternUnits="userSpaceOnUse">
                  <path d="M7 0V14" stroke="var(--color-accent)" strokeOpacity="0.35" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="520" height="168" fill="url(#hero-pleat)" />
              <path
                d="M0 120 C 90 60, 160 60, 260 110 S 430 150, 520 70"
                stroke="var(--color-ink)"
                strokeWidth="1.2"
                strokeOpacity="0.8"
                fill="none"
              />
            </svg>
            <span className="absolute left-5 top-4 font-mono text-[11px] font-medium tracking-[0.08em] text-gray-500">
              FILTRATION SPEC
            </span>
            <span className="absolute bottom-3.5 right-5 font-mono text-xs font-semibold text-gray-900">
              0.3 μm · 99.995 %
            </span>
          </div>

          <dl>
            {specRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${
                  i < specRows.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <dt className="text-[13px] text-gray-500">{row.label}</dt>
                <dd
                  className={`text-right font-mono text-sm font-semibold ${
                    row.accent ? "text-primary" : "text-gray-900"
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* 신뢰 스트립 — 괘선 4칸 */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 border-y border-gray-200 md:grid-cols-4">
          {[
            { k: "REPLY", v: "영업일 30분 내 1차 회신" },
            { k: "LEAD TIME", v: "비표준 3~7일 · 표준 당일 출고" },
            { k: "DOCUMENTS", v: "견적서 · 거래명세서 · 세금계산서" },
            { k: "CLIENTS", v: "누적 거래처 500+ · 정기 납품" },
          ].map((item, i) => (
            <div
              key={item.k}
              className={`py-4 md:py-5 ${i > 0 ? "md:border-l md:border-gray-100 md:pl-6" : ""} ${
                i % 2 === 1 ? "border-l border-gray-100 pl-4 md:pl-6" : ""
              }`}
            >
              <p className="font-mono text-[11px] tracking-[0.08em] text-gray-500">{item.k}</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 md:text-[15px]">{item.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
