import Dashboard from '@/components/editor/Dashboard'
import HashRedirect from '@/components/shell/HashRedirect'
import Panes from '@/components/shell/Panes'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ path: '/' })

export default function Home() {
  return (
    <Panes>
      <HashRedirect />
      <Dashboard />
    </Panes>
  )
}
