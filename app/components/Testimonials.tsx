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
  {
    quote:
      "주기적으로 구매하고 있어요 좋아요. 배송도 빠르고 제품도 확실합니다.",
    author: "come***",
    company: "네이버 스마트스토어 재구매 고객",
  },
  {
    quote:
      "주기적으로 구매해 사용중입니다. 품질이 변함없이 좋아서 정착했습니다.",
    author: "dbrl***",
    company: "네이버 스마트스토어 재구매 고객",
  },
  {
    quote:
      "지속적으로 사용하는 제품입니다. 아주 만족하면서 쓰고 있습니다.",
    author: "bibo***",
    company: "네이버 스마트스토어 한달사용 리뷰",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <span className="eyebrow">고객 후기</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.015em] text-gray-900 md:text-[2.125rem] md:leading-[1.25]">
              실제 구매 고객님들의 리뷰입니다
            </h2>
          </div>
        </div>

        <div className="rule-ink mt-10 grid gap-x-8 gap-y-9 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col justify-between pt-6">
              <blockquote className="text-[15px] leading-[1.75] text-gray-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-gray-100 pt-4">
                <span className="block text-sm font-semibold text-gray-900">{t.author}</span>
                <span className="mt-0.5 block text-[13px] text-gray-500">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
