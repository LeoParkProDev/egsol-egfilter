import { specialties } from "../../data/specialties";
import { renderOgImage, OG_SIZE } from "../../lib/og-template";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "병원·의료시설 전문 헤파필터";

export function generateStaticParams() {
  return specialties.map((s) => ({ specialty: s.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ specialty: string }>;
}) {
  const { specialty } = await params;
  const data = specialties.find((s) => s.slug === specialty);

  return renderOgImage({
    tag: data?.badge ?? "병원·의료시설 전문 필터",
    title: data ? `${data.name} 전문 헤파필터` : "병원 전문 헤파필터",
    subtitle: "규격 맞춤 제작  |  당일 견적  |  전국 배송  |  품의 서류 대응",
  });
}
