'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = [
        {
            src: '/images/hockey.jpg',
            alt: 'Lug photo',
            caption: 'Doing what I love most'
        },
        {
            src: '/images/graduation.jpg',
            alt: 'Sister\'s graduation',
            caption: 'Attending my sister\'s graduation'
        },
        {
            src: '/images/theatre.jpg',
            alt: 'Throwback to theatre days',
            caption: 'Throwback to my theatre days — on stage at Roy Thompson Hall'
        },
        {
            src: '/images/design.jpg',
            alt: '1st year design competition',
            caption: 'Winning best use of technology among the entire 2026 class of engineers'
        },
        {
            src: '/images/purple.jpg',
            alt: 'What purple?',
            caption: 'Whos\'s purple?'
        },
        {
            src: '/images/canoe.jpg',
            alt: 'Canoeing',
            caption: 'Canoeing with my campers'
        }
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <section id="about" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
        <div className="space-y-6">
        <div className="flex items-center space-x-6 mb-8">
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-42 h-42 rounded-full overflow-hidden ring-4 ring-finlayGreen"
        >
        <Image
        src="/images/hero.jpg"
        alt="Profile picture"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        style={{ objectPosition: 'center 30%' }}
        />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-finlayGreen">About Me</h2>
        </div>
        <div className="space-y-4 text-gray-300">
        <p className="text-gray-300 mb-6">
        I&apos;m a software engineering student at Western University on the Dean&apos;s Honour List. Most recently,
        I worked as a Software Developer Intern at BroadGrain Commodities, where I led an end-to-end rebuild
        of their plant operations system.
            </p>
        <p>
        That internship reinforced what I care most about in software development: understanding user needs
        and iterating based on real feedback. Working directly with plant operators taught me that the best
        tools fit naturally into existing workflows rather than forcing people to adapt to technology.
            </p>
        <p>
        I&apos;ve built my technical foundation through coursework in Data Structures & Algorithms, Operating Systems,
        Databases, and Web Technologies. From cross-platform tools like CloudCopier to full-stack web applications
        and Unity games, I take projects through the full lifecycle; concept, development, and deployment; with a
        focus on shipping software people actually want to use.
            </p>
        </div>
        </div>

        <div className="space-y-8">
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-900 p-8 rounded-xl shadow-sm"
        >
        <h3 className="text-lg font-bold text-finlayGreen mb-3">My Life</h3>
        <div className="relative">
        <div className="relative w-full h-[320px] rounded-lg overflow-hidden bg-gray-800">
        <motion.div
        key={currentImageIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
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
        style={{
            objectPosition: galleryImages[currentImageIndex].src.includes('construction.jpg') ? 'center top' : 'center center'
        }}
        />
        </motion.div>
        </div>

        <button
        onClick={previousImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
        >
        <svg className="w-5 h-5 text-finlayGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        </button>

        <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
        >
        <svg className="w-5 h-5 text-finlayGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        </button>

        <div className="mt-3 text-center">
        <p className="text-finlayGreen font-medium text-sm">{galleryImages[currentImageIndex].caption}</p>
        <div className="flex justify-center space-x-2 mt-2">
        {galleryImages.map((_, index) => (
            <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                index === currentImageIndex ? 'bg-finlayGreen w-3' : 'bg-gray-600'
            }`}
            />
        ))}
        </div>
        </div>
        </div>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-900 p-6 rounded-xl shadow-sm"
        >
        <h3 className="text-lg font-bold text-finlayGreen mb-3">Key Highlights</h3>
        <ul className="space-y-2.5">
        <li className="flex items-start">
        <span className="flex-shrink-0 p-0.5 bg-finlayGreen rounded-full mr-2 mt-1.5">
        <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        </span>
        <span className="text-gray-300 text-sm">Software Engineering student at Western University (Dean&apos;s Honour List)</span>
        </li>
        <li className="flex items-start">
        <span className="flex-shrink-0 p-0.5 bg-finlayGreen rounded-full mr-2 mt-1.5">
        <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        </span>
        <span className="text-gray-300 text-sm">Experience in full-stack development, cross-platform apps, and cloud deployment</span>
        </li>
        <li className="flex items-start">
        <span className="flex-shrink-0 p-0.5 bg-finlayGreen rounded-full mr-2 mt-1.5">
        <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        </span>
        <span className="text-gray-300 text-sm">Proficient in TypeScript, React, Node.js, C#, Swift, and multiple databases</span>
        </li>
        <li className="flex items-start">
        <span className="flex-shrink-0 p-0.5 bg-finlayGreen rounded-full mr-2 mt-1.5">
        <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        </span>
        <span className="text-gray-300 text-sm">Passionate about hockey, football, chess, weightlifting, and game development</span>
        </li>
        </ul>
        </motion.div>
        </div>
        </motion.div>
        </div>
        </section>
    );
};

export default About; 
