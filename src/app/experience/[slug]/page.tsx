import { ExperienceWindow } from '@/components/editor/files'
import { roles, DEFAULT_ROLE } from '@/content/experience'
import { pageMetadata } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return roles.filter((r) => r.slug !== DEFAULT_ROLE).map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const role = roles.find((r) => r.slug === slug)!
  return pageMetadata({ title: `${role.title}, ${role.company}`, path: `/experience/${slug}` })
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params
  return <ExperienceWindow slug={slug} />
}
