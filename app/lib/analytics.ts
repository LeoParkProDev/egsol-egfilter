/**
 * 유입 경로 캡처 + 전환 이벤트 전송.
 *
 * 원칙 두 가지.
 * 1) 분석 ID가 없어도 사이트는 그대로 동작한다 — gtag·wcs가 없으면 조용히 무시한다.
 * 2) 폼 입력값(이름·전화·이메일·문의 내용)은 어떤 분석 툴에도 보내지 않는다.
 *    분석 툴로 나가는 값은 source·keyword·landing·page 뿐이다.
 *
 * classifyAnchor / resolveSource / resolveKeyword / referrerHost / naverConversionType 은
 * window에 의존하지 않는 순수 함수라 node에서 그대로 호출해 검증할 수 있다.
 */

/** 세션 첫 유입 기록. sessionStorage["eg_attr"]에 JSON으로 1회만 저장한다. */
export interface Attribution {
  /** 판정된 유입 경로 (naver-ad · google-organic · direct …) */
  source: string;
  /** 검색 키워드 (n_query 또는 utm_term). 없으면 "" */
  keyword: string;
  /** 랜딩 경로 (쿼리 제외) */
  landing: string;
  /** document.referrer 의 호스트만 */
  referrer: string;
  /** 캡처 시각 (ISO) */
  ts: string;
}

export type ClickEvent = "kakao_click" | "phone_click" | "smartstore_click";
export type TrackEvent = "quote_submit" | "quote_fallback" | ClickEvent;
export type TrackParams = Record<string, string | number | boolean | undefined>;

const STORAGE_KEY = "eg_attr";
const MAX_VALUE_LENGTH = 200;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    wcs?: { cnv: (type: string, value: string) => string };
    wcs_do?: (nasa?: Record<string, string>) => void;
    wcs_add?: Record<string, string>;
    _nasa?: Record<string, string>;
  }
}

function clip(value: string): string {
  return value.length > MAX_VALUE_LENGTH ? value.slice(0, MAX_VALUE_LENGTH) : value;
}

function param(params: URLSearchParams, key: string): string {
  return (params.get(key) ?? "").trim();
}

/** document.referrer(전체 URL 또는 호스트)에서 호스트만 뽑는다. 없으면 "" */
export function referrerHost(referrer: string): string {
  const raw = (referrer ?? "").trim();
  if (!raw) return "";
  try {
    return new URL(raw).hostname.replace(/^www\./, "");
  } catch {
    // 호스트만 넘어온 경우도 허용한다
    return /^[a-z0-9.-]+$/i.test(raw) ? raw.replace(/^www\./, "") : "";
  }
}

/**
 * 유입 경로 판정. 설계 3절의 순서를 그대로 따른다.
 * 1) n_media·n_query → naver-ad  2) utm_source → source(/medium)  3) gclid → google-ad
 * 4) referrer 호스트로 naver-organic · google-organic · kakao
 * 5) referrer 없음 → direct      6) 그 외 → referrer 호스트
 */
export function resolveSource(params: URLSearchParams, referrer: string): string {
  if (param(params, "n_media") || param(params, "n_query")) return "naver-ad";

  const utmSource = param(params, "utm_source");
  if (utmSource) {
    const utmMedium = param(params, "utm_medium");
    return utmMedium ? `${utmSource}/${utmMedium}` : utmSource;
  }

  if (param(params, "gclid")) return "google-ad";

  const host = referrerHost(referrer);
  if (!host) return "direct";
  if (/(^|\.)naver\.(com|me)$/.test(host)) return "naver-organic";
  if (/(^|\.)google\./.test(host)) return "google-organic";
  if (host.includes("kakao")) return "kakao";
  return host;
}

/** 검색 키워드. 네이버 검색광고는 n_query, 그 외는 utm_term. */
export function resolveKeyword(params: URLSearchParams): string {
  return param(params, "n_query") || param(params, "utm_term");
}

/**
 * 앵커 href → 클릭 이벤트. 해당 없으면 null.
 * 링크 마크업을 건드리지 않으려고 document 위임에서 이 함수 하나로 분기한다.
 */
export function classifyAnchor(href: string | null | undefined): ClickEvent | null {
  const h = (href ?? "").trim();
  if (!h) return null;
  if (/^tel:/i.test(h)) return "phone_click";
  if (h.includes("pf.kakao.com")) return "kakao_click";
  if (h.includes("smartstore.naver.com")) return "smartstore_click";
  return null;
}

/** 네이버 프리미엄 로그분석 전환 유형 — 4: 신청/예약, 5: 기타, null: 전환 아님 */
export function naverConversionType(event: TrackEvent): "4" | "5" | null {
  switch (event) {
    case "quote_submit":
    case "quote_fallback":
      return "4";
    case "kakao_click":
    case "phone_click":
      return "5";
    default:
      return null;
  }
}

/** GA4 이벤트 + (해당하면) 네이버 전환을 보낸다. 스크립트가 없으면 아무 일도 하지 않는다. */
export function track(event: TrackEvent, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  const payload: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    payload[key] = value;
  }

  try {
    window.gtag?.("event", event, payload);
  } catch {
    /* 분석 스크립트 오류가 폼 동작을 막지 않게 한다 */
  }

  const cnv = naverConversionType(event);
  if (!cnv) return;
  try {
    const wcs = window.wcs;
    if (!wcs || typeof wcs.cnv !== "function" || typeof window.wcs_do !== "function") return;
    const nasa = window._nasa ?? (window._nasa = {});
    nasa.cnv = wcs.cnv(cnv, "1");
    window.wcs_do(nasa);
  } catch {
    /* 위와 동일 */
  }
}

/** 저장된 유입 기록을 읽는다. 없거나 깨졌으면 null. */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const o = parsed as Record<string, unknown>;
    const s = (key: string) => (typeof o[key] === "string" ? (o[key] as string) : "");
    return {
      source: s("source"),
      keyword: s("keyword"),
      landing: s("landing"),
      referrer: s("referrer"),
      ts: s("ts"),
    };
  } catch {
    return null;
  }
}

/** 세션 첫 진입 때 1회만 유입을 기록한다. 이미 있으면 덮어쓰지 않고 그대로 돌려준다. */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;

  const saved = getAttribution();
  if (saved) return saved;

  const params = new URLSearchParams(window.location.search);
  const referrer = typeof document === "undefined" ? "" : document.referrer;
  const attr: Attribution = {
    source: clip(resolveSource(params, referrer)),
    keyword: clip(resolveKeyword(params)),
    landing: window.location.pathname,
    referrer: referrerHost(referrer),
    ts: new Date().toISOString(),
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attr));
  } catch {
    /* 시크릿 모드 등 저장 불가 — 이번 페이지에서만 값을 쓰고 넘어간다 */
  }
  return attr;
}
