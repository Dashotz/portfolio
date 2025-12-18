'use client';

import { useEffect } from 'react';

export default function Favicon() {
  useEffect(() => {
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel="icon"]');
    existingLinks.forEach(link => link.remove());

    // Add favicon for light mode (black icon)
    const lightIcon = document.createElement('link');
    lightIcon.rel = 'icon';
    lightIcon.href = '/icon-light.svg';
    lightIcon.setAttribute('media', '(prefers-color-scheme: light)');
    document.head.appendChild(lightIcon);

    // Add favicon for dark mode (white icon)
    const darkIcon = document.createElement('link');
    darkIcon.rel = 'icon';
    darkIcon.href = '/icon-dark.svg';
    darkIcon.setAttribute('media', '(prefers-color-scheme: dark)');
    document.head.appendChild(darkIcon);
  }, []);

  return null;
}

