import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

function OrbitalForm() {
  const group = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const points = useMemo(() => {
    const array = new Float32Array(170 * 3)
    for (let i = 0; i < array.length; i += 3) {
      const radius = 1.65 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      array[i] = radius * Math.sin(phi) * Math.cos(theta)
      array[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      array[i + 2] = radius * Math.cos(phi)
    }
    return array
  }, [])
  useEffect(() => {
    const move = (event: MouseEvent) => { mouse.current = { x: event.clientX / window.innerWidth - .5, y: event.clientY / window.innerHeight - .5 } }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y += .0018
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * .25, .03)
    group.current.rotation.y += mouse.current.x * .0005
    if (halo.current) halo.current.rotation.z = clock.elapsedTime * .08
  })
  return <group ref={group} position={[1.6, .05, 0]}>
    <mesh ref={halo} rotation={[1.03, .3, 0]}><torusGeometry args={[2.25, .009, 6, 110]} /><meshBasicMaterial color="#e7e7e4" transparent opacity={.28} /></mesh>
    <mesh rotation={[.3, .2, .2]}><icosahedronGeometry args={[1.08, 1]} /><meshBasicMaterial color="#dadad6" wireframe transparent opacity={.13} /></mesh>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry><pointsMaterial color="#e9e9e6" size={.022} sizeAttenuation transparent opacity={.32} /></points>
  </group>
}

export default function ThreeScene() {
  if (typeof window !== 'undefined' && window.innerWidth < 900) return null
  return <div className="hero-scene" aria-hidden="true"><Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.3]} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}><OrbitalForm /></Canvas></div>
}
