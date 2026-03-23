import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "에버그린필터는 병원, 크린룸, 수술실, 공장 등 청정 환경이 필요한 모든 현장에 최적화된 에어필터를 전문 공급합니다.",
};

export default function AboutPage() {
  return (
    <div className="py-20">
      {/* Hero */}
      <section className="bg-surface-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-brand-green font-black text-sm tracking-widest uppercase">
            About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-3 mb-6">
            회사소개
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            청정 환경을 위한 최적의 파트너
            <br />
            에버그린필터는 각 현장에 특화된 필터 솔루션을 제공합니다
          </p>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="bg-surface rounded-2xl p-10 text-center border border-gray-100">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <p className="font-black text-xl text-gray-900">박현수</p>
                <p className="text-sm text-gray-500 font-bold">대표</p>
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                대표 인사말
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full mb-6" />
              <div className="text-base text-gray-600 leading-loose space-y-4">
                <p>
                  안녕하세요, 에버그린필터 대표 박현수입니다.
                </p>
                <p>
                  저는 오랜 시간 산업 현장에서 에어필터를 공급하며 현장의 목소리를 직접 들어왔습니다. 병원 수술실부터 대형 도장 부스까지, 각 설비마다 요구하는 필터 규격과 성능이 다릅니다. 이런 현장의 특화된 니즈에 가장 정확하게 대응하는 것이 에버그린필터의 핵심 가치입니다.
                </p>
                <p>
                  프리필터부터 헤파필터까지, 각 환경에 맞는 최적의 필터를 합리적인 가격에 신속하게 공급하겠습니다. 감사합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-gray-900 mb-2">회사 개요</h2>
          <div className="w-12 h-1 bg-primary rounded-full mb-8" />

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <tbody>
                {[
                  ["상호", "에버그린필터"],
                  ["대표자", "박현수"],
                  ["사업자등록번호", "799-67-00516"],
                  ["소재지", "서울특별시 강남구 테헤란로70길 12"],
                  ["이메일", "egfilter@naver.com"],
                  ["업종", "산업용 에어필터 도·소매"],
                  ["주요 취급 품목", "프리필터, 헤파필터, 미듐필터, 부직포롤필터"],
                  ["서비스 지역", "전국 (수도권 당일/익일 배송)"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-6 py-4 bg-surface text-sm font-bold text-gray-600 w-40 whitespace-nowrap">
                      {label}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-gray-900 mb-2">주요 연혁</h2>
          <div className="w-12 h-1 bg-primary rounded-full mb-8" />

          <div className="space-y-6">
            {[
              { year: "2024", events: ["서비스 지역 전국 확대 및 온라인 채널 강화"] },
              { year: "2022", events: ["병원·크린룸 특화 필터 라인업 확충", "수도권 주요 시설 정기 납품 계약 체결"] },
              { year: "2016", events: ["에버그린필터 설립", "산업용 에어필터 공급 사업 개시"] },
            ].map((item) => (
              <div key={item.year} className="flex gap-6">
                <div className="w-16 shrink-0 text-right">
                  <span className="font-black text-lg text-primary">{item.year}</span>
                </div>
                <div className="border-l-2 border-primary/20 pl-6 pb-4">
                  {item.events.map((event) => (
                    <p key={event} className="text-base text-gray-700 mb-1">{event}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            에버그린필터와 함께하세요
          </h2>
          <p className="text-gray-500 mb-8">
            견적 문의, 제품 상담 등 편하게 연락주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
            >
              견적 요청하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
