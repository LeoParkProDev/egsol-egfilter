import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "에버그린필터",
    short_name: "에버그린필터",
    description: "병원 · 크린룸 · 공장 에어필터 전문 공급",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0052cc",
  };
}
