import { ProjectsWindow } from '@/components/editor/files'
import { DEFAULT_PROJECT } from '@/content/projects'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ title: 'Projects', path: '/projects' })

export default function ProjectsPage() {
  return <ProjectsWindow slug={DEFAULT_PROJECT} />
}
