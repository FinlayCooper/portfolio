import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Workflow from '@/components/sections/Workflow'
import TechStack from '@/components/sections/TechStack'

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <About />
      <Workflow />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </main>
  )
}
