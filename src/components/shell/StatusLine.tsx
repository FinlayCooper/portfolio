/**
 * Neovim's default statusline (laststatus=2, no plugin): file path on the
 * left, ruler and scroll position on the right. One per window.
 */
const StatusLine = ({ file, ruler = '1,1' }: { file: string; ruler?: string }) => (
  <div className="flex justify-between gap-4 bg-surface px-2 text-[13px] leading-6 text-fg-muted">
    <span className="min-w-0 truncate">{file}</span>
    <span className="flex shrink-0 gap-12">
      <span>{ruler}</span>
      <span>All</span>
    </span>
  </div>
);

export default StatusLine;
