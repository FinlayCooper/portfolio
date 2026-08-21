'use client';

import { motion } from 'framer-motion';

interface TerminalHeadingProps {
  /** The command this section answers, e.g. "cat experience.md". */
  command: string;
  title: string;
  subtitle?: string;
}

/**
 * Section headers as shell prompts. The portfolio genuinely is a set of
 * documents, so labelling each section with the command that would print it
 * is structural, not ornamental — and terminals never centre their output.
 */
const TerminalHeading = ({ command, title, subtitle }: TerminalHeadingProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
    className="mb-12"
  >
    <p className="font-mono text-xs sm:text-sm mb-3 break-all">
      <span className="text-term-dim">finlay@portfolio</span>
      <span className="text-term-muted">:</span>
      <span className="text-term-dim">~</span>
      <span className="text-term-muted">$ </span>
      <span className="text-finlayGreen">{command}</span>
    </p>
    <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-finlayGreen tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-sm sm:text-base text-term-muted">{subtitle}</p>
    )}
    <div className="term-rule mt-5" />
  </motion.div>
);

export default TerminalHeading;
