'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const definitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && definitionRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        definitionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-32 px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-bold mb-12 md:mb-16 leading-tight tracking-tight break-words"
        >
          Developer & Designer
        </h1>
        
        <div ref={definitionRef} className="w-full space-y-6 md:space-y-8 flex flex-col items-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-light">
            Building digital experiences that <span className="font-semibold">matter</span>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-8 md:mt-12 leading-relaxed max-w-3xl">
            I craft beautiful, functional web experiences with a focus on performance, accessibility, and user-centered design. Passionate about clean code, modern technologies, and bringing ideas to life.
          </p>
          
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#projects" 
              className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-white/40 transition-all hover:bg-white/5 rounded-sm text-sm md:text-base"
            >
              View Work→
            </Link>
            <Link 
              href="#contact" 
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-black hover:bg-white/90 transition-all rounded-sm text-sm md:text-base font-medium"
            >
              Get in Touch→
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

