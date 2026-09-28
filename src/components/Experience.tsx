import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const journey = [
  { when: '03/2025 – 07/2025', role: 'Python Developer Intern', org: 'SLBS Marklance', detail: 'Built backend modules using Python and Django. Developed REST APIs, designed MySQL schemas, integrated Razorpay, and collaborated in an Agile team.' },
  { when: '2024 — Present', role: 'Freelance & Personal Projects', org: 'Independent', detail: 'Building real-world product ideas such as Auction Hub, TourEase and more.' },
  { when: '2022 – 2025', role: 'Bachelor of Computer Application (BCA)', org: 'University of Kerala', detail: 'Built a strong foundation in computer science, software development, and programming principles.' },
  { when: 'Always', role: 'Continuous Learning', org: 'Self Driven', detail: 'Exploring AI, system design, and building more thoughtful digital solutions.' },
]

export default function Experience() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.journey-heading', { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } })
      gsap.from('.journey-line__progress', { scaleY: 0, transformOrigin: 'top', duration: 1.45, ease: 'power2.out', scrollTrigger: { trigger: '.journey-list', start: 'top 76%', once: true } })
      gsap.from('.journey-item', { opacity: 0, x: -24, stagger: 0.18, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.journey-list', start: 'top 76%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="journey" id="experience" ref={root}>
      <div className="content-width">
        <div className="journey-heading"><p className="section-kicker"><span /> Experience</p><h2>My Journey</h2></div>
        <div className="journey-layout">
          <div className="journey-list">
            <div className="journey-line"><span className="journey-line__progress" /></div>
            {journey.map((item) => <article className="journey-item" key={item.role}>
              <i />
              <div className="journey-item__role"><h3>{item.role}</h3><p>{item.org}</p></div>
              <div className="journey-item__detail"><strong>{item.when}</strong><p>{item.detail}</p></div>
            </article>)}
          </div>
          <aside className="journey-quote">“A little progress each day<br />adds up to big results.”<span /></aside>
        </div>
      </div>
    </section>
  )
}
