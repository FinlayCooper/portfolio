'use client';

import { useEffect, useRef } from 'react';

export const keymap: [string, [string, string][]][] = [
  [
    'Move',
    [
      ['j / k', 'down / up a line'],
      ['5j', 'down 5 (any count)'],
      ['gg / G', 'top / bottom'],
      ['12G', 'line 12'],
      ['h / l', 'file list / buffer'],
    ],
  ],
  [
    'Open',
    [
      ['Enter', 'open the current line'],
      ['0-4', 'switch tmux window'],
      ['-', 'up a directory (file list)'],
      ['i', 'type in the current field'],
    ],
  ],
  [
    'Fold',
    [
      ['za', 'toggle fold'],
      ['zc / zo', 'close / open fold'],
    ],
  ],
  [
    'Commands',
    [
      ['/', 'find roles, projects, skills'],
      [':', 'command line (:resume, :e soi-ram, :q)'],
      ['?', 'this list'],
      ['Esc', 'close, or leave a field'],
    ],
  ],
];

/** which-key's popup: every binding, grouped, along the bottom of the screen. */
const WhichKey = ({ onClose }: { onClose: () => void }) => {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement;
    close.current?.focus();
    return () => {
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-bg/50" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="whichkey-title"
        onMouseDown={(e) => e.stopPropagation()}
        className="max-h-[80dvh] w-full overflow-y-auto border-t border-border bg-surface px-[2ch] py-[0.85em] text-[14px]"
      >
        <div className="mb-[0.85em] flex items-center justify-between gap-[2ch]">
          <h2 id="whichkey-title" className="font-bold text-heading">
            Keybinds
          </h2>
          <button ref={close} type="button" onClick={onClose} className="px-[1ch] text-fg-muted hover:text-fg-strong">
            close (esc)
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(34ch,1fr))] gap-x-[4ch] gap-y-[0.85em]">
          {keymap.map(([group, keys]) => (
            <section key={group}>
              <h3 className="text-code">{group}</h3>
              <dl className="grid grid-cols-[9ch_1fr] gap-x-[1ch]">
                {keys.map(([k, desc]) => (
                  <div key={k} className="contents">
                    <dt className="text-warn">{k}</dt>
                    <dd className="text-fg">
                      <span aria-hidden="true" className="text-line-nr">→ </span>
                      {desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <p className="mt-[0.85em] text-comment">Keys pause while you type in a field. Everything also works by click or tap.</p>
      </div>
    </div>
  );
};

export default WhichKey;
