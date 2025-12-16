import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Nav</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">home</Link></li>
              <li><Link href="/work" className="hover:text-white transition-colors">work</Link></li>
              <li><Link href="/read" className="hover:text-white transition-colors">read</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">about</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">open source</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">satus</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">lenis</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">hamo</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">tempus</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Omnes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">social</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">github</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">X (twitter)</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">LinkedIn</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Inspiration</h3>
            <p className="text-sm text-gray-400">darkroom</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>©2025 darkroom.engineering</p>
          <p>all rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

