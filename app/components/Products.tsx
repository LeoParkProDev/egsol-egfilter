import Link from "next/link";
import { products } from "../data/products";

/** 등급 라벨은 제품 스펙의 '여과 등급' 행에서 가져온다 (모노로 세운다). */
function gradeOf(specs: { label: string; value: string }[]) {
  return specs.find((s) => s.label === "여과 등급")?.value ?? specs[0]?.value ?? "";
}

export default function Products() {
  return (
    <section id="products" className="bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <span className="eyebrow">취급 제품</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.015em] text-gray-900 md:text-[2.125rem] md:leading-[1.25]">
              네 가지 필터, 등급으로 고릅니다
            </h2>
          </div>
          <p className="text-gray-500 leading-[1.7] lg:col-span-6">
            앞단의 저렴한 필터를 부지런히 갈수록 뒷단의 고가 필터가 오래갑니다. 용도에 맞는
            마지막 단과, 그것을 보호하는 앞단 — 이 조합이 설계의 전부입니다.
          </p>
        </div>

        <div className="rule-ink mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group pt-6">
              <span className="font-mono text-xs font-medium text-primary">
                {gradeOf(product.specs)}
              </span>
              <h3 className="mt-2.5 text-[1.375rem] font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="mt-2.5 text-sm leading-[1.65] text-gray-500">{product.shortDesc}</p>
              <p className="mt-3 text-[13px] text-gray-400">{product.tags.join(" · ")}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                규격·스펙 보기
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
