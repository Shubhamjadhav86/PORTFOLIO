"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: "SECURE_VAULT_API",
        description: "A secure and scalable RESTful API for an e-commerce platform.",
        tech: ["Node.js", "Express", "MongoDB", "JWT"],
        problem: "Need for a robust backend to handle concurrent requests.",
        solution: "Implemented a REST API with rate limiting and JWT auth.",
        outcome: "Reduced response time by 40% and secured user data.",
        github: "https://github.com/Shubhamjadhav86",
        live: "#",
        code: "PRJ_01"
    },
    {
        title: "SYNC_TASK_KERNEL",
        description: "Full-stack task management application with real-time updates.",
        tech: ["React", "Firebase", "Tailwind CSS"],
        problem: "Users needed real-time collaboration without refresh.",
        solution: "Built a reactive UI using Firebase Realtime Database.",
        outcome: "Enabled seamless team collaboration.",
        github: "https://github.com/Shubhamjadhav86",
        live: "#",
        code: "PRJ_02"
    },
    {
        title: "NEON_PORTFOLIO_V1",
        description: "Personal portfolio website to showcase skills and projects.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        problem: "Need for a professional online presence.",
        solution: "Designed and developed a responsive portfolio.",
        outcome: "Increased visibility and networking opportunities.",
        github: "https://github.com/Shubhamjadhav86",
        live: "#",
        code: "PRJ_03"
    },
]

export function Projects() {
    const sectionRef = useRef(null)
    const cardsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                opacity: 0,
                x: (i) => i % 2 === 0 ? -100 : 100,
                stagger: 0.2,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" ref={sectionRef} className="container py-24 md:py-32 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col items-center mb-16 space-y-4">
                <div className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">
                    Deployment_Logs.sys
                </div>
                <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                    FEATURED <span className="text-primary">PROJECTS</span>
                </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <div 
                        key={project.title} 
                        ref={(el) => { if (el) cardsRef.current[index] = el }}
                        className="group"
                    >
                        <Card className="relative h-full flex flex-col justify-between bg-black/40 border-white/10 rounded-none glass group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 left-0 p-4 text-[8px] font-mono text-white/20">
                                {project.code}
                            </div>
                            
                            <CardHeader className="pt-12">
                                <CardTitle className="text-xl font-bold tracking-widest text-white group-hover:text-primary transition-colors">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-muted-foreground font-light italic">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <Badge key={tech} variant="outline" className="rounded-none border-primary/20 text-primary/60 text-[10px] bg-primary/5">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                                
                                <div className="space-y-3 p-4 border border-white/5 bg-white/5 text-[11px] font-mono text-white/40 group-hover:text-white/60 transition-colors">
                                    <p><span className="text-primary/60">#_PROBLEM:</span> {project.problem}</p>
                                    <p><span className="text-primary/60">#_SOLUTION:</span> {project.solution}</p>
                                    <p><span className="text-primary/60">#_OUTCOME:</span> {project.outcome}</p>
                                </div>
                            </CardContent>

                            <CardFooter className="flex gap-4 pt-0">
                                <Button variant="ghost" size="sm" asChild className="w-full rounded-none border border-white/10 hover:border-primary hover:text-primary transition-all">
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" /> REPOSITORY
                                    </Link>
                                </Button>
                                <Button size="sm" asChild className="w-full rounded-none bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all">
                                    <Link href={project.live} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" /> LIVE_DEMO
                                    </Link>
                                </Button>
                            </CardFooter>

                            {/* Decorative Corner */}
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-primary/30 group-hover:border-primary transition-colors" />
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}
