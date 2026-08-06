import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
    return (
        <div className='min-h-screen pt-20 relative flex-center flex-col text-center px-5'>
            <div className='grid-pattern' />
            <div className='absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] mx-auto rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#e5484d1a,transparent)] pointer-events-none' />

            <div className='relative z-10 flex flex-col items-center'>
                <span className='font-mono text-sm tracking-[0.2em] uppercase text-accent'>Error</span>
                <h1 className='text-8xl md:text-[10rem] font-bold text-white-50 leading-none tracking-tight mt-2'>404</h1>
                <p className='text-xl md:text-2xl font-semibold text-white-50 mt-4'>Page not found</p>
                <p className='text-blue-50 max-w-md mt-3'>
                    Whatever you were looking for isn&apos;t here — might&apos;ve been moved, renamed, or never existed.
                </p>

                <Link
                    to='/'
                    className='inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-white-50 text-black-100 font-semibold hover:bg-accent hover:text-white-50 transition-colors duration-300'
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
