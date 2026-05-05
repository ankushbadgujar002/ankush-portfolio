// src/App.jsx
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import HeroSection from './sections/HeroSection'
import './App.css'

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="bg-white dark:bg-zinc-950 transition-colors duration-300">

        <HeroSection />

        <section id="about" className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">About</h2>
        </section>

        <section id="skills" className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Skills</h2>
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Projects</h2>
        </section>

        <section id="experience" className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Experience</h2>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Contact</h2>
        </section>

      </main>
    </>
  )
}

export default App