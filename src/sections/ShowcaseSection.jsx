import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TitleHeader from '../components/TitleHeader';
import { sanity } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const projectRef1 = useRef(null);
    const projectRef2 = useRef(null);
    const projectRef3 = useRef(null);

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sanity
            .fetch(
                `*[_type == "project" && featured == true] | order(_createdAt desc) [0...3] {
                    _id,
                    title,
                    "id": slug.current,
                    description,
                    "image": image.asset->url
                }`
            )
            .then((data) => setProjects(data))
            .catch((err) => console.error('Error fetching featured projects:', err))
            .finally(() => setLoading(false));
    }, []);

    useGSAP(() => {
        const cards = [projectRef1.current, projectRef2.current, projectRef3.current];
        cards.forEach((card, index) => {
            if (!card) return;
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
    }, [projects])

    const [featured, ...rest] = projects;

    return (
        <div ref={sectionRef} id='work' className='sec app-showcase relative'>
            <div className='grid-pattern' />

            <div className='w-full relative z-10'>
                <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10'>
                    <TitleHeader
                        sub="Showcase"
                        title="My Top Projects"
                    />
                    <Link
                        to="/projects"
                        className='flex items-center gap-2 text-white-50 hover:text-accent transition-colors duration-300 shrink-0 self-center md:self-end'
                    >
                        View all projects
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {loading ? (
                    <div className='showcaselayout animate-pulse'>
                        <div className='first-project-wrapper xl:w-[60%]'>
                            <div className='image-wrapper bg-black-200 rounded-xl' />
                        </div>
                        <div className='project-list-wrapper xl:w-[40%]'>
                            <div className='image-wrapper bg-black-200 rounded-xl' />
                            <div className='image-wrapper bg-black-200 rounded-xl' />
                        </div>
                    </div>
                ) : !featured ? (
                    <p className='text-blue-50 text-lg'>Projects are on their way — check back soon.</p>
                ) : (
                    <div className='showcaselayout relative z-10'>
                        {/* left side */}
                        <Link to={`/projects/${featured.id}`} className='first-project-wrapper' ref={projectRef1}>
                            <div className='image-wrapper'>
                                <img src={featured.image} alt={featured.title} />
                            </div>
                            <div className='text-content'>
                                <h2>{featured.title}</h2>
                                {featured.description && (
                                    <p className='text-blue-50 md:text-xl line-clamp-2'>
                                        {featured.description}
                                    </p>
                                )}
                                <span className='hidden lg:inline-flex items-center gap-2 text-accent font-medium'>
                                    View Project
                                    <ArrowRight size={18} />
                                </span>
                            </div>
                        </Link>

                        {/* right side */}
                        <div className='project-list-wrapper overflow-hidden'>
                            {rest.map((project, index) => (
                                <Link
                                    to={`/projects/${project.id}`}
                                    className='project group'
                                    key={project._id}
                                    ref={index === 0 ? projectRef2 : projectRef3}
                                >
                                    <div className='image-wrapper px-1 lg:py-3'>
                                        <img src={project.image} className='transition-transform duration-500 group-hover:scale-105' alt={project.title} />
                                    </div>
                                    <h2>{project.title}</h2>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowcaseSection
