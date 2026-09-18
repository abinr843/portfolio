import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import portrait from '../assets/profile.png'

const HeroScene = lazy(() => import('./ThreeScene'))
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'abinrphilip34@gmail.com'
const LINKEDIN = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/abinr-philip-60b371354/'
const GITHUB = import.meta.env.VITE_GITHUB_URL || 'https://github.com/abinr843'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) return
      gsap.timeline({ delay: 0.1 })
        .from('.hero-reveal', { yPercent: 115, stagger: 0.1, duration: 1.05, ease: 'power4.out' })
        .from('.hero-fade', { opacity: 0, y: 18, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, '-=0.64')
        .from(portraitRef.current, { opacity: 0, clipPath: 'inset(10% 0 0 100%)', duration: 1.3, ease: 'power4.out' }, '-=1.25')
      gsap.to('.hero-orbit', { rotate: 360, duration: 35, repeat: -1, ease: 'none' })
    }, root)
    return () => ctx.revert()
  }, [])
  const parallax = (event: React.MouseEvent<HTMLDivElement>) => {
    const image = portraitRef.current
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = image.getBoundingClientRect()
    gsap.to(image, { x: (event.clientX - (rect.left + rect.width / 2)) * 0.018, y: (event.clientY - (rect.top + rect.height / 2)) * 0.018, duration: 0.7, ease: 'power3.out' })
  }
  const resetParallax = () => gsap.to(portraitRef.current, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, .5)' })
  return (
    <section className="hero" id="hero" ref={root} onMouseMove={parallax} onMouseLeave={resetParallax}>
      <div className="hero-vignette" />
      <Suspense fallback={null}><HeroScene /></Suspense>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow hero-fade"><span /> Python full stack developer</p>
          <h1 aria-label="Abin R Philip">
            <span className="hero-line"><span className="hero-reveal">ABIN R</span></span>
            <span className="hero-line hero-line--muted"><span className="hero-reveal">PHILIP</span></span>
          </h1>
          <p className="hero-summary hero-fade">I build scalable web applications, intelligent systems, and digital experiences that create real impact.</p>
          <div className="hero-ctas hero-fade">
            <button className="button button--light magnetic" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>View my work <ArrowUpRight size={15} /></button>
            <a className="button button--ghost magnetic" href="/assets/ABINPHILIPCV.pdf" download>Download CV <Download size={14} /></a>
          </div>
          <div className="hero-stats hero-fade" aria-label="Portfolio facts">
            <div><strong>03<span>+</span></strong><small>Projects</small></div>
            <div><strong>01<span>+</span></strong><small>Years learning</small></div>
            <div><strong>∞</strong><small>Curiosity</small></div>
          </div>
          <a href="#about" className="scroll-cue hero-fade"><span><ArrowDown size={14} /></span> Scroll to explore</a>
        </div>
        <div className="hero-art" aria-label="Portrait of Abin R Philip">
          <div className="hero-orbit" />
          <div className="hero-portrait-frame" ref={portraitRef}><img src={portrait} alt="Abin R Philip smiling" fetchPriority="high" /></div>
          <p className="hero-note">Crafting systems<br />with clarity &amp;<br />quiet confidence <span>↗</span></p>
          <div className="hero-index">01 / 05</div>
        </div>
      </div>
      <div className="social-rail" aria-label="Social links">
        <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
        <a href={`mailto:${EMAIL}`} aria-label="Email"><Mail size={17} /></a>
        <span />
        <p>BUILD · LEARN · REPEAT</p>
      </div>
    </section>
  )
}
