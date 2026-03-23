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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-lg px-5 py-2 mb-10 animate-fade-in-up">
          <span className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-white/90 text-sm font-bold tracking-wide">
            병원 · 크린룸 · 수술실 · 공장 에어필터 특화
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-6xl font-black text-white leading-[1.2] mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          청정 환경을 위한
          <br />
          최적의 필터 솔루션
        </h1>

        {/* Subheading */}
        <p
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          크린룸, 수술실, 도장부스, 관리실 등
          <br />
          각 현장별 특성에 맞춘 고효율 필터를 공급합니다
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="https://smartstore.naver.com/egfilter/products/6391368761"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-[#00d4f5] text-surface-dark font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-accent/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            스마트스토어에서 구매
          </a>
          <a
            href="tel:010-2055-3958"
            className="inline-flex items-center justify-center gap-3 bg-white/12 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-xl border border-white/20 transition-all hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            전화 상담
          </a>
        </div>

        {/* Trust stats */}
        <div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { value: "전국", label: "빠른 배송 대응" },
            { value: "10년+", label: "현장 최적화 경험" },
            { value: "500+", label: "누적 거래처" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-black text-accent">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-white/60 font-bold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
