"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
]

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500",
                isScrolled ? "top-2" : "top-4"
            )}
        >
            <div className="glass border-primary/20 h-16 px-6 flex items-center justify-between relative overflow-hidden">
                {/* HUD Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/50 animate-pulse" />
                
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 border border-primary flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                        <span className="text-primary group-hover:text-black font-bold text-xs">SJ</span>
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase hidden sm:block">Shubham.Jadhav</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-8 text-[10px] font-bold tracking-[0.3em] uppercase">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="transition-all hover:text-primary relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>
                    <div className="h-4 w-[1px] bg-white/10 mx-2" />
                    <Button variant="ghost" size="sm" asChild className="text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-black transition-all">
                        <a href="/resume.pdf" download="Shubham_Jadhav_Resume.pdf">
                            DOWNLOAD_CV
                        </a>
                    </Button>
                </div>

                <button
                    className="md:hidden text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-2 glass border-primary/20 p-6 animate-in slide-in-from-top-4 duration-300">
                    <nav className="flex flex-col gap-6 text-[10px] font-bold tracking-[0.3em] uppercase">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="transition-all hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-black" asChild>
                            <a href="/resume.pdf" download="Shubham_Jadhav_Resume.pdf">
                                DOWNLOAD_CV
                            </a>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}
