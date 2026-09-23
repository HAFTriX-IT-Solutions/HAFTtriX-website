import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function NeuralNetwork() {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 50; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        )
      )
    }
    return pts
  }, [])

  const lines = useMemo(() => {
    const ls = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 3) {
          ls.push([points[i], points[j]])
        }
      }
    }
    return ls
  }, [points])

  return (
    <group>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line[0].x, line[0].y, line[0].z,
                line[1].x, line[1].y, line[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#4a90e2" opacity={0.3} transparent />
        </line>
      ))}
      {points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#6ea8fe" />
        </mesh>
      ))}
    </group>
  )
}

function FloatingShapes() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.2, 64, 64]} position={[-3, 1, 0]}>
          <MeshDistortMaterial
            color="#4a90e2"
            roughness={0.1}
            metalness={0.9}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[3, -1, -1]}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial
            color="#d4a5a5"
            wireframe
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      <Float speed={1} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[0, 2, -2]}>
          <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
          <meshStandardMaterial
            color="#6ea8fe"
            roughness={0.3}
            metalness={0.7}
            emissive="#1a365d"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  )
}

function Particles() {
  const particlesRef = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 500; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        size: Math.random() * 0.1
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" opacity={0.4} transparent />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90e2" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <NeuralNetwork />
      <FloatingShapes />
      <Particles />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}