'use client';

const skills = [
  'JavaScript / TypeScript',
  'React / Next.js',
  'Node.js / Express',
  'HTML / CSS / Tailwind',
  'Git / Version Control',
  'RESTful APIs',
  'Database Design',
  'UI/UX Design',
  'Performance Optimization',
];

const technologies = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'GraphQL',
  'AWS',
  'Docker',
  'Figma',
];

const tools = [
  'VS Code',
  'Git',
  'Figma',
  'Adobe Creative Suite',
  'Postman',
  'Chrome DevTools',
  'Webpack',
  'Vite',
  'Jest',
  'Cypress',
];

export default function Services() {
  return (
    <section id="skills" className="relative flex items-start justify-center pt-0 pb-0 px-6 lg:px-8 xl:px-12 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-bold mb-12 md:mb-16 leading-tight tracking-tight break-words">
          Skills
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-8 md:mt-12 mb-16 md:mb-20 text-center whitespace-nowrap">
          A comprehensive overview of the technologies, tools, and skills I work with to bring ideas to life.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start mb-10">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Skills</h3>
            <ul className="space-y-3 text-sm">
              {skills.map((skill) => (
                <li key={skill} className="text-gray-300 hover:text-white transition-colors">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Technologies</h3>
            <ul className="space-y-3 text-sm">
              {technologies.map((tech) => (
                <li key={tech} className="text-gray-300 hover:text-white transition-colors">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Tools</h3>
            <ul className="space-y-3 text-sm">
              {tools.map((tool) => (
                <li key={tool} className="text-gray-300 hover:text-white transition-colors">
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Currently Learning</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-300 hover:text-white transition-colors">Rust</li>
              <li className="text-gray-300 hover:text-white transition-colors">WebAssembly</li>
              <li className="text-gray-300 hover:text-white transition-colors">Machine Learning</li>
              <li className="text-gray-300 hover:text-white transition-colors">Advanced Animation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

