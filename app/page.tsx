import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { SkillsPlayground } from "@/components/skills-playground"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Certificates } from "@/components/certificates"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <SkillsPlayground />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </div>
  )
}
