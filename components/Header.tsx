'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          darkroom.engineering
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/work" className="hover:text-gray-400 transition-colors">Work</Link>
          <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
          <Link href="/read" className="hover:text-gray-400 transition-colors">Read</Link>
          <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{isMenuOpen ? '×' : '☰'}</span>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link href="/work" className="hover:text-gray-400 transition-colors">Work</Link>
            <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
            <Link href="/read" className="hover:text-gray-400 transition-colors">Read</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}

