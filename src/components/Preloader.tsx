import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const counter = { value: 0 }
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete })
      timeline
        .from('.loader-mark', { opacity: 0, y: 14, duration: 0.45, ease: 'power3.out' })
        .from('.loader-copy', { opacity: 0, y: 10, duration: 0.35, ease: 'power2.out' }, '-=0.2')
        .to(counter, { value: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => setProgress(Math.round(counter.value)) }, '-=0.1')
        .to('.loader-bar__fill', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, '<')
        .to('.loader-content', { opacity: 0, y: -12, duration: 0.35, ease: 'power2.in' })
        .to('.loader-panel--top', { yPercent: -100, duration: 0.72, ease: 'power4.inOut' }, '-=0.05')
        .to('.loader-panel--bottom', { yPercent: 100, duration: 0.72, ease: 'power4.inOut' }, '<')
        .to(root.current, { autoAlpha: 0, duration: 0.01 })
      return () => timeline.kill()
    }, root)
    return () => ctx.revert()
  }, [onComplete])

  return (
    <div className="loader" ref={root} aria-label="Loading portfolio" role="status">
      <div className="loader-panel loader-panel--top" />
      <div className="loader-panel loader-panel--bottom" />
      <div className="loader-content">
        <div className="loader-mark">AR<span>°</span></div>
        <p className="loader-copy">Independent digital builder</p>
        <div className="loader-bar"><span className="loader-bar__fill" /></div>
        <div className="loader-progress">{String(progress).padStart(3, '0')}%</div>
      </div>
    </div>
  )
}
