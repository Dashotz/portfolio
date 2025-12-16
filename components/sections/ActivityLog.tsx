'use client';

export default function Contact() {
  return (
    <section id="contact" className="relative flex items-start justify-center pt-16 px-6 lg:px-8 xl:px-12 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-bold mb-12 md:mb-16 leading-tight tracking-tight break-words">
          Contact
        </h1>
        
        <div className="w-full space-y-6 md:space-y-8 flex flex-col items-center">
          <div className="text-base sm:text-lg md:text-xl font-light whitespace-nowrap">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-8 md:mt-12 leading-relaxed max-w-3xl">
            Feel free to reach out if you'd like to work together.
          </p>

          <div className="space-y-8 max-w-2xl mx-auto mt-8 md:mt-12">
            <div className="border-l-2 border-white/10 pl-6 py-4 hover:border-white/30 transition-colors group text-left">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-300 transition-colors">
              Email
            </h3>
            <a 
              href="mailto:your.email@example.com" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              your.email@example.com
            </a>
          </div>

          <div className="border-l-2 border-white/10 pl-6 py-4 hover:border-white/30 transition-colors group text-left">
            <h3 className="text-lg font-semibold mb-4 group-hover:text-gray-300 transition-colors">
              Social Links
            </h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-sm hover:border-white/30"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-sm hover:border-white/30"
              >
                LinkedIn
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-sm hover:border-white/30"
              >
                Twitter
              </a>
              <a 
                href="https://dribbble.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-sm hover:border-white/30"
              >
                Dribbble
              </a>
            </div>
          </div>

          <div className="border-l-2 border-white/10 pl-6 py-4 hover:border-white/30 transition-colors group text-left">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-300 transition-colors">
              Availability
            </h3>
            <p className="text-gray-400">
              Currently available for freelance projects and open to full-time opportunities.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


