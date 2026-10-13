'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { activeWindow, windows } from './windows';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** tmux's default status-right: %H:%M %d-%b-%y */
function clock(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}-${MONTHS[d.getMonth()]}-${String(d.getFullYear()).slice(2)}`;
}

/**
 * The site nav, drawn as tmux's default status line: one green bar, black
 * text, the current window marked with `*`. tmux puts it at the bottom by
 * default; it sits at the top here because it's the nav.
 */
const TmuxBar = () => {
  const pathname = usePathname();
  const active = activeWindow(pathname);
  // Rendered after mount so server and client HTML match.
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(clock(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-6 bg-tmux px-2 text-[13px] leading-6 text-tmux-fg"
    >
      <ul className="flex flex-wrap items-center">
        <li className="px-1">[finlay]</li>
        {windows.map((w) => {
          const current = w === active;
          return (
            <li key={w.href}>
              <Link
                href={w.href}
                aria-current={current ? 'page' : undefined}
                className={`block px-1 py-0.5 hover:bg-tmux-fg hover:text-tmux focus-visible:bg-tmux-fg focus-visible:text-tmux focus-visible:outline-offset-0 ${current ? 'font-bold' : ''}`}
              >
                {w.index}:{w.label}
                <span aria-hidden="true">{current ? '*' : ' '}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="px-1">
        &quot;finlaycooper.ca&quot;{now && <span> {now}</span>}
      </p>
    </nav>
  );
};

export default TmuxBar;
