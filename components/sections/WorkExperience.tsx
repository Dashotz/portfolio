'use client';

const experience = [
  { 
    year: '2025 – Present', 
    role: 'Senior Full Stack Developer', 
    company: 'City Government of Bacoor',
    description: [
      'Took ownership of core application features and system improvements',
      'Reviewed code and mentored junior developers and interns',
      'Improved application stability and maintainability through refactoring and best practices',
    ],
  },
  { 
    year: '2024 – 2025', 
    role: 'Junior Full Stack Developer', 
    company: 'City Government of Bacoor',
    description: [
      'Developed and maintained website components using PHP, Laravel, JavaScript, Bootstrap, and CSS',
      'Assisted in backend development, bug fixes, and feature enhancements',
      'Gained hands-on experience working on live government systems',
    ],
  },
  { 
    year: '2023 – Present', 
    role: 'Freelance Full-Stack Developer (Part Time)', 
    company: 'Self-Employed',
    description: [
      'Designed and developed custom web applications and websites for small businesses and individual clients',
      'Built full-stack solutions using Laravel, JavaScript, TypeScript, React, Next.js, Node.js, and Express',
      'Implemented responsive UI using Tailwind CSS and Bootstrap',
      'Developed secure APIs, authentication flows, and database-driven features',
      'Collaborated directly with clients to gather requirements, deliver features, and provide ongoing support',
    ],
  },
  { 
    year: '2020 – Present', 
    role: 'Freelance Technical Support Specialist', 
    company: 'Self-Employed',
    description: [
      'Hardware repairs including component replacement (RAM, storage, batteries, keyboards) and troubleshooting motherboard/power supply issues',
      'Windows OS installation and configuration (Windows 7-11) with driver setup and Microsoft Office installation',
      'System optimization, malware removal, and client communication with detailed service documentation',
      'Completed hundreds of repairs and installations across multiple computer brands and models',
    ],
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30 border-b border-white/30">
      <div className="w-full sm:w-[90%] md:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-6 md:gap-12 items-stretch" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <div className="md:border-r md:border-white/30 pr-0 md:pr-12 text-center md:text-left" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none tracking-tight">
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>WORK</div>
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>EXP.</div>
            </h2>
          </div>
          
          <div className="hidden md:block w-px bg-white/30" style={{ height: '100%', minHeight: '100%' }}></div>
          
          <div className="flex flex-col text-center md:text-left" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" style={{ marginTop: '16px', marginBottom: '16px' }}>
              {experience.map((exp, index) => (
                <div key={index} className="border-b border-white/30 pb-6" style={{ paddingBottom: '24px' }}>
                  <div className="flex flex-col gap-2" style={{ marginTop: '12px', marginBottom: '12px' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <h3 className="text-lg font-bold text-white">
                        {exp.company}
                      </h3>
                      <span className="text-sm text-gray-500 sm:whitespace-nowrap">
                        {exp.year}
                      </span>
                    </div>
                    <p className="text-base text-gray-400 font-medium">
                      {exp.role}
                    </p>
                    <ul className="text-sm text-gray-500 leading-relaxed space-y-2 mt-2">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-gray-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

