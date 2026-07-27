import Link from "next/link";

export default function NotFound() {
  const links = [
    { href: "/", label: "홈으로 가기" },
    { href: "/medical", label: "병원·의료시설 필터" },
    { href: "/products/hepa-filter", label: "헤파필터 제품 보기" },
    { href: "/guide", label: "필터 가이드" },
    { href: "/quote", label: "견적 문의" },
  ];

  return (
    <main className="min-h-[60vh] bg-surface flex items-center justify-center py-24 break-keep">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-6xl font-black text-gray-200 tabular-nums">404</p>
        <h1 className="mt-4 text-2xl md:text-3xl font-black text-gray-900">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-gray-500">
          주소가 바뀌었거나 삭제된 페이지입니다. 찾으시는 내용은 아래에서 이어가실 수
          있습니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-bold text-gray-700 hover:border-brand-green/45 hover:text-[#0b9e6e] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
