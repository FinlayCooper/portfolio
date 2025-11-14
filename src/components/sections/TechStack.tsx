'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { IconType } from 'react-icons';

// Import icons from react-icons
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSwift,
  SiUnity,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiGit,
  SiNginx,
  SiDotnet,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';

interface TechItem {
  name: string;
  icon: IconType;
  color: string;
  category: 'language' | 'database' | 'cloud' | 'tool';
}

const techStack: TechItem[] = [
  // Languages & Frameworks
  { name: 'Java', icon: FaJava, color: '#007396', category: 'language' },
  { name: 'C# / .NET', icon: SiDotnet, color: '#512BD4', category: 'language' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'language' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'language' },
  { name: 'Python', icon: SiPython, color: '#3776AB', category: 'language' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'language' },
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'language' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'language' },
  { name: 'Express.js', icon: SiExpress, color: '#F7DF1E', category: 'language' },
  { name: 'Swift', icon: SiSwift, color: '#FA7343', category: 'language' },
  { name: 'Unity', icon: SiUnity, color: '#FFFFFF', category: 'language' },

  // Databases & Cloud
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'database' },
  { name: 'Firestore', icon: SiFirebase, color: '#FFCA28', category: 'database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'database' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'database' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'cloud' },

  // Tools & DevOps
  { name: 'Git', icon: SiGit, color: '#F05032', category: 'tool' },
  { name: 'Nginx', icon: SiNginx, color: '#009639', category: 'tool' },
];

const TechStack = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(scrollRef);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (isInView && !isHovered && !isDragging) {
      controls.start({
        x: [0, -1920],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isInView, controls, isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY * 0.3;
    }
  };

  const renderIcon = (Icon: IconType, color: string) => {
    return <Icon className="w-8 h-8" style={{ color }} />;
  };

  // Create three sets of tech stack for smooth infinite scrolling
  const tripleStack = [...techStack, ...techStack, ...techStack];

  return (
    <>
      <section id="tech-stack" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-finlayGreen text-center mb-8">
            Tech Stack
          </h2>
          <div 
            ref={containerRef}
            className="relative w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing no-scrollbar"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsDragging(false);
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            <motion.div
              ref={scrollRef}
              className="flex gap-12 items-center px-6"
              animate={controls}
              style={{ width: "fit-content" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
            >
              {tripleStack.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center gap-2 min-w-[100px]"
                >
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    {renderIcon(tech.icon, tech.color)}
                  </div>
                  <span className="text-sm text-gray-300 text-center whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <style jsx global>{`  
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default TechStack; 
