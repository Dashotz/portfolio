'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/components/link';
import { gsap } from 'gsap';

const projects = [
  { 
    name: 'Learning Management System', 
    description: 'A comprehensive LMS platform for Gov D.M. Camerino with student dashboard, grade tracking, assignments, quizzes, and attendance management. Features include subject management, calendar integration, and real-time activity tracking.',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    codeLink: 'https://github.com/Dashotz/Camerino-Hub',
    demoLink: 'https://camerinohub.helioho.st',
    image: '/project-lms.jpg',
    category: 'website'
  },
  { 
    name: 'St. Thomas More School', 
    description: 'An academic website developed for St. Thomas More School, featuring essential functions for information sharing, student access, and school updates. Includes a Learning Management System portal with login functionality for students and teachers.',
    tech: ['PHP', 'JavaScript', 'CSS', 'HTML', 'Bootstrap', 'MySQL'],
    codeLink: 'https://github.com/Dashotz',
    demoLink: 'https://stthomasmore.helioho.st',
    image: '/project-school.jpg',
    category: 'website'
  },
  { 
    name: 'Social Media Dashboard', 
    description: 'A comprehensive, real-time dashboard for managing multiple social media accounts with advanced analytics, post scheduling, and performance insights. Features include multi-platform support (Facebook, Instagram, Twitter), interactive charts, smart post scheduling with live preview, activity tracking, and enterprise-grade security with rate limiting and XSS protection.',
    tech: ['Next.js 14', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'Zod', 'date-fns'],
    codeLink: 'https://github.com/Dashotz/Social_Media_Dashboard',
    demoLink: 'https://dashotz.github.io/Social_Media_Dashboard/',
    image: '/project-dashboard.jpg',
    category: 'website'
  },
  { 
    name: 'Weather App', 
    description: 'A beautiful weather application with location-based forecasts and interactive maps. Features include 5-day forecasts, nearby cities weather, city search with autocomplete, and interactive Leaflet maps. Built with free APIs (Open-Meteo & Nominatim) - no API keys required!',
    tech: ['React', 'Leaflet', 'React-Leaflet', 'Open-Meteo API', 'Nominatim', 'Tailwind CSS', 'Vite'],
    codeLink: 'https://github.com/Dashotz/weather',
    demoLink: 'https://dashotz.github.io/weather/',
    image: '/project-weather.jpg',
    category: 'website'
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

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
            }
          });
        },
        { threshold: 0.2 }
      );

      const cards = sectionRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => observer.observe(card));

      return () => {
        cards.forEach((card) => observer.unobserve(card));
      };
    }
  }, [activeFilter]);

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

      const updateAnimation = () => {
        const rect = titleRef.current?.getBoundingClientRect();
        if (!rect) return;

        const windowHeight = window.innerHeight;
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

        gsap.set(creativeEl, {
          clipPath: creativeClip,
        });
        
        gsap.set(projectsEl, {
          clipPath: projectsClip,
        });
      };

      const handleScroll = () => {
        window.requestAnimationFrame(updateAnimation);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      updateAnimation(); // Initial check

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
                className={`px-6 py-3 sm:px-12 sm:py-6 md:px-24 md:py-8 lg:px-32 lg:py-10 border transition-all rounded-sm text-base sm:text-lg md:text-xl lg:text-2xl font-medium ${
                  activeFilter === filter
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
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              className="project-card group relative overflow-visible grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center border-t border-b border-white/30 py-6 md:py-8"
              style={{ paddingTop: '24px', paddingBottom: '24px' }}
            >
              <div className="relative w-full h-48 sm:h-64 md:h-80 bg-white/5 border border-white/30 overflow-visible group/image transition-all duration-300 hover:scale-105 hover:border-white/50">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover/image:scale-110">
                  <div className="text-gray-400 text-center transition-colors duration-300 group-hover/image:text-white">
                    <div className="text-6xl mb-2 transition-transform duration-300 group-hover/image:scale-110" style={{ marginTop: '12px', marginBottom: '12px' }}>📱</div>
                    <p className="text-sm" style={{ marginTop: '12px', marginBottom: '12px' }}>{project.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ marginTop: '12px', marginBottom: '12px' }}>
                  {project.name}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-400 mb-4 leading-relaxed" style={{ marginTop: '12px', marginBottom: '12px' }}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start" style={{ marginTop: '12px', marginBottom: '12px' }}>
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1 border border-white/20 rounded-full text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start" style={{ marginTop: '12px', marginBottom: '12px' }}>
                  <Link 
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all rounded-sm text-sm"
                  >
                    <span>View Website</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  {project.codeLink && (
                    <Link 
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all rounded-sm text-sm"
                    >
                      <span>View on GitHub</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
