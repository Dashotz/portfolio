'use client';

const experience = [
  { 
    year: '2019-2025', 
    role: 'Freelance Technical Support Specialist', 
    company: 'Self-Employed',
    description: 'Provided comprehensive technical support services for laptops and desktops, including deep cleaning, cable management, hardware repairs, and system optimization.',
  },
  { 
    year: 'Project Based', 
    role: 'Web Developer (Full-Stack)', 
    company: 'City Government of Bacoor',
    description: 'Worked as a project-based full-stack web developer, creating websites using PHP Laravel, JavaScript, Bootstrap, and CSS. Ensured secure, clean, and well-documented code.',
  },
  { 
    year: '2020-2025', 
    role: 'Coach', 
    company: 'Imus United Football Inc.',
    description: 'Worked with coaches to build a strong football program, connected with the community through media, trained athletes for competitions, and organized events.',
  },
];

export default function OpenSourceTools() {
  return (
    <section id="experience" className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30 border-b border-white/30">
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-8 md:gap-12 items-start">
          <div className="md:border-r md:border-white/30 pr-0 md:pr-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
              <div>WORK</div>
              <div>EXPE</div>
              <div>RIENCE</div>
            </h2>
          </div>
          
          <div className="hidden md:block w-px h-full bg-white/30"></div>
          
          <div className="flex flex-col">
            <div className="space-y-0">
              {experience.map((exp, index) => (
                <div key={index} className={index !== experience.length - 1 ? 'border-b border-white/30 pb-6 mb-6' : ''}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {exp.company}.
                      </h3>
                      <p className="text-base text-gray-400 mb-2">
                        {exp.role}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                      {exp.year}
                    </span>
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

