import Link from "next/link";
import { filterSizes } from "../data/sizes";

// 홈에서 바로 찾을 수 있게 노출할 규격 — 판매 데이터에서 실제로 많이 나가는 순
const FEATURED = [
  "610x610x150",
  "610x610x292",
  "610x762x150",
  "594x594x100",
  "594x594x292",
  "594x594x50",
  "610x1220x150",
  "305x305x150",
];

export default function SizeQuickFind() {
  const items = FEATURED.map((slug) => filterSizes.find((s) => s.slug === slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  return (
    <section id="sizes" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-primary font-black text-sm tracking-widest uppercase">Find by Size</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">규격으로 바로 찾기</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            쓰시던 필터 옆면의 치수(가로×세로×두께)를 아시면 여기서 바로 확인하세요.
            목록에 없는 규격은 실측만으로 3~7일 맞춤 제작합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/size/${s.slug}`}
              className="group rounded-xl border border-gray-200 bg-surface hover:bg-white px-4 py-5 text-center hover:border-primary/30 hover:shadow-md transition-all"
            >
              <span className="block text-lg font-black text-gray-900 group-hover:text-primary transition-colors">
                {s.w}×{s.h}×{s.t}
              </span>
              <span className="block mt-1 text-xs font-bold text-gray-400">
                {s.type} · {s.grade.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          <Link
            href="/size"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-bold text-gray-700 hover:border-primary/50 hover:text-primary transition"
          >
            전체 규격 19종 보기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/guide/read-filter-label"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-gray-500 hover:text-primary transition"
          >
            규격을 모르시나요? 라벨 읽는 법 →
          </Link>
        </div>
      </div>
    </section>
  );
}
