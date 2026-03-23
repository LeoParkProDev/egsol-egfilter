"use client";

export default function KakaoButton() {
  return (
    <a
      href="https://pf.kakao.com/_zjkxab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 상담"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FEE500] hover:bg-[#F5DC00] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
    >
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="#3C1E1E"
      >
        <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.8 5.108 4.512 6.467-.144.522-.93 3.37-.964 3.586 0 0-.02.164.087.227.107.063.233.03.233.03.307-.043 3.558-2.327 4.118-2.723.328.048.665.073 1.014.073 5.523 0 10-3.463 10-7.66C22 6.463 17.523 3 12 3" />
      </svg>
    </a>
  );
}
