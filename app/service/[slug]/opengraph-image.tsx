import { services } from "../../data/services";
import { renderOgImage, OG_SIZE } from "../../lib/og-template";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "에버그린필터 서비스";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/** OG 부제는 한 문장이면 충분하다 — 히어로 설명의 첫 문장만 쓴다 */
function firstSentence(text: string) {
  const i = text.indexOf(". ");
  return i === -1 ? text : text.slice(0, i + 1);
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  return renderOgImage({
    tag: service ? `서비스 · ${service.badge}` : "서비스",
    title: service ? service.name : "에버그린필터 서비스",
    subtitle: service
      ? firstSentence(service.heroDesc)
      : "필터를 받는 방식부터 정리해 드립니다",
  });
}
