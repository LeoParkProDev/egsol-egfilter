import { Metadata } from "next";

export const metadata: Metadata = {
  title: "필터 가이드",
  description: "현장에 맞는 최적의 필터 선택 가이드",
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-black text-sm tracking-widest uppercase">Guide</span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            필터 선택 가이드
          </h1>
          <p className="text-lg text-gray-600">
            우리 공장에 어떤 필터가 필요한지 확인해보세요.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 산업군별 추천 필터</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-primary mb-2">도장 부스 (자동차, 금속)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>천장/바닥:</strong> 부직포롤필터</li>
                  <li><strong>배기:</strong> 프리필터, 미듐필터</li>
                  <li><strong>특징:</strong> 도료 분진 포집 및 배기망 보호</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-emerald-600 mb-2">클린룸 (반도체, 제약)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>외기 유입:</strong> 프리필터 + 미듐필터</li>
                  <li><strong>최종 여과:</strong> 헤파필터 (H13, H14)</li>
                  <li><strong>특징:</strong> 초미세먼지 완벽 차단</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-blue-600 mb-2">일반 공조 (AHU)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>1차 여과:</strong> 프리필터</li>
                  <li><strong>2차 여과:</strong> 미듐필터</li>
                  <li><strong>특징:</strong> 실내 공기질 유지 및 장비 보호</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-violet-600 mb-2">식품 제조 (HACCP)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>전처리:</strong> 미듐필터</li>
                  <li><strong>청정구역:</strong> 헤파필터</li>
                  <li><strong>특징:</strong> 교차 오염 방지 및 위생 확보</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 교체 시기 자가 진단</h2>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <strong className="text-gray-900 block">설비 차압 증가</strong>
                    <span className="text-gray-600">공조기 계기판의 차압이 초기 설치 대비 2배 이상 상승했을 때</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <strong className="text-gray-900 block">풍량 감소</strong>
                    <span className="text-gray-600">토출구에서 나오는 바람의 세기가 현저히 줄어들었을 때</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <strong className="text-gray-900 block">육안 확인</strong>
                    <span className="text-gray-600">필터 표면에 먼지가 두껍게 쌓여 본래의 색상을 알아보기 힘들 때</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">어떤 필터가 필요한지 모르시겠나요?</h3>
              <p className="text-gray-600 mb-6">현장 사진과 함께 문의해주시면 최적의 제품을 추천해 드립니다.</p>
              <a href="/quote" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl transition-colors">
                맞춤 상담 요청하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
