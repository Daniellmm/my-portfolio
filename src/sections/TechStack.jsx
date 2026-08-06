import React, { useEffect, useRef } from 'react'
import TitleHeader from '../components/TitleHeader'
import { gsap } from 'gsap'
import { skillImages } from '../constants'


const TechStack = () => {
  const skillRefs = useRef([])
  const containerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    )


    gsap.fromTo(skillRefs.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: -180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    )


    skillRefs.current.forEach((ref) => {
      if (!ref) return

      const img = ref.querySelector('.skill-image')
      const nameOverlay = ref.querySelector('.name-overlay')
      const glowEffect = ref.querySelector('.glow-effect')

      const handleMouseEnter = () => {
        const tl = gsap.timeline()

        tl.to(ref, {
          scale: 1.15,
          rotation: 360,
          duration: 0.6,
          ease: "power2.out"
        })
          .to(img, {
            rotationY: 180,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0.1)
          .to(nameOverlay, {
            rotationY: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0.4)
          .to(glowEffect, {
            opacity: 0.8,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
          }, 0)

        gsap.to(ref, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      }

      // Mouse leave animation
      const handleMouseLeave = () => {
        gsap.killTweensOf(ref)

        const tl = gsap.timeline()

        tl.to(nameOverlay, {
          rotationY: -180,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut"
        })
          .to(img, {
            rotationY: 0,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0.1)
          .to(ref, {
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }, 0)
          .to(glowEffect, {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          }, 0)
      }

      ref.addEventListener('mouseenter', handleMouseEnter)
      ref.addEventListener('mouseleave', handleMouseLeave)

      // Cleanup
      return () => {
        ref.removeEventListener('mouseenter', handleMouseEnter)
        ref.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [])

  return (
    <div id='skills' className='sec flex-center section-padding px-5 relative'>
      <div className='grid-pattern' />

      <div className='relative z-10' ref={containerRef}>
        <TitleHeader
          title='My TechStack'
          sub='Technologies I have worked with'
        />

        <div className='flex flex-col lg:flex-row gap-10 pt-20 pb-10 justify-center items-center lg:gap-20'>
          <div className='p-8 flex flex-wrap gap-6 card-border rounded-2xl lg:w-2/4 relative overflow-hidden'>
            {skillImages.map((skill, index) => (
              <div
                key={skill.name}
                ref={el => skillRefs.current[index] = el}
                className='relative group cursor-pointer'
                style={{ perspective: '1000px' }}
              >
                {/* Glow effect */}
                <div
                  className='glow-effect absolute inset-0 bg-accent rounded-xl blur-lg opacity-0 -z-10'
                ></div>

                {/* Main container */}
                <div className='relative lg:size-20 size-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20'>
                  {/* Original image */}
                  <img
                    src={skill.imgPath}
                    alt={skill.name}
                    className='skill-image absolute inset-0 w-full h-full object-contain p-2 rounded-xl bg-white/90'
                  />

                  {/* Name overlay (initially hidden and flipped) */}
                  <div
                    className='name-overlay absolute inset-0 bg-accent rounded-xl flex items-center justify-center opacity-0'
                    style={{ transform: 'rotateY(-180deg)' }}
                  >
                    <span className='text-white font-bold text-xs lg:text-sm text-center px-1'>
                      {skill.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='lg:w-4/6 px-5'>
            <div>
              <ul className='flex flex-col gap-5'>
                <li className='list-disc text-lg text-blue-50'>
                  <span className='text-white-50 font-bold'>Front-End: </span>
                  HTML, CSS, JavaScript, React.JS, Next.JS.
                </li>
                <li className='list-disc text-lg text-blue-50'>
                  <span className='text-white-50 font-bold'>Back-End: </span>
                 Nest.JS Node.JS, Express.JS.
                </li>
                <li className='list-disc text-lg text-blue-50'>
                  <span className='text-white-50 font-bold'>Mobile App: </span>
                  React Native, Expo.
                </li>
                <li className='list-disc text-lg text-blue-50'>
                  <span className='text-white-50 font-bold'>Databases: </span>
                  MongoDB, MySQL, PostgreSQL.
                </li>
                <li className='list-disc text-lg text-blue-50'>
                  <span className='text-white-50 font-bold'>Tools and Platform: </span>
                  Git, GitHub, Docker, AWS, Firebase, Vercel, Render.
                </li>
                <li className='list-disc text-lg text-blue-50'>
                  <span className='text-white-50 font-bold'>Others: </span>
                  RESTFUL APIs, GraphQL, WebSockets, Redux, Tailwind CSS.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechStack
