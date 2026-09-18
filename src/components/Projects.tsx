import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { projects, type Project } from '../lib/projects'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, open }: { project: Project; open: (project: Project) => void }) {
  const card = useRef<HTMLButtonElement>(null)
  const tilt = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!card.current || window.innerWidth < 850) return
    const bounds = card.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - .5
    const y = (event.clientY - bounds.top) / bounds.height - .5
    gsap.to(card.current, { rotateY: x * 6, rotateX: y * -5, y: -6, duration: .35, ease: 'power2.out', overwrite: 'auto' })
  }
  const reset = () => gsap.to(card.current, { rotateY: 0, rotateX: 0, y: 0, duration: .65, ease: 'power3.out' })
  return <button className="project-card" ref={card} onMouseMove={tilt} onMouseLeave={reset} onFocus={reset} onClick={() => open(project)}>
    <div className="project-card__image"><img src={project.image} alt={`${project.title} project preview`} loading="lazy" /><span>{project.eyebrow}</span></div>
    <div className="project-card__body"><div className="project-card__title"><h3>{project.title}</h3><ArrowUpRight size={17} /></div><div className="project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><p>{project.description}</p></div>
  </button>
}

function ProjectModal({ project, close }: { project: Project; close: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close()
    document.body.classList.add('modal-open'); window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', onKey) }
  }, [close])
  return <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.target === event.currentTarget && close()}>
    <article className="project-modal__panel">
      <button className="project-modal__close" aria-label="Close project details" onClick={close}><X size={19} /></button>
      <div className="project-modal__image"><img src={project.image} alt="" /></div>
      <div className="project-modal__content"><p className="section-kicker"><span /> {project.eyebrow}</p><h2 id="modal-title">{project.title}</h2><p className="project-modal__lead">{project.overview}</p>
        <div className="project-modal__details"><div><strong>Problem</strong><p>{project.problem}</p></div><div><strong>Solution</strong><p>{project.solution}</p></div></div>
        <div className="modal-footer"><div className="project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><a className="button button--dark" href={project.github} target="_blank" rel="noreferrer">View code <Github size={15} /></a></div>
      </div>
    </article>
  </div>
}

export default function Projects() {
  const root = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-intro', { opacity: 0, y: 30, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } })
      gsap.from('.project-card', { opacity: 0, y: 42, stagger: .12, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.project-grid', start: 'top 78%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return <section className="projects" id="projects" ref={root}>
    <div className="content-width">
      <div className="projects-intro"><div><p className="section-kicker section-kicker--light"><span /> Projects</p><h2>Featured Work</h2></div><div><p>A few things I&apos;ve built. Each project taught me something new.</p><a href="https://github.com/abinr843" target="_blank" rel="noreferrer" className="project-all">View all projects <ExternalLink size={14} /></a></div></div>
      <div className="project-grid">{projects.map(project => <ProjectCard project={project} open={setSelected} key={project.slug} />)}</div>
    </div>
    {selected && <ProjectModal project={selected} close={() => setSelected(null)} />}
  </section>
}
