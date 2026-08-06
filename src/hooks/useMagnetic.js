import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useMagnetic(ref, { strength = 0.35, radius = 90 } = {}) {
    useEffect(() => {
        const el = ref.current
        if (!el) return

        const isFinePointer = window.matchMedia('(pointer: fine)').matches
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!isFinePointer || prefersReducedMotion) return

        const moveX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
        const moveY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const dx = e.clientX - centerX
            const dy = e.clientY - centerY
            const dist = Math.hypot(dx, dy)

            if (dist < radius) {
                moveX(dx * strength)
                moveY(dy * strength)
            } else {
                moveX(0)
                moveY(0)
            }
        }

        window.addEventListener('pointermove', handleMove)
        return () => {
            window.removeEventListener('pointermove', handleMove)
            moveX(0)
            moveY(0)
        }
    }, [ref, strength, radius])
}
