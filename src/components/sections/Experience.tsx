'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TerminalHeading from '@/components/ui/TerminalHeading';

interface ExperienceItem {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    /** Short stack line shown next to the role name. */
    stack?: string;
    companyLogo: string;
    companyUrl?: string;
    screenshot: string;
    /** Systems still running in production today. */
    live?: boolean;
}

const experiences: ExperienceItem[] = [
    {
        title: "Software Developer Intern",
        company: "BroadGrain Commodities",
        location: "Toronto, ON",
        period: "Summer 2025",
        live: true,
        description: [
            "Sole engineer on a compliance platform now live at all 3 of BroadGrain's Canadian plants, cutting compliance reporting time 75% (plus 15% more from refactoring)",
            "Scoped directly with plant managers at each site and shipped iterative releases into daily production use",
            "Built with parallel AI agents working from project context files and schemas defined up front, with every change reviewed before release",
            "Designed a schema-driven backend factory that generates controllers, routes, and validation from one declaration, collapsing 100+ hand-written files into 3",
            "Merged a legacy .NET web app and a separate MAUI mobile app into one React Native app for iOS, Android, and web",
            "Migrated all production data to a normalized schema, using MCP tooling to derive the new schema and map the legacy data",
            "Replaced paper across 8 compliance categories with 10 PDF reports on a four-state approval workflow, auto-delivered to SharePoint via Microsoft Graph"
        ],
        stack: "TypeScript · React Native · Node.js · Express · MySQL · Azure",
        companyLogo: "/images/broadgrain-logo.png",
        companyUrl: "https://www.broadgrain.com",
        screenshot: "/images/broadgrain-screenshot.png"
    },
    {
        title: "Freelance Web Developer",
        company: "Soi Ram",
        location: "soiram.ca",
        period: "June 2026",
        live: true,
        description: [
            "Designed, built, and launched soiram.ca, from brand identity to deployment",
            "Shipped design changes live on calls with the client using AI agents, building her vision in real time instead of trading mockups",
            "Integrated Toast POS direct ordering alongside UberEats and DoorDash, so the restaurant keeps the commission on direct orders",
            "Built a retro 80s brand, data-driven menu, dynamic theming, and a mobile-first, SEO-optimized layout"
        ],
        stack: "Next.js · TypeScript · Tailwind · Toast POS",
        companyLogo: "/images/soi-ram-logo.png",
        companyUrl: "https://soiram.ca",
        screenshot: "/images/soi-ram.jpg"
    },
    {
        title: "Technical Lead — GTA Management System",
        company: "Western University",
        location: "London, ON",
        period: "2025 - 2026",
        live: true,
        description: [
            "Led a 4-person capstone team building the platform that replaced spreadsheet TA hiring in Western's ECE department, now used by 100+ TAs, professors, and committee members",
            "Designed and built the matching algorithm: it scores every student-course pair on skill, preference, reviews, and course history, then fills TA hours slot by slot in waves, with full-year course support",
            "Set the architecture and rebuilt the backend in 3 days with AI agents: 59 files covering auth, validation, error handling, and 14 API modules (now 107 endpoints)",
            "Locked down every module with JWT auth, role- and ownership-based access control, and Zod validation",
            "Wrote the three-role integration harness that exercises every endpoint as a student, professor, and committee member, and gates each change",
            "Built dry-run matching so the committee previews results and tunes weights without ever touching approved assignments",
            "Built the typed API client, reusable dashboard and CRUD components, and the drag-and-drop matching board with a searchable student sidebar",
            "Deployed the server to Railway and the client to Netlify, and wrote the API, authorization, and component docs the rest of the team built on"
        ],
        stack: "Next.js · TypeScript · Express · Prisma · MySQL",
        companyLogo: "/images/western-engineering-logo.jpg",
        companyUrl: "",
        screenshot: "/images/western-engineering-screenshot.png"
    },
    {
        title: "Floater Counsellor",
        company: "YMCA of the GTA",
        location: "Toronto, ON",
        period: "Summer 2024",
        description: [
            "Collaborated with diverse teams to deliver engaging activities and ensure smooth operations",
            "Adapted quickly to new teams and resolved challenges effectively in dynamic environments",
            "Mentored groups of 8-12 children, fostering teamwork and creating a supportive environment",
            "Spoke French to ESL campers"
        ],
        companyLogo: "/images/ymca-logo.png",
        companyUrl: "https://www.ymcagta.org/toronto-island",
        screenshot: "/images/ymca-screenshot.png"
    },
    {
        title: "Detailing and Maintenance Specialist",
        company: "Three Lakes Concierge (Formerly Dockside Detailing)",
        location: "Muskoka, ON",
        period: "Summer 2023",
        description: [
            "Detailed boats, cars, and property interiors; pressure washed decks, furniture, and exteriors; polished windows and screens ensuring top-quality finishes and customer satisfaction",
            "Assisted with marketing efforts by creating and distributing promotional material to expand client reach",
            "Trained new employees on detailing techniques and operational procedures"
        ],
        companyLogo: "/images/three-lakes-logo.png",
        companyUrl: "https://3lake.ca",
        screenshot: "/images/three-lakes-screenshot.png"
    }
];

const LiveBadge = () => (
    <span className="inline-flex items-center gap-1.5 border border-term-amber/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-term-amber">
        <span className="blink">●</span>
        live
    </span>
);

const Experience = () => {
    return (
        <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TerminalHeading
        command="cat experience.md"
        title="Work Experience"
        subtitle="Roles, most recent first."
        />

        <div className="relative">
        {experiences.map((experience, index) => {
            const isLast = index === experiences.length - 1;
            return (
            <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="relative mb-8 pl-6 sm:pl-10"
            >
            {/* `tree` connectors: a reverse-chronological list genuinely is
                tree output, so this labels structure instead of decorating it. */}
            <span
            aria-hidden="true"
            className="absolute left-0 top-7 select-none font-mono text-sm text-term-dim"
            >
            {isLast ? '└─' : '├─'}
            </span>
            {!isLast && (
                <span
                aria-hidden="true"
                className="absolute left-[3px] top-10 bottom-[-2rem] w-px bg-term-dim/40"
                />
            )}

            <div className="border border-term-dim bg-term-panel/80 backdrop-blur-sm p-5 sm:p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
            <div className="flex items-center gap-4 mb-4">
            {(() => {
                const logo = experience.companyLogo ? (
                    <Image
                    src={experience.companyLogo}
                    alt={`${experience.company} logo`}
                    fill
                    className="object-contain"
                    sizes="48px"
                    />
                ) : (
                <div className="w-full h-full bg-term-bg flex items-center justify-center text-finlayGreen font-mono font-bold text-lg">
                {experience.company.charAt(0)}
                </div>
                );
                return experience.companyUrl ? (
                    <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-12 h-12 relative overflow-hidden hover:opacity-80 transition-opacity"
                    >
                    {logo}
                    </a>
                ) : (
                    <div className="block w-12 h-12 relative overflow-hidden">
                    {logo}
                    </div>
                );
            })()}
            <div>
            <h3 className="font-mono text-lg sm:text-xl font-bold text-finlayGreen leading-tight">{experience.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="font-mono text-sm text-term-fg">{experience.company}</p>
            <span className="text-term-dim">·</span>
            <p className="font-mono text-sm text-term-muted">{experience.location}</p>
            </div>
            {experience.stack && (
                <p className="font-mono text-xs text-term-muted mt-1">{experience.stack}</p>
            )}
            </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="font-mono text-xs text-term-muted">{experience.period}</p>
            {experience.live && <LiveBadge />}
            </div>

            <ul className="space-y-2">
            {experience.description.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-term-fg leading-relaxed">
                <span aria-hidden="true" className="font-mono text-term-dim select-none shrink-0">–</span>
                <span>{item}</span>
                </li>
            ))}
            </ul>
            </div>
            {experience.screenshot && (
                experience.companyUrl ? (
                    <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:w-1/3 block relative h-48 overflow-hidden border border-term-dim hover:border-finlayGreen transition-colors duration-200"
                    >
                    <Image
                    src={experience.screenshot}
                    alt={`${experience.company} website screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    </a>
                ) : (
                    <div className="md:w-1/3 block relative h-48 overflow-hidden border border-term-dim bg-[#4F2D7F]">
                    <Image
                    src={experience.screenshot}
                    alt={`${experience.company} logo`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    </div>
                )
            )}
            </div>
            </motion.div>
            );
        })}
        </div>

        {/* View Full Resume Link */}
        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="mt-12 pl-6 sm:pl-10"
        >
        <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-sm text-finlayGreen hover:text-term-amber transition-colors duration-200"
        >
        <span className="text-term-dim">$</span>
        <span>open resume.pdf</span>
        <span aria-hidden="true">→</span>
        </a>
        </motion.div>
        </div>
        </section>
    );
};

export default Experience;
