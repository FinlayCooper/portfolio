import { ExperienceWindow } from '@/components/editor/files'
import { DEFAULT_ROLE } from '@/content/experience'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ title: 'Experience', path: '/experience' })

export default function ExperiencePage() {
  return <ExperienceWindow slug={DEFAULT_ROLE} />
}
