import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

// 폰트는 저장소에 번들한다 (app/lib/fonts, Noto Sans KR 한글 전체 + 라틴·기호 서브셋).
// 예전엔 빌드 때마다 구글 폰트 서버에서 받아왔는데, Vercel 빌드 환경에서 응답이
// 깨져 OG 이미지 프리렌더가 실패하고 배포 전체가 막힌 적이 있다. 네트워크 없이
// 파일만 읽으므로 환경에 따라 결과가 달라지지 않는다.
const FONT_DIR = path.join(process.cwd(), "app", "lib", "fonts");
let fontCache: Promise<[ArrayBuffer, ArrayBuffer]> | null = null;

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

function loadFonts(): Promise<[ArrayBuffer, ArrayBuffer]> {
  if (!fontCache) {
    fontCache = Promise.all([
      readFile(path.join(FONT_DIR, "NotoSansKR-Black.ttf")).then(toArrayBuffer),
      readFile(path.join(FONT_DIR, "NotoSansKR-Medium.ttf")).then(toArrayBuffer),
    ]);
  }
  return fontCache;
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
  const [bold, medium] = await loadFonts();

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
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
                "linear-gradient(90deg, rgba(31,122,92,0) 0%, #1f7a5c 30%, #8fd9c0 80%, rgba(143,217,192,0) 100%)",
            }}
          />
          <div
            style={{
              color: "#8fd9c0",
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
