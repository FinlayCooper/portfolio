import ContactBuffer from '@/components/editor/ContactBuffer'
import Panes from '@/components/shell/Panes'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ title: 'Contact', path: '/contact' })

export default function ContactPage() {
  return (
    <Panes>
      <ContactBuffer />
    </Panes>
  )
}
