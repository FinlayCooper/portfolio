'use client';

import { motion } from 'framer-motion';
import TerminalHeading from '@/components/ui/TerminalHeading';

interface Step {
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    title: 'Context first',
    body: 'Architecture and rules live in project context files, so every agent session starts knowing how the codebase works.',
  },
  {
    title: 'Design, then generate',
    body: 'I define the schemas, types, and validation, and agents fill in the implementation. At BroadGrain that meant one schema-driven factory instead of 100+ hand-written files. On the capstone I rebuilt the whole backend in 3 days this way.',
  },
  {
    title: 'Tests decide',
    body: "Agent output ships only when it passes. On the capstone, a three-role integration harness exercises all 100+ endpoints before anything merges.",
  },
  {
    title: 'Parallel agents and MCP',
    body: "I run multiple agents on separate tasks at once, and use MCP tooling for jobs like migrating BroadGrain's legacy production data.",
  },
  {
    title: 'Build in the room',
    body: "On Soi Ram I made design changes live on calls with the client, so we tried her ideas on the real site instead of trading mockups.",
  },
];

const Workflow = () => {
  return (
    <section id="workflow" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TerminalHeading
          command="cat workflow.md"
          title="How I Build"
          subtitle="AI agents do the typing. I own the design and what ships."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="border border-term-dim bg-term-panel/80 backdrop-blur-sm p-5 sm:p-6"
            >
              <p className="font-mono text-xs text-term-dim mb-2">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-mono text-base font-bold text-finlayGreen mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-term-fg leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
