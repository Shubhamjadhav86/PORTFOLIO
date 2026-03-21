"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, MessageCircle, Send, ArrowUpRight, Globe, Clock, Smartphone, MapPin, CheckCircle2, ShieldCheck, Zap } from "lucide-react"
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
        name: "WhatsApp",
        value: "Direct Chat",
        icon: MessageCircle,
        href: "https://wa.me/910000000000",
        color: "#25D366"
    }
]

export function Contact() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [triggerFly, setTriggerFly] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    return (
        <section id="contact" className="container py-40 border-b border-white/5 relative overflow-hidden">
            {/* Victory Fly Animation - Triggered on Success */}
            <AnimatePresence>
                {triggerFly && (
                    <motion.div
                        initial={{ left: "-20%", top: "100%", scale: 0.5, opacity: 0 }}
                        animate={{
                            left: "120%",
                            top: "-20%",
                            scale: 4, 
                            opacity: [0, 1, 1, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1.5,
                            ease: "linear"
                        }}
                        onAnimationComplete={() => setTriggerFly(false)}
                        className="fixed z-[9999] pointer-events-none w-64 h-64"
                    >
                        <img 
                            src="/fly.png" 
                            alt="Flying Robot" 
                            className="w-full h-full object-contain -rotate-[15deg] drop-shadow-[0_0_30px_rgba(0,255,255,0.8)]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-center mb-24 relative z-10">
                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#00f5d4] mb-4">GET IN TOUCH</h2>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                    Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-rose-500">Me</span>
                </h1>
                <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">Let&apos;s build the future together. Reach out for collaborations or opportunities.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Main Contact Card */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.005 }}
                    className="lg:col-span-7 glass p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between group relative overflow-hidden h-full"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 group-hover:bg-primary/10 transition-all" />
                    
                    <div className="relative z-10">
                        <h3 className="text-4xl font-bold mb-6 tracking-tight leading-tight">
                            Got a project in mind? <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Let&apos;s Build it Together!</span>
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-md italic mb-8">
                            I&apos;m currently open to new opportunities and freelance collaborations. 
                            Turn your ideas into digital reality.
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const data = {
                                name: formData.get('name'),
                                email: formData.get('email'),
                                subject: formData.get('subject'),
                                message: formData.get('message')
                            };
                            try {
                                setIsSubmitting(true);
                                const { sendMessage } = await import('@/lib/admin-api');
                                await sendMessage(data);
                                setShowSuccess(true);
                                setTriggerFly(true); // Victory flight triggered
                                /* 
                                // Fly sound is temporarily disabled because /fly.mp3 is missing from public folder
                                try {
                                    const audio = new Audio('/fly.mp3');
                                    audio.volume = 0.4;
                                    audio.play();
                                } catch (err) {}
                                */
                                (e.target as HTMLFormElement).reset();
                            } catch (err) {
                                alert('Failed to send message');
                            } finally {
                                setIsSubmitting(false);
                            }
                        }} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-2">Name</label>
                                    <input name="name" placeholder="Shubham Jadhav" required className="bg-white/5 border border-white/10 p-5 rounded-2xl w-full focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-2">Email</label>
                                    <input name="email" type="email" placeholder="hello@example.com" required className="bg-white/5 border border-white/10 p-5 rounded-2xl w-full focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono text-sm" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-2">Subject</label>
                                <input name="subject" placeholder="Project Inquiry" required className="bg-white/5 border border-white/10 p-5 rounded-2xl w-full focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-primary font-bold ml-2">Message</label>
                                <textarea name="message" placeholder="Tell me about your vision..." required className="bg-white/5 border border-white/10 p-5 rounded-2xl w-full h-40 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono text-sm resize-none" />
                            </div>
                            <Button 
                                type="submit" 
                                size="lg" 
                                disabled={isSubmitting}
                                className="rounded-2xl h-16 px-10 text-base font-bold shadow-[0_10px_30px_rgba(0,255,255,0.2)] hover:shadow-[0_20px_40px_rgba(0,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto disabled:opacity-50"
                            >
                               {isSubmitting ? (
                                   <span className="flex items-center">
                                       <Zap className="w-5 h-5 mr-3 animate-pulse" />
                                       Transmitting...
                                   </span>
                               ) : (
                                   <>
                                       <Send className="w-5 h-5 mr-3" />
                                       Initiate Contact
                                   </>
                               )}
                            </Button>
                        </form>
                    </div>
                </motion.div>

                {/* Side Info Cards */}
                <div className="lg:col-span-5 flex flex-col gap-8 h-full">
                    {/* Status Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 rounded-[2.5rem] flex-1 flex flex-col justify-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] -z-10 group-hover:bg-green-500/20 transition-all" />
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                            </div>
                            <span className="text-sm font-mono uppercase tracking-widest text-green-500 font-bold">Current Status: Available</span>
                        </div>
                        <h4 className="text-2xl font-bold mb-4 tracking-tight">Based in India, <br /> Working Worldwide.</h4>
                        <div className="space-y-4 text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-primary" />
                                <p className="text-sm font-mono">Asia/Kolkata (GMT+5:30)</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-primary" />
                                <p className="text-sm font-mono">Mon - Sat: 9AM - 8PM</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-primary" />
                                <p className="text-sm font-mono">Remote Friendly / Hybrid</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Bento Grid */}
                    <div className="grid grid-cols-2 gap-6 flex-1">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.05, rotate: 2 }}
                                className="glass p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <method.icon className="w-6 h-6" style={{ color: method.color }} />
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{method.name}</p>
                                <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 absolute top-5 right-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Premium Success Notification Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            className="glass-premium p-1 px-1 rounded-[2.5rem] relative overflow-hidden pointer-events-auto max-w-md w-full"
                        >
                            <div className="bg-[#030712] rounded-[2.4rem] p-10 flex flex-col items-center text-center relative overflow-hidden">
                                {/* Background Glows */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[60px] -z-10" />
                                
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                    className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 relative"
                                >
                                    <CheckCircle2 className="w-12 h-12 text-primary" />
                                    <motion.div 
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border border-primary/50"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h4 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">SENT!</h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm font-mono opacity-60 tracking-wider">
                                        I&apos;ll be in touch soon.
                                    </p>
                                </motion.div>

                                <motion.div 
                                    className="mt-8 w-full h-1 bg-white/5 rounded-full overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.div 
                                        className="h-full bg-primary shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                                        initial={{ width: "100%" }}
                                        animate={{ width: "0%" }}
                                        transition={{ duration: 5, ease: "linear" }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer Sign-off */}
            <div className="mt-32 text-center text-muted-foreground font-mono text-sm opacity-50 uppercase tracking-[0.3em]">
                Designed & Built by Shubham Jadhav © 2026
            </div>
        </section>
    )
}
