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
    <section id="services" className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <span className="eyebrow">진행 방식</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.015em] text-gray-900 md:text-[2.125rem] md:leading-[1.25]">
              낱개 구매만 있는 게 아닙니다
            </h2>
          </div>
          <p className="text-gray-500 leading-[1.7] lg:col-span-6">
            시설을 관리하시는 분께는 필터보다{" "}
            <b className="font-semibold text-gray-800">거래 방식</b>이 더 큰 차이를 만듭니다.
            현장에 맞는 방식을 고르세요.
          </p>
        </div>

        <div className="rule-ink mt-10 grid gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="group pt-6">
              <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-[1.7] text-gray-500">{s.desc}</p>
              <span className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                자세히
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
