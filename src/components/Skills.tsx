import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../lib/skills'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header, .skill-card', { opacity: 0, y: 26, stagger: 0.07, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 78%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return <section className="skills" ref={root} aria-label="Skills">
    <div className="content-width">
      <div className="skills-header"><div><p className="section-kicker section-kicker--light"><span /> Skills</p><h2>Tools I Work With</h2></div><p>Technologies and tools I use to build,<br />learn and create.</p></div>
      <div className="skills-grid">{skills.map(({ label, icon: Icon, accent }) => <div className="skill-card" key={label}><Icon size={26} color={accent} strokeWidth={1.7} /><span>{label}</span></div>)}</div>
    </div>
  </section>
}
