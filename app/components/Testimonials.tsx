const testimonials = [
  {
    quote:
      "배송이 정말 빠르고 구매 과정이 간편해서 좋습니다. 현장에서 급하게 필요할 때 믿고 주문할 수 있는 곳이라 추천합니다.",
    author: "posi***",
    company: "네이버 스마트스토어 구매 고객",
  },
  {
    quote:
      "계속 비가 와서 배송 중 필터가 젖지 않을까 걱정했는데, 정말 꼼꼼하게 포장해주셔서 안전하게 잘 받았습니다.",
    author: "dlgu***",
    company: "네이버 스마트스토어 구매 고객",
  },
  {
    quote:
      "병원 및 크린룸 설비에 맞는 규격을 정확히 추천해주셔서 시행착오 없이 바로 적용할 수 있었습니다. 전문성이 느껴집니다.",
    author: "이OO 팀장",
    company: "정밀 의료기기 제조사",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-black text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">
            고객 후기
          </h2>
          <p className="text-gray-500 text-lg">
            실제 구매 고객님들의 생생한 리뷰입니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-surface rounded-2xl p-8 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <svg
                  className="w-8 h-8 text-primary/20 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900 text-sm">{t.author}</p>
                <p className="text-sm text-gray-500">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
