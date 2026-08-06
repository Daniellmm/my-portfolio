import React from 'react'
import { socialImgs } from '../constants'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-container'>
                <p>© {new Date().getFullYear()} D-CodeHood. All rights reserved.</p>

                <p className='text-center'>Built with React, Three.js &amp; GSAP</p>

                <div className='socials'>
                    {socialImgs.map((social) => (
                        <a
                            key={social.name}
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className='icon'
                        >
                            <img src={social.imgPath} alt={social.name} />
                        </a>
                    ))}
                </div>

                <p className='md:col-span-3 text-xs text-blue-50/60 text-center pt-6 mt-2 border-t border-white/5'>
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
