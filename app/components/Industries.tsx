import Link from "next/link";

// 링크는 중복 없이 서로 다른 페이지를 가리킵니다 — 같은 곳으로 두 번 보내면
// 그만큼 다른 페이지로 가는 내부 링크를 잃습니다.
const medical = [
  { name: "수술실", href: "/medical/operating-room" },
  { name: "안과 수술실", href: "/medical/ophthalmology" },
  { name: "정형외과 수술실", href: "/medical/orthopedics" },
  { name: "치과 진료실", href: "/medical/dental" },
  { name: "산후조리원", href: "/medical/postpartum-care" },
  { name: "요양병원", href: "/medical/nursing-hospital" },
  { name: "검진센터", href: "/medical/health-checkup" },
  { name: "동물병원", href: "/medical/animal" },
  { name: "병원·의료 전체", href: "/medical" },
];

const industry = [
  { name: "반도체 미세공정", href: "/industry/semiconductor" },
  { name: "클린룸·GMP", href: "/industry/cleanroom" },
  { name: "실험실·연구소", href: "/industry/laboratory" },
  { name: "식품 제조", href: "/industry/food-factory" },
  { name: "플라스틱 공장", href: "/industry/plastics" },
  { name: "도장부스", href: "/industry/paint-booth" },
  { name: "데이터센터", href: "/industry/datacenter" },
  { name: "빌딩 공조", href: "/industry/hvac" },
  { name: "어린이집·유치원", href: "/industry/daycare" },
  { name: "학교·교육시설", href: "/industry/school" },
  { name: "호텔·숙박", href: "/industry/hotel" },
];

function FieldList({ title, items }: { title: string; items: { name: string; href: string }[] }) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
        <p className="text-[11px] font-semibold tracking-[0.12em] text-emerald-300">{title}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex min-h-11 min-w-0 items-center justify-between gap-2 border border-white/15 bg-white/[0.035] px-3 py-2.5 text-sm font-medium leading-snug text-slate-100 transition-colors hover:border-emerald-400/60 hover:bg-white/[0.07] hover:text-white"
          >
            <span className="min-w-0">{item.name}</span>
            <span className="shrink-0 font-mono text-xs text-emerald-300" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Industries() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden border border-slate-700 bg-[#20282d] px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-emerald-300">01 / 적용 분야</span>
          <h2 className="mt-3 text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-white md:text-[2rem]">
            공간에 맞는 필터를 찾아보세요
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-[1.75] text-slate-300">
            의료와 산업 현장별 필터 안내를 살펴보고, 필요한 규격과 공급 내용을 확인해 보세요.
          </p>
          <div aria-hidden="true" className="mt-7 hidden h-10 items-end gap-1 sm:flex">
            <span className="h-2 w-12 border border-emerald-400/70" />
            <span className="h-4 w-8 border border-slate-500" />
            <span className="h-7 w-16 border border-slate-500" />
            <span className="h-10 w-10 border border-emerald-400/40" />
            <span className="ml-2 h-px flex-1 bg-slate-600" />
          </div>
        </div>
        <div className="lg:col-span-4">
          <FieldList title="병원 · 의료" items={medical} />
        </div>
        <div className="lg:col-span-4">
          <FieldList title="산업 · 시설" items={industry} />
        </div>
        </div>
      </div>
    </section>
  );
}
