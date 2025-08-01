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


    skillRefs.current.forEach((ref, index) => {
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
    <div id='skills' className='sec flex-center secton-padding px-5 bg-white relative'>
      <div className="absolute bottom-0 left-0 right-0 top-[0px] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className='mt-20' ref={containerRef}>
        <TitleHeader
          title='My TechStack'
          className='text-black'
          sub='Technologies I have worked with'
        />

        <div className='flex flex-col lg:flex-row gap-10 pt-20 pb-10 justify-center items-center lg:gap-20'>
          <div className='p-8 flex flex-wrap gap-6 bg-black rounded-2xl card-border lg:w-2/4 relative overflow-hidden'>
            {/* Background pattern */}
            <div className='absolute inset-0 opacity-10'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'></div>
            </div>

            {skillImages.map((skill, index) => (
              <div
                key={skill.name}
                ref={el => skillRefs.current[index] = el}
                className='relative group cursor-pointer'
                style={{ perspective: '1000px' }}
              >
                {/* Glow effect */}
                <div
                  className={`glow-effect absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl blur-lg opacity-0 -z-10`}
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
                    className={`name-overlay absolute inset-0 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center opacity-0`}
                    style={{ transform: 'rotateY(-180deg)' }}
                  >
                    <span className='text-white font-bold text-xs lg:text-sm text-center px-1 drop-shadow-lg'>
                      {skill.name}
                    </span>
                  </div>
                </div>

                {/* Particle effects */}
                <div className='absolute inset-0 pointer-events-none'>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${skill.color} rounded-full opacity-0 group-hover:animate-ping`}
                      style={{
                        top: `${20 + i * 30}%`,
                        left: `${10 + i * 40}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='lg:w-4/6 px-5'>
            <div>
              <ul className='flex flex-col gap-5'>
                <li className='list-disc text-lg text-black-50'>
                  <span className='text-black font-bold'>Front-End: </span>
                  HTML, CSS, JavaScript, React.Js, Next.Js.
                </li>
                <li className='list-disc text-lg text-black-50'>
                  <span className='text-black font-bold'>Back-End: </span>
                  Node.Js, ExpressJs.
                </li>
                <li className='list-disc text-lg text-black-50'>
                  <span className='text-black font-bold'>Mobile App: </span>
                  Flutter, Dart
                </li>
                <li className='list-disc text-lg text-black-50'>
                  <span className='text-black font-bold'>Databases: </span>
                  MongoDB, MySQL, PostgreSQL.
                </li>
                <li className='list-disc text-lg text-black-50'>
                  <span className='text-black font-bold'>Tools and Platform: </span>
                  Git, GitHub, Docker, AWS, Firebase, Vercel, Render.
                </li>
                <li className='list-disc text-lg text-black-50'>
                  <span className='text-black font-bold'>Others: </span>
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