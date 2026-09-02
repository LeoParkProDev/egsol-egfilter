import Hero from "./components/Hero";
import Products from "./components/Products";
import SizeQuickFind from "./components/SizeQuickFind";
import Industries from "./components/Industries";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import { SITE } from "./data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <SizeQuickFind />
      <Industries />
      <Services />
      <Advantages />
      <Testimonials />
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "에버그린필터",
            description:
              "병원 수술실·클린룸·공장 공조 산업용 에어필터 전문 공급. 헤파필터(H13·H14), 미듐필터(미디움필터), 부직포/프리필터, 부직포롤. 비표준 규격 맞춤 제작 3~7일, 전국 납품.",
            email: SITE.email,
            ...(SITE.phone ? { telephone: SITE.phone } : {}),
            address: {
              "@type": "PostalAddress",
              addressLocality: "강남구",
              addressRegion: "서울특별시",
              addressCountry: "KR",
            },
            url: "https://evergreen-filter.vercel.app",
            sameAs: ["https://smartstore.naver.com/egfilter"],
            openingHours: "Mo-Fr 09:00-18:00",
            areaServed: { "@type": "Country", name: "KR" },
            knowsAbout: ["헤파필터", "미듐필터", "프리필터", "부직포롤필터", "수술실 공기정화설비", "클린룸 필터"],
          }),
        }}
      />
    </>
  );
}
