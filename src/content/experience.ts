export interface Role {
  slug: string;
  title: string;
  company: string;
  location: string;
  period: string;
  stack: string[];
  /** Every bullet is shown; the ones after the first 3 sit in an open fold. */
  bullets: string[];
  live?: boolean;
  url?: string;
  screenshot?: { src: string; alt: string; width: number; height: number; bg?: string };
  archived?: boolean;
}

export const roles: Role[] = [
  {
    slug: "broadgrain",
    title: "Software Developer Intern",
    company: "BroadGrain Commodities",
    location: "Toronto, ON",
    period: "Summer 2025",
    live: true,
    bullets: [
      "Sole engineer on a compliance platform now live at all 3 of BroadGrain's Canadian plants, cutting compliance reporting time 75% (plus 15% more from refactoring)",
      "Scoped directly with plant managers at each site and shipped iterative releases into daily production use",
      "Built with parallel AI agents working from project context files and schemas defined up front, with every change reviewed before release",
      "Designed a schema-driven backend factory that generates controllers, routes, and validation from one declaration, collapsing 100+ hand-written files into 3",
      "Merged a legacy .NET web app and a separate MAUI mobile app into one React Native app for iOS, Android, and web",
      "Migrated all production data to a normalized schema, using MCP tooling to derive the new schema and map the legacy data",
      "Replaced paper across 8 compliance categories with 10 PDF reports on a four-state approval workflow, auto-delivered to SharePoint via Microsoft Graph",
    ],
    stack: ["TypeScript", "React Native", "Node.js", "Express", "MySQL", "Azure"],
    url: "https://www.broadgrain.com",
    screenshot: { src: "/images/web/broadgrain-screenshot.jpg", alt: "BroadGrain Commodities website screenshot", width: 1200, height: 675 },
  },
  {
    slug: "javier-navarrete",
    title: "Freelance Web Developer",
    company: "Javier Navarrete",
    location: "javiernavarrete.com",
    period: "September 2026",
    live: true,
    bullets: [
      "Designed, built, and launched javiernavarrete.com for the Oscar- and Grammy-nominated, Emmy-winning composer of Pan's Labyrinth",
      "Built a custom cue player for 13 scores and albums: starting one stops the rest, and nothing downloads until play is pressed",
      "Gave the site a cinematic feel: a once-per-visit title card, film grain, and a pinned painting the content frosts over as it scrolls, each switchable by a flag",
      "Worked through rounds of client feedback from a shared doc, with every page driven by one typed content file shaped for a future admin UI",
      "Moved the legacy Los Amantes opera site under the new one with redirects so old links keep working, and shipped a static export to the client's cPanel host",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://javiernavarrete.com",
    screenshot: { src: "/images/javier-navarrete.jpg", alt: "Javier Navarrete website screenshot", width: 1600, height: 900 },
  },
  {
    slug: "soi-ram",
    title: "Freelance Web Developer",
    company: "Soi Ram",
    location: "soiram.ca",
    period: "June 2026",
    live: true,
    bullets: [
      "Designed, built, and launched soiram.ca, from brand identity to deployment",
      "Shipped design changes live on calls with the client using AI agents, building her vision in real time instead of trading mockups",
      "Integrated Toast POS direct ordering alongside UberEats and DoorDash, so the restaurant keeps the commission on direct orders",
      "Built a retro 80s brand, data-driven menu, dynamic theming, and a mobile-first, SEO-optimized layout",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Toast POS"],
    url: "https://soiram.ca",
    screenshot: { src: "/images/web/soi-ram.jpg", alt: "Soi Ram website screenshot", width: 700, height: 875 },
  },
  {
    slug: "gta-capstone",
    title: "Technical Lead, GTA Management System",
    company: "Western University",
    location: "London, ON",
    period: "2025 - 2026",
    live: true,
    bullets: [
      "Led a 4-person capstone team building the platform that replaced spreadsheet TA hiring in Western's ECE department, now used by 100+ TAs, professors, and committee members",
      "Designed and built the matching algorithm: it scores every student-course pair on skill, preference, reviews, and course history, then fills TA hours slot by slot in waves, with full-year course support",
      "Set the architecture and rebuilt the backend in 3 days with AI agents: 59 files covering auth, validation, error handling, and 14 API modules (now 107 endpoints)",
      "Locked down every module with JWT auth, role- and ownership-based access control, and Zod validation",
      "Wrote the three-role integration harness that exercises every endpoint as a student, professor, and committee member, and gates each change",
      "Built dry-run matching so the committee previews results and tunes weights without ever touching approved assignments",
      "Built the typed API client, reusable dashboard and CRUD components, and the drag-and-drop matching board with a searchable student sidebar",
      "Deployed the server to Railway and the client to Netlify, and wrote the API, authorization, and component docs the rest of the team built on",
    ],
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "MySQL"],
    screenshot: {
      src: "/images/western-engineering-screenshot.png",
      alt: "Western University logo",
      width: 780,
      height: 300,
      bg: "#4F2D7F",
    },
  },
  {
    slug: "ymca",
    archived: true,
    title: "Floater Counsellor",
    company: "YMCA of the GTA",
    location: "Toronto, ON",
    period: "Summer 2024",
    bullets: [
      "Collaborated with diverse teams to deliver engaging activities and ensure smooth operations",
      "Adapted quickly to new teams and resolved challenges effectively in dynamic environments",
      "Mentored groups of 8-12 children, fostering teamwork and creating a supportive environment",
      "Spoke French to ESL campers",
    ],
    stack: [],
    url: "https://www.ymcagta.org/toronto-island",
    screenshot: { src: "/images/ymca-screenshot.png", alt: "YMCA of the GTA website screenshot", width: 500, height: 281 },
  },
  {
    slug: "three-lakes",
    archived: true,
    title: "Detailing and Maintenance Specialist",
    company: "Three Lakes Concierge (Formerly Dockside Detailing)",
    location: "Muskoka, ON",
    period: "Summer 2023",
    bullets: [
      "Detailed boats, cars, and property interiors; pressure washed decks, furniture, and exteriors; polished windows and screens ensuring top-quality finishes and customer satisfaction",
      "Assisted with marketing efforts by creating and distributing promotional material to expand client reach",
      "Trained new employees on detailing techniques and operational procedures",
    ],
    stack: [],
    url: "https://3lake.ca",
    screenshot: {
      src: "/images/web/three-lakes-screenshot.jpg",
      alt: "Three Lakes Concierge (Formerly Dockside Detailing) website screenshot",
      width: 1200,
      height: 900,
    },
  },
];

/** The role shown at /experience. */
export const DEFAULT_ROLE = "broadgrain";
