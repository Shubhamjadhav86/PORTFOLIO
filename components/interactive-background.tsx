"use client"

import React, { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 80
    const connectionDistance = 100
    const mouseRadius = 200

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 1,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const isDark = theme === "dark" || theme === "system"
      const particleColor = isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(37, 99, 235, 0.3)"
      const lineColor = isDark ? "rgba(59, 130, 246, " : "rgba(37, 99, 235, "

      particles.forEach((p, i) => {
        // Move particle
        p.x += p.vx
        p.y += p.vy

        // Mouse interaction: Attraction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius
            p.x += dx * force * 0.04
            p.y += dy * force * 0.04
          }
        }

        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            let opacity = 1 - dist / connectionDistance
            
            // Mouse boost for lines
            if (mouseRef.current.active) {
                const mdx = mouseRef.current.x - (p.x + p2.x) / 2
                const mdy = mouseRef.current.y - (p.y + p2.y) / 2
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
                if (mdist < mouseRadius) {
                    opacity *= 1.5
                }
            }

            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `${lineColor}${opacity * 0.1})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true }
        }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchstart", handleTouchMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleMouseLeave)

    resize()
    drawParticles()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchstart", handleTouchMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-40"
    />
  )
}
