import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 주문·배송·맞춤 제작·병원 납품",
  description:
    "에어필터 소량 주문, 배송 기간, 커스텀 규격 제작, 세금계산서, 병원·의료시설 납품까지 — 고객님들이 가장 많이 묻는 질문과 답변을 모았습니다.",
  keywords:
    "에어필터 주문,필터 맞춤 제작,필터 배송,세금계산서,병원 필터 납품,정기 납품,헤파필터 규격",
  alternates: { canonical: "/faq" },
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
    q: "기존 필터 규격을 모르는데 주문할 수 있나요?",
    a: "가능합니다. 설치된 필터의 라벨 사진이나 프레임 실측 치수(가로×세로×두께)를 카카오톡 또는 이메일로 보내주시면 규격을 확인해 당일 견적을 드립니다.",
  },
  {
    q: "세금계산서 발행이 가능한가요?",
    a: "네, 스마트스토어 주문 시 지출증빙용 현금영수증이나 세금계산서 발행을 선택하실 수 있습니다. 별도 계좌이체 거래 시에도 사업자등록증을 보내주시면 즉시 발행해 드립니다.",
  },
  {
    q: "정기 납품 계약을 하면 혜택이 있나요?",
    a: "정기 납품(월/분기별) 계약 시 단가 할인 혜택이 적용되며, 귀사의 규격에 맞는 재고를 항시 확보하여 결품 없이 안정적으로 공급해 드립니다.",
  },
  {
    q: "병원·의원에도 납품하나요?",
    a: "네. 수술실·시술실·음압병실용 H13·H14 헤파필터를 병원 규격에 맞춰 공급하며, 치과·피부과·한의원·동물병원 등 개원가 납품 실적이 다수 있습니다. 견적서·거래명세서 등 병원 행정 서류도 함께 준비해 드립니다.",
  },
  {
    q: "필터 교체 시기를 어떻게 알 수 있나요?",
    a: "프리필터는 1~3개월, 미듐필터는 3~6개월, 헤파필터는 6~12개월이 일반적이며, 정확한 판단 기준은 차압(필터 막힘 정도)입니다. 구매 고객께는 교체 주기를 기록해 두었다가 시기가 되면 먼저 연락드립니다.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
            href="/quote"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            견적 문의하기
          </a>
        </div>
      </div>
    </main>
  );
}
