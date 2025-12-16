'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const projects = [
  { name: 'Looped', slug: 'looped' },
  { name: 'Ibicash', slug: 'ibicash' },
  { name: 'Prosupps', slug: 'prosupps' },
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
    <section ref={sectionRef} className="relative py-32 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
          A Small Sample, Just Three Builds We Liked for Different Reasons. If You Want the Full Stack (Live Links, Case Studies, the Weird Stuff), Head Over to the Work Page.
        </p>
        
        <div className="flex justify-end mb-16">
          <Link 
            href="/work" 
            className="text-lg hover:text-gray-400 transition-colors"
          >
            All Work→
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="project-card group relative h-64 sm:h-80 md:h-96 border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full flex items-center justify-center p-6 md:p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                  {project.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

