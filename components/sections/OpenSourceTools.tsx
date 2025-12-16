'use client';

const experience = [
  { 
    period: '2023 - Present', 
    role: 'Senior Frontend Developer', 
    company: 'Tech Company',
    description: 'Leading frontend development initiatives, building scalable web applications, and mentoring junior developers.',
    achievements: ['Led team of 5 developers', 'Improved performance by 40%', 'Implemented design system']
  },
  { 
    period: '2021 - 2023', 
    role: 'Full Stack Developer', 
    company: 'Startup Inc',
    description: 'Developed full-stack applications using modern technologies, collaborated with cross-functional teams.',
    achievements: ['Built 10+ web applications', 'Reduced load time by 50%', 'Integrated third-party APIs']
  },
  { 
    period: '2019 - 2021', 
    role: 'Junior Developer', 
    company: 'Digital Agency',
    description: 'Started my journey in web development, learned modern frameworks, and contributed to client projects.',
    achievements: ['Learned React & Node.js', 'Completed 20+ projects', 'Earned certifications']
  },
];

export default function OpenSourceTools() {
  return (
    <section id="experience" className="relative flex items-start justify-center pt-0 pb-0 px-6 lg:px-8 xl:px-12 border-t border-white/10 mt-2.5">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-bold mb-12 md:mb-16 leading-tight tracking-tight break-words">
          Experience
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-8 md:mt-12 mb-12 md:mb-16 text-center whitespace-nowrap">
          A journey through my professional career, highlighting key roles, achievements, and the growth that has shaped me as a developer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="border border-white/10 p-8 hover:border-white/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                <div>
                  <span className="text-sm text-gray-500 font-mono">{exp.period}</span>
                  <h3 className="text-2xl font-bold mt-2">{exp.role}</h3>
                  <p className="text-gray-400 mt-1">{exp.company}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.achievements.map((achievement, i) => (
                  <span key={i} className="text-xs px-3 py-1 border border-white/20 rounded text-gray-400">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

