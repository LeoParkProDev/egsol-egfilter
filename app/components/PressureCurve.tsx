/**
 * 차압 상승 곡선 — 교체 시점을 달력이 아니라 차압으로 판단한다는 원칙을 그린다.
 *
 * "6~12개월"이라는 개월 수는 환경에 따라 크게 달라지지만, "초기 차압의 2배"라는
 * 기준은 어디서나 같다. 곡선이 처음엔 완만하다 뒤로 갈수록 가팔라진다는 것까지
 * 보여주면, 왜 방치하면 갑자기 나빠지는지가 설명된다.
 */

const INK = "var(--color-ink)";
const DIM = "var(--color-accent)";
const MUTED = "var(--color-muted)";

export default function PressureCurve({ className = "" }: { className?: string }) {
  // 그래프 영역
  const x0 = 62;
  const x1 = 540;
  const y0 = 36; // 위
  const y1 = 228; // 축(아래)

  const yInitial = 196; // 초기 차압
  const yFinal = 96; // 최종 차압(초기의 2배)
  const xCross = 424; // 곡선이 최종 차압에 닿는 지점

  return (
    <figure className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-3">
        <span className="text-[13px] font-semibold text-gray-900">차압 상승 곡선과 교체 시점</span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-gray-500">
          ΔP · TIME
        </span>
      </figcaption>

      <div className="px-4 py-5 sm:px-5">
        <svg
          viewBox="0 0 600 290"
          className="h-auto w-full"
          role="img"
          aria-label="차압 상승 곡선 — 사용 시간이 지날수록 차압이 오르고, 초기 차압의 2배에 도달하면 교체 시점이다"
        >
          {/* 교체 권장 구간 음영 */}
          <rect
            x={xCross}
            y={y0}
            width={x1 - xCross}
            height={y1 - y0}
            fill="var(--color-tint)"
            fillOpacity="0.75"
          />

          {/* 축 */}
          <g stroke={INK} strokeWidth="1.2" fill="none">
            <path d={`M${x0} ${y0 - 6} V${y1} H${x1 + 6}`} />
          </g>
          <text
            x={x0 - 8}
            y={y0 - 10}
            textAnchor="end"
            fill={MUTED}
            fontSize="10"
            fontFamily="var(--font-plex-mono), monospace"
            letterSpacing="0.06em"
          >
            ΔP
          </text>
          <text
            x={x1 + 6}
            y={y1 + 18}
            textAnchor="end"
            fill={MUTED}
            fontSize="10"
            fontFamily="var(--font-plex-mono), monospace"
            letterSpacing="0.06em"
          >
            TIME
          </text>

          {/* 기준선 — 초기 차압 / 최종 차압(2배) */}
          <g stroke={DIM} strokeWidth="1" strokeDasharray="4 4" fill="none">
            <line x1={x0} y1={yInitial} x2={x1} y2={yInitial} strokeOpacity="0.6" />
            <line x1={x0} y1={yFinal} x2={x1} y2={yFinal} />
          </g>
          <text x={x0 + 6} y={yInitial - 7} fill={MUTED} fontSize="10.5">
            초기 차압
          </text>
          <text x={x0 + 6} y={yFinal - 8} fill={DIM} fontSize="10.5" fontWeight="600">
            초기의 2배 — 교체 권장
          </text>

          {/* 차압 곡선 — 처음엔 완만, 뒤로 갈수록 가파르게 */}
          <path
            d={`M${x0} ${yInitial} C 180 190, 300 172, ${xCross} ${yFinal} S 512 52, ${x1} ${y0 + 4}`}
            stroke={INK}
            strokeWidth="1.8"
            fill="none"
          />

          {/* 교체 시점 표시 */}
          <g stroke={DIM} strokeWidth="1" fill="none">
            <line x1={xCross} y1={yFinal} x2={xCross} y2={y1} strokeDasharray="4 4" />
          </g>
          <circle cx={xCross} cy={yFinal} r="5" fill="#fff" stroke={DIM} strokeWidth="1.8" />
          <text
            x={xCross}
            y={y1 + 18}
            textAnchor="middle"
            fill={DIM}
            fontSize="10.5"
            fontWeight="600"
          >
            교체 시점
          </text>

          {/* 구간 라벨 */}
          <text x={x0 + 78} y={y1 + 18} textAnchor="middle" fill={MUTED} fontSize="10.5">
            정상 운전
          </text>
          <text x={280} y={y1 + 18} textAnchor="middle" fill={MUTED} fontSize="10.5">
            풍량 저하 · 전력비 상승
          </text>

          {/* 주석 — 곡선이 가팔라지는 구간 */}
          <g stroke={INK} strokeWidth="0.8" fill="none" strokeOpacity="0.7">
            <path d={`M498 ${y0 + 34} L472 ${y0 + 12}`} />
          </g>
          <text x={504} y={y0 + 38} fill={INK} fontSize="10.5">
            막힐수록 급격히 상승
          </text>

          {/* 하단 설명 */}
          <text x={300} y={278} textAnchor="middle" fill={MUTED} fontSize="10.5">
            같은 필터라도 분진량·가동 시간에 따라 이 곡선이 도달하는 속도가 달라집니다
          </text>
        </svg>
      </div>

      <p className="border-t border-gray-200 bg-surface px-5 py-4 text-xs leading-[1.7] text-gray-500">
        필터는 고장 나지 않고 서서히 막힙니다. 초기 차압 대비 2배(또는 제조사가 명시한 최종
        차압)에 도달한 시점이 교체 기준이며, 개월 수는 그 시점을 어림잡는 참고치일 뿐입니다.
        곡선 후반부가 가파르기 때문에 조금 지났다고 방치하면 풍량과 전력비가 빠르게 나빠집니다.
      </p>
    </figure>
  );
}
