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
      <div className="w-[80%] mx-auto">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-8 md:gap-12 items-start">
          <div className="md:border-r md:border-white/30 pr-0 md:pr-12">
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
            >
              <div>ABOUT</div>
              <div>ME</div>
            </h1>
          </div>
          
          <div className="hidden md:block w-px h-full bg-white/30"></div>
          
          <div className="flex flex-col">
            <div className="text-base sm:text-lg text-gray-300 leading-relaxed space-y-4">
              <p>
                I'm a full-stack developer passionate about building innovative web applications that solve real-world problems. With a strong foundation in modern web technologies, I bring creativity and technical expertise to every project.
              </p>
              <p>
                My journey in web development started with curiosity and has evolved into a career where I continuously learn and adapt to new technologies and best practices.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

