import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.classList.add('loading')

    // Animate the line width
    const lineTl = gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
        onComplete: () => {
          exitPreloader()
        },
      }
    )

    // Entrance animations
    const entranceTl = gsap.timeline()
    entranceTl
      .fromTo(nameRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.2)
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.45)

    return () => {
      lineTl.kill()
      entranceTl.kill()
    }
  }, [])

  const exitPreloader = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (wrapRef.current) wrapRef.current.style.display = 'none'
        document.body.classList.remove('loading')
        onComplete()
      },
    })

    // Split screen open — top panel slides up, bottom panel slides down
    tl.to([nameRef.current, titleRef.current, lineRef.current], {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    })
      .to(topPanelRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
      }, '-=0.1')
      .to(bottomPanelRef.current, {
        yPercent: 100,
        duration: 0.85,
        ease: 'power4.inOut',
      }, '<')
  }

  return (
    <div id="preloader" ref={wrapRef}>
      {/* Split panels */}
      <div className="preloader-panel preloader-top" ref={topPanelRef} />
      <div className="preloader-panel preloader-bottom" ref={bottomPanelRef} />

      {/* Center content */}
      <div className="preloader-content">
        <div className="preloader-name" ref={nameRef}>ABIN R PHILIP</div>
        <div className="preloader-title-line">
          <div className="preloader-title" ref={titleRef}>PYTHON FULL STACK DEVELOPER</div>
        </div>
        <div className="preloader-progress-wrap">
          <div className="preloader-progress-bar" ref={lineRef} />
        </div>
      </div>
    </div>
  )
}
