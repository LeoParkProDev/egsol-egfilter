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
      <div className={`grid ${hasPhone ? "grid-cols-3" : "grid-cols-2"} gap-2 px-3 py-2`}>
        <a
          href={SITE.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="kakao-dot flex h-12 items-center justify-center gap-2 rounded-md border border-gray-900 text-[15px] font-semibold text-gray-900 active:bg-gray-50"
        >
          카톡 견적
        </a>
        <Link
          href="/quote"
          className="flex h-12 items-center justify-center rounded-md bg-primary text-[15px] font-semibold text-white active:brightness-110"
        >
          견적 요청
        </Link>
        {hasPhone && (
          <a
            href={SITE.phoneHref}
            className="flex h-12 items-center justify-center gap-1.5 rounded-md bg-gray-900 text-[15px] font-semibold text-white active:brightness-110"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3" />
            </svg>
            전화
          </a>
        )}
      </div>
    </nav>
  );
}
