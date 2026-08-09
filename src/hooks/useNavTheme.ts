import { useEffect, useRef } from 'react'

// Map each section id to which nav theme it should trigger
const SECTION_THEMES: Record<string, 'dark' | 'light'> = {
  hero: 'dark',
  experience: 'dark',
  about: 'light',
  projects: 'light',
  contact: 'light', // dark background → light nav text
}

export function useNavTheme(navRef: React.RefObject<HTMLElement | null>) {
  const activeSection = useRef<string>('hero')

  useEffect(() => {
    if (!navRef.current) return

    const sectionIds = Object.keys(SECTION_THEMES)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
              activeSection.current = id
              if (navRef.current) {
                navRef.current.setAttribute('data-theme', SECTION_THEMES[id])
              }
            }
          })
        },
        { threshold: 0.35 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    // Set initial theme
    if (navRef.current) {
      navRef.current.setAttribute('data-theme', 'dark')
    }

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [navRef])
}
