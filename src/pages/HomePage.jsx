import React from 'react'
import FeatureCards from "../sections/FeatureCards"
import Hero from "../sections/Hero"
import ShowcaseSection from "../sections/ShowcaseSection"
import ExperenceSection from "../sections/ExperenceSection"
import TechStack from "../sections/TechStack"
import TestimonialSection from "../sections/TestimonialSection"
import Contact from "../sections/Contact"
import LogoSection from "../sections/LogoSection"


const HomePage = () => {
    return (
        <>
            <Hero />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperenceSection />
            <TechStack />
            <TestimonialSection />
            <Contact />
        </>
    )
}

export default HomePage