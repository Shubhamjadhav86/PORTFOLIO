"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Code2, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { TiltCard } from "@/components/ui/tilt-card"
import NextImage from "next/image"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function Projects() {
    const [projects, setProjects] = useState<any[]>([])
    const [visibleCount, setVisibleCount] = useState(3)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/projects`)
                if (!response.ok) throw new Error("Failed to fetch")
                const data = await response.json()
                setProjects(data)
            } catch (err) {
                console.warn("Backend not reachable. Falling back to local data.", err)
                setError(err instanceof Error ? err : new Error(String(err)))
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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    } as const

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
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-24 relative z-10"
            >
                {/* Mascot Avatar Integration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute -top-[105px] md:-top-[125px] left-[20%] md:left-[34%] -translate-x-1/2 w-64 h-64 md:w-80 md:h-80 opacity-60 lg:opacity-90 pointer-events-none z-20"
                >
                    <NextImage 
                        src="/sit.png" 
                        alt="Sitting Mascot" 
                        fill
                        className="object-contain filter drop-shadow-[0_0_50px_rgba(0,245,212,0.6)] brightness-125"
                        priority
                    />
                </motion.div>

                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#00f5d4] mb-4">ENGINEERED SOLUTIONS</h2>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-rose-500">Works</span>
                </h1>
                <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">A showcase of complex systems and refined user interfaces built by Shubham Jadhav.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {projects.slice(0, visibleCount).map((project: any, index: number) => (
                    <motion.div
                        key={project._id || index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            delay: (index % 3) * 0.1
                        }}
                        className="h-full"
                    >
                        <TiltCard shineColor="#00f5d4">
                            <motion.div 
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative flex flex-col h-full glass p-6 rounded-[2rem] border border-white/5 hover:border-[#00f5d4]/40 transition-all duration-500 overflow-hidden bg-[#0a0a0a]/50 shadow-2xl"
                            >
                                {/* Ambient Glow */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00f5d4]/5 blur-[60px] group-hover:bg-[#00f5d4]/10 transition-colors" />
                                
                                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-[#00f5d4]/20 transition-colors border border-white/5">
                                            <Code2 className="w-5 h-5 text-[#00f5d4]" />
                                        </div>
                                        <div className="flex gap-2 text-[10px] font-mono text-[#00f5d4]/60 uppercase tracking-widest">
                                            0{index + 1}
                                        </div>
                                    </div>
                                    
                                    {project.image && (
                                        <div className="w-full h-44 rounded-xl mb-6 overflow-hidden border border-white/5 group-hover:border-[#00f5d4]/30 transition-all shadow-2xl relative">
                                            <img src={project.image?.startsWith('http') ? project.image : `${BASE_URL}${project.image}`} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 brightness-75 group-hover:brightness-100" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        </div>
                                    )}

                                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#00f5d4] transition-colors tracking-tight line-clamp-1">{project.title}</h3>
                                    <p className="text-white/40 mb-8 text-[11px] leading-relaxed flex-grow line-clamp-2 italic tracking-wide">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.techStack && project.techStack.map((tech: string) => (
                                            <span key={tech} className="px-3 py-1 text-[8px] font-black rounded-lg bg-[#00f5d4]/5 text-[#00f5d4] border border-[#00f5d4]/20 uppercase tracking-widest transition-all hover:bg-[#00f5d4]/20">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Button asChild className="flex-1 rounded-xl h-12 bg-white text-black hover:bg-[#00f5d4] hover:shadow-[0_0_20px_#00f5d480] transition-all duration-500 font-black uppercase tracking-widest text-[10px]">
                                            <a href={project.liveLink}>
                                                <Rocket className="w-3.5 h-3.5 mr-2" />
                                                Live View
                                            </a>
                                        </Button>
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/20">
                                            <Github className="w-5 h-5 text-white/50 hover:text-white" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>


            {projects.length > 3 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 flex flex-wrap justify-center gap-4 relative z-20"
                >
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
                </motion.div>
            )}
        </section>
    )
}
