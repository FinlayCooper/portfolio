'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TerminalHeading from '@/components/ui/TerminalHeading';

const highlights = [
  "Software Engineering graduate from Western University (Dean's Honour List)",
  'Experience in full-stack development, cross-platform apps, and cloud deployment',
  'TypeScript, React/Next.js, and Node.js/Express, with production React Native, MySQL/PostgreSQL, and Unity/C#',
  'Bilingual — English (native), French (fluent)',
  'Passionate about hockey, football, chess, weightlifting, and game development',
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      src: '/images/capstone.jpg',
      alt: 'Capstone Design Day',
      caption: 'With my capstone team on Design Day',
    },
    {
      src: '/images/hockey.jpg',
      alt: 'Lug photo',
      caption: 'Playing goal',
    },
    {
      src: '/images/graduation.jpg',
      alt: "Sister's graduation",
      caption: "With my dad and brother at my sister's graduation",
    },
    {
      src: '/images/design.jpg',
      alt: '1st year design competition',
      caption:
        'Best Use of Technology award, Western Engineering Junior Design Competition 2023',
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TerminalHeading
          command="cat about.md"
          title="About Me"
          subtitle="Who's behind the prompt."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12"
        >
          <div>
            <div className="flex items-center gap-5 mb-8">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden border border-term-dim">
                <Image
                  src="/images/hero.JPG"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                  sizes="112px"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
              <p className="font-mono text-sm text-term-muted">
                <span className="text-term-dim">$</span> whoami --verbose
              </p>
            </div>

            <div className="space-y-4 text-term-fg leading-relaxed">
              <p>
                I&apos;m a software engineering graduate from Western University
                (Dean&apos;s Honour List) who takes production systems end to
                end, from requirements through deployment. Two of the systems
                I&apos;ve worked on are in daily use right now: a plant
                compliance platform I built as the only engineer at BroadGrain
                Commodities, and the TA-matching platform running in
                Western&apos;s ECE department.
              </p>
              <p>
                That internship reinforced what I care most about in software
                development: understanding user needs and iterating based on
                real feedback. Working directly with plant operators taught me
                that the best tools fit naturally into existing workflows rather
                than forcing people to adapt to technology.
              </p>
              <p>
                I&apos;ve built my technical foundation through coursework in
                Algorithms, Operating Systems, Databases, and Web Technologies.
                From a capstone platform deployed department-wide to freelance
                client work to a full roguelike built from scratch, I take
                projects through the full lifecycle — concept, development, and
                deployment — with a focus on shipping software people actually
                use.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border border-term-dim bg-term-panel/80 backdrop-blur-sm p-6">
              <h3 className="font-mono text-sm font-bold text-finlayGreen mb-4 uppercase tracking-widest">
                My Life
              </h3>
              <div className="relative">
                <div className="relative w-full h-[320px] overflow-hidden border border-term-dim bg-term-bg">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={galleryImages[currentImageIndex].src}
                      alt={galleryImages[currentImageIndex].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={currentImageIndex === 0}
                      quality={85}
                    />
                  </motion.div>
                </div>

                <button
                  onClick={previousImage}
                  aria-label="Previous photo"
                  className="absolute left-2 top-[160px] -translate-y-1/2 border border-term-dim bg-term-bg/85 px-2 py-1 font-mono text-finlayGreen hover:bg-finlayGreen hover:text-term-bg transition-colors duration-150"
                >
                  ←
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Next photo"
                  className="absolute right-2 top-[160px] -translate-y-1/2 border border-term-dim bg-term-bg/85 px-2 py-1 font-mono text-finlayGreen hover:bg-finlayGreen hover:text-term-bg transition-colors duration-150"
                >
                  →
                </button>

                <div className="mt-4">
                  <p className="font-mono text-xs text-term-muted">
                    <span className="text-term-dim">
                      [{String(currentImageIndex + 1).padStart(2, '0')}/
                      {String(galleryImages.length).padStart(2, '0')}]
                    </span>{' '}
                    {galleryImages[currentImageIndex].caption}
                  </p>
                  <div className="flex gap-1.5 mt-3">
                    {galleryImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Show photo ${index + 1}: ${image.alt}`}
                        className={`h-1.5 transition-all duration-200 ${
                          index === currentImageIndex
                            ? 'bg-finlayGreen w-6'
                            : 'bg-term-dim w-3 hover:bg-finlayGreen/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-term-dim bg-term-panel/80 backdrop-blur-sm p-6">
              <h3 className="font-mono text-sm font-bold text-finlayGreen mb-4 uppercase tracking-widest">
                Key Highlights
              </h3>
              <ul className="space-y-2.5">
                {highlights.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2.5 text-sm text-term-fg leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-finlayGreen select-none shrink-0"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
