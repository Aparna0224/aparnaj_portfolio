import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Achievements } from '@/components/Achievements';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { SpaceBackground } from '@/components/space/SpaceBackground';
import { SectionDivider } from '@/components/SectionDivider';
import { PROJECTS, SKILLS } from '@/lib/site';

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About skills={SKILLS} />
        <Experience />
        <Projects projects={PROJECTS} />
        <Achievements />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
