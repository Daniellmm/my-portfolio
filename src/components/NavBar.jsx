import { navLinks } from '../constants'
import { useEffect, useState } from 'react'

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <div className='inner'>
                <a className='logo' href="#hero">
                    <img src="/images/logos/wLogo.png" alt="D-CodeHood" />
                </a>

                {/* Desktop Navigation */}
                <nav className='desktop'>
                    <ul>
                        {navLinks.map(({ link, name }) => (
                            <li key={name} className='group'>
                                <a href={link}>
                                    <span>
                                        {name}
                                    </span>
                                    <span className='underline'></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className='mobile-menu-btn'
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {/* Desktop Contact Button */}
                <a href="#contact" className='contact-btn group desktop-only'>
                    <div className='inner'>
                        <span>Contact Me</span>
                    </div>
                </a>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className='mobile-nav'>
                    <ul>
                        {navLinks.map(({ link, name }) => (
                            <li key={name}>
                                <a href={link} onClick={closeMobileMenu}>
                                    {name}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#contact"
                                onClick={closeMobileMenu}
                                className='!bg-accent !text-white-50 text-center font-semibold mt-2'
                            >
                                Contact Me
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className='mobile-menu-overlay'
                    onClick={closeMobileMenu}
                ></div>
            )}
        </header>
    )
}

export default NavBar
