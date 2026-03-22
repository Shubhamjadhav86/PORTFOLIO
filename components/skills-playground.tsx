"use client"

import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const skills = [
  { name: "HTML5", image: "/technologies/html.png", color: "#E34F26", category: "Frontend" },
  { name: "CSS3", image: "/technologies/css.webp", color: "#1572B6", category: "Frontend" },
  { name: "JavaScript", image: "/technologies/Javascript.webp", color: "#F7DF1E", category: "Frontend" },
  { name: "React.js", image: "/technologies/REACT.png", color: "#61DAFB", category: "Frontend" },
  { name: "Next.js", image: "/technologies/nextjs.png", color: "#FFFFFF", category: "Frontend" },
  { name: "Tailwind CSS", image: "/technologies/tailwend.png", color: "#38BDF8", category: "Frontend" },
  { name: "Node.js", image: "/technologies/node.png", color: "#339933", category: "Backend" },
  { name: "Express.js", image: "/technologies/express.png", color: "#FFFFFF", category: "Backend" },
  { name: "REST API", image: "/technologies/restapi.webp", color: "#00f5d4", category: "Backend" },
  { name: "Auth (JWT)", image: "/technologies/authjwt.png", color: "#FF2D55", category: "Backend" },
  { name: "MongoDB", image: "/technologies/mongodb.png", color: "#47A248", category: "Database" },
  { name: "Mongoose", image: "/technologies/mongoose.png", color: "#880000", category: "Database" },
  { name: "Git", image: "/technologies/git.png", color: "#F05032", category: "Tools" },
  { name: "GitHub", image: "/technologies/Github.png", color: "#FFFFFF", category: "Tools" },
  { name: "Postman", image: "/technologies/Postman.png", color: "#FF6C37", category: "Tools" },
  { name: "Vercel / Netlify", image: "/technologies/Vercel netlify.webp", color: "#FFFFFF", category: "Tools" },
  { name: "VS Code", image: "/technologies/vscode.png", color: "#007ACC", category: "Tools" },
]

export function SkillsPlayground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Wall Flash State
  const [activeWalls, setActiveWalls] = useState({ 
    top: false, 
    bottom: false, 
    left: false, 
    right: false 
  })

  // Trigger Flash Logic
  const triggerFlash = (side: keyof typeof activeWalls) => {
    setActiveWalls(prev => ({ ...prev, [side]: true }))
    setTimeout(() => {
      setActiveWalls(prev => ({ ...prev, [side]: false }))
    }, 200)
  }

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current
    
    // Responsive Sizing
    const getLayout = () => {
      const isMobile = window.innerWidth < 768
      const viewportHeight = window.innerHeight
      return {
        width: container.clientWidth || (isMobile ? 360 : 1000),
        height: isMobile ? Math.max(viewportHeight - 160, 500) : 600,
        blockSize: isMobile ? 80 : 120,
        iconSize: isMobile ? 42 : 60,
        fontSize: isMobile ? 10 : 13
      }
    }

    let layout = getLayout()
    const { width, height } = layout
    
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter

    // Create engine & renderer once
    const engine = Engine.create()
    engine.gravity.y = 0.8
    engineRef.current = engine

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1
      }
    })

    const runner = Runner.create({ delta: 1000 / 60 })
    
    // Boundaries
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0.1,
      restitution: 0.6
    }
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions)
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, wallOptions)
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions)
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, wallOptions) // Adjusted for containment

    // Collision Detection for Flashes
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA === floor || pair.bodyB === floor) triggerFlash('bottom')
        if (pair.bodyA === leftWall || pair.bodyB === leftWall) triggerFlash('left')
        if (pair.bodyA === rightWall || pair.bodyB === rightWall) triggerFlash('right')
        if (pair.bodyA === ceiling || pair.bodyB === ceiling) triggerFlash('top')
      })
    })

    // Preload images
    const imageCache: Record<string, HTMLImageElement> = {}
    skills.forEach(skill => {
      const img = new Image()
      img.src = skill.image
      imageCache[skill.image] = img
    })

    // Spawn Logic
    let spawnTimer: NodeJS.Timeout | null = null
    const spawnSkills = () => {
      const bodies = Composite.allBodies(engine.world)
      bodies.forEach(body => {
        if ((body as any).skill) Composite.remove(engine.world, body)
      })

      const { width, blockSize } = getLayout()
      const fullSkills = [...skills] 
      
      let i = 0
      if (spawnTimer) clearInterval(spawnTimer)
      
      spawnTimer = setInterval(() => {
        if (i >= fullSkills.length) {
          if (spawnTimer) clearInterval(spawnTimer)
          return
        }

        for (let j = 0; j < 3 && i < fullSkills.length; j++) {
          const skill = fullSkills[i]
          const x = Math.random() * (width - blockSize * 2) + blockSize
          const y = -120 - (Math.random() * 200)
          
          const body = Bodies.rectangle(x, y, blockSize, blockSize, {
            chamfer: { radius: blockSize * 0.13 },
            restitution: 0.6,
            friction: 0.1,
            frictionAir: 0.02,
          })
          
          ;(body as any).skill = skill
          Composite.add(engine.world, body)
          i++
        }
      }, 100)
    }

    Composite.add(engine.world, [floor, leftWall, rightWall, ceiling])

    // Mouse Interaction
    const mouse = Mouse.create(canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })
    // @ts-ignore
    mouse.pixelRatio = window.devicePixelRatio || 1
    Composite.add(engine.world, mouseConstraint)
    
    // Intersection Observer for Scroll Reset
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          spawnSkills()
        } else {
          setIsLoaded(false)
        }
      })
    }, { threshold: 0.2 })

    observer.observe(container)

    // Interaction Handlers
    // @ts-ignore
    if (mouse.element) {
      // @ts-ignore
      mouse.element.addEventListener("touchstart", mouse.mousedown, { passive: false })
      // @ts-ignore
      mouse.element.addEventListener("touchmove", (e) => {
        if (mouseConstraint.body) e.preventDefault()
        // @ts-ignore
        mouse.mousemove(e)
      }, { passive: false })
      // @ts-ignore
      mouse.element.addEventListener("touchend", mouse.mouseup, { passive: false })
    }

    // Drawing Logic
    Events.on(render, 'afterRender', () => {
      const { context } = render
      if (!context) return
      
      const currentLayout = getLayout()
      const bodies = Composite.allBodies(engine.world)
      
      bodies.forEach(body => {
        const skill = (body as any).skill
        if (!skill) return

        const { x, y } = body.position
        const angle = body.angle

        context.save()
        context.translate(x, y)
        context.rotate(angle)

        const s = currentLayout.blockSize
        const r = s * 0.13
        
        context.shadowBlur = 10
        context.shadowColor = 'rgba(0,0,0,0.5)'
        
        drawRoundedRect(context, -s / 2, -s / 2, s, s, r)
        context.fillStyle = '#111113'
        context.fill()
        
        context.strokeStyle = skill.color + '33' 
        context.lineWidth = 1.5
        context.stroke()

        const img = imageCache[skill.image]
        if (img && img.complete) {
          const iconS = currentLayout.iconSize
          context.drawImage(img, -iconS / 2, -iconS / 2 - (s * 0.12), iconS, iconS)
        } else {
          context.fillStyle = skill.color
          context.beginPath()
          context.arc(0, -(s * 0.12), 5, 0, Math.PI * 2)
          context.fill()
        }

        context.fillStyle = '#FFFFFF'
        context.font = `600 ${currentLayout.fontSize}px Inter, sans-serif`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(skill.name, 0, s * 0.2)
        
        context.beginPath()
        context.arc(0, s * 0.35, 2.5, 0, Math.PI * 2)
        context.fillStyle = skill.color
        context.fill()

        context.restore()
      })
    })

    const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
    }

    Runner.run(runner, engine)
    Render.run(render)

    const handleResize = () => {
      if (!containerRef.current) return
      const updatedLayout = getLayout()
      const newWidth = containerRef.current.clientWidth
      const newHeight = updatedLayout.height
      
      render.canvas.width = newWidth
      render.canvas.height = newHeight
      render.options.width = newWidth
      render.options.height = newHeight
      
      Matter.Body.setPosition(floor, { x: newWidth / 2, y: newHeight + 25 })
      Matter.Body.setPosition(rightWall, { x: newWidth + 25, y: newHeight / 2 })
      Matter.Body.setPosition(leftWall, { x: -25, y: newHeight / 2 })
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -25 })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (spawnTimer) clearInterval(spawnTimer)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      Render.stop(render)
      Runner.stop(runner)
      Engine.clear(engine)
    }
  }, [])

  return (
    <section id="skills" className="container py-24 relative overflow-hidden">
      <div className="text-center mb-24 relative z-10">
        <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#00f5d4] mb-4">Interactive Arena</h2>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
          Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-rose-500">Playground</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">
          Interact with my tech stack. Drag and throw the blocks to explore the tools I use to build high-performance applications.
        </p>
      </div>

      <div 
        ref={containerRef}
        className={cn(
          "relative w-full h-[90dvh] md:h-[600px] border border-transparent rounded-2xl bg-[#050505] cursor-grab active:cursor-grabbing overflow-hidden transition-all duration-1000",
          "shadow-[0_0_20px_rgba(0,245,212,0.02)]",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Wall Fashes */}
        <div className={cn("absolute inset-x-0 top-0 h-1 bg-[#00f5d4] shadow-[0_0_15px_#00f5d4] transition-opacity duration-300 pointer-events-none z-30", activeWalls.top ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-x-0 bottom-0 h-1 bg-[#00f5d4] shadow-[0_0_15px_#00f5d4] transition-opacity duration-300 pointer-events-none z-30", activeWalls.bottom ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-y-0 left-0 w-1 bg-[#00f5d4] shadow-[0_0_15px_#00f5d4] transition-opacity duration-300 pointer-events-none z-30", activeWalls.left ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-y-0 right-0 w-1 bg-[#00f5d4] shadow-[0_0_15px_#00f5d4] transition-opacity duration-300 pointer-events-none z-30", activeWalls.right ? "opacity-100" : "opacity-0")} />

        {/* Subtle Background Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f5d4]/5 blur-[120px] rounded-full" />
        </div>

        {/* Subtle Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none text-center w-full px-8 opacity-[0.03]">
          <h2 className="text-[6rem] md:text-[12rem] font-black tracking-tighter text-[#00f5d4] uppercase select-none">
            SKILLS
          </h2>
        </div>

        {/* HUD Overlay */}
        <div className="absolute top-10 left-10 z-20 pointer-events-none select-none">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] shadow-[0_0_8px_#00f5d4] animate-pulse" />
            <span className="text-[#00f5d4]/40 font-mono text-[10px] uppercase tracking-[0.4em]">Engine.Stable</span>
          </div>
          <h3 className="text-xl font-bold text-white/90 uppercase tracking-tight leading-none">
            Skills <span className="text-[#00f5d4]">Playground</span>
          </h3>
        </div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-50">
            <div className="w-10 h-10 border-2 border-[#00f5d4]/20 border-t-[#00f5d4] rounded-full animate-spin" />
          </div>
        )}
      </div>
    </section>
  )
}
