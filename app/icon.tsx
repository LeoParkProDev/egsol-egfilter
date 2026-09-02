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
          backgroundColor: "#14231f",
          borderRadius: "7px",
        }}
      >
        <div style={{ width: "18px", height: "3px", backgroundColor: "#1f7a5c", borderRadius: "2px" }} />
        <div style={{ width: "12px", height: "3px", backgroundColor: "#1f7a5c", borderRadius: "2px" }} />
        <div style={{ width: "18px", height: "3px", backgroundColor: "#8fd9c0", borderRadius: "2px" }} />
      </div>
    ),
    size
  );
}
