import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { gsap } from 'gsap'
import { navLinks } from '../constants'

const menuItems = [
    ...navLinks,
    { name: 'Contact', link: '#contact' },
]

const FullScreenMenu = ({ open, onClose }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const closeBtnRef = useRef(null)
    const linkRefs = useRef([])

    const goTo = (link) => {
        onClose()

        if (link.startsWith('/')) {
            navigate(link)
            return
        }

        const id = link.slice(1)
        if (location.pathname === '/') {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
        }

        navigate('/')
        let attempts = 0
        const poll = () => {
            const el = document.getElementById(id)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                return
            }
            attempts += 1
            if (attempts < 40) requestAnimationFrame(poll)
        }
        requestAnimationFrame(poll)
    }

    useEffect(() => {
        const handlePaletteOpen = () => onClose()
        window.addEventListener('dch:palette-opened', handlePaletteOpen)
        return () => window.removeEventListener('dch:palette-opened', handlePaletteOpen)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!open) return

        document.body.style.overflow = 'hidden'
        closeBtnRef.current?.focus()

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!prefersReducedMotion) {
            gsap.fromTo(
                linkRefs.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
            )
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    if (!open) return null

    return createPortal(
        <div
            className='fixed inset-0 z-[180] bg-black-100 flex flex-col'
            role='dialog'
            aria-modal='true'
            aria-label='Site menu'
        >
            <div className='grid-pattern' />

            <div className='relative z-10 flex items-center justify-between px-5 md:px-10 py-5'>
                <span className='font-mono text-xs tracking-[0.2em] uppercase text-blue-50'>Menu</span>
                <button
                    ref={closeBtnRef}
                    type='button'
                    onClick={onClose}
                    aria-label='Close menu'
                    className='p-2 rounded-full border border-white/10 text-white-50 hover:border-accent hover:text-accent transition-colors duration-300'
                >
                    <X size={20} />
                </button>
            </div>

            <nav className='relative z-10 flex-1 flex flex-col items-start justify-center gap-2 px-5 md:px-16'>
                {menuItems.map((item, index) => (
                    <button
                        key={item.name}
                        ref={(el) => (linkRefs.current[index] = el)}
                        type='button'
                        onClick={() => goTo(item.link)}
                        className={`group flex items-baseline gap-4 md:gap-6 py-2 md:py-3 text-left ${item.name === 'Contact' ? 'text-accent' : 'text-white-50'
                            }`}
                    >
                        <span className='font-mono text-sm md:text-base text-blue-50'>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className='text-4xl md:text-7xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300'>
                            {item.name}
                        </span>
                    </button>
                ))}
            </nav>

            <div className='relative z-10 px-5 md:px-10 py-6 border-t border-white/5 flex items-center justify-between text-xs text-blue-50 font-mono'>
                <span>D-CodeHood</span>
                <span>Esc to close</span>
            </div>
        </div>,
        document.body
    )
}

export default FullScreenMenu
