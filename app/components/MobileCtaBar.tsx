import Link from "next/link";
import { SITE } from "../data/site";

/**
 * 모바일 전용 하단 고정 CTA.
 * 데스크톱의 플로팅 카톡 버튼은 모바일에서 버튼·표·FAQ 위를 덮어 가리는 문제가 있어
 * 모바일에서는 이 바로 대체한다. 전화번호가 비어 있으면 2칸, 있으면 3칸.
 * 클릭 이벤트는 Analytics의 document 위임(tel:/pf.kakao.com)으로 자동 집계된다.
 */
export default function MobileCtaBar() {
  const hasPhone = Boolean(SITE.phone);
  return (
    <nav
      aria-label="빠른 문의"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <div className={`grid ${hasPhone ? "grid-cols-[1fr_1fr_1.3fr]" : "grid-cols-2"} gap-2 px-3 py-2`}>
        <a
          href={SITE.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="kakao-dot flex h-12 items-center justify-center gap-2 rounded-md border border-gray-900 text-sm font-semibold text-gray-900 active:bg-gray-50"
        >
          카톡 견적
        </a>
        <Link
          href="/quote"
          className="flex h-12 items-center justify-center rounded-md bg-primary text-sm font-semibold text-white active:brightness-110"
        >
          견적 요청
        </Link>
        {hasPhone && (
          <a
            href={SITE.phoneHref}
            data-cta-placement="mobile_phone"
            className="flex h-12 min-w-0 flex-col items-center justify-center rounded-md bg-gray-900 px-1 text-white active:brightness-110"
          >
            <span className="whitespace-nowrap text-xs font-bold leading-tight">{SITE.phone}</span>
            <span className="mt-1 whitespace-nowrap text-[10px] leading-tight text-white/80">
              {SITE.hours}
            </span>
          </a>
        )}
      </div>
    </nav>
  );
}
