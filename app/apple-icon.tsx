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
          backgroundColor: "#14231f",
        }}
      >
        <div style={{ width: "100px", height: "16px", backgroundColor: "#1f7a5c", borderRadius: "8px" }} />
        <div style={{ width: "68px", height: "16px", backgroundColor: "#1f7a5c", borderRadius: "8px" }} />
        <div style={{ width: "100px", height: "16px", backgroundColor: "#8fd9c0", borderRadius: "8px" }} />
      </div>
    ),
    size
  );
}
