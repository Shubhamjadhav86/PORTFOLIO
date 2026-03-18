"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, PerspectiveCamera } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create a complex geometry that looks "transformer" like
  // We'll use a torus knot for a technical/sacred geometry look
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005
    }
  })

  useEffect(() => {
    if (meshRef.current) {
      // Animate scale and position based on scroll
      gsap.to(meshRef.current.scale, {
        x: 2,
        y: 2,
        z: 2,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      })
      
      gsap.to(meshRef.current.position, {
        y: -5,
        z: -2,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      })
    }
  }, [])

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#0070f3"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#0070f3"
          emissiveIntensity={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0070f3" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f3ff" />
        <CentralCore />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
