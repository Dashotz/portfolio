'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/components/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav') && !target.closest('button')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

        // Use IntersectionObserver for accurate section detection
        const sections = ['home', 'about', 'experience', 'tech-stack', 'projects', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    };

    let visibleSections: Map<string, number> = new Map();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (id && sections.includes(id)) {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        }
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeSection = '';

      visibleSections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeSection = id;
        }
      });

      // If multiple sections are visible, use scroll position to determine which is most in view
      if (visibleSections.size > 1) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let closestSection = '';
        let closestDistance = Infinity;
        
        sections.forEach((sectionId) => {
          const section = document.getElementById(sectionId);
          if (section && visibleSections.has(sectionId)) {
            const sectionTop = section.offsetTop;
            const sectionCenter = sectionTop + section.offsetHeight / 2;
            const distance = Math.abs(scrollPosition - sectionCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = sectionId;
            }
          }
        });
        
        if (closestSection) {
          activeSection = closestSection;
        }
      }

      // Check if we're at the bottom of the page - prioritize contact section
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      if (isNearBottom) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const rect = contactSection.getBoundingClientRect();
          // If contact section is visible (even partially), set it as active
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            activeSection = 'contact';
          }
        }
      }

      // Fallback to scroll position if no section is highly visible
      if (!activeSection || maxRatio < 0.05) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        // Check from bottom to top to get the most recent section
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const sectionBottom = sectionTop + rect.height;
            
            // Check if scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom + 200) {
              activeSection = sections[i];
              break;
            }
          }
        }
      }

      if (activeSection) {
        setActiveHash(`#${activeSection}`);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    // Set initial hash
    setActiveHash(window.location.hash);
    
    // Initial check after a short delay to ensure DOM is ready
    setTimeout(() => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionBottom = sectionTop + rect.height;
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom + 200) {
            setActiveHash(`#${sections[i]}`);
            break;
          }
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#tech-stack', label: 'Tech Stack' },
    { href: '#projects', label: 'Projects' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-white/20' 
          : 'bg-black/80 backdrop-blur-sm border-b border-white/10'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
      }}
    >
      <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-5 flex items-center justify-center md:justify-end">
        <div className="hidden md:flex items-center gap-8 lg:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-all ${
                isActive(link.href)
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden absolute right-4 sm:right-6 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-all z-10 touch-manipulation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
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
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base sm:text-sm font-medium tracking-wide transition-all py-2 text-center ${
                  isActive(link.href)
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
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

