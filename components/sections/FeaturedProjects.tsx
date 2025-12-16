'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const projects = [
  { 
    name: 'Project One', 
    slug: 'project-one',
    description: 'A modern web application built with Next.js and TypeScript',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '#'
  },
  { 
    name: 'Project Two', 
    slug: 'project-two',
    description: 'E-commerce platform with seamless user experience',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  },
  { 
    name: 'Project Three', 
    slug: 'project-three',
    description: 'Creative portfolio website with smooth animations',
    tech: ['GSAP', 'Three.js', 'WebGL'],
    link: '#'
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
    <section id="projects" ref={sectionRef} className="relative flex items-start justify-center pt-8 sm:pt-10 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/10 mt-2.5">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-bold mb-12 md:mb-16 leading-tight tracking-tight break-words">
          Projects
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-8 md:mt-12 mb-12 md:mb-16 text-center md:whitespace-nowrap">
          A selection of projects I've worked on, showcasing my skills in web development, design, and problem-solving.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={project.link}
              className="project-card group relative h-64 sm:h-80 md:h-96 border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 border border-white/20 rounded text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

