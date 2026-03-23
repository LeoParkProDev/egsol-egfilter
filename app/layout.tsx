import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import KakaoButton from "./components/KakaoButton";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});
export const metadata: Metadata = {
  title: {
    default: "에버그린필터 | 병원 · 크린룸 · 공장 에어필터 전문",
    template: "%s | 에버그린필터",
  },
  description:
    "병원, 크린룸, 수술실, 공장, 도장부스, 관리실 특화 에어필터 공급. 프리필터, 헤파필터, 미듐필터 전문.",
  keywords:
    "병원 에어필터,수술실 필터,크린룸 필터,공장 에어필터,도장부스 필터,관리실 필터,헤파필터,프리필터,미듐필터,에버그린필터",
  metadataBase: new URL("https://evergreen-filter.vercel.app"),
  alternates: { canonical: "/" },
  verification: {
    other: {
      "naver-site-verification": "0914a5e09de7ec433d381f1847fe109d4d674f55",
    },
  },
  openGraph: {
    title: "에버그린필터 | 산업용 에어필터 전문",
    description:
      "병원, 크린룸, 수술실, 공장 등 각 현장에 특화된 고효율 에어필터 솔루션을 제공합니다.",
    url: "https://evergreen-filter.vercel.app",
    siteName: "에버그린필터",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "에버그린필터 | 산업용 에어필터 전문",
    description:
      "병원, 크린룸, 수술실, 공장 등 각 현장에 특화된 고효율 에어필터 솔루션을 제공합니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} antialiased`}>
      <body>
        <Header />
        {children}
        <Footer />
        <KakaoButton />
      </body>
    </html>
  );
}
