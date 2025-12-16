'use client';

const services = [
  'Front-End Development',
  'Back-End Development',
  'Framer Plugin Development',
  'Web3 Integration',
  'APIs Integration',
  'Headless E-Commerce',
  'WebGL',
  'Motion & Interaction',
  'Creative Development',
];

const clients = [
  'Argus Labs',
  'Every',
  'Drive Capital',
  'Ecotrak',
  'Framer',
  'Griflan',
  'Milkinside',
  'Prosupps',
  'Studio Freight',
  'Viture',
];

const technologies = [
  'Next.js',
  'Contentful',
  'HubSpot',
  'Vercel',
  'Lenis',
  'R3F',
  'Three.js',
  'GSAP',
  'Framer',
  'Figma',
];

const awards = [
  'Awwwards',
  'CSS Design Awards',
  'Muzli',
  'FWA',
];

export default function Services() {
  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Services</h3>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Clients</h3>
            <ul className="space-y-3 text-sm">
              {clients.map((client) => (
                <li key={client} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {client}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Technologies</h3>
            <ul className="space-y-3 text-sm">
              {technologies.map((tech) => (
                <li key={tech} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Awards / Features</h3>
            <ul className="space-y-3 text-sm">
              {awards.map((award) => (
                <li key={award} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

