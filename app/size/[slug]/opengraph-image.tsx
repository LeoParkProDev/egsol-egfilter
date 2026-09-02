import { filterSizes } from "../../data/sizes";
import { renderOgImage, OG_SIZE } from "../../lib/og-template";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "에어필터 규격";

export function generateStaticParams() {
  return filterSizes.map((s) => ({ slug: s.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = filterSizes.find((s) => s.slug === slug);

  return renderOgImage({
    tag: item ? `규격별 필터 · ${item.type}` : "규격별 필터",
    title: item ? `${item.w}×${item.h}×${item.t} ${item.type}` : "에어필터 표준 규격",
    subtitle: item
      ? `${item.grade}  |  ${item.inch}`
      : "헤파·미듐·프리필터 표준 규격 카탈로그",
  });
}
