"use client"

import { motion } from "framer-motion"
import { Calendar, GraduationCap, Trophy } from "lucide-react"

const education = [
    {
        degree: "B.Tech – Computer Science & Design",
        institution: "MET Bhujbal Knowledge City",
        year: "2024 – Present",
        score: "7.8",
        scoreLabel: "GPA",
        description: [
            "Focused on full-stack development and modern web technologies.",
            "Actively building real-world projects and improving problem-solving skills.",
        ]
    },
    {
        degree: "Higher Secondary (Science)",
        institution: "Shree Chhatrapati Shivaji Maharaj High School",
        year: "2023",
        score: "75%",
        scoreLabel: "Percentage",
        description: [
            "Completed Higher Secondary Certificate with Science stream.",
            "Built strong foundation in Mathematics, Physics and Computer Science.",
        ]
    },
    {
        degree: "Secondary Education",
        institution: "Muktangan Educational Campus",
        year: "2022",
        score: "91.80%",
        scoreLabel: "Percentage",
        description: [
            "Achieved an outstanding score in the SSC examination.",
            "Demonstrated consistent dedication and academic excellence.",
        ]
    },
]

export function Experience() {
    return (
        <section id="experience" className="container py-48 border-b border-white/5">


            {/* ── Education Heading ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="text-center mb-24 relative z-10"
            >
                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#00f5d4] mb-4">
                    WHERE IT ALL STARTED
                </h2>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                    My{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-rose-500">
                        Education
                    </span>
                </h1>
                <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">
                    The academic milestones that shaped my technical foundation and problem-solving mindset.
                </p>
            </motion.div>

            {/* ── Education Timeline ── */}
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical glowing line */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f5d4] via-[#00f5d4]/50 to-transparent origin-top"
                />

                <div className="space-y-12">
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={`relative flex items-center justify-between md:justify-normal group ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Glowing dot */}
                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary z-10 shadow-[0_0_10px_#00ffff]" />

                            <div className="w-full md:w-[45%] pl-8 md:pl-0">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-8 glass rounded-3xl border border-white/5 group-hover:border-primary/30 transition-all duration-300"
                                >
                                    {/* Year */}
                                    <div className="flex items-center gap-2 text-primary font-mono text-xs mb-3 uppercase tracking-widest">
                                        <Calendar className="w-4 h-4" />
                                        {item.year}
                                    </div>

                                    {/* Degree */}
                                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                                        {item.degree}
                                    </h3>

                                    {/* Institution */}
                                    <div className="flex items-center gap-2 text-muted-foreground font-medium mb-5 uppercase text-sm">
                                        <GraduationCap className="w-4 h-4" />
                                        {item.institution}
                                    </div>

                                    {/* Score — highlighted block */}
                                    <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
                                        <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Trophy className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 leading-none mb-0.5">
                                                {item.scoreLabel}
                                            </p>
                                            <p className="text-xl font-black text-primary tracking-tight leading-none">
                                                {item.score}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description bullets */}
                                    <ul className="space-y-3">
                                        {item.description.map((desc, i) => (
                                            <li key={i} className="flex gap-3 text-muted-foreground group-hover:text-white/80 transition-colors">
                                                <span className="text-primary mt-1 text-xs">≫</span>
                                                <span className="leading-relaxed">{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
