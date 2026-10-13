import type { ReactNode } from "react";

/** One buffer line, rendered the way treesitter + rose-pine draws markdown. */
export type Line =
  | { t: "h1"; text: string }
  | { t: "h2"; text: string }
  | { t: "meta"; text: string }
  | { t: "text"; text: string }
  | { t: "bullet"; text: string }
  | { t: "ol"; n: number; text: string }
  | { t: "code"; items: string[] }
  | { t: "links"; links: { label: string; href: string }[] }
  | { t: "status"; live?: string; note?: string }
  | { t: "image"; src: string; alt: string; width: number; height: number; caption?: string; bg?: string }
  | { t: "blank" }
  | { t: "node"; node: ReactNode }
  /** Folds start open unless `open: false`. */
  | { t: "fold"; label: string; lines: Line[]; open?: boolean };

/** Index of the first line of a kind, for placing the cursor. */
export function firstOf(lines: Line[], t: Line["t"]): number {
  const i = lines.findIndex((l) => l.t === t);
  return i < 0 ? 0 : i;
}
