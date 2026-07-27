import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-white/10 text-white/60 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-white font-black text-lg mb-1">에버그린필터</p>
            <p className="text-sm mb-4">산업용 에어필터 전문 공급</p>
            <div className="text-sm leading-loose">
              <p>대표: 박현수</p>
              <p>사업자등록번호: 799-67-00516</p>
              <p>주소: 서울특별시 강남구 테헤란로70길 12</p>
              <p>이메일: egfilter@naver.com</p>
            </div>
          </div>

          {/* Products & Pages */}
          <div>
            <p className="text-white font-bold text-sm mb-4">제품·바로가기</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/products/pre-filter" className="hover:text-white transition-colors">프리필터</Link>
              <Link href="/products/hepa-filter" className="hover:text-white transition-colors">헤파필터</Link>
              <Link href="/products/medium-filter" className="hover:text-white transition-colors">미듐필터</Link>
              <Link href="/products/roll-filter" className="hover:text-white transition-colors">부직포롤필터</Link>
              <Link href="/about" className="hover:text-white transition-colors">회사소개</Link>
              <Link href="/quote" className="hover:text-white transition-colors">견적 요청</Link>
              <Link href="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link>
            </div>
          </div>

          {/* Medical */}
          <div>
            <p className="text-white font-bold text-sm mb-4">병원·의료시설</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/medical" className="hover:text-white transition-colors">수술실·음압병실 필터</Link>
              <Link href="/medical/dental" className="hover:text-white transition-colors">치과 필터</Link>
              <Link href="/medical/dermatology" className="hover:text-white transition-colors">피부과·성형외과 필터</Link>
              <Link href="/medical/oriental" className="hover:text-white transition-colors">한의원 필터</Link>
              <Link href="/medical/animal" className="hover:text-white transition-colors">동물병원 필터</Link>
            </div>
          </div>

          {/* Guide & External */}
          <div>
            <p className="text-white font-bold text-sm mb-4">필터 가이드</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/guide/hepa-filter-replacement-cycle" className="hover:text-white transition-colors">헤파필터 교체주기</Link>
              <Link href="/guide/h13-vs-h14" className="hover:text-white transition-colors">H13 vs H14 차이</Link>
              <Link href="/guide/air-filter-grade-guide" className="hover:text-white transition-colors">에어필터 등급 총정리</Link>
              <Link href="/guide" className="hover:text-white transition-colors">가이드 전체 보기</Link>
              <a href="https://smartstore.naver.com/egfilter" target="_blank" rel="noopener noreferrer" className="mt-2 hover:text-white transition-colors">
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
