import { roles } from '@/content/experience';
import { projects } from '@/content/projects';
import { skillGroups, skillId } from '@/content/skills';
import { projectHref, roleHref } from '@/content/hrefs';

export interface Entry {
  /** What the finder matches and shows, like a path in Telescope. */
  path: string;
  detail: string;
  href: string;
}

export const entries: Entry[] = [
  { path: 'home', detail: 'start screen', href: '/' },
  { path: 'about/about.md', detail: 'About Me', href: '/about' },
  { path: 'about/education.md', detail: 'Western University', href: '/about/education' },
  { path: 'about/workflow.md', detail: 'How I Build', href: '/about/workflow' },
  { path: ':Lazy', detail: 'skills', href: '/about/skills' },
  ...roles.map((r) => ({
    path: `experience/${r.archived ? 'archive/' : ''}${r.slug}.md`,
    detail: `${r.title}, ${r.company}`,
    href: roleHref(r.slug),
  })),
  ...projects.map((p) => ({
    path: `projects/${p.archived ? 'archive/' : ''}${p.slug}.md`,
    detail: p.title,
    href: projectHref(p.slug),
  })),
  ...skillGroups.flatMap((g) =>
    g.skills.map((s) => ({ path: `skills/${s.name}`, detail: g.name, href: `/about/skills#${skillId(s.name)}` })),
  ),
  { path: 'contact.md', detail: 'Get in Touch', href: '/contact' },
  { path: 'resume.pdf', detail: 'resume', href: '/resume.pdf' },
];

/**
 * fzf-style subsequence match. Higher is better; null means no match.
 * Consecutive characters and matches at word starts score extra.
 */
export function score(query: string, text: string): number | null {
  if (!query) return 0;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let s = 0;
  let ti = 0;
  let prev = -2;
  for (const ch of q) {
    if (ch === ' ') continue;
    const at = t.indexOf(ch, ti);
    if (at < 0) return null;
    s += 1;
    if (at === prev + 1) s += 3;
    if (at === 0 || /[/\-_. ]/.test(t[at - 1])) s += 2;
    prev = at;
    ti = at + 1;
  }
  return s - t.length * 0.01;
}

/** Find an entry for `:e name`. */
export const findEntry = (name: string) =>
  entries
    .map((e) => ({ e, s: score(name, `${e.path} ${e.detail}`) }))
    .filter((x) => x.s !== null)
    .sort((a, b) => b.s! - a.s!)[0]?.e;
