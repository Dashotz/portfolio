'use client';

import { useEffect, useRef, useState, useCallback, memo, useMemo } from 'react';
import { Link } from '@/components/link';
import { gsap } from 'gsap';

// VideoPlayer component - ready to use when videos are uploaded
// Uncomment video properties in projects array to enable
interface VideoPlayerProps {
  videoSrc: string;
  projectName: string;
  isFlipped: boolean;
  thumbnail?: string;
}

const VideoPlayer = memo(function VideoPlayer({ videoSrc, projectName, isFlipped, thumbnail }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device - use matchMedia for better performance
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    
    // Initial check
    checkMobile();
    
    // Use matchMedia for better performance (avoids forced reflow)
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMediaChange);
      window.addEventListener('resize', checkMobile);
      return () => {
        mediaQuery.removeListener(handleMediaChange);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  // Cleanup function to unload video and free memory
  const unloadVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.src = '';
      videoRef.current.load(); // Unload video from memory
      setIsLoaded(false);
      setIsPlaying(false);
      setIsLoading(false);
      setError(null);
    }
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  }, []);

  // Stop and unload video when flipped back
  useEffect(() => {
    if (!isFlipped) {
      // Unload video to free memory
      unloadVideo();
    }
  }, [isFlipped, unloadVideo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unloadVideo();
    };
  }, [unloadVideo]);

  // Handle video time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [isLoaded]);

  // Auto-hide controls and cursor after 2 seconds of inactivity
  const resetControlsTimeout = useCallback(() => {
    // Clear existing timeouts
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (cursorTimeoutRef.current) {
      clearTimeout(cursorTimeoutRef.current);
    }

    // Show controls and cursor
    setShowControls(true);
    setShowCursor(true);

    // Hide controls after 2 seconds
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);

      // Hide cursor after 2 seconds
      cursorTimeoutRef.current = setTimeout(() => {
        setShowCursor(false);
      }, 2000);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      // Show controls and cursor when not playing
      setShowControls(true);
      setShowCursor(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }
    };
  }, [isPlaying, resetControlsTimeout]);

  const handlePlayVideo = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      
      // Unmute video for audio playback
      video.muted = false;
      setIsMuted(false);
      
      // Play video
      await video.play();
      setIsPlaying(true);
      setIsLoading(false);
      resetControlsTimeout();
    } catch (err: any) {
      console.error('Play error:', err);
      setError(`Unable to play video: ${err.message || 'Please check your browser settings.'}`);
      setIsLoading(false);
    }
  }, [resetControlsTimeout]);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
      setShowCursor(true);
      resetControlsTimeout();
    }
  }, [resetControlsTimeout]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      resetControlsTimeout();
    }
  }, [resetControlsTimeout]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      resetControlsTimeout();
    }
  }, [resetControlsTimeout]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      resetControlsTimeout();
    }
  }, [resetControlsTimeout]);

  const skipForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
      resetControlsTimeout();
    }
  }, [duration, resetControlsTimeout]);

  const skipBackward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
      resetControlsTimeout();
    }
  }, [resetControlsTimeout]);

  const formatTime = useCallback((seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Generate thumbnail from video
  const generateVideoThumbnail = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw the current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert to data URL
      const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
      setVideoThumbnail(thumbnail);
    }
  }, []);

  const handlePlayClick = useCallback(async () => {
    // Prevent multiple simultaneous loads
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!videoRef.current) {
        throw new Error('Video element not found');
      }

      const video = videoRef.current;

      if (!isLoaded) {
        // Validate video source
        if (!videoSrc || videoSrc.trim() === '') {
          throw new Error('Video source is not provided');
        }
        
        // Check if video format is supported
        const videoExtension = videoSrc.split('.').pop()?.toLowerCase();
        const supportedFormats = ['mp4', 'webm', 'ogg'];
        
        if (videoExtension && !supportedFormats.includes(videoExtension)) {
          console.warn(`Video format .${videoExtension} may not be supported. Recommended: MP4 with H.264 codec.`);
        }
        
        // Set video source and load
        video.src = videoSrc;
        video.load();
        
        console.log('Loading video:', videoSrc, {
          format: videoExtension,
          fullPath: video.src,
        });
        
        // Wait for video to be ready
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error('Video element not found'));
            return;
          }

          const handleCanPlay = () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
            video.removeEventListener('error', handleError);
            if (loadingTimeoutRef.current) {
              clearTimeout(loadingTimeoutRef.current);
              loadingTimeoutRef.current = null;
            }
            resolve();
          };

          const handleCanPlayThrough = () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
            video.removeEventListener('error', handleError);
            if (loadingTimeoutRef.current) {
              clearTimeout(loadingTimeoutRef.current);
              loadingTimeoutRef.current = null;
            }
            resolve();
          };

          const handleError = (e: Event) => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
            video.removeEventListener('error', handleError);
            if (loadingTimeoutRef.current) {
              clearTimeout(loadingTimeoutRef.current);
              loadingTimeoutRef.current = null;
            }
            const videoEl = e.target as HTMLVideoElement;
            const error = videoEl?.error;
            
            console.error('Video loading error:', {
              src: videoEl?.src,
              errorCode: error?.code,
              errorMessage: error?.message,
              networkState: videoEl?.networkState,
              readyState: videoEl?.readyState,
            });
            
            let errorMsg = `Failed to load video: ${videoSrc}`;
            if (error) {
              switch (error.code) {
                case error.MEDIA_ERR_ABORTED:
                  errorMsg = `Video loading was aborted. File: ${videoSrc}`;
                  break;
                case error.MEDIA_ERR_NETWORK:
                  errorMsg = `Network error while loading video. Please check your connection. File: ${videoSrc}`;
                  break;
                case error.MEDIA_ERR_DECODE:
                  errorMsg = `Video decoding error. The file may be corrupted or use an unsupported codec. File: ${videoSrc}`;
                  break;
                case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                  errorMsg = `Video format not supported by your browser. The file "${videoSrc}" may be missing, use an unsupported codec, or have CORS restrictions. Please ensure the video file exists and is in a supported format (MP4 with H.264 codec recommended).`;
                  break;
                default:
                  errorMsg = `Video error (code: ${error.code}). File: ${videoSrc}`;
              }
            } else {
              // No error object - could be file not found, CORS, etc.
              if (videoEl?.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
                errorMsg = `Video file not found: ${videoSrc}. Please ensure the file exists in the public/videos directory.`;
              } else if (videoEl?.networkState === HTMLMediaElement.NETWORK_EMPTY) {
                errorMsg = `Video source is empty: ${videoSrc}`;
              } else {
                errorMsg = `Failed to load video: ${videoSrc}. This could be due to CORS restrictions, file not found, or unsupported format.`;
              }
            }
            reject(new Error(errorMsg));
          };

          video.addEventListener('canplay', handleCanPlay, { once: true });
          video.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
          video.addEventListener('error', handleError, { once: true });

          // Timeout after 15 seconds
          loadingTimeoutRef.current = setTimeout(() => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
            video.removeEventListener('error', handleError);
            reject(new Error('Video loading timeout'));
          }, 15000);
        });

        setIsLoaded(true);
      }
      
      // Small delay to ensure video is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Play video (without forcing fullscreen)
      await handlePlayVideo();
    } catch (err: any) {
      console.error('Error loading/playing video:', err);
      setError(err.message || 'Failed to load video. Please try again.');
      setIsLoading(false);
      setIsLoaded(false);
    }
  }, [isLoaded, isLoading, videoSrc, handlePlayVideo]);

  const handleStop = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setShowControls(true);
    }
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="flip-card-back relative overflow-hidden" 
      style={{ 
        touchAction: 'manipulation',
        cursor: isPlaying && !showCursor ? 'none' : 'default'
      }}
      onMouseMove={(e) => {
        // Reset timeout when mouse moves over container
        if (isPlaying) {
          resetControlsTimeout();
        }
      }}
    >
      {/* Thumbnail background - use video thumbnail if available, otherwise fallback to prop */}
      {(videoThumbnail || thumbnail) && !isLoaded && (
        <div className="absolute inset-0 z-0">
          <img
            src={videoThumbnail || thumbnail}
            alt={`${projectName} thumbnail`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-30">
          <div className="text-center px-4 max-w-md">
            <p className="text-red-400 mb-2 text-sm">{error}</p>
            {error.includes('not found') && (
              <p className="text-gray-400 text-xs mb-3">
                Make sure the video file exists in the <code className="bg-black/50 px-1 rounded">public/videos</code> directory.
              </p>
            )}
            {error.includes('format not supported') && (
              <p className="text-gray-400 text-xs mb-3">
                Recommended: Use MP4 files with H.264 codec for best browser compatibility.
              </p>
            )}
            <button
              onClick={() => {
                setError(null);
                setIsLoading(false);
              }}
              className="px-4 py-2 border border-white/30 hover:bg-white/10 transition-all rounded-sm text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="text-white text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Play button overlay */}
      {!isLoading && !error && (!isLoaded || !isPlaying) && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group/play transition-opacity touch-none" 
          onClick={handlePlayClick}
          onTouchStart={(e) => {
            // Prevent double-tap zoom on mobile
            e.preventDefault();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handlePlayClick();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePlayClick();
            }
          }}
          aria-label={`Play ${projectName} video`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className={`${isMobile ? 'w-24 h-24' : 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'} rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center transition-all active:bg-white/30 active:border-white/70 active:scale-110 group-hover/play:bg-white/30 group-hover/play:border-white/70 group-hover/play:scale-110 shadow-lg`}>
              {isLoaded ? (
                <svg className={`${isMobile ? 'w-14 h-14' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'} text-white ml-1`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className={`${isMobile ? 'w-14 h-14' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'} text-white ml-1`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
            <p className="text-white text-sm sm:text-base font-medium text-center px-4 drop-shadow-lg">
              {isLoaded ? 'Tap to play' : 'Tap to play video'}
            </p>
          </div>
        </div>
      )}
      
      {/* Custom Video Controls */}
      {isLoaded && isPlaying && (
        <div 
          className={`absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'} ${showCursor ? '' : 'cursor-none'}`}
          style={{ cursor: showCursor ? 'default' : 'none' }}
          onMouseMove={(e) => {
            // Reset timeout on mouse move
            resetControlsTimeout();
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            // Reset timeout on touch
            resetControlsTimeout();
            e.stopPropagation();
          }}
          onWheel={(e) => {
            // Reset timeout on scroll
            resetControlsTimeout();
            // Allow scroll to pass through
            e.stopPropagation();
          }}
        >
          {/* Progress Bar */}
          <div className="px-2 sm:px-4 pb-1.5 sm:pb-2 pointer-events-auto">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 sm:h-1 md:h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
                style={{
                  background: duration > 0 
                    ? `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                    : 'rgba(255,255,255,0.2)'
                }}
              />
              <span className="text-white text-[10px] sm:text-xs min-w-[50px] sm:min-w-[60px] text-right">
                {formatTime(currentTime)} / {duration ? formatTime(duration) : '0:00'}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="px-2 sm:px-4 pb-2 sm:pb-4 flex items-center gap-1.5 sm:gap-2 md:gap-3 pointer-events-auto">
            {/* Play/Pause */}
            <button
              onClick={isPlaying ? handlePause : handlePlayVideo}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/30 flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all touch-manipulation"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip Backward */}
            <button
              onClick={skipBackward}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/30 flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all touch-manipulation"
              aria-label="Skip backward 10 seconds"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16" />
              </svg>
            </button>

            {/* Skip Forward */}
            <button
              onClick={skipForward}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/30 flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all touch-manipulation"
              aria-label="Skip forward 10 seconds"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 4v16" />
              </svg>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={toggleMute}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/60 border border-white/30 flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all touch-manipulation"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 sm:w-24 md:w-32 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Video element - always render but hidden until loaded */}
      <video
        ref={videoRef}
        className={`w-full h-full object-contain bg-black ${!isLoaded ? 'hidden' : ''}`}
        style={{ cursor: isPlaying && !showCursor ? 'none' : 'default' }}
        loop
        muted={false}
        playsInline={true}
        controls={false}
        onEnded={handleVideoEnd}
        onMouseMove={(e) => {
          // Reset timeout when mouse moves over video
          if (isPlaying) {
            resetControlsTimeout();
          }
          // Allow scroll to pass through video element to page
          e.stopPropagation();
        }}
        onWheel={(e) => {
          // Reset timeout on scroll
          if (isPlaying) {
            resetControlsTimeout();
          }
          // Allow scroll to pass through video element to page
          e.stopPropagation();
        }}
        onLoadedData={() => {
          console.log('Video loaded successfully');
          // Generate thumbnail if not already generated
          if (!videoThumbnail && videoRef.current) {
            const video = videoRef.current;
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              generateVideoThumbnail();
            }
          }
        }}
        onCanPlay={() => {
          console.log('Video can play');
        }}
        onLoadStart={() => {
          console.log('Video load started');
        }}
        onLoadedMetadata={() => {
          // Generate thumbnail when metadata is loaded
          if (videoRef.current && !videoThumbnail) {
            const video = videoRef.current;
            // Seek to 1 second to get a better frame (not black screen)
            if (video.duration > 1) {
              video.currentTime = 1;
            } else if (video.duration > 0) {
              // If video is shorter than 1 second, use middle frame
              video.currentTime = video.duration / 2;
            }
          }
        }}
        onSeeked={() => {
          // Generate thumbnail after seeking
          if (!videoThumbnail && videoRef.current) {
            generateVideoThumbnail();
            // Reset to beginning
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
          }
        }}
        onError={(e) => {
          const video = e.currentTarget as HTMLVideoElement;
          const error = video?.error;
          
          // Only show error if video was actually trying to load
          if (!isLoaded && !isLoading) {
            return; // Don't show error if video wasn't being loaded
          }

          let errorMessage = 'Failed to play video';
          
          if (error) {
            console.error('Video error details:', {
              code: error.code,
              message: error.message || 'No error message',
              MEDIA_ERR_ABORTED: error.MEDIA_ERR_ABORTED,
              MEDIA_ERR_NETWORK: error.MEDIA_ERR_NETWORK,
              MEDIA_ERR_DECODE: error.MEDIA_ERR_DECODE,
              MEDIA_ERR_SRC_NOT_SUPPORTED: error.MEDIA_ERR_SRC_NOT_SUPPORTED,
            });

            switch (error.code) {
              case error.MEDIA_ERR_ABORTED:
                errorMessage = 'Video loading was aborted';
                break;
              case error.MEDIA_ERR_NETWORK:
                errorMessage = 'Network error while loading video. Please check your connection.';
                break;
              case error.MEDIA_ERR_DECODE:
                errorMessage = 'Video decoding error. The file may be corrupted.';
                break;
              case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMessage = 'Video format not supported by your browser.';
                break;
              default:
                errorMessage = `Video error (code: ${error.code})`;
            }
          } else {
            // Error object is null - could be CORS issue, file not found, etc.
            console.error('Video error (no error object):', {
              src: video?.src,
              networkState: video?.networkState,
              readyState: video?.readyState,
            });
            
            // Check network state for more info
            if (video) {
              switch (video.networkState) {
                case HTMLMediaElement.NETWORK_NO_SOURCE:
                  errorMessage = 'Video source not found. Please check the file path.';
                  break;
                case HTMLMediaElement.NETWORK_EMPTY:
                  errorMessage = 'Video source is empty.';
                  break;
                case HTMLMediaElement.NETWORK_IDLE:
                  // This might not be an error, video might just be idle
                  if (video.readyState === HTMLMediaElement.HAVE_NOTHING) {
                    errorMessage = 'Video failed to load.';
                  } else {
                    return; // Not really an error
                  }
                  break;
                default:
                  errorMessage = 'Video failed to load. Please check the file.';
              }
            }
          }
          
          setError(errorMessage);
          setIsLoading(false);
          setIsPlaying(false);
        }}
        preload="none"
        {...(isMobile && {
          // Mobile-specific attributes for better compatibility
          'webkit-playsinline': isMobile && !isPlaying ? 'true' : undefined,
          'x5-video-player-type': 'h5',
          'x5-video-orientation': 'portrait',
        })}
      />
    </div>
  );
});

const projects = [
  { 
    name: 'HTML Email Template Builder', 
    description: 'A comprehensive email template builder for creating, testing, and managing professional email campaigns. Features include drag-and-drop visual builder, Monaco code editor with live preview, multi-client testing across 40+ email clients, AI-powered template generation, real-time analytics, ESP integrations, and automated spam and accessibility testing.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'React DnD', 'Lucide React'],
    codeLink: 'https://github.com/Dashotz',
    demoLink: '#',
    image: '/images/email-builder.jpg',
    // video: '/videos/email-builder.mp4', // Uncomment when video is uploaded
    category: 'app'
  },
  { 
    name: 'Drag & Drop Website Builder', 
    description: 'A modern drag-and-drop website builder inspired by WordPress and Shopify. Features include intuitive visual editor, pre-built component library, custom code injection, real-time preview, responsive design, save and export functionality, extensible plugin system, and built-in SEO optimization tools.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', '@dnd-kit', 'Lucide React'],
    codeLink: 'https://github.com/Dashotz',
    demoLink: '#',
    image: '/images/website-builder.jpg',
    // video: '/videos/website-builder.mp4', // Uncomment when video is uploaded
    category: 'app'
  },
  { 
    name: 'Dental Scheduling System', 
    description: 'A comprehensive web-based dental clinic management system designed to streamline patient management, appointment scheduling, and clinic operations. Features include patient profiles with dental records and teeth chart tracking, interactive calendar interface, treatment plan creation with quote/invoice generation, multi-role system with role-based access control, and administrative tools with multi-tenant support and comprehensive reporting.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'jQuery', 'JavaScript'],
    codeLink: 'https://github.com/Dashotz',
    demoLink: '#',
    image: '/images/dental-schedule.jpg',
    // video: '/videos/dental-schedule.mp4', // Uncomment when video is uploaded
    category: 'app'
  },
  { 
    name: 'Weather App', 
    description: 'A beautiful weather application with location-based forecasts and interactive maps. Features include 5-day forecasts, nearby cities weather, city search with autocomplete, and interactive Leaflet maps. Built with free APIs (Open-Meteo & Nominatim) - no API keys required!',
    tech: ['React', 'Leaflet', 'React-Leaflet', 'Open-Meteo API', 'Nominatim', 'Tailwind CSS', 'Vite'],
    codeLink: 'https://github.com/Dashotz/weather',
    demoLink: 'https://dashotz.github.io/weather/',
    image: '/images/weather.png',
    // video: '/videos/weather.mp4', // Uncomment when video is uploaded
    category: 'website'
  },
  { 
    name: 'Social Media Dashboard', 
    description: 'A comprehensive, real-time dashboard for managing multiple social media accounts with advanced analytics, post scheduling, and performance insights. Features include multi-platform support (Facebook, Instagram, Twitter), interactive charts, smart post scheduling with live preview, activity tracking, and enterprise-grade security with rate limiting and XSS protection.',
    tech: ['Next.js 14', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'Zod', 'date-fns'],
    codeLink: 'https://github.com/Dashotz/Social_Media_Dashboard',
    demoLink: 'https://dashotz.github.io/Social_Media_Dashboard/',
    image: '/images/socialmedia.jpg',
    // video: '/videos/socialmedia.mp4', // Uncomment when video is uploaded
    category: 'website'
  },
  { 
    name: 'Learning Management System', 
    description: 'A comprehensive LMS platform for Gov D.M. Camerino with student dashboard, grade tracking, assignments, quizzes, and attendance management. Features include subject management, calendar integration, and real-time activity tracking.',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    codeLink: 'https://github.com/Dashotz/Camerino-Hub',
    demoLink: 'https://camerinohub.helioho.st',
    image: '/images/camerino.jpg',
    // video: '/videos/camerino.mp4', // Uncomment when video is uploaded
    category: 'website'
  },
  { 
    name: 'St. Thomas More School', 
    description: 'An academic website developed for St. Thomas More School, featuring essential functions for information sharing, student access, and school updates. Includes a Learning Management System portal with login functionality for students and teachers.',
    tech: ['PHP', 'JavaScript', 'CSS', 'HTML', 'Bootstrap', 'MySQL'],
    codeLink: 'https://github.com/Dashotz',
    demoLink: 'https://stthomasmore.helioho.st',
    image: '/images/sttma.jpg',
    // video: '/videos/sttma.mp4', // Uncomment when video is uploaded
    category: 'website'
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const hoverTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const touchStartRef = useRef<Map<string, number>>(new Map());
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Detect mobile device - use matchMedia for better performance
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    
    // Initial check
    checkMobile();
    
    // Use matchMedia for better performance (avoids forced reflow)
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMediaChange);
      window.addEventListener('resize', checkMobile);
      return () => {
        mediaQuery.removeListener(handleMediaChange);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 50 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: 'power3.out',
                }
              );
              // Unobserve after animation to improve performance
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: '50px' }
      );

      const cards = sectionRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => observer.observe(card));

      return () => {
        cards.forEach((card) => observer.unobserve(card));
        observer.disconnect();
      };
    }
  }, [activeFilter]);

  // Cleanup timeouts and touch refs on unmount
  useEffect(() => {
    return () => {
      hoverTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
      hoverTimeoutRef.current.clear();
      touchStartRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      const creativeEl = titleRef.current.querySelector('.creative-text');
      const projectsEl = titleRef.current.querySelector('.projects-text');
      
      if (!creativeEl || !projectsEl) return;

      // Set initial clip-path for both elements
      // CREATIVE should be fully visible initially
      gsap.set(creativeEl, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
      });
      // PROJECTS should be fully hidden initially
      gsap.set(projectsEl, {
        clipPath: 'inset(0% 100% 0% 0%)',
        opacity: 1,
      });
      
      // Force initial state
      (creativeEl as HTMLElement).style.clipPath = 'inset(0% 0% 0% 0%)';
      (projectsEl as HTMLElement).style.clipPath = 'inset(0% 100% 0% 0%)';

      // Batch DOM reads to avoid forced reflows
      let rafId: number | null = null;
      let lastScrollY = window.scrollY;
      
      const updateAnimation = () => {
        // Batch all DOM reads together
        const rect = titleRef.current?.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (!rect) {
          rafId = null;
          return;
        }

        const elementTop = rect.top;
        
        // Calculate progress: 0 when element is at top of viewport, 1 when it's scrolled past
        // Use a range where the transition happens over ~400px of scroll
        const scrollRange = 400;
        const startPoint = windowHeight * 0.5; // Start transition when element reaches middle of viewport
        const endPoint = startPoint - scrollRange;
        
        let progress = 0;
        if (elementTop < startPoint && elementTop > endPoint) {
          // Element is in the transition zone
          progress = (startPoint - elementTop) / scrollRange;
        } else if (elementTop <= endPoint) {
          // Element has scrolled past the transition zone
          progress = 1;
        }
        
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));

        // Animate clip-path pixel by pixel
        // CREATIVE: starts fully visible, hides from right to left as progress increases
        // clip-path inset(top right bottom left) - hiding from right means increasing right value
        const creativeRight = progress * 100; // 0% -> 100% (fully hidden)
        const creativeClip = `inset(0% ${creativeRight}% 0% 0%)`;
        
        // PROJECTS: starts fully hidden (100% right), reveals from left to right as progress increases
        // To reveal from left, we decrease the right value from 100% to 0%
        const projectsRight = 100 - (progress * 100); // 100% -> 0% (fully visible)
        const projectsClip = `inset(0% ${projectsRight}% 0% 0%)`;

        // Batch DOM writes
        gsap.set(creativeEl, {
          clipPath: creativeClip,
        });
        
        gsap.set(projectsEl, {
          clipPath: projectsClip,
        });
        
        rafId = null;
      };

      const handleScroll = () => {
        // Throttle scroll events and batch RAF calls
        if (rafId === null) {
          rafId = window.requestAnimationFrame(updateAnimation);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initial call after a brief delay to avoid blocking initial render
      requestAnimationFrame(() => {
        requestAnimationFrame(updateAnimation);
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      };
    }
  }, []);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, startIndex, endIndex]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30">
      <div className="w-full sm:w-[90%] md:w-[80%] mx-auto" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="mb-12 text-center" style={{ marginBottom: '15px', paddingTop: '16px', paddingBottom: '16px' }}>
            <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none tracking-tight relative inline-block"
            style={{ marginTop: '16px', marginBottom: '0', minHeight: '1.2em' }}
          >
            <span className="creative-text absolute inset-0 flex items-center justify-center" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>CREATIVE</span>
            <span className="projects-text inline-block" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>PROJECTS</span>
          </h2>
          
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center" style={{ marginTop: '0', marginBottom: '24px' }}>
            {['all', 'website', 'app'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 sm:px-12 sm:py-6 md:px-24 md:py-8 lg:px-32 lg:py-10 border transition-all rounded-sm text-base sm:text-lg md:text-xl lg:text-2xl font-medium ${
                  activeFilter === filter
                    ? 'border-white/50 bg-white/10 text-white'
                    : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                }`}
                style={{ marginTop: '8px' }}
              >
                {filter === 'all' ? 'All' : filter === 'website' ? 'Websites' : 'Apps'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 w-full" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          {paginatedProjects.map((project, index) => (
            <div
              key={project.name}
              className="project-card group relative overflow-visible grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center border-t border-b border-white/30 py-6 md:py-8"
              style={{ paddingTop: '24px', paddingBottom: '24px' }}
            >
              <div 
                className="relative w-full h-[24rem] xs:h-[28rem] sm:h-[32rem] md:h-[40rem] lg:h-[48rem] xl:h-[56rem] flip-card-container group/image"
                onMouseEnter={() => {
                  // Only flip if project has video or we want to show placeholder
                  if (!isMobile) {
                    // Clear any pending timeout
                    const timeout = hoverTimeoutRef.current.get(project.name);
                    if (timeout) {
                      clearTimeout(timeout);
                      hoverTimeoutRef.current.delete(project.name);
                    }
                    setFlippedCards(prev => new Set(prev).add(project.name));
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    // Small delay before flipping back to prevent flickering
                    const timeout = setTimeout(() => {
                      setFlippedCards(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(project.name);
                        return newSet;
                      });
                      hoverTimeoutRef.current.delete(project.name);
                    }, 100);
                    hoverTimeoutRef.current.set(project.name, timeout);
                  }
                }}
                onTouchStart={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    touchStartRef.current.set(project.name, Date.now());
                    // Clear any pending timeout
                    const timeout = hoverTimeoutRef.current.get(project.name);
                    if (timeout) {
                      clearTimeout(timeout);
                      hoverTimeoutRef.current.delete(project.name);
                    }
                    setFlippedCards(prev => new Set(prev).add(project.name));
                  }
                }}
                onTouchEnd={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    const touchStart = touchStartRef.current.get(project.name);
                    const touchDuration = touchStart ? Date.now() - touchStart : 0;
                    
                    // If it was a quick tap (less than 300ms), keep it flipped
                    // Otherwise, flip back after a delay
                    if (touchDuration > 300) {
                      const timeout = setTimeout(() => {
                        setFlippedCards(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(project.name);
                          return newSet;
                        });
                        hoverTimeoutRef.current.delete(project.name);
                      }, 2000); // Keep flipped for 2 seconds on mobile
                      hoverTimeoutRef.current.set(project.name, timeout);
                    }
                    touchStartRef.current.delete(project.name);
                  }
                }}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className={`flip-card-inner ${flippedCards.has(project.name) ? 'flipped' : ''}`}>
                  {/* Front side - Image */}
                  <div className="flip-card-front">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                  
                  {/* Back side - Video or Placeholder */}
                  {(project as any).video ? (
                    <VideoPlayer
                      videoSrc={(project as any).video}
                      projectName={project.name}
                      isFlipped={flippedCards.has(project.name)}
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
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 sm:mt-12">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-sm text-sm sm:text-base font-medium transition-all ${
                currentPage === 1
                  ? 'border-white/10 text-gray-600 cursor-not-allowed'
                  : 'border-white/30 text-gray-400 hover:border-white/50 hover:text-white'
              }`}
              aria-label="Previous page"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);
                
                if (!showPage) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-sm text-sm sm:text-base font-medium transition-all min-w-[40px] sm:min-w-[48px] ${
                      currentPage === page
                        ? 'border-white/50 bg-white/10 text-white'
                        : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 sm:px-6 sm:py-3 border rounded-sm text-sm sm:text-base font-medium transition-all ${
                currentPage === totalPages
                  ? 'border-white/10 text-gray-600 cursor-not-allowed'
                  : 'border-white/30 text-gray-400 hover:border-white/50 hover:text-white'
              }`}
              aria-label="Next page"
            >
              Next
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Page Info */}
        {totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
          </div>
        )}
      </div>
    </section>
  );
}
