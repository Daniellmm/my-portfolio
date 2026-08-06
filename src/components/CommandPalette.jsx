import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const CommandPalette = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef(null)

    const goToSection = (id) => {
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

    const commands = useMemo(() => [
        { label: 'Home', hint: 'Back to the top', action: () => navigate('/') },
        { label: 'Projects', hint: 'Selected work', action: () => navigate('/projects') },
        { label: 'About', hint: 'Skills, experience & story', action: () => navigate('/about') },
        { label: 'Testimonials', hint: 'What clients say', action: () => goToSection('testimonials') },
        { label: 'Contact', hint: 'Get in touch', action: () => goToSection('contact') },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [location.pathname])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return commands
        return commands.filter((c) => c.label.toLowerCase().includes(q))
    }, [commands, query])

    const close = () => {
        setOpen(false)
        setQuery('')
        setActiveIndex(0)
    }

    const runCommand = (command) => {
        command.action()
        close()
    }

    useEffect(() => {
        const handleGlobalKeydown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setOpen((prev) => !prev)
                return
            }
            if (e.key === 'Escape') setOpen(false)
        }

        const handleOpenEvent = () => setOpen(true)

        window.addEventListener('keydown', handleGlobalKeydown)
        window.addEventListener('dch:command-palette', handleOpenEvent)
        return () => {
            window.removeEventListener('keydown', handleGlobalKeydown)
            window.removeEventListener('dch:command-palette', handleOpenEvent)
        }
    }, [])

    useEffect(() => {
        if (!open) return
        document.body.style.overflow = 'hidden'
        inputRef.current?.focus()
        setActiveIndex(0)
        window.dispatchEvent(new CustomEvent('dch:palette-opened'))
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    useEffect(() => {
        setActiveIndex(0)
    }, [query])

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (filtered[activeIndex]) runCommand(filtered[activeIndex])
        }
    }

    if (!open) return null

    return (
        <div
            className='fixed inset-0 z-[250] flex items-start justify-center pt-[15vh] px-5 bg-black-100/70 backdrop-blur-sm'
            onClick={close}
            role='presentation'
        >
            <div
                className='w-full max-w-lg card-border rounded-2xl overflow-hidden shadow-2xl'
                onClick={(e) => e.stopPropagation()}
                role='dialog'
                aria-modal='true'
                aria-label='Command palette'
            >
                <div className='flex items-center gap-3 px-4 py-3 border-b border-white/5'>
                    <Search size={18} className='text-blue-50 shrink-0' />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Type a command or search…'
                        className='w-full bg-transparent text-white-50 placeholder:text-blue-50 outline-none text-sm md:text-base'
                    />
                    <kbd className='hidden md:inline font-mono text-[10px] text-blue-50 border border-white/10 rounded px-1.5 py-0.5'>
                        Esc
                    </kbd>
                </div>

                <ul className='max-h-72 overflow-y-auto py-2'>
                    {filtered.length === 0 && (
                        <li className='px-4 py-6 text-center text-blue-50 text-sm'>No matches</li>
                    )}
                    {filtered.map((command, index) => (
                        <li key={command.label}>
                            <button
                                type='button'
                                onClick={() => runCommand(command)}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors duration-150 ${index === activeIndex ? 'bg-white/5' : ''
                                    }`}
                            >
                                <span className='text-white-50 text-sm font-medium'>{command.label}</span>
                                <span className='text-blue-50 text-xs'>{command.hint}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className='flex items-center gap-4 px-4 py-2.5 border-t border-white/5 font-mono text-[10px] text-blue-50'>
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span className='md:hidden'>Esc Close</span>
                </div>
            </div>
        </div>
    )
}

export default CommandPalette
