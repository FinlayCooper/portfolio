import Link from 'next/link';
import Panes from '@/components/shell/Panes';
import MdBuffer from './MdBuffer';
import Netrw from './Netrw';
import { firstOf, type Line } from './lines';

const files = [
  { name: 'about.md', href: '/about' },
  { name: 'education.md', href: '/about/education' },
  { name: 'workflow.md', href: '/about/workflow' },
  { name: ':Lazy', href: '/about/skills', command: true },
];

export const AboutPane = () => <Netrw path="~/about" sortedBy="name" files={files} />;

export function AboutWindow({ file, lines }: { file: string; lines: Line[] }) {
  return (
    <Panes aside={<AboutPane />}>
      <MdBuffer file={`about/${file}`} lines={lines} cursor={firstOf(lines, 'blank') + 1} />
    </Panes>
  );
}

const photo = (src: string, alt: string, caption: string, width: number, height: number): Line => ({
  t: 'image',
  src,
  alt,
  caption,
  width,
  height,
});

export const aboutLines: Line[] = [
  { t: 'h1', text: 'About Me' },
  { t: 'meta', text: "Who's behind the prompt." },
  { t: 'blank' },
  {
    t: 'text',
    text: "I'm a software engineering graduate from Western University (Dean's Honour List) who takes production systems end to end, from requirements through deployment. Two of the systems I've worked on are in production right now: a plant compliance platform I built as the only engineer at BroadGrain Commodities, and the TA-matching platform running in Western's ECE department, where I was technical lead.",
  },
  { t: 'blank' },
  {
    t: 'text',
    text: 'That internship reinforced what I care most about in software development: understanding user needs and iterating based on real feedback. Working directly with plant operators taught me that the best tools fit naturally into existing workflows rather than forcing people to adapt to technology.',
  },
  { t: 'blank' },
  {
    t: 'node',
    node: (
      <p>
        I build with AI agents by default. I own the architecture, the schemas, and the tests; agents do the
        implementation against them. That&apos;s how one engineer ships what normally takes a team, and the{' '}
        <Link href="/about/workflow" className="text-heading underline decoration-heading/40 underline-offset-4 hover:decoration-heading">
          workflow section
        </Link>{' '}
        shows exactly how.
      </p>
    ),
  },
  { t: 'blank' },
  { t: 'h2', text: 'Key Highlights' },
  ...[
    "Software Engineering graduate from Western University (Dean's Honour List)",
    "Sole engineer on a compliance platform running at all 3 of BroadGrain's Canadian plants",
    'Builds with AI agents by default: architecture, schemas, and tests first',
    'Bilingual: English (native), French (fluent)',
    'Passionate about hockey, football, chess, weightlifting, and game development',
  ].map((text): Line => ({ t: 'bullet', text })),
  { t: 'blank' },
  { t: 'h2', text: 'My Life' },
  {
    t: 'fold',
    label: 'photos',
    lines: [
      photo('/images/web/capstone.jpg', 'Capstone Design Day', 'With my capstone team on Design Day', 1200, 900),
      photo('/images/web/hockey.jpg', 'Lug photo', 'Playing goal', 1200, 800),
      photo('/images/web/graduation.jpg', "Sister's graduation", "With my dad and brother at my sister's graduation", 700, 933),
      photo(
        '/images/web/design.jpg',
        '1st year design competition',
        'Best Use of Technology award, Western Engineering Junior Design Competition 2023',
        1200,
        900,
      ),
    ],
  },
];

export const educationLines: Line[] = [
  { t: 'h1', text: 'Education' },
  { t: 'meta', text: 'Academic qualifications and achievements.' },
  { t: 'blank' },
  { t: 'h2', text: 'Western University' },
  { t: 'text', text: 'Bachelor of Engineering, Software Engineering' },
  { t: 'status', live: "Dean's Honour List" },
  { t: 'meta', text: 'Sept 2022 - June 2026 · London, ON' },
  { t: 'blank' },
  { t: 'image', src: '/images/web/engineering-building.jpg', alt: 'Western University building', width: 1200, height: 636 },
  { t: 'blank' },
  { t: 'h2', text: 'Relevant Courses' },
  {
    t: 'fold',
    label: 'courses',
    lines: [
      'Algorithms & Data Structures',
      'Operating Systems',
      'DBMS',
      'Networking',
      'Web Technologies',
      'Information Security',
      'Machine Learning',
      'Cloud Computing',
      'Software Testing & Maintenance',
    ].map((text): Line => ({ t: 'bullet', text })),
  },
  { t: 'blank' },
  { t: 'h2', text: 'Extracurricular Activities' },
  {
    t: 'bullet',
    text: 'Western Engineering Auto Pilot (WEAP): C++/ROS2 contributions to the autonomous vehicle path planning pipeline',
  },
];

const steps: [string, string][] = [
  [
    'Context first',
    'Architecture and rules live in project context files, so every agent session starts knowing how the codebase works.',
  ],
  [
    'Design, then generate',
    'I define the schemas, types, and validation, and agents fill in the implementation. At BroadGrain that meant one schema-driven factory instead of 100+ hand-written files. On the capstone I rebuilt the whole backend in 3 days this way.',
  ],
  [
    'Tests decide',
    'Agent output ships only when it passes. On the capstone, a three-role integration harness exercises all 100+ endpoints before anything merges.',
  ],
  [
    'Parallel agents and MCP',
    "I run multiple agents on separate tasks at once, and use MCP tooling for jobs like migrating BroadGrain's legacy production data.",
  ],
  [
    'Build in the room',
    'On Soi Ram I made design changes live on calls with the client, so we tried her ideas on the real site instead of trading mockups.',
  ],
];

export const workflowLines: Line[] = [
  { t: 'h1', text: 'How I Build' },
  { t: 'meta', text: 'AI agents do the typing. I own the design and what ships.' },
  { t: 'blank' },
  ...steps.flatMap(([title, body], i): Line[] => [
    ...(i > 0 ? [{ t: 'blank' } as Line] : []),
    { t: 'h2', text: `${i + 1}. ${title}` },
    { t: 'text', text: body },
  ]),
];
