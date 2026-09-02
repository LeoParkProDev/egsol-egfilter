import Link from "next/link";
import { SITE } from "../data/site";

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

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center break-keep">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
          규격을 몰라도 됩니다. 사진만 보내주세요
        </h2>
        <p className="text-lg text-white/80 mb-10 leading-relaxed">
          쓰시던 필터 옆면 라벨(또는 실측) 사진과 수량이면 충분합니다.
          <br />
          {SITE.replyPromise}.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-[#00d4f5] text-surface-dark font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            견적 요청
          </Link>
          <a
            href={SITE.kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#FEE500] hover:brightness-95 text-gray-900 font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02]"
          >
            카카오톡으로 사진 보내기
          </a>
          {SITE.phone && (
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-3 bg-white text-primary-dark font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl"
            >
              📞 {SITE.phone}
            </a>
          )}
        </div>

        <p className="text-white/50 text-sm font-bold mt-8">
          {SITE.hours} · 소량은{" "}
          <a href={SITE.smartstoreUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">
            스마트스토어
          </a>
          에서 바로 구매
        </p>
      </div>
    </section>
  );
}
