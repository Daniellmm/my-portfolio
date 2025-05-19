import LogoSection from "./sections/LogoSection"
import NavBar from "./components/NavBar"
import FeatureCards from "./sections/FeatureCards"
import Hero from "./sections/Hero"
import ShowcaseSection from "./sections/ShowcaseSection"
import ExperenceSection from "./sections/ExperenceSection"
import TechStack from "./sections/TechStack"
import TestimonialSection from "./sections/TestimonialSection"


const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <LogoSection />
      <FeatureCards />
      <ExperenceSection />
      <TechStack />
      <TestimonialSection />
    </>
  )
}

export default App