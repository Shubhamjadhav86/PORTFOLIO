"use client"

import { useEffect, useRef } from "react"

export function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouse = useRef({ x: 0, y: 0, active: false })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        const particleCount = 100 
        const connectionDistance = 150 
        const mouseRadius = 250

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.vx = (Math.random() - 0.5) * 0.15
                this.vy = (Math.random() - 0.5) * 0.15
                this.size = Math.random() * 1.5 + 0.5
                this.color = "rgba(0, 245, 212, 0.4)" // Restored subtlety
            }

            draw() {
                ctx!.fillStyle = this.color
                ctx!.beginPath()
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx!.closePath()
                ctx!.fill()
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1

                if (mouse.current.active) {
                    let dx = mouse.current.x - this.x
                    let dy = mouse.current.y - this.y
                    let distance = Math.sqrt(dx * dx + dy * dy)
                    
                    if (distance < mouseRadius) {
                        this.x += dx * 0.008
                        this.y += dy * 0.008
                    }
                }
            }
        }

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacity = (1 - (distance / connectionDistance)) * 0.15 // Restored subtlety
                        ctx.strokeStyle = `rgba(0, 245, 212, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                        ctx.closePath()
                    }
                }
            }
        }

        const init = () => {
            if (canvas) {
                particles = []
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle())
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw()
                particles[i].update()
            }
            connect()
            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
                init()
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
            mouse.current.active = true
        }

        const handleMouseLeave = () => {
            mouse.current.active = false
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseleave", handleMouseLeave)

        handleResize()
        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseleave", handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-30"
        />
    )
}
