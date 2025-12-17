'use client';

import { Link } from '@/components/link';

export default function Contact() {
  return (
    <section id="contact" className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30">
      <div className="w-full max-w-6xl mx-auto" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <div className="text-center" style={{ marginBottom: '64px', paddingTop: '16px', paddingBottom: '16px' }}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight" style={{ marginTop: '16px', marginBottom: '16px' }}>
                Get In Touch
              </h2>
              <p className="text-lg sm:text-xl text-gray-400" style={{ marginTop: '12px', marginBottom: '12px' }}>
                Have a project in mind? Let's work together to bring your ideas to life
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <h3 className="text-2xl sm:text-3xl font-bold" style={{ marginTop: '12px', marginBottom: '12px' }}>Let's Connect</h3>
            <p className="text-gray-400 leading-relaxed" style={{ marginTop: '16px', marginBottom: '16px' }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of the channels below.
            </p>
            
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
              <Link 
                href="mailto:frncsgerard02@gmail.com"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
                style={{ marginTop: '24px', marginBottom: '24px' }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span style={{ marginTop: '12px', marginBottom: '12px' }}>frncsgerard02@gmail.com</span>
              </Link>
              
              <Link 
                href="tel:+639208040444"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
                style={{ marginTop: '24px', marginBottom: '24px' }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span style={{ marginTop: '12px', marginBottom: '12px' }}>+63 920 804 0444</span>
              </Link>
              
              <Link 
                href="https://maps.app.goo.gl/nrzae2RrENJXso7s5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
                style={{ marginTop: '24px', marginBottom: '24px' }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span style={{ marginTop: '12px', marginBottom: '12px' }}>Toclong 2-A Chua Compound, Imus City, Cavite, Philippines</span>
              </Link>
            </div>
          </div>
          
          <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <h3 className="text-2xl sm:text-3xl font-bold" style={{ marginTop: '12px', marginBottom: '12px' }}>Send a Message</h3>
            <form style={{ marginTop: '16px', marginBottom: '16px' }}>
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                <label htmlFor="name" className="block text-sm font-medium" style={{ marginTop: '12px', marginBottom: '12px' }}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-sm focus:outline-none focus:border-white/50 transition-colors text-white placeholder-gray-500"
                />
              </div>
              
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                <label htmlFor="email" className="block text-sm font-medium" style={{ marginTop: '12px', marginBottom: '12px' }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-sm focus:outline-none focus:border-white/50 transition-colors text-white placeholder-gray-500"
                />
              </div>
              
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                <label htmlFor="message" className="block text-sm font-medium" style={{ marginTop: '12px', marginBottom: '12px' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-sm focus:outline-none focus:border-white/50 transition-colors text-white placeholder-gray-500 resize-none"
                />
              </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-white text-black hover:bg-white/90 transition-all rounded-sm font-medium"
                    style={{ marginTop: '12px', marginBottom: '12px' }}
                  >
                    Send Message
                  </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
