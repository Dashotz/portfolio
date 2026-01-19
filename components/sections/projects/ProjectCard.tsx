'use client';

import { useState, useRef, useCallback } from 'react';
import { Link } from '@/components/link';
import { VideoPlayer } from './VideoPlayer';

export interface ProjectData {
    name: string;
    description: string;
    tech: string[];
    codeLink?: string;
    demoLink: string;
    image: string;
    video?: string;
    category: string;
    images?: string[];
}

interface ProjectCardProps {
    project: ProjectData;
    isMobile: boolean;
    priority?: boolean;
}

export function ProjectCard({ project, isMobile, priority = false }: ProjectCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartRef = useRef<number>(0);

    const handleMouseEnter = () => {
        // Only flip if project has video or we want to show placeholder
        if (!isMobile) {
            // Clear any pending timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
            setIsFlipped(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            // Small delay before flipping back to prevent flickering
            hoverTimeoutRef.current = setTimeout(() => {
                setIsFlipped(false);
            }, 100);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isMobile) {
            // Don't prevent default here to allow scrolling
            touchStartRef.current = Date.now();
            // Clear any pending timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
            setIsFlipped(true);
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (isMobile) {
            // Don't prevent default to allow clicks
            const touchDuration = Date.now() - touchStartRef.current;

            // If it was a quick tap (less than 300ms), keep it flipped
            // Otherwise, flip back after a delay
            if (touchDuration > 300) {
                hoverTimeoutRef.current = setTimeout(() => {
                    setIsFlipped(false);
                }, 2000); // Keep flipped for 2 seconds on mobile
            } else {
                // Immediate flip back if it was a quick tap (maybe accidental?) 
                // Actually the original logic kept it flipped if duration > 300?
                // Original: 
                /*
                   if (touchDuration > 300) {
                       const timeout = setTimeout(() => { ... }, 2000);
                   }
                */
                // This implies quick taps dont trigger the auto-flip-back 2s timer?
                // Or maybe quick taps are handled as distinct clicks?
                // Let's implement a simple toggle or keep the original behavior.
                // Original behavior: "If it was a quick tap... keep it flipped" -> wait, implementation was `if (touchDuration > 300) { timeout... }`. 
                // So long press -> flip back after 2s? 
                // Quick tap -> stays flipped?
                // Let's stick to a simple auto-close for mobile to avoid stuck states.

                hoverTimeoutRef.current = setTimeout(() => {
                    setIsFlipped(false);
                }, 3000);
            }
        }
    };

    return (
        <div
            className="project-card group relative overflow-visible grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center border-t border-b border-white/30 py-6 md:py-8"
            style={{ paddingTop: '24px', paddingBottom: '24px' }}
        >
            <div
                className="relative w-full h-[24rem] xs:h-[28rem] sm:h-[32rem] md:h-[40rem] lg:h-[48rem] xl:h-[56rem] flip-card-container group/image"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                    {/* Front side - Image(s) */}
                    <div className="flip-card-front">
                        {project.images && project.images.length > 1 ? (
                            // Multiple images - show side by side
                            <div className="w-full h-full grid grid-cols-2 gap-0">
                                {project.images.map((img: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${project.name} ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                        loading={priority ? "eager" : "lazy"}
                                        decoding="async"
                                        fetchPriority={priority ? "high" : "low"}
                                    />
                                ))}
                            </div>
                        ) : (
                            // Single image
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                                loading={priority ? "eager" : "lazy"}
                                decoding="async"
                                fetchPriority={priority ? "high" : "low"}
                            />
                        )}
                    </div>

                    {/* Back side - Video or Placeholder */}
                    {project.video ? (
                        <VideoPlayer
                            videoSrc={project.video}
                            projectName={project.name}
                            isFlipped={isFlipped}
                            thumbnail={project.image}
                        />
                    ) : (
                        <div className="flip-card-back flex items-center justify-center bg-black/50">
                            <div className="text-center text-gray-400 px-4">
                                <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm sm:text-base font-medium mb-2">Demo Video</p>
                                <p className="text-xs sm:text-sm text-gray-500">Coming soon</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ marginTop: '12px', marginBottom: '12px' }}>
                    {project.name}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 mb-4 leading-relaxed" style={{ marginTop: '12px', marginBottom: '12px' }}>
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start" style={{ marginTop: '12px', marginBottom: '12px' }}>
                    {project.tech.map((tech) => (
                        <span key={tech} className="text-xs px-3 py-1 border border-white/20 rounded-full text-gray-400">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Hide links for private projects */}
                {project.name !== 'HTML Email Template Builder' && project.name !== 'Drag & Drop Website Builder' && (
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start" style={{ marginTop: '12px', marginBottom: '12px' }}>
                        {project.name !== 'Dental Scheduling System' && project.name !== 'Prism Telegram Bot' && (
                            <Link
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all rounded-sm text-sm"
                            >
                                <span>View Website</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                        )}
                        {project.codeLink && (
                            <Link
                                href={project.codeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all rounded-sm text-sm"
                            >
                                <span>View on GitHub</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
