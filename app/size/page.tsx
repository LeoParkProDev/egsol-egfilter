import type { Metadata } from "next";
import Link from "next/link";
import { filterSizes, sizeLabel } from "../data/sizes";

const BASE_URL = "https://evergreen-filter.vercel.app";

export const metadata: Metadata = {
  title: "규격별 필터 찾기 | 헤파·미듐·프리필터 표준 사이즈 카탈로그",
  description:
    "610x610x150, 610x610x292, 594x594 등 헤파필터·미듐필터·프리필터 표준 규격을 치수별로 정리했습니다. 규격을 클릭하면 사양·사용처·인치 환산까지 확인할 수 있습니다.",
  keywords:
    "헤파필터 규격,필터 사이즈 찾기,610x610 헤파필터,594x594 미듐필터,공조기 필터 규격표,에어필터 치수",
  alternates: { canonical: "/size" },
  openGraph: {
    title: "규격별 필터 찾기 | 에버그린필터",
    description: "헤파·미듐·프리필터 표준 규격 카탈로그. 치수를 클릭하면 사양과 견적 안내로 이어집니다.",
    url: `${BASE_URL}/size`,
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
};

const GROUPS: { type: "헤파필터" | "미듐필터" | "프리필터" | "부직포롤"; desc: string }[] = [
  { type: "헤파필터", desc: "H13~H14 (EN 1822) · 610 계열 표준 + 세퍼레이터형" },
  { type: "미듐필터", desc: "F5~F9 (EN 779) · 공조기(AHU) 594 레일 규격" },
  { type: "프리필터", desc: "G4 (EN 779) · 1차 여과 판형, 후단 필터 보호" },
  { type: "부직포롤", desc: "프레임 없는 원단 롤 · 도장부스·프리단 재단용, 두께 15T/20T × 폭 1000/1200mm" },
];

export default function SizeIndexPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "에어필터 표준 규격 목록",
    itemListElement: filterSizes.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${BASE_URL}/size/${s.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center">
          <span className="eyebrow">
            규격 카탈로그
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-black text-gray-900">
            규격별 필터 찾기
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            쓰시는 필터의 치수(가로×세로×두께)를 알고 계시다면 아래에서 바로 찾으세요.
            목록에 없는 규격은 실측 치수만 있으면 3~7일 맞춤 제작합니다.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {GROUPS.map((g) => {
            const items = filterSizes.filter((s) => s.type === g.type);
            return (
              <section key={g.type}>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
                  {g.type}
                </h2>
                <p className="mt-2 pl-4 text-sm text-gray-500">{g.desc}</p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/size/${s.slug}`}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-center hover:border-brand-green/40 hover:shadow-sm transition"
                    >
                      <span className="block font-extrabold text-gray-900">
                        {sizeLabel(s)}
                      </span>
                      <span className="block mt-1 text-xs font-semibold text-gray-400">
                        {s.grade.split(" ")[0]}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-14 rounded-2xl bg-white border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-extrabold text-gray-900">찾는 규격이 없나요?</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            여기 있는 것은 표준 규격뿐입니다. 실제 주문의 절반은 비표준 맞춤 제작입니다.
            기존 필터 라벨 사진이나 바깥 치수 실측값(틀 끝에서 끝)을 보내주시면 당일 견적을 드립니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/guide/custom-size-filter"
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 hover:border-brand-green/50 transition"
            >
              비표준 제작 안내
            </Link>
            <Link
              href="/guide/read-filter-label"
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 hover:border-brand-green/50 transition"
            >
              라벨 읽는 법
            </Link>
            <Link
              href="/quote"
              className="rounded-xl bg-brand-green px-5 py-2.5 text-sm font-extrabold text-white hover:brightness-110 transition"
            >
              견적 요청
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
