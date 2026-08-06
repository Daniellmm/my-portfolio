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
                    testimonials.map((testimonial, index) => (
                        <GlowCard card={testimonial} index={index} key={testimonial.name}>
                            <div className='flex items-center gap-3 pt-4 mt-1 border-t border-white/5'>
                                <img
                                    src={testimonial.imgPath}
                                    alt={testimonial.name}
                                    className='size-11 rounded-full object-cover'
                                />
                                <div>
                                    <p className='font-semibold text-white-50'>{testimonial.name}</p>
                                    <p className='text-blue-50 text-sm'>{testimonial.mentions}</p>
                                </div>
                            </div>
                        </GlowCard>
                    ))
                }

            </div>
        </div>
    </div>
  )
}

export default TestimonialSection
