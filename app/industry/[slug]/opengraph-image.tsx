import { industries } from "../../data/industries";
import { renderOgImage, OG_SIZE } from "../../lib/og-template";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "산업 현장 전문 에어필터";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = industries.find((i) => i.slug === slug);

  return renderOgImage({
    tag: data?.badge ?? "산업용 에어필터 전문",
    title: data ? `${data.name} 전문 필터` : "산업용 에어필터",
    subtitle: "규격 맞춤 제작  |  당일 견적  |  전국 배송  |  세금계산서 발행",
  });
}
