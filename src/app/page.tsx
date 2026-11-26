import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Achievements } from '@/components/Achievements';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { TopBar } from '@/components/TopBar';
import { SideIndex } from '@/components/SideIndex';
import { ParticleField } from '@/components/field/ParticleField';
import { CursorRing } from '@/components/field/CursorRing';
import { SectionDivider } from '@/components/SectionDivider';
import { PROJECTS, SKILLS } from '@/lib/site';

export default function Home() {
  return (
    <>
      <ParticleField />
      <TopBar />
      <SideIndex />
      <CursorRing />
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
