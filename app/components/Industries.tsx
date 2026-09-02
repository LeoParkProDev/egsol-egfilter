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
    <div>
      <p className="rule-ink pb-3 text-[13px] font-semibold text-gray-500">{title}</p>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-between gap-4 border-b border-gray-100 py-3.5 text-[15px] font-medium text-gray-900 transition-colors hover:text-primary"
        >
          {item.name}
          <span className="text-primary" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Industries() {
  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <span className="eyebrow">납품 분야</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.015em] text-gray-900 md:text-[2.125rem] md:leading-[1.25]">
            현장마다 권장 구성이 다릅니다
          </h2>
          <p className="mt-5 leading-[1.7] text-gray-500">
            분야를 고르면 공간별 오염원, 권장 등급, 교체 주기를 표 한 장으로 보여드립니다.
          </p>
        </div>
        <div className="lg:col-span-4">
          <FieldList title="병원 · 의료" items={medical} />
        </div>
        <div className="lg:col-span-4">
          <FieldList title="산업 · 시설" items={industry} />
        </div>
      </div>
    </section>
  );
}
