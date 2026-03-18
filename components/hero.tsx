"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="container relative flex min-h-screen flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="space-y-6 z-10"
            >
                <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-primary uppercase border border-primary/30 rounded-full glass glow-primary">
                    Protocol: Portfolio v2.0
                </div>
                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-primary/40 glow-primary leading-[1.1]">
                    SHUBHAM <br className="hidden md:block" /> JADHAV
                </h1>
                <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-2xl sm:leading-8 font-light italic">
                    Architecting Digital Horizons through Full Stack Innovation.
                </p>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-col sm:flex-row gap-6 z-10"
            >
                <Button asChild size="lg" className="h-14 px-8 rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all duration-500 glow-primary">
                    <Link href="#projects">
                        INITIALIZE PROJECTS <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-14 px-8 rounded-none border-white/20 hover:border-primary/50 transition-all duration-500">
                    <a href="/resume.pdf" download="Shubham_Jadhav_Resume.pdf">
                        ACQUIRE DOSSIER <Download className="ml-2 h-5 w-5" />
                    </a>
                </Button>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
        </section>
    )
}
