'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useKeys, usePaneKeys } from '@/components/keys/KeyProvider';

const keys = [
  { key: 'a', label: 'about', href: '/about' },
  { key: 'e', label: 'experience', href: '/experience' },
  { key: 'p', label: 'projects', href: '/projects' },
  { key: 'r', label: 'resume', href: '/resume.pdf' },
  { key: 'c', label: 'contact', href: '/contact' },
];

const open = (router: ReturnType<typeof useRouter>, href: string) =>
  href.endsWith('.pdf') ? window.open(href, '_blank', 'noopener') : router.push(href);

/** Dashboard shortcuts: press the letter, or move with j/k and press Enter. */
const DashboardKeys = () => {
  const router = useRouter();
  const { active } = useKeys();
  const [cursor, setCursor] = useState(0);

  usePaneKeys('buffer', {
    move: (d) => setCursor((c) => Math.max(0, Math.min(c + d, keys.length - 1))),
    top: () => setCursor(0),
    bottom: () => setCursor(keys.length - 1),
    enter: () => open(router, keys[cursor].href),
    letter: (k) => {
      const hit = keys.find((x) => x.key === k);
      if (hit) open(router, hit.href);
      return !!hit;
    },
  });

  return (
    <ul className="w-full max-w-[32ch]">
      {keys.map((k, i) => (
        <li key={k.key}>
          <Link
            href={k.href}
            target={k.href.endsWith('.pdf') ? '_blank' : undefined}
            onMouseEnter={() => setCursor(i)}
            className={`relative flex min-h-11 items-center md:min-h-[2.4em] justify-between px-[1ch] hover:text-fg-strong ${i === cursor ? 'bg-cursorline text-fg-strong' : ''}`}
          >
            {i === cursor && active === 'buffer' && (
              <span
                aria-hidden="true"
                className="cursor-block pointer-events-none absolute left-[1ch] top-1/2 h-[1.7em] w-[1ch] -translate-y-1/2 bg-white mix-blend-difference"
              />
            )}
            <span>{k.label}</span>
            <span className="text-warn">[{k.key}]</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DashboardKeys;
