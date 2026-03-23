const advantages = [
  {
    number: "01",
    title: "현장 맞춤형 전문가",
    description:
      "다양한 산업 현장에서 직접 발로 뛰며 쌓은 경험. 병원, 크린룸, 도장 부스 등 설비 환경에 맞는 필터를 정확히 추천해드립니다.",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </>
    ),
  },
  {
    number: "02",
    title: "신속한 납품 시스템",
    description:
      "주요 규격 상시 재고 보유. 주문 즉시 발송하며, 수도권 지역은 빠른 수령이 가능합니다. 긴급 교체가 필요할 때 빠르게 대응합니다.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h4.875c.621 0 1.125-.504 1.125-1.125V4.5A1.125 1.125 0 008.25 3.375H3.375A1.125 1.125 0 002.25 4.5v8.625c0 .621.504 1.125 1.125 1.125zm13.5 0h1.875c.621 0 1.125-.504 1.125-1.125V8.25a1.125 1.125 0 00-.82-1.075l-3.375-1.012a1.125 1.125 0 00-1.43 1.075V13.125c0 .621.504 1.125 1.125 1.125z" />
    ),
  },
  {
    number: "03",
    title: "합리적인 가격",
    description:
      "유통 단계를 줄여 합리적인 가격으로 공급합니다. 대량 주문 시 별도 견적을 통해 추가 할인이 가능하며, 정기 납품 계약도 가능합니다.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="py-24 bg-surface-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-black text-sm tracking-widest uppercase">
            Why Us
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4">
            에버그린필터를 선택하는 이유
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {advantages.map((item) => (
            <div
              key={item.number}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-accent/30 hover:bg-white/8 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {item.icon}
                  </svg>
                </div>
                <span className="text-4xl font-black text-white/10">
                  {item.number}
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-3">
                {item.title}
              </h3>
              <p className="text-base text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
