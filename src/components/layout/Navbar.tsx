'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/#about' },
    { label: 'Education', path: '/#education' },
    { label: 'Experience', path: '/#experience' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/100 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center text-2xl font-bold text-finlayGreen">
              <img src="/favicon.ico" alt="Logo" className="w-6 h-6 mr-2 inline-block" />
              <span>~/</span>
              <Typewriter
                words={["Finlay Cooper"]}
                loop={1}
                cursor
                cursorStyle=">"
                cursorBlinking={true}
                typeSpeed={60}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-finlayGreen hover:text-finlayGreen/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-finlayGreen hover:text-finlayGreen/80 hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block px-3 py-2 rounded-md text-finlayGreen hover:text-finlayGreen/80 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 
