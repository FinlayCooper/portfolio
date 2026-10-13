'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKeys } from '@/components/keys/KeyProvider';
import { commandNames, runCommand } from '@/components/keys/commands';

/**
 * The command line under the statusline: hints when idle, `:` commands,
 * error messages, and pending keys on the right like 'showcmd'.
 */
const CmdlineRow = () => {
  const router = useRouter();
  const { command, setCommand, message, setMessage, pending, setOverlay, gotoLine } = useKeys();
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (command) input.current?.focus();
  }, [command]);

  const done = () => {
    setValue('');
    setCommand(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      done();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      done();
      setMessage(
        runCommand(value, {
          push: (href) => router.push(href),
          help: () => setOverlay('help'),
          gotoLine,
        }),
      );
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = commandNames.find((c) => c.startsWith(value) && c !== value);
      if (match) setValue(match);
    } else if (e.key === 'Backspace' && !value) {
      done();
    }
  };

  return (
    <div className="flex min-h-7 items-center justify-between gap-[2ch] px-2 text-[13px] leading-7 text-comment">
      {command ? (
        <label className="flex min-w-0 flex-1 items-center text-fg-strong">
          <span aria-hidden="true">:</span>
          <span className="sr-only">Command</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={done}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent outline-none focus-visible:outline-none"
          />
        </label>
      ) : message ? (
        <p role={message.error ? 'alert' : 'status'} className={message.error ? 'text-error' : 'text-fg'}>
          {message.text}
        </p>
      ) : (
        <div className="flex flex-wrap gap-x-[3ch]">
          <button type="button" onClick={() => setOverlay('help')} className="hidden hover:text-fg-strong sm:inline">
            press <kbd className="text-warn">?</kbd> for keybinds
          </button>
          <span aria-hidden="true" className="hidden md:inline">j/k move</span>
          <span aria-hidden="true" className="hidden md:inline">enter open</span>
          <span aria-hidden="true" className="hidden md:inline">za fold</span>
          <span aria-hidden="true" className="hidden md:inline">/ find</span>
          <a href="/resume.pdf" className="hover:text-fg-strong">
            :resume
          </a>
        </div>
      )}
      <span aria-hidden="true" className="shrink-0 text-fg-muted">
        {pending}
      </span>
    </div>
  );
};

export default CmdlineRow;
