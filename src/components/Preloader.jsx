import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const HERO_MODEL_URL = '/models/isometric-gaming-room-transformed.glb'
const MIN_DISPLAY_MS = 500
const MAX_WAIT_MS = 5000

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)
    const overlayRef = useRef(null)
    const logoRef = useRef(null)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let cancelled = false
        const start = performance.now()

        document.body.style.overflow = 'hidden'

        const modelFetched = fetch(HERO_MODEL_URL)
            .then((res) => {
                const total = Number(res.headers.get('content-length')) || 0
                if (!res.body || !total) {
                    if (!cancelled) setProgress((p) => Math.max(p, 60))
                    return
                }
                const reader = res.body.getReader()
                let received = 0
                const read = () =>
                    reader.read().then(({ done, value }) => {
                        if (done) return
                        received += value.length
                        if (!cancelled) {
                            setProgress((p) => Math.max(p, Math.min(90, Math.round((received / total) * 90))))
                        }
                        return read()
                    })
                return read()
            })
            .catch(() => {})

        const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()

        const ready = Promise.race([
            Promise.all([modelFetched, fontsReady]),
            new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS)),
        ])

        ready.then(() => {
            const remaining = Math.max(0, MIN_DISPLAY_MS - (performance.now() - start))
            setTimeout(() => {
                if (cancelled) return
                setProgress(100)
                document.body.style.overflow = ''

                const tl = gsap.timeline({ onComplete: () => onComplete?.() })
                if (prefersReducedMotion) {
                    tl.set(overlayRef.current, { opacity: 0, display: 'none' })
                } else {
                    tl.to(overlayRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        delay: 0.15,
                    }).set(overlayRef.current, { display: 'none' })
                }
            }, remaining)
        })

        if (!prefersReducedMotion) {
            gsap.to(logoRef.current, {
                opacity: 0.5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })
        }

        return () => {
            cancelled = true
            document.body.style.overflow = ''
        }
    }, [onComplete])

    return (
        <div
            ref={overlayRef}
            className='fixed inset-0 z-[200] bg-black-100 flex flex-col items-center justify-center gap-6'
            role='progressbar'
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label='Loading D-CodeHood'
        >
            <img ref={logoRef} src='/images/logos/wLogo.png' alt='D-CodeHood' className='size-16 md:size-20' />

            <div className='w-40 h-[3px] rounded-full bg-white/10 overflow-hidden'>
                <div
                    className='h-full bg-accent rounded-full transition-[width] duration-200 ease-out'
                    style={{ width: `${progress}%` }}
                />
            </div>

            <span className='font-mono text-xs text-blue-50 tabular-nums'>{progress}%</span>
        </div>
    )
}

export default Preloader
