'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    // Set initial hash
    setActiveHash(window.location.hash);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return activeHash === href;
    }
    return pathname === href;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-white/20 shadow-lg' 
          : 'bg-black/80 backdrop-blur-sm border-b border-white/10'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
      }}
    >
      <nav className="w-full max-w-6xl mx-auto px-6 lg:px-8 xl:px-12 py-5 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-lg font-medium tracking-tight hover:opacity-80 transition-opacity duration-200"
        >
          Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium tracking-wide transition-all duration-200 ${
                isActive(link.href)
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white" />
              )}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/50 scale-x-0 hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Link>
          ))}
        </div>

        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center text-white hover:opacity-80 transition-opacity duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="relative w-5 h-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 top-1.5' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 top-1.5' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="border-t border-white/10 bg-black/95 backdrop-blur-md"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 xl:px-12 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

