import { Box, Braces, Cloud, Code2, Database, GitBranch, Layers3, Server, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Skill = { label: string; icon: LucideIcon; accent: string }

export const skills: Skill[] = [
  { label: 'Python', icon: Code2, accent: '#a4bfff' },
  { label: 'Django', icon: Server, accent: '#91d6bd' },
  { label: 'FastAPI', icon: Workflow, accent: '#69e0d0' },
  { label: 'React', icon: Braces, accent: '#70d5f3' },
  { label: 'Next.js', icon: Layers3, accent: '#f5f5f5' },
  { label: 'PostgreSQL', icon: Database, accent: '#99bce8' },
  { label: 'AWS', icon: Cloud, accent: '#f5b64c' },
  { label: 'Git', icon: GitBranch, accent: '#ec856d' },
  { label: 'Docker', icon: Box, accent: '#7db8f2' },
]
