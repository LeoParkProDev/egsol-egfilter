import Link from "next/link";

const inquiryDetails = [
  "필터 라벨 또는 바깥 치수",
  "등급(알고 계신 경우)",
  "규격별 수량",
  "희망 납기 또는 납품 주기",
];

export default function BulkSupply() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 md:py-16" aria-labelledby="bulk-supply-title">
      <div className="mx-auto grid max-w-6xl gap-8 border-y border-slate-300 py-7 sm:py-9 md:gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-primary">02 / 대량 구매 · 정기 납품</span>
          <h2
            id="bulk-supply-title"
            className="mt-3 text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-gray-900 md:text-[2rem]"
          >
            여러 규격과 수량을 함께 견적 받아보세요
          </h2>
          <p className="mt-4 max-w-xl leading-[1.7] text-gray-600">
            필터 규격이 여러 가지여도 규격별 수량을 모아 한 번에 문의할 수 있습니다. 반복 교체가
            필요한 현장은 희망 주기를 알려주시면 정기 납품 방식도 함께 상담합니다.
          </p>
          <p className="mt-3 text-sm leading-[1.7] text-gray-500">
            필터 자재를 공급하며, 교체와 설치는 시설팀 또는 시공사에서 진행합니다.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              data-cta-placement="bulk_supply"
              className="inline-flex min-h-12 items-center justify-center bg-primary px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              대량·정기 납품 견적 문의
            </Link>
            <Link
              href="/service/regular-supply"
              data-cta-placement="bulk_supply"
              className="inline-flex min-h-12 items-center justify-center border border-slate-400 px-5 py-3 text-center font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              정기 납품 안내
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-5 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h3 className="text-sm font-semibold text-slate-900">문의 시 함께 확인할 정보</h3>
          <ul className="mt-3 grid gap-x-5 sm:grid-cols-2">
            {inquiryDetails.map((detail, index) => (
              <li key={detail} className="flex min-h-10 items-center gap-3 border-b border-slate-200 py-2 text-sm leading-[1.55] text-slate-700">
                <span aria-hidden="true" className="font-mono text-[11px] text-primary">0{index + 1}</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
