import Link from "next/link";
import { SITE } from "../data/site";

/** A안 CTA 밴드 — 잉크 패널 위 좌: 카피 / 우: 버튼. 그라데이션·격자 없음. */
export default function CTA() {
  return (
    <section id="contact" className="bg-paper px-6 py-16 break-keep md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-xl bg-surface-dark px-8 py-12 md:px-16 md:py-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-paper md:text-[2rem]">
            규격을 몰라도 됩니다. 사진만 보내주세요
          </h2>
          <p className="mt-3.5 leading-[1.7] text-paper/70">
            쓰시던 필터 옆면 라벨(또는 실측) 사진과 수량이면 충분합니다. {SITE.replyPromise}.
          </p>
          <p className="mt-5 text-sm text-paper/45">
            {SITE.hours} · 소량은{" "}
            <a
              href={SITE.smartstoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/70 underline underline-offset-2 hover:text-paper"
            >
              스마트스토어
            </a>
            에서 바로 구매
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-md bg-paper px-6 py-4 font-semibold text-gray-900 transition-colors hover:bg-white"
          >
            사진으로 견적 받기
          </Link>
          <a
            href={SITE.kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kakao-dot inline-flex items-center justify-center gap-2.5 rounded-md border border-paper/40 px-6 py-4 font-semibold text-paper transition-colors hover:bg-white/5"
          >
            카카오톡
          </a>
          {SITE.phone && (
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center rounded-md border border-paper/40 px-6 py-4 font-mono font-semibold text-paper transition-colors hover:bg-white/5"
            >
              {SITE.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
