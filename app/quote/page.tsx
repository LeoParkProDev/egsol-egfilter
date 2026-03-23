import { Metadata } from "next";

export const metadata: Metadata = {
  title: "견적요청 | 에버그린필터",
  description: "대량 구매 및 정기 납품 견적 문의",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-black text-sm tracking-widest uppercase">Contact</span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            견적 문의
          </h1>
          <p className="text-lg text-gray-600">
            대량 구매, 정기 납품, 비규격 제작 문의를 남겨주시면 빠르게 답변해 드립니다.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">전화 상담</h3>
              <a href="tel:010-2055-3958" className="text-2xl font-black text-primary hover:underline">
                010-2055-3958
              </a>
              <p className="text-sm text-gray-500 mt-2">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">이메일 문의</h3>
              <a href="mailto:egfilter@naver.com" className="text-xl font-bold text-gray-700 hover:text-primary transition-colors">
                egfilter@naver.com
              </a>
              <p className="text-sm text-gray-500 mt-2">사업자등록증과 규격을 보내주시면 더 빠른 상담이 가능합니다.</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">회사명</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="에버그린" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">담당자명 / 직급</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="홍길동 대리" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="example@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">문의 내용</label>
              <textarea 
                rows={5} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="필요하신 필터의 종류, 규격(가로x세로x두께), 수량 등을 자세히 적어주세요."
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
              견적 문의 보내기
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
