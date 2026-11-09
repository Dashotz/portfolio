'use client';

const experience = [
  {
    year: '2026 - Present',
    role: 'Technical / Software Support Engineer',
    company: 'St. Dominic Medical Center',
    description: [
      'Provide day-to-day technical support for PC assembly, hardware repair, and system maintenance.',
      'Manage Active Directory accounts, user permissions, and workstation administration.',
      'Configure IP addresses and network settings while troubleshooting hardware, software, and connectivity issues.',
      'Keep IT inventory and ISO documentation up to date, including IP logs, network records, EHC, and Stock Cards.',
    ],
  },
  {
    year: '2025 - 2026',
    role: 'Subject Matter Expert (Part-Time)',
    company: 'Alignerr',
    description: [
      'Reviewed AI-generated code to check for accuracy, security, code quality, and performance.',
      'Wrote detailed human feedback in Labelbox to help train and improve large language models.',
      'Created and tested programming prompts and solutions for AI training datasets.',
    ],
  },
  {
    year: '2025 - 2026',
    role: 'Web Developer (Full-Stack)',
    company: 'City Government of Bacoor',
    description: [
      'Built and maintained internal and public web applications using Laravel, JavaScript, Bootstrap, and CSS.',
      'Created responsive layouts and wrote clean, well-documented code.',
      'Tested and debugged features before release to keep live systems stable.',
      'Handled server configuration and deployments using SSH and WinSCP.',
    ],
  },
  {
    year: '2020 - 2024',
    role: 'Freelance Full-Stack Developer & IT Support Specialist',
    company: 'Self-Employed',
    description: [
      'Built custom web applications for clients using Laravel, React, Next.js, and Node.js.',
      'Designed responsive, database-driven interfaces with Tailwind CSS and Bootstrap.',
      'Assembled custom PCs, diagnosed hardware issues, and replaced faulty components.',
      'Installed and configured Windows, cleaned up malware, and tuned systems for better performance.',
    ],
  },
];

export default function WorkExperience() {
  return (
    <section
      id="experience"
      className="relative flex items-start justify-center border-t border-white/30 border-b border-white/30"
      style={{ paddingTop: '48px', paddingBottom: '64px', paddingLeft: '16px', paddingRight: '16px' }}
    >
      <div className="w-full sm:w-[90%] md:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-6 md:gap-12 items-stretch" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <div className="md:border-r md:border-white/30 pr-0 md:pr-12 text-center md:text-left" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none tracking-tight">
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>WORK</div>
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>EXP.</div>
            </h2>
          </div>

          <div className="hidden md:block w-px bg-white/30" style={{ height: '100%', minHeight: '100%' }}></div>

          <div className="flex flex-col text-left" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" style={{ marginTop: '16px', marginBottom: '16px' }}>
              {experience.map((exp, index) => (
                <div key={index} className="border-b border-white/30" style={{ paddingBottom: '24px' }}>
                  <div className="flex flex-col gap-2" style={{ marginTop: '12px', marginBottom: '12px' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {exp.company}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 sm:whitespace-nowrap">
                        {exp.year}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-400 font-medium">
                      {exp.role}
                    </p>
                    <ul className="text-xs sm:text-sm text-gray-400 leading-relaxed flex flex-col gap-2" style={{ marginTop: '8px' }}>
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400 shrink-0">•</span>
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

