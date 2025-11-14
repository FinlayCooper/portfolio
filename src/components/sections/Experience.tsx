'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceItem {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    technologies: string[];
    companyLogo: string;
    companyUrl: string;
    screenshot: string;
}

const experiences: ExperienceItem[] = [
    {
        title: "Software Developer Intern",
        company: "BroadGrain Commodities",
        location: "Toronto, ON",
        period: "Summer 2025",
        description: [
            "Sole developer for end-to-end rebuild—assessed the legacy prototype and paper workflows, met with operators/managers, prioritized a backlog, and shipped iterative releases from feedback",
                "Built for plant operations: inspection forms, certificates, and reporting with tablet-first data entry, PDF output, and SharePoint delivery",
                    "TypeScript React/React Native (Expo) frontends for tablets and web; streamlined flows and improved UX",
            "Node.js/Express, MySQL, LLMs (MCP): backend (auth, PDF generation, SharePoint), schema design, and automated legacy migration",
            "Deployed on Broadgrain's data centre (pm2/IIS deployment on remote desktop); wrote maintenance scripts/runbooks and trained the new owner for handoff",
                "Impact: 15% faster (refactored); 75% faster (digitized)"
        ],
        technologies: ["TypeScript", "React", "React Native", "Expo", "Node.js", "Express", "MySQL", "SharePoint", "IIS", "pm2", "Docker"],
        companyLogo: "/images/broadgrain-logo.png",
        companyUrl: "https://www.broadgrain.com",
            screenshot: "/images/broadgrain-screenshot.png"
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
            "Assisted with marketing efforts by creating and distributing promitional material to expand client reach",
            "Trained new employees on detailing techniques and operational procedues"
        ],
        technologies: ["Attention to Detail", "Customer Service", "Employee Training"],
        companyLogo: "/images/three-lakes-logo.png",
        companyUrl: "https://www.facebook.com/3lakesmuskoka/",
            screenshot: "/images/three-lakes-screenshot.png"
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
        >
        <h2 className="text-3xl md:text-4xl font-bold text-finlayGreen mb-4">Work Experience</h2>
        <p className="text-lg text-gray-300">My professional journey and contributions</p>
        </motion.div>

        <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-700" />

        {/* Experience items */}
        {experiences.map((experience, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative mb-12"
            >
            {/* Timeline dot */}
            <div className="absolute left-2 w-4 h-4 bg-finlayGreen rounded-full top-8" />

            {/* Content */}
            <div className="ml-12 md:ml-20 p-6 bg-gray-900 rounded-lg shadow-sm flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
            <div className="flex items-center gap-4 mb-4">
            <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-12 h-12 relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            >
            {experience.companyLogo ? (
                <Image
                src={experience.companyLogo}
                alt={`${experience.company} logo`}
                fill
                className="object-contain"
                sizes="48px"
                />
            ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-finlayGreen font-bold text-lg">
            {experience.company.charAt(0)}
            </div>
            )}
            </a>
            <div>
            <h3 className="text-xl font-bold text-finlayGreen">{experience.title}</h3>
            <div className="flex items-center gap-2">
            <p className="text-gray-300">{experience.company}</p>
            <span className="text-gray-600">•</span>
            <p className="text-gray-300">{experience.location}</p>
            </div>
            </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">{experience.period}</p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
            {experience.description.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
            ))}
            </ul>
            <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
                <span
                key={i}
                className="px-3 py-1 bg-gray-800 text-finlayGreen text-sm rounded-full border border-gray-700"
                >
                {tech}
                </span>
            ))}
            </div>
            </div>
            {experience.screenshot && (
                <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-1/3 block relative h-48 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
                >
                <Image
                src={experience.screenshot}
                alt={`${experience.company} website screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                />
                </a>
            )}
            </div>
            </motion.div>
        ))}
        </div>

        {/* View Full Resume Link */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mt-12"
        >
        <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-finlayGreen hover:text-finlayGreen/80 transition-colors duration-200 group"
        >
        <span className="text-lg font-medium">View Full Resume</span>
        <svg
        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        </a>
        </motion.div>
        </div>
        </section>
    );
};

export default Experience; 
