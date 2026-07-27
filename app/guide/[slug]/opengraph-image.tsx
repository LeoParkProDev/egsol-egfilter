import { guides } from "../../data/guides";
import { renderOgImage, OG_SIZE } from "../../lib/og-template";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "에어필터 실무 가이드";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  return renderOgImage({
    tag: guide ? `필터 가이드 · ${guide.category}` : "필터 가이드",
    title: guide ? guide.title.split(" — ")[0] : "에어필터 실무 가이드",
    subtitle: guide
      ? `읽는 시간 ${guide.readTime}  |  에어필터 실무 가이드`
      : "에어필터 선택·관리 실무 가이드",
  });
}
