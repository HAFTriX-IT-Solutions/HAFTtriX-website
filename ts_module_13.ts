import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Torus, Float } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'

function SecurityShield() {
  const shieldRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      shieldRef.current.scale.setScalar(hovered ? 1.1 : 1)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={shieldRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <Torus args={[1.5, 0.08, 32, 64, Math.PI / 2]} rotation={[0, 0, Math.PI]}>
          <meshStandardMaterial
            color="#4a90e2"
            roughness={0.3}
            metalness={0.9}
            emissive="#1a365d"
            emissiveIntensity={hovered ? 1 : 0.3}
          />
        </Torus>
        <Sphere args={[1.2, 32, 32]} position={[0, 0.5, 0]}>
          <meshStandardMaterial
            color="#6ea8fe"
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </Sphere>
      </group>
    </Float>
  )
}

function DataStream() {
  const particlesRef = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 200; i++) {
      temp.push({
        position: [0, Math.random() * 10 - 5, Math.random() * 10 - 5],
        speed: Math.random() * 0.02 + 0.01
      })
    }
    return temp
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y -= particles[i].speed
        if (particle.position.y < -5) {
          particle.position.y = 5
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#00ff00" opacity={0.6} transparent />
        </mesh>
      ))}
    </group>
  )
}

export default function SecurityVisualization() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <SecurityShield />
      <DataStream />
    </Canvas>
  )
}