import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Repos from "@/components/Repos";
import Contact, { Marquee } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll>
        <Background />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Skills />
          <Journey />
          <Repos />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
