'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** Each nav item is the command that prints the section it jumps to. */
  const menuItems = [
    { label: 'home', path: '/' },
    { label: 'about', path: '/#about' },
    { label: 'education', path: '/#education' },
    { label: 'experience', path: '/#experience' },
    { label: 'projects', path: '/#projects' },
    { label: 'contact', path: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-term-bg/85 backdrop-blur-sm z-50 border-b border-term-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center font-mono text-base sm:text-lg font-bold text-finlayGreen"
            >
              <img src="/favicon.ico" alt="" className="w-5 h-5 mr-2 inline-block" />
              <span className="text-term-dim">~/</span>
              <Typewriter
                words={['Finlay Cooper']}
                loop={1}
                cursor
                cursorStyle="_"
                cursorBlinking
                typeSpeed={60}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-6 lg:gap-7">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="group font-mono text-sm text-term-muted hover:text-finlayGreen transition-colors"
                >
                  <span className="text-term-dim group-hover:text-finlayGreen transition-colors">
                    ./
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              className="inline-flex items-center justify-center border border-term-dim px-3 py-1.5 font-mono text-sm text-finlayGreen hover:bg-finlayGreen hover:text-term-bg transition-colors duration-150"
            >
              <span className="sr-only">
                {isMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              <span aria-hidden="true">{isMenuOpen ? '[ x ]' : '[ menu ]'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-term-dim bg-term-bg/95 backdrop-blur-sm">
          <div className="px-4 py-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block px-2 py-2 font-mono text-sm text-term-muted hover:text-finlayGreen transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-term-dim">./</span>
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
