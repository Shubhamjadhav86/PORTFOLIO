"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Code2, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { TiltCard } from "@/components/ui/tilt-card"

const BASE_URL = 'http://localhost:5000'

export function Projects() {
    const [projects, setProjects] = useState<any[]>([])
    const [visibleCount, setVisibleCount] = useState(3)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/projects')
                if (!response.ok) throw new Error("Failed to fetch")
                const data = await response.json()
                setProjects(data)
            } catch (err) {
                console.warn("Backend not reachable. Falling back to local data.", err)
                setError(true)
                setProjects([]) 
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [])

    const showMore = () => {
        setVisibleCount((prev: number) => Math.min(prev + 3, projects.length))
    }

    if (loading) return <div className="py-24 text-center font-mono animate-pulse text-cyan-400 uppercase tracking-widest">Initialising Project Modules...</div>
    
    if (error && projects.length === 0) return (
        <div className="py-12 px-6 text-center border border-yellow-500/20 bg-yellow-500/5 rounded-2xl mx-auto max-w-xl">
             <p className="text-yellow-500 font-mono text-xs">⚠️ BACKEND_SERVICE_OFFLINE: Connect your MongoDB and start the server.</p>
        </div>
    )
    
    if (projects.length === 0) return null

    return (
        <section id="projects" className="container py-48 border-b border-white/5 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
            
            <div className="text-center mb-24 relative z-10">
                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#00f5d4] mb-4">ENGINEERED SOLUTIONS</h2>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-rose-500">Works</span>
                </h1>
                <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">A showcase of complex systems and refined user interfaces built by Shubham Jadhav.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {projects.slice(0, visibleCount).map((project: any, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full"
                    >
                        <TiltCard>
                            <div className="group relative flex flex-col h-full glass p-6 rounded-[2rem] border border-white/5 hover:border-[#00f5d4]/30 transition-all duration-500 overflow-hidden bg-[#0a0a0a]/50">
                                {/* Ambient Glow */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00f5d4]/5 blur-[60px] group-hover:bg-[#00f5d4]/10 transition-colors" />
                                
                                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-[#00f5d4]/10 transition-colors border border-white/5">
                                            <Code2 className="w-5 h-5 text-[#00f5d4]" />
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5">
                                                <Github className="w-4 h-4 text-white/70" />
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {project.image && (
                                        <div className="w-full h-40 rounded-xl mb-5 overflow-hidden border border-white/5 group-hover:border-[#00f5d4]/20 transition-all shadow-inner">
                                            <img src={project.image?.startsWith('http') ? project.image : `${BASE_URL}${project.image}`} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-90 group-hover:brightness-110" />
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00f5d4] transition-colors tracking-tight">{project.title}</h3>
                                    <p className="text-white/40 mb-6 text-xs leading-relaxed flex-grow line-clamp-2 italic">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {project.techStack && project.techStack.map((tech: string) => (
                                            <span key={tech} className="px-2.5 py-1 text-[9px] font-mono rounded-full bg-white/5 text-[#00f5d4] border border-[#00f5d4]/10 uppercase tracking-tighter">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <Button asChild variant="outline" className="w-full rounded-xl h-10 border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest hover:bg-[#00f5d4] hover:text-black hover:border-[#00f5d4] transition-all duration-300 transform group-hover:translate-z-10 shadow-sm">
                                        <a href={project.liveLink}>
                                            <Rocket className="w-3.5 h-3.5 mr-2" />
                                            Launch System
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>

            {projects.length > 3 && (
                <div className="mt-16 flex flex-wrap justify-center gap-4 relative z-20">
                    {visibleCount < projects.length ? (
                        <Button 
                            onClick={showMore}
                            variant="outline" 
                            className="px-8 py-6 rounded-full border-cyan-500/20 bg-cyan-500/5 text-[#00f5d4] hover:bg-[#00f5d4] hover:text-black hover:border-[#00f5d4] transition-all duration-500 font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(0,245,212,0.1)]"
                        >
                            Explore More Modules ({projects.length - visibleCount} Remaining)
                        </Button>
                    ) : (
                        <Button 
                            onClick={() => setVisibleCount(3)}
                            variant="outline" 
                            className="px-8 py-6 rounded-full border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-black hover:border-rose-500 transition-all duration-500 font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(255,45,85,0.1)]"
                        >
                            Collapse Modules
                        </Button>
                    )}
                </div>
            )}
        </section>
    )
}
