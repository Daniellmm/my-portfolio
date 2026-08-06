import React, { useRef, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import emailjs from '@emailjs/browser';


const Contact = () => {
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | success | error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            setStatus('success');
        } catch (error) {
            console.error('EMAILJS ERROR: ', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }

    }


    return (
        <div id='contact' className='sec flex-center section-padding'>
            <div className='w-full h-full md:px-10 px-1 flex-center relative overflow-hidden'>
                <div className='grid-pattern' />

                <div className='w-full h-full md:px-10 px-1 relative z-10'>
                    <TitleHeader
                        title='Get In Touch'
                        sub='Contact Me'
                    />
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
                        {/* Left: Contact Form */}
                        <form onSubmit={handleSubmit} ref={formRef} className="md:col-span-7 relative col-span-12 flex flex-col gap-6 card-border p-8 rounded-2xl">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-white-50 font-semibold">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-white-50 font-semibold">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-white-50 font-semibold">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    onChange={handleChange}
                                    value={formData.message}
                                    placeholder="Type your message..."
                                    required
                                />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className='disabled:opacity-60 disabled:cursor-not-allowed'
                            >
                                <div className='cta-button group'>
                                    <div className='bg-circle' />
                                    <p className='text'>{loading ? 'Sending...' : 'Send Message'}</p>
                                    <div className='arrow-wrapper'>
                                        <img src="/images/arrow-down.svg" alt="arrow" />
                                    </div>
                                </div>
                            </button>

                            {status === 'success' && (
                                <p role="status" className='text-sm text-center text-accent'>
                                    Message sent — thanks for reaching out, I&apos;ll reply soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p role="alert" className='text-sm text-center text-red-400'>
                                    Something went wrong sending that. Please try again in a moment.
                                </p>
                            )}
                        </form>
                        {/* Right: Image */}
                        <div className="md:col-span-5 col-span-12 flex items-center justify-center relative">
                            <img
                                src="/images/contact.png"
                                alt="Contact"
                                className="rounded-2xl object-cover w-full h-full card-border"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
