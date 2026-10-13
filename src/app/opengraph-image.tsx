import { ImageResponse } from "next/og";

export const alt = "Finlay Cooper, software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same tokens as globals.css. Satori can't read CSS variables.
const c = {
  bg: "#000000",
  fg: "#bebebe",
  surface: "#1f1d2e",
  fgMuted: "#908caa",
  lineNr: "#6e6a86",
  fgStrong: "#e0def4",
  heading: "#c4a7e7",
  list: "#31748f",
  code: "#9ccfd8",
  tmux: "#3fae3a",
};

const lines = [
  { kind: "h1", text: "Finlay Cooper" },
  { kind: "meta", text: "Software engineer, Toronto" },
  { kind: "blank", text: "" },
  { kind: "bullet", text: "Ships production systems end to end" },
  { kind: "bullet", text: "Live at 3 plants and in Western's ECE department" },
  { kind: "blank", text: "" },
  { kind: "code", text: "TypeScript React Node.js Next.js C#" },
] as const;

const CURSOR = 3;

/** Fetch only the glyphs we draw, as TTF (satori can't read woff2). */
async function loadFont(weight: 400 | 700, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Cascadia+Mono:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const tmuxLeft = "[finlay] 0:home* 1:about 2:experience 3:projects 4:contact";
  const tmuxRight = '"finlaycooper.ca"';
  const status = "home.md";
  const ruler = `${CURSOR + 1},1`;
  const allText =
    tmuxLeft + tmuxRight + status + ruler + "All~#-0123456789" + lines.map((l) => l.text).join("");

  const [regular, bold] = await Promise.all([loadFont(400, allText), loadFont(700, allText)]);
  const fonts = [
    regular && { name: "Cascadia Mono", data: regular, weight: 400 as const },
    bold && { name: "Cascadia Mono", data: bold, weight: 700 as const },
  ].filter((f) => !!f);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: c.bg,
          color: c.fg,
          fontFamily: fonts.length ? "Cascadia Mono" : "monospace",
          fontSize: 34,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: c.tmux,
            color: "#000000",
            padding: "8px 24px",
            fontSize: 24,
          }}
        >
          <span>{tmuxLeft}</span>
          <span>{tmuxRight}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingTop: 36 }}>
          {lines.map((ln, i) => {
            const isCur = i === CURSOR;
            const num = isCur ? String(i + 1) : String(Math.abs(i - CURSOR));
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  height: 60,
                  alignItems: "center",
                  background: isCur ? "#26233a" : "transparent",
                }}
              >
                <span
                  style={{
                    width: 110,
                    paddingRight: 28,
                    display: "flex",
                    justifyContent: "flex-end",
                    color: isCur ? c.fgStrong : c.lineNr,
                    fontWeight: isCur ? 700 : 400,
                  }}
                >
                  {num}
                </span>
                {ln.kind === "h1" && (
                  <span style={{ color: c.heading, fontWeight: 700, fontSize: 52 }}>
                    # {ln.text}
                  </span>
                )}
                {ln.kind === "meta" && <span style={{ color: c.fgMuted }}>{ln.text}</span>}
                {ln.kind === "bullet" && (
                  <span style={{ display: "flex" }}>
                    <span style={{ color: c.list, marginRight: 20 }}>-</span>
                    {ln.text}
                  </span>
                )}
                {ln.kind === "code" && (
                  <span style={{ display: "flex", gap: 20, color: c.code }}>
                    {ln.text.split(" ").map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                )}
              </div>
            );
          })}
          <div style={{ display: "flex", paddingLeft: 24, color: c.lineNr }}>~</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: c.surface,
            color: c.fgMuted,
            padding: "8px 24px",
            fontSize: 26,
          }}
        >
          <span>{status}</span>
          <span style={{ display: "flex", gap: 80 }}>
            <span>{ruler}</span>
            <span>All</span>
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
