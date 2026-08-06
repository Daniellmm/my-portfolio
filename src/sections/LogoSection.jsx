import React from 'react'
import { skillImages } from '../constants'

const LogoIcon = ({ icon }) => {
    return (
        <div className='flex-none flex-center marquee-item grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300'>
            <img src={icon.imgPath} alt={icon.name} loading="lazy" />
        </div>
    )
}

const LogoSection = () => {
    return (
        <div className='md:my-20 my-10 relative'>
            <p className='eyebrow text-center mb-8'>Built with</p>

            <div className='gradient-edge'></div>
            <div className='gradient-edge'></div>

            <div className='marquee h-32'>
                <div className='marquee-box md:gap-12 gap-5'>
                    {[...skillImages, ...skillImages].map((icon, index) => (
                        <LogoIcon key={`${icon.imgPath}-${index}`} icon={icon} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LogoSection
