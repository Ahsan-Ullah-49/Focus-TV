import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "FocusTV — Film Production & Entertainment Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const icon = await readFile(join(process.cwd(), "src/app/icon.png"));
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "64px 76px",
        background: "#f5f3ee",
        color: "#121212",
        borderBottom: "12px solid #cb840a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {/* The supplied mark is embedded locally so social crawlers need no external fetch. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${icon.toString("base64")}`}
          width={78}
          height={78}
          alt=""
        />
        <div style={{ fontSize: 42, letterSpacing: "0.02em" }}>FOCUS TV</div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}
      >
        <div style={{ fontSize: 70, lineHeight: 1.12, maxWidth: 1000 }}>
          Film Production &amp; Entertainment Company
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 23, color: "#686868" }}
      >
        <div>Commercial • Documentaries • Brand Films</div>
        <div>focustv.tv</div>
      </div>
    </div>,
    size
  );
}
