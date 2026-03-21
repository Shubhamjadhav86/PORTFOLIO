"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

const experience = [
    {
        role: "Freelance Full Stack Developer",
        company: "Self-Employed",
        duration: "2024 - Present",
        description: [
            "Architected responsive interfaces using React and Tailwind CSS.",
            "Engineered secure backend kernels with Node/Express.",
            "Optimized performance to 95+ Lighthouse scores.",
        ]
    },
    {
        role: "Open Source Contributor",
        company: "Github",
        duration: "2023 - 2024",
        description: [
            "Contributed to various React and Tailwind based UI libraries.",
            "Fixed critical bugs and improved documentation.",
            "Collaborated with developers globally to enhance DX.",
        ]
    }
]

export function Experience() {
    return (
        <section id="experience" className="container py-48 border-b border-white/5">
            <div className="text-center mb-24 relative z-10">
                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#00f5d4] mb-4">PROFESSIONAL TIMELINE</h2>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                    Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-rose-500">Journey</span>
                </h1>
                <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">A timeline of high-impact contributions and technical leadership throughout my career.</p>
            </div>
            
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                
                <div className="space-y-12">
                    {experience.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex items-center justify-between md:justify-normal group ${
                                index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Dot */}
                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary z-10 shadow-[0_0_10px_#00ffff]" />
                            
                            {/* Content Card */}
                            <div className="w-full md:w-[45%] pl-8 md:pl-0">
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className="p-8 glass rounded-3xl border border-white/5 group-hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2 text-primary font-mono text-xs mb-3 uppercase tracking-widest">
                                        <Calendar className="w-4 h-4" />
                                        {item.duration}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{item.role}</h3>
                                    <div className="flex items-center gap-2 text-muted-foreground font-medium mb-6 uppercase text-sm">
                                        <Briefcase className="w-4 h-4" />
                                        {item.company}
                                    </div>
                                    <ul className="space-y-3">
                                        {item.description.map((desc, i) => (
                                            <li key={i} className="flex gap-3 text-muted-foreground group-hover:text-white/80 transition-colors">
                                                <span className="text-primary mt-1 text-xs">≫</span>
                                                <span className="leading-relaxed">{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
