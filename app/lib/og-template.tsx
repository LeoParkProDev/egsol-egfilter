import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

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

export async function renderOgImage({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle: string;
}) {
  const brand = "에버그린필터";
  const allText = tag + title + subtitle + brand + "99.995%";
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
          backgroundColor: "#06090f",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 85% 0%, rgba(16,185,129,0.22) 0%, rgba(6,9,15,0) 60%), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(0,194,224,0.14) 0%, rgba(6,9,15,0) 55%)",
          fontFamily: "NotoSansKR",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 18px #10b981",
            }}
          />
          <div
            style={{
              color: "#8ff2d8",
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "0.14em",
            }}
          >
            {tag}
          </div>
        </div>

        <div
          style={{
            marginTop: "34px",
            color: "#ffffff",
            fontSize: title.length > 22 ? "64px" : "78px",
            fontWeight: 900,
            lineHeight: 1.26,
            letterSpacing: "-0.02em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "34px",
            color: "rgba(255,255,255,0.62)",
            fontSize: "28px",
            fontWeight: 500,
            maxWidth: "980px",
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            position: "absolute",
            left: "96px",
            right: "96px",
            bottom: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#ffffff", fontSize: "32px", fontWeight: 900 }}>{brand}</div>
          <div
            style={{
              display: "flex",
              height: "3px",
              flexGrow: 1,
              margin: "0 36px",
              backgroundImage:
                "linear-gradient(90deg, rgba(16,185,129,0) 0%, #10b981 30%, #00c2e0 80%, rgba(0,194,224,0) 100%)",
            }}
          />
          <div
            style={{
              color: "#8ff2d8",
              fontSize: "24px",
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
      ...OG_SIZE,
      fonts: [
        { name: "NotoSansKR", data: bold, weight: 900, style: "normal" },
        { name: "NotoSansKR", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
