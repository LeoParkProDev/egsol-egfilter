import { products } from "../../data/products";
import { renderOgImage, OG_SIZE } from "../../lib/og-template";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "에버그린필터 제품";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const product = products.find((p) => p.slug === category);
  const grade = product?.specs.find((s) => s.label === "여과 등급")?.value ?? "";

  return renderOgImage({
    tag: product ? `제품 · ${product.nameEn}` : "제품",
    title: product ? product.name : "산업용 에어필터",
    subtitle: product
      ? [grade, product.replacementCycle ? `교체 ${product.replacementCycle}` : ""].filter(Boolean).join("  |  ")
      : "헤파 · 미듐 · 프리 · 부직포롤",
  });
}
