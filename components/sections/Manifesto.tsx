'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
              );
            }
          });
        },
        { threshold: 0.2 }
      );

      const elements = sectionRef.current.querySelectorAll('.fade-in');
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-12 leading-tight">
            We bring brands and interfaces<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>to life with code that runs smooth and scales right.
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 md:mb-12 leading-relaxed">
            We've built for teams who care about craft. If you want engineers who speak design fluently and aren't afraid to push back when it makes the work better, we should probably talk.
          </p>
          
          <a 
            href="/contact" 
            className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-white/40 transition-all hover:bg-white/5 rounded-sm text-sm md:text-base"
          >
            Get in Touch→
          </a>
        </div>
      </div>
    </section>
  );
}

