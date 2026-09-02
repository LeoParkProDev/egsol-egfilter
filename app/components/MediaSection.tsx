/**
 * 여재 단면 확대도 — 유리섬유 사이에서 입자가 걸리는 세 가지 원리를 그린다.
 *
 * "H13은 99.95%, H14는 99.995%"라는 숫자만으로는 왜 0.3μm가 기준인지 설명되지 않는다.
 * 큰 입자는 관성으로 부딪히고 작은 입자는 확산으로 부딪히는데, 그 사이 0.3μm 부근이
 * 양쪽 다 잘 안 걸리는 구간(MPPS)이라는 것 — 이건 그림이 아니면 잘 전달되지 않는다.
 */

const INK = "var(--color-ink)";
const DIM = "var(--color-accent)";
const MUTED = "var(--color-muted)";

/** 여재 안의 섬유 단면(원). 위치는 고정 — 매번 같은 그림이 나와야 한다. */
const FIBERS = [
  [212, 62], [256, 108], [232, 158], [274, 196], [200, 214],
  [300, 70], [318, 140], [286, 44], [340, 182], [356, 96],
  [246, 232], [310, 226], [372, 52], [388, 140], [180, 120],
  [352, 244], [404, 200], [166, 174], [420, 86], [268, 132],
] as const;

export default function MediaSection({ className = "" }: { className?: string }) {
  const zoneX = 150;
  const zoneW = 300;
  const top = 30;
  const bottom = 262;

  return (
    <figure className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-3">
        <span className="text-[13px] font-semibold text-gray-900">여재 단면 — 입자가 걸리는 원리</span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-gray-500">
          MEDIA · ×2000
        </span>
      </figcaption>

      <div className="px-4 py-5 sm:px-5">
        <svg
          viewBox="0 0 600 300"
          className="h-auto w-full"
          role="img"
          aria-label="여재 단면 확대도 — 관성 충돌, 차단, 확산 세 가지 방식으로 입자가 유리섬유에 걸린다"
        >
          {/* 여재 구간 */}
          <rect
            x={zoneX}
            y={top}
            width={zoneW}
            height={bottom - top}
            fill="var(--color-tint)"
            stroke="var(--color-tint-line)"
            strokeWidth="1"
          />
          <text
            x={zoneX + zoneW / 2}
            y={top - 10}
            textAnchor="middle"
            fill={MUTED}
            fontSize="10"
            fontFamily="var(--font-plex-mono), monospace"
            letterSpacing="0.08em"
          >
            GLASS FIBER MEDIA
          </text>

          {/* 섬유 단면 */}
          <g fill="#fff" stroke={INK} strokeWidth="1" strokeOpacity="0.55">
            {FIBERS.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" />
            ))}
          </g>

          {/* 좌우 라벨 */}
          <text x={16} y={bottom / 2 - 4} fill={INK} fontSize="12" fontWeight="600">
            오염 공기
          </text>
          <text x={16} y={bottom / 2 + 12} fill={MUTED} fontSize="10">
            외기 · 순환 공기
          </text>
          <text x={584} y={bottom / 2 - 4} textAnchor="end" fill={INK} fontSize="12" fontWeight="600">
            청정 공기
          </text>
          <text x={584} y={bottom / 2 + 12} textAnchor="end" fill={MUTED} fontSize="10">
            급기
          </text>

          {/* ── 1. 관성 충돌 — 큰 입자는 기류를 못 따라가고 섬유에 부딪힌다 ── */}
          <g>
            <path
              d="M96 70 L206 70"
              stroke={DIM}
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <circle cx="206" cy="70" r="5.5" fill={INK} />
            <text x={96} y={56} fill={INK} fontSize="11" fontWeight="600">
              관성 충돌
            </text>
            <text x={96} y={92} fill={MUTED} fontSize="10">
              1 μm 이상
            </text>
          </g>

          {/* ── 2. 차단 — 기류를 따라가다 섬유에 스치며 걸린다 (0.3μm 부근) ── */}
          <g>
            <path
              d="M96 152 C 150 152, 176 146, 200 152 S 236 168, 250 152"
              stroke={DIM}
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <circle cx="250" cy="152" r="3.5" fill={DIM} />
            <text x={96} y={138} fill={INK} fontSize="11" fontWeight="600">
              차단
            </text>
            <text x={96} y={176} fill={MUTED} fontSize="10">
              0.3 μm 부근
            </text>
          </g>

          {/* ── 3. 확산 — 작은 입자는 불규칙하게 움직이다 섬유에 닿는다 ── */}
          <g>
            <path
              d="M96 232 l14 -10 l12 14 l14 -12 l13 13 l14 -11 l12 12 l11 -9 l14 12"
              stroke={DIM}
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <circle cx="200" cy="231" r="2.5" fill={DIM} />
            <text x={96} y={214} fill={INK} fontSize="11" fontWeight="600">
              확산
            </text>
            <text x={96} y={254} fill={MUTED} fontSize="10">
              0.1 μm 이하
            </text>
          </g>

          {/* 통과 기류 */}
          <g stroke={DIM} strokeWidth="1" fill="none" strokeOpacity="0.7">
            <path d="M456 112 h108 M556 106 l8 6 l-8 6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M456 190 h108 M556 184 l8 6 l-8 6" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* MPPS 지시선 */}
          <g stroke={INK} strokeWidth="0.8" fill="none" strokeOpacity="0.7">
            <path d="M250 152 L318 286" />
          </g>
          <circle cx="250" cy="152" r="9" fill="none" stroke={INK} strokeWidth="0.8" strokeOpacity="0.7" />
          <text x={324} y={290} fill={INK} fontSize="11" fontWeight="600">
            MPPS — 가장 걸러내기 어려운 크기
          </text>
        </svg>
      </div>

      <p className="border-t border-gray-200 bg-surface px-5 py-4 text-xs leading-[1.7] text-gray-500">
        큰 입자는 관성으로, 아주 작은 입자는 불규칙한 확산 운동으로 섬유에 부딪혀 걸립니다.
        그 사이 0.3μm 부근은 양쪽 효과가 모두 약해 가장 통과하기 쉬운 구간(MPPS)이며, 등급은
        바로 이 가장 불리한 조건에서 측정합니다. H13·H14의 효율 숫자가 이 크기 기준인 이유입니다.
      </p>
    </figure>
  );
}
