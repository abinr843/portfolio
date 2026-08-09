import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import auctionImg from '../assets/auction_hub.png'
import toureaseImg from '../assets/tourease.png'
import biketrackerImg from '../assets/biketracker.png'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'tourease',
    categoryTag: 'WEB APPLICATION',
    title: 'TourEase – Tour Booking Web App',
    desc: 'Multi-role system (Admin/Vendor/User) built with Django REST Framework, Razorpay payment gateway integration, secure transactions, and optimized database queries.',
    img: toureaseImg,
    url: 'https://github.com/abinr843/TourEase',
    techStack: ['Django', 'DRF', 'MySQL', 'Razorpay', 'JavaScript'],
  },
  {
    id: 'auction-hub',
    categoryTag: 'WEB APPLICATION',
    title: 'Auction Hub – Bidding Platform',
    desc: 'Real-time bidding logic with Celery background task processing, multi-user auction sessions, OTP verification, and automated notification workflows.',
    img: auctionImg,
    url: 'https://github.com/abinr843/AUCTIONHUB',
    techStack: ['Django', 'Celery', 'Redis', 'PostgreSQL', 'Razorpay'],
  },
  {
    id: 'biketracker',
    categoryTag: 'MOBILE APPLICATION',
    title: 'BikeTracker – Telemetry App',
    desc: 'Real-time GPS tracking, speed monitoring, and battery telemetry mobile interface built with clean and responsive architecture.',
    img: biketrackerImg,
    url: 'https://github.com/abinr843',
    techStack: ['React Native', 'Expo', 'Firebase', 'Maps API', 'Redux'],
  },
]

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)

    // Ultra-fast GPU-accelerated GSAP tilt (Zero React main-thread blocking!)
    gsap.to(card, {
      rotateX: -dy * 4,
      rotateY: dx * 4,
      scale: 1.015,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(project.url, '_blank')}
    >
      <div className="project-card-img-wrap">
        <img
          src={project.img}
          alt={project.title}
          className="project-card-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="project-card-body">
        <div className="project-category-badge">{project.categoryTag}</div>

        <div className="project-card-title-row">
          <h3 className="project-card-title">{project.title}</h3>
          <ArrowRight size={16} className="project-card-arrow" />
        </div>

        <p className="project-card-desc">{project.desc}</p>

        <div className="project-tech-tags">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag-pill">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-header" ref={headerRef}>
        <div className="projects-header-left">
          <div className="label label-light">— PROJECTS</div>
          <h2 className="projects-title">Some things I’ve built.</h2>
          <p className="projects-subtitle">
            A selection of projects that reflect my passion for building useful, scalable, and user-focused solutions.
          </p>
        </div>

        <a href="https://github.com/abinr843" target="_blank" rel="noopener noreferrer" className="view-all-link">
          VIEW ALL PROJECTS
          <ArrowRight size={14} className="arrow" />
        </a>
      </div>

      <div className="projects-grid" ref={gridRef}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination dots */}
      <div className="projects-pagination-dots">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </section>
  )
}
