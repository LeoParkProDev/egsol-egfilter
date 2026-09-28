import Link from "next/link";
import { SITE } from "../data/site";

/**
 * 모바일 전용 하단 고정 CTA.
 * 데스크톱의 플로팅 카톡 버튼은 모바일에서 버튼·표·FAQ 위를 덮어 가리는 문제가 있어
 * 모바일에서는 이 바로 대체한다. 전화번호가 비어 있으면 2칸, 있으면 3칸.
 * 스마트스토어, 견적, 전화 동선을 화면 하단에 고정한다.
 */
export default function MobileCtaBar() {
  const hasPhone = Boolean(SITE.phone);
  return (
    <nav
      aria-label="빠른 문의"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <div
        className={`grid ${hasPhone ? "grid-cols-[1fr_1fr_1.3fr]" : "grid-cols-2"} gap-1.5 px-2 py-2 sm:gap-2 sm:px-3`}
      >
        <a
          href={SITE.smartstoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="네이버 스마트스토어에서 제품 보기"
          data-cta-placement="mobile_store"
          className="flex h-12 min-w-0 items-center justify-center rounded-md bg-primary px-1 text-[11px] font-bold text-white active:brightness-110 sm:text-sm"
        >
          스토어 구매
        </a>
        <Link
          href="/quote"
          className="flex h-12 min-w-0 items-center justify-center rounded-md border border-gray-300 px-1 text-xs font-semibold text-gray-800 active:bg-gray-50 sm:text-sm"
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
