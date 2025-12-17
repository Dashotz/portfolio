'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/components/link';
import { gsap } from 'gsap';

const projects = [
  { 
    name: 'Learning Management System', 
    description: 'A comprehensive LMS platform for Gov D.M. Camerino with student dashboard, grade tracking, assignments, quizzes, and attendance management. Features include subject management, calendar integration, and real-time activity tracking.',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    codeLink: 'https://github.com/Dashotz/Camerino-Hub',
    demoLink: 'https://camerinohub.helioho.st',
    image: '/project-lms.jpg'
  },
  { 
    name: 'St. Thomas More School', 
    description: 'An academic website developed for St. Thomas More School, featuring essential functions for information sharing, student access, and school updates. Includes a Learning Management System portal with login functionality for students and teachers.',
    tech: ['PHP', 'JavaScript', 'CSS', 'HTML', 'Bootstrap', 'MySQL'],
    codeLink: 'https://github.com/Dashotz',
    demoLink: 'https://stthomasmore.helioho.st',
    image: '/project-school.jpg'
  },
  { 
    name: 'Social Media Dashboard', 
    description: 'A comprehensive, real-time dashboard for managing multiple social media accounts with advanced analytics, post scheduling, and performance insights. Features include multi-platform support (Facebook, Instagram, Twitter), interactive charts, smart post scheduling with live preview, activity tracking, and enterprise-grade security with rate limiting and XSS protection.',
    tech: ['Next.js 14', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'Zod', 'date-fns'],
    codeLink: 'https://github.com/Dashotz/Social_Media_Dashboard',
    demoLink: 'https://dashotz.github.io/Social_Media_Dashboard/',
    image: '/project-dashboard.jpg'
  },
  { 
    name: 'Weather App', 
    description: 'A beautiful weather application with location-based forecasts and interactive maps. Features include 5-day forecasts, nearby cities weather, city search with autocomplete, and interactive Leaflet maps. Built with free APIs (Open-Meteo & Nominatim) - no API keys required!',
    tech: ['React', 'Leaflet', 'React-Leaflet', 'Open-Meteo API', 'Nominatim', 'Tailwind CSS', 'Vite'],
    codeLink: 'https://github.com/Dashotz/weather',
    demoLink: 'https://dashotz.github.io/weather/',
    image: '/project-weather.jpg'
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
                  delay: index * 0.2,
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
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative flex items-start justify-center pt-8 sm:pt-10 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30 mt-2.5">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
            My Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            A collection of projects showcasing my skills and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="project-card group relative border border-white/30 hover:border-white/50 transition-all overflow-hidden flex flex-col"
            >
              <div className="bg-white/5 h-48 flex items-center justify-center flex-shrink-0">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-xs">{project.name}</p>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 border border-white/20 rounded-full text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col gap-2 mt-auto">
                  <Link 
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-white/20 hover:border-white/40 transition-all hover:bg-white/5 rounded-sm text-xs"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Code
                  </Link>
                  <Link 
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-black hover:bg-white/90 transition-all rounded-sm text-xs font-medium"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
