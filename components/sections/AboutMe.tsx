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
    <section
      id="about"
      className="relative flex items-start justify-center border-t border-white/30"
      style={{ paddingTop: '48px', paddingBottom: '64px', paddingLeft: '16px', paddingRight: '16px' }}
    >
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
          
          <div className="flex flex-col text-left gap-6" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <div className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed flex flex-col gap-4">
              <p>
                I&apos;m a Technical Support Engineer and Full-Stack Developer based in Imus City. On the IT side, I spend my time assembling and repairing PCs, managing user access in Active Directory, configuring networks and IP addresses, and keeping IT assets and documentation organized.
              </p>
              <p>
                Alongside IT operations, I build full-stack web applications using Laravel, React, Next.js, TypeScript, and Node.js, and I also work on evaluating AI-generated code to help train and improve language models.
              </p>
              <p>
                Whether it&apos;s fixing a network issue, deploying a web app, or solving a tricky technical problem, I enjoy keeping systems running smoothly and building tools that people actually use.
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-t border-white/30"
              style={{ paddingTop: '24px' }}
            >
              <div
                className="flex flex-col gap-2 bg-white/[0.02] border border-white/15 rounded-sm text-left"
                style={{ padding: '16px' }}
              >
                <h3 className="text-base sm:text-lg font-bold text-white">Education</h3>
                <p className="text-sm sm:text-base text-gray-300 font-medium">
                  Bachelor of Science in Information Technology
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Cavite State University - Imus Campus
                </p>
              </div>

              <div
                className="flex flex-col gap-2 bg-white/[0.02] border border-white/15 rounded-sm text-left"
                style={{ padding: '16px' }}
              >
                <h3 className="text-base sm:text-lg font-bold text-white">Certifications &amp; Awards</h3>
                <ul className="text-xs sm:text-sm text-gray-300 flex flex-col gap-2">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>
                      <strong className="text-white">Cum Laude</strong> - Cavite State University - Imus Campus (2025)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>
                      <strong className="text-white">Civil Service Professional Eligibility</strong> - Granted via Honor Graduate Eligibility (P.D. 907) (2026)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

