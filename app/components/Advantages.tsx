const advantages = [
  {
    number: "01",
    title: "규격이 없어도 만듭니다",
    description:
      "실제 주문의 절반은 비표준입니다. 기존 필터 라벨 사진이나 바깥 치수 실측값만 있으면 동일 규격으로 3~7일 제작합니다. 시공사가 폐업해 도면이 없어도, 수입 장비 순정 필터가 단종돼도 대응합니다.",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </>
    ),
  },
  {
    number: "02",
    title: "국내 제조사 제품, 재고 출고",
    description:
      "국내 제조사 한국크린필터 제품을 전문 취급합니다. 610·594 계열 주요 규격은 재고에서 바로 나가고, 헤파는 H13·H14(EN 1822) 등급으로 병원 수술실·클린룸 기준에 맞춥니다.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h4.875c.621 0 1.125-.504 1.125-1.125V4.5A1.125 1.125 0 008.25 3.375H3.375A1.125 1.125 0 002.25 4.5v8.625c0 .621.504 1.125 1.125 1.125zm13.5 0h1.875c.621 0 1.125-.504 1.125-1.125V8.25a1.125 1.125 0 00-.82-1.075l-3.375-1.012a1.125 1.125 0 00-1.43 1.075V13.125c0 .621.504 1.125 1.125 1.125z" />
    ),
  },
  {
    number: "03",
    title: "담당자 일이 줄어드는 거래",
    description:
      "규격을 한 번 등록해 두면 다음부터는 상호만으로 재주문됩니다. 교체 주기가 오면 저희가 먼저 연락드리고, 견적서·거래명세서 등 품의에 필요한 서류를 함께 드립니다. 정기 납품과 연간 단가 계약도 가능합니다.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="bg-paper py-20 break-keep md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <span className="eyebrow">선택 이유</span>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.015em] text-gray-900 md:text-[2.125rem] md:leading-[1.25]">
          왜 에버그린필터인가요?
        </h2>

        <div className="rule-ink mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {advantages.map((adv) => (
            <div key={adv.number} className="pt-6">
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
              <h3 className="mt-3.5 text-xl font-semibold text-gray-900">{adv.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-gray-500">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
