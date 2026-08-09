import { useRef, useEffect, Suspense, lazy } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Individual floating box
function FloatingBox({
  position,
  rotation,
  scale,
  color,
  speed,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.002 * speed
    meshRef.current.rotation.y += 0.003 * speed
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={0.4}
      floatIntensity={0.8}
      floatingRange={[-0.15, 0.15]}
    >
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>
    </Float>
  )
}

// Scene with mouse parallax
function Scene({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)

  const boxes = [
    { position: [1.8, 1.2, -2] as [number, number, number],  rotation: [0.5, 0.3, 0.1] as [number, number, number],  scale: [1.0, 1.0, 1.0] as [number, number, number],  color: '#111111', speed: 0.8 },
    { position: [-1.5, -0.8, -3] as [number, number, number], rotation: [0.2, 0.7, 0.3] as [number, number, number], scale: [0.75, 0.75, 0.75] as [number, number, number], color: '#1a1a1a', speed: 1.1 },
    { position: [2.5, -1.5, -4] as [number, number, number],  rotation: [0.8, 0.1, 0.5] as [number, number, number],  scale: [1.2, 1.2, 1.2] as [number, number, number],  color: '#0a0a0a', speed: 0.6 },
    { position: [-2.2, 1.5, -5] as [number, number, number],  rotation: [0.3, 0.9, 0.2] as [number, number, number],  scale: [0.85, 0.85, 0.85] as [number, number, number], color: '#222222', speed: 1.3 },
    { position: [0.5, 2.2, -3.5] as [number, number, number], rotation: [0.6, 0.4, 0.8] as [number, number, number], scale: [0.6, 0.6, 0.6] as [number, number, number], color: '#0d0d0d', speed: 0.9 },
    { position: [-0.8, -2.2, -2.5] as [number, number, number], rotation: [0.1, 0.6, 0.4] as [number, number, number], scale: [0.7, 0.7, 0.7] as [number, number, number], color: '#181818', speed: 1.4 },
    { position: [3.0, 0.2, -6] as [number, number, number],  rotation: [0.7, 0.2, 0.6] as [number, number, number],  scale: [1.3, 1.3, 1.3] as [number, number, number],  color: '#141414', speed: 0.7 },
    { position: [-3.0, -0.5, -4.5] as [number, number, number], rotation: [0.4, 0.8, 0.1] as [number, number, number], scale: [0.95, 0.95, 0.95] as [number, number, number], color: '#0f0f0f', speed: 1.0 },
  ]

  useFrame(() => {
    if (!groupRef.current || !mouseRef.current) return
    const { x, y } = mouseRef.current
    groupRef.current.rotation.y += (x * 0.08 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (-y * 0.06 - groupRef.current.rotation.x) * 0.04
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -3, 2]} intensity={0.8} color="#333333" />
      {boxes.map((box, i) => (
        <FloatingBox key={i} {...box} />
      ))}
    </group>
  )
}

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
          <Scene mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
