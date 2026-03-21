"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const certificates = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "Dec 2024",
    color: "from-orange-500/20 to-orange-950/40",
    borderColor: "border-orange-500/20",
    accentColor: "#f97316",
    link: "#"
  },
  {
    id: 2,
    title: "React Advanced Certification",
    issuer: "Meta Blueprint",
    date: "Nov 2024",
    color: "from-cyan-500/20 to-cyan-950/40",
    borderColor: "border-cyan-500/20",
    accentColor: "#06b6d4",
    link: "#"
  },
  {
    id: 3,
    title: "Full Stack Web Developer",
    issuer: "Google Cloud",
    date: "Oct 2024",
    color: "from-blue-500/20 to-blue-950/40",
    borderColor: "border-blue-500/20",
    accentColor: "#3b82f6",
    link: "#"
  },
  {
    id: 4,
    title: "UI/UX Design Professional",
    issuer: "Adobe",
    date: "Sep 2024",
    color: "from-rose-500/20 to-rose-950/40",
    borderColor: "border-rose-500/20",
    accentColor: "#f43f5e",
    link: "#"
  },
  {
    id: 5,
    title: "Mobile App Development",
    issuer: "Apple Academy",
    date: "Aug 2024",
    color: "from-zinc-500/20 to-zinc-950/40",
    borderColor: "border-zinc-500/20",
    accentColor: "#71717a",
    link: "#"
  },
  {
    id: 6,
    title: "Data Science Mastery",
    issuer: "Coursera / IBM",
    date: "Jul 2024",
    color: "from-indigo-500/20 to-indigo-950/40",
    borderColor: "border-indigo-500/20",
    accentColor: "#6366f1",
    link: "#"
  },
  {
    id: 7,
    title: "Cyber Security Specialist",
    issuer: "CompTIA Security+",
    date: "Jun 2024",
    color: "from-emerald-500/20 to-emerald-950/40",
    borderColor: "border-emerald-500/20",
    accentColor: "#10b981",
    link: "#"
  },
  {
    id: 8,
    title: "Backend Engine Design",
    issuer: "Udemy Professional",
    date: "May 2024",
    color: "from-violet-500/20 to-violet-950/40",
    borderColor: "border-violet-500/20",
    accentColor: "#8b5cf6",
    link: "#"
  }
]

export function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Carousel settings: show 1 on mobile, 4 on desktop
  const next = () => {
    // We can scroll up to length - visibleCards
    const visibleCards = typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : 4
    setCurrentIndex((prev) => (prev + 1) % (certificates.length - visibleCards + 1))
  }

  const prev = () => {
    const visibleCards = typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : 4
    setCurrentIndex((prev) => (prev - 1 + (certificates.length - visibleCards + 1)) % (certificates.length - visibleCards + 1))
  }

  return (
    <section id="certificates" className="container py-24 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 px-4 relative z-10"
      >
        <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#00f5d4] mb-4">Credentials & Achievements</h2>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
          Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-rose-500">Certificates</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">
          A showcase of verified professional certifications. Hover to partially reveal the details.
        </p>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Horizontal Slider (Shared logic) */}
        <div className="relative overflow-visible">
          <motion.div 
            animate={{ x: `-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : 4))}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex gap-6 lg:gap-8"
          >
            {certificates.map((cert) => (
              <div 
                key={cert.id} 
                className="w-full lg:w-[calc(25%-1.5rem)] flex-shrink-0"
              >
                <CertificateCard cert={cert} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-col items-center mt-12 gap-8">
          <div className="flex items-center gap-8">
            <button 
              onClick={prev}
              disabled={currentIndex === 0}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            <div className="flex gap-3">
              {Array.from({ length: certificates.length - (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 3) }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                    i === currentIndex ? "bg-cyan-400 w-10 shadow-[0_0_10px_#22d3ee]" : "bg-white/10"
                  )}
                />
              ))}
            </div>

            <button 
              onClick={next}
              disabled={currentIndex >= certificates.length - (typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : 4)}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  )
}

function CertificateCard({ cert }: { cert: typeof certificates[0] }) {
  return (
    <motion.div 
      className="relative group w-full h-[400px] flex flex-col items-center justify-end"
      whileHover="hover"
      initial="initial"
    >
      {/* Certificate Paper - Partial Reveal Adjustments */}
      <motion.div 
        variants={{
          hover: { y: -120, rotateX: 0, scale: 1, zIndex: 10 }, // Reduced reveal height
          initial: { y: 60, rotateX: 10, scale: 0.9, zIndex: 0 }
        }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="absolute top-12 w-[88%] left-[6%] aspect-[3.2/4] bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 z-0 flex flex-col items-center border border-white/20"
      >
        {/* Certificate Content */}
        <div className="w-10 h-10 rounded-full border border-rose-900/10 flex items-center justify-center mb-3 opacity-60">
          <div className="w-7 h-7 rounded-sm border border-rose-900/20 rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-rose-900/10 -rotate-45" />
          </div>
        </div>
        
        <div className="w-full flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-rose-950/10" />
          <span className="text-[8px] font-mono uppercase tracking-widest text-rose-950/30 font-bold">Verified</span>
          <div className="h-px flex-1 bg-rose-950/10" />
        </div>
        
        <h3 className="text-[#0f172a] font-serif text-center text-[11px] font-black uppercase tracking-tight leading-none mb-2 px-2">
          {cert.title}
        </h3>

        <div className="w-12 h-px bg-rose-950/10 mb-2" />
        <p className="text-rose-950/50 font-serif italic text-[9px] text-center line-clamp-2">This certifies completion of professional requirements.</p>
        
        <div className="mt-auto w-full flex items-end justify-between px-2 pb-2">
          <div className="text-left">
            <p className="text-rose-950/60 font-bold font-mono text-[7px] uppercase">{cert.issuer}</p>
          </div>
          <div className="w-6 h-6 rounded-full border border-rose-900/10 flex items-center justify-center opacity-30 grayscale">
             <div className="w-3 h-3 bg-rose-900" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
          </div>
        </div>
      </motion.div>

      {/* Envelope Pocket */}
      <div 
        className={cn(
          "relative w-full h-[300px] rounded-[24px] p-6 flex flex-col items-center justify-end z-20 overflow-hidden border border-white/10 shadow-2xl transition-all duration-500",
          "bg-[#0a0a0b]/80 backdrop-blur-3xl group-hover:bg-[#0a0a0b]/40",
          "group-hover:border-white/20"
        )}
      >
        {/* Glow */}
        <div 
          className={cn(
            "absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br",
            cert.color
          )} 
        />
        
        {/* Top Curve Overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-12 bg-white/5 backdrop-blur-md border-b border-white/10" 
          style={{ clipPath: 'ellipse(70% 80% at 50% 0%)' }} 
        />
        
        {/* Pocket Content */}
        <div className="relative z-30 w-full text-center">
          <motion.div
            variants={{ hover: { y: -5, opacity: 0 } }}
            className="transition-all duration-500"
          >
            <h3 className="text-white font-black text-lg md:text-xl leading-[0.9] tracking-tighter mb-4">
              {cert.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-white/40 block text-sm font-mono tracking-[0.1em] mt-1 mb-1" : "block"}>
                  {word}
                </span>
              ))}
            </h3>
          </motion.div>

          {/* Details */}
          <motion.div 
            variants={{ hover: { y: -40 } }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[8px] text-[#00f5d4] font-mono uppercase tracking-[0.2em]">
              {cert.issuer}
            </div>
            
            <motion.a 
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-black text-[9px] hover:bg-[#00f5d4] transition-all group/btn"
            >
              VIEW CREDENTIAL <ExternalLink className="w-3 h-3" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Reflective Base Shadow */}
      <div 
        className="absolute -bottom-6 w-[85%] h-6 blur-2xl rounded-full transition-all duration-500 opacity-20 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${cert.accentColor} 0%, transparent 70%)` }} 
      />
    </motion.div>
  )
}
