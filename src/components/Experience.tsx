import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCE = [
  {
    period: '23 May 2026 — Present',
    company: 'Zecser Business LLP',
    location: 'Kerala, India',
    role: 'Python Developer',
    type: 'Full-time',
    desc: 'Designing and building scalable Python backend modules, automated workflows, asynchronous task queues with Celery, and high-performance APIs using Django and FastAPI.',
    skills: ['Python', 'Django', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'JWT Auth', 'Docker', 'Git'],
  },
  {
    period: '03/2025 — 07/2025',
    company: 'SLBS Marklance',
    location: 'Kerala, India',
    role: 'Python Developer Intern',
    type: 'Internship',
    desc: 'Built backend modules using Python and Django, supporting multi-role user workflows and handling booking operations. Developed REST APIs with Django REST Framework, managed MySQL database schemas using Django ORM, integrated Razorpay payment gateway with webhook handling, and resolved performance bugs in an Agile team.',
    skills: ['Python', 'Django', 'Django REST Framework', 'MySQL', 'Django ORM', 'Razorpay', 'Agile'],
  },
]

const EDUCATION = [
  {
    label: 'Undergraduate Degree',
    degree: "Bachelor of Computer Application (BCA)",
    school: 'University of Kerala',
    year: '2022 — 2025',
  },
]

const CERTIFICATIONS = [
  {
    title: 'Certified Python Full Stack Developer',
    issuer: 'IGNET Certification',
    badge: 'Certified',
  },
  {
    title: 'IELTS B2 English Proficiency',
    issuer: 'International English Language Testing System',
    badge: 'B2 Level',
  },
]

const SKILLS = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 / CSS3', 'SQL'],
  },
  {
    category: 'Backend & Frameworks',
    items: ['Python (Django, FastAPI)', 'Django REST Framework', 'Celery', 'JWT Authentication', 'RESTful APIs'],
  },
  {
    category: 'Frontend & UI',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'GSAP', 'Three.js / WebGL'],
  },
  {
    category: 'Databases & Tools',
    items: ['PostgreSQL', 'MySQL (Django ORM)', 'Redis', 'Postman API', 'Git & GitHub', 'Docker'],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )

      // Timeline items
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.exp-item')
        gsap.fromTo(
          items,
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.75, stagger: 0.18, ease: 'power3.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true },
          }
        )
      }

      // Education
      if (educationRef.current) {
        const cards = educationRef.current.querySelectorAll('.edu-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: educationRef.current, start: 'top 85%', once: true },
          }
        )
      }

      // Skills
      if (skillsRef.current) {
        const cats = skillsRef.current.querySelectorAll('.skill-category')
        gsap.fromTo(
          cats,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: skillsRef.current, start: 'top 85%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-inner">
        {/* Header */}
        <div className="experience-header" ref={headerRef}>
          <div>
            <div className="label label-dark">Experience</div>
            <h2 className="experience-title">Where I've worked.</h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="experience-timeline" ref={timelineRef}>
          {EXPERIENCE.map((exp, i) => (
            <div className="exp-item" key={i}>
              <div className="exp-meta">
                <div className="exp-period">{exp.period}</div>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-location">{exp.location}</div>
              </div>
              <div className="exp-content">
                <div>
                  <span className="exp-role">{exp.role}</span>
                  <span className="exp-type-badge">{exp.type}</span>
                </div>
                <p className="exp-desc">{exp.desc}</p>
                <div className="exp-skills">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="exp-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Certifications */}
        <div ref={educationRef}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3.5rem' }}>
            <div>
              <div className="label label-dark" style={{ marginBottom: '1.5rem' }}>Education</div>
              <div className="education-grid" style={{ marginTop: 0, gridTemplateColumns: '1fr' }}>
                {EDUCATION.map((edu, i) => (
                  <div className="edu-card" key={i}>
                    <div className="edu-label">{edu.label}</div>
                    <div className="edu-degree">{edu.degree}</div>
                    <div className="edu-school">{edu.school}</div>
                    <div className="edu-year">{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="label label-dark" style={{ marginBottom: '1.5rem' }}>Certifications</div>
              <div className="education-grid" style={{ marginTop: 0, gridTemplateColumns: '1fr' }}>
                {CERTIFICATIONS.map((cert, i) => (
                  <div className="edu-card" key={i} style={{ background: '#1a1a1a' }}>
                    <div className="edu-label">{cert.badge}</div>
                    <div className="edu-degree">{cert.title}</div>
                    <div className="edu-school">{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef}>
          <div className="label label-dark" style={{ marginTop: '3.5rem' }}>Technical Skills</div>
          <div className="skills-grid">
            {SKILLS.map((cat) => (
              <div className="skill-category" key={cat.category}>
                <div className="skill-category-title">{cat.category}</div>
                <div className="skill-list">
                  {cat.items.map((item) => (
                    <span key={item} className="skill-item">· {item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
