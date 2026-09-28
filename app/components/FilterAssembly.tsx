import { useId } from "react";

export default function FilterAssembly() {
  const titleId = useId().replace(/:/g, "");

  return (
    <figure>
    <svg
      viewBox="0 0 640 470"
      role="img"
      aria-labelledby={titleId}
      className="block h-auto max-h-[470px] w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>필터 구조 개념도: 금속 프레임과 주름형 여재의 분해 조립도</title>
      <defs>
        <pattern id={`${titleId}-grid`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" stroke="#82918A" strokeOpacity=".12" strokeWidth=".7" />
        </pattern>
        <linearGradient id={`${titleId}-media`} x1="178" y1="183" x2="408" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DCE2DD" />
          <stop offset=".5" stopColor="#AEB9B2" />
          <stop offset="1" stopColor="#707D76" />
        </linearGradient>
        <linearGradient id={`${titleId}-frame`} x1="154" y1="90" x2="488" y2="369" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0F3EF" />
          <stop offset=".48" stopColor="#AEB8B2" />
          <stop offset="1" stopColor="#69766F" />
        </linearGradient>
        <marker id={`${titleId}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1 1 6 4 1 7" stroke="#80C69F" strokeWidth="1.2" />
        </marker>
      </defs>

      <rect x="18" y="18" width="604" height="434" rx="2" fill={`url(#${titleId}-grid)`} />
      <path d="M42 66V42h24M574 42h24v24M42 404v24h24m508 0h24v-24" stroke="#AEB8B2" strokeOpacity=".38" />

      {/* Fine construction lines */}
      <path d="M108 105h122m-122 0v39m399 172h-74m74 0v-38" stroke="#AEB8B2" strokeOpacity=".46" strokeDasharray="3 5" />
      <path d="M102 152v174M518 148v188" stroke="#AEB8B2" strokeOpacity=".28" strokeDasharray="2 6" />
      <path d="M104 153h14m-14 173h14M506 153h14m-14 173h14" stroke="#D7DED8" strokeOpacity=".72" />

      {/* Pleated media block, shown between the separated frame rails */}
      <path d="m194 169 177-57 78 40-177 61-78-44Z" fill="#E4E9E5" fillOpacity=".14" stroke="#C8D0CA" strokeOpacity=".74" />
      <path d="m194 169 78 44v127l-78-45V169Z" fill="#87948D" fillOpacity=".44" stroke="#C8D0CA" strokeOpacity=".82" />
      <path d="m272 213 177-61v126l-177 62V213Z" fill={`url(#${titleId}-media)`} stroke="#E0E5E1" strokeWidth="1.2" />

      {/* Pleat folds */}
      <path d="m283 209 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126" stroke="#F0F3EF" strokeOpacity=".62" strokeWidth="1.15" />
      <path d="m284 209 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126m10-130 1 126" stroke="#56645D" strokeOpacity=".42" strokeWidth=".75" transform="translate(-3 0)" />

      {/* Exploded silver frame rails */}
      <path d="m143 112 51-17v17l-51 18v-18Z" fill={`url(#${titleId}-frame)`} stroke="#EDF1ED" strokeWidth="1.1" />
      <path d="m449 74 52-17v18l-52 18V74Z" fill="#8C9992" stroke="#DDE3DE" strokeWidth="1.1" />
      <path d="m143 349 51 29v19l-51-30v-18Z" fill="#69766F" stroke="#C4CCC6" strokeWidth="1.1" />
      <path d="m449 355 52-18v19l-52 19v-20Z" fill={`url(#${titleId}-frame)`} stroke="#E0E5E1" strokeWidth="1.1" />
      <path d="m143 112 51-17m255-21 52-17M143 349l51 29m255-23 52-18" stroke="#FFFFFF" strokeOpacity=".7" />

      {/* Minimal airflow cue through the conceptual assembly */}
      <path d="M65 220h95m-95 28h95m-95 28h95" stroke="#80C69F" strokeWidth="1.4" strokeOpacity=".86" markerEnd={`url(#${titleId}-arrow)`} />
      <path d="M473 238h92m-92 28h92m-92 28h92" stroke="#80C69F" strokeWidth="1.4" strokeOpacity=".72" markerEnd={`url(#${titleId}-arrow)`} />

      {/* Callouts and dimension guides carry no product-specific measurements */}
      <path d="m111 146 47 31h20m337-75-65 55h-24m-74 173 55 36h68" stroke="#CCD4CE" strokeOpacity=".68" strokeWidth=".9" />
      <circle cx="178" cy="177" r="2.5" fill="#80C69F" />
      <circle cx="426" cy="157" r="2.5" fill="#80C69F" />
      <circle cx="475" cy="366" r="2.5" fill="#80C69F" />

      <text x="54" y="91" fill="#C9D1CB" fontFamily="monospace" fontSize="10" letterSpacing="2">ASSEMBLY / CONCEPT</text>
      <text x="53" y="126" fill="#AEB8B2" fontFamily="sans-serif" fontSize="11">공기 흐름</text>
      <text x="354" y="103" fill="#E2E7E3" fontFamily="sans-serif" fontSize="12">주름 여재</text>
      <text x="420" y="404" fill="#E2E7E3" fontFamily="sans-serif" fontSize="12">프레임</text>
      <text x="415" y="431" fill="#9EAAA4" fontFamily="sans-serif" fontSize="11">필터 구조 개념도</text>
      <path d="M54 440h118" stroke="#80C69F" strokeWidth="2" />
    </svg>
      <figcaption className="mt-2 text-center text-xs leading-6 text-[#C9D1CB] sm:hidden">
        필터 구조 개념도 · 공기 흐름 / 주름 여재 / 금속 프레임
      </figcaption>
    </figure>
  );
}
