import React from 'react'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-container'>
                <p>© {new Date().getFullYear()} D-CodeHood. Built with care.</p>

                <p className='text-xs text-black-100/50 mt-1'>
                    Hero 3D scene: "Isometric Gaming Room" by{' '}
                    <a href="https://sketchfab.com/robbyrefta" target="_blank" rel="noopener noreferrer" className='underline hover:text-accent'>
                        robbyrefta
                    </a>
                    , licensed{' '}
                    <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className='underline hover:text-accent'>
                        CC BY 4.0
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer
