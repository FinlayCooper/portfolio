import { roles, type Role } from '@/content/experience';
import { projects, type Project } from '@/content/projects';
import { projectHref, roleHref } from '@/content/hrefs';
import Panes from '@/components/shell/Panes';
import MdBuffer from './MdBuffer';
import Netrw, { type NetrwFile } from './Netrw';
import { firstOf, type Line } from './lines';

const VISIBLE_BULLETS = 3;

/** First bullets as lines, the rest in an open fold that za can close. */
function bullets(items: string[]): Line[] {
  const head = items.slice(0, VISIBLE_BULLETS).map((text): Line => ({ t: 'bullet', text }));
  const rest = items.slice(VISIBLE_BULLETS).map((text): Line => ({ t: 'bullet', text }));
  return rest.length ? [...head, { t: 'fold', label: 'details', lines: rest }] : head;
}

const domain = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function roleLines(r: Role): Line[] {
  return [
    { t: 'h1', text: r.title },
    { t: 'meta', text: `${r.company} · ${r.location} · ${r.period}` },
    ...(r.live ? [{ t: 'status', live: 'live' } as Line] : []),
    ...(r.url ? [{ t: 'links', links: [{ label: domain(r.url), href: r.url }] } as Line] : []),
    ...(r.stack.length ? [{ t: 'code', items: r.stack } as Line] : []),
    { t: 'blank' },
    ...bullets(r.bullets),
    ...(r.screenshot ? [{ t: 'blank' } as Line, { t: 'image', ...r.screenshot } as Line] : []),
    { t: 'blank' },
    { t: 'links', links: [{ label: 'open resume.pdf', href: '/resume.pdf' }] },
  ];
}

function projectLines(p: Project): Line[] {
  return [
    { t: 'h1', text: p.title },
    { t: 'meta', text: p.period },
    ...(p.links.length ? [{ t: 'links', links: p.links } as Line] : []),
    { t: 'code', items: p.stack },
    ...(p.bullets.length ? [{ t: 'blank' } as Line, ...bullets(p.bullets)] : []),
    ...(p.image ? [{ t: 'blank' } as Line, { t: 'image', ...p.image } as Line] : []),
  ];
}

const roleFile = (r: Role): NetrwFile => ({ name: `${r.slug}.md`, href: roleHref(r.slug), live: !!r.live });
const projectFile = (p: Project): NetrwFile => ({ name: `${p.slug}.md`, href: projectHref(p.slug) });
const byName = (a: { slug: string }, b: { slug: string }) => a.slug.localeCompare(b.slug);
const byTime = (a: Project, b: Project) => b.date.localeCompare(a.date);

export function ExperienceWindow({ slug }: { slug: string }) {
  const role = roles.find((r) => r.slug === slug)!;
  const lines = roleLines(role);
  return (
    <Panes
      aside={
        <Netrw
          path="~/experience"
          sortedBy="name"
          files={roles.filter((r) => !r.archived).sort(byName).map(roleFile)}
          dirs={[{ dir: 'archive', files: roles.filter((r) => r.archived).sort(byName).map(roleFile) }]}
        />
      }
    >
      <MdBuffer key={slug} file={`experience/${slug}.md`} lines={lines} cursor={firstOf(lines, 'bullet')} />
    </Panes>
  );
}

export function ProjectsWindow({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug)!;
  const lines = projectLines(project);
  return (
    <Panes
      aside={
        <Netrw
          path="~/projects"
          sortedBy="time"
          files={projects.filter((p) => !p.archived).sort(byTime).map(projectFile)}
          dirs={[{ dir: 'archive', files: projects.filter((p) => p.archived).sort(byTime).map(projectFile) }]}
        />
      }
    >
      <MdBuffer key={slug} file={`projects/${slug}.md`} lines={lines} cursor={firstOf(lines, 'bullet')} />
    </Panes>
  );
}
