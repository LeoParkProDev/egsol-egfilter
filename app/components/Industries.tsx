import Link from "next/link";

const industries = [
  { icon: "🏥", name: "병원·의료", href: "/medical" },
  { icon: "🏭", name: "반도체·디스플레이", href: "/industry/cleanroom" },
  { icon: "💊", name: "제약·바이오", href: "/industry/cleanroom" },
  { icon: "🚗", name: "자동차 도장", href: "/industry/paint-booth" },
  { icon: "🍳", name: "식품 제조", href: "/industry/food-factory" },
  { icon: "🏢", name: "빌딩 공조", href: "/industry/hvac" },
  { icon: "🏗️", name: "일반 제조", href: "/industry/hvac" },
  { icon: "🐕", name: "동물병원", href: "/medical/animal" },
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
