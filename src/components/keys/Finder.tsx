'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { entries, score, type Entry } from './entries';

const MAX = 12;

/** Indices of the characters a query matched, for highlighting. */
function matched(query: string, text: string): Set<number> {
  const out = new Set<number>();
  const t = text.toLowerCase();
  let ti = 0;
  for (const ch of query.toLowerCase()) {
    if (ch === ' ') continue;
    const at = t.indexOf(ch, ti);
    if (at < 0) break;
    out.add(at);
    ti = at + 1;
  }
  return out;
}

const Highlight = ({ text, hits, offset = 0 }: { text: string; hits: Set<number>; offset?: number }) => (
  <>
    {[...text].map((ch, i) => (
      <span key={i} className={hits.has(i + offset) ? 'text-warn' : undefined}>
        {ch}
      </span>
    ))}
  </>
);

/** Telescope's find_files: results above, prompt below, best match nearest the prompt. */
const Finder = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<Element | null>(null);

  useEffect(() => {
    returnFocus.current = document.activeElement;
    input.current?.focus();
    return () => {
      if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus();
    };
  }, []);

  const results = useMemo(
    () =>
      entries
        .map((e) => ({ e, s: score(query, `${e.path} ${e.detail}`) }))
        .filter((x): x is { e: Entry; s: number } => x.s !== null)
        .sort((a, b) => b.s - a.s)
        .slice(0, MAX)
        .map((x) => x.e),
    [query],
  );
  const current = Math.min(sel, Math.max(0, results.length - 1));

  const open = (e: Entry | undefined) => {
    if (!e) return;
    onClose();
    if (e.href.endsWith('.pdf')) window.open(e.href, '_blank', 'noopener');
    else router.push(e.href);
  };

  const onKeyDown = (ev: React.KeyboardEvent) => {
    const k = ev.key;
    const ctrl = ev.ctrlKey;
    if (k === 'Escape' || (ctrl && k === 'c')) {
      ev.preventDefault();
      onClose();
    } else if (k === 'Enter') {
      ev.preventDefault();
      open(results[current]);
    } else if (k === 'ArrowUp' || (ctrl && (k === 'p' || k === 'k'))) {
      ev.preventDefault();
      setSel(Math.min(current + 1, results.length - 1));
    } else if (k === 'ArrowDown' || (ctrl && (k === 'n' || k === 'j'))) {
      ev.preventDefault();
      setSel(Math.max(current - 1, 0));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 p-[2ch]" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Find files"
        onMouseDown={(e) => e.stopPropagation()}
        className="flex max-h-[80dvh] w-full max-w-[90ch] flex-col gap-[0.6em] text-[14px]"
      >
        <section className="relative flex min-h-0 flex-1 flex-col rounded-md border border-border bg-bg px-[1ch] pt-[0.9em] pb-1">
          <h2 className="absolute -top-[0.85em] left-[2ch] bg-bg px-[1ch] text-fg-muted">Results</h2>
          <ul id="finder-results" role="listbox" aria-label="Results" className="flex min-h-0 flex-col-reverse overflow-y-auto">
            {results.map((e, i) => {
              const hits = matched(query, `${e.path} ${e.detail}`);
              return (
                <li
                  key={e.href + e.path}
                  id={`finder-${i}`}
                  role="option"
                  aria-selected={i === current}
                  onMouseMove={() => setSel(i)}
                  onClick={() => open(e)}
                  className={`flex cursor-pointer gap-[2ch] whitespace-nowrap px-[1ch] ${i === current ? 'bg-cursorline text-fg-strong' : ''}`}
                >
                  <span aria-hidden="true" className="text-warn">{i === current ? '>' : ' '}</span>
                  <span className="truncate">
                    <Highlight text={e.path} hits={hits} />
                  </span>
                  <span className="truncate text-comment">
                    <Highlight text={e.detail} hits={hits} offset={e.path.length + 1} />
                  </span>
                </li>
              );
            })}
            {results.length === 0 && <li className="px-[1ch] text-comment">No matches. Try fewer letters.</li>}
          </ul>
        </section>
        <section className="relative rounded-md border border-border bg-bg px-[1ch] pt-[0.6em] pb-1">
          <h2 className="absolute -top-[0.85em] left-[2ch] bg-bg px-[1ch] text-fg-muted">Find Files</h2>
          <div className="flex items-center gap-[1ch]">
            <span aria-hidden="true" className="text-heading">&gt;</span>
            <input
              ref={input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSel(0);
              }}
              onKeyDown={onKeyDown}
              role="combobox"
              aria-expanded="true"
              aria-controls="finder-results"
              aria-activedescendant={results.length ? `finder-${current}` : undefined}
              aria-label="Search roles, projects, and skills"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-fg-strong outline-none focus-visible:outline-none"
            />
            <span className="shrink-0 text-comment">
              {results.length} / {entries.length}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Finder;
