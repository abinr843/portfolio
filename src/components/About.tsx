import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Heart, Laptop, MapPin } from 'lucide-react'
import portrait from '../assets/profile.png'

gsap.registerPlugin(ScrollTrigger)

const facts = [
  [GraduationCap, 'Education', 'Masters in Computer Science, Musaliar College of Engineering and Technology'],
  [MapPin, 'From', 'Kerala, India'],
  [Laptop, 'Currently exploring', 'Tech opportunities'],
  [Heart, 'Interests', 'AI, Web development, cricket'],
]

export default function About() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', { opacity: 0, y: 42, stagger: 0.12, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } })
      gsap.from('.about-photo', { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: root.current, start: 'top 66%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="about" id="about" ref={root}>
      <div className="content-width about-grid">
        <div className="about-intro about-reveal">
          <p className="section-kicker"><span /> About me</p>
          <h2>A Developer<br />Who Cares About<br /><em>Real Impact</em></h2>
          <p>I&apos;m Abin R Philip, a Python Full Stack Developer with a passion for building useful products and solving real-world problems. I enjoy working at the intersection of technology, design, and human impact.</p>
          <button className="text-link" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>More about me <span>↗</span></button>
        </div>
        <div className="about-photo about-reveal">
          <div className="about-photo__wash" />
          <img src={portrait} alt="Portrait of Abin R Philip" loading="lazy" />
          <p>Same person<br />Different<br />perspective</p>
        </div>
        <div className="about-facts about-reveal">
          {facts.map(([Icon, title, detail]) => {
            const FactIcon = Icon as typeof GraduationCap
            return <div className="about-fact" key={String(title)}><FactIcon size={20} strokeWidth={1.55} /><div><strong>{title as string}</strong><span>{detail as string}</span></div></div>
          })}
        </div>
      </div>
    </section>
  )
}
