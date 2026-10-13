import { ProjectsWindow } from '@/components/editor/files'
import { projects, DEFAULT_PROJECT } from '@/content/projects'
import { pageMetadata } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.filter((p) => p.slug !== DEFAULT_PROJECT).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)!
  return pageMetadata({ title: project.title, path: `/projects/${slug}` })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  return <ProjectsWindow slug={slug} />
}
