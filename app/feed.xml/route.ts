import { guides } from "../data/guides";

const BASE_URL = "https://evergreen-filter.vercel.app";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const sorted = [...guides].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  const items = sorted
    .map(
      (g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${BASE_URL}/guide/${g.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/guide/${g.slug}</guid>
      <description>${escapeXml(g.description)}</description>
      <category>${escapeXml(g.category)}</category>
      <pubDate>${new Date(g.datePublished).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>에버그린필터 — 필터 가이드</title>
    <link>${BASE_URL}/guide</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>헤파필터 교체주기, 등급 선택, 병원·클린룸 공기 관리 — 에어필터 실무 가이드</description>
    <language>ko</language>
    <lastBuildDate>${new Date(sorted[0].dateModified).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
