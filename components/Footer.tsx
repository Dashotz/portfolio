const services = [
  'Front-End Development',
  'Back-End Development',
  'Full-Stack Development',
  'API Integration',
  'Database Management',
  'Responsive Web Design',
  'Web Application Development',
  'System Optimization',
];

export default function Footer() {
  return (
    <footer className="relative flex items-start justify-center pt-12 sm:pt-14 md:pt-16 pb-8 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/30">
      <div className="w-full max-w-6xl mx-auto" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex justify-center items-start" style={{ marginBottom: '32px', marginTop: '16px' }}>
          <div className="text-center">
            <h3 className="text-lg font-bold mb-6" style={{ marginTop: '12px', marginBottom: '24px' }}>Services</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400 text-xs sm:text-sm text-left" style={{ marginTop: '8px', marginBottom: '8px' }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-500" style={{ marginTop: '12px', marginBottom: '12px' }}>© 2025 All rights reserved.</p>
      </div>
    </footer>
  );
}
