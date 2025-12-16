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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-12 md:mb-16 text-center leading-tight tracking-tight"
        >
          WhereThingsGetDeveloped
        </h1>
        
        <div ref={definitionRef} className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          <div className="text-xl sm:text-2xl md:text-3xl font-light">
            <span className="font-semibold">[ Darkroom ]</span>, noun
          </div>
          
          <ol className="space-y-3 md:space-y-4 text-base sm:text-lg md:text-xl text-gray-300 ml-6 md:ml-8 list-decimal">
            <li>A Lightproof Room for Developing Photographs.</li>
            <li>A Studio Engineering Creativity into Reality.</li>
          </ol>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-8 md:mt-12 leading-relaxed">
            we skipped the part where everyone pretends it's fine. if it's slow, buggy, or brittle, we fix it. not for the case study, but because that's the job. darkroom's a dev-first studio where design, speed, and system thinking all pull weight.
          </p>
          
          <div className="mt-8 md:mt-12">
            <Link 
              href="/work" 
              className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-white/40 transition-all hover:bg-white/5 rounded-sm text-sm md:text-base"
            >
              Manifesto→
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

