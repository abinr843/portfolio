import { Github, Linkedin, Mail } from 'lucide-react'

const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'abinrphilip34@gmail.com'
const LINKEDIN = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/abinr-philip-60b371354/'
const GITHUB = import.meta.env.VITE_GITHUB_URL || 'https://github.com/abinr843'
export default function Footer() {
  return <footer className="footer"><div className="content-width"><div className="footer-top"><div><span className="footer-mark">AR<span>°</span></span><p><strong>ABIN R PHILIP</strong><br />Build · Learn · Grow</p></div><nav><a href="#hero">Home</a><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav><div className="footer-social"><a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href={`mailto:${EMAIL}`} aria-label="Email"><Mail size={18} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Abin R Philip. All rights reserved.</span><span>Made with ♥ and lots of ☕</span></div></div></footer>
}
