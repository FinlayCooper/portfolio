import Image from 'next/image';
import Buffer from '@/components/shell/Buffer';
import DashboardKeys from './DashboardKeys';

// ANSI Shadow, the figlet font dashboard headers usually use.
const HEADER = [
  "███████╗██╗███╗   ██╗██╗      █████╗ ██╗   ██╗    ",
  "██╔════╝██║████╗  ██║██║     ██╔══██╗╚██╗ ██╔╝    ",
  "█████╗  ██║██╔██╗ ██║██║     ███████║ ╚████╔╝     ",
  "██╔══╝  ██║██║╚██╗██║██║     ██╔══██║  ╚██╔╝      ",
  "██║     ██║██║ ╚████║███████╗██║  ██║   ██║       ",
  "╚═╝     ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝       ",
  " ██████╗ ██████╗  ██████╗ ██████╗ ███████╗██████╗ ",
  "██╔════╝██╔═══██╗██╔═══██╗██╔══██╗██╔════╝██╔══██╗",
  "██║     ██║   ██║██║   ██║██████╔╝█████╗  ██████╔╝",
  "██║     ██║   ██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗",
  "╚██████╗╚██████╔╝╚██████╔╝██║     ███████╗██║  ██║",
  " ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝",
];

/** The start screen: a dashboard buffer, centred the way snacks.nvim draws one. */
const Dashboard = () => (
  <Buffer file="[No Name]" tildes={false}>
    <div className="dashboard mx-auto flex max-w-[78ch] flex-col items-center gap-[1.5em] px-[2ch] py-[2em]">
      <h1 className="sr-only">Finlay Cooper</h1>
      <pre
        aria-hidden="true"
        className="select-none font-mono leading-[1.15] text-heading"
        style={{ fontSize: 'min(1em, calc((100vw - 4ch) / 31))' }}
      >
        {HEADER.join('\n')}
      </pre>

      <div className="flex flex-wrap items-start justify-center gap-[3ch]">
        <Image
          src="/images/profile.jpg"
          alt="Finlay Cooper"
          width={800}
          height={800}
          priority
          className="h-auto w-40 border border-border md:w-[10em]"
        />
        <div className="min-w-0 max-w-[52ch] flex-[1_1_32ch]">
          <p className="text-fg-muted">software engineer</p>
          <p className="mt-[1.7em]">
            Software engineer who ships production systems end to end. I build with AI agents: I set the
            architecture, schemas, and tests, and they build against them. Two platforms I built are running in
            production today.
          </p>
        </div>
      </div>

      <DashboardKeys />
    </div>
  </Buffer>
);

export default Dashboard;
