import Link from "next/link";

/** 히어로 우측 스펙 패널의 행. 값은 모노스페이스로 자릿수를 맞춘다. */
const specRows = [
  { label: "제품 종류", value: "헤파 · 미듐 · 프리 · 부직포롤" },
  { label: "프레임형", value: "등급 · 가로 · 세로 · 두께" },
  { label: "부직포롤", value: "두께 · 폭 · 길이" },
  { label: "주문 전 확인", value: "옵션 · 가격 · 배송 조건", accent: true },
];

const trustPoints = ["제품 종류와 등급 확인", "규격·형태 확인", "옵션·가격·배송 조건은 스토어에서 확인"];

export default function Hero() {
  return (
    <section className="bg-paper break-keep">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        {/* 좌: 카피 + CTA */}
        <div className="lg:col-span-7">
          <span className="eyebrow">병원 · 클린룸 · 공장용 에어필터</span>

          <h1 className="mt-7 text-[2rem] leading-[1.22] font-semibold tracking-[-0.02em] text-gray-900 sm:text-4xl md:text-[3.25rem] md:leading-[1.18] text-balance">
            산업용 필터,
            <br className="hidden sm:block" /> 규격 확인부터 스마트스토어 주문까지
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.75] text-gray-500 md:text-lg">
            헤파 · 미듐 · 프리 · 부직포롤 제품을 살펴보세요. 프레임형은 등급과 가로·세로·두께를,
            롤형은 두께·폭·길이를 확인하고, 옵션·가격·배송 조건은 스마트스토어에서 확인하세요.
            규격이 맞지 않거나 사양을 모르시면 사진 견적을 이용할 수 있습니다.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              data-cta-placement="hero_store"
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
                <path d="M4 10h16v10H4zM3 10l2-6h14l2 6M8 10v10m8-10v10M9 14h6" />
              </svg>
              제품별 스마트스토어 둘러보기
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2.5 rounded-md border border-gray-900 px-6 py-4 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              규격 확인이 필요하면 사진 견적
            </Link>
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
              PRODUCT · SIZE · OPTION
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
            { k: "PRODUCT", v: "헤파 · 미듐 · 프리 · 부직포롤" },
            { k: "FRAME SIZE", v: "등급 · 가로 × 세로 × 두께" },
            { k: "ROLL SIZE", v: "두께 × 폭 × 길이" },
            { k: "STORE", v: "옵션 · 가격 · 배송 조건 확인" },
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
