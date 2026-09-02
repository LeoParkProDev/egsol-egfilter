/**
 * 견적 폼 메일 본문 생성.
 *
 * route.ts에서 떼어낸 순수 함수다. next/server·nodemailer를 끌어오지 않으므로
 * node에서 그대로 호출해 본문을 검증할 수 있다. 시각도 인자로 받아 결과가 항상 같다.
 */

export interface QuoteMailInput {
  company: string;
  person: string;
  phone: string;
  email: string;
  message: string;
  /** 첨부 사진 장수 */
  fileCount: number;
  /** 유입 경로 (폼 hidden 필드에서 옴) */
  source: string;
  keyword: string;
  landing: string;
  referrer: string;
  /** User-Agent — 120자까지만 남긴다 */
  userAgent: string;
  /** 발송 시각 */
  now: Date;
}

/**
 * 유입 경로 블록. 값이 하나도 없으면 "유입 경로: (미확인)" 한 줄만 남긴다.
 * 라벨 뒤 공백은 위 항목들과 세로줄을 맞추기 위한 것이다.
 */
function attributionLines(input: QuoteMailInput): string[] {
  const { source, keyword, landing, referrer } = input;
  if (!source && !keyword && !landing && !referrer) return ["유입 경로: (미확인)"];

  const lines = [`유입 경로: ${source || "(미확인)"}`];
  if (keyword) lines.push(`검색어:    ${keyword}`);
  if (landing) lines.push(`랜딩:      ${landing}`);
  if (referrer) lines.push(`참조:      ${referrer}`);
  return lines;
}

export function buildMailText(input: QuoteMailInput): string {
  const { company, person, phone, email, message, fileCount, userAgent, now } = input;

  return [
    `회사·기관: ${company || "-"}`,
    `담당자:    ${person || "-"}`,
    `연락처:    ${phone}`,
    `이메일:    ${email || "-"}`,
    "",
    "문의 내용:",
    message,
    "",
    `첨부 사진: ${fileCount}장`,
    "",
    ...attributionLines(input),
    "",
    "— 에버그린필터 홈페이지 견적 폼",
    `— ${now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
    userAgent ? `— ${userAgent.slice(0, 120)}` : "",
  ].join("\n");
}
