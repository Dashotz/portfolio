import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import OpenSourceTools from '@/components/sections/OpenSourceTools';
import Services from '@/components/sections/Services';
import ActivityLog from '@/components/sections/ActivityLog';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="squares-pattern" />
      <Header />
      <Hero />
      <Manifesto />
      <FeaturedProjects />
      <OpenSourceTools />
      <Services />
      <ActivityLog />
      <Footer />
    </main>
  );
}
