import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, MapPin, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'abinrphilip34@gmail.com'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [leftRef.current, centerRef.current, rightRef.current]

      elements.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-inner">
        {/* Left */}
        <div ref={leftRef}>
          <div className="label label-light">About Me</div>
          <h2 className="about-heading">
            Building solutions<br />
            with code and creativity.
          </h2>
        </div>

        {/* Center */}
        <div ref={centerRef}>
          <p className="about-bio">
            I'm a Python Full Stack Developer with a passion for building modern web applications,
            scalable backend APIs, and AI driven systems. I enjoy turning complex problems into simple, beautiful
            and scalable solutions.
            <br /><br />
            With a strong foundation in Python (Django, FastAPI), React, and relational database design,
            I craft performant, maintainable codebases and digital experiences that make a real-world difference.
          </p>
        </div>

        {/* Right */}
        <div ref={rightRef}>
          <div className="about-info-list">
            <div className="about-info-item">
              <Calendar size={16} />
              22 Years Old
            </div>
            <div className="about-info-item">
              <MapPin size={16} />
              Kerala, India
            </div>
            <div className="about-info-item">
              <Mail size={16} />
              {EMAIL}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
