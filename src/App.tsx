import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import { useLenis } from './hooks/useLenis'

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  useEffect(() => {
    document.body.classList.toggle('loading', !ready)
    return () => document.body.classList.remove('loading')
  }, [ready])

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <CustomCursor />
      <div className={`site-shell ${ready ? 'site-shell--ready' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
