'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const tools = [
  { name: 'Satus', description: 'With powerful graphics, smooth animations, and full CMS support, Satus is the starting point for high-performance, interactive web experiences.', link: '#' },
  { name: 'Lenis', description: 'Smooth scroll library for modern web experiences.', link: '#' },
  { name: 'Hamo', description: 'Creative development tools and utilities.', link: '#' },
  { name: 'Tempus', description: 'Time-based animation and interaction library.', link: '#' },
];

export default function OpenSourceTools() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
            We Build the Tools We Wish Existed.<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Tools We Trust, Now Yours to Use.
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed">
            We Believe in Open-Source Because Good Tools Make Better Work. Our Libraries Are Built for Speed, Reliability, and Ease of Use, Powering Real Projects and Solving Real Problems — and Now They Can Help You Too.
          </p>
          <Link 
            href="/tools" 
            className="text-base md:text-lg hover:text-gray-400 transition-colors"
          >
            All Tools→
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="border border-white/10 p-8 hover:border-white/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">0{index + 1}.</span>
                <h3 className="text-2xl font-bold">{tool.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              <Link 
                href={tool.link}
                className="text-sm hover:text-gray-400 transition-colors inline-flex items-center gap-2"
              >
                {tool.name}↗
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

