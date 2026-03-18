"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const skills = [
    {
        category: "Frontend",
        items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
        code: "FE_MOD"
    },
    {
        category: "Backend",
        items: ["Node.js", "Express.js", "REST APIs", "Server Actions"],
        code: "BE_MOD"
    },
    {
        category: "Database",
        items: ["MongoDB", "Mongoose", "PostgreSQL (Basic)", "Prisma"],
        code: "DB_MOD"
    },
    {
        category: "Tools & DevOps",
        items: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Figma"],
        code: "SYS_MOD"
    },
]

export function Skills() {
    const sectionRef = useRef(null)
    const cardsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                opacity: 0,
                y: 50,
                rotateX: 45,
                stagger: 0.1,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="skills" ref={sectionRef} className="container py-24 md:py-32 relative">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <div className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase animate-pulse">
                    System_Capabilities.pkg
                </div>
                <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                    TECHNICAL <span className="text-primary">SKILLS</span>
                </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {skills.map((skill, index) => (
                    <div 
                        key={skill.category} 
                        ref={(el) => { if (el) cardsRef.current[index] = el }}
                        className="group relative"
                    >
                        {/* Futuristic Card Border/Glow */}
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                        
                        <Card className="relative h-full bg-black/40 border-white/10 rounded-none glass backdrop-blur-sm overflow-hidden group-hover:border-primary/50 transition-colors duration-500">
                            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-white/20 select-none">
                                {skill.code}
                            </div>
                            
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold tracking-[0.2em] uppercase text-white/80 group-hover:text-primary transition-colors">
                                    {skill.category}
                                </CardTitle>
                            </CardHeader>
                            
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <div 
                                            key={item} 
                                            className="px-2 py-1 text-[10px] font-mono border border-white/5 bg-white/5 text-white/60 group-hover:border-primary/20 group-hover:text-primary/80 transition-all"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            
                            {/* Scanning line animation on hover */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}
