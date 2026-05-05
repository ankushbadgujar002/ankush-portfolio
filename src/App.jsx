import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import './App.css'

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      {/* Each section id must match NAV_LINKS hrefs in Navbar.jsx */}
      <main className="pt-16 bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-300"> {/* offset for fixed navbar height */}

        <section id="hero" className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Hey, I'm Ankush 👋
          </h1>
        </section>

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