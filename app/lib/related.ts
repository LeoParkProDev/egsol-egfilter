/**
 * 관련 콘텐츠 연결 엔진.
 *
 * 가이드 42편·진료과·업종·규격 페이지가 서로를 가리키게 하는 순수 함수 모음이다.
 * 원칙 세 가지.
 * 1) window·DOM에 의존하지 않는다 — 서버 컴포넌트에서 그대로 호출하고, node로 직접 불러 검증할 수 있다.
 * 2) 데이터 원본은 guides / filterSizes 배열 하나씩만 본다 — 개별 파일(guides-medical 등)을 직접 import하지 않는다.
 *    가이드가 32편에서 42편으로 늘어도 이 파일은 손대지 않는다.
 * 3) 어느 글에나 나오는 범용어("필터", "에어필터", "교체", "규격")는 겹쳐도 점수를 주지 않는다.
 *    관련도의 근거가 되지 못하기 때문이다.
 */

import { guides, type Guide } from "../data/guides";
import { filterSizes, type FilterSize } from "../data/sizes";

/* ───────────────────────── 토큰화 ───────────────────────── */

/** 한글 덩어리 / 영문·숫자 덩어리를 각각 한 토큰으로 본다. "610x610x150", "h13"도 통째로 남는다. */
const TOKEN_PATTERN = /[가-힣]+|[a-z0-9]+/g;

/** 1자 토큰은 조사·단위 조각인 경우가 대부분이라 버린다. */
const MIN_TOKEN_LENGTH = 2;

/** 업종·주제와 무관하게 모든 글에 등장하는 말 — 가중치 0. */
const GENERIC_TOKENS = new Set([
  "필터",
  "에어필터",
  "헤파필터",
  "교체",
  "규격",
  "가이드",
  "방법",
  "정리",
  "총정리",
  "확인",
  "사용",
  "경우",
  "때문",
  "우리",
  "filter",
  "air",
]);

/** 전체 가이드의 이 비율을 넘게 등장하는 토큰도 범용어로 보고 0점 처리한다. */
const COMMON_TOKEN_RATIO = 0.35;

/** 필드별 가중치 — keywords가 주 신호, title은 보조 신호. */
const KEYWORD_FIELD_WEIGHT = 1;
const TITLE_FIELD_WEIGHT = 0.6;

/** 같은 카테고리 가산점. 강한 우선순위지만 절대 기준은 아니다 — 주제가 맞으면 다른 카테고리도 올라온다. */
const SAME_CATEGORY_BONUS = 3.5;

/** 부동소수 점수 비교 오차. */
const EPSILON = 1e-9;

/** 텍스트에서 점수 계산에 쓸 토큰만 뽑아낸다. 검증 편의를 위해 export한다. */
export function tokenize(text: string): string[] {
  const found = text.toLowerCase().match(TOKEN_PATTERN);
  if (!found) return [];
  return found.filter((token) => token.length >= MIN_TOKEN_LENGTH);
}

type TokenWeights = Map<string, number>;

/**
 * keywords(주)·title(보조)를 하나의 가중 토큰 맵으로 합친다.
 * 같은 필드에서 여러 번 나온 말은 그 글의 주제일 확률이 높아 1 + ln(횟수)만큼 힘을 더 준다
 * ("수술실 …,수술실 …,수술실 …"처럼 키워드마다 반복되는 주어가 이 경우다).
 * 같은 토큰이 두 필드에 다 있으면 큰 쪽을 쓴다.
 */
function weightedTokens(keywords: string, title = ""): TokenWeights {
  const map: TokenWeights = new Map();
  const put = (text: string, fieldWeight: number) => {
    const counts = new Map<string, number>();
    for (const token of tokenize(text)) counts.set(token, (counts.get(token) ?? 0) + 1);
    for (const [token, count] of counts) {
      const weight = fieldWeight * (1 + Math.log(count));
      map.set(token, Math.max(map.get(token) ?? 0, weight));
    }
  };
  put(keywords, KEYWORD_FIELD_WEIGHT);
  put(title, TITLE_FIELD_WEIGHT);
  return map;
}

/* ───────────────────────── 토큰 희소성(가중치) ───────────────────────── */

let documentFrequencyCache: Map<string, number> | null = null;

/** 토큰이 몇 편의 가이드에 등장하는지 — 흔한 토큰의 힘을 빼기 위한 값. 최초 호출 때 한 번만 만든다. */
function documentFrequency(): Map<string, number> {
  if (documentFrequencyCache) return documentFrequencyCache;
  const df = new Map<string, number>();
  for (const guide of guides) {
    for (const token of new Set(tokenize(`${guide.keywords} ${guide.title}`))) {
      df.set(token, (df.get(token) ?? 0) + 1);
    }
  }
  documentFrequencyCache = df;
  return df;
}

/** 희소한 토큰일수록 높은 점수. 범용어와 너무 흔한 토큰은 0. */
function tokenWeight(token: string): number {
  if (GENERIC_TOKENS.has(token)) return 0;
  const total = guides.length;
  const df = documentFrequency().get(token) ?? 0;
  if (df === 0) return 1; // 가이드 코퍼스 밖의 토큰 — 겹치면 그대로 1점
  if (df > total * COMMON_TOKEN_RATIO) return 0;
  return Math.log(total / df) + 0.5;
}

/** 두 가중 토큰 맵이 겹치는 만큼을 점수로 환산한다. */
function overlapScore(a: TokenWeights, b: TokenWeights): number {
  let score = 0;
  for (const [token, weightA] of a) {
    const weightB = b.get(token);
    if (!weightB) continue;
    score += weightA * weightB * tokenWeight(token);
  }
  return score;
}

const guideTokenCache = new Map<string, TokenWeights>();

function tokensOfGuide(guide: Guide): TokenWeights {
  const cached = guideTokenCache.get(guide.slug);
  if (cached) return cached;
  const tokens = weightedTokens(guide.keywords, guide.title);
  guideTokenCache.set(guide.slug, tokens);
  return tokens;
}

interface ScoredGuide {
  guide: Guide;
  score: number;
}

/** 점수 내림차순 → 동점이면 최근 수정본 우선 → 그래도 같으면 slug 순(빌드마다 같은 순서). */
function byScoreThenFreshness(a: ScoredGuide, b: ScoredGuide): number {
  if (Math.abs(a.score - b.score) > EPSILON) return b.score - a.score;
  const byDate = b.guide.dateModified.localeCompare(a.guide.dateModified);
  if (byDate !== 0) return byDate;
  return a.guide.slug.localeCompare(b.guide.slug);
}

/* ───────────────────────── 공개 API ───────────────────────── */

/**
 * 한 가이드에서 이어 읽기 좋은 가이드.
 * 같은 카테고리에 가산점을 주고, keywords·title 토큰이 겹치는 만큼 점수를 더해 정렬한다.
 * 자기 자신은 제외하며, 점수가 0인 글도 뒤쪽에 채워 카드 수를 유지한다.
 */
export function relatedGuides(slug: string, limit = 4): Guide[] {
  const source = guides.find((g) => g.slug === slug);
  if (!source) return [];

  const sourceTokens = tokensOfGuide(source);
  const scored: ScoredGuide[] = guides
    .filter((g) => g.slug !== source.slug)
    .map((guide) => ({
      guide,
      score:
        overlapScore(sourceTokens, tokensOfGuide(guide)) +
        (guide.category === source.category ? SAME_CATEGORY_BONUS : 0),
    }));

  scored.sort(byScoreThenFreshness);
  return scored.slice(0, Math.max(0, limit)).map((s) => s.guide);
}

/**
 * 임의의 키워드 문자열(진료과·업종의 keywords 필드 등)과 겹치는 가이드 상위 N.
 * 겹치는 글이 limit보다 적으면 최근 수정본으로 채운다 — 섹션이 한 칸만 남는 일이 없도록.
 */
export function guidesFor(keywords: string, limit = 4): Guide[] {
  if (limit <= 0) return [];
  const sourceTokens = weightedTokens(keywords);
  const scored: ScoredGuide[] = guides.map((guide) => ({
    guide,
    score: overlapScore(sourceTokens, tokensOfGuide(guide)),
  }));
  scored.sort(byScoreThenFreshness);

  const matched = scored.filter((s) => s.score > EPSILON);
  const pool =
    matched.length >= limit ? matched : [...matched, ...scored.filter((s) => s.score <= EPSILON)];
  return pool.slice(0, limit).map((s) => s.guide);
}

/* ───────────────────────── 규격 매칭 ───────────────────────── */

/** "610×610×292", "610x610x292", "594×594", "610 × 610 × 292"를 모두 잡는다. */
const DIMENSION_PATTERN = /(\d{3,4})\s*[x×*✕]\s*(\d{3,4})(?:\s*[x×*✕]\s*(\d{2,4}))?/g;

/** 가로×세로×두께까지 맞은 경우. */
const EXACT_MATCH_SCORE = 3;
/** 두께 없이 가로×세로만 적힌 경우 — 해당 평면의 규격을 모두 후보로 본다. */
const PLANE_MATCH_SCORE = 1;

/**
 * 본문·키워드에 등장하는 치수 문자열을 sizes.ts의 규격과 맞춰 관련 규격을 돌려준다.
 * 취급하지 않는 치수(예: 575×1175)는 자연히 걸러지고, 하나도 없으면 빈 배열이다.
 */
export function sizesFor(text: string, limit = 4): FilterSize[] {
  if (!text || limit <= 0) return [];

  const scores = new Map<string, number>();
  for (const match of text.toLowerCase().matchAll(DIMENSION_PATTERN)) {
    const w = Number(match[1]);
    const h = Number(match[2]);
    const t = match[3] ? Number(match[3]) : null;

    for (const size of filterSizes) {
      const planeMatch = (size.w === w && size.h === h) || (size.w === h && size.h === w);
      if (!planeMatch) continue;
      // 두께까지 적힌 문장은 그 두께의 규격만 인정한다.
      if (t !== null && size.t !== t) continue;
      const gain = t !== null ? EXACT_MATCH_SCORE : PLANE_MATCH_SCORE;
      scores.set(size.slug, (scores.get(size.slug) ?? 0) + gain);
    }
  }
  if (scores.size === 0) return [];

  return filterSizes
    .filter((size) => scores.has(size.slug))
    .map((size, index) => ({ size, index, score: scores.get(size.slug) ?? 0 }))
    .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.index - b.index))
    .slice(0, limit)
    .map((entry) => entry.size);
}

/**
 * 가이드 한 편의 검색용 원문(제목·키워드·본문·표·FAQ)을 한 줄로 합친다.
 * 규격 문자열은 본문과 표 안에 있는 경우가 많아 sizesFor()에 넘길 때 이 함수를 쓴다.
 */
export function guideText(guide: Guide): string {
  const parts: string[] = [guide.title, guide.keywords, guide.description, guide.intro];
  for (const section of guide.sections) {
    parts.push(section.heading, ...section.body);
    if (section.list) parts.push(...section.list);
    if (section.table) {
      parts.push(...section.table.headers);
      for (const row of section.table.rows) parts.push(...row);
    }
  }
  for (const faq of guide.faqs) parts.push(faq.q, faq.a);
  return parts.join(" ");
}
