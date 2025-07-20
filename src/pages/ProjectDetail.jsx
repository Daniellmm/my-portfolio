import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';

// Import project images
const relixcoreImage = "/images/relixcore.png";
const remedaImage = "/images/remeda1.png";
const attendanceImage = "/images/admin.png";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const projectsData = {
    'relixcore': {
      id: 'relixcore',
      title: 'RelixCore Digital & Creative Agency',
      subtitle: 'Full-stack agency website with motion design',
      description: 'RelixCore is a comprehensive digital agency specializing in motion design, web development, and creative services. The project involved creating a sophisticated agency website that showcases their portfolio while providing seamless user experience and professional presentation.',
      image: relixcoreImage,
      gallery: [relixcoreImage, relixcoreImage, relixcoreImage],
      techStack: ['React', 'Next.js', 'GSAP', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      githubUrl: 'https://github.com/username/relixcore',
      liveUrl: 'https://relixcore.com',
      features: [
        'Motion-designed landing page with smooth animations',
        'Dynamic portfolio showcase with filtering capabilities',
        'Contact form with email integration',
        'SEO-optimized pages with meta tags',
        'Responsive design for all device sizes',
        'Fast loading with optimized images and code splitting'
      ],
      challenges: [
        {
          title: 'Complex Animation Sequencing',
          description: 'Implementing sophisticated GSAP animations that work seamlessly across different devices and screen sizes while maintaining performance.'
        },
        {
          title: 'Performance Optimization',
          description: 'Ensuring fast load times despite heavy use of animations and high-quality images through lazy loading and code optimization.'
        }
      ],
      learnings: [
        'Advanced GSAP techniques for timeline management',
        'Performance optimization strategies for animation-heavy sites',
        'Professional client communication and project management',
        'Modern design principles for agency websites'
      ],
      duration: '6 weeks',
      role: 'Full-stack Developer & Designer',
      client: 'RelixCore Agency'
    },
    'remeda': {
      id: 'remeda',
      title: 'Remeda Studio Portfolio',
      subtitle: 'Creative photography portfolio website',
      description: 'Remeda Studio is a creative photography portfolio that showcases stunning visual art and photography work. The website focuses on presenting high-quality images in an elegant, minimalist layout that lets the artwork speak for itself.',
      image: remedaImage,
      gallery: [remedaImage, remedaImage, remedaImage, remedaImage],
      techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Vercel', 'Lightbox2', 'Swiper.js'],
      githubUrl: 'https://github.com/username/remeda',
      liveUrl: 'https://remeda.studio',
      features: [
        'Elegant image gallery with lightbox functionality',
        'Smooth page transitions and micro-interactions',
        'Category-based portfolio filtering',
        'Contact form with social media integration',
        'Image optimization and lazy loading',
        'Mobile-first responsive design'
      ],
      challenges: [
        {
          title: 'Image Loading Performance',
          description: 'Optimizing large high-resolution images for web while maintaining quality, implementing progressive loading techniques.'
        },
        {
          title: 'Gallery User Experience',
          description: 'Creating an intuitive gallery navigation system that works well on both desktop and mobile devices.'
        }
      ],
      learnings: [
        'Image optimization techniques for web',
        'Creating elegant user interfaces for creative portfolios',
        'Working with photographers and creative professionals',
        'Implementing advanced CSS Grid layouts'
      ],
      duration: '4 weeks',
      role: 'Frontend Developer',
      client: 'Remeda Studio'
    },
    'attendance': {
      id: 'attendance',
      title: 'Attendance Monitoring System',
      subtitle: 'Real-time employee tracking platform',
      description: 'A comprehensive attendance monitoring system designed for modern workplaces. The platform provides real-time tracking, analytics, and reporting features to help organizations manage their workforce efficiently.',
      image: attendanceImage,
      gallery: [attendanceImage, attendanceImage, attendanceImage],
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'Chart.js'],
      githubUrl: 'https://github.com/username/attendance',
      liveUrl: 'https://attendance-system.com',
      features: [
        'Real-time attendance tracking with clock-in/out',
        'Advanced analytics and reporting dashboard',
        'Employee management and role-based access',
        'Automated notifications and alerts',
        'Export functionality for reports',
        'Mobile-responsive interface'
      ],
      challenges: [
        {
          title: 'Real-time Data Synchronization',
          description: 'Implementing Socket.io for real-time updates across multiple user sessions while maintaining data consistency.'
        },
        {
          title: 'Complex Data Relationships',
          description: 'Designing a database schema that efficiently handles employee hierarchies, departments, and time tracking data.'
        }
      ],
      learnings: [
        'Real-time web application development',
        'Complex database design and optimization',
        'Enterprise software user experience design',
        'Data visualization and analytics implementation'
      ],
      duration: '8 weeks',
      role: 'Full-stack Developer',
      client: 'Corporate Client'
    },
    // 'ecommerce': {
    //   id: 'ecommerce',
    //   title: 'E-Commerce Platform',
    //   subtitle: 'Modern online shopping experience',
    //   description: 'A full-featured e-commerce platform built with modern technologies. Features include product management, shopping cart, payment processing, and order management system.',
    //   image: ecommerceImage,
    //   gallery: [ecommerceImage, ecommerceImage, ecommerceImage, ecommerceImage],
    //   techStack: ['React', 'Stripe', 'Supabase', 'Tailwind CSS', 'React Query', 'Zustand'],
    //   githubUrl: 'https://github.com/username/ecommerce',
    //   liveUrl: 'https://shop-demo.com',
    //   features: [
    //     'Product catalog with search and filtering',
    //     'Shopping cart and wishlist functionality',
    //     'Secure payment processing with Stripe',
    //     'User authentication and profiles',
    //     'Order tracking and history',
    //     'Admin dashboard for inventory management'
    //   ],
    //   challenges: [
    //     {
    //       title: 'Payment Security',
    //       description: 'Implementing secure payment processing while ensuring a smooth user experience and PCI compliance.'
    //     },
    //     {
    //       title: 'State Management',
    //       description: 'Managing complex application state across cart, user session, and product data efficiently.'
    //     }
    //   ],
    //   learnings: [
    //     'E-commerce best practices and user flows',
    //     'Payment gateway integration and security',
    //     'Advanced state management patterns',
    //     'Database design for e-commerce applications'
    //   ],
    //   duration: '10 weeks',
    //   role: 'Full-stack Developer',
    //   client: 'Personal Project'
    // },
    // 'taskmanager': {
    //   id: 'taskmanager',
    //   title: 'Project Task Manager',
    //   subtitle: 'Collaborative productivity platform',
    //   description: 'A comprehensive task management application designed for teams and individuals. Features kanban boards, project timelines, and real-time collaboration tools.',
    //   image: taskmanagerImage,
    //   gallery: [taskmanagerImage, taskmanagerImage, taskmanagerImage],
    //   techStack: ['React', 'Firebase', 'Material-UI', 'Redux', 'React DnD', 'Chart.js'],
    //   githubUrl: 'https://github.com/username/taskmanager',
    //   liveUrl: 'https://taskmanager.app',
    //   features: [
    //     'Drag-and-drop kanban boards',
    //     'Project timeline and Gantt charts',
    //     'Real-time collaboration and comments',
    //     'Team member management and permissions',
    //     'Task dependencies and priorities',
    //     'Progress tracking and analytics'
    //   ],
    //   challenges: [
    //     {
    //       title: 'Real-time Collaboration',
    //       description: 'Implementing real-time updates across multiple users while handling conflicts and maintaining data integrity.'
    //     },
    //     {
    //       title: 'Complex UI Interactions',
    //       description: 'Creating intuitive drag-and-drop interfaces that work seamlessly across different devices and screen sizes.'
    //     }
    //   ],
    //   learnings: [
    //     'Real-time collaborative application architecture',
    //     'Advanced React patterns and optimization',
    //     'User experience design for productivity tools',
    //     'Firebase real-time database implementation'
    //   ],
    //   duration: '7 weeks',
    //   role: 'Frontend Developer',
    //   client: 'Startup Client'
    // },
    // 'restaurant': {
    //   id: 'restaurant',
    //   title: 'Restaurant Booking System',
    //   subtitle: 'Table reservation and management platform',
    //   description: 'A comprehensive restaurant management system that handles table reservations, menu management, and customer reviews. Built for restaurant owners to streamline their operations.',
    //   image: restaurantImage,
    //   gallery: [restaurantImage, restaurantImage, restaurantImage, restaurantImage],
    //   techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Stripe', 'AWS S3'],
    //   githubUrl: 'https://github.com/username/restaurant',
    //   liveUrl: 'https://restaurant-booking.com',
    //   features: [
    //     'Real-time table reservation system',
    //     'Menu management with image uploads',
    //     'Customer review and rating system',
    //     'Payment processing for deposits',
    //     'Staff management and shift scheduling',
    //     'Analytics dashboard for restaurant insights'
    //   ],
    //   challenges: [
    //     {
    //       title: 'Table Availability Logic',
    //       description: 'Implementing complex logic for table availability that accounts for reservation duration, table sizes, and restaurant capacity.'
    //     },
    //     {
    //       title: 'Multi-role User Management',
    //       description: 'Creating a system that handles different user roles (customers, staff, managers) with appropriate permissions and interfaces.'
    //     }
    //   ],
    //   learnings: [
    //     'Complex business logic implementation',
    //     'Multi-tenant application architecture',
    //     'Restaurant industry workflow understanding',
    //     'Advanced PostgreSQL queries and optimization'
    //   ],
    //   duration: '9 weeks',
    //   role: 'Full-stack Developer',
    //   client: 'Restaurant Chain'
    // }
  };

  const project = projectsData[id];

  useEffect(() => {
    if (!project) {
      navigate('/projects');
      return;
    }

    // Hero section animation
    gsap.fromTo(heroRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Content sections animation
    gsap.fromTo(contentRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-portfolio-text-muted hover:text-portfolio-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-portfolio-text mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-portfolio-primary font-medium mb-4">
                  {project.subtitle}
                </p>
                <p className="text-portfolio-text-muted leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-button inline-flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-portfolio-surface border border-portfolio-border rounded-lg font-medium text-portfolio-text hover:bg-portfolio-surface-hover transition-colors inline-flex items-center gap-2"
                >
                  <Github size={18} />
                  Source Code
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-portfolio-text-muted mb-1">Duration</p>
                  <p className="font-medium text-portfolio-text">{project.duration}</p>
                </div>
                <div>
                  <p className="text-portfolio-text-muted mb-1">Role</p>
                  <p className="font-medium text-portfolio-text">{project.role}</p>
                </div>
                <div>
                  <p className="text-portfolio-text-muted mb-1">Client</p>
                  <p className="font-medium text-portfolio-text">{project.client}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto shadow-2xl border-2 border-[#dcd9a0] p-2 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main ref={contentRef} className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Tech Stack */}
          <section>
            <h2 className="text-3xl font-bold text-portfolio-text mb-8">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-badge text-base px-4 py-2 bg-red-500/10 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section className='max-w-full'>
            <h2 className="text-3xl font-bold text-portfolio-text mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <div key={index} className="portfolio-card min-w-full p-6 bg-white/10 rounded-md">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-portfolio-primary rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                      <div className="w-2 h-2 bg-portfolio-primary-foreground rounded-full"></div>
                    </div>
                    <p className="text-portfolio-text">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshots Gallery */}
          <section className='max-w-full'>
            <h2 className="text-3xl font-bold text-portfolio-text mb-8">Screenshots Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="portfolio-card overflow-hidden cursor-pointer group border rounded-md border-[#dcd9a0] p-2"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-48 object-cover transition-transform  duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section className='max-w-full'>
            <h2 className="text-3xl font-bold text-portfolio-text mb-8">Challenges & Solutions</h2>
            <div className="space-y-8">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="portfolio-card p-8">
                  <h3 className="text-xl font-bold text-portfolio-text mb-4">
                    {challenge.title}
                  </h3>
                  <p className="text-portfolio-text-muted leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Learnings */}
          <section className='max-w-full'>
            <h2 className="text-3xl font-bold text-portfolio-text mb-8">What I Learned</h2>
            <div className="portfolio-card p-8">
              <ul className="space-y-4">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-portfolio-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-portfolio-text">{learning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center max-w-full bg-white/10 rounded-xl">
            <div className="portfolio-card p-12">
              <h2 className="text-3xl font-bold text-portfolio-text mb-4">
                Ready to work together?
              </h2>
              <p className="text-portfolio-text-muted mb-8 max-w-2xl mx-auto">
                I'm always excited to take on new challenges and create amazing digital experiences.
                Let's discuss your next project.
              </p>
              <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
                
                <Link
                  to="/projects"
                  className="portfolio-button"
            >
                  View More Projects
              </Link>
                
              <a
                href="mailto:contact@dcodehood.com"
                className="px-6 py-3 bg-portfolio-surface border border-portfolio-border rounded-lg font-medium text-portfolio-text hover:bg-portfolio-surface-hover transition-colors"
              >
                Get In Touch
              </a>
            </div>
        </div>
      </section>
    </div>
      </main >

  {/* Lightbox */ }
{
  isLightboxOpen && (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <button
          onClick={() => setIsLightboxOpen(false)}
          className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <img
          src={project.gallery[currentImageIndex]}
          alt={`${project.title} screenshot`}
          className="w-full h-auto rounded-lg"
        />

        {project.gallery.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {project.gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
    </div >
  );
};

export default ProjectDetail;