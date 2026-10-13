'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Buffer from '@/components/shell/Buffer';
import { useKeys, usePaneKeys } from '@/components/keys/KeyProvider';
import { skillGroups, skillId, type SkillRef } from '@/content/skills';
import { projectHref, roleHref } from '@/content/hrefs';

const resolve = (r: SkillRef) =>
  'role' in r
    ? { href: roleHref(r.role), label: r.role }
    : 'project' in r
      ? { href: projectHref(r.project), label: r.project }
      : r;

const flat = skillGroups.flatMap((g) => g.skills);

/** The `:Lazy` window: technologies as plugins, where each was used as its load reason. */
const LazyView = () => {
  const { active } = useKeys();
  const [cursor, setCursor] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const row = (i: number) => list.current?.querySelector<HTMLElement>(`[data-skill="${i}"]`);

  const go = (i: number) => {
    const next = Math.max(0, Math.min(i, flat.length - 1));
    setCursor(next);
    row(next)?.scrollIntoView({ block: 'nearest' });
  };

  usePaneKeys('buffer', {
    move: (d) => go(cursor + d),
    top: () => go(0),
    bottom: (n) => go(n ? n - 1 : flat.length - 1),
    enter: () => row(cursor)?.querySelector('a')?.click(),
  });

  // /about/skills#typescript, from the finder.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const i = flat.findIndex((s) => skillId(s.name) === id);
    if (i >= 0) go(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let n = -1;
  return (
    <Buffer file="lazy" ruler={`${cursor + 1},1`}>
      <div ref={list} className="px-[2ch] pt-2">
        <h1>
          <span className="bg-heading px-[1ch] font-bold text-bg">Lazy</span>
          <span className="sr-only">: skills</span>
        </h1>
        <p className="mt-[1.7em] text-comment">Total: {flat.length} plugins</p>
        {skillGroups.map((g) => (
          <section key={g.name} className="mt-[1.7em]">
            <h2 className="font-bold text-fg-strong">
              {g.name} ({g.skills.length})
            </h2>
            <ul>
              {g.skills.map((s) => {
                n++;
                const i = n;
                const isCur = i === cursor;
                return (
                  <li
                    key={s.name}
                    id={skillId(s.name)}
                    data-skill={i}
                    onClick={() => setCursor(i)}
                    className={`relative flex scroll-my-12 flex-wrap gap-x-[2ch] pl-[2ch] ${isCur ? 'bg-cursorline' : ''}`}
                  >
                    {isCur && active === 'buffer' && (
                      <span
                        aria-hidden="true"
                        className="cursor-block pointer-events-none absolute left-[2ch] top-0 h-[1.7em] w-[1ch] bg-white mix-blend-difference"
                      />
                    )}
                    <span className="text-fg-strong">
                      <span aria-hidden="true" className={s.refs.length ? 'text-code' : 'text-line-nr'}>
                        ●{' '}
                      </span>
                      {s.name}
                    </span>
                    <span className="flex flex-wrap gap-x-[2ch]">
                      {s.refs.map(resolve).map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          className="text-fg-muted underline decoration-border underline-offset-4 hover:text-fg-strong hover:decoration-fg-strong"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Buffer>
  );
};

export default LazyView;
