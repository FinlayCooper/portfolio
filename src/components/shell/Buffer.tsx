import StatusLine from './StatusLine';

const TILDES = 4;

/** One Neovim window: content, `~` past the end of the buffer, statusline. */
const Buffer = ({
  file,
  ruler,
  tildes = true,
  children,
}: {
  file: string;
  ruler?: string;
  tildes?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex min-w-0 flex-1 flex-col bg-bg md:min-h-0">
    <div className="flex-1 md:overflow-y-auto">
      {children}
      {tildes && (
        <div aria-hidden="true" className="select-none px-2 pb-2 text-line-nr">
          {Array.from({ length: TILDES }, (_, i) => (
            <div key={i}>~</div>
          ))}
        </div>
      )}
    </div>
    <StatusLine file={file} ruler={ruler} />
  </div>
);

export default Buffer;
