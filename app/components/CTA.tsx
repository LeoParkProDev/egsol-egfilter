import Link from "next/link";

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#001a4d]" />
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
          필요한 필터, 지금 바로 주문하세요
        </h2>
        <p className="text-lg text-white/80 mb-10 leading-relaxed">
          스마트스토어에서 간편하게 주문하거나
          <br />
          견적 요청서를 보내주시면 빠르게 답변드립니다
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://smartstore.naver.com/egfilter/products/6391368761"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-primary-dark font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            스마트스토어
          </a>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-[#00d4f5] text-surface-dark font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            견적 요청
          </Link>
          <a
            href="tel:010-2055-3958"
            className="inline-flex items-center justify-center gap-3 bg-white/12 hover:bg-white/20 text-white font-bold text-lg px-8 py-4 rounded-xl border border-white/20 transition-all hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            010-2055-3958
          </a>
        </div>

        <p className="text-white/50 text-sm font-bold mt-8">
          평일 09:00 ~ 18:00 · 토요일 상담 가능
        </p>
      </div>
    </section>
  );
}
