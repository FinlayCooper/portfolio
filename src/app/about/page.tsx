import { AboutWindow, aboutLines } from '@/components/editor/about'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ title: 'About', path: '/about' })

export default function AboutPage() {
  return <AboutWindow file="about.md" lines={aboutLines} />
}
