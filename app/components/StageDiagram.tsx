/**
 * 여과 단계 계통도 — 외기가 프리 → 미듐 → 헤파를 거쳐 실내로 들어가는 흐름을 그린다.
 *
 * 표로만 적으면 "G4 + F7 + H13"이 그냥 기호 나열이지만, 계통도로 그리면
 * 이 제품이 어느 단에 들어가고 앞뒤에 무엇이 붙는지가 한눈에 보인다.
 * highlight 로 현재 페이지의 필터 단을 강조한다.
 */

export type StageKey = "pre" | "medium" | "hepa";

const STAGES: { key: StageKey; name: string; grade: string; role: string }[] = [
  { key: "pre", name: "프리필터", grade: "G2 – G4", role: "큰 먼지 · 1차" },
  { key: "medium", name: "미듐필터", grade: "F5 – F9", role: "미세먼지 · 2차" },
  { key: "hepa", name: "헤파필터", grade: "H13 – H14", role: "초미세 · 최종단" },
];

/** 필터 종류 문자열 → 계통도 단계. 부직포롤은 프리 단과 같은 자리다. */
export function stageOf(type: string): StageKey | null {
  if (type.includes("헤파")) return "hepa";
  if (type.includes("미듐") || type.includes("미디움")) return "medium";
  if (type.includes("프리") || type.includes("부직포")) return "pre";
  return null;
}

export default function StageDiagram({
  highlight,
  note,
  className = "",
}: {
  highlight?: StageKey | null;
  note?: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-3">
        <span className="text-[13px] font-semibold text-gray-900">여과 단계 계통도</span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-gray-500">
          AIRFLOW · 3-STAGE
        </span>
      </figcaption>

      <div className="px-4 py-5 sm:px-5">
        <div className="flex items-stretch gap-1.5 sm:gap-2">
          {/* 외기 */}
          <div className="flex w-14 shrink-0 flex-col justify-center text-center sm:w-16">
            <span className="font-mono text-[10px] tracking-[0.06em] text-gray-500">IN</span>
            <span className="mt-1 text-xs font-medium text-gray-700">외기</span>
          </div>

          <Arrow />

          {STAGES.map((stage, i) => {
            const on = highlight === stage.key;
            return (
              <div key={stage.key} className="flex flex-1 items-stretch gap-1.5 sm:gap-2">
                <div
                  className={`flex-1 rounded-md border px-2 py-3 text-center sm:px-3 ${
                    on ? "border-accent bg-tint" : "border-gray-200 bg-white"
                  }`}
                >
                  <span
                    className={`block font-mono text-[11px] font-semibold ${
                      on ? "text-primary" : "text-gray-500"
                    }`}
                  >
                    {stage.grade}
                  </span>
                  <span
                    className={`mt-1.5 block text-[13px] font-semibold ${
                      on ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {stage.name}
                  </span>
                  <span className="mt-1 block text-[11px] leading-tight text-gray-500">
                    {stage.role}
                  </span>
                  {on && (
                    <span className="mt-2 inline-block rounded-sm bg-primary px-1.5 py-0.5 font-mono text-[9px] tracking-[0.06em] text-white">
                      THIS
                    </span>
                  )}
                </div>
                {i < STAGES.length - 1 && <Arrow />}
              </div>
            );
          })}

          <Arrow />

          {/* 실내 */}
          <div className="flex w-14 shrink-0 flex-col justify-center text-center sm:w-16">
            <span className="font-mono text-[10px] tracking-[0.06em] text-primary">OUT</span>
            <span className="mt-1 text-xs font-medium text-gray-700">청정 공기</span>
          </div>
        </div>
      </div>

      {note && (
        <p className="border-t border-gray-200 bg-surface px-5 py-4 text-xs leading-[1.7] text-gray-500">
          {note}
        </p>
      )}
    </figure>
  );
}

function Arrow() {
  return (
    <div className="flex w-3 shrink-0 items-center sm:w-4" aria-hidden="true">
      <svg viewBox="0 0 16 10" className="w-full" fill="none">
        <path
          d="M0 5h13M9.5 1.5 13 5l-3.5 3.5"
          stroke="var(--color-accent)"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
