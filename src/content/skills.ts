export type SkillRef = { role: string } | { project: string } | { href: string; label: string };

export interface SkillGroup {
  name: string;
  skills: { name: string; refs: SkillRef[] }[];
}

const r = (...slugs: string[]): SkillRef[] => slugs.map((role) => ({ role }));
const p = (...slugs: string[]): SkillRef[] => slugs.map((project) => ({ project }));

/** Every technology from the old marquee, grouped by its original category. */
export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages and frameworks',
    skills: [
      { name: 'TypeScript', refs: r('broadgrain', 'gta-capstone', 'javier-navarrete', 'soi-ram') },
      { name: 'JavaScript', refs: p('refluent') },
      { name: 'Java', refs: p('ipayroll', 'minesweeper') },
      { name: 'C# / .NET', refs: p('fracture-protocol', 'cloudcopier') },
      { name: 'Python', refs: [] },
      { name: 'C++', refs: [...p('quizzly'), { href: '/about/education', label: 'education' }] },
      { name: 'SQL', refs: r('broadgrain', 'gta-capstone') },
      { name: 'React', refs: [...r('gta-capstone'), ...p('travelplanner')] },
      { name: 'React Native / Expo', refs: r('broadgrain') },
      { name: 'Next.js', refs: r('gta-capstone', 'javier-navarrete', 'soi-ram') },
      { name: 'Node.js', refs: [...r('broadgrain'), ...p('cloudcopier', 'travelplanner')] },
      { name: 'Express.js', refs: r('broadgrain', 'gta-capstone') },
      { name: 'Tailwind CSS', refs: r('javier-navarrete', 'soi-ram') },
      { name: 'Bash', refs: [] },
      { name: 'Unity', refs: p('fracture-protocol', 'against-the-machines') },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MySQL', refs: r('broadgrain', 'gta-capstone') },
      { name: 'Firestore', refs: p('travelplanner') },
      { name: 'PostgreSQL', refs: [] },
      { name: 'MongoDB', refs: [] },
      { name: 'Prisma', refs: r('gta-capstone') },
    ],
  },
  {
    name: 'Cloud',
    skills: [
      { name: 'Azure / SharePoint', refs: r('broadgrain') },
      { name: 'IIS', refs: [] },
      { name: 'Docker', refs: p('cloudcopier') },
      { name: 'Kubernetes', refs: [] },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', refs: [] },
      { name: 'CI/CD', refs: p('cloudcopier') },
      { name: 'Nginx', refs: [] },
      { name: 'Linux', refs: [] },
      { name: 'Claude Code', refs: [{ href: '/about/workflow', label: 'workflow' }] },
    ],
  },
];

export const skillId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
