'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/components/link';
import { gsap } from 'gsap';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect mobile/touch devices for performance optimization
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
    
    // Reduce performance impact on mobile devices
    const baseFontSize = isMobile ? 12 : (window.innerWidth < 640 ? 10 : 14);
    const fontSize = baseFontSize;
    const frameSkip = isMobile ? 2 : 1; // Skip frames on mobile for better performance
    let frameCount = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    // Reduce number of columns on mobile for better performance
    const columnMultiplier = isMobile ? 0.7 : 1;
    const columns = Math.floor((canvas.width / fontSize) * columnMultiplier);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationId: number;
    let isVisible = true;
    let isSectionVisible = true;

    // FPS cap for consistent animation speed across browsers
    const targetFPS = 30; // Cap at 30 FPS for consistent speed
    const frameInterval = 1000 / targetFPS; // milliseconds per frame
    let lastFrameTime = performance.now();

    const draw = (currentTime: number) => {
      if (!isVisible || !isSectionVisible) {
        lastFrameTime = currentTime;
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Cap frame rate - only render if enough time has passed
      const timeSinceLastFrame = currentTime - lastFrameTime;
      if (timeSinceLastFrame < frameInterval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = currentTime;

      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Use simpler fill for mobile performance
      if (isMobile) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      // Simplified gradient on mobile
      if (isMobile) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.6)';
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.9)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0.4)');
        ctx.fillStyle = gradient;
      }

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * (fontSize / columnMultiplier), drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    // Start animation with time tracking
    animationId = requestAnimationFrame((time) => {
      lastFrameTime = time;
      draw(time);
    });

    // Pause animation when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    // Pause animation when section is not in viewport
    let intersectionObserver: IntersectionObserver | null = null;
    
    // Use setTimeout to ensure ref is set after render
    const setupIntersectionObserver = () => {
      const sectionElement = sectionRef.current;
      if (sectionElement && 'IntersectionObserver' in window && !intersectionObserver) {
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isSectionVisible = entry.isIntersecting;
            });
          },
          {
            threshold: 0.1, // Trigger when at least 10% of the section is visible
            rootMargin: '50px', // Start/stop animation slightly before entering/exiting viewport
          }
        );
        intersectionObserver.observe(sectionElement);
      }
    };
    
    // Setup observer after a brief delay to ensure ref is set
    setTimeout(setupIntersectionObserver, 0);

    const handleResize = () => {
      const newFontSize = isMobile ? 12 : (window.innerWidth < 640 ? 10 : 14);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = Math.floor((canvas.width / newFontSize) * columnMultiplier);
      
      // Adjust drops array if columns changed
      if (newColumns !== drops.length) {
        drops.length = 0;
        for (let i = 0; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
      <canvas
        ref={matrixCanvasRef}
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        style={{ zIndex: 0, willChange: 'contents' }}
      />
      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
          <div className="my-4 sm:my-6">
            <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">Welcome to my portfolio</p>
          </div>
          <div className="my-6 sm:my-8">
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight px-2 sm:px-0"
            >
              Hi, I'm <span className="text-white glitch-text" data-text="Francis Cruz">Francis Cruz</span>
            </h1>
          </div>
          
          <div ref={contentRef} className="w-full flex flex-col items-center px-2 sm:px-0">
            <div className="my-4 sm:my-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium text-center">
                Full Stack Developer & Creative Problem Solver
              </p>
            </div>
            
            <div className="my-4 sm:my-6 max-w-3xl px-4 sm:px-0">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed text-center">
                I create beautiful, functional, and user-centered digital experiences. Let's bring your ideas to life with modern web technologies.
              </p>
            </div>
          
          <div 
            className="flex items-center gap-4 sm:gap-6"
            style={{ paddingTop: '5px', paddingBottom: '5px', marginTop: '5px', marginBottom: '5px' }}
          >
            <Link 
              href="https://github.com/Dashotz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              style={{ paddingTop: '5px', paddingBottom: '5px' }}
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link 
              href="https://www.linkedin.com/in/frncszxc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              style={{ paddingTop: '5px', paddingBottom: '5px' }}
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
            <Link 
              href="mailto:frncsgerard02@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              style={{ paddingTop: '5px', paddingBottom: '5px' }}
              aria-label="Email"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
          
          <div className="my-8 md:my-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#projects" 
              className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-white/40 transition-all hover:bg-white/5 rounded-sm text-sm md:text-base"
            >
              View My Work
            </Link>
            <Link 
              href="#contact" 
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-black hover:bg-white/90 transition-all rounded-sm text-sm md:text-base font-medium"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
