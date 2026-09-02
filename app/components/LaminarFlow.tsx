/**
 * 수술실 층류(라미나플로우) 급기 단면도.
 *
 * 의료법 시행규칙의 감염 고위험도 수술실 요건 — "수술대 상부 천장에서 헤파필터로
 * 급기해 벽 하단으로 배기" — 을 글로만 적으면 공기가 어느 방향으로 흐르는지 그려지지
 * 않는다. 단면도로 보면 왜 천장 디퓨저 규격이 곧 성능인지가 한눈에 보인다.
 */

const INK = "var(--color-ink)";
const DIM = "var(--color-accent)";
const MUTED = "var(--color-muted)";

export default function LaminarFlow({ className = "" }: { className?: string }) {
  // 방 단면 좌표
  const left = 92;
  const right = 508;
  const ceil = 78;
  const floor = 274;

  // 천장 층류 디퓨저
  const dfLeft = 190;
  const dfRight = 410;
  const dfBottom = ceil + 16;

  // 하강 기류 화살표 x 좌표
  const downs = [204, 232, 260, 288, 316, 344, 372, 400];

  return (
    <figure className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-3">
        <span className="text-[13px] font-semibold text-gray-900">수술실 층류 급기 단면도</span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-gray-500">
          SECTION · LAMINAR
        </span>
      </figcaption>

      <div className="px-4 py-5 sm:px-5">
        <svg
          viewBox="0 0 600 322"
          className="h-auto w-full"
          role="img"
          aria-label="수술실 단면도 — 천장 헤파필터에서 수술대로 층류 급기하고 벽 하단으로 배기한다"
        >
          {/* 방 윤곽 */}
          <rect
            x={left}
            y={ceil}
            width={right - left}
            height={floor - ceil}
            fill="#fff"
            stroke={INK}
            strokeWidth="1.4"
          />
          {/* 바닥 해칭 */}
          <g stroke={INK} strokeWidth="0.7" strokeOpacity="0.35">
            {Array.from({ length: 22 }, (_, i) => (
              <line key={i} x1={left + i * 19} y1={floor} x2={left + i * 19 - 9} y2={floor + 9} />
            ))}
          </g>
          <line x1={left} y1={floor} x2={right} y2={floor} stroke={INK} strokeWidth="1.4" />

          {/* 천장 층류 헤파 디퓨저 */}
          <rect
            x={dfLeft}
            y={ceil}
            width={dfRight - dfLeft}
            height={dfBottom - ceil}
            fill="var(--color-tint)"
            stroke={DIM}
            strokeWidth="1.2"
          />
          <g stroke={DIM} strokeWidth="0.7" strokeOpacity="0.8">
            {Array.from({ length: 14 }, (_, i) => (
              <line
                key={i}
                x1={dfLeft + 8 + i * 15}
                y1={ceil + 3}
                x2={dfLeft + 8 + i * 15}
                y2={dfBottom - 3}
              />
            ))}
          </g>
          <text
            x={(dfLeft + dfRight) / 2}
            y={ceil - 12}
            textAnchor="middle"
            fill={INK}
            fontSize="11.5"
            fontWeight="600"
          >
            천장 층류 헤파필터
          </text>
          <text
            x={(dfLeft + dfRight) / 2}
            y={ceil - 30}
            textAnchor="middle"
            fill={DIM}
            fontSize="11"
            fontFamily="var(--font-plex-mono), monospace"
            fontWeight="600"
          >
            H14 · EN 1822
          </text>

          {/* 하강 층류 */}
          <g stroke={DIM} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {downs.map((x) => (
              <path key={x} d={`M${x} ${dfBottom + 6} V202 M${x - 4} 196 L${x} 202 L${x + 4} 196`} />
            ))}
          </g>
          <text x={300} y={140} textAnchor="middle" fill={MUTED} fontSize="10.5">
            수직 하강 기류
          </text>

          {/* 수술대 */}
          <g stroke={INK} fill="#fff">
            <rect x={252} y={220} width={96} height={9} strokeWidth="1.3" />
            <path d="M296 229 V256 M282 256 h28" strokeWidth="1.3" fill="none" />
          </g>
          <text x={300} y={216} textAnchor="middle" fill={INK} fontSize="11" fontWeight="600">
            수술대
          </text>

          {/* 벽 하단 배기 그릴 */}
          {[
            { x: left, dir: -1 },
            { x: right - 18, dir: 1 },
          ].map(({ x, dir }) => (
            <g key={x}>
              <rect
                x={x}
                y={floor - 46}
                width={18}
                height={38}
                fill="var(--color-surface)"
                stroke={INK}
                strokeWidth="1.1"
              />
              <g stroke={INK} strokeWidth="0.7" strokeOpacity="0.6">
                {Array.from({ length: 5 }, (_, i) => (
                  <line key={i} x1={x + 3} y1={floor - 40 + i * 7} x2={x + 15} y2={floor - 40 + i * 7} />
                ))}
              </g>
              {/* 배기 방향 화살표 */}
              <path
                d={`M${x + (dir < 0 ? 26 : -8)} ${floor - 27} h${dir * 16} m${dir * -5} -4 l${dir * 5} 4 l${dir * -5} 4`}
                stroke={DIM}
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}

          {/* 측면 기류(하강 후 벽으로 퍼짐) */}
          <g stroke={DIM} strokeWidth="1" strokeOpacity="0.75" fill="none" strokeLinecap="round">
            <path d="M204 206 C 176 224, 150 230, 128 238" />
            <path d="M400 206 C 428 224, 454 230, 476 238" />
          </g>

          {/* 라벨 */}
          <text x={left - 8} y={floor - 52} textAnchor="end" fill={INK} fontSize="11" fontWeight="600">
            벽 하단 배기
          </text>
          <text x={right + 8} y={floor - 52} fill={INK} fontSize="11" fontWeight="600">
            벽 하단 배기
          </text>

          {/* 전단 구성 */}
          <g stroke={INK} strokeWidth="0.9" fill="none" strokeOpacity="0.75">
            <path d="M300 26 V40" strokeDasharray="3 3" />
          </g>
          <text x={300} y={18} textAnchor="middle" fill={MUTED} fontSize="10">
            공조기(AHU) 전단 — 부직포 G4 + 미듐 F7
          </text>

          {/* 하단 주기 */}
          <text x={300} y={310} textAnchor="middle" fill={MUTED} fontSize="10.5">
            수술대 위 공기가 오염원을 지나지 않고 곧장 바닥·벽으로 빠져나가는 흐름
          </text>
        </svg>
      </div>

      <p className="border-t border-gray-200 bg-surface px-5 py-4 text-xs leading-[1.7] text-gray-500">
        감염 고위험도 수술실은 수술대 상부 천장에서 헤파필터로 급기해 벽 하단으로 배기하는
        층류형 구조입니다. 디퓨저 면적에 맞는 규격으로 정확히 제작되지 않으면 틈으로 공기가
        새어 층류가 무너지므로, 등급만큼 규격과 밀봉이 중요합니다.
      </p>
    </figure>
  );
}
