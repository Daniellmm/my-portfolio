import React, { useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const projectRef1 = useRef(null);
    const projectRef2 = useRef(null);
    const projectRef3 = useRef(null);

        useGSAP(() => {
            const projects = [projectRef1.current, projectRef2.current, projectRef3.current];
            projects.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    {
                        y: 50, opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        delay: 0.3 * (index + 1),
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom-=100'
                        }
                    }
                )
            })

            gsap.fromTo(sectionRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.5 },

            )
        }, [])
    return (
        <section ref={sectionRef} id='work' className='app-showcase'>
            <div className='w-full'>
                <div className='showcaselayout'>
                    {/* left side */}
                    <div className='first-project-wrapper' ref={projectRef1}>
                        <div className='imnage-wrapper p-5 rounded-xl bg-[#dcd9a0] '>
                            <img src="/images/relixcore.png" className='rounded-xl' alt="Remeda" />
                        </div>
                        <div className='text-content'>
                            <h2>RelixCore Digital and Creative Agency</h2>
                            <p className='text-white-50 md:text-xl'>
                                A comprehensive agency specializing in motion design,</p>
                        </div>
                    </div>

                    {/* right side */}
                    <div className='project-list-wrapper overflow-hidden'>
                        <div className='project' ref={projectRef2}>
                            <div className='image-wrapper bg-[#dcd9a0]'>
                                <img src="/images/remeda1.png" alt="" />
                            </div>
                            <h2>Remeda Studio Portifolio Creative</h2>
                        </div>
                        <div className='project' ref={projectRef3}>
                            <div className='image-wrapper bg-[#dcd9a0]'>
                                <img src="/images/hullsd.png" alt="" />
                            </div>
                            <h2>Hull's D Sauce Landing Page</h2>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ShowcaseSection