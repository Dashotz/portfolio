const services = [
  'Technical & Software Support',
  'System & Active Directory Administration',
  'Network Configuration & Troubleshooting',
  'PC Assembly, Repair & Maintenance',
  'Full-Stack Web Development',
  'AI Code Evaluation & LLM Training',
  'Database & IT Asset Management',
  'Server Setup & Deployment',
];

export default function Footer() {
  return (
    <footer
      className="relative flex items-start justify-center border-t border-white/30"
      style={{ paddingTop: '32px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px' }}
    >
      <div className="w-full max-w-6xl mx-auto" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex justify-center items-start" style={{ marginBottom: '32px', marginTop: '16px' }}>
          <div className="text-center w-full sm:w-auto">
            <h3 className="text-lg font-bold" style={{ marginTop: '12px', marginBottom: '20px' }}>Services</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400 text-xs sm:text-sm text-center sm:text-left" style={{ marginTop: '6px', marginBottom: '6px' }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <p className="text-center text-xs sm:text-sm text-gray-500" style={{ marginTop: '12px', marginBottom: '12px' }}>© 2026 Francis Gerard A. Cruz. All rights reserved.</p>
      </div>
    </footer>
  );
}
