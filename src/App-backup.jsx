import './App.css'
import Contact from './components/Contact'
import DeviceScene from './components/DeviceSceneWithToggle'
import Education from './components/Education'
import ErrorBoundary from './components/ErrorBoundary'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
      <header className="nav-bar">
        <div className="logo">ramish@portfolio ~ %</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <Hero />
        <Education />
        <DeviceScene />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <footer>
        <p>&copy; 2025 Ramish Anan Kafi. Built with React + Three.js + GSAP. Seeking New Grad 2026 Backend SWE roles.</p>
      </footer>
    </div>
    </ErrorBoundary>
  )
}

export default App
