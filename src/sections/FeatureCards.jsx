import React from 'react'
import { Gem, MessageCircle, Clock } from 'lucide-react'
import { abilities } from '../constants'

const icons = [Gem, MessageCircle, Clock]

const FeatureCards = () => {
    return (
        <div className='w-full padding-x-lg pt-20'>
            <div className='mx-auto grid-3-cols'>
                {abilities.map(({ title, desc }, index) => {
                    const Icon = icons[index]
                    return (
                        <div key={title} className='card-border rounded-xl p-8 flex flex-col gap-4 hover:border-accent/40 transition-colors duration-300'>
                            <div className='size-14 flex items-center justify-center rounded-full bg-accent/10 text-accent'>
                                <Icon size={26} strokeWidth={1.75} />
                            </div>
                            <h3 className='text-2xl font-semibold text-white-50 mt-2'>
                                {title}
                            </h3>
                            <p className='text-blue-50 text-lg'>{desc}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FeatureCards
