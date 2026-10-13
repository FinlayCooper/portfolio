'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Buffer from '@/components/shell/Buffer';
import { useKeys, usePaneKeys } from '@/components/keys/KeyProvider';
import type { Line } from './lines';

interface Row {
  line: Line;
  /** Top-level index of the fold this row closes, or belongs to. */
  fold?: number;
  /** A closed fold's placeholder row. */
  closed?: boolean;
  hidden?: boolean;
}

/**
 * An open fold looks like ordinary lines, as in Neovim. A closed fold is one
 * `+--` row; its lines stay in the DOM (hidden) so crawlers still read them.
 */
function toRows(lines: Line[], isOpen: (i: number) => boolean): Row[] {
  const rows: Row[] = [];
  lines.forEach((line, i) => {
    if (line.t !== 'fold') return rows.push({ line });
    const open = isOpen(i);
    if (!open) rows.push({ line, fold: i, closed: true });
    line.lines.forEach((child) => rows.push({ line: child, fold: i, hidden: !open }));
  });
  return rows;
}

const Marker = ({ children }: { children: React.ReactNode }) => (
  <span aria-hidden="true" className="text-list">
    {children}
  </span>
);

const linkClass = 'text-heading underline decoration-heading/40 underline-offset-4 hover:decoration-heading';

function Content({ line, onOpen }: { line: Line; onOpen: () => void }) {
  switch (line.t) {
    case 'h1':
      return (
        <h1 className="font-bold text-heading">
          <span aria-hidden="true"># </span>
          {line.text}
        </h1>
      );
    case 'h2':
      return (
        <h2 className="font-bold text-code">
          <span aria-hidden="true">## </span>
          {line.text}
        </h2>
      );
    case 'meta':
      return <p className="text-comment">{line.text}</p>;
    case 'text':
      return <p>{line.text}</p>;
    case 'bullet':
      return (
        <p className="pl-[2ch] -indent-[2ch]">
          <Marker>- </Marker>
          {line.text}
        </p>
      );
    case 'ol':
      return (
        <p className="pl-[3ch] -indent-[3ch]">
          <Marker>{line.n}. </Marker>
          {line.text}
        </p>
      );
    case 'code':
      return (
        <p className="text-code">
          {line.items.map((item, i) => (
            <Fragment key={item}>
              {i > 0 && ' '}
              <code className="whitespace-nowrap">
                <span aria-hidden="true" className="text-line-nr">`</span>
                {item}
                <span aria-hidden="true" className="text-line-nr">`</span>
              </code>
            </Fragment>
          ))}
        </p>
      );
    case 'links':
      return (
        <p>
          {line.links.map((l, i) => (
            <Fragment key={l.href}>
              {i > 0 && ' '}
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={linkClass}
              >
                <span aria-hidden="true" className="text-line-nr">[</span>
                {l.label}
                <span aria-hidden="true" className="text-line-nr">]</span>
              </a>
            </Fragment>
          ))}
        </p>
      );
    case 'status':
      return (
        <p className="flex flex-wrap gap-x-[2ch]">
          {line.live && (
            <span className="text-warn">
              <span aria-hidden="true">● </span>
              {line.live}
            </span>
          )}
          {line.note && <span className="text-comment">{line.note}</span>}
        </p>
      );
    case 'image': {
      const portrait = line.height > line.width;
      return (
        <figure className="py-1">
          <Image
            src={line.src}
            alt={line.alt}
            width={line.width}
            height={line.height}
            style={line.bg ? { background: line.bg } : undefined}
            className={`h-auto w-full border border-border ${portrait ? 'max-w-[30ch]' : 'max-w-[56ch]'} ${line.bg ? 'p-4' : ''}`}
          />
          {line.caption && <figcaption className="text-comment">{line.caption}</figcaption>}
        </figure>
      );
    }
    case 'blank':
      return <div aria-hidden="true">&nbsp;</div>;
    case 'node':
      return <>{line.node}</>;
    case 'fold': {
      const n = line.lines.length;
      return (
        <button
          type="button"
          aria-expanded="false"
          onClick={onOpen}
          className="flex w-full overflow-hidden whitespace-nowrap bg-surface text-left text-fg-strong hover:bg-cursorline"
        >
          <span aria-hidden="true">+--{n < 10 ? ' ' : ''}</span>
          <span className="truncate">
            &nbsp;{n} {n === 1 ? 'line' : 'lines'}: {line.label}&nbsp;
          </span>
          <span aria-hidden="true" className="min-w-0 flex-1 overflow-hidden text-fg-muted">
            {'·'.repeat(200)}
          </span>
        </button>
      );
    }
  }
}

/**
 * A markdown file open in Neovim: relative line numbers, a block cursor that
 * follows clicks and j/k, folds (za), and colorcolumn=80.
 */
const MdBuffer = ({ file, lines, cursor: initial = 0 }: { file: string; lines: Line[]; cursor?: number }) => {
  const { active, setActive } = useKeys();
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [cursor, setCursor] = useState(initial);
  const container = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const isOpen = (o: Record<number, boolean>) => (i: number) => o[i] ?? (lines[i] as { open?: boolean }).open !== false;
  const all = toRows(lines, isOpen(open));
  const visible = all.filter((r) => !r.hidden);
  const cur = Math.max(0, Math.min(cursor, visible.length - 1));
  const focused = active === 'buffer';

  const go = (idx: number) => {
    moved.current = true;
    setCursor(Math.max(0, Math.min(idx, visible.length - 1)));
  };

  /** Toggle a fold and park the cursor on it, like za. */
  const setFold = (i: number, next: boolean) => {
    const o = { ...open, [i]: next };
    setOpen(o);
    const rows = toRows(lines, isOpen(o)).filter((r) => !r.hidden);
    go(rows.findIndex((r) => r.fold === i));
  };

  const rowEl = (idx: number) => container.current?.querySelector<HTMLElement>(`[data-row="${idx}"]`);

  usePaneKeys('buffer', {
    move: (d) => go(cur + d),
    top: () => go(0),
    bottom: (n) => go(n ? n - 1 : visible.length - 1),
    fold: (op) => {
      const f = visible[cur]?.fold;
      if (f === undefined) return;
      const o = isOpen(open)(f);
      if (op === 'a') setFold(f, !o);
      else if (op === 'c' && o) setFold(f, false);
      else if (op === 'o' && !o) setFold(f, true);
    },
    enter: () => {
      const el = rowEl(cur)?.querySelector<HTMLElement>('button, a, input, textarea');
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.focus();
      else el?.click();
    },
    insert: () => rowEl(cur)?.querySelector<HTMLElement>('input, textarea')?.focus(),
  });

  // Keep the cursor on screen when it moves by key.
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    rowEl(cur)?.scrollIntoView({ block: 'nearest' });
  }, [cur]);

  let v = -1;
  return (
    <Buffer file={file} ruler={`${cur + 1},1`}>
      <div ref={container} className="relative overflow-hidden pt-1" onPointerDown={() => setActive('buffer')}>
        {/* colorcolumn=80, ColorColumn bg; only reached on wide panes */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[85ch] w-[1ch] bg-surface" />
        {all.map((row, i) => {
          if (!row.hidden) v++;
          const idx = v;
          const isCur = !row.hidden && idx === cur;
          return (
            <div
              key={i}
              hidden={row.hidden}
              data-row={row.hidden ? undefined : idx}
              onClick={() => setCursor(idx)}
              className={`relative grid scroll-my-12 grid-cols-[6ch_minmax(0,1fr)] ${isCur ? 'bg-cursorline' : ''}`}
            >
              <span
                aria-hidden="true"
                className={`select-none pr-[1ch] text-right ${isCur ? 'font-bold text-fg-strong' : 'text-line-nr'}`}
              >
                {isCur ? idx + 1 : Math.abs(idx - cur)}
              </span>
              <div className="relative min-w-0 max-w-[78ch] pr-[1ch]">
                {isCur && focused && (
                  <span
                    aria-hidden="true"
                    className="cursor-block pointer-events-none absolute left-0 top-0 h-[1.7em] w-[1ch] bg-white mix-blend-difference"
                  />
                )}
                <Content line={row.line} onOpen={() => row.fold !== undefined && setFold(row.fold, true)} />
              </div>
            </div>
          );
        })}
      </div>
    </Buffer>
  );
};

export default MdBuffer;
