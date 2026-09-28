import Link from "next/link";
import { filterSizes, sizeLabel } from "../data/sizes";

// Keep the established home quick-find selection linked to real size records.
const FEATURED = [
  "610x610x150",
  "610x610x292",
  "610x762x150",
  "610x1220x150",
  "594x594x100",
  "594x594x292",
  "594x594x75",
  "594x594x50",
  "roll-15t-1000",
  "roll-20t-1200",
  "305x305x150",
  "610x915x150",
];

export default function SizeQuickFind() {
  const items = FEATURED.map((slug) => filterSizes.find((size) => size.slug === slug)).filter(
    (size): size is NonNullable<typeof size> => Boolean(size),
  );

  return (
    <section id="sizes" className="border-t border-slate-300 bg-slate-100 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden border border-slate-300 bg-white shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
          <div className="grid gap-4 bg-[#1b252e] px-4 py-5 text-white sm:px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end md:px-7 md:py-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.19em] text-emerald-300">DIMENSION QUICK FIND</span>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
                규격으로 바로 찾기
              </h2>
            </div>
            <p className="text-[13px] leading-6 text-slate-300 sm:text-sm">
              기존 필터의 가로 × 세로 × 두께(mm)를 확인해 같은 규격을 선택하세요. 프레임형 필터와 롤 원단 규격을 함께 볼 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-slate-200 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((size) => {
              const isRoll = size.type === "부직포롤";
              return (
                <Link
                  key={size.slug}
                  href={`/size/${size.slug}`}
                  className="group min-w-0 bg-white px-3 py-3.5 transition-colors hover:bg-slate-50 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-emerald-700 motion-reduce:transition-none sm:px-4 sm:py-4"
                >
                  <span className="flex min-w-0 items-center justify-between gap-2">
                    <span className="min-w-0 break-words font-mono text-[clamp(0.72rem,3.2vw,1rem)] font-semibold leading-5 tracking-[-0.055em] text-slate-900 group-hover:text-emerald-900 [overflow-wrap:anywhere] sm:text-base sm:tracking-[-0.035em]">
                      {sizeLabel(size)}
                    </span>
                    {!isRoll && (
                      <span className="shrink-0 font-mono text-[9px] tracking-[0.08em] text-slate-400">mm</span>
                    )}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] leading-4 text-slate-600 sm:text-[11px]">
                    <span className="border border-slate-300 px-1.5 py-0.5 font-medium text-slate-700">
                      {isRoll ? "롤 원단" : "프레임형"}
                    </span>
                    <span>{size.type}</span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span className="font-mono">{size.grade.split(" ")[0]}</span>
                  </span>
                </Link>
              );
            })}
            <Link
              href="/size"
              className="flex min-h-20 flex-col justify-center bg-emerald-50 px-4 py-3.5 text-emerald-950 transition-colors hover:bg-emerald-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-emerald-700 motion-reduce:transition-none sm:px-5"
            >
              <span className="font-semibold">전체 규격 보기</span>
              <span className="mt-1 font-mono text-[11px] text-emerald-900">등록된 23종 목록 →</span>
            </Link>
          </div>
        </div>

        <Link
          href="/guide/read-filter-label"
          className="mt-4 inline-flex min-h-11 items-center gap-2 px-1 text-[13px] font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 motion-reduce:transition-none"
        >
          규격을 모르시나요? 필터 라벨 읽는 법 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
