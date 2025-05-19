import React, { useRef } from 'react';
import { counterItems } from '../constants';
import CountUp from 'react-countup';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
    const counterRef = useRef(null);
    
    useGSAP(() => {
        // Animate the container
        gsap.fromTo(counterRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 1.5 }
        );
        
        // Animate each counter when scrolled into view
        gsap.utils.toArray('.counter-item').forEach((item) => {
            gsap.from(item, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100',
                    onEnter: () => {
                        // Find the CountUp component inside this item and restart it
                        const countUpInstance = item.querySelector('.counter-number');
                        if (countUpInstance) {
                            const countUpId = countUpInstance.getAttribute('data-countup-id');
                            if (window.countUpInstances && window.countUpInstances[countUpId]) {
                                window.countUpInstances[countUpId].reset();
                                window.countUpInstances[countUpId].start();
                            }
                        }
                    }
                },
            });
        });
    }, []);

    return (
        <div id='counter' className='padding-x-lg lg:mt-32 xl:mt-0'>
            <div ref={counterRef} className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {counterItems.map((item, index) => (
                    <div key={item.label || index} className='counter-item bg-zinc-900 rounded-xl p-10 flex flex-col justify-center'>
                        <div className='counter-number text-white text-5xl font-bold mb-2' data-countup-id={`counter-${index}`}>
                            <CountUp
                                suffix={item.suffix}
                                end={item.value}
                                duration={2.5}
                                start={0}
                                // redraw={true}
                                useEasing={true}
                                // preserveValue={true}
                                enableScrollSpy={false}
                                // scrollSpyDelay={0}
                                // scrollSpyOnce={true}
                            />
                        </div>
                        <div className='text-white-50 text-lg'>
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Initialize countUp instances container
if (typeof window !== 'undefined') {
    window.countUpInstances = window.countUpInstances || {};
}

export default AnimatedCounter;