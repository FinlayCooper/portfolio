'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Project {
  year: string;
  title: string;
  builtWith: string[];
  links: {
    github?: string;
    external?: string;
  };
}

const projects: Project[] = [
  {
    year: '2026',
    title: 'GTA Management System',
    builtWith: ['TypeScript', 'Next.js', 'Node.js', 'Express', 'Prisma', 'MySQL', 'Zod', 'REST API'],
    links: {}
  },
  {
    year: '2026',
    title: 'Fracture Protocol',
    builtWith: ['Unity', 'C#', 'Roguelike', 'Game Design', 'AI Systems'],
    links: {}
  },
  {
    year: '2026',
    title: 'Soi Ram',
    builtWith: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Toast POS', 'SEO'],
    links: {
      external: 'https://soiram.ca'
    }
  },
  {
    year: '2025',
    title: 'CloudCopier',
    builtWith: ['Swift', 'SwiftUI', 'C#', 'Node.js', 'Docker', 'REST API', 'CI/CD'],
    links: {
      github: 'https://github.com/FinlayCooper/CloudCopier'
    }
  },
  {
    year: '2025',
    title: 'Quizzly',
    builtWith: ['C++', 'Game Development', 'Qt', 'Network Programming', 'Trivia'],
    links: {
      github: 'https://github.com/FinlayCooper/Quizzly'
    }
  },
  {
    year: '2025',
    title: 'ReFluent',
    builtWith: ['CSS', 'HTML', 'JavaScript', 'Web Design', 'Responsive'],
    links: {
      github: 'https://github.com/FinlayCooper/ReFluent'
    }
  },
  {
    year: '2025',
    title: 'iPayroll',
    builtWith: ['Java', 'OOP', 'Payroll System', 'Desktop Application', 'Data Management'],
    links: {
      github: 'https://github.com/FinlayCooper/iPayroll'
    }
  },
  {
    year: '2024',
    title: 'TravelPlanner',
    builtWith: ['React', 'Node.js', 'Firestore', 'JWT', 'AWS EC2'],
    links: {
      github: 'https://github.com/FinlayCooper/TravelPlanner'
    }
  },
  {
    year: '2024',
    title: 'Minesweeper',
    builtWith: ['Java', 'Swing', 'Game Development', 'GUI', 'Algorithms'],
    links: {
      github: 'https://github.com/FinlayCooper/Minesweeper'
    }
  },
  {
    year: '2023',
    title: 'Against the Machines',
    builtWith: ['Unity', 'C#', '3D Game Development', 'Agile'],
    links: {
      github: 'https://github.com/FinlayCooper/Against-the-Machines'
    }
  }
];

export default function Archive() {
  return (
    <main className="min-h-screen py-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-finlayGreen hover:text-term-amber transition-colors"
          >
            <span className="text-term-dim">$</span>
            <span>cd ~</span>
          </Link>
        </div>

        <p className="font-mono text-xs sm:text-sm mb-3">
          <span className="text-term-dim">finlay@portfolio</span>
          <span className="text-term-muted">:</span>
          <span className="text-term-dim">~/projects</span>
          <span className="text-term-muted">$ </span>
          <span className="text-finlayGreen">ls -la --sort=time</span>
        </p>
        <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-finlayGreen">All Projects</h1>
        <div className="term-rule mt-5 mb-8" />

        <div className="border border-term-dim bg-term-panel/80 backdrop-blur-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-term-dim/50">
            <thead className="bg-term-bg/60">
              <tr>
                <th scope="col" className="px-6 py-3 text-left font-mono text-xs font-medium text-term-muted uppercase tracking-widest">
                  Year
                </th>
                <th scope="col" className="px-6 py-3 text-left font-mono text-xs font-medium text-term-muted uppercase tracking-widest">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left font-mono text-xs font-medium text-term-muted uppercase tracking-widest hidden md:table-cell">
                  Built with
                </th>
                <th scope="col" className="px-6 py-3 text-left font-mono text-xs font-medium text-term-muted uppercase tracking-widest">
                  Links
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-term-dim/40">
              {projects.map((project, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="hover:bg-finlayGreen/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-term-muted">
                    {project.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono text-sm font-medium text-finlayGreen">{project.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex flex-wrap gap-2">
                      {project.builtWith.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center px-2 py-0.5 font-mono text-xs text-finlayGreen border border-term-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-4">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-finlayGreen hover:text-term-amber transition-colors"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          <span className="font-mono text-xs">GitHub</span>
                        </a>
                      )}
                      {project.links.external && (
                        (project.links.external.includes('youtube.com') ? (
                          <a
                            href={project.links.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-finlayGreen hover:text-term-amber transition-colors"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <polygon points="5 3 19 12 5 21" />
                            </svg>
                            <span className="font-mono text-xs">Demo</span>
                          </a>
                        ) : (
                          <a
                            href={project.links.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-finlayGreen hover:text-term-amber transition-colors"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span className="font-mono text-xs">Live Site</span>
                          </a>
                        ))
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </main>
  );
} 
