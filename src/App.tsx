import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useLenis } from './hooks/useLenis'

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  useLenis()

  // Lock scroll while preloader is active
  useEffect(() => {
    document.body.classList.add('loading')
  }, [])

  const handlePreloaderComplete = () => {
    setPreloaderDone(true)
    document.body.classList.remove('loading')
  }

  return (
    <>
      {/* Loading screen */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Main site — fades in after preloader */}
      <div style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}
