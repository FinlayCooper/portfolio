import LazyView from '@/components/editor/LazyView'
import { AboutPane } from '@/components/editor/about'
import Panes from '@/components/shell/Panes'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ title: 'Skills', path: '/about/skills' })

export default function SkillsPage() {
  return (
    <Panes aside={<AboutPane />}>
      <LazyView />
    </Panes>
  )
}
