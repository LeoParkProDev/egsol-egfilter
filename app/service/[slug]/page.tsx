import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../../data/services";
import { SITE } from "../../data/site";

const BASE_URL = "https://evergreen-filter.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "서비스를 찾을 수 없습니다" };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/service/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | 에버그린필터`,
      description: service.metaDescription,
      url: `${BASE_URL}/service/${service.slug}`,
      siteName: "에버그린필터",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const hasPhone = Boolean(SITE.phone);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.nameEn,
    description: service.metaDescription,
    url: `${BASE_URL}/service/${service.slug}`,
    inLanguage: "ko",
    areaServed: "KR",
    provider: {
      "@type": "Organization",
      name: "에버그린필터",
      url: BASE_URL,
      email: SITE.email,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "서비스", item: `${BASE_URL}/service` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${BASE_URL}/service/${service.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-surface py-14 md:py-20 break-keep">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6">
        <nav aria-label="breadcrumb" className="text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-[#0b9e6e] transition-colors">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href="/service" className="hover:text-[#0b9e6e] transition-colors">
            서비스
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{service.name}</span>
        </nav>

        <header className="mt-6">
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <span className="text-[#0b9e6e] bg-brand-green/10 border border-brand-green/25 px-3 py-1 rounded-full">
              {service.badge}
            </span>
            <span className="text-gray-400 tracking-wide uppercase">{service.nameEn}</span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-black text-gray-900 leading-[1.3] text-balance">
            {service.heroTitle[0]}
            <span className="text-[#0b9e6e]">{service.heroTitle[1]}</span>
            {service.heroTitle[2]}
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">{service.heroDesc}</p>
        </header>

        {/* 이런 분께 */}
        <section className="mt-12">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            이런 분께 맞습니다
          </h2>
          <ul className="mt-5 space-y-2.5">
            {service.forWhom.map((item) => (
              <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
                <span className="mt-[0.55em] w-1.5 h-1.5 shrink-0 rounded-full bg-brand-green" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 진행 절차 */}
        <section className="mt-12">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            진행 절차
          </h2>
          <ol className="mt-5 space-y-3">
            {service.steps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-5 md:px-6"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-brand-green/10 border border-brand-green/25 text-[#0b9e6e] font-black text-sm flex items-center justify-center tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-extrabold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-[1.8]">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 이렇게 달라집니다 */}
        <section className="mt-12">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            이렇게 달라집니다
          </h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {service.benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-gray-200 rounded-2xl px-6 py-5"
              >
                <h3 className="font-extrabold text-gray-900 leading-snug">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-[1.8]">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 미리 말씀드리는 조건 */}
        <section className="mt-12">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            미리 말씀드리는 조건
          </h2>
          <div className="mt-5 rounded-2xl bg-gray-100 border border-gray-200 px-6 py-6">
            <p className="text-sm text-gray-600 leading-[1.9]">{service.note}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 border-l-4 border-brand-green pl-4">
            자주 묻는 질문
          </h2>
          <div className="mt-6 space-y-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white border border-gray-200 rounded-2xl open:border-brand-green/45 transition-colors"
              >
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 px-6 py-5 font-bold text-gray-900">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl font-light text-[#0b9e6e] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 bg-surface-dark rounded-3xl px-8 md:px-10 py-10 text-center text-white">
          <h2 className="text-2xl font-black text-balance">
            필터 사진 한 장이면 시작할 수 있습니다
          </h2>
          <p className="mt-3 text-white/60 leading-relaxed">
            기존 필터 라벨이나 실측 사진을 보내주시면 규격·등급을 확인해 드립니다.
            <br className="hidden sm:block" />
            {SITE.replyPromise}.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SITE.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#FEE500] text-[#3C1E1E] font-extrabold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
            >
              카카오톡으로 사진 보내기
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white font-extrabold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
            >
              견적서 양식으로 문의
            </Link>
            {hasPhone && (
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white font-extrabold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
              >
                전화 {SITE.phone}
              </a>
            )}
          </div>
          <p className="mt-6 text-sm text-white/45">
            메일도 괜찮습니다 —{" "}
            <a href={`mailto:${SITE.email}`} className="font-bold underline">
              {SITE.email}
            </a>
            {hasPhone && <span className="ml-2">· {SITE.hours}</span>}
          </p>
        </section>

        {/* 함께 보면 좋은 문서 */}
        <section className="mt-14">
          <h2 className="text-lg font-extrabold text-gray-900">함께 보면 좋은 문서</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {service.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group bg-white border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-brand-green/45 hover:shadow-md"
              >
                <span className="font-bold text-gray-900 leading-snug">{r.label}</span>
                <span className="mt-2 flex items-center gap-1.5 text-sm font-bold text-[#0b9e6e]">
                  자세히 보기
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            다른 거래 방식은{" "}
            <Link href="/service" className="text-[#0b9e6e] font-bold hover:underline">
              서비스 전체 보기
            </Link>
            에서 확인하실 수 있습니다.
          </p>
        </section>
      </article>
    </main>
  );
}
