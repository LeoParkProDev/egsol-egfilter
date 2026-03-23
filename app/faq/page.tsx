import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | 에버그린필터",
  description: "자주 묻는 질문",
};

const faqs = [
  {
    q: "소량 주문도 가능한가요?",
    a: "네, 스마트스토어를 통해 1개부터 낱개 구매가 가능합니다. 필요한 수량만큼 부담 없이 주문하세요.",
  },
  {
    q: "배송은 얼마나 걸리나요?",
    a: "오전 중 주문 시 대부분 당일 발송되며, 수도권 지역은 상황에 따라 당일 수납도 가능합니다. 전국 어디든 빠르고 안전하게 배송해 드립니다.",
  },
  {
    q: "원하는 사이즈로 주문 제작(커스텀)이 가능한가요?",
    a: "가능합니다. 프리필터, 미듐필터, 헤파필터 모두 현장 설비 규격에 맞춰 제작해 드립니다. 단, 제작 상품은 발주 후 3~7일 정도 소요될 수 있습니다.",
  },
  {
    q: "세금계산서 발행이 가능한가요?",
    a: "네, 스마트스토어 주문 시 지출증빙용 현금영수증이나 세금계산서 발행을 선택하실 수 있습니다. 별도 계좌이체 거래 시에도 사업자등록증을 보내주시면 즉시 발행해 드립니다.",
  },
  {
    q: "정기 납품 계약을 하면 혜택이 있나요?",
    a: "정기 납품(월/분기별) 계약 시 단가 할인 혜택이 적용되며, 귀사의 규격에 맞는 재고를 항시 확보하여 결품 없이 안정적으로 공급해 드립니다.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-black text-sm tracking-widest uppercase">FAQ</span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            자주 묻는 질문
          </h1>
          <p className="text-lg text-gray-600">
            고객님들께서 많이 여쭤보시는 질문들을 모았습니다.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                <span className="text-primary">Q.</span>
                {faq.q}
              </h3>
              <div className="text-gray-600 leading-relaxed flex items-start gap-3">
                <span className="text-gray-400 font-bold">A.</span>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">원하시는 답변이 없으신가요?</p>
          <a
            href="tel:010-2055-3958"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            010-2055-3958 전화 문의
          </a>
        </div>
      </div>
    </main>
  );
}
