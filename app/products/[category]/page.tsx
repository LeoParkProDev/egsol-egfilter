import { notFound } from "next/navigation";
import { products, colorMap } from "../../data/products";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    category: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.category);
  
  if (!product) {
    return { title: "제품을 찾을 수 없습니다" };
  }

  return {
    title: `${product.name} | 에버그린필터`,
    description: product.shortDesc,
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.category);

  if (!product) {
    notFound();
  }

  const colors = colorMap[product.color];

  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          돌아가기
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className={`absolute top-0 left-0 right-0 h-2 ${colors.bar}`} />
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex-1">
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text} mb-4`}>
                  {product.nameEn}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-sm font-bold bg-gray-50 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">주요 적용 분야</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-center text-gray-700">
                      <svg className={`w-5 h-5 mr-2 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">상세 스펙</h2>
                <dl className="divide-y divide-gray-100">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="py-3 flex flex-col sm:flex-row sm:gap-4">
                      <dt className="text-sm font-bold text-gray-500 w-32">{spec.label}</dt>
                      <dd className="text-sm text-gray-900 mt-1 sm:mt-0">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">권장 교체 주기</h2>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-xl font-medium">
                  {product.replacementCycle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  스마트스토어 구매
                </a>
                <a
                  href="/quote"
                  className="flex-1 text-center bg-white border-2 border-primary text-primary hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-xl transition-all"
                >
                  대량 견적 문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
