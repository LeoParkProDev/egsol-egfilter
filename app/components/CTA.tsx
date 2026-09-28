import Link from "next/link";
import { SITE } from "../data/site";

export default function CTA() {
  return (
    <section id="contact" className="bg-white px-4 py-12 break-keep sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-6 bg-[#20282d] px-5 py-7 sm:px-8 sm:py-9 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="md:col-span-7">
          <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-emerald-300">05 / 구매 및 문의</span>
          <h2 className="mt-3 text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-white md:text-[2rem]">
            필요한 필터를 바로 구매하거나 문의하세요
          </h2>
          <p className="mt-3 text-sm leading-[1.75] text-slate-300">
            제품 규격을 알고 있다면 스마트스토어에서 구매할 수 있습니다. 규격 확인이나 대량 구매는 견적으로 문의해 주세요.
          </p>
          <p className="mt-4 text-xs text-slate-400">{SITE.hours}</p>
        </div>

        <div className="flex min-w-0 flex-col gap-3 md:col-span-5">
          <a
            href={SITE.smartstoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-placement="home_footer_store"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            스마트스토어에서 구매 <span aria-hidden="true">↗</span>
          </a>
          <Link
            href="/quote"
            className="inline-flex min-h-12 items-center justify-center border border-slate-400 px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10"
          >
            사진으로 견적 받기
          </Link>
          <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-slate-600 pt-3 text-sm text-slate-300">
            <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-500 underline-offset-4 hover:text-white">카카오톡 상담</a>
            {SITE.phone && <a href={SITE.phoneHref} className="font-mono font-medium text-white hover:text-emerald-300">{SITE.phone}</a>}
          </p>
        </div>
      </div>
    </section>
  );
}
