'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import StatusLine from '@/components/shell/StatusLine';
import { useKeys, usePaneKeys } from '@/components/keys/KeyProvider';

export interface NetrwFile {
  name: string;
  href: string;
  live?: boolean;
  /** Rendered like a command, not a file (e.g. `:Lazy`). */
  command?: boolean;
}

export interface NetrwDir {
  dir: string;
  files: NetrwFile[];
}

type Entry =
  | { kind: 'up' }
  | { kind: 'dir'; dir: NetrwDir; open: boolean }
  | { kind: 'file'; file: NetrwFile; depth: number };

const RULE = '='.repeat(78);
const rowClass = 'relative flex min-h-11 w-full items-center justify-between gap-[2ch] px-[1ch] text-left';

/**
 * The netrw listing (`:Ex`), banner included, as the file pane. Directories
 * sort first, the way netrw's default sort sequence does. j/k move the
 * netrw cursor; the open file is marked separately.
 */
const Netrw = ({
  path,
  sortedBy,
  files,
  dirs = [],
}: {
  path: string;
  sortedBy: string;
  files: NetrwFile[];
  dirs?: NetrwDir[];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { active, setActive } = useKeys();
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(dirs.map((d) => [d.dir, d.files.some((f) => f.href === pathname)])),
  );

  const entries: Entry[] = [
    { kind: 'up' },
    ...dirs.flatMap((d): Entry[] => [
      { kind: 'dir', dir: d, open: !!open[d.dir] },
      ...(open[d.dir] ? d.files.map((file): Entry => ({ kind: 'file', file, depth: 1 })) : []),
    ]),
    ...files.map((file): Entry => ({ kind: 'file', file, depth: 0 })),
  ];
  const currentIdx = entries.findIndex((e) => e.kind === 'file' && e.file.href === pathname);
  const [sel, setSel] = useState(Math.max(0, currentIdx));
  const cur = Math.min(sel, entries.length - 1);
  const list = useRef<HTMLUListElement>(null);
  const focused = active === 'list';

  const el = (i: number) => list.current?.querySelector<HTMLElement>(`[data-sel="${i}"]`);
  const go = (i: number) => {
    const next = Math.max(0, Math.min(i, entries.length - 1));
    setSel(next);
    el(next)?.scrollIntoView({ block: 'nearest' });
  };

  usePaneKeys('list', {
    move: (d) => go(cur + d),
    top: () => go(0),
    bottom: (n) => go(n ? n - 1 : entries.length - 1),
    enter: () => el(cur)?.click(),
    up: () => router.push('/'),
  });

  // Follow the open file when it changes from elsewhere (a click, the finder).
  useEffect(() => {
    if (currentIdx >= 0) setSel(currentIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const cursorBlock = (i: number) =>
    focused &&
    i === cur && (
      <span
        aria-hidden="true"
        className="cursor-block pointer-events-none absolute left-[1ch] top-1/2 h-[1.7em] w-[1ch] -translate-y-1/2 bg-white mix-blend-difference"
      />
    );

  return (
    <>
      <nav aria-label={`Files in ${path}`} className="flex-1 pt-1 pb-2 md:overflow-y-auto" onPointerDown={() => setActive('list')}>
        <div aria-hidden="true" className="select-none overflow-hidden whitespace-nowrap px-[1ch] text-comment">
          <div className="hidden sm:block">&quot; {RULE}</div>
          <div className="hidden sm:block">&quot; Netrw Directory Listing</div>
          <div>&quot;   {path}</div>
          <div className="hidden sm:block">&quot;   Sorted by      {sortedBy}</div>
          <div className="hidden sm:block">&quot; {RULE}</div>
        </div>
        <ul ref={list}>
          {entries.map((e, i) => {
            const selected = i === cur ? 'bg-cursorline' : '';
            if (e.kind === 'up')
              return (
                <li key="up">
                  <Link href="/" data-sel={i} onClick={() => setSel(i)} className={`${rowClass} ${selected} font-bold text-code hover:bg-cursorline`}>
                    {cursorBlock(i)}../
                  </Link>
                </li>
              );
            if (e.kind === 'dir')
              return (
                <li key={e.dir.dir}>
                  <button
                    type="button"
                    data-sel={i}
                    aria-expanded={e.open}
                    onClick={() => {
                      setSel(i);
                      setOpen({ ...open, [e.dir.dir]: !e.open });
                    }}
                    className={`${rowClass} ${selected} font-bold text-code hover:bg-cursorline`}
                  >
                    {cursorBlock(i)}
                    {e.dir.dir}/
                  </button>
                </li>
              );
            const current = e.file.href === pathname;
            return (
              <li key={e.file.href}>
                <Link
                  href={e.file.href}
                  data-sel={i}
                  onClick={() => setSel(i)}
                  aria-current={current ? 'page' : undefined}
                  className={`${rowClass} ${selected} ${current ? 'font-bold text-fg-strong' : e.file.command ? 'text-comment' : ''} hover:bg-cursorline`}
                >
                  {cursorBlock(i)}
                  <span className="min-w-0 truncate">
                    {e.depth > 0 && (
                      <span aria-hidden="true" className="text-line-nr">
                        |{' '}
                      </span>
                    )}
                    {e.file.name}
                  </span>
                  {e.file.live && (
                    <span className="shrink-0 text-[13px] text-warn">
                      <span aria-hidden="true">● </span>live
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <StatusLine file={`${path}/`} ruler={`${cur + 1},1`} />
    </>
  );
};

export default Netrw;
