import { DEFAULT_ROLE } from './experience';
import { DEFAULT_PROJECT } from './projects';

export const roleHref = (slug: string) => (slug === DEFAULT_ROLE ? '/experience' : `/experience/${slug}`);
export const projectHref = (slug: string) => (slug === DEFAULT_PROJECT ? '/projects' : `/projects/${slug}`);
