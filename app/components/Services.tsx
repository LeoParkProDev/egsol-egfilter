import Link from "next/link";

// /service 라우트의 slug와 1:1. 데이터 파일과 결합하지 않고 고정 링크로 둔다 —
// 홈은 서비스 데이터가 바뀌어도 깨지지 않아야 한다.
const services = [
  {
    href: "/service/hospital-supply",
    title: "병원·의료기관 납품",
    desc: "기관 구매 절차와 필요한 서류, 납품 조건을 문의할 수 있습니다.",
  },
  {
    href: "/service/regular-supply",
    title: "정기 납품·연간 단가",
    desc: "반복 교체가 필요한 경우 희망 주기와 품목을 기준으로 거래 방식을 상담합니다.",
  },
  {
    href: "/service/custom-fabrication",
    title: "비표준 맞춤 제작",
    desc: "기존 필터의 라벨 사진이나 바깥 치수를 바탕으로 제작 가능 여부를 확인합니다.",
  },
  {
    href: "/service/filter-map",
    title: "필터 정보 정리",
    desc: "설비별 필터 정보와 규격을 정리하는 방법을 상담할 수 있습니다.",
  },
  {
    href: "/service/partner-program",
    title: "설비·점검업체 파트너",
    desc: "설비·점검 업무에 필요한 필터 공급과 거래 조건을 문의할 수 있습니다.",
  },
  {
    href: "/service/public-procurement",
    title: "관공서·학교 납품",
    desc: "관공서와 학교의 구매 절차에 필요한 견적 및 서류 내용을 확인할 수 있습니다.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#edf0f1] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 border-b border-slate-300 pb-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-6">
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-primary">03 / 거래 방식</span>
            <h2 className="mt-3 text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-slate-950 md:text-[2rem]">
              필요한 공급 방식을 살펴보세요
            </h2>
          </div>
          <p className="text-sm leading-[1.7] text-slate-600 md:col-span-6">
            일반 구매부터 기관 납품, 비표준 규격 상담까지 필요한 항목을 확인해 보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, index) => (
            <Link key={s.href} href={s.href} className="group min-w-0 border-b border-slate-300 py-5 md:px-4 lg:px-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug text-slate-950 transition-colors group-hover:text-primary sm:text-lg">
                  {s.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-primary">0{index + 1}</span>
              </div>
              <p className="mt-2 text-sm leading-[1.7] text-slate-600">{s.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                안내 보기 <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
