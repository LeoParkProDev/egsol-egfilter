const advantages = [
  {
    number: "01",
    title: "비표준 규격도 확인합니다",
    description:
      "기존 필터 라벨 사진이나 바깥 치수를 바탕으로 필요한 규격과 제작 가능 여부를 확인합니다.",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </>
    ),
  },
  {
    number: "02",
    title: "한국크린필터 제품 공급",
    description:
      "한국크린필터 제품을 공급합니다. 제품별 규격과 등급은 현장 조건에 맞춰 확인해 주세요.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h4.875c.621 0 1.125-.504 1.125-1.125V4.5A1.125 1.125 0 008.25 3.375H3.375A1.125 1.125 0 002.25 4.5v8.625c0 .621.504 1.125 1.125 1.125zm13.5 0h1.875c.621 0 1.125-.504 1.125-1.125V8.25a1.125 1.125 0 00-.82-1.075l-3.375-1.012a1.125 1.125 0 00-1.43 1.075V13.125c0 .621.504 1.125 1.125 1.125z" />
    ),
  },
  {
    number: "03",
    title: "구매에 필요한 내용을 함께 확인",
    description:
      "견적과 거래에 필요한 서류, 반복 구매 방식은 품목과 기관 절차에 따라 상담할 수 있습니다.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="bg-white py-12 break-keep md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-primary">04 / 공급 안내</span>
        <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-slate-950 md:text-[2rem]">
          규격 확인부터 거래 상담까지
        </h2>

        <div className="mt-7 grid border-y border-slate-300 md:grid-cols-3">
          {advantages.map((adv) => (
            <div key={adv.number} className="min-w-0 border-b border-slate-300 py-5 last:border-b-0 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <div className="flex items-center gap-3 text-primary">
                <svg
                  className="h-[22px] w-[22px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  {adv.icon}
                </svg>
                <span className="font-mono text-xs font-medium">{adv.number}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-950">{adv.title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-slate-600">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
