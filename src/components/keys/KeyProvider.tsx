'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { activeWindow, windows } from '@/components/shell/windows';
import Finder from './Finder';
import WhichKey from './WhichKey';

export type PaneName = 'list' | 'buffer';

/** What a pane does with motions. Every method is optional. */
export interface PaneKeys {
  move?: (delta: number) => void;
  top?: () => void;
  bottom?: (line?: number) => void;
  enter?: () => void;
  fold?: (op: 'a' | 'c' | 'o') => void;
  insert?: () => void;
  up?: () => void;
  /** Single-letter actions, e.g. dashboard shortcuts. Return true if handled. */
  letter?: (key: string) => boolean;
}

export interface Message {
  text: string;
  error?: boolean;
}

interface KeyState {
  active: PaneName;
  setActive: (p: PaneName) => void;
  register: (p: PaneName, keys: PaneKeys) => () => void;
  overlay: 'finder' | 'help' | null;
  setOverlay: (o: 'finder' | 'help' | null) => void;
  command: boolean;
  setCommand: (on: boolean) => void;
  message: Message | null;
  setMessage: (m: Message | null) => void;
  /** Keys typed so far in a pending sequence, shown like 'showcmd'. */
  pending: string;
  gotoLine: (n: number) => void;
}

const KeyContext = createContext<KeyState | null>(null);

export function useKeys() {
  const ctx = useContext(KeyContext);
  if (!ctx) throw new Error('useKeys outside KeyProvider');
  return ctx;
}

/** Register a pane's motions for as long as the component is mounted. */
export function usePaneKeys(pane: PaneName, keys: PaneKeys) {
  const { register } = useKeys();
  const ref = useRef(keys);
  useEffect(() => {
    ref.current = keys;
  });
  useEffect(
    () =>
      register(pane, {
        move: (d) => ref.current.move?.(d),
        top: () => ref.current.top?.(),
        bottom: (n) => ref.current.bottom?.(n),
        enter: () => ref.current.enter?.(),
        fold: (op) => ref.current.fold?.(op),
        insert: () => ref.current.insert?.(),
        up: () => ref.current.up?.(),
        letter: (k) => ref.current.letter?.(k) ?? false,
      }),
    [pane, register],
  );
}

const typing = (el: EventTarget | null) =>
  el instanceof HTMLElement &&
  (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

/** A focused link or button already does the right thing with Enter and Space. */
const focusedControl = () => {
  const el = document.activeElement;
  return el instanceof HTMLElement && el !== document.body && el.matches('a, button, summary, [tabindex]');
};

const SEQUENCE_MS = 800;
/** A digit waits this long for a motion before it switches windows. */
const COUNT_MS = 450;

const KeyProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const panes = useRef<Partial<Record<PaneName, PaneKeys>>>({});
  const [active, setActiveState] = useState<PaneName>('buffer');
  const [overlay, setOverlay] = useState<'finder' | 'help' | null>(null);
  const [command, setCommand] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [pending, setPending] = useState('');
  const seq = useRef('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const register = useCallback((p: PaneName, keys: PaneKeys) => {
    panes.current[p] = keys;
    return () => {
      if (panes.current[p] === keys) delete panes.current[p];
    };
  }, []);

  const setActive = useCallback((p: PaneName) => {
    if (panes.current[p]) setActiveState(p);
  }, []);

  // A new tmux window starts with the buffer focused.
  const windowIndex = activeWindow(pathname)?.index;
  const [prevWindow, setPrevWindow] = useState(windowIndex);
  if (prevWindow !== windowIndex) {
    setPrevWindow(windowIndex);
    setActiveState('buffer');
    setMessage(null);
  }

  const target = useCallback((): PaneKeys | undefined => panes.current[active] ?? panes.current.buffer, [active]);

  const gotoLine = useCallback((n: number) => panes.current.buffer?.bottom?.(n), []);

  useEffect(() => {
    const clear = () => {
      seq.current = '';
      setPending('');
      clearTimeout(timer.current);
    };

    const scrollFallback = (d: number) => window.scrollBy({ top: d * 25.5 });
    // Panes scroll themselves from md up; scrollIntoView in each pane handles that.

    const motion = (key: string, count: number, hasCount: boolean): boolean => {
      const pane = target();
      switch (key) {
        case 'j':
          return pane?.move ? (pane.move(count), true) : (scrollFallback(count), true);
        case 'k':
          return pane?.move ? (pane.move(-count), true) : (scrollFallback(-count), true);
        case 'G':
          if (pane?.bottom) pane.bottom(hasCount ? count : undefined);
          else window.scrollTo({ top: document.body.scrollHeight });
          return true;
        case 'gg':
          // {count}gg goes to that line, like {count}G.
          if (hasCount && pane?.bottom) pane.bottom(count);
          else if (pane?.top) pane.top();
          else window.scrollTo({ top: 0 });
          return true;
      }
      return false;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;
      if (typing(e.target)) {
        if (e.key === 'Escape') (e.target as HTMLElement).blur();
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (overlay || command) {
        if (e.key === 'Escape' || (overlay === 'help' && (e.key === 'q' || e.key === '?'))) {
          e.preventDefault();
          setOverlay(null);
        }
        return;
      }
      const key = e.key;
      if ((key === 'Enter' || key === ' ') && focusedControl()) return;
      if (key === 'Shift' || key === 'CapsLock') return;

      const s = seq.current;
      const countMatch = s.match(/^(\d+)(.*)$/);
      const count = countMatch ? parseInt(countMatch[1], 10) : 1;
      const rest = countMatch ? countMatch[2] : s;
      const handled = () => {
        e.preventDefault();
        clear();
      };

      // Pending two-key sequences: gg, za/zc/zo.
      if (rest === 'g') {
        if (key === 'g') motion('gg', count, !!countMatch);
        return handled();
      }
      if (rest === 'z') {
        if (key === 'a' || key === 'c' || key === 'o') target()?.fold?.(key);
        return handled();
      }

      // Counts. A lone 0-4 with nothing after it switches tmux windows.
      if (/^\d$/.test(key) && !(key === '0' && !countMatch)) {
        e.preventDefault();
        clearTimeout(timer.current);
        seq.current = s + key;
        setPending(seq.current);
        const digits = seq.current;
        if (/^[0-4]$/.test(digits)) {
          timer.current = setTimeout(() => {
            if (seq.current === digits) {
              clear();
              router.push(windows[parseInt(digits, 10)].href);
            }
          }, COUNT_MS);
        } else {
          timer.current = setTimeout(clear, SEQUENCE_MS * 2);
        }
        return;
      }
      if (key === '0' && !countMatch) {
        e.preventDefault();
        router.push(windows[0].href);
        return;
      }

      if (key === 'g' || key === 'z') {
        e.preventDefault();
        clearTimeout(timer.current);
        seq.current = s + key;
        setPending(seq.current);
        timer.current = setTimeout(clear, SEQUENCE_MS);
        return;
      }

      if (motion(key, count, !!countMatch)) return handled();

      switch (key) {
        case 'Enter':
          target()?.enter?.();
          return handled();
        case 'h':
          setActive('list');
          return handled();
        case 'l':
          setActive('buffer');
          return handled();
        case '-':
          if (active === 'list') target()?.up?.();
          return handled();
        case 'i':
          target()?.insert?.();
          return handled();
        case '/':
          setOverlay('finder');
          return handled();
        case '?':
          setOverlay('help');
          return handled();
        case ':':
          setMessage(null);
          setCommand(true);
          return handled();
        case 'Escape':
          setMessage(null);
          return handled();
      }

      if (key.length === 1 && target()?.letter?.(key)) return handled();
      clear();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlay, command, active, target, setActive, router]);

  const state: KeyState = {
    active,
    setActive,
    register,
    overlay,
    setOverlay,
    command,
    setCommand,
    message,
    setMessage,
    pending,
    gotoLine,
  };

  return (
    <KeyContext.Provider value={state}>
      {children}
      {overlay === 'finder' && <Finder onClose={() => setOverlay(null)} />}
      {overlay === 'help' && <WhichKey onClose={() => setOverlay(null)} />}
    </KeyContext.Provider>
  );
};

export default KeyProvider;
