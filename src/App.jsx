import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Preloader from "./components/Preloader"
import PageTransition from "./components/PageTransition"
import CustomCursor from "./components/CustomCursor"
import ScrollProgress from "./components/ScrollProgress"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"

const Projects = lazy(() => import("./pages/Projects"))
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"))

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const lenis = new Lenis()
    lenis.on("scroll", ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollProgress />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <NavBar />
      <Suspense fallback={<div className="min-h-screen bg-black-100" />}>
        <PageTransition>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </PageTransition>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
