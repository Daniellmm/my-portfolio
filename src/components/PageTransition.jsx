import React, { useEffect, useRef, useState } from 'react'
import { Routes, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const PageTransition = ({ children }) => {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location)
    const curtainRef = useRef(null)
    const tlRef = useRef(null)

    useEffect(() => {
        if (location.pathname === displayLocation.pathname) return

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
            tlRef.current?.kill()
            setDisplayLocation(location)
            window.scrollTo(0, 0)
            return
        }

        tlRef.current?.kill()
        const tl = gsap.timeline()
        tlRef.current = tl
        tl.set(curtainRef.current, { visibility: 'visible' })
            .fromTo(
                curtainRef.current,
                { scaleY: 0, transformOrigin: 'bottom' },
                { scaleY: 1, duration: 0.45, ease: 'power3.inOut' }
            )
            .call(() => {
                setDisplayLocation(location)
                window.scrollTo(0, 0)
            })
            .to(curtainRef.current, {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 0.45,
                ease: 'power3.inOut',
                delay: 0.05,
            })
            .set(curtainRef.current, { visibility: 'hidden' })
    }, [location, displayLocation])

    return (
        <>
            <div
                ref={curtainRef}
                className='fixed inset-0 z-[150] bg-black-100 invisible'
                style={{ transform: 'scaleY(0)' }}
            />
            <Routes location={displayLocation}>{children}</Routes>
        </>
    )
}

export default PageTransition
