'use client';

import { useEffect } from 'react';

export default function Favicon() {
  useEffect(() => {
    // Get base path from Next.js basePath or detect from current path
    // For GitHub Pages, basePath is set in next.config.ts
    let basePath = '';
    
    // Try to get from Next.js basePath (available at runtime)
    if (typeof window !== 'undefined') {
      // Detect base path from current location
      const pathname = window.location.pathname;
      // If pathname starts with /portfolio, use that as basePath
      if (pathname.startsWith('/portfolio')) {
        basePath = '/portfolio';
      }
    }
    
    // Fallback to environment variable
    if (!basePath && typeof process !== 'undefined' && process.env) {
      basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    }
    
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    existingLinks.forEach(link => link.remove());

    // Add default favicon.ico (for browsers that require it)
    const defaultIcon = document.createElement('link');
    defaultIcon.rel = 'icon';
    defaultIcon.href = `${basePath}/favicon.ico`;
    document.head.appendChild(defaultIcon);

    // Add favicon for light mode (black icon)
    const lightIcon = document.createElement('link');
    lightIcon.rel = 'icon';
    lightIcon.href = `${basePath}/icon-light.svg`;
    lightIcon.setAttribute('media', '(prefers-color-scheme: light)');
    document.head.appendChild(lightIcon);

    // Add favicon for dark mode (white icon)
    const darkIcon = document.createElement('link');
    darkIcon.rel = 'icon';
    darkIcon.href = `${basePath}/icon-dark.svg`;
    darkIcon.setAttribute('media', '(prefers-color-scheme: dark)');
    document.head.appendChild(darkIcon);
  }, []);

  return null;
}

