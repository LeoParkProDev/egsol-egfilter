import Link from "next/link";

// /service 라우트의 slug와 1:1. 데이터 파일과 결합하지 않고 고정 링크로 둔다 —
// 홈은 서비스 데이터가 바뀌어도 깨지지 않아야 한다.
const services = [
  {
    href: "/service/hospital-supply",
    icon: "🏥",
    title: "병원·의료기관 납품",
    desc: "구매과·시설과 품의 서류, 수술 없는 시간대 맞춘 사전 납품, 인증평가 교체 이력.",
  },
  {
    href: "/service/regular-supply",
    icon: "🔁",
    title: "정기 납품·연간 단가",
    desc: "교체 주기를 저희가 기록해 두고 시점마다 먼저 연락드립니다. 단가 1년 고정, 약정 없음.",
  },
  {
    href: "/service/custom-fabrication",
    icon: "📐",
    title: "비표준 맞춤 제작",
    desc: "라벨 사진이나 실측 치수만 있으면 동일 규격으로 3~7일 제작. 단종 순정 필터 대체.",
  },
  {
    href: "/service/filter-map",
    icon: "🗺️",
    title: "무료 필터 실사표",
    desc: "설비별 사진만 보내주시면 규격·주기·연간 수량을 표 한 장으로 정리해 드립니다.",
  },
  {
    href: "/service/partner-program",
    icon: "🤝",
    title: "설비·점검업체 파트너",
    desc: "협력사 단가, 현장 라벨 사진 → 당일 견적 → 현장 직송, 월 정산.",
  },
  {
    href: "/service/public-procurement",
    icon: "🏛️",
    title: "관공서·학교 납품",
    desc: "기관 구매 절차에 맞춘 견적 양식과 서류 대응. 소액 구매부터 가능합니다.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-primary font-black text-sm tracking-widest uppercase">How We Work</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">
            낱개 구매만 있는 게 아닙니다
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            시설을 관리하시는 분께는 필터보다 <b className="text-gray-800">거래 방식</b>이 더 큰 차이를 만듭니다.
            현장에 맞는 방식을 고르세요.
          </p>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all"
            >
              <span className="text-3xl block mb-4">{s.icon}</span>
              <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
                자세히
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
