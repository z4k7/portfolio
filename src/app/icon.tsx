import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const logoBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/zak_logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px",
        }}
      >
        <img
          src={logoBase64}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    ),
    size
  );
}
