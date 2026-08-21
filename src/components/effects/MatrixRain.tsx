'use client';

import { useEffect, useRef } from 'react';

/** Katakana is the canonical glyph set; the shell and TS tokens seed it with
 *  this site's own vocabulary so the rain reads as *this* terminal, not stock. */
const KATAKANA = 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
const TOKENS = '01{}<>[]();=>$~/*&|_+-#!async await const type void null';
const GLYPHS = (KATAKANA + TOKENS).split('').filter((c) => c !== ' ');

const FONT_SIZE = 15;
const FRAME_MS = 1000 / 24; // A real TTY refresh, not a 60fps game loop.

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ctx.font can't read CSS custom properties, so resolve the family up front.
    const monoFamily =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--font-plex-mono')
        .trim() || 'monospace';
    const canvasFont = `500 ${FONT_SIZE}px ${monoFamily}, monospace`;

    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let rafId = 0;
    let last = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = '#05070a';
      ctx.fillRect(0, 0, width, height);

      const columns = Math.ceil(width / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -height);
      // Staggered fall rates stop the columns marching in lockstep.
      speeds = Array.from({ length: columns }, () => 0.6 + Math.random() * 0.9);
    };

    const drawFrame = () => {
      // Painting the whole surface at low alpha is what decays the trails.
      ctx.fillStyle = 'rgba(5, 7, 10, 0.075)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = canvasFont;
      ctx.textBaseline = 'top';

      for (let i = 0; i < drops.length; i++) {
        const glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // The bright head is the detail that makes rain read as rain.
        ctx.fillStyle = '#8effa8';
        ctx.fillText(glyph, x, y);
        ctx.fillStyle = '#12903a';
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], x, y - FONT_SIZE);

        drops[i] += speeds[i];
        if (y > height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
        }
      }
    };

    /** One static frame: the effect is legible, nothing moves. */
    const drawStatic = () => {
      ctx.fillStyle = '#05070a';
      ctx.fillRect(0, 0, width, height);
      ctx.font = canvasFont;
      ctx.textBaseline = 'top';
      for (let i = 0; i < drops.length; i++) {
        const runLength = 6 + ((Math.random() * 14) | 0);
        const startRow = (Math.random() * (height / FONT_SIZE)) | 0;
        for (let r = 0; r < runLength; r++) {
          const alpha = 0.16 + (r / runLength) * 0.5;
          ctx.fillStyle = `rgba(28, 228, 77, ${alpha.toFixed(3)})`;
          ctx.fillText(
            GLYPHS[(Math.random() * GLYPHS.length) | 0],
            i * FONT_SIZE,
            (startRow + r) * FONT_SIZE
          );
        }
      }
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      drawFrame();
    };

    const start = () => {
      if (reduced || rafId) return;
      last = 0;
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // Off-screen tabs should cost nothing and must not bank up a backlog.
    const onVisibility = () => (document.hidden ? stop() : start());

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
        if (reduced) drawStatic();
      }, 150);
    };

    /* The canvas is fixed, so a CSS mask can't dim it as the page scrolls —
       it would travel with the viewport. Drive opacity from scroll instead:
       full strength over the hero, calmer once there's prose to read. */
    let scrollTicking = false;
    const applyScrollFade = () => {
      const ratio = Math.min(window.scrollY / window.innerHeight, 1);
      canvas.style.opacity = `${0.20 - ratio * 0.12}`;
      scrollTicking = false;
    };
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(applyScrollFade);
    };

    setup();
    applyScrollFade();

    if (reduced) {
      drawStatic();
    } else {
      start();
      document.addEventListener('visibilitychange', onVisibility);
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      stop();
      clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity: 0.2 }}
    />
  );
};

export default MatrixRain;
