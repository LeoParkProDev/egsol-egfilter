import Link from "next/link";
import { filterSizes, sizeLabel } from "../data/sizes";

// 홈에서 바로 찾을 수 있게 노출할 규격 — 판매 데이터에서 실제로 많이 나가는 순
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
  const items = FEATURED.map((slug) => filterSizes.find((s) => s.slug === slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  return (
    <section id="sizes" className="border-t border-gray-100 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <span className="eyebrow">규격으로 찾기</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.015em] text-gray-900 md:text-[2.125rem] md:leading-[1.25]">
              쓰시던 필터 옆면의 치수를 아신다면
            </h2>
          </div>
          <p className="text-gray-500 leading-[1.7] lg:col-span-6">
            가로 × 세로 × 두께(mm). 목록에 없는 규격은 실측만으로 3~7일 맞춤 제작합니다.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/size/${s.slug}`}
              className="group rounded-md border border-gray-200 bg-white px-4 py-4 transition-colors hover:border-primary/50"
            >
              <span className="block font-mono text-[17px] font-semibold text-gray-900 transition-colors group-hover:text-primary">
                {sizeLabel(s)}
              </span>
              <span className="mt-1.5 block text-xs text-gray-500">
                {s.type} · {s.grade.split(" ")[0]}
              </span>
            </Link>
          ))}
          <Link
            href="/size"
            className="group flex flex-col justify-center rounded-md border border-accent bg-tint px-4 py-4"
          >
            <span className="text-[15px] font-semibold text-primary">전체 규격 23종</span>
            <span className="mt-1.5 text-xs text-primary/80">
              목록에 없는 규격도 3~7일 제작 →
            </span>
          </Link>
        </div>

        <Link
          href="/guide/read-filter-label"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          규격을 모르시나요? 라벨 읽는 법 →
        </Link>
      </div>
    </section>
  );
}
