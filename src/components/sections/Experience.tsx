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
    technologies: string[];
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
            "Owned the platform end to end as its only engineer, from requirements through architecture, build, and release — digitization cut compliance reporting time 75% across 3 plants, with 15% more from refactoring",
            "Drove scoping directly with plant operations managers at each site, translating floor processes and regulatory requirements into system design, then shipped iterative releases into daily production use",
            "Consolidated a legacy .NET web app and a separate MAUI mobile app into a single React Native codebase shipping to iOS, Android, and web",
            "Engineered a schema-driven backend factory (Node.js) that auto-generates CRUD controllers, RESTful routes, and validation from a single declaration — collapsing 100+ hand-written files into 3",
            "Integrated Microsoft Graph API + Azure AD (OAuth 2.0 / OpenID Connect) to automate SharePoint document delivery with token caching, refresh, retries, and exponential backoff",
            "Migrated all production data to a redesigned normalized relational schema after resolving structural mismatches from the original denormalized database",
            "Built 10 PDF reporting services (JSReport, Handlebars, digital signatures, multi-photo support) on a four-state approval workflow, replacing paper-based compliance across 8 categories"
        ],
        technologies: ["TypeScript", "React", "React Native", "Expo", "Node.js", "Express", "MySQL", "SharePoint", "IIS", "pm2", "Docker"],
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
            "Delivered a production-grade restaurant website with dynamic theming, fluid clamp() typography, and data-driven menu rendering — managed the full client lifecycle from design to deployment",
            "Integrated Toast POS ordering alongside UberEats and DoorDash, enabling commission-free direct orders through a unified receipt-style UI",
            "Designed a retro 80s brand identity with custom typography, mobile-first layout, and SEO optimization"
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Toast POS", "SEO"],
        companyLogo: "/images/soi-ram-logo.png",
        companyUrl: "https://soiram.ca",
        screenshot: "/images/soi-ram.jpg"
    },
    {
        title: "Software Engineering Capstone — GTA Management System",
        company: "Western University",
        location: "London, ON",
        period: "2025 - 2026",
        live: true,
        description: [
            "Built and deployed a full-stack platform replacing spreadsheet-based GTA hiring at Western Engineering — now in active department-wide use across 100+ TAs, professors, and committee members",
            "Owned the entire server side: relational schema design, the Prisma data layer, and the full Express REST API — 78 endpoints across 14 modules with JWT auth, role- and ownership-based authorization, and Zod validation",
            "Designed the configurable matching engine that replaced manual allocation — scoring every student–course pair on skill match, stated preference, review ratings, and course history, then packing TA hours at the slot level across 4 seniority-based waves with cross-term consistency for full-year courses",
            "Implemented non-destructive dry-run assignment, letting the committee preview results, tune weights, and re-run without overwriting human-approved decisions, plus drag-and-drop manual reassignment",
            "Built the front end's reusable, fully-typed Axios data-access layer and generic CRUD components shared across 6+ committee screens, plus a browser-side PDF syllabus importer that fuzzy-matches extracted topics against the skills catalog"
        ],
        technologies: ["Next.js", "TypeScript", "Node.js", "Express", "Prisma", "MySQL", "Zod", "REST API"],
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
        technologies: ["Leadership","Adaptability","Working in Teams","Time Management"],
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
        technologies: ["Attention to Detail", "Customer Service", "Employee Training"],
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
            </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="font-mono text-xs text-term-muted">{experience.period}</p>
            {experience.live && <LiveBadge />}
            </div>

            <ul className="space-y-2 mb-5">
            {experience.description.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-term-fg leading-relaxed">
                <span aria-hidden="true" className="font-mono text-term-dim select-none shrink-0">–</span>
                <span>{item}</span>
                </li>
            ))}
            </ul>
            <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
                <span
                key={i}
                className="px-2 py-0.5 font-mono text-xs text-finlayGreen border border-term-dim"
                >
                {tech}
                </span>
            ))}
            </div>
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
