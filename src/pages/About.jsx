import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import TitleHeader from '../components/TitleHeader'
import TechStack from '../sections/TechStack'
import ExperenceSection from '../sections/ExperenceSection'

const About = () => {
    return (
        <div className='min-h-screen pt-20 relative'>
            <div className='grid-pattern' />
            <div className='absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] mx-auto rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#e5484d1a,transparent)] pointer-events-none' />

            <header className='pt-16 pb-6 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <Link
                    to='/'
                    className='inline-flex items-center gap-2 text-blue-50 hover:text-accent transition-colors mb-8'
                >
                    <ArrowLeft size={20} />
                    <span className='hidden sm:inline'> Back to Home</span>
                </Link>

                <TitleHeader sub='About' title="Hi, I'm Daniel" />
                <p className='text-xl text-blue-50 max-w-2xl mx-auto text-center mt-6'>
                    A seasoned developer with a passion for crafting products that feel as good as they perform.
                </p>
            </header>

            <TechStack />
            <ExperenceSection />
        </div>
    )
}

export default About
