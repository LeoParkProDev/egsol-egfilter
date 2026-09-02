# A안 · 클린 프리시전 — 코드 적용 규칙

`Palette.dc.html`(디자인 시스템) · `Main.dc.html`(홈) · `Specialty.dc.html`(진료과 랜딩) ·
`Guide.dc.html`(가이드 아티클)이 원본. 이 문서는 그 시안을 실제 Next.js 코드에 옮길 때의 규칙이다.

## 이미 끝난 것 (건드리지 말 것)

`app/globals.css`에서 토큰을 전부 재정의했으므로 **색·굵기·라운드·그림자는 자동으로 따라온다.**

- `gray-50…950`이 잉크 계열 중립 램프로 재정의됨 → 기존 `text-gray-900` 등은 그대로 두면 된다
- `primary` / `brand-green` / `accent` 전부 에버그린(#176B50 / #1F7A5C)
- `font-black` `font-extrabold` `font-bold` → 전부 600으로 강제됨
- `rounded-2xl/3xl/xl` → 8px, `rounded-lg` → 6px
- 모든 `shadow-*` → none
- `blue/emerald/violet/amber-600` → 전부 에버그린 (4색 경쟁 제거)

즉 **클래스 이름을 일괄 치환할 필요가 없다.** 구조와 레이아웃만 손보면 된다.

## 남은 작업 — 구조

### 1. 검정 히어로를 밝은 히어로로

`bg-[#14231f]` + `text-white` + 네온 민트(`#8ff2d8`) + `radial-gradient` 히어로는 A안이 아니다.

- 섹션 배경: `bg-paper` (본문은 `text-gray-900`, 보조는 `text-gray-500`)
- 그라디언트 텍스트 `bg-gradient-to-r from-[#8ff2d8] to-accent bg-clip-text text-transparent`
  → `text-primary` 로 교체 (강조 단어만 녹색, 나머지는 잉크)
- `radial-gradient` 배경 div, 격자 패턴 div, `AirParticles` 같은 장식은 삭제
- 히어로는 12칸 그리드 좌 7 / 우 5. 좌측은 아이브로우 + h1 + 설명 + CTA 2개,
  우측은 **흰 패널**(`rounded-xl border border-gray-200 bg-white`)에 그 페이지의 핵심 표
  (진료과라면 권장 구성 3행, 규격이라면 사양 행). `Specialty.dc.html` 45~51행이 예시.
- 모바일에서는 패널이 아래로 내려가면 된다 (`lg:grid-cols-12`)

### 2. 아이브로우

`<span className="eyebrow">한글 라벨</span>` — 이미 전역 치환됨. 새로 쓸 때도 이 클래스만 쓴다.
영문 대문자는 **표 머리(`GRADE` `EFFICIENCY`)와 라벨 마이크로카피에만** 허용.

### 3. 섹션 헤더

가운데 정렬 + 밑줄 바(`w-16 h-1 rounded-full`)는 A안이 아니다. 좌측 정렬로 바꾸고,
제목 아래 콘텐츠 그리드 위에 `className="rule-ink"`(잉크 1px 상단 괘선)를 둔다.

```jsx
<span className="eyebrow">취급 제품</span>
<h2 className="mt-4 text-3xl md:text-[2.125rem] font-semibold tracking-[-0.015em] text-gray-900">…</h2>
<p className="mt-5 max-w-xl text-gray-500 leading-[1.7]">…</p>
<div className="mt-10 grid gap-8 md:grid-cols-4 rule-ink pt-6">…</div>
```

### 4. 카드 → 괘선 컬럼

`bg-white border rounded-2xl p-8` 카드 격자는, 홈의 제품·프로세스처럼 **동등한 항목의 나열**이면
테두리를 없애고 상단 잉크 괘선 아래 컬럼으로 편다(`Main.dc.html` 104~129행).
표·패널처럼 **데이터를 담는 상자**는 흰 배경 + `border-gray-200` + `rounded-xl` 유지.

### 5. 숫자·규격은 모노

규격(`610 × 610 × 292`), 등급(`H14`), 퍼센트(`99.995 %`), 스텝 번호(`01`)는 `font-mono`.
단, **한글이 섞인 문장에는 쓰지 말 것** — 모노 한글은 자간이 흩어져 보인다.

### 6. 버튼

- 주 버튼: `rounded-md bg-primary px-6 py-4 text-base font-semibold text-white hover:bg-primary-dark`
- 보조: `rounded-md border border-gray-900 px-6 py-4 font-semibold text-gray-900 hover:bg-gray-50`
- 잉크 밴드 위 보조: `border border-paper/40 text-paper hover:bg-white/5`
- 카카오: 노란 배경 금지. 위 보조 버튼에 `kakao-dot` 클래스만 추가하면 10px 노란 점이 붙는다
- 한 화면에 주 버튼은 하나. 히어로 CTA는 2개까지.

### 7. CTA 밴드

`components/CTA.tsx`가 기준. 잉크 패널(`rounded-xl bg-surface-dark`) 좌측 카피 / 우측 버튼.
기존의 가운데 정렬 + 그라디언트 + 격자 배경은 쓰지 않는다.

## 금지 목록

이모지 아이콘 · 그라데이션 배경/텍스트 · 글로우 그림자 · 알약(`rounded-full`) 버튼 ·
`font-black` 신규 사용 · 영문 대문자 섹션 아이브로우 · 밑줄 바 · 4색 팔레트 · 검정 배경 히어로.

점(`w-1.5 h-1.5 rounded-full`)과 원형 아바타는 `rounded-full` 그대로 둔다.

## 확인

`npm run build`가 통과해야 하고, 내용(문구·수치·링크·스키마·메타데이터)은 한 글자도 바뀌면 안 된다.
바꾸는 것은 **레이아웃과 클래스뿐**이다.
