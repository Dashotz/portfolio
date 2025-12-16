'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
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
    <section id="about" className="relative flex items-start justify-center pt-16 pb-2.5 px-6 lg:px-8 xl:px-12 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-bold mb-12 md:mb-16 leading-tight tracking-tight break-words"
        >
          About Me
        </h1>
        
        <div ref={contentRef} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start">
            <div className="flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                Who I Am
              </h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed flex-grow">
                I'm a passionate developer and designer who loves creating digital experiences that are both beautiful and functional. With a strong foundation in modern web technologies, I focus on writing clean, maintainable code.
              </p>
            </div>
            
            <div className="flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                What I Do
              </h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed flex-grow">
                I specialize in building responsive, performant web applications using cutting-edge technologies. My approach combines technical expertise with creative problem-solving to deliver solutions that users love.
              </p>
            </div>
            
            <div className="flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                My Philosophy
              </h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6 flex-grow">
                I believe in continuous learning and staying curious about the ever-evolving world of web development. When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.
              </p>
              <Link 
                href="#contact" 
                className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-white/40 transition-all hover:bg-white/5 rounded-sm text-sm md:text-base font-medium mt-auto"
              >
                Let's Connect →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

