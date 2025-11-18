import './App.css'
import Contact from './components/ContactNew'
import Education from './components/Education'
import ErrorBoundary from './components/ErrorBoundary'
import Experience from './components/Experience'
import FeaturedProjects from './components/FeaturedProjects'
import Hero from './components/HeroNew'
import Leadership from './components/Leadership'
import Navigation from './components/Navigation'
import Skills from './components/Skills'

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <div className="app-shell">
          <Navigation />

          <main className="page-main">
            <Hero />
            <Education />
            <FeaturedProjects />
            <Experience />
            <Leadership />
            <Skills />
            <Contact />
          </main>
        </div>

        <footer className="site-footer">
          <p>
            © 2025 Ramish Anan Kafi — Portfolio engineered with React, Vite, and Three.js.<br/>
            Focused on scalability, performance, and clean architecture.
          </p>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App
