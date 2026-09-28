import Link from "next/link";
import FilterAssembly from "./FilterAssembly";

const filterFamilies = [
  { href: "/products/hepa-filter", label: "헤파필터" },
  { href: "/products/medium-filter", label: "미듐필터" },
  { href: "/products/pre-filter", label: "프리필터" },
  { href: "/products/roll-filter", label: "부직포롤필터" },
];

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#111918] text-[#f0f3ef]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="relative z-10">
          <p className="font-mono text-[10px] font-medium tracking-[0.2em] text-[#9eaaa4] sm:text-xs">
            ENGINEERED FILTRATION
          </p>
          <h1 className="mt-5 text-[2.125rem] leading-[1.2] font-semibold tracking-[-0.045em] text-balance sm:mt-7 sm:max-w-[18ch] sm:text-5xl sm:leading-[1.14] lg:text-[2.625rem] xl:text-[3.5rem]">
            산업용 필터,
            <br />
            정밀하게 고르고
            <br />
            확실하게 주문하세요
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#c2cbc5] sm:mt-6 sm:text-base sm:leading-8">
            헤파 · 미듐 · 프리 · 부직포롤. 필요한 필터를 찾고, 규격과 판매 옵션을 확인해
            스마트스토어에서 주문하세요.
          </p>

          <div className="mt-7 flex max-w-xl flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              href="/products"
              data-cta-placement="hero_store"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm bg-[#176b50] px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#218262] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ed4b1] motion-reduce:transition-none sm:gap-3 sm:px-6 sm:text-[15px]"
            >
              제품 고르고 스마트스토어 주문
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </Link>
            <Link
              href="/quote"
              className="inline-flex min-h-14 items-center justify-center rounded-sm border border-[#82918a] px-4 py-4 text-sm font-medium text-[#f0f3ef] transition-colors hover:border-[#c2cbc5] hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ed4b1] motion-reduce:transition-none sm:px-6 sm:text-[15px]"
            >
              규격이 낯설면 사진 견적
            </Link>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#9eaaa4]">
            옵션 · 가격 · 배송 조건은 각 스마트스토어 상품에서 확인할 수 있습니다.
          </p>
        </div>

        <div className="relative -mx-3 min-w-0 sm:mx-0 lg:-mr-10">
          <FilterAssembly />
        </div>
      </div>

      <nav aria-label="필터 종류 바로가기" className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/15 py-4 sm:gap-x-8 sm:py-5">
          <span className="mr-1 font-mono text-[10px] tracking-[0.16em] text-[#9eaaa4]">제품군</span>
          {filterFamilies.map((family) => (
            <Link
              key={family.href}
              href={family.href}
              className="py-1 text-[13px] font-medium text-[#e3e8e4] underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-[#83c5a1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ed4b1] motion-reduce:transition-none"
            >
              {family.label}
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
