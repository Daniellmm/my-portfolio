import React from 'react'
import TitleHeader from '../components/TitleHeader'
import { testimonials } from '../constants'
import GlowCard from '../components/GlowCard'

const TestimonialSection = () => {
  return (
    <div id='testimonials' className='sec flex-center section-padding'>
        <div className='w-full h-full md:px-10 px-1'>
            <TitleHeader 
            title='What Clients Say About Me'
            sub='Testimonials'
            />
            <div className='md:columns-3 columns-1 mt-16'>
                {
                    testimonials.map(({name, review}) => (
                        <GlowCard card={{review}}>
                            <p className='font-bold'>{name}</p>
                        </GlowCard>
                    ))
                }

            </div>
        </div>
    </div>
  )
}

export default TestimonialSection