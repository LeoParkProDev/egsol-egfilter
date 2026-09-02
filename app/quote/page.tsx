import { Metadata } from "next";
import { SITE } from "../data/site";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "견적 요청 | 필터 사진 한 장으로 당일 견적·대량 구매·맞춤 제작",
  description:
    "에어필터 대량 구매, 정기 납품, 비표준 규격 맞춤 제작 견적 문의. 필터 라벨 사진이나 실측 치수를 보내주시면 영업일 기준 30분 내 1차 회신, 당일 정식 견적서를 드립니다.",
  keywords:
    "에어필터 견적,필터 대량 구매,필터 정기 납품,헤파필터 견적,맞춤 필터 제작,필터 납품 업체,필터 사진 견적",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  const hasPhone = Boolean(SITE.phone);

  return (
    <main className="min-h-screen bg-surface py-16 md:py-24 break-keep">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-black text-sm tracking-widest uppercase">Contact</span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6">견적 문의</h1>
          <p className="text-lg text-gray-600">
            <b className="text-gray-900">{SITE.replyPromise}</b>
            <br />
            규격을 몰라도 됩니다. 쓰시던 필터 라벨 사진 한 장이면 충분합니다.
          </p>
        </div>

        {/* 가장 빠른 경로 — 사진 견적 */}
        <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-extrabold text-gray-900">가장 빠른 방법 — 사진으로 견적</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            필터 옆면 라벨(또는 바깥 치수 실측) 사진과 수량만 보내주세요. 비표준 규격도 동일하게 3~7일 제작합니다.
          </p>
          <div className={`mt-6 grid gap-4 ${hasPhone ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            <a
              href={SITE.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FEE500] hover:brightness-95 transition px-5 py-5 text-center"
            >
              <span className="block text-xs font-bold text-gray-700">카카오톡 채널</span>
              <span className="block mt-1 text-lg font-black text-gray-900">사진 보내기</span>
              <span className="block mt-1 text-xs text-gray-600">가장 빠른 회신</span>
            </a>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("[사진 견적] 회사명 / 수량")}`}
              className="rounded-2xl bg-gray-50 hover:bg-gray-100 transition px-5 py-5 text-center border border-gray-200"
            >
              <span className="block text-xs font-bold text-gray-500">이메일</span>
              <span className="block mt-1 text-lg font-black text-gray-900">{SITE.email}</span>
              <span className="block mt-1 text-xs text-gray-500">사진 첨부 · 사업자 서류 회신</span>
            </a>
            {hasPhone && (
              <a
                href={SITE.phoneHref}
                className="rounded-2xl bg-primary hover:bg-primary-dark transition px-5 py-5 text-center text-white"
              >
                <span className="block text-xs font-bold text-white/80">전화</span>
                <span className="block mt-1 text-lg font-black">{SITE.phone}</span>
                <span className="block mt-1 text-xs text-white/80">{SITE.hours}</span>
              </a>
            )}
          </div>
        </section>

        {/* 사업자 안내 */}
        <section className="bg-gray-900 rounded-3xl p-8 md:p-10 mb-8 text-white">
          <h2 className="text-lg font-extrabold">병원·기업·기관 구매 담당자께</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-200 leading-relaxed">
            <li>· 견적서·거래명세서 등 품의에 필요한 서류를 함께 드립니다</li>
            <li>· 수량별 단가(1개 / 10개 / 20개)를 견적서에 항상 표기합니다</li>
            <li>· 교체 주기에 맞춘 정기 납품, 연간 단가 계약이 가능합니다</li>
            <li>· 규격을 등록해 두면 다음부터 사진 없이 상호만으로 재주문됩니다</li>
          </ul>
        </section>

        {/* 텍스트 폼 */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">문의 내용 작성</h2>
          <QuoteForm />
        </section>
      </div>
    </main>
  );
}
