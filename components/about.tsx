"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function About() {
    const sectionRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                opacity: 0,
                x: -100,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1,
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="about" ref={sectionRef} className="container relative py-24 md:py-32 lg:py-48 mt-[-10vh]">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            
            <div ref={textRef} className="mx-auto flex max-w-[58rem] flex-col items-start gap-8 relative">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-[1px] bg-primary" />
                    <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">Biography.exe</span>
                </div>
                
                <h2 className="font-extrabold text-5xl leading-[1.1] sm:text-6xl md:text-8xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
                    ABOUT <span className="text-primary">ME</span>
                </h2>

                <div className="grid gap-8 md:grid-cols-[1fr_200px]">
                    <div className="space-y-6">
                        <p className="leading-relaxed text-muted-foreground text-xl md:text-2xl font-light">
                            I am a Full Stack Developer with a passion for building efficient,
                            scalable web applications. My focus is not just on writing code, but on
                            solving real-world problems through <span className="text-white font-medium">clean architecture</span> and user-centric
                            design.
                        </p>
                        <p className="leading-relaxed text-muted-foreground text-xl md:text-2xl font-light">
                            Currently, I am architecting solutions using the <span className="text-primary">MERN</span> stack and <span className="text-primary">Next.js</span>, 
                            bridging the gap between frontend interactivity and robust backend logic.
                        </p>
                    </div>
                    
                    <div className="hidden md:flex flex-col gap-4 border-l border-white/10 pl-8 pointer-events-none opacity-50">
                        <div className="text-[10px] font-mono">STATUS: ACTIVE</div>
                        <div className="text-[10px] font-mono">LOCATION: EARTH.JS</div>
                        <div className="text-[10px] font-mono">CORE: FULL_STACK</div>
                        <div className="w-full h-[1px] bg-white/10 mt-4" />
                        <div className="text-[10px] font-mono animate-pulse text-primary">SCANNING_FOR_OPPORTUNITIES...</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
