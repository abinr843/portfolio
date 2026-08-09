import { useEffect, useRef, lazy, Suspense } from 'react'
import { useSpring, animated } from '@react-spring/web'
import gsap from 'gsap'
import { Download, ArrowRight } from 'lucide-react'
import profileImg from '../assets/profile.png'

const ThreeScene = lazy(() => import('./ThreeScene'))

function AnimatedButton({
  children,
  className,
  onClick,
  href,
  download,
}: {
  children: React.ReactNode
  className: string
  onClick?: () => void
  href?: string
  download?: boolean | string
}) {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 20 },
  }))

  const handleEnter = () => api.start({ scale: 1.04 })
  const handleLeave = () => api.start({ scale: 1 })

  return (
    <animated.a
      href={href}
      download={download}
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transform: springs.scale.to((s) => `scale(${s})`) }}
    >
      {children}
    </animated.a>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const greetingRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)
  const deco2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(greetingRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(portraitRef.current, { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.6')
      .to(
        deco2Ref.current,
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.8'
      )

    return () => { tl.kill() }
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      <div className="hero-inner">
        {/* Left — Text Content */}
        <div className="hero-left">
          <div className="hero-greeting" ref={greetingRef}>
            Hello, I'm
          </div>

          <h1 className="hero-name" ref={nameRef}>
            ABIN R PHILIP
          </h1>

          <div className="hero-title" ref={titleRef}>
            PYTHON FULL STACK DEVELOPER
          </div>

          <p className="hero-tagline" ref={taglineRef}>
            I build scalable web applications, intelligent systems,
            and digital experiences that create real impact.
          </p>

          <div className="hero-ctas" ref={ctasRef}>
            <AnimatedButton
              className="btn-primary"
              onClick={scrollToProjects}
            >
              View My Work
              <ArrowRight size={15} className="arrow" />
            </AnimatedButton>

            <AnimatedButton
              className="btn-secondary"
              href="/assets/ABINPHILIPCV.pdf"
              download={true}
            >
              Download CV
              <Download size={14} />
            </AnimatedButton>
          </div>
        </div>

        {/* Right — Portrait + 3D */}
        <div className="hero-right">
          {/* Decorative Blocks */}
          <div className="deco-block deco-block-2" ref={deco2Ref} />

          {/* Three.js Scene */}
          <Suspense fallback={null}>
            <ThreeScene />
          </Suspense>

          {/* Portrait */}
          <div className="hero-portrait-wrap">
            <img
              ref={portraitRef}
              src={profileImg}
              alt="Abin R Philip"
              className="hero-portrait"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
