import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

  return (
    <a
      href={`/project/${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/project/${project.slug}`);
      }}
      className={`group relative flex flex-col overflow-hidden rounded-xl cursor-pointer opacity-0-init ${
        isVisible ? 'animate-fade-up' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative w-full h-64 overflow-hidden rounded-xl">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover ${project.imagePosition ?? 'object-top'} grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent rounded-xl opacity-100 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
          <p className="text-white/70 text-[11px] font-sans leading-relaxed line-clamp-2 mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {project.projectType ?? project.category}
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
  const [filterKey, setFilterKey] = useState(0);
  const [sortBy, setSortBy] = useState<'date' | 'alpha'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const sectionRef = useRef<HTMLElement>(null);
  const [searchParams] = useSearchParams();

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const handleSort = (opt: 'date' | 'alpha') => {
    if (sortBy === opt) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(opt);
      setSortDir(opt === 'date' ? 'desc' : 'asc');
    }
  };

  const getSortLabel = (opt: 'date' | 'alpha') => {
    if (sortBy !== opt) return opt === 'date' ? 'By Date' : 'Alphabetical';
    if (opt === 'date') return sortDir === 'desc' ? 'Newest First' : 'Oldest First';
    return sortDir === 'asc' ? 'A \u2013 Z' : 'Z \u2013 A';
  };

  // Read ?category= param whenever it changes in the URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    } else if (!cat) {
      setActiveCategory('All');
    }
  }, [searchParams]);

  const filtered = projects
    .filter((p) => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.scope.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'alpha') {
        const cmp = a.name.localeCompare(b.name);
        return sortDir === 'asc' ? cmp : -cmp;
      }
      const cmp = Number(b.year) - Number(a.year);
      return sortDir === 'desc' ? cmp : -cmp;
    });

  useSEO({
    title: 'HULMA - Portfolio',
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
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFilterKey((prev) => prev + 1);
  }, [activeCategory, search]);

  return (
    <div className="bg-white">
      <Header forceDark />

      <section ref={sectionRef} className="pt-28 pb-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div
            className={`mb-16 opacity-0-init ${
              isVisible ? 'animate-fade-up' : ''
            }`}
          >
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-hulma-green leading-tight mb-4">
              Trusted by Industry Leaders
            </h1>

            {/* Two-column row: left = subtitle + categories | right = search + sort */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

              {/* Left: subtitle + category pills */}
              <div className="flex flex-col gap-3">
                <p className="text-sm text-hulma-brown/70">
                  Explore our collection of completed projects and discover the possibilities for your next project.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((cat, i) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 text-[11px] rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap opacity-0-init ${
                        activeCategory === cat
                          ? 'bg-hulma-green text-white border-hulma-green font-medium'
                          : 'bg-white text-hulma-brown/60 border-stone-200 hover:border-hulma-brown/40'
                      } ${isVisible ? 'animate-scale-in' : ''}`}
                      style={{ animationDelay: `${200 + i * 80}ms` }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: search bar + sort pills below it */}
              <div className="flex flex-col gap-2 w-full md:w-96 flex-shrink-0">
                {/* Search — pill shaped, white */}
                <div className="relative w-full">
                  <div className="w-5 h-5 flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 text-hulma-brown/40 pointer-events-none">
                    <i className="ri-search-line text-base" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-stone-300 rounded-full text-hulma-green placeholder-hulma-brown/40 focus:outline-none focus:border-hulma-brown/50 transition-colors"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="w-5 h-5 flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 text-hulma-brown/40 hover:text-hulma-brown cursor-pointer"
                    >
                      <i className="ri-close-line text-base" />
                    </button>
                  )}
                </div>

                {/* Sort pills + project count — directly below search */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-hulma-brown/40 whitespace-nowrap mr-0.5">Sort by</span>
                  {(['date', 'alpha'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSort(opt)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-[11px] rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        sortBy === opt
                          ? 'bg-hulma-green text-white border-hulma-green font-medium'
                          : 'bg-white text-hulma-brown/55 border-stone-200 hover:border-hulma-brown/40'
                      }`}
                    >
                      {getSortLabel(opt)}
                      <span className="w-3 h-3 flex items-center justify-center">
                        <i
                          className={`text-xs transition-transform duration-200 ${
                            sortBy === opt && sortDir === 'asc'
                              ? 'ri-arrow-up-s-line'
                              : 'ri-arrow-down-s-line'
                          } ${sortBy === opt ? 'text-white' : 'text-hulma-brown/40'}`}
                        />
                      </span>
                    </button>
                  ))}
                  <span className="ml-auto text-xs text-hulma-brown/40 whitespace-nowrap">
                    {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div key={filterKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <div className={`flex flex-col items-center justify-center py-24 text-center opacity-0-init ${isVisible ? 'animate-scale-in animate-fade-in' : ''}`}>
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