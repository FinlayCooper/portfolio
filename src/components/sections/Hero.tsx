'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

const CMD_WHOAMI = 'whoami';
const CMD_SUMMARY = 'cat summary.txt';

const TYPE_S = 0.045; // seconds per character

/** Commands type; output prints at once, the way a real shell behaves. */
const typeStyle = (text: string, delay: number): CSSProperties =>
  ({
    '--type-ch': `${text.length}ch`,
    '--type-steps': text.length,
    '--type-dur': `${(text.length * TYPE_S).toFixed(2)}s`,
    '--boot-delay': `${delay.toFixed(2)}s`,
  }) as CSSProperties;

const revealStyle = (delay: number): CSSProperties =>
  ({ '--boot-delay': `${delay.toFixed(2)}s` }) as CSSProperties;

// Timeline, in seconds. Everything lands inside 1.6s.
const T_WHOAMI = 0;
const T_IDENTITY = T_WHOAMI + CMD_WHOAMI.length * TYPE_S + 0.17;
const T_SUMMARY_CMD = T_IDENTITY + 0.16;
const T_SUMMARY = T_SUMMARY_CMD + CMD_SUMMARY.length * TYPE_S + 0.17;
const T_FINAL = T_SUMMARY + 0.16;

const Prompt = () => (
  <>
    <span className="text-term-dim">finlay@portfolio</span>
    <span className="text-term-muted">:</span>
    <span className="text-term-dim">~</span>
    <span className="text-term-muted">$ </span>
  </>
);

const Hero = () => {
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) return;
    const skip = () => setSkipped(true);
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, skip));
  }, [skipped]);

  return (
    <section
      data-boot={skipped ? 'skip' : undefined}
      className="relative min-h-screen flex items-center pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-10 md:gap-14">
        {/* Left: the session */}
        <div className="md:w-3/5 font-mono text-sm sm:text-base">
          <p>
            <Prompt />
            <span
              className="boot-type text-finlayGreen"
              style={typeStyle(CMD_WHOAMI, T_WHOAMI)}
            >
              {CMD_WHOAMI}
            </span>
          </p>

          <div
            className="boot-reveal mt-5 mb-7"
            style={revealStyle(T_IDENTITY)}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-finlayGreen tracking-tight leading-none">
              FINLAY COOPER
            </h1>
            <p className="mt-2 text-term-muted text-base sm:text-lg">
              software engineer
            </p>
          </div>

          <p className="boot-reveal" style={revealStyle(T_SUMMARY_CMD)}>
            <Prompt />
            <span
              className="boot-type text-finlayGreen"
              style={typeStyle(CMD_SUMMARY, T_SUMMARY_CMD)}
            >
              {CMD_SUMMARY}
            </span>
          </p>

          <p
            className="boot-reveal mt-4 mb-7 max-w-xl text-term-fg leading-relaxed font-sans text-base"
            style={revealStyle(T_SUMMARY)}
          >
            Software engineering graduate from Western University who takes
            production systems end to end, from requirements through
            deployment. TypeScript, React/Next.js, and Node.js/Express — with
            two systems in daily use today.
          </p>

          <div className="boot-reveal" style={revealStyle(T_FINAL)}>
            <p>
              <Prompt />
              <span className="caret" />
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-5">
              <a
                href="#projects"
                className="border border-term-dim px-5 py-3 text-finlayGreen hover:bg-finlayGreen hover:text-term-bg transition-colors duration-150 text-center"
              >
                [ view work ]
              </a>
              <a
                href="#contact"
                className="border border-term-dim px-5 py-3 text-finlayGreen hover:bg-finlayGreen hover:text-term-bg transition-colors duration-150 text-center"
              >
                [ contact ]
              </a>
            </div>
          </div>
        </div>

        {/* Right: the photo, printed as if whoami produced it */}
        <div className="md:w-2/5 flex justify-center md:justify-end">
          <img
            src="/images/profile.jpg"
            alt="Finlay Cooper"
            className="boot-reveal w-64 sm:w-72 md:w-full md:max-w-sm object-cover border border-term-dim"
            style={revealStyle(T_IDENTITY)}
          />
        </div>
      </div>

      <a
        href="#tech-stack"
        aria-label="Scroll to tech stack"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-finlayGreen text-xs"
      >
        <span className="blink">▼</span>
      </a>
    </section>
  );
};

export default Hero;
