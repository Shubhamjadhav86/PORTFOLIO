"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Send, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactMethods = [
    {
        name: "Email",
        value: "shubhamjadhav86@gmail.com",
        icon: Mail,
        href: "mailto:shubhamjadhav86@gmail.com",
        color: "#00ffff"
    },
    {
        name: "Github",
        value: "Shubhamjadhav86",
        icon: Github,
        href: "https://github.com/Shubhamjadhav86",
        color: "#ffffff"
    },
    {
        name: "Linkedin",
        value: "Connect with me",
        icon: Linkedin,
        href: "#",
        color: "#0077B5"
    },
    {
        name: "Twitter",
        value: "Follow me",
        icon: Twitter,
        href: "#",
        color: "#1DA1F2"
    }
]

export function Contact() {
    return (
        <section id="contact" className="container py-48 border-b border-white/5">
            <div className="max-w-4xl mb-16">
                <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase">GET IN TOUCH</h2>
                <p className="text-muted-foreground text-lg italic">Let&apos;s build the future together.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Contact Card */}
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="md:col-span-2 glass p-10 rounded-3xl flex flex-col justify-between group"
                >
                    <div>
                        <h3 className="text-3xl font-bold mb-6 tracking-tight">Got a project? <br /> <span className="text-primary">Let&apos;s Talk!</span></h3>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                            I&apos;m currently available for freelance work and full-time positions. 
                            If you have a project that needs a touch of digital magic, feel free to reach out.
                        </p>
                    </div>
                    <div className="mt-10">
                        <Button size="lg" className="rounded-2xl h-14 px-8 text-base font-bold shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all duration-300">
                           <Send className="w-5 h-5 mr-2" />
                           Send Message
                        </Button>
                    </div>
                </motion.div>

                {/* Social Links Bento */}
                <div className="md:col-span-1 grid grid-cols-2 gap-4">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={index}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="glass p-6 rounded-3xl flex flex-col items-center justify-center text-center group transition-all duration-300 hover:border-primary/30"
                        >
                            <div className="p-3 bg-white/5 rounded-2xl mb-3 group-hover:bg-white/10 transition-colors">
                                <method.icon className="w-5 h-5" style={{ color: method.color }} />
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{method.name}</p>
                            <ArrowUpRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 absolute top-4 right-4" />
                        </motion.a>
                    ))}
                </div>
            </div>
            
            {/* Footer Sign-off */}
            <div className="mt-32 text-center text-muted-foreground font-mono text-sm opacity-50 uppercase tracking-[0.3em]">
                Designed & Built by Shubham Jadhav © 2026
            </div>
        </section>
    )
}
