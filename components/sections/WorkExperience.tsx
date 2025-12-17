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
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
              {experience.map((exp, index) => (
                <div key={index} className={index !== experience.length - 1 ? 'border-b border-white/30' : ''} style={{ paddingBottom: index !== experience.length - 1 ? '24px' : '0', marginBottom: index !== experience.length - 1 ? '24px' : '0' }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0" style={{ marginTop: '12px', marginBottom: '12px' }}>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <h3 className="text-lg font-bold text-white" style={{ marginTop: '12px', marginBottom: '12px' }}>
                          {exp.company}.
                        </h3>
                        <span className="text-sm text-gray-500 sm:ml-4 sm:whitespace-nowrap" style={{ marginTop: '12px', marginBottom: '12px' }}>
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-base text-gray-400" style={{ marginTop: '12px', marginBottom: '12px' }}>
                        {exp.role}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed" style={{ marginTop: '12px', marginBottom: '12px' }}>
                        {exp.description}
                      </p>
                    </div>
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

