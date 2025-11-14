'use client';

import { motion } from 'framer-motion';

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
    title: "Quizzly - Online Multiplayer Trivia Game",
    period: "Jan-April 2025",
    description: [
      "Real-time multiplayer trivia game using WebSockets for low-latency synchronous gameplay",
      "C++ backend with concurrent thread management for handling multiple game sessions and player connections simultaneously",
      "Implemented custom networking protocol for reliable message passing and game state synchronization across clients",
      "Collaborative project with 5 contributors managing concurrent development workflows and version control"
    ],
    technologies: ["C++", "WebSockets", "Multithreading", "Concurrency", "Network Programming", "JavaScript"],
    links: {
      github: "https://github.com/FinlayCooper/Quizzly"
    },
    image: "/images/quizzly.jpg"
  },
  {
    title: "Travel Planner - Full-Stack Web App",
    period: "Fall 2024",
    description: [
      "JWT-secured React + Node.js (Firestore) for collaborative planning and scalable storage",
      "Deployed on AWS EC2; tuned for responsiveness and reliability",
      "Implemented modular components and server-side validation, with robust error handling and pagination for core views"
    ],
    technologies: ["React", "Node.js", "Firestore", "JWT", "AWS EC2", "Express"],
    links: {
      github: "https://github.com/FinlayCooper/TravelPlanner"
    },
    image: "/images/travel-planner.jpg"
  },
  {
    title: "Against the Machines - 3D Unity Game",
    period: "Fall 2023",
    description: [
      "Built a three-level Unity/C# action game; implemented player controls, enemy AI, and physics-driven interactions",
      "Delivered in three Agile sprints with weekly stand-ups, demos, and retrospectives"
    ],
    technologies: ["Unity", "C#", "Game Development", "Agile"],
    links: {
      github: "https://github.com/FinlayCooper/Against-the-Machines"
    },
    image: "/images/against-the-machines.jpg"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-finlayGreen mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-300">Some of my recent work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-finlayGreen">{project.title}</h3>
                  <p className="text-sm font-medium text-gray-400">{project.period}</p>
                </div>
                <ul className="text-sm text-gray-300 mb-3 space-y-1 list-disc list-inside">
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-800 text-finlayGreen text-xs rounded-full border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
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
                      className="text-finlayGreen hover:text-finlayGreen/80 transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                      </svg>
                      <span className="text-xs font-medium">Watch Demo</span>
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-finlayGreen hover:text-finlayGreen/80 transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs font-medium">GitHub</span>
                    </a>
                  )}
                  {project.links?.info && (
                    <a
                      href={project.links.info}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-finlayGreen hover:text-finlayGreen/80 transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span className="text-xs font-medium">Live Site</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/archive"
            className="inline-flex items-center text-finlayGreen hover:text-finlayGreen/80 transition-colors duration-200 group"
          >
            <span className="text-lg font-medium">View Full Project Archive</span>
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

export default Projects; 
