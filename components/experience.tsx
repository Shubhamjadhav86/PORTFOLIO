"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experience = [
    {
        role: "FREELANCE_FULL_STACK_DEV",
        company: "SELF_EMPLOYED",
        duration: "2024 - PRESENT",
        description: [
            "Architected responsive interfaces using React and Tailwind CSS.",
            "Engineered secure backend kernels with Node/Express.",
            "Optimized performance to 95+ Lifecycle scores.",
        ],
        code: "EXP_01"
    },
]

export function Experience() {
    const sectionRef = useRef(null)
    const itemsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(itemsRef.current, {
                opacity: 0,
                x: -50,
                stagger: 0.3,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" ref={sectionRef} className="container py-24 md:py-32 relative">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <div className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">
                    Execution_History.log
                </div>
                <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                    WORK <span className="text-primary">EXPERIENCE</span>
                </h2>
            </div>

            <div className="mx-auto max-w-4xl space-y-12">
                {experience.map((item, index) => (
                    <div 
                        key={index} 
                        ref={(el) => { if (el) itemsRef.current[index] = el }}
                        className="relative pl-12 group"
                    >
                        {/* Vertical Line */}
                        <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 group-hover:bg-primary/50 transition-colors" />
                        
                        {/* Pulse Node */}
                        <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 bg-primary rounded-full glow-primary animate-pulse" />
                        
                        <div className="glass border-white/5 p-8 group-hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 text-[8px] font-mono text-white/10">
                                {item.code}
                            </div>
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold tracking-wider text-white group-hover:text-primary transition-colors">
                                        {item.role}
                                    </h3>
                                    <p className="text-primary/60 font-mono text-xs tracking-widest mt-1">
                                        {item.company} // {item.duration}
                                    </p>
                                </div>
                            </div>
                            
                            <ul className="space-y-4">
                                {item.description.map((desc, i) => (
                                    <li key={i} className="flex items-start gap-3 text-muted-foreground font-light text-lg">
                                        <span className="text-primary mt-1.5 text-[10px]">▶</span>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="absolute bottom-0 right-0 w-16 h-1 bg-gradient-to-l from-primary/30 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
