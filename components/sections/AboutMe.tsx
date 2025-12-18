'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AboutMe() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section id="about" className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30">
      <div className="w-full sm:w-[90%] md:w-[80%] mx-auto">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-6 md:gap-12 items-stretch" style={{ paddingTop: '16px', paddingBottom: '16px', minHeight: '100%' }}>
          <div className="md:border-r md:border-white/30 pr-0 md:pr-12 text-center md:text-left" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none tracking-tight"
            >
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>ABOUT</div>
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>ME</div>
            </h1>
          </div>
          
          <div className="hidden md:block w-px bg-white/30" style={{ height: '100%', minHeight: '100%' }}></div>
          
          <div className="flex flex-col text-center md:text-left" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <div className="text-base sm:text-lg text-gray-300 leading-relaxed" style={{ marginTop: '16px', marginBottom: '16px' }}>
              <p style={{ marginTop: '12px', marginBottom: '12px' }}>
                I'm a full-stack developer with 3+ years of experience building production-ready web applications. I work across the stack using React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, and Laravel to deliver fast, scalable, and maintainable solutions.
              </p>
              <p style={{ marginTop: '12px', marginBottom: '12px' }}>
                I focus on clean architecture, performance, and clear communication, and I'm comfortable owning features end-to-end—from implementation to deployment.
              </p>
              <p style={{ marginTop: '12px', marginBottom: '12px' }}>
                If you're looking for a developer who can ship reliably and improve real products, I'd be happy to connect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

