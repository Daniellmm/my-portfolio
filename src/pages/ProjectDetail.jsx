import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

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
            "video": video.asset->url,
            "image": image.asset->url,
            "gallery": gallery[].asset->url,
            techStack,
            githubUrl,
            liveUrl,
            features,
            tags,
            category,
            featured,
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-800"></div>
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-red-500 absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-400 text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Project not found</h1>
          <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <ArrowLeft size={20} />
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Back Button - Fixed Position */}
      <div className="fixed md:top-32 md:left-14 top-28 left-4 z-40">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all duration-300 rounded-lg border border-gray-700/50"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-36 pb-16 max-w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
            {project.subtitle && (
              <p className="text-2xl text-red-400 font-medium mb-6">
                {project.subtitle}
              </p>
            )}
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {project.description}
            </p>
          </div>

          {/* Project Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Duration</p>
              <p className="text-white font-semibold text-lg">{project.duration}</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Role</p>
              <p className="text-white font-semibold text-lg">{project.role}</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Client</p>
              <p className="text-white font-semibold text-lg">{project.client}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6 justify-center mb-16">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-gray-600 text-white hover:bg-white/20 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Github size={20} />
                Source Code
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main ref={contentRef} className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* Video Section */}
          {project.video && (
            <section className="relative max-w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-3 md:p-8 border border-gray-700/50">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                  Project Demo
                </h2>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    src={project.video}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    poster={project.image}
                  />

                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={toggleVideo}
                        className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                      >
                        {isVideoPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                      >
                        {isVideoMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Hero Image (if no video) */}
          {!project.video && project.image && (
            <section className="relative max-w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-3 md:p-8 border border-gray-700/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </section>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <section className='max-w-full'>
              <h2 className="text-4xl font-bold text-white mb-12 text-center">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-500/30 rounded-full text-red-300 font-medium hover:from-red-600/30 hover:to-red-800/30 transition-all duration-300 transform hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <section className='max-w-full'>
              <h2 className="text-4xl font-bold text-white mb-12 text-center">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className='max-w-full'>
              <h2 className="text-4xl font-bold text-white mb-12 text-center">
                Project Gallery
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-300"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                        <ExternalLink size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}


          {/* Call to Action */}
          <section className="text-center relative max-w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-3xl blur-3xl -z-10"></div>
            <div className="p-3 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-gray-700/50">
              <h2 className="text-4xl font-bold text-white mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Ready to bring your vision to life? I'm passionate about creating exceptional digital experiences that make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-gray-600 text-white hover:bg-white/20 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  View More Projects
                </Link>
                <a
                  href="mailto:contact@dcodehood.com"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
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
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              <X size={24} />
            </button>

            <img
              src={project.gallery[currentImageIndex]}
              alt={`${project.title} screenshot`}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />

            {project.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {project.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-red-500 scale-125' : 'bg-white/50 hover:bg-white/80'
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