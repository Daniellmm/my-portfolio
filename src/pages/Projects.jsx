import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Github, ExternalLink, Filter, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sanity } from '../lib/sanity';
import TitleHeader from '../components/TitleHeader';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Featured', 'Client Work', 'Fullstack', 'Frontend', 'Personal'];

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    sanity.fetch(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "id": slug.current,
    description,
    "image": image.asset->url,
    tags,
    category,
    githubUrl,
    liveUrl,
    featured
  }`).then((data) => {
      setProjectsData(data);
    }).catch((err) => {
      console.error("Error fetching projects:", err)
    }).finally(() => setLoading(false))
  }, []);

  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = selectedFilter === 'All' ||
      (selectedFilter === 'Featured' && project.featured) ||
      project.category === selectedFilter;
    const matchesSearch = searchTerm.trim() === '' ||
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(project.tags) && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Scroll-triggered animations
    if (cardsRef.current.length > 0) {
      ScrollTrigger.batch(cardsRef.current, {
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
          );
        },
        start: "top bottom-=100",
      });
    }

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [loading]);

  useEffect(() => {
    // Re-animate cards when filter changes
    gsap.fromTo(cardsRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }
    );
  }, [selectedFilter, searchTerm]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-20 relative">
      <div className="relative h-full w-full">
        <div className="grid-pattern" />
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] mx-auto rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#e5484d1a,transparent)] pointer-events-none" />

        {/* Header */}
        <header ref={headerRef} className="pt-16 pb-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-50 hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline"> Back to Home</span>
            </Link>

            <TitleHeader sub="Portfolio" title="Selected Work" />
            <p className="text-xl text-blue-50 max-w-2xl mx-auto text-center mt-6">
              A showcase of my latest projects, from client work to personal experiments.
              Each project represents a unique challenge and creative solution.
            </p>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-12">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-50" size={20} />
                <input
                  type="text"
                  placeholder="Search projects or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black-200 border border-white/5 rounded-lg text-white-50 placeholder-blue-50 focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter size={20} className="text-blue-50 mr-2 shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedFilter(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedFilter === category
                      ? 'bg-accent text-white-50'
                      : 'bg-black-200 text-blue-50 hover:bg-white/10'
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
          <div className="py-32 flex justify-center items-center relative z-10">
            <div className="w-12 h-12 border-4 border-t-accent border-black-200 rounded-full animate-spin" />
          </div>
        ) : (
          <main className="pb-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-blue-50">No projects found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (

                    <div
                      key={project.id}
                      ref={addToRefs}
                      className="group card-border p-2 rounded-xl hover:border-accent/40 transition-colors duration-300"
                    >
                      {/* Project Image */}
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-100/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-black-100/90 backdrop-blur-sm rounded-lg text-white-50 hover:bg-accent transition-colors"
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-black-100/90 backdrop-blur-sm rounded-lg text-white-50 hover:bg-accent transition-colors"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>

                        {project.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-2 py-1 bg-accent text-white-50 text-xs font-medium rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white-50 mb-2 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-blue-50 mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Array.isArray(project.tags) && project.tags.length > 0 ? (
                            project.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 rounded-full bg-black-200 text-blue-50 text-xs border border-white/5">{tag}</span>
                            ))
                          ) : (
                            <span className="text-xs text-blue-50/60 italic">No tags</span>
                          )}

                        </div>

                        {/* View Project Link */}
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center gap-2 text-accent hover:text-white-50 font-medium transition-colors"
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
          </main>
        )}
      </div>
    </div>
  );
};

export default Projects;
