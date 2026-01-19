'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { projects } from './projects/config';
import { ProjectCard } from './projects/ProjectCard';

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Detect mobile device - use matchMedia for better performance
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkMobile();

    // Use matchMedia for better performance (avoids forced reflow)
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMediaChange);
      window.addEventListener('resize', checkMobile);
      return () => {
        mediaQuery.removeListener(handleMediaChange);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: 'power3.out',
                }
              );
              // Unobserve after animation to improve performance
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: '50px' }
      );

      const cards = sectionRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => observer.observe(card));

      return () => {
        cards.forEach((card) => observer.unobserve(card));
        observer.disconnect();
      };
    }
  }, [activeFilter, currentPage]); // Re-run animation when page changes

  useEffect(() => {
    if (titleRef.current) {
      const creativeEl = titleRef.current.querySelector('.creative-text');
      const projectsEl = titleRef.current.querySelector('.projects-text');

      if (!creativeEl || !projectsEl) return;

      // Set initial clip-path for both elements
      // CREATIVE should be fully visible initially
      gsap.set(creativeEl, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
      });
      // PROJECTS should be fully hidden initially
      gsap.set(projectsEl, {
        clipPath: 'inset(0% 100% 0% 0%)',
        opacity: 1,
      });

      // Force initial state
      (creativeEl as HTMLElement).style.clipPath = 'inset(0% 0% 0% 0%)';
      (projectsEl as HTMLElement).style.clipPath = 'inset(0% 100% 0% 0%)';

      // Batch DOM reads to avoid forced reflows
      let rafId: number | null = null;

      const updateAnimation = () => {
        // Batch all DOM reads together
        const rect = titleRef.current?.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (!rect) {
          rafId = null;
          return;
        }

        const elementTop = rect.top;

        // Calculate progress: 0 when element is at top of viewport, 1 when it's scrolled past
        // Use a range where the transition happens over ~400px of scroll
        const scrollRange = 400;
        const startPoint = windowHeight * 0.5; // Start transition when element reaches middle of viewport
        const endPoint = startPoint - scrollRange;

        let progress = 0;
        if (elementTop < startPoint && elementTop > endPoint) {
          // Element is in the transition zone
          progress = (startPoint - elementTop) / scrollRange;
        } else if (elementTop <= endPoint) {
          // Element has scrolled past the transition zone
          progress = 1;
        }

        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // Animate clip-path pixel by pixel
        // CREATIVE: starts fully visible, hides from right to left as progress increases
        // clip-path inset(top right bottom left) - hiding from right means increasing right value
        const creativeRight = progress * 100; // 0% -> 100% (fully hidden)
        const creativeClip = `inset(0% ${creativeRight}% 0% 0%)`;

        // PROJECTS: starts fully hidden (100% right), reveals from left to right as progress increases
        // To reveal from left, we decrease the right value from 100% to 0%
        const projectsRight = 100 - (progress * 100); // 100% -> 0% (fully visible)
        const projectsClip = `inset(0% ${projectsRight}% 0% 0%)`;

        // Batch DOM writes
        gsap.set(creativeEl, {
          clipPath: creativeClip,
        });

        gsap.set(projectsEl, {
          clipPath: projectsClip,
        });

        rafId = null;
      };

      const handleScroll = () => {
        // Throttle scroll events and batch RAF calls
        if (rafId === null) {
          rafId = window.requestAnimationFrame(updateAnimation);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initial call after a brief delay to avoid blocking initial render
      requestAnimationFrame(() => {
        requestAnimationFrame(updateAnimation);
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      };
    }
  }, []);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, startIndex, endIndex]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30">
      <div className="w-full sm:w-[90%] md:w-[80%] mx-auto" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="mb-12 text-center" style={{ marginBottom: '15px', paddingTop: '16px', paddingBottom: '16px' }}>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none tracking-tight relative inline-block"
            style={{ marginTop: '16px', marginBottom: '0', minHeight: '1.2em' }}
          >
            <span className="creative-text absolute inset-0 flex items-center justify-center" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>CREATIVE</span>
            <span className="projects-text inline-block" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>PROJECTS</span>
          </h2>

          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center" style={{ marginTop: '0', marginBottom: '24px' }}>
            {['all', 'website', 'app'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 sm:px-12 sm:py-6 md:px-24 md:py-8 lg:px-32 lg:py-10 border transition-all rounded-sm text-base sm:text-lg md:text-xl lg:text-2xl font-medium ${activeFilter === filter
                  ? 'border-white/50 bg-white/10 text-white'
                  : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                  }`}
                style={{ marginTop: '8px' }}
              >
                {filter === 'all' ? 'All' : filter === 'website' ? 'Websites' : 'Apps'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 w-full" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          {paginatedProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              isMobile={isMobile}
              priority={index < 2} // Prioritize loading logic if needed, simplistically for first 2 items
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 sm:mt-12">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-sm text-sm sm:text-base font-medium transition-all ${currentPage === 1
                ? 'border-white/10 text-gray-600 cursor-not-allowed'
                : 'border-white/30 text-gray-400 hover:border-white/50 hover:text-white'
                }`}
              aria-label="Previous page"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-sm text-sm sm:text-base font-medium transition-all min-w-[40px] sm:min-w-[48px] ${currentPage === page
                      ? 'border-white/50 bg-white/10 text-white'
                      : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                      }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-sm text-sm sm:text-base font-medium transition-all ${currentPage === totalPages
                ? 'border-white/10 text-gray-600 cursor-not-allowed'
                : 'border-white/30 text-gray-400 hover:border-white/50 hover:text-white'
                }`}
              aria-label="Next page"
            >
              Next
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Page Info */}
        {totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
          </div>
        )}
      </div>
    </section>
  );
}
