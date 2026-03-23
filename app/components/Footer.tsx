import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-white/10 text-white/60 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Company */}
          <div>
            <p className="text-white font-black text-lg mb-1">에버그린필터</p>
            <p className="text-sm mb-4">산업용 에어필터 전문 공급</p>
            <div className="text-sm leading-loose">
              <p>대표: 박현수</p>
              <p>사업자등록번호: 799-67-00516</p>
              <p>주소: 서울특별시 강남구 테헤란로70길 12</p>
              <p>연락처: 010-2055-3958</p>
              <p>이메일: egfilter@naver.com</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-bold text-sm mb-4">바로가기</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/products/pre-filter" className="hover:text-white transition-colors">제품 보기</Link>
              <Link href="/guide" className="hover:text-white transition-colors">필터 선택 가이드</Link>
              <Link href="/about" className="hover:text-white transition-colors">회사소개</Link>
              <Link href="/quote" className="hover:text-white transition-colors">견적 요청</Link>
              <Link href="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link>
            </div>
          </div>

          {/* External */}
          <div>
            <p className="text-white font-bold text-sm mb-4">외부 링크</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://smartstore.naver.com/egfilter" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                네이버 스마트스토어
              </a>
              <a href="https://map.naver.com/v5/search/에버그린필터" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                네이버 지도
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} 에버그린필터. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
