import type { Message } from './KeyProvider';
import { findEntry } from './entries';

interface CommandContext {
  push: (href: string) => void;
  help: () => void;
  gotoLine: (n: number) => void;
}

const routes: Record<string, string> = {
  home: '/',
  about: '/about',
  education: '/about/education',
  workflow: '/about/workflow',
  skills: '/about/skills',
  lazy: '/about/skills',
  experience: '/experience',
  projects: '/projects',
  contact: '/contact',
};

/** Run an ex command. Returns a message for the command line, if any. */
export function runCommand(input: string, ctx: CommandContext): Message | null {
  const cmd = input.trim().replace(/^:/, '');
  if (!cmd) return null;
  const [name, ...args] = cmd.split(/\s+/);
  const arg = args.join(' ');

  if (/^\d+$/.test(cmd)) {
    ctx.gotoLine(parseInt(cmd, 10));
    return null;
  }
  if (['q', 'q!', 'qa', 'qa!', 'wq', 'x'].includes(name)) {
    ctx.push('/');
    return null;
  }
  if (name === 'resume' || name === 'cv') {
    window.open('/resume.pdf', '_blank', 'noopener');
    return null;
  }
  if (name === 'h' || name === 'help') {
    ctx.help();
    return null;
  }
  if (name === 'w') {
    const form = document.querySelector('main form');
    if (form instanceof HTMLFormElement) {
      form.requestSubmit();
      return null;
    }
    return { text: 'E382: Cannot write, \'buftype\' option is set', error: true };
  }
  if (name === 'e' || name === 'edit') {
    if (!arg) return { text: 'E32: No file name', error: true };
    const entry = findEntry(arg);
    if (!entry) return { text: `E447: Can't find file "${arg}" in path`, error: true };
    ctx.push(entry.href);
    return null;
  }
  const route = routes[name.toLowerCase()];
  if (route) {
    ctx.push(route);
    return null;
  }
  return { text: `E492: Not an editor command: ${cmd}`, error: true };
}

export const commandNames = ['resume', 'about', 'experience', 'projects', 'contact', 'skills', 'workflow', 'education', 'e', 'q', 'help'];
