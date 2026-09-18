import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, X } from 'lucide-react'

const links = [['Home', 'hero'], ['About', 'about'], ['Experience', 'experience'], ['Projects', 'projects'], ['Contact', 'contact']]
const navigate = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 32)
      const current = [...links].reverse().find(([, id]) => {
        const el = document.getElementById(id)
        return el && el.getBoundingClientRect().top < window.innerHeight * 0.42
      })
      if (current) setActive(current[1])
    }
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])
  const choose = (id: string) => { setMenuOpen(false); window.setTimeout(() => navigate(id), 20) }
  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <button className="monogram" aria-label="Back to home" onClick={() => navigate('hero')}>AR<span>°</span></button>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([label, id]) => <button className={active === id ? 'is-active' : ''} onClick={() => choose(id)} key={id}>{label}</button>)}
        </nav>
        <div className="nav-actions">
          <button className="round-icon" aria-label="Switch appearance"><Moon size={14} /></button>
          <button className="talk-button" onClick={() => choose('contact')}>Let&apos;s Talk <ArrowUpRight size={14} /></button>
          <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>
      <aside className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`} aria-hidden={!menuOpen}>
        <p className="section-kicker">Navigate</p>
        {links.map(([label, id], i) => <button onClick={() => choose(id)} key={id} style={{ transitionDelay: `${100 + i * 45}ms` }}>{label}</button>)}
        <p className="mobile-nav__note">Build · Learn · Grow</p>
      </aside>
    </>
  )
}
