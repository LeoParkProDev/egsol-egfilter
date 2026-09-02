"use client";

/**
 * 데스크톱 우하단 고정 카톡 상담 버튼.
 * A안 규칙 — 노란 원형 버튼 대신 잉크 외곽선 알약 + 10px 노란 점.
 */
export default function KakaoButton() {
  return (
    <a
      href="https://pf.kakao.com/_zjkxab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 상담"
      className="kakao-dot hidden md:inline-flex fixed bottom-6 right-6 z-50 items-center gap-2.5 rounded-md border border-gray-900 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
    >
      카카오톡 상담
    </a>
  );
}
