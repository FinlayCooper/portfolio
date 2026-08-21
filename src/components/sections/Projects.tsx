'use client';

import { motion } from 'framer-motion';
import TerminalHeading from '@/components/ui/TerminalHeading';

interface ProjectItem {
  title: string;
  period: string;
  description: string[];
  technologies: string[];
  links?: {
    demo?: string;
    github?: string;
    info?: string;
  };
  image: string;
  link?: string;
}

const projects: ProjectItem[] = [
  {
    title: "Fracture Protocol - Roguelike Arena Shooter",
    period: "April 2026",
    description: [
      "Top-down roguelike arena shooter in Unity/C# — 3 boss encounters, 12 elite enemy types, and a 32-modifier progression system with rarity tiers and diminishing returns",
      "Coroutine-driven boss AI with concurrent behaviors (fire patterns, drone phases, respawn timers), phase transitions at 66%/33% HP, and 0.8s visual telegraphing",
      "Modifier dispatch system using string IDs queried at runtime — dynamic effect composition across 5 rarity tiers without hardcoded branches",
      "Serialized run state across 4 boss scenes (11 fields) for full power allocation persistence; managed Git version control in a 2-person Unity project"
    ],
    technologies: ["Unity", "C#", "Game Design", "Roguelike", "AI Systems", "Git"],
    links: {},
    image: "/images/fracture-protocol.jpg"
  },
  {
    title: "CloudCopier - Cross-Device Clipboard Sync",
    period: "2024 - 2025",
    description: [
      "Cross-platform clipboard sync (Windows–iOS): C# Windows client, Node.js server (API keys, Docker), and Swift/SwiftUI iOS app",
      "Supports all common file formats (text, images, docs, media, etc.), offline queuing, and secure self-hosting",
      "Format normalization, deduplication, and rate-limited polling with retries for reliable cross-platform sync",
      "Set up CI/CD for auto-builds and redeploys to a cloud platform on push"
    ],
    technologies: ["C#", "Node.js", "Swift", "SwiftUI", "Docker", "CI/CD", "REST API"],
    links: {
      github: "https://github.com/FinlayCooper/CloudCopier"
    },
    image: "/images/cloudcopier.jpg"
  },
  {
    title: "Quizzly - Networked Trivia Game",
    period: "2025",
    description: [
      "Multiplayer trivia game built in C++ with a Qt desktop GUI",
      "Client–server architecture over sockets for real-time multiplayer quiz sessions and synchronized game state",
      "Object-oriented design covering question rounds, player connections, and scoring"
    ],
    technologies: ["C++", "Qt", "Network Programming", "Game Development"],
    links: {
      github: "https://github.com/FinlayCooper/Quizzly"
    },
    image: "/images/quizzly.jpg"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TerminalHeading
          command="ls -l ~/projects"
          title="Featured Projects"
          subtitle="Personal builds, outside of client and course work."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="border border-term-dim bg-term-panel/80 backdrop-blur-sm hover:border-finlayGreen/50 transition-colors duration-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-mono text-base sm:text-lg font-bold text-finlayGreen leading-tight">{project.title}</h3>
                  <p className="font-mono text-xs text-term-muted shrink-0 ml-3">{project.period}</p>
                </div>
                <ul className="mb-4 space-y-1.5">
                  {project.description.map((desc, i) => (
                    <li key={i} className="flex gap-2 text-sm text-term-fg leading-relaxed">
                      <span aria-hidden="true" className="font-mono text-term-dim select-none shrink-0">–</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 font-mono text-xs text-finlayGreen border border-term-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-finlayGreen hover:text-term-amber transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                      </svg>
                      <span className="font-mono text-xs">Watch Demo</span>
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-finlayGreen hover:text-term-amber transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-mono text-xs">GitHub</span>
                    </a>
                  )}
                  {project.links?.info && (
                    <a
                      href={project.links.info}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-finlayGreen hover:text-term-amber transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span className="font-mono text-xs">Live Site</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-12"
        >
          <a
            href="/archive"
            className="inline-flex items-center gap-2 font-mono text-sm text-finlayGreen hover:text-term-amber transition-colors duration-200"
          >
            <span className="text-term-dim">$</span>
            <span>ls ~/projects/archive</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
