'use client';

const activities = [
  { date: '2025/09/19', title: 'House Of Evil', description: 'website using v0, aisdk to generate your own reflections applied to a 3d model that tracks your movements', category: 'website' },
  { date: '2025/09/09', title: 'Æ app launched', description: 'React native social media app launched on iOS and Android', category: 'app' },
  { date: '2025/09/10', title: 'Bad Omens official site updates (again)', description: 'Impose is out, new merch', category: 'update' },
  { date: '2025/09/05', title: 'Framer component', description: 'Revelo - Text reveal component is live!', category: 'component' },
  { date: '2025/09/5', title: 'Bad Omens official site updates', description: 'Specter is out, new merch, new tour dates', category: 'update' },
  { date: '2025/09/01', title: 'Growthloop launched', description: 'Growthloop - The Compound Marketing Engine launched', category: 'launch' },
  { date: '2025/09/01', title: 'Nexus.xyz handed off', description: 'Nexus.xyz handed off to their team', category: 'handoff' },
  { date: '2025/08/01', title: 'Ashby plugin', description: 'Ashby plugin released with Framer', category: 'plugin' },
  { date: '2025/08/01', title: 'Greenhouse plugin', description: 'Greenhouse plugin released with Framer', category: 'plugin' },
  { date: '2025/04/22', title: 'Client work', description: 'Ibicash is live!', category: 'client' },
  { date: '2025/04/18', title: 'Open source', description: 'lenis/framer has been released!', category: 'opensource' },
  { date: '2025/04/16', title: 'Update', description: 'added page transitions (in next.js LFG!)', category: 'update' },
  { date: '2025/04/09', title: 'Update', description: 'new site, who dis?', category: 'update' },
  { date: '2025/04/01', title: 'Open Source', description: 'Figuring what is going on with our build', category: 'opensource' },
  { date: '2025/03/28', title: 'Update', description: 'work on the new /work page', category: 'update' },
];

export default function ActivityLog() {
  return (
    <section className="relative py-32 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          Activity Log
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 mb-12 md:mb-16 leading-relaxed">
          A Running Log of What We're Building, Breaking, and Learning Along the Way. New Projects, Open-Source Updates, and the Occasional Deep Dive — This Is Where We Keep Track of It All.
        </p>

        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border-l-2 border-white/10 pl-6 py-4 hover:border-white/30 transition-colors group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-2 mb-2">
                <span className="text-sm text-gray-500 font-mono">{activity.date}</span>
                <span className="text-sm text-gray-500 capitalize">{activity.category}</span>
                <h3 className="text-lg font-semibold group-hover:text-gray-300 transition-colors">
                  {activity.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

