// src/App.jsx
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import HeroSection from './sections/HeroSection'
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import useLenis from './hooks/useLenis'
import './App.css'
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';

function App() {

  useLenis();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="bg-white dark:bg-zinc-950 transition-colors duration-300">

        <HeroSection />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <ExperienceSection />

        <section id="contact" className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Contact</h2>
        </section>

      </main>
    </>
  )
}

export default App