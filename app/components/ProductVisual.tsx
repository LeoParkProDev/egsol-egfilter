type ProductVisualProps = { kind: string };

const artwork = {
  "hepa-filter": {
    label: "헤파필터 여재와 프레임의 형태를 보여주는 개념도",
    index: "02",
  },
  "medium-filter": {
    label: "미듐필터의 깊은 여재 형태를 보여주는 개념도",
    index: "03",
  },
  "pre-filter": {
    label: "프리필터의 메쉬 여재와 프레임을 보여주는 개념도",
    index: "01",
  },
  "roll-filter": {
    label: "부직포롤필터 원단이 풀린 형태를 보여주는 개념도",
    index: "04",
  },
} as const;

export default function ProductVisual({ kind }: ProductVisualProps) {
  const description = artwork[kind as keyof typeof artwork] ?? {
    label: "산업용 필터의 형태를 보여주는 개념도",
    index: "00",
  };

  return (
    <div
      className="relative overflow-hidden border-b border-slate-300/80 bg-[linear-gradient(rgba(100,116,139,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.10)_1px,transparent_1px),linear-gradient(145deg,#f8fafc,#e8edf1)] bg-[size:24px_24px,24px_24px,auto]"
    >
      <div className="absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[9px] tracking-[0.16em] text-slate-500 sm:inset-x-5">
        <span>FORM STUDY / {description.index}</span>
        <span>EG · FILTER</span>
      </div>
      <svg
        viewBox="0 0 480 260"
        role="img"
        aria-label={description.label}
        className="block aspect-[1.72/1] w-full"
        fill="none"
      >
        <defs>
          <linearGradient id={`steel-${kind}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f8fafc" />
            <stop offset="0.48" stopColor="#cbd5e1" />
            <stop offset="1" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id={`face-${kind}`} x1="0" y1="0" x2="0.9" y2="1">
            <stop stopColor="#f1f5f9" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
          <pattern id={`mesh-${kind}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0V10" stroke="#64748b" strokeOpacity=".46" strokeWidth="1.2" />
          </pattern>
        </defs>

        {kind === "hepa-filter" && (
          <g strokeLinejoin="round">
            <path d="m112 78 37-24h223l-35 24H112Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <path d="M112 78h225v126H112z" fill={`url(#face-${kind})`} stroke="#475569" strokeWidth="2" />
            <path d="m337 78 35-24v126l-35 30V78Z" fill={`url(#steel-${kind})`} stroke="#475569" strokeWidth="2" />
            <path d="M132 91v100l11-12V91l12 88 11-88 12 88 11-88 12 88 11-88 12 88 11-88 12 88 11-88 12 88 11-88 12 88 11-88 12 88" stroke="#475569" strokeWidth="2" />
            <path d="M132 91h176v100H132z" stroke="#fff" strokeOpacity=".75" />
            {[0, 1, 2, 3].map((point) => (
              <circle key={point} cx={point % 2 === 0 ? 123 : 326} cy={point < 2 ? 88 : 194} r="3" fill="#f8fafc" stroke="#475569" />
            ))}
            <path d="M93 219h286" stroke="#64748b" strokeDasharray="3 6" />
          </g>
        )}

        {kind === "medium-filter" && (
          <g strokeLinejoin="round">
            <path d="m112 75 38-24h221l-35 24H112Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <path d="M112 75h224v128H112z" fill={`url(#face-${kind})`} stroke="#475569" strokeWidth="2" />
            <path d="m336 75 35-24v126l-35 26V75Z" fill={`url(#steel-${kind})`} stroke="#475569" strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((bag) => {
              const x = 130 + bag * 39;
              return (
                <g key={bag}>
                  <path d={`M${x} 87h25v14l-4 80q-8 14-17 0l-4-80V87Z`} fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
                  <path d={`M${x + 4} 103v70m5-70v78m5-78v70`} stroke="#94a3b8" strokeWidth="1" />
                  <path d={`M${x - 2} 88h29`} stroke="#fff" strokeWidth="3" />
                </g>
              );
            })}
            <path d="M92 219h288" stroke="#64748b" strokeDasharray="3 6" />
          </g>
        )}

        {kind === "pre-filter" && (
          <g strokeLinejoin="round">
            <path d="m123 84 34-22h212l-31 22H123Z" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <path d="M123 84h215v115H123z" fill={`url(#steel-${kind})`} stroke="#475569" strokeWidth="2" />
            <path d="m338 84 31-22v115l-31 22V84Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            <path d="M139 99h183v85H139z" fill={`url(#mesh-${kind})`} stroke="#475569" strokeWidth="2" />
            <path d="M143 103h175v77H143z" stroke="#f8fafc" strokeOpacity=".8" />
            <path d="M116 77h13v129h-13m217-129h13v129h-13" stroke="#334155" strokeWidth="3" />
            <path d="M99 219h278" stroke="#64748b" strokeDasharray="3 6" />
          </g>
        )}

        {kind === "roll-filter" && (
          <g strokeLinejoin="round">
            <path d="m95 177 154-59 120 39-153 62-121-42Z" fill={`url(#face-${kind})`} stroke="#475569" strokeWidth="2" />
            <path d="m118 176 132-49 95 31-131 53-96-35Z" fill={`url(#mesh-${kind})`} stroke="#64748b" strokeWidth="1.5" />
            <path d="m195 79 52-19 52 19v74l-52 22-52-22V79Z" fill={`url(#steel-${kind})`} stroke="#475569" strokeWidth="2" />
            <ellipse cx="247" cy="79" rx="52" ry="20" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
            <ellipse cx="247" cy="79" rx="21" ry="8" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
            <path d="M206 94v60m10-56v61m10-58v62m10-61v63m10-63v63m10-63v63m10-62v61m10-60v57m10-54v50" stroke="#64748b" strokeOpacity=".72" />
            <path d="M108 222h270" stroke="#64748b" strokeDasharray="3 6" />
          </g>
        )}
      </svg>
      <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.1em] text-slate-500 sm:right-5">
        CONCEPT / 제품 형태 참고
      </div>
    </div>
  );
}
