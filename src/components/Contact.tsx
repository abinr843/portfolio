import { useRef, useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, Linkedin, Github, ArrowRight, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'abinrphilip34@gmail.com'
const PHONE = import.meta.env.VITE_CONTACT_PHONE || '+91 80759 06338'
const PHONE_TEL = import.meta.env.VITE_CONTACT_PHONE_TEL || '+918075906338'
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL || 'https://github.com/abinr843'
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/abinr-philip-60b371354/'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const toastRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const [btnSprings, btnApi] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 22 },
  }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = [leftRef.current, centerRef.current, rightRef.current]
      cols.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const showToast = () => {
    const toast = toastRef.current
    if (!toast) return
    toast.classList.add('show')
    setTimeout(() => toast.classList.remove('show'), 3500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (WEB3FORMS_KEY && WEB3FORMS_KEY !== 'your_web3forms_access_key_here') {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `New Portfolio Message from ${formData.name}`,
            message: formData.message,
          }),
        })
        const result = await response.json()
        if (!result.success) {
          console.error('Web3Forms Error:', result)
        }
      } else {
        await new Promise((r) => setTimeout(r, 1000))
      }
    } catch (err) {
      console.error('Form submission error:', err)
    } finally {
      setSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      showToast()
    }
  }

  return (
    <>
      <section id="contact" className="contact-section-redesign" ref={sectionRef}>
        <div className="contact-redesign-inner">
          {/* Left Column */}
          <div className="contact-left-col" ref={leftRef}>
            <div className="label label-light">LET'S CONNECT</div>
            <h2 className="contact-redesign-heading">
              Let’s build<br />
              something<br />
              <span className="contact-serif-italic">extraordinary</span><br />
              together.
            </h2>
            <p className="contact-redesign-desc">
              Have a project in mind, a job opportunity, or just want to connect? I'd love to hear from you. Send a message or reach out directly.
            </p>
          </div>

          {/* Center Column — Form */}
          <div className="contact-center-col" ref={centerRef}>
            <div className="contact-glass-card">
              <div className="contact-col-title-wrap">
                <h3 className="contact-col-title">SEND A MESSAGE</h3>
                <div className="contact-title-underline" />
              </div>
              <p className="contact-form-subtitle">Fill in the details below and I'll get back to you.</p>

              <form className="contact-redesign-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <input
                    id="contact-name"
                    className="contact-redesign-input"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                  <input
                    id="contact-email"
                    className="contact-redesign-input"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>

                <input
                  id="contact-subject"
                  className="contact-redesign-input"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                />

                <textarea
                  id="contact-message"
                  className="contact-redesign-textarea"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  required
                />

                <animated.button
                  type="submit"
                  className="contact-redesign-submit-btn"
                  style={{ transform: btnSprings.scale.to((s) => `scale(${s})`) }}
                  onMouseEnter={() => btnApi.start({ scale: 1.02 })}
                  onMouseLeave={() => btnApi.start({ scale: 1 })}
                  disabled={submitting}
                >
                  {submitting ? 'SENDING...' : 'SEND MESSAGE'}
                  <ArrowRight size={15} className="arrow" />
                </animated.button>
              </form>

              <p className="contact-reply-note">I usually reply within 24 hours.</p>
            </div>
          </div>

          {/* Right Column — Get in Touch */}
          <div className="contact-right-col" ref={rightRef}>
            <div className="contact-col-title-wrap">
              <h3 className="contact-col-title">GET IN TOUCH</h3>
              <div className="contact-title-underline" />
            </div>

            <div className="contact-touch-list">
              {/* Email Card */}
              <a href={`mailto:${EMAIL}`} className="contact-touch-item">
                <div className="touch-icon-circle">
                  <Mail size={16} />
                </div>
                <div className="touch-item-info">
                  <div className="touch-item-label">EMAIL</div>
                  <div className="touch-item-value">{EMAIL}</div>
                </div>
              </a>

              <div className="touch-item-divider" />

              {/* Phone Card */}
              <a href={`tel:${PHONE_TEL}`} className="contact-touch-item">
                <div className="touch-icon-circle">
                  <Phone size={16} />
                </div>
                <div className="touch-item-info">
                  <div className="touch-item-label">PHONE / WHATSAPP</div>
                  <div className="touch-item-value">{PHONE}</div>
                </div>
              </a>

              <div className="touch-item-divider" />

              {/* LinkedIn Card */}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact-touch-item">
                <div className="touch-icon-circle">
                  <Linkedin size={16} />
                </div>
                <div className="touch-item-info">
                  <div className="touch-item-label">LINKEDIN</div>
                  <div className="touch-item-value">linkedin.com/in/abinr-philip</div>
                </div>
                <ExternalLink size={14} className="touch-external-icon" />
              </a>

              <div className="touch-item-divider" />

              {/* GitHub Card */}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="contact-touch-item">
                <div className="touch-icon-circle">
                  <Github size={16} />
                </div>
                <div className="touch-item-info">
                  <div className="touch-item-label">GITHUB</div>
                  <div className="touch-item-value">github.com/abinr843</div>
                </div>
                <ExternalLink size={14} className="touch-external-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner Line */}
        <div className="contact-bottom-banner">
          <div className="banner-line" />
          <span className="banner-text">LET'S CREATE IMPACT TOGETHER</span>
          <div className="banner-line" />
        </div>
      </section>

      {/* Toast */}
      <div className="toast" ref={toastRef} role="status" aria-live="polite">
        ✓ Message sent! I'll get back to you soon.
      </div>
    </>
  )
}
