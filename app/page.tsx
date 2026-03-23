import Hero from "./components/Hero";
import Products from "./components/Products";
import Industries from "./components/Industries";
import Advantages from "./components/Advantages";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Industries />
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
              "병원, 크린룸, 수술실, 공장, 도장부스, 관리실 특화 에어필터 전문 공급. 프리필터, 헤파필터, 미듐필터.",
            email: "egfilter@naver.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "강남구",
              addressRegion: "서울특별시",
              addressCountry: "KR",
            },
            url: "https://evergreen-filter.vercel.app",
            openingHours: "Mo-Fr 09:00-18:00",
            areaServed: {
              "@type": "GeoCircle",
              geoMidpoint: { "@type": "GeoCoordinates", latitude: 37.505, longitude: 127.051 },
              geoRadius: "30000",
            },
          }),
        }}
      />
    </>
  );
}
