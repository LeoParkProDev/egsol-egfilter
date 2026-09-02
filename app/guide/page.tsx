import { Metadata } from "next";
import Link from "next/link";
import { guides, type Guide } from "../data/guides";

export const metadata: Metadata = {
  title: "필터 가이드 | 교체주기·등급·의료시설 기준 총정리",
  description:
    "헤파필터 교체주기, H13 vs H14 등급 차이, 수술실·음압병실 필터 기준까지. 현장에서 바로 쓰는 에어필터 선택·관리 가이드 모음.",
  keywords:
    "필터 가이드,헤파필터 교체주기,에어필터 등급,H13 H14,수술실 필터 기준,음압병실 필터,필터 선택",
  alternates: { canonical: "/guide" },
};

// 허브에 노출할 카테고리 순서. 여기에 없는 카테고리(가이드가 늘며 새로 생긴 것)는 뒤에 자동으로 붙는다.
const CATEGORY_ORDER = [
  "의료시설 기준",
  "유지관리",
  "등급·규격",
  "산업 현장",
  "구매 가이드",
  "비교",
  "법규·기준",
];

// 카테고리별 앵커 id와 한 줄 설명. 정의가 없으면 순번 id와 기본 설명을 쓴다.
const CATEGORY_META: Record<string, { id: string; desc: string }> = {
  "의료시설 기준": {
    id: "medical-standard",
    desc: "수술실·음압병실·요양병원 — 시설 유형별로 요구되는 공기 기준과 필터 구성.",
  },
  유지관리: {
    id: "maintenance",
    desc: "언제 갈아야 하는지, 무엇을 보고 판단하는지. 교체 주기와 점검 요령.",
  },
  "등급·규격": {
    id: "grade-size",
    desc: "H13·H14, G·F·H·U 등급과 표준 치수. 쓰시는 필터의 사양을 확정하는 법.",
  },
  "산업 현장": {
    id: "industry",
    desc: "클린룸·도장부스·공장 공조 등 현장 조건에 맞춘 여과 구성.",
  },
  "구매 가이드": {
    id: "purchase",
    desc: "견적서 읽는 법, 비표준 맞춤 제작, 사업자 정기 납품 — 구매 실무.",
  },
  비교: {
    id: "compare",
    desc: "비슷해 보이는 두 선택지를 나란히 놓고 고르는 기준.",
  },
  "법규·기준": {
    id: "regulation",
    desc: "실내공기질관리법 등 시설이 지켜야 하는 법적 기준과 대응.",
  },
};

interface GuideSectionGroup {
  name: string;
  id: string;
  desc: string;
  items: Guide[];
}

/** guides 배열 하나만 보고 카테고리별로 묶는다. 편수가 늘어도 이 함수는 그대로다. */
function groupByCategory(): GuideSectionGroup[] {
  const buckets = new Map<string, Guide[]>();
  for (const guide of guides) {
    const bucket = buckets.get(guide.category);
    if (bucket) bucket.push(guide);
    else buckets.set(guide.category, [guide]);
  }

  const ordered = CATEGORY_ORDER.filter((name) => buckets.has(name));
  const rest = [...buckets.keys()].filter((name) => !CATEGORY_ORDER.includes(name));

  return [...ordered, ...rest].map((name, index) => {
    const meta = CATEGORY_META[name];
    return {
      name,
      id: meta?.id ?? `guide-category-${index + 1}`,
      desc: meta?.desc ?? "현장에서 자주 찾는 주제를 모았습니다.",
      items: buckets.get(name) ?? [],
    };
  });
}

export default function GuidePage() {
  const sections = groupByCategory();

  return (
    <main className="min-h-screen bg-surface py-16 md:py-24 break-keep">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="eyebrow">필터 가이드</span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6">
            필터 선택 가이드
          </h1>
          <p className="text-lg text-gray-600">
            교체주기부터 등급 선택, 의료시설 기준까지 — 현장에서 바로 쓰는 가이드입니다.
          </p>
          <p className="mt-3 text-sm font-semibold text-gray-400">
            총 {guides.length}편 · 카테고리별로 나눠 두었습니다
          </p>
        </div>

        {/* 카테고리 점프 링크 */}
        <nav aria-label="가이드 카테고리" className="mb-12">
          <ul className="flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition hover:border-brand-green/45 hover:text-[#176b50]"
                >
                  {section.name}
                  <span className="text-xs font-extrabold text-gray-400">
                    {section.items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 카테고리별 가이드 */}
        <div className="mb-16 space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                {section.name}
              </h2>
              <p className="mt-2 pl-4 text-sm text-gray-500">{section.desc}</p>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {section.items.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guide/${g.slug}`}
                    className="group bg-white border border-gray-200 rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-brand-green/45"
                  >
                    <h3 className="text-lg font-extrabold text-gray-900 leading-snug">
                      {g.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-1">
                      {g.description}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-sm font-bold">
                      <span className="text-[#176b50] inline-flex items-center gap-1.5">
                        자세히 보기
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                      <span className="text-xs font-extrabold text-gray-400">
                        읽는 시간 {g.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 산업군별 추천 필터</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-primary mb-2">도장 부스 (자동차, 금속)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>천장/바닥:</strong> 부직포롤필터</li>
                  <li><strong>배기:</strong> 프리필터, 미듐필터</li>
                  <li><strong>특징:</strong> 도료 분진 포집 및 배기망 보호</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-emerald-600 mb-2">클린룸 (반도체, 제약)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>외기 유입:</strong> 프리필터 + 미듐필터</li>
                  <li><strong>최종 여과:</strong> 헤파필터 (H13, H14)</li>
                  <li><strong>특징:</strong> 초미세먼지 완벽 차단</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-blue-600 mb-2">일반 공조 (AHU)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>1차 여과:</strong> 프리필터</li>
                  <li><strong>2차 여과:</strong> 미듐필터</li>
                  <li><strong>특징:</strong> 실내 공기질 유지 및 장비 보호</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-violet-600 mb-2">식품 제조 (HACCP)</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>전처리:</strong> 미듐필터</li>
                  <li><strong>청정구역:</strong> 헤파필터</li>
                  <li><strong>특징:</strong> 교차 오염 방지 및 위생 확보</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 교체 시기 자가 진단</h2>
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <strong className="text-gray-900 block">설비 차압 증가</strong>
                    <span className="text-gray-600">공조기 계기판의 차압이 초기 설치 대비 2배 이상 상승했을 때</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <strong className="text-gray-900 block">풍량 감소</strong>
                    <span className="text-gray-600">토출구에서 나오는 바람의 세기가 현저히 줄어들었을 때</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <div>
                    <strong className="text-gray-900 block">육안 확인</strong>
                    <span className="text-gray-600">필터 표면에 먼지가 두껍게 쌓여 본래의 색상을 알아보기 힘들 때</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">어떤 필터가 필요한지 모르시겠나요?</h3>
              <p className="text-gray-600 mb-6">현장 사진과 함께 문의해주시면 최적의 제품을 추천해 드립니다.</p>
              <a href="/quote" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl transition-colors">
                맞춤 상담 요청하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
