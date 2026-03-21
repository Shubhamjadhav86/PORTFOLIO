"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
]

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header 
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500",
                isScrolled 
                    ? "bg-black/60 backdrop-blur-xl border-b border-primary/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
                    : "bg-transparent py-8"
            )}
        >
            <nav className="container flex items-center justify-between px-6 lg:px-20">
                <Link href="/" className="group flex items-center gap-2">
                    <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                        <Image 
                            src="/logo.png" 
                            alt="Logo" 
                            fill 
                            className="object-contain filter hover:brightness-125 transition-all duration-300"
                            priority
                        />
                    </div>
                </Link>
                
                <div className="flex items-center gap-6 md:gap-10">
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className="text-[10px] font-bold text-white/50 hover:text-[#00f5d4] transition-all duration-300 uppercase tracking-[0.2em] relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f5d4] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f5d4]" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Button className="hidden sm:flex bg-[#ff2d55] hover:bg-[#ff2d55]/90 text-white rounded-full px-6 h-10 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(255,45,85,0.4)]">
                            Reach Out
                        </Button>

                        {/* Mobile Menu Button - Animated Hamburger */}
                        <button 
                            className="lg:hidden w-10 h-10 flex items-center justify-center relative z-[60]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <div className="flex flex-col gap-1.5 w-6">
                                <motion.span 
                                    animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    className="w-full h-0.5 bg-[#00f5d4] block rounded-full shadow-[0_0_10px_#00f5d4]"
                                />
                                <motion.span 
                                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    className="w-full h-0.5 bg-[#00f5d4] block rounded-full shadow-[0_0_10px_#00f5d4]"
                                />
                                <motion.span 
                                    animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                    className="w-full h-0.5 bg-[#00f5d4] block rounded-full shadow-[0_0_10px_#00f5d4]"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 lg:hidden overflow-hidden"
                    >
                        {/* Background with Glowing Blobs */}
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00f5d4]/10 blur-[120px] rounded-full" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff2d55]/10 blur-[120px] rounded-full" />
                        
                        <div className="relative h-full flex flex-col items-center justify-center gap-12 px-6">
                            <div className="flex flex-col items-start gap-8">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group"
                                    >
                                        <Link 
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-baseline gap-4 text-4xl font-black text-white hover:text-[#00f5d4] transition-all duration-300 uppercase tracking-tighter"
                                        >
                                            <span className="text-xs font-mono text-[#00f5d4]/50 group-hover:text-[#00f5d4]">
                                                0{i + 1}
                                            </span>
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: navItems.length * 0.1 }}
                                className="pt-8"
                            >
                                <Button className="bg-[#ff2d55] text-white rounded-full px-12 h-16 text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(255,45,85,0.4)] hover:scale-105 active:scale-95 transition-all">
                                    Reach Out
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
