import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "NEXWORKS AGENCY: website creation, SEO and GEO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "brand", "nexworks-logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
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
          background: "radial-gradient(circle at 50% 0%, #11202b 0%, #050505 60%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={820} height={193} alt="" />
        <div style={{ marginTop: 56, fontSize: 40, color: "#A7ADB5", letterSpacing: 1 }}>
          Websites · Design · SEO · GEO
        </div>
        <div style={{ marginTop: 18, fontSize: 28, color: "#55BDF2" }}>Design. Optimise. Build.</div>
      </div>
    ),
    size,
  );
}
