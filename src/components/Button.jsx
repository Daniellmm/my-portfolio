import { useRef } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

const Button = ({ text, className, id }) => {
  const ref = useRef(null)
  useMagnetic(ref)

  return (
    <a
      ref={ref}
      onClick={
        (e) => {
          e.preventDefault()
          const target = document.getElementById("counter")
          if (target && id) {
            const offset = window.innerWidth * 0.15;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
              top: top,
              behavior: 'smooth'
            });
          }
        }
      }
      className={`${className ?? ''} cta-wrapper`}>
      <div className='cta-button group'>
        <div className='bg-circle' />
        <p className='text'>{text}</p>
        <div className='arrow-wrapper'>
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  )
}

export default Button