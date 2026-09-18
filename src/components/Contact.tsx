import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'abinrphilip34@gmail.com'
const LINKEDIN = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/abinr-philip-60b371354/'

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', { opacity: 0, y: 34, stagger: .1, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return <section className="contact" id="contact" ref={root}>
    <div className="contact-ghost">LET&apos;S TALK</div>
    <div className="content-width contact-grid">
      <div className="contact-reveal"><p className="section-kicker"><span /> Contact</p><h2>Let&apos;s Build Something<br /><em>Great Together</em></h2></div>
      <div className="contact-action contact-reveal"><p>I&apos;m always open to discussing new opportunities, interesting projects, or just having a tech conversation.</p><div><a className="button button--dark magnetic" href={`mailto:${EMAIL}`}>Send a message <Mail size={15} /></a><a className="button button--outline magnetic" href={LINKEDIN} target="_blank" rel="noreferrer">Connect on LinkedIn <Linkedin size={15} /></a></div><a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={16} /></a></div>
    </div>
  </section>
}
