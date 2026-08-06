import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const HOVER_SELECTOR = 'a, button, [role="button"], input[type="submit"], .cursor-hover'
const CANVAS_SELECTOR = '.cursor-canvas'

const RING_VARIANT_CLASS = {
    default: 'size-8 border border-white/40 bg-transparent',
    hover: 'size-14 border border-accent bg-accent/10',
    canvas: 'size-10 border border-dashed border-accent/70 bg-transparent',
}

const CustomCursor = () => {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const [variant, setVariant] = useState('default')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const isFinePointer = window.matchMedia('(pointer: fine)').matches
        if (!isFinePointer) return

        document.documentElement.classList.add('custom-cursor-active')

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 })

        const dotDuration = prefersReducedMotion ? 0 : 0.1
        const ringDuration = prefersReducedMotion ? 0 : 0.35

        const moveDotX = gsap.quickTo(dotRef.current, 'x', { duration: dotDuration, ease: 'power3.out' })
        const moveDotY = gsap.quickTo(dotRef.current, 'y', { duration: dotDuration, ease: 'power3.out' })
        const moveRingX = gsap.quickTo(ringRef.current, 'x', { duration: ringDuration, ease: 'power3.out' })
        const moveRingY = gsap.quickTo(ringRef.current, 'y', { duration: ringDuration, ease: 'power3.out' })

        const handleMove = (e) => {
            setVisible(true)
            moveDotX(e.clientX)
            moveDotY(e.clientY)
            moveRingX(e.clientX)
            moveRingY(e.clientY)
        }

        const handlePointerOver = (e) => {
            if (e.target.closest?.(HOVER_SELECTOR)) {
                setVariant('hover')
            } else if (e.target.closest?.(CANVAS_SELECTOR)) {
                setVariant('canvas')
            } else {
                setVariant('default')
            }
        }

        const handleCursorEvent = (e) => setVariant(e.detail?.state || 'default')
        const handleLeaveWindow = () => setVisible(false)

        window.addEventListener('pointermove', handleMove)
        document.addEventListener('pointerover', handlePointerOver)
        window.addEventListener('dch:cursor', handleCursorEvent)
        document.documentElement.addEventListener('mouseleave', handleLeaveWindow)

        return () => {
            document.documentElement.classList.remove('custom-cursor-active')
            window.removeEventListener('pointermove', handleMove)
            document.removeEventListener('pointerover', handlePointerOver)
            window.removeEventListener('dch:cursor', handleCursorEvent)
            document.documentElement.removeEventListener('mouseleave', handleLeaveWindow)
        }
    }, [])

    return (
        <div className={`fixed inset-0 z-[300] pointer-events-none transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div
                ref={dotRef}
                className='fixed top-0 left-0 size-1.5 rounded-full bg-white-50 pointer-events-none'
            />
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 ease-out ${RING_VARIANT_CLASS[variant]}`}
            />
        </div>
    )
}

export default CustomCursor
