"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { InteractiveBackground } from "@/components/interactive-background"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useLenis } from "lenis/react"

export function Hero() {
    const [text, setText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(150)

    const phrases = ["Software Developer", "Full Stack Engineer", "UI Architect"]

    const lenis = useLenis()

    const scrollToSection = (e: React.MouseEvent, href: string) => {
        e.preventDefault()
        lenis?.scrollTo(href, {
            offset: 0,
            duration: 2,
            easing: (t) => 1 - Math.pow(1 - t, 4) // Quart Out
        })
    }

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % phrases.length
            const fullPhrase = phrases[i]

            setText(isDeleting 
                ? fullPhrase.substring(0, text.length - 1) 
                : fullPhrase.substring(0, text.length + 1)
            )

            setTypingSpeed(isDeleting ? 100 : 150)

            if (!isDeleting && text === fullPhrase) {
                setTimeout(() => setIsDeleting(true), 2000)
            } else if (isDeleting && text === "") {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
            }
        }

        const timer = setTimeout(handleType, typingSpeed)
        return () => clearTimeout(timer)
    }, [text, isDeleting, loopNum, typingSpeed, phrases])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 pb-12">
            <InteractiveBackground />
            
            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center px-6 lg:px-20">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 space-y-6 lg:space-y-10 pt-12 lg:pt-0 text-left"
                >
                    <div className="space-y-2 lg:space-y-4">
                        <h3 className="text-lg md:text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2 h-8 mt-12 lg:mt-0">
                            {text}<span className="w-1.5 h-6 lg:h-8 bg-[#00f5d4] animate-pulse" />
                        </h3>
                        <h2 className="text-3xl md:text-6xl font-bold text-[#00f5d4] tracking-tight mb-2">
                            Hello, I&apos;m
                        </h2>
                        <h1 className="text-4xl sm:text-5xl lg:text-[7.5rem] font-bold text-white tracking-tighter leading-[0.9] lg:leading-[0.85] font-[family-name:var(--font-plus-jakarta)]">
                            Shubham <br /> Jadhav
                        </h1>
                    </div>
                    
                    <p className="text-base md:text-2xl text-white/50 max-w-xl leading-relaxed font-normal font-[family-name:var(--font-inter)] italic">
                        &quot;I build products, not just projects — designed to solve, scale, and stand out.&quot;
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 pt-4">
                        <Link href="#projects" onClick={(e) => scrollToSection(e, "#projects")}>
                            <button className="group relative px-6 lg:px-10 h-10 lg:h-14 bg-[#00f5d4] text-black rounded-full text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,245,212,0.5)] active:scale-95">
                                <span className="relative z-10">View My Work</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>
                        </Link>
                        
                        <Link href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
                            <button className="px-6 lg:px-10 h-10 lg:h-14 bg-white text-black rounded-full text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">
                                Contact Me
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 lg:gap-8 pt-4 lg:pt-6">
                        {[Linkedin, Github, Mail].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href={i === 2 ? "mailto:your@email.com" : "#"}
                                target={i === 2 ? undefined : "_blank"}
                                whileHover={{ scale: 1.3, color: "#00f5d4" }}
                                className="text-white/80 transition-colors"
                            >
                                <Icon className="w-5 h-5 lg:w-8 lg:h-8" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Visual (Desktop) / Background mascot (Mobile) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute lg:relative inset-0 lg:inset-auto flex items-center justify-center lg:justify-end z-10 lg:z-auto pointer-events-none lg:pointer-events-auto -mt-32 lg:mt-0"
                >
                    {/* Multi-layered Radial Glow */}
                    <div className="absolute w-full h-full lg:w-[150%] lg:h-[150%] bg-[#00f5d4]/10 blur-[80px] lg:blur-[180px] rounded-full pointer-events-none animate-pulse" />
                    
                    <div className="relative w-full max-w-[450px] lg:max-w-[650px] aspect-square flex items-center justify-center opacity-20 lg:opacity-100">
                        <Image 
                            src="/Avator.png" 
                            alt="Avatar" 
                            width={650}
                            height={650}
                            className="object-contain filter drop-shadow-[0_0_30px_rgba(0,245,212,0.2)]"
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        </section>
    )
}
