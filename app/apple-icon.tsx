import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          backgroundColor: "#06090f",
        }}
      >
        <div style={{ width: "100px", height: "16px", backgroundColor: "#10b981", borderRadius: "8px" }} />
        <div style={{ width: "68px", height: "16px", backgroundColor: "#0ec98f", borderRadius: "8px" }} />
        <div style={{ width: "100px", height: "16px", backgroundColor: "#00c2e0", borderRadius: "8px" }} />
      </div>
    ),
    size
  );
}
