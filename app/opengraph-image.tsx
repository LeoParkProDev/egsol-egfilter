import { ImageResponse } from "next/og";

export const alt = "에버그린필터 — 병원·크린룸·공장 에어필터 전문";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(text: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!resource) throw new Error("폰트 로드 실패");
  const res = await fetch(resource[1]);
  return res.arrayBuffer();
}

export default async function OgImage() {
  const title = "병원 · 크린룸 · 공장\n에어필터 전문";
  const brand = "에버그린필터";
  const sub = "H13·H14 헤파필터  |  규격 맞춤 제작  |  당일 견적  |  전국 배송";
  const badge = "EVERGREEN FILTER";

  const allText = title + brand + sub + badge;
  const [bold, medium] = await Promise.all([
    loadGoogleFont(allText, 900),
    loadGoogleFont(allText, 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: "#14231f",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 85% 0%, rgba(23,107,80,0.30) 0%, rgba(20,35,31,0) 60%), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(31,122,92,0.16) 0%, rgba(20,35,31,0) 55%)",
          fontFamily: "NotoSansKR",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#1f7a5c",
              boxShadow: "0 0 18px #1f7a5c",
            }}
          />
          <div
            style={{
              color: "#8fd9c0",
              fontSize: "26px",
              fontWeight: 900,
              letterSpacing: "0.25em",
            }}
          >
            {badge}
          </div>
        </div>

        <div
          style={{
            marginTop: "36px",
            color: "#ffffff",
            fontSize: "88px",
            fontWeight: 900,
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "40px",
            color: "rgba(255,255,255,0.62)",
            fontSize: "30px",
            fontWeight: 500,
          }}
        >
          {sub}
        </div>

        <div
          style={{
            position: "absolute",
            left: "96px",
            right: "96px",
            bottom: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "34px",
              fontWeight: 900,
            }}
          >
            {brand}
          </div>
          <div
            style={{
              display: "flex",
              height: "3px",
              flexGrow: 1,
              margin: "0 36px",
              backgroundImage:
                "linear-gradient(90deg, rgba(31,122,92,0) 0%, #1f7a5c 30%, #8fd9c0 80%, rgba(143,217,192,0) 100%)",
            }}
          />
          <div
            style={{
              color: "#8fd9c0",
              fontSize: "26px",
              fontWeight: 900,
              letterSpacing: "0.1em",
            }}
          >
            99.995%
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NotoSansKR", data: bold, weight: 900, style: "normal" },
        { name: "NotoSansKR", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
