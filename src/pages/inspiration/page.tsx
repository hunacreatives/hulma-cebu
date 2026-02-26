
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../../utils/seo';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { projects } from '../../mocks/projects';

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[0];
  index: number;
  isVisible: boolean;
}) {
  const navigate = useNavigate();
  const num = String(index + 1).padStart(2, '0');

  return (
    <a
      href={`/project/${project.id}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/project/${project.id}`);
      }}
      className={`group relative flex flex-col overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative w-full h-64 overflow-hidden rounded-xl">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent rounded-xl" />

        {/* Number */}
        <div className="absolute top-3 left-4 z-10">
          <span className="text-2xl font-serif font-light text-white/25">
            {num}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-4 z-10">
          <span className="text-[10px] uppercase tracking-widest bg-white/15 backdrop-blur-sm text-white/80 px-2 py-0.5 rounded-full">
            {project.category}
          </span>
        </div>

        {/* Project name & location */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <span className="text-[10px] text-white/55 font-sans uppercase tracking-wider block mb-0.5">
            {project.location} · {project.year}
          </span>
          <span className="text-sm text-white font-sans font-semibold block leading-snug">
            {project.name}
          </span>
          <p className="text-white/70 text-[11px] font-sans leading-relaxed line-clamp-2 mt-1">
            {project.scope}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function InspirationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects.filter((p) => {
    const matchesSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.scope.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useSEO({
    title: 'Project Portfolio - HULMA Fiberglass Architectural Inspiration',
    description: 'Explore HULMA\'s portfolio of completed fiberglass architectural projects. Discover innovative design solutions for hospitality, residential, and commercial spaces across the Philippines.',
    keywords: 'HULMA projects, fiberglass architecture portfolio, architectural inspiration, completed projects, design gallery',
    canonical: '/inspiration',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'HULMA Project Portfolio',
      description: 'Explore our collection of completed projects and discover the possibilities for your next project',
      url: `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/inspiration`,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header forceDark />

      <section ref={sectionRef} className="pt-28 pb-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div
            className={`mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xs uppercase tracking-widest text-hulma-brown/50 mb-2 font-sans">Portfolio</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-light text-hulma-green leading-tight">
                  Trusted by{' '}
                  <span className="text-hulma-brown/50">Industry Leaders</span>
                </h1>
                <p className="text-sm text-hulma-brown/70 mt-2 max-w-md">
                  Explore our collection of completed projects and discover the possibilities for your next project.
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-72">
                <div className="w-5 h-5 flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-hulma-brown/40 pointer-events-none">
                  <i className="ri-search-line text-base" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-hulma-green placeholder-hulma-brown/40 focus:outline-none focus:border-hulma-brown/40 transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="w-5 h-5 flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 text-hulma-brown/40 hover:text-hulma-brown cursor-pointer"
                  >
                    <i className="ri-close-line text-base" />
                  </button>
                )}
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mt-5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-hulma-green text-white border-hulma-green'
                      : 'bg-white text-hulma-brown/60 border-stone-200 hover:border-hulma-brown/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto text-xs text-hulma-brown/40 self-center">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-12 h-12 flex items-center justify-center text-hulma-brown/25 mb-4">
                <i className="ri-search-line text-4xl" />
              </div>
              <p className="text-sm text-hulma-brown/50">No projects found for <strong>"{search}"</strong></p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="mt-3 text-xs text-hulma-green underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
