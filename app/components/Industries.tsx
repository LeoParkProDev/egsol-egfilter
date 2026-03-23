const industries = [
  { icon: "🏭", name: "반도체·디스플레이" },
  { icon: "🚗", name: "자동차 도장" },
  { icon: "🍳", name: "식품 제조" },
  { icon: "💊", name: "제약·바이오" },
  { icon: "🏗️", name: "일반 제조" },
  { icon: "🏢", name: "빌딩 공조" },
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
            다양한 산업 현장에 에어필터를 공급하고 있습니다
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <span className="text-3xl block mb-3">{industry.icon}</span>
              <p className="text-sm font-bold text-gray-700">{industry.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
