import { useRef, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

// ─── 3D Particle Wave / Flow Field Wireframe ─────────────────────────
function FlowFieldWave({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const meshMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const pointsMatRef = useRef<THREE.PointsMaterial>(null)

  // Mesh resolution & dimensions to cover full widescreen perspective
  const width = 36
  const height = 18
  const widthSegments = 90
  const heightSegments = 45

  // Create geometry once with plane orientation
  const { geometry, originalPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    const posAttr = geo.attributes.position
    const count = posAttr.count
    const orig = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      orig[i] = posAttr.array[i]
    }
    return { geometry: geo, originalPositions: orig }
  }, [])

  useEffect(() => {
    if (!meshMatRef.current || !pointsMatRef.current) return
    meshMatRef.current.opacity = 0
    pointsMatRef.current.opacity = 0

    // Smooth fade-in on load
    gsap.to(meshMatRef.current, {
      opacity: 0.18,
      duration: 2.2,
      delay: 0.2,
      ease: 'power2.out',
    })
    gsap.to(pointsMatRef.current, {
      opacity: 0.35,
      duration: 2.2,
      delay: 0.4,
      ease: 'power2.out',
    })
  }, [])

  useFrame((state) => {
    if (!geometry) return
    const time = state.clock.getElapsedTime() * 0.6
    const posAttr = geometry.attributes.position
    const array = posAttr.array as Float32Array

    const mouseX = mouseRef.current ? mouseRef.current.x * 0.4 : 0
    const mouseY = mouseRef.current ? mouseRef.current.y * 0.3 : 0

    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3
      const x = originalPositions[ix]
      const y = originalPositions[ix + 1]

      // Multi-layered organic wave calculation
      const z =
        Math.sin(x * 0.28 + time + mouseX) * 0.55 +
        Math.cos(y * 0.32 + time * 0.75 + mouseY) * 0.45 +
        Math.sin((x * 0.18 + y * 0.25) + time * 0.5) * 0.35

      array[ix + 2] = z
    }

    posAttr.needsUpdate = true
  })

  return (
    <group position={[0, -2.0, -2.5]} rotation={[-Math.PI / 2.4, 0, 0]}>
      {/* Curved Flowing Wireframe Mesh */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          ref={meshMatRef}
          color="#333344"
          wireframe
          transparent
          opacity={0}
        />
      </mesh>

      {/* Hundreds of Connected Points / Nodes at Grid Intersections */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          ref={pointsMatRef}
          color="#111122"
          size={0.045}
          transparent
          opacity={0}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// ─── Main Three.js Scene Component ───────────────────────────────────────────
export default function ThreeScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  if (isMobile) return null

  return (
    <div className="three-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <FlowFieldWave mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
