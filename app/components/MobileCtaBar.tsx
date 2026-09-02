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
          className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#FEE500] text-[15px] font-black text-gray-900 active:brightness-95"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
            <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.8 5.108 4.512 6.467-.144.522-.93 3.37-.964 3.586 0 0-.02.164.087.227.107.063.233.03.233.03.307-.043 3.558-2.327 4.118-2.723.328.048.665.073 1.014.073 5.523 0 10-3.463 10-7.66C22 6.463 17.523 3 12 3" />
          </svg>
          카톡 사진 견적
        </a>
        <Link
          href="/quote"
          className="flex h-12 items-center justify-center rounded-xl bg-primary text-[15px] font-black text-white active:brightness-110"
        >
          견적 요청
        </Link>
        {hasPhone && (
          <a
            href={SITE.phoneHref}
            className="flex h-12 items-center justify-center rounded-xl bg-gray-900 text-[15px] font-black text-white active:brightness-110"
          >
            📞 전화
          </a>
        )}
      </div>
    </nav>
  );
}
