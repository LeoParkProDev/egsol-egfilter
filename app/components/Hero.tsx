import Link from "next/link";
import { SITE } from "../data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface-dark via-[#0d1a33] to-primary-dark min-h-[88vh] flex items-center">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 text-center break-keep">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-lg px-4 py-2 mb-8 md:mb-10 animate-fade-in-up">
          <span className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
          <span className="text-white/90 text-xs md:text-sm font-bold tracking-wide whitespace-nowrap">
            병원 수술실 · 클린룸 · 공장 에어필터
          </span>
        </div>

        {/* Headline — 모바일은 줄바꿈을 브라우저에 맡기고(text-balance) 크기를 한 단계 낮춘다 */}
        <h1
          className="text-[2rem] leading-[1.25] sm:text-4xl md:text-6xl md:leading-[1.2] font-black text-white mb-6 md:mb-8 text-balance animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          필터 라벨 사진 한 장이면
          <br className="hidden sm:block" /> 당일 견적,
          <br className="hidden sm:block" /> 규격 없어도 제작
        </h1>

        {/* Subheading */}
        <p
          className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="whitespace-nowrap">헤파(H13·H14)</span> · <span className="whitespace-nowrap">미듐(미디움)</span> ·{" "}
          <span className="whitespace-nowrap">부직포·프리</span> · <span className="whitespace-nowrap">부직포롤</span>
          <br className="hidden sm:block" />{" "}
          표준 규격은 재고 출고, 비표준은 실측만으로 3~7일 맞춤 제작해 전국 납품합니다.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-[#00d4f5] text-surface-dark font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-accent/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            사진으로 견적 받기
          </Link>
          <a
            href={SITE.kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#FEE500] hover:brightness-95 text-gray-900 font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02]"
          >
            카카오톡 상담
          </a>
          <a
            href={SITE.smartstoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-lg px-8 py-4 rounded-xl transition-all"
          >
            스마트스토어
          </a>
        </div>

        {/* Trust stats */}
        <div
          className="grid grid-cols-3 gap-3 md:gap-6 max-w-lg mx-auto mt-10 md:mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { value: "30분", label: "영업일 1차 회신" },
            { value: "3~7일", label: "비표준 맞춤 제작" },
            { value: "500+", label: "누적 거래처" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-black text-accent">{stat.value}</p>
              <p className="text-xs md:text-sm text-white/60 font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
