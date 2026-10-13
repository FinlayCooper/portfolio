export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Sort key for netrw's "Sorted by time", newest first. */
  date: string;
  period: string;
  stack: string[];
  links: ProjectLink[];
  /** Every bullet is shown; the ones after the first 3 sit in an open fold. */
  bullets: string[];
  image?: { src: string; alt: string; width: number; height: number };
  archived?: boolean;
}

const github = (repo: string): ProjectLink[] => [
  { label: "GitHub", href: `https://github.com/FinlayCooper/${repo}` },
];

export const projects: Project[] = [
  {
    slug: "fracture-protocol",
    title: "Fracture Protocol - Roguelike Arena Shooter",
    date: "2026-04",
    period: "April 2026",
    bullets: [
      "Two-developer roguelike built with AI agents: we had a full playable version in the first 2 days. I wrote about two-thirds of the C#",
      "Built all 3 boss fights (the Welder, the Triad, and the Overseer) with coroutine-driven AI running concurrent attack patterns and HP-based phase transitions, plus the elite enemy roster",
      "Designed and built 32 modifiers across 5 rarity tiers, with weighted drop tables for elite and boss rewards, per-modifier stack caps, and diminishing returns",
      "Built room-based level progression with doors that lock behind you, hallway lore triggers, damage popups, and modifier icons with tooltips",
      "Hardened the web build: traced a combat bug that only appeared outside the editor to Unity stripping a shader used only from code, added a build-safe shader fallback, and audited every enemy for physics-safe movement to stop wall clipping",
    ],
    stack: ["Unity", "C#"],
    links: [],
  },
  {
    slug: "cloudcopier",
    title: "CloudCopier - Cross-Device Clipboard Sync",
    date: "2025-01",
    period: "2024 - 2025",
    bullets: [
      "Clipboard sync between Windows and iOS: a Windows client, a self-hosted sync server with API keys, and a native iOS app",
      "Supports all common file formats (text, images, docs, media, etc.), offline queuing, and secure self-hosting",
      "Format normalization, deduplication, and rate-limited polling with retries for reliable cross-platform sync",
      "Set up CI/CD for auto-builds and redeploys to a cloud platform on push",
    ],
    stack: ["C#", "Node.js", "Swift", "Docker"],
    links: github("CloudCopier"),
  },
  {
    slug: "quizzly",
    title: "Quizzly - Networked Trivia Game",
    date: "2025-01",
    period: "2025",
    bullets: [
      "Multiplayer trivia game with a desktop GUI",
      "Client–server architecture over sockets for real-time multiplayer quiz sessions and synchronized game state",
      "Object-oriented design covering question rounds, player connections, and scoring",
    ],
    stack: ["C++", "Qt"],
    links: github("Quizzly"),
  },
  ...(
    [
      ["refluent", "ReFluent", "2025", ["CSS", "HTML", "JavaScript", "Web Design", "Responsive"], "ReFluent"],
      ["ipayroll", "iPayroll", "2025", ["Java", "OOP", "Payroll System", "Desktop Application", "Data Management"], "iPayroll"],
      ["travelplanner", "TravelPlanner", "2024", ["React", "Node.js", "Firestore", "JWT", "AWS EC2"], "TravelPlanner"],
      ["minesweeper", "Minesweeper", "2024", ["Java", "Swing", "Game Development", "GUI", "Algorithms"], "Minesweeper"],
      ["against-the-machines", "Against the Machines", "2023", ["Unity", "C#", "3D Game Development", "Agile"], "Against-the-Machines"],
    ] as const
  ).map(
    ([slug, title, year, stack, repo]): Project => ({
      slug,
      title,
      date: year,
      period: year,
      stack: [...stack],
      links: github(repo),
      bullets: [],
      archived: true,
    }),
  ),
];

/** netrw "Sorted by time": newest first. */
export const DEFAULT_PROJECT = [...projects]
  .filter((p) => !p.archived)
  .sort((a, b) => b.date.localeCompare(a.date))[0].slug;
