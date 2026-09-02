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
    <section id="advantages" className="py-24 bg-surface-dark break-keep">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-green font-black text-sm tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
            왜 에버그린필터인가요?
          </h2>
          <div className="w-16 h-1 bg-brand-green rounded-full mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((adv) => (
            <div
              key={adv.number}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-brand-green/30 hover:bg-white/8 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-green/15 flex items-center justify-center text-brand-green">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {adv.icon}
                  </svg>
                </div>
                <span className="text-4xl font-black text-white/10">{adv.number}</span>
              </div>
              <h3 className="text-xl font-black text-white mt-6 mb-3">{adv.title}</h3>
              <p className="text-white/60 leading-relaxed text-base">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
