"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { sendContactEmail } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Mail } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button 
            type="submit" 
            className="w-full rounded-none bg-primary/20 border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all group overflow-hidden relative" 
            disabled={pending}
        >
            <span className="relative z-10">{pending ? "UPLOADING_DATA..." : "ESTABLISH_CONNECTION"}</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Button>
    )
}

const initialState = {
    message: "",
    errors: {},
}

export function Contact() {
    const [state, formAction] = useActionState(sendContactEmail, initialState)
    const sectionRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="contact" ref={sectionRef} className="container py-24 md:py-32 relative">
            <div ref={contentRef} className="grid gap-16 md:grid-cols-2 items-center">
                <div className="flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                        <div className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">
                            Communication_Channel.eth
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            GET IN <span className="text-primary">TOUCH</span>
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground text-xl font-light leading-relaxed">
                            Currently available for new opportunities. My inbox is always open 
                            for <span className="text-white">innovation</span> and 
                            <span className="text-white"> collaboration</span>.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 mt-8">
                        <a href="mailto:shubhamjadhav86@gmail.com" className="group flex items-center gap-4 text-muted-foreground hover:text-primary transition-all">
                            <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <span className="font-mono text-sm tracking-widest uppercase">shubhamjadhav86@gmail.com</span>
                        </a>
                        <a href="https://linkedin.com/in/shubhamjadhav86" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-muted-foreground hover:text-primary transition-all">
                            <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </div>
                            <span className="font-mono text-sm tracking-widest uppercase">LinkedIn Protocol</span>
                        </a>
                        <a href="https://github.com/Shubhamjadhav86" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-muted-foreground hover:text-primary transition-all">
                            <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </div>
                            <span className="font-mono text-sm tracking-widest uppercase">GitHub Kernel</span>
                        </a>
                    </div>
                </div>

                <div className="relative">
                    {/* HUD Frame Decorations */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-primary/40" />
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-primary/40" />
                    
                    <Card className="bg-black/40 border-white/10 rounded-none glass backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 text-[8px] font-mono text-white/10">
                            MSG_FORM_V3.0
                        </div>
                        
                        <CardHeader>
                            <CardTitle className="text-sm font-bold tracking-[0.2em] uppercase text-white/60">
                                Send a Message
                            </CardTitle>
                            <CardDescription className="text-xs font-light italic">
                                Initialize encrypted communication...
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                            <form action={formAction} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[10px] font-bold tracking-widest uppercase text-white/40">NAME_INPUT</Label>
                                    <Input id="name" name="name" className="rounded-none border-white/10 bg-white/5 focus-visible:ring-primary focus-visible:border-primary transition-all" placeholder="IDENTIFY YOURSELF" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[10px] font-bold tracking-widest uppercase text-white/40">EMAIL_ADDRESS</Label>
                                    <Input id="email" name="email" type="email" className="rounded-none border-white/10 bg-white/5 focus-visible:ring-primary focus-visible:border-primary transition-all" placeholder="RETURN_ADDR" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-[10px] font-bold tracking-widest uppercase text-white/40">MESSAGE_DATA</Label>
                                    <Textarea id="message" name="message" className="rounded-none border-white/10 bg-white/5 focus-visible:ring-primary focus-visible:border-primary transition-all min-h-[120px]" placeholder="YOUR_COMMANDS..." required />
                                </div>
                                <SubmitButton />
                                
                                {state?.message && (
                                    <div className={`mt-4 p-3 border text-xs font-mono uppercase tracking-widest ${state.success ? "border-green-500/50 bg-green-500/10 text-green-500" : "border-red-500/50 bg-red-500/10 text-red-500"}`}>
                                        {state.success ? "SYSTEM_MSG: SUCCESSFUL_TRANSMISSION" : `SYSTEM_ERR: ${state.message}`}
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
