import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollProgress = () => {
    const barRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
            if (barRef.current) barRef.current.style.width = `${progress}%`
        }

        // Route changes always scroll to top (see PageTransition), so reset
        // immediately rather than measuring the outgoing page's height.
        if (barRef.current) barRef.current.style.width = '0%'

        window.addEventListener('scroll', updateProgress, { passive: true })
        window.addEventListener('resize', updateProgress)
        return () => {
            window.removeEventListener('scroll', updateProgress)
            window.removeEventListener('resize', updateProgress)
        }
    }, [location.pathname])

    return (
        <div className='fixed top-0 left-0 w-full h-[3px] z-[110] pointer-events-none'>
            <div ref={barRef} className='h-full bg-accent' style={{ width: '0%' }} />
        </div>
    )
}

export default ScrollProgress
