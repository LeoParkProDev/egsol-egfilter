"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureAttribution, classifyAnchor, getAttribution, track } from "../lib/analytics";

// 분석 ID는 환경변수로만 들어온다. 없으면 스크립트를 아예 주입하지 않는다.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const NAVER_WCS_ID = process.env.NEXT_PUBLIC_NAVER_WCS_ID ?? "";

/**
 * GA4 · 네이버 프리미엄 로그분석 주입 + 유입 캡처 + 클릭 이벤트 위임.
 * 링크가 있는 컴포넌트를 하나도 건드리지 않으려고 클릭은 document 캡처 단계에서 한 번만 잡는다.
 */
export default function Analytics() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    captureAttribution();

    function onClick(e: MouseEvent) {
      const node = e.target;
      const el = node instanceof Element ? node : node instanceof Node ? node.parentElement : null;
      const anchor = el?.closest("a");
      if (!anchor) return;

      const event = classifyAnchor(anchor.getAttribute("href"));
      if (!event) return;

      track(event, {
        page: window.location.pathname,
        source: getAttribution()?.source ?? "",
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    // App Router는 클라이언트 라우팅이라 페이지 전환 시 page_view가 자동으로 안 잡힌다.
    // 최초 진입분은 GA config(send_page_view)와 wcslog.js가 이미 보내므로 한 번 건너뛴다.
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
    window.wcs_do?.();
  }, [pathname]);

  return (
    <>
      {GA_ID ? (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: true });`}
          </Script>
        </>
      ) : null}

      {NAVER_WCS_ID ? (
        <>
          {/* 사이트 ID는 순서와 무관하게 먼저 꽂아두고, 첫 페이지뷰는 라이브러리가 뜬 뒤에 보낸다.
              GA와 달리 wcs_do에는 스텁이 없어서 로드 전에 호출하면 그냥 유실된다. */}
          <Script id="naver-wcs-config" strategy="afterInteractive">
            {`window.wcs_add = window.wcs_add || {};
window.wcs_add["wa"] = '${NAVER_WCS_ID}';`}
          </Script>
          <Script
            id="naver-wcs-src"
            src="//wcs.naver.net/wcslog.js"
            strategy="afterInteractive"
            onLoad={() => window.wcs_do?.()}
          />
        </>
      ) : null}
    </>
  );
}
