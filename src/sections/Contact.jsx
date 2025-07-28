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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setLoading(true);
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.log('EMAILJS ERROR: ', error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <section id='contact' className='flex-center srction-padding'>
            <div className='w-full h-full md:px-10 px-1 flex-center section-padding relative overflow-hidden py-10'>
                <div className='w-full h-full md:px-10 px-1'>
                    <TitleHeader
                        title='Get In Touch'
                        sub='Contact Me'
                    />
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
                        <div className='absolute inset-0 opacity-10'>
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'></div>
                        </div>
                        {/* Left: Contact Form */}
                        <form onSubmit={handleSubmit} ref={formRef} className="md:col-span-7 relative col-span-12 flex flex-col gap-6 bg-tertiary p-8 rounded-2xl shadow-lg">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-white font-semibold">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="input"
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-white font-semibold">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="input"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-white font-semibold">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="input"
                                    onChange={handleChange}
                                    value={formData.message}
                                    placeholder="Type your message..."
                                    required
                                />
                            </div>
                            <button
                                disabled={loading}
                                onClick={handleSubmit}
                                type="submit">
                                <div className='cta-button group'>
                                    <div className='bg-circle' />
                                    <p className='text'>{loading ? 'Sending...' : 'Send Message'}</p>
                                    <div className='arrow-wrapper'>
                                        <img src="/images/arrow-down.svg" alt="arrow" />
                                    </div>
                                </div>

                            </button>
                        </form>
                        {/* Right: Image */}
                        <div className="md:col-span-5 col-span-12 flex items-center justify-center relative">
                            <img
                                src="/images/contact.png"
                                alt="Contact"
                                className="  rounded-xl object-cover shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact