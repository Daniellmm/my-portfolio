import React from 'react'
import { words } from '../constants'
import Button from '../components/Button'
import HeroExperience from '../components/HeroModels/HeroExperience'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import AnimatedCounter from '../components/AnimatedCounter'


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
    <section id='hero' className=' relative overflow-hidden'>
      <div className=' absolute top-0 left-0 z-10'>
        <img src="/images/bg.png" alt="backgroung" />
      </div>

      <div className='hero-layout flex flex-col md:flex-row justify-center items-center gap-y-10'>
        {/* left side for the text  */}
        <header className='flex flex-co justify-center items-start md:w-full w-screen md:px-20 px-5'>
          <div className='flex flex-col gap-7'>
            <div className='hero-text'>
              <h1>Shaping
                <span className='slide'>
                  <span className='wrapper'>
                    {words.map((word) => (
                      <span key={word.text} className='flex items-center pr-5 gap-1 md:gap-3 pb-2'>
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
              <h1>into Real Project</h1>
              <h1>that Deliver Results </h1>
            </div>

            <p className=' text-white-50 md:text-xl relative z-10 pointer-events-none'>
              Hi I am Daniel a sessioned developer with a passion for code
            </p>

            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text="See my Work"
            />
          </div>
        </header>

        <div className='w-full flex justify-center items-center '>
          <div className=' h-[350px] w-[350px] rounded-[100%]'>
            <img src="/images/dcoder.png" alt="" className='h-full w-full rounded-full' />
          </div>
        </div>

        {/* right side for the 3d model */}
        {/* <figure>
          <div className='hero-3d-layout'>
            <HeroExperience />
          </div>
        </figure> */}

        {/* i think for now i will add anothen thing here */}

      </div>
      <AnimatedCounter />
    </section>
  )
}

export default Hero