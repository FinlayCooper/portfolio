import { AboutWindow, workflowLines } from '@/components/editor/about'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({ title: 'How I build', path: '/about/workflow' })

export default function WorkflowPage() {
  return <AboutWindow file="workflow.md" lines={workflowLines} />
}
