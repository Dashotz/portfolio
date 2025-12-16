import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-2.5 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-start mb-12">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-300 hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-300 hover:text-white transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Projects</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-300 hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-300 hover:text-white transition-colors">
                  Skills
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Social</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  X (Twitter)
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-white transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-base sm:text-lg text-gray-400">© 2025 Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
