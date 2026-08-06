import React from 'react'
import FeatureCards from "../sections/FeatureCards"
import Hero from "../sections/Hero"
import ShowcaseSection from "../sections/ShowcaseSection"
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
            <TestimonialSection />
            <Contact />
        </>
    )
}

export default HomePage