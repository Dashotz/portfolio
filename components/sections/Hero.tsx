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
                Full Stack Developer
              </p>
            </div>
            
            <div className="my-4 sm:my-6 max-w-3xl px-4 sm:px-0">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed">
                <span>6 years building websites with</span>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"/></g></svg>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="64"/><path fill="url(#nextjs-a)" d="M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 0 0 6.763-5.209z"/><path fill="url(#nextjs-b)" d="M81.778 38.4h8.533v51.2h-8.533z"/><defs><linearGradient id="nextjs-a" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientTransform="scale(.71111)" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><linearGradient id="nextjs-b" x1="121" x2="120.799" y1="54" y2="106.875" gradientTransform="scale(.71111)" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs></svg>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"/><path fill="#007acc" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"/></svg>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="url(#nodejs-a)" d="M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z"/><path fill="url(#nodejs-b)" d="M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z"/><path fill="url(#nodejs-c)" d="M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z"/><defs><linearGradient id="nodejs-a" x1="34.513" x2="27.157" y1="15.535" y2="30.448" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse"><stop stopColor="#3F873F"/><stop offset=".33" stopColor="#3F8B3D"/><stop offset=".637" stopColor="#3E9638"/><stop offset=".934" stopColor="#3DA92E"/><stop offset="1" stopColor="#3DAE2B"/></linearGradient><linearGradient id="nodejs-b" x1="30.009" x2="50.533" y1="23.359" y2="8.288" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse"><stop offset=".138" stopColor="#3F873F"/><stop offset=".402" stopColor="#52A044"/><stop offset=".713" stopColor="#64B749"/><stop offset=".908" stopColor="#6ABF4B"/></linearGradient><linearGradient id="nodejs-c" x1="21.917" x2="40.555" y1="22.261" y2="22.261" gradientTransform="translate(-129.242 -73.715) scale(6.18523)" gradientUnits="userSpaceOnUse"><stop offset=".092" stopColor="#6ABF4B"/><stop offset=".287" stopColor="#64B749"/><stop offset=".598" stopColor="#52A044"/><stop offset=".862" stopColor="#3F873F"/></linearGradient></defs></svg>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#06B6D4" d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.13 4.59 2.13 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.13 4.59 2.13 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"/></svg>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#FF2D20" d="M27.271.11c-.2.078-5.82 3.28-12.487 7.112-8.078 4.644-12.227 7.09-12.449 7.32-.19.225-.34.482-.438.76-.167.564-.179 82.985-.01 83.578.061.23.26.568.44.754.436.46 48.664 28.19 49.25 28.324.272.065.577.054.88-.03.658-.165 48.76-27.834 49.188-28.286.175-.195.375-.532.44-.761.084-.273.115-4.58.115-13.655v-13.26l11.726-6.735c11.056-6.357 11.733-6.755 12.017-7.191l.29-.47V43.287c0-15.548.03-14.673-.585-15.235-.165-.146-5.798-3.433-12.53-7.31L100.89 13.71h-1.359l-11.963 6.87c-6.586 3.788-12.184 7.027-12.457 7.203-.272.18-.597.512-.73.753l-.242.417-.054 13.455-.048 13.46-9.879 5.69c-5.434 3.124-9.957 5.71-10.053 5.734-.175.049-.187-1.232-.187-25.966V15.293l-.26-.447c-.326-.545 1.136.324-13.544-8.114C27.803-.348 28.098-.2 27.27.11zm11.317 10.307c5.15 2.955 9.364 5.4 9.364 5.43 0 .031-4.516 2.641-10.035 5.813l-10.041 5.765-10.023-5.764c-5.507-3.173-10.02-5.783-10.02-5.814 0-.03 4.505-2.64 10.013-5.805l9.999-5.752.69.376c3.357 1.907 6.708 3.824 10.053 5.751zm71.668 13.261c5.422 3.122 9.908 5.702 9.95 5.744.114.103-19.774 11.535-20.046 11.523-.272-.008-19.915-11.335-19.907-11.473.01-.157 19.773-11.527 19.973-11.496.091.022 4.607 2.59 10.03 5.702zM16.3 25.328l9.558 5.503.055 27.247.05 27.252.233.368c.122.194.352.459.52.581.158.115 5.477 3.146 11.818 6.724l11.52 6.506v11.527c0 6.326-.043 11.516-.097 11.516-.041 0-10-5.699-22.124-12.676L5.793 97.201l-.03-38.966-.019-38.954.49.271c.283.15 4.807 2.748 10.065 5.775zm33.754 19.18v25.109l-.387.253c-.525.332-19.667 11.335-19.732 11.335-.03 0-.054-11.336-.054-25.193l.012-25.182 10-5.752c5.499-3.165 10.034-5.733 10.088-5.714.039.024.073 11.34.073 25.144zm38.15-5.775 10.023 5.763V55.92c0 10.838-.011 11.42-.176 11.357-.107-.041-4.642-2.64-10.083-5.774l-9.91-5.69v-11.42c0-6.287.032-11.424.062-11.424.043 0 4.577 2.592 10.084 5.764zm34.164 5.587c0 6.254-.042 11.412-.084 11.462-.072.115-19.896 11.538-20.022 11.538-.031 0-.062-5.135-.062-11.423v-11.42l10-5.756c5.507-3.16 10.042-5.752 10.084-5.752.053 0 .084 5.105.084 11.351zM95.993 70.933 52.005 96.04 32.056 84.693S76 59.277 76.176 59.343zm2.215 14.827-.034 11.442-22.028 12.676c-12.12 6.976-22.082 12.675-22.132 12.675-.053 0-.095-4.658-.095-11.516V99.51l22.08-12.592c12.132-6.923 22.101-12.59 22.154-12.602.043 0 .062 5.148.054 11.443z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="my-4 sm:my-6 max-w-3xl px-4 sm:px-0">
              <div className="flex flex-col items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed text-center">
                <p>6 years of tech support experience configuring systems, troubleshooting issues, and performing repairs.</p>
              </div>
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
