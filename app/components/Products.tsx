import Link from "next/link";
import { products } from "../data/products";
import ProductVisual from "./ProductVisual";

/** The grade comes from the product's own filtration grade entry. */
function gradeOf(specs: { label: string; value: string }[]) {
  return specs.find((spec) => spec.label === "여과 등급")?.value ?? specs[0]?.value ?? "";
}

export default function Products() {
  return (
    <section id="products" className="bg-[#f4f5f3] py-16 text-slate-900 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-5 border-b border-slate-300 pb-7 md:grid-cols-2 md:gap-10 md:pb-9">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-primary">PRODUCT INDEX / 04 CATEGORIES</span>
            <h2 className="mt-3 text-[1.7rem] font-semibold leading-tight tracking-[-0.035em] sm:text-3xl md:text-[2.125rem]">
              용도에 맞는 필터 찾기
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 md:justify-self-end md:text-[15px]">
            제품 형태와 보유한 설비 사양을 대조해 보세요. 적용 등급과 세부 옵션은 각 제품 정보와 판매 페이지에서 확인할 수 있습니다.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
          {products.map((product) => (
            <article
              key={product.slug}
              className="flex min-w-0 flex-col overflow-hidden border border-slate-300 bg-white text-slate-900 shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
            >
              <ProductVisual kind={product.slug} />
              <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.13em] text-primary">
                      CATEGORY / {product.slug.toUpperCase()}
                    </span>
                    <h3 className="mt-2 break-words text-xl font-semibold tracking-[-0.025em] sm:text-[1.375rem]">
                      {product.name}
                    </h3>
                  </div>
                  <span className="max-w-[42%] shrink-0 break-words pt-1 text-right font-mono text-[10px] leading-4 text-slate-600 [overflow-wrap:anywhere] sm:text-[11px]">
                    {gradeOf(product.specs)}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.75] text-slate-600 sm:text-sm">
                  {product.shortDesc}
                </p>
                <p className="mt-3 border-t border-slate-200 pt-3 text-[11px] leading-5 text-slate-500 sm:text-xs">
                  {product.tags.join("  /  ")}
                </p>
                <div className="mt-auto grid grid-cols-1 gap-2 pt-5 min-[480px]:grid-cols-2">
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta-placement="home_product_store"
                    data-product-category={product.slug}
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-3 py-2.5 text-center text-[13px] font-semibold text-white transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
                  >
                    네이버 스토어에서 옵션 보기 <span aria-hidden="true">↗</span>
                  </a>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-slate-400 px-3 py-2.5 text-center text-[13px] font-semibold text-slate-800 transition-colors hover:border-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 motion-reduce:transition-none"
                  >
                    규격·제품 정보 <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
