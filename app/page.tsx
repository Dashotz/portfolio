import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import WorkExperience from '@/components/sections/WorkExperience';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/ActivityLog';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="squares-pattern" />
      <Header />
      <div className="relative z-10">
        <Hero />
        <TechStack />
        <AboutMe />
        <FeaturedProjects />
        <Contact />
        <WorkExperience />
      </div>
      <Footer />
    </main>
  );
}
