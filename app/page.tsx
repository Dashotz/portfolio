import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Services from '@/components/sections/Services';
import OpenSourceTools from '@/components/sections/OpenSourceTools';
import Contact from '@/components/sections/ActivityLog';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="squares-pattern" />
      <Header />
      <div className="relative z-10">
        <Hero />
        <AboutMe />
        <FeaturedProjects />
        <Services />
        <OpenSourceTools />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
