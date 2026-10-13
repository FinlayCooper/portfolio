/**
 * Split windows. The 1px gap shows the WinSeparator color behind the panes,
 * so the divider stays correct whether panes sit side by side or stack.
 */
const Panes = ({ aside, children }: { aside?: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex flex-1 flex-wrap gap-px bg-border md:min-h-0 md:flex-nowrap">
    {aside && <div className="flex min-w-0 flex-[1_1_240px] flex-col bg-bg md:min-h-0">{aside}</div>}
    <div className="flex min-w-0 flex-[999_1_560px] flex-col bg-bg md:min-h-0">{children}</div>
  </div>
);

export default Panes;
