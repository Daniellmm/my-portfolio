import React, { useRef, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Github, MessageCircle, Send } from 'lucide-react';

const EMAIL = 'contact@dcodehood.com';

const contactCards = [
    { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: 'Location', value: 'Remote — Worldwide' },
];

const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Mail, label: 'Email', href: `mailto:${EMAIL}` },
    { icon: MessageCircle, label: 'Chat', href: '#' },
];

const Contact = () => {
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | success | error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
            setFormData({ first_name: '', last_name: '', email: '', subject: '', message: '' });
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
            <div className='w-full h-full md:px-10 px-1 relative overflow-hidden'>
                <div className='grid-pattern' />

                <div className='w-full relative z-10'>
                    <TitleHeader
                        title='Get In Touch'
                        sub='Contact Me'
                    />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-14 max-w-6xl mx-auto'>
                        {/* Left: contact info */}
                        <div className='flex flex-col gap-6'>
                            <h3 className='text-2xl font-semibold text-white-50'>Get in touch</h3>

                            <div className='flex flex-col gap-4'>
                                {contactCards.map(({ icon, label, value, href }) => {
                                    const Icon = icon
                                    const card = (
                                        <div className='flex items-center gap-4 card-border rounded-xl p-5 hover:border-accent/50 transition-colors duration-300'>
                                            <Icon className='text-accent shrink-0' size={22} />
                                            <div>
                                                <p className='font-semibold text-white-50'>{label}</p>
                                                <p className='text-blue-50'>{value}</p>
                                            </div>
                                        </div>
                                    )
                                    return href ? (
                                        <a key={label} href={href}>{card}</a>
                                    ) : (
                                        <div key={label}>{card}</div>
                                    )
                                })}
                            </div>

                            <div className='mt-4'>
                                <p className='font-semibold text-white-50 mb-4'>Follow me</p>
                                <div className='socials'>
                                    {socialLinks.map(({ icon, label, href }) => {
                                        const Icon = icon
                                        return (
                                            <a
                                                key={label}
                                                href={href}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                aria-label={label}
                                                className='icon'
                                            >
                                                <Icon size={18} />
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right: message form */}
                        <form onSubmit={handleSubmit} ref={formRef} className='flex flex-col gap-4'>
                            <h3 className='text-2xl font-semibold text-white-50 mb-2'>Send a message</h3>

                            <input type='hidden' name='name' value={`${formData.first_name} ${formData.last_name}`.trim()} />

                            <div className='grid grid-cols-2 gap-4'>
                                <input
                                    type='text'
                                    name='first_name'
                                    placeholder='First name'
                                    onChange={handleChange}
                                    value={formData.first_name}
                                    required
                                />
                                <input
                                    type='text'
                                    name='last_name'
                                    placeholder='Last name'
                                    onChange={handleChange}
                                    value={formData.last_name}
                                />
                            </div>

                            <input
                                type='email'
                                name='email'
                                placeholder='Email address'
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />

                            <input
                                type='text'
                                name='subject'
                                placeholder='Subject'
                                onChange={handleChange}
                                value={formData.subject}
                            />

                            <textarea
                                name='message'
                                rows='6'
                                placeholder='Your message'
                                onChange={handleChange}
                                value={formData.message}
                                required
                            />

                            <button
                                disabled={loading}
                                type='submit'
                                className='mt-2 w-full py-4 bg-white-50 text-black-100 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
                            >
                                <Send size={18} />
                                {loading ? 'Sending...' : 'Send message'}
                            </button>

                            {status === 'success' && (
                                <p role='status' className='text-sm text-center text-accent'>
                                    Message sent — thanks for reaching out, I&apos;ll reply soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p role='alert' className='text-sm text-center text-red-400'>
                                    Something went wrong sending that. Please try again in a moment.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
