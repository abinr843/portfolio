import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    const move = (event: MouseEvent) => gsap.to(cursor.current, { x: event.clientX, y: event.clientY, duration: .18, ease: 'power3.out' })
    const over = (event: Event) => (event.target as Element).closest('a,button') && cursor.current?.classList.add('cursor--active')
    const out = (event: Event) => (event.target as Element).closest('a,button') && cursor.current?.classList.remove('cursor--active')
    window.addEventListener('mousemove', move); document.addEventListener('mouseover', over); document.addEventListener('mouseout', out)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out) }
  }, [])
  return <div className="cursor" ref={cursor} aria-hidden="true" />
}
