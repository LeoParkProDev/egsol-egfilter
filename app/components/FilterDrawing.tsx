import type { FilterSize } from "../data/sizes";

/**
 * 규격 도면 — w/h/t 숫자만으로 정면도·측면도를 실제 비율로 그린다.
 *
 * 사진 대신 도면을 쓰는 이유: 이 페이지에서 고객이 하려는 일은 "내가 쓰던 필터가
 * 이 규격이 맞나" 확인이다. 제품 사진은 610×610과 594×594를 구분해 주지 못하지만
 * 치수 도면은 비율과 숫자를 동시에 보여준다. 데이터가 바뀌면 도면도 따라 바뀐다.
 */

const INK = "var(--color-ink)";
const DIM = "var(--color-accent)";

/** 도면 영역(정면도가 들어갈 최대 크기, px) */
const MAX_W = 210;
const MAX_H = 190;

function Grid() {
  return (
    <>
      <defs>
        <pattern id="bp-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" stroke={DIM} strokeOpacity="0.13" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-grid)" />
    </>
  );
}

/** 화살표 양쪽 끝 치수선 + 보조선 + 라벨 */
function DimLine({
  x1,
  y1,
  x2,
  y2,
  label,
  vertical = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  vertical?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const a = 3.5; // 화살촉 크기
  return (
    <g stroke={DIM} strokeWidth="0.8" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <path d={`M${x1 - a} ${y1 + a}L${x1} ${y1}L${x1 + a} ${y1 + a}`} />
          <path d={`M${x2 - a} ${y2 - a}L${x2} ${y2}L${x2 + a} ${y2 - a}`} />
        </>
      ) : (
        <>
          <path d={`M${x1 + a} ${y1 - a}L${x1} ${y1}L${x1 + a} ${y1 + a}`} />
          <path d={`M${x2 - a} ${y2 - a}L${x2} ${y2}L${x2 - a} ${y2 + a}`} />
        </>
      )}
      {/* 숫자 뒤에 흰 테두리를 깔아 치수선이 글자를 관통하지 않게 한다 */}
      <text
        x={vertical ? mx : mx}
        y={vertical ? my : my - 7}
        fill={INK}
        stroke="#fff"
        strokeWidth="3.5"
        paintOrder="stroke"
        fontSize="11"
        fontFamily="var(--font-plex-mono), monospace"
        fontWeight="600"
        textAnchor="middle"
        dominantBaseline={vertical ? "middle" : "auto"}
      >
        {label}
      </text>
    </g>
  );
}

/** 프레임 + 플리츠(주름) 정면도, 그리고 주름 단면이 보이는 측면도 */
function PanelDrawing({ size }: { size: FilterSize }) {
  const scale = Math.min(MAX_W / size.w, MAX_H / size.h);
  const fw = size.w * scale;
  const fh = size.h * scale;
  const sw = Math.max(size.t * scale, 7); // 얇은 판형도 최소한은 보이게

  const originX = 46;
  const originY = 30;
  const gap = 46; // 정면도와 측면도 사이
  const sideX = originX + fw + gap;

  // 정면 플리츠 — 폭에 비례해 개수를 잡되 과밀하지 않게
  const pleats = Math.max(6, Math.min(22, Math.round(fw / 9)));
  const step = fw / pleats;

  // 측면 플리츠 단면 — 깊이 방향 삼각파
  const zig = Math.max(4, Math.min(14, Math.round(fh / 14)));
  const zStep = fh / zig;

  const bottomY = originY + fh;
  const dimY = bottomY + 26;
  const dimX = originX + fw + 16;

  return (
    <svg
      viewBox={`0 0 ${sideX + sw + 34} ${dimY + 22}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${size.title} 치수 도면 — 가로 ${size.w}mm, 세로 ${size.h}mm, 두께 ${size.t}mm`}
    >
      <Grid />

      {/* ── 정면도 ── */}
      <g stroke={INK} fill="none">
        {/* 바깥 프레임 */}
        <rect x={originX} y={originY} width={fw} height={fh} strokeWidth="1.4" fill="#fff" />
        {/* 프레임 두께 표현 */}
        <rect
          x={originX + 4}
          y={originY + 4}
          width={fw - 8}
          height={fh - 8}
          strokeWidth="0.7"
          strokeOpacity="0.55"
        />
        {/* 여재 플리츠 */}
        <g stroke={DIM} strokeWidth="0.7" strokeOpacity="0.75">
          {Array.from({ length: pleats - 1 }, (_, i) => {
            const x = originX + 4 + step * (i + 1);
            return <line key={i} x1={x} y1={originY + 4} x2={x} y2={bottomY - 4} />;
          })}
        </g>
      </g>
      <text
        x={originX}
        y={originY - 9}
        fill="var(--color-muted)"
        fontSize="9"
        fontFamily="var(--font-plex-mono), monospace"
        letterSpacing="0.08em"
      >
        FRONT
      </text>

      {/* ── 측면도 ── */}
      <g stroke={INK} fill="none">
        <rect x={sideX} y={originY} width={sw} height={fh} strokeWidth="1.4" fill="#fff" />
        {/* 주름 단면 삼각파 */}
        <path
          d={Array.from({ length: zig }, (_, i) => {
            const y0 = originY + zStep * i;
            const y1 = y0 + zStep / 2;
            const y2 = y0 + zStep;
            return `M${sideX + 1.5} ${y0}L${sideX + sw - 1.5} ${y1}L${sideX + 1.5} ${y2}`;
          }).join(" ")}
          stroke={DIM}
          strokeWidth="0.7"
          strokeOpacity="0.75"
        />
      </g>
      <text
        x={sideX}
        y={originY - 9}
        fill="var(--color-muted)"
        fontSize="9"
        fontFamily="var(--font-plex-mono), monospace"
        letterSpacing="0.08em"
      >
        SIDE
      </text>

      {/* ── 치수선 ── */}
      <g stroke={DIM} strokeWidth="0.5" strokeOpacity="0.6">
        <line x1={originX} y1={bottomY + 4} x2={originX} y2={dimY + 4} />
        <line x1={originX + fw} y1={bottomY + 4} x2={originX + fw} y2={dimY + 4} />
        <line x1={sideX} y1={bottomY + 4} x2={sideX} y2={dimY + 4} />
        <line x1={sideX + sw} y1={bottomY + 4} x2={sideX + sw} y2={dimY + 4} />
        <line x1={originX + fw + 4} y1={originY} x2={dimX + 4} y2={originY} />
        <line x1={originX + fw + 4} y1={bottomY} x2={dimX + 4} y2={bottomY} />
      </g>
      <DimLine x1={originX} y1={dimY} x2={originX + fw} y2={dimY} label={`${size.w}`} />
      <DimLine x1={sideX} y1={dimY} x2={sideX + sw} y2={dimY} label={`${size.t}`} />
      <DimLine
        x1={dimX}
        y1={originY}
        x2={dimX}
        y2={bottomY}
        label={`${size.h}`}
        vertical
      />
    </svg>
  );
}

/** 부직포롤 — 감긴 원단과 폭·두께·길이 */
function RollDrawing({ size }: { size: FilterSize }) {
  const rollW = 190; // 롤 폭(=원단 폭 1000/1200mm)
  const rollR = 34; // 롤 반지름
  const x = 118;
  const y = 48;
  const dimY = y + rollR * 2 + 30;

  return (
    <svg
      viewBox="0 0 400 200"
      className="h-auto w-full"
      role="img"
      aria-label={`${size.title} 도면 — 원단 폭 ${size.w}mm, 두께 ${size.t}T, 길이 ${size.h}m`}
    >
      <Grid />

      <g stroke={INK} fill="none">
        {/* 롤 본체 */}
        <rect x={x} y={y} width={rollW} height={rollR * 2} strokeWidth="1.4" fill="#fff" />
        {/* 오른쪽 마구리 */}
        <ellipse
          cx={x + rollW}
          cy={y + rollR}
          rx="13"
          ry={rollR}
          strokeWidth="1.4"
          fill="#fff"
        />
        <ellipse cx={x + rollW} cy={y + rollR} rx="4.5" ry="12" strokeWidth="0.9" />
        {/* 왼쪽에서 풀린 원단 */}
        <path
          d={`M${x} ${y + 6}L${x - 34} ${y + 12}M${x} ${y + rollR * 2 - 6}L${x - 34} ${y + rollR * 2 - 1}`}
          strokeWidth="1.1"
        />
        <path d={`M${x - 34} ${y + 12}L${x - 34} ${y + rollR * 2 - 1}`} strokeWidth="1.1" />
        {/* 감긴 결 */}
        <g stroke={DIM} strokeWidth="0.7" strokeOpacity="0.7">
          {[0.25, 0.5, 0.75].map((f) => (
            <ellipse
              key={f}
              cx={x + rollW}
              cy={y + rollR}
              rx={13 * f + 2}
              ry={rollR * (0.35 + f * 0.55)}
              fill="none"
            />
          ))}
        </g>
      </g>

      <text
        x={x - 34}
        y={y - 12}
        fill="var(--color-muted)"
        fontSize="9"
        fontFamily="var(--font-plex-mono), monospace"
        letterSpacing="0.08em"
      >
        ROLL
      </text>

      {/* 폭 치수 */}
      <g stroke={DIM} strokeWidth="0.5" strokeOpacity="0.6">
        <line x1={x} y1={y + rollR * 2 + 4} x2={x} y2={dimY + 4} />
        <line x1={x + rollW} y1={y + rollR * 2 + 4} x2={x + rollW} y2={dimY + 4} />
      </g>
      <DimLine x1={x} y1={dimY} x2={x + rollW} y2={dimY} label={`${size.w}`} />

      {/* 두께 콜아웃 — 풀린 원단 끝을 지시 */}
      <g stroke={DIM} strokeWidth="0.8" fill="none">
        <path d={`M${x - 34} ${y + 8}L${x - 46} ${y - 6}L${x - 62} ${y - 6}`} />
      </g>
      <text
        x={x - 64}
        y={y - 9}
        fill={INK}
        fontSize="10.5"
        fontFamily="var(--font-plex-mono), monospace"
        fontWeight="600"
        textAnchor="end"
      >
        {size.t} T
      </text>
      <text
        x={x - 64}
        y={y + 3}
        fill="var(--color-muted)"
        fontSize="9"
        textAnchor="end"
      >
        두께
      </text>

      {/* 길이 콜아웃 — 감긴 총 길이 */}
      <g stroke={DIM} strokeWidth="0.8" fill="none">
        <path d={`M${x + rollW + 14} ${y + rollR}L${x + rollW + 26} ${y + rollR}`} />
      </g>
      <text
        x={x + rollW + 30}
        y={y + rollR - 2}
        fill={INK}
        fontSize="10.5"
        fontFamily="var(--font-plex-mono), monospace"
        fontWeight="600"
      >
        {size.h} m
      </text>
      <text x={x + rollW + 30} y={y + rollR + 10} fill="var(--color-muted)" fontSize="9">
        총 길이
      </text>
    </svg>
  );
}

export default function FilterDrawing({
  size,
  className = "",
}: {
  size: FilterSize;
  className?: string;
}) {
  const isRoll = size.type === "부직포롤";

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-3">
        <span className="text-[13px] font-semibold text-gray-900">규격 도면</span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-gray-500">
          {isRoll ? "ROLL · mm / m" : "UNIT · mm"}
        </span>
      </figcaption>
      <div className="px-5 py-5">
        {isRoll ? <RollDrawing size={size} /> : <PanelDrawing size={size} />}
      </div>
      <p className="border-t border-gray-200 bg-surface px-5 py-3 text-xs leading-[1.6] text-gray-500">
        실제 비율로 그린 도면입니다. 치수는 프레임 바깥 기준(가로 × 세로 × 두께)이며,
        표기 없는 상세 형상은 제조 사양에 따릅니다.
      </p>
    </figure>
  );
}
