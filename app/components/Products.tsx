import Link from "next/link";
import { products, colorMap } from "../data/products";

const filterIcon = (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
  />
);

export default function Products() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-black text-sm tracking-widest uppercase">
            Products
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-4">
            취급 제품
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            공장 환경에 맞는 최적의 필터를 제안합니다
          </p>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => {
            const colors = colorMap[product.color];
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative bg-surface hover:bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary/30 transition-all hover:shadow-xl block"
              >
                <div
                  className={`absolute top-0 left-8 right-8 h-0.5 ${colors.bar} rounded-b-full opacity-40 group-hover:opacity-100 transition-opacity`}
                />
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} mb-5`}>
                  <svg className={`w-6 h-6 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {filterIcon}
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 font-bold mb-4">
                  {product.nameEn}
                </p>
                <p className="text-base text-gray-600 leading-relaxed mb-5">
                  {product.shortDesc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                  상세 스펙 보기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
