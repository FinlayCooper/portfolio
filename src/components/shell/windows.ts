/** tmux windows, one per route. The bar, routes and statusline read from here. */
export interface TmuxWindow {
  index: number;
  label: string;
  href: string;
  /** Other paths that belong to this window. */
  also?: string[];
}

export const windows: TmuxWindow[] = [
  { index: 0, label: "home", href: "/" },
  { index: 1, label: "about", href: "/about" },
  { index: 2, label: "experience", href: "/experience" },
  { index: 3, label: "projects", href: "/projects", also: ["/archive"] },
  { index: 4, label: "contact", href: "/contact" },
];

export function activeWindow(pathname: string): TmuxWindow | undefined {
  return windows.find(
    (w) =>
      w.href === pathname ||
      (w.href !== "/" && pathname.startsWith(`${w.href}/`)) ||
      w.also?.some((p) => pathname === p || pathname.startsWith(`${p}/`)),
  );
}
