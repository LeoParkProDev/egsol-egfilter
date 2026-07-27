import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          gap: "3px",
          backgroundColor: "#06090f",
          borderRadius: "7px",
        }}
      >
        <div style={{ width: "18px", height: "3px", backgroundColor: "#10b981", borderRadius: "2px" }} />
        <div style={{ width: "12px", height: "3px", backgroundColor: "#0ec98f", borderRadius: "2px" }} />
        <div style={{ width: "18px", height: "3px", backgroundColor: "#00c2e0", borderRadius: "2px" }} />
      </div>
    ),
    size
  );
}
