import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';
import { sanity } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        console.log("Fetching project with slug:", id);
        
        const data = await sanity.fetch(
          `*[_type == "project" && slug.current == $slug][0] { 
            _id,
            title,
            description,
            "image": image.asset->url,
            "gallery": gallery[].asset->url,
            techStack,
            githubUrl,
            liveUrl,
            features,
            challenges,
            learnings,
            tags,
            category,
            featured,
            // Add default values for missing fields
            "subtitle": coalesce(subtitle, ""),
            "duration": coalesce(duration, "Not specified"),
            "role": coalesce(role, "Developer"),
            "client": coalesce(client, "Personal Project")
          }`,
          { slug: id }
        );
        
        console.log("Fetched project data:", data);
        
        if (!data) {
          console.log("No project found, redirecting to projects page");
          navigate('/projects');
          return;
        }

        // Process the data to ensure proper structure
        const processedProject = {
          ...data,
          // Ensure gallery is an array
          gallery: data.gallery || [data.image].filter(Boolean),
          // Ensure features is an array
          features: Array.isArray(data.features) ? data.features : [],
          // Ensure techStack is an array
          techStack: Array.isArray(data.techStack) ? data.techStack : [],
          // Process challenges - handle if it's a string instead of array
          challenges: Array.isArray(data.challenges) 
            ? data.challenges 
            : data.challenges 
              ? [{ title: "Project Challenges", description: data.challenges }]
              : [],
          // Process learnings - handle if it's a string instead of array
          learnings: Array.isArray(data.learnings) 
            ? data.learnings 
            : data.learnings 
              ? data.learnings.split('\n').filter(item => item.trim())
              : []
        };

        setProject(processedProject);
      } catch (error) {
        console.error("Error fetching project:", error);
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!project || loading) return;

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
  }, [project, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-portfolio-primary"></div>
          <p className="mt-4 text-portfolio-text-muted">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-portfolio-text mb-4">Project not found</h1>
          <Link to="/projects" className="portfolio-button">
            Back to Projects
          </Link>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-black relative z-50 pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-16 pb-12 z-20">
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
                {project.subtitle && (
                  <p className="text-xl text-portfolio-primary font-medium mb-4">
                    {project.subtitle}
                  </p>
                )}
                <p className="text-portfolio-text-muted leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-button inline-flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-portfolio-surface border border-portfolio-border rounded-lg font-medium text-portfolio-text hover:bg-portfolio-surface-hover transition-colors inline-flex items-center gap-2"
                  >
                    <Github size={18} />
                    Source Code
                  </a>
                )}
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
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto shadow-2xl border-2 border-[#dcd9a0] p-2 rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main ref={contentRef} className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-portfolio-text mb-8">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="tech-badge text-base px-4 py-2 bg-red-500/10 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
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
          )}

          {/* Screenshots Gallery */}
          {project.gallery && project.gallery.length > 0 && (
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
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <section className='max-w-full relative overflow-hidden p-3 rounded-3xl'>
              <div className='h-[500px] w-[500px] rounded-full -z-10 -top-52 bg-[#d9321f] absolute -left-32'></div>
              <h2 className="text-3xl font-bold text-portfolio-text mb-8">Challenges & Solutions</h2>
              <div className="space-y-8">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="portfolio-card p-8">
                    <h3 className="text-xl font-bold text-portfolio-text mb-4">
                      {challenge.title || `Challenge ${index + 1}`}
                    </h3>
                    <p className="text-portfolio-text-muted leading-relaxed">
                      {challenge.description || challenge}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Learnings */}
          {project.learnings && project.learnings.length > 0 && (
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
          )}

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
      </main>

      {/* Lightbox */}
      {isLightboxOpen && project.gallery && project.gallery.length > 0 && (
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
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;