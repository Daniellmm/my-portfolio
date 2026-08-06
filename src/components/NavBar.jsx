import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import FullScreenMenu from './FullScreenMenu'

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <div className='inner'>
                <a className='logo' href="#hero">
                    <img src="/images/logos/wLogo.png" alt="D-CodeHood" />
                </a>

                <div className='flex items-center gap-3'>
                    {/* Command Palette Trigger */}
                    <button
                        type='button'
                        onClick={() => window.dispatchEvent(new CustomEvent('dch:command-palette'))}
                        className='desktop-only flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 text-blue-50 hover:text-white-50 hover:border-white/20 transition-colors duration-300'
                        aria-label='Open command palette'
                    >
                        <Search size={14} />
                        <kbd className='font-mono text-[10px]'>⌘K</kbd>
                    </button>

                    {/* Menu Trigger */}
                    <button
                        className='menu-trigger'
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            <FullScreenMenu open={menuOpen} onClose={closeMenu} />
        </header>
    )
}

export default NavBar
