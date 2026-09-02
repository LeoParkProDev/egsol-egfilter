// 사이트 공통 연락처 설정.
// 전화번호는 비워두면 UI에서 자동으로 숨는다 — 가짜 번호가 배포되는 일이 없도록.
// 네이버 스마트콜(0507) 발급 후 여기 한 곳만 채우면 헤더·푸터·견적 페이지에 한 번에 노출된다.

interface SiteConfig {
  name: string;
  /** 표시용: "0507-1234-5678" 형식. 비우면 전화 UI 숨김 */
  phone: string;
  /** tel: 링크용 (숫자만). phone이 비어 있으면 빈 문자열 */
  phoneHref: string;
  email: string;
  kakaoUrl: string;
  smartstoreUrl: string;
  /** 영업시간 안내 (전화 옆에 표시) */
  hours: string;
  /** 1차 회신 약속 — 페이지 문구에 사용 */
  replyPromise: string;
}

// 0507 스마트콜 발급 후 여기만 채우면 됩니다. 예: "0507-1234-5678"
const phone: string = "";

export const SITE: SiteConfig = {
  name: "에버그린필터",
  phone,
  phoneHref: phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : "",
  email: "egfilter153@gmail.com",
  kakaoUrl: "https://pf.kakao.com/_zjkxab",
  smartstoreUrl: "https://smartstore.naver.com/egfilter",
  hours: "평일 09:00–18:00",
  replyPromise: "영업일 기준 30분 내 1차 회신, 당일 정식 견적서 발송",
};
