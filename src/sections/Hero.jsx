import React, { lazy, Suspense } from 'react'
import { words } from '../constants'
import Button from '../components/Button'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import AnimatedCounter from '../components/AnimatedCounter'

const HeroExperience = lazy(() => import('../components/HeroModels/HeroExperience'))

const Hero = () => {

  useGSAP(() => {
    gsap.fromTo('.hero-text h1',
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.inOut',
      }
    )
  })
  return (
    <div id='hero' className='sec relative overflow-hidden'>
      <div className='grid-pattern' />

      <div className='hero-layout flex flex-col md:flex-row justify-center items-center gap-y-10'>
        {/* left side for the text  */}
        <header className='flex justify-start items-start md:w-full w-screen md:px-20 px-5'>
          <div className='flex flex-col gap-7'>
            <div className='hero-text'>
              <h1>Shaping
                <span className='slide'>
                  <span className='wrapper'>
                    {words.map((word, index) => (
                      <span key={`${word.text}-${index}`} className='flex items-center pr-5 gap-1 md:gap-3 pb-2'>
                        <img src={word.imgPath}
                          alt={word.text}
                          className='xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white/50'
                        />

                        <span>
                          {word.text}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className='text-blue-50 md:text-xl relative z-10 pointer-events-none max-w-lg'>
              Hi, I&apos;m Daniel — a seasoned developer with a passion for crafting products that feel as good as they perform.
            </p>

            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text="See my Work"
            />
          </div>
        </header>

        {/* right side for the 3d model */}
        <figure className='hero-3d-layout'>
          <Suspense fallback={null}>
            <HeroExperience />
          </Suspense>
        </figure>
      </div>
      <div className='mt-24 md:mt-5'>
        <AnimatedCounter />
      </div>
    </div>
  )
}

export default Hero
