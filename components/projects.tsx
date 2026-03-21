"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Code2, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
    {
        title: "E-Commerce Nucleus",
        description: "A high-performance e-commerce engine with real-time inventory and analytics. Features a custom 3D product viewer.",
        tech: ["Next.js", "TypeScript", "Three.js", "Stripe"],
        github: "https://github.com/Shubhamjadhav86",
        demo: "https://github.com/Shubhamjadhav86",
        color: "#00ffff"
    },
    {
        title: "AI Chat Matrix",
        description: "Real-time chat application with AI-powered moderation and sentiment analysis. Integrated with Google Gemini API.",
        tech: ["React", "Node.js", "Socket.io", "Gemini"],
        github: "https://github.com/Shubhamjadhav86",
        demo: "https://github.com/Shubhamjadhav86",
        color: "#bf40bf"
    },
    {
        title: "Portfolio 2026",
        description: "A premium developer portfolio featuring terminal preloaders, bento grids, and 3D interactive backgrounds.",
        tech: ["Next.js", "Tailwind", "Framer", "Lenis"],
        github: "https://github.com/Shubhamjadhav86",
        demo: "https://github.com/Shubhamjadhav86",
        color: "#00ffff"
    },
]

export function Projects() {
    return (
        <section id="projects" className="container py-48 border-b border-white/5">
            <div className="max-w-4xl mb-16">
                <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase">Featured Works</h2>
                <p className="text-muted-foreground text-lg">A collection of systems and interfaces I've engineered.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group relative flex flex-col glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all duration-500" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#00f5d4]/10 transition-colors">
                                    <Code2 className="w-6 h-6 text-[#00f5d4]" />
                                </div>
                                <div className="flex gap-2">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                                        <Github className="w-5 h-5 text-white/70" />
                                    </a>
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00f5d4] transition-colors">{project.title}</h3>
                            <p className="text-muted-foreground mb-8 text-sm leading-relaxed flex-grow line-clamp-3">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="px-3 py-1 text-[10px] font-mono rounded-full bg-white/5 text-[#00f5d4] border border-[#00f5d4]/20 uppercase tracking-widest">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            <Button variant="outline" className="w-full rounded-2xl h-12 border-white/10 hover:bg-[#00f5d4] hover:text-black hover:border-[#00f5d4] group-hover:shadow-[0_0_20px_rgba(0,245,212,0.2)] transition-all duration-300">
                                <Rocket className="w-4 h-4 mr-2" />
                                Live Demo
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
