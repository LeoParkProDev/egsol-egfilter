import Link from "next/link";

// 링크는 중복 없이 서로 다른 페이지를 가리킵니다 — 같은 곳으로 두 번 보내면
// 그만큼 다른 페이지로 가는 내부 링크를 잃습니다.
const industries = [
  { icon: "🏥", name: "수술실", href: "/medical/operating-room" },
  { icon: "👁️", name: "안과 수술실", href: "/medical/ophthalmology" },
  { icon: "🦷", name: "치과 진료실", href: "/medical/dental" },
  { icon: "👶", name: "산후조리원", href: "/medical/postpartum-care" },
  { icon: "🧑‍🦳", name: "요양병원", href: "/medical/nursing-hospital" },
  { icon: "🩺", name: "병원·의료 전체", href: "/medical" },
  { icon: "🐕", name: "동물병원", href: "/medical/animal" },
  { icon: "🔬", name: "실험실·연구소", href: "/industry/laboratory" },
  { icon: "💾", name: "반도체 미세공정", href: "/industry/semiconductor" },
  { icon: "🏭", name: "클린룸·GMP", href: "/industry/cleanroom" },
  { icon: "🧴", name: "플라스틱 공장", href: "/industry/plastics" },
  { icon: "🚗", name: "도장부스", href: "/industry/paint-booth" },
  { icon: "🍳", name: "식품 제조", href: "/industry/food-factory" },
  { icon: "🖥️", name: "데이터센터", href: "/industry/datacenter" },
  { icon: "🏢", name: "빌딩 공조", href: "/industry/hvac" },
  { icon: "🧸", name: "어린이집·유치원", href: "/industry/daycare" },
];

export default function Industries() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-black text-sm tracking-widest uppercase">
            Industries
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">
            납품 분야
          </h2>
          <p className="text-gray-500 text-lg">
            분야를 선택하시면 현장별 권장 필터 구성을 확인하실 수 있습니다
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              href={industry.href}
              className="group bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <span className="text-3xl block mb-3">{industry.icon}</span>
              <p className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
                {industry.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
