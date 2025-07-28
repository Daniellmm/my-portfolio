import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Github, ExternalLink, Filter, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sanity } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(false)


  const categories = ['All', 'Featured', 'Client Work', 'Fullstack', 'Frontend'];


  useEffect(() => {
    setLoading(true)
    sanity.fetch(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "id": slug.current,
    summary,
    "image": image.asset->url,
    tags,
    category,
    githubUrl,
    liveUrl,
    featured
  }`).then((data) => {
      console.log("📦 Projects fetched from Sanity:", data);
      setProjectsData(data);
    }).catch((err) => {
      console.error("Error fetching projects:", err)
    }).finally(() => setLoading(false))
  }, []);

  const filteredProjects = projectsData;


  // const filteredProjects = projectsData.filter(project => {
  //   const matchesFilter = selectedFilter === 'All' || 
  //     (selectedFilter === 'Featured' && project.featured) ||
  //     project.category === selectedFilter;
  //   const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  //   return matchesFilter && matchesSearch;
  // });

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Cards animation
    gsap.fromTo(cardsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
      }
    );

    // Scroll-triggered animations
    ScrollTrigger.batch(cardsRef.current, {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
      },
      start: "top bottom-=100",
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  useEffect(() => {
    // Re-animate cards when filter changes
    gsap.fromTo(cardsRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }
    );
  }, [filteredProjects]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header ref={headerRef} className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-portfolio-text-muted hover:text-portfolio-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="hero-gradient">Selected Work</span>
            </h1>
            <p className="text-xl text-portfolio-text-muted max-w-2xl mx-auto">
              A showcase of my latest projects, from client work to personal experiments.
              Each project represents a unique challenge and creative solution.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-portfolio-text-muted" size={20} />
              <input
                type="text"
                placeholder="Search projects or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-portfolio-surface border border-portfolio-border rounded-lg text-portfolio-text placeholder-portfolio-text-muted focus:outline-none focus:border-portfolio-primary transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter size={20} className="text-portfolio-text-muted mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedFilter === category
                    ? 'bg-portfolio-primary text-portfolio-primary-foreground'
                    : 'bg-portfolio-surface text-portfolio-text-muted hover:bg-portfolio-surface-hover'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-t-portfolio-primary border-portfolio-surface rounded-full animate-spin" />
        </div>
      ) : (
        <main className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-portfolio-text-muted">No projects found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (

                  <div
                    key={project.id}
                    ref={addToRefs}
                    className="portfolio-card group  border-2 border-[#dcd9a0] p-2 rounded-xl"
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden aspect-video ">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Action buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-background/90 backdrop-blur-sm rounded-lg text-foreground hover:bg-portfolio-primary hover:text-portfolio-primary-foreground transition-colors"
                        >
                          <Github size={16} />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-background/90 backdrop-blur-sm rounded-lg text-foreground hover:bg-portfolio-primary hover:text-portfolio-primary-foreground transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>

                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-portfolio-primary text-portfolio-primary-foreground text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-portfolio-text mb-2 group-hover:text-portfolio-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-portfolio-text-muted mb-4 line-clamp-2">
                        {project.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Array.isArray(project.tags) && project.tags.length > 0 ? (
                          project.tags.map((tag) => (
                            <span key={tag} className="tech-badge">{tag}</span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400 italic">No tags</span>
                        )}

                      </div>

                      {/* View Project Link */}
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-red-600 text-portfolio-primary hover:text-portfolio-primary-dark font-medium transition-colors"
                        onClick={() => console.log("Navigating to:", `/projects/${project.id}`)}  // Debug log
                      >
                        View Project
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main >
      )}
    </div >
  );
};

export default Projects;