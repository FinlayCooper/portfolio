import { AboutWindow, educationLines } from '@/components/editor/about'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ title: 'Education', path: '/about/education' })

export default function EducationPage() {
  return <AboutWindow file="education.md" lines={educationLines} />
}
