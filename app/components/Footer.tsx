import Link from "next/link";
import { SITE } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-paper py-14 text-gray-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Company */}
          <div className="lg:col-span-2">
            <p className="mb-1 text-lg font-semibold text-gray-900">에버그린필터</p>
            <p className="text-sm mb-4">산업용 에어필터 전문 공급</p>
            <div className="text-sm leading-loose">
              <p>대표: 박현수</p>
              <p>사업자등록번호: 799-67-00516</p>
              <p>주소: 서울특별시 강남구 테헤란로70길 12</p>
              <p>이메일: egfilter153@gmail.com</p>
              {SITE.phone && (
                <p>
                  전화:{" "}
                  <a href={SITE.phoneHref} className="font-mono text-gray-900 hover:underline">
                    {SITE.phone}
                  </a>{" "}
                  <span className="text-gray-400">({SITE.hours})</span>
                </p>
              )}
            </div>
          </div>

          {/* Products & Pages */}
          <div>
            <p className="rule-ink mb-3 pb-3 text-[13px] font-semibold text-gray-900">제품·바로가기</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/products/pre-filter" className="transition-colors hover:text-primary">프리필터</Link>
              <Link href="/products/hepa-filter" className="transition-colors hover:text-primary">헤파필터</Link>
              <Link href="/products/medium-filter" className="transition-colors hover:text-primary">미듐필터</Link>
              <Link href="/products/roll-filter" className="transition-colors hover:text-primary">부직포롤필터</Link>
              <Link href="/size" className="transition-colors hover:text-primary">규격별 필터 찾기</Link>
              <Link href="/service" className="transition-colors hover:text-primary">서비스·거래 방식</Link>
              <Link href="/service/regular-supply" className="transition-colors hover:text-primary">정기 납품·연간 단가</Link>
              <Link href="/service/partner-program" className="transition-colors hover:text-primary">설비·점검업체 파트너</Link>
              <Link href="/about" className="transition-colors hover:text-primary">회사소개</Link>
              <Link href="/quote" className="transition-colors hover:text-primary">견적 요청</Link>
              <Link href="/cases" className="transition-colors hover:text-primary">납품 사례</Link>
              <Link href="/faq" className="transition-colors hover:text-primary">자주 묻는 질문</Link>
              <Link href="/glossary" className="transition-colors hover:text-primary">필터 용어집</Link>
            </div>
          </div>

          {/* Industry */}
          <div>
            <p className="rule-ink mb-3 pb-3 text-[13px] font-semibold text-gray-900">산업 분야</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/industry/semiconductor" className="transition-colors hover:text-primary">반도체 미세공정 필터</Link>
              <Link href="/industry/cleanroom" className="transition-colors hover:text-primary">클린룸 필터</Link>
              <Link href="/industry/plastics" className="transition-colors hover:text-primary">플라스틱 공장 필터</Link>
              <Link href="/industry/datacenter" className="transition-colors hover:text-primary">데이터센터 필터</Link>
              <Link href="/industry/laboratory" className="transition-colors hover:text-primary">실험실·연구소 필터</Link>
              <Link href="/industry/food-factory" className="transition-colors hover:text-primary">식품공장 필터</Link>
              <Link href="/industry/daycare" className="transition-colors hover:text-primary">어린이집·유치원 필터</Link>
              <Link href="/industry/paint-booth" className="transition-colors hover:text-primary">도장부스 필터</Link>
              <Link href="/industry/hvac" className="transition-colors hover:text-primary">빌딩·공조기 필터</Link>
              <Link href="/industry/school" className="transition-colors hover:text-primary">학교·교육시설 필터</Link>
              <Link href="/industry/hotel" className="transition-colors hover:text-primary">호텔·숙박 필터</Link>
            </div>
          </div>

          {/* Medical */}
          <div>
            <p className="rule-ink mb-3 pb-3 text-[13px] font-semibold text-gray-900">병원·의료시설</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/medical/operating-room" className="transition-colors hover:text-primary">수술실 헤파필터</Link>
              <Link href="/medical/nursing-hospital" className="transition-colors hover:text-primary">요양병원 필터</Link>
              <Link href="/medical/postpartum-care" className="transition-colors hover:text-primary">산후조리원 필터</Link>
              <Link href="/medical/dental" className="transition-colors hover:text-primary">치과 필터</Link>
              <Link href="/medical/dermatology" className="transition-colors hover:text-primary">피부과·성형외과 필터</Link>
              <Link href="/medical/ophthalmology" className="transition-colors hover:text-primary">안과 수술실 필터</Link>
              <Link href="/medical/orthopedics" className="transition-colors hover:text-primary">정형외과 수술실 필터</Link>
              <Link href="/medical/health-checkup" className="transition-colors hover:text-primary">검진센터 필터</Link>
              <Link href="/medical/oriental" className="transition-colors hover:text-primary">한의원 필터</Link>
              <Link href="/medical/animal" className="transition-colors hover:text-primary">동물병원 필터</Link>
              <Link href="/medical" className="transition-colors hover:text-primary">의료시설 전체 보기</Link>
            </div>
          </div>

          {/* Guide & External */}
          <div>
            <p className="rule-ink mb-3 pb-3 text-[13px] font-semibold text-gray-900">필터 가이드</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/guide/operating-room-filter-replacement" className="transition-colors hover:text-primary">수술실 필터 교체</Link>
              <Link href="/guide/laminar-flow-filter" className="transition-colors hover:text-primary">층류 수술실 헤파필터</Link>
              <Link href="/guide/hepa-filter-replacement-cycle" className="transition-colors hover:text-primary">헤파필터 교체주기</Link>
              <Link href="/guide/h13-vs-h14" className="transition-colors hover:text-primary">H13 vs H14 차이</Link>
              <Link href="/guide/air-filter-price" className="transition-colors hover:text-primary">에어필터 가격 결정 구조</Link>
              <Link href="/guide/custom-size-filter" className="transition-colors hover:text-primary">비표준 규격 제작</Link>
              <Link href="/guide" className="transition-colors hover:text-primary">가이드 전체 보기</Link>
              <a href="https://smartstore.naver.com/egfilter" target="_blank" rel="noopener noreferrer" className="mt-2 transition-colors hover:text-primary">
                네이버 스마트스토어
              </a>
              <a href="https://map.naver.com/v5/search/에버그린필터" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                네이버 지도
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-xs">
          <p>&copy; {new Date().getFullYear()} 에버그린필터. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
