import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSEO } from '../../utils/seo';
import { projects } from '../../mocks/projects';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import PhotoGallery from './components/PhotoGallery';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [moreProjectsPage, setMoreProjectsPage] = useState(0);

  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const otherProjects = projects.filter((p) => p.slug !== slug);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(otherProjects.length / ITEMS_PER_PAGE);
  const visibleProjects = otherProjects.slice(
    moreProjectsPage * ITEMS_PER_PAGE,
    (moreProjectsPage + 1) * ITEMS_PER_PAGE
  );

  useSEO({
    title: project
      ? `${project.name} - ${project.location} | HULMA Project Portfolio`
      : 'Project Not Found | HULMA',
    description: project
      ? `${project.description} Discover how HULMA's premium fiberglass materials transformed this ${project.category} project in ${project.location}.`
      : 'Project not found',
    keywords: project
      ? `${project.name}, HULMA project, ${project.category}, ${project.location}, fiberglass architecture`
      : '',
    canonical: `/project/${slug}`,
    schema: project
      ? {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.description,
          image: project.image,
          creator: {
            '@type': 'Organization',
            name: 'HULMA',
          },
          dateCreated: project.year,
          locationCreated: {
            '@type': 'Place',
            name: project.location,
          },
        }
      : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hulma-ghost">
        <div className="text-center">
          <p className="text-hulma-brown text-lg mb-4">Project not found</p>
          <a
            href="/projects"
            className="text-hulma-orange hover:underline cursor-pointer"
          >
            All Inspirations
          </a>
        </div>
      </div>
    );
  }

  const titleWords = project.name.split(' ');

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover ${project.imagePosition ?? 'object-top'} animate-ken-burns`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Breadcrumb */}
        <div
          className={`absolute top-20 left-0 right-0 z-10 px-5 lg:px-16 opacity-0-init ${
            isVisible ? 'animate-slide-in-left' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <a
              href="/projects"
              onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
              className="text-white/60 hover:text-white text-xs font-sans tracking-wide transition-colors cursor-pointer"
            >
              Projects
            </a>
            <span className="text-white/30 text-xs">/</span>
            <a
              href={`/project/${project.slug}`}
              onClick={(e) => e.preventDefault()}
              className="text-white/90 text-xs font-sans tracking-wide truncate max-w-xs cursor-default"
            >
              {project.name}
            </a>
          </div>
        </div>

        {/* Project Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4">
              {/* Left: title + location */}
              <div>
                <h1 className="text-xl md:text-4xl font-serif font-bold text-white mb-2 md:mb-3">
                  {titleWords.map((word, i) => (
                    <span
                      key={i}
                      className={`inline-block opacity-0-init ${
                        isVisible ? 'animate-fade-up' : ''
                      }`}
                      style={{ animationDelay: `${300 + i * 100}ms` }}
                    >
                      {word}
                      {i < titleWords.length - 1 ? '\u00A0' : ''}
                    </span>
                  ))}
                </h1>
                <div
                  className={`flex items-center gap-3 text-white/70 text-xs md:text-sm font-sans opacity-0-init ${
                    isVisible ? 'animate-fade-in animation-delay-800' : ''
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-map-pin-line text-sm"></i>
                    </span>
                    {project.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Right: category + status tags */}
              <div
                className={`flex flex-row items-start gap-2 flex-shrink-0 opacity-0-init ${
                  isVisible ? 'animate-fade-in animation-delay-400' : ''
                }`}
              >
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-sans">
                  {project.category}
                </span>
                {project.status && (
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-sans">
                    {project.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-8 px-5 md:py-10 lg:py-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left - Description */}
            <div
              className={`opacity-0-init ${
                isVisible ? 'animate-slide-in-left animation-delay-200' : ''
              }`}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-light text-hulma-green mb-3">
                About the Project
              </h2>
              <p className="text-hulma-brown text-sm leading-relaxed font-sans mb-5 text-justify">
                {project.description}
              </p>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden border border-stone-100">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 border-b border-stone-100">
                  <span className="w-4 h-4 flex items-center justify-center text-hulma-brown/50">
                    <i className="ri-map-pin-2-line text-sm"></i>
                  </span>
                  <span className="text-xs text-hulma-brown/60 font-sans">{project.location}</span>
                </div>
                <iframe
                  title={`Map of ${project.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${project.name}, ${project.location}`)}&z=15&output=embed`}
                  width="100%"
                  height="260"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right - Details Card */}
            <div
              className={`bg-hulma-ghost rounded-2xl p-5 md:p-6 opacity-0-init ${
                isVisible ? 'animate-slide-in-right animation-delay-300' : ''
              }`}
            >
              <h3 className="text-lg font-serif font-medium text-hulma-green mb-4">
                Project Details
              </h3>
              <div className="space-y-2">
                {/* Project Name */}
                <div className={`flex justify-between items-start border-b border-hulma-taupe/30 pb-2 opacity-0-init ${isVisible ? 'animate-fade-up animation-delay-400' : ''}`}>
                  <span className="text-sm text-hulma-brown/60 font-sans">Project Name</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right max-w-[55%]">{project.name}</span>
                </div>
                {/* Location */}
                <div className={`flex justify-between items-start border-b border-hulma-taupe/30 pb-2 opacity-0-init ${isVisible ? 'animate-fade-up animation-delay-500' : ''}`}>
                  <span className="text-sm text-hulma-brown/60 font-sans">Location</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right max-w-[55%]">{project.location}</span>
                </div>
                {/* Category */}
                <div className={`flex justify-between items-start border-b border-hulma-taupe/30 pb-2 opacity-0-init ${isVisible ? 'animate-fade-up animation-delay-600' : ''}`}>
                  <span className="text-sm text-hulma-brown/60 font-sans">Category</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.category}</span>
                </div>
                {/* Project Type */}
                <div className={`flex justify-between items-start border-b border-hulma-taupe/30 pb-2 opacity-0-init ${isVisible ? 'animate-fade-up animation-delay-700' : ''}`}>
                  <span className="text-sm text-hulma-brown/60 font-sans">Project Type</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right max-w-[55%]">{project.projectType}</span>
                </div>
                {/* Scope of Work */}
                <div className={`flex justify-between items-start border-b border-hulma-taupe/30 pb-2 opacity-0-init ${isVisible ? 'animate-fade-up animation-delay-800' : ''}`}>
                  <span className="text-sm text-hulma-brown/60 font-sans">Scope of Work</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right max-w-[55%]">{project.scope}</span>
                </div>
                {/* Status */}
                <div className={`flex justify-between items-start border-b border-hulma-taupe/30 pb-2 opacity-0-init ${isVisible ? 'animate-fade-up animation-delay-900' : ''}`}>
                  <span className="text-sm text-hulma-brown/60 font-sans">Status</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.status}</span>
                </div>
                {/* Year */}
                <div className={`flex justify-between items-start opacity-0-init ${isVisible ? 'animate-fade-up animation-delay-1000' : ''}`}>
                  <span className="text-sm text-hulma-brown/60 font-sans">Year</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <PhotoGallery images={project.gallery} projectName={project.name} />
      )}

      {/* Other Projects Grid */}
      <section className="py-12 px-6 lg:px-16 bg-hulma-ghost">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className={`text-2xl font-serif font-light text-hulma-green opacity-0-init ${
                isVisible ? 'animate-fade-up' : ''
              }`}
            >
              More Projects
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMoreProjectsPage((p) => Math.max(0, p - 1))}
                disabled={moreProjectsPage === 0}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-hulma-taupe/60 text-hulma-brown hover:bg-white hover:border-hulma-green transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <i className="ri-arrow-left-s-line text-lg"></i>
              </button>
              <button
                onClick={() => setMoreProjectsPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={moreProjectsPage === totalPages - 1}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-hulma-taupe/60 text-hulma-brown hover:bg-white hover:border-hulma-green transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <i className="ri-arrow-right-s-line text-lg"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProjects.map((proj, index) => (
              <a
                key={proj.id}
                href={`/project/${proj.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/project/${proj.slug}`);
                }}
                className={`group relative overflow-hidden rounded-xl cursor-pointer opacity-0-init ${
                  isVisible ? 'animate-fade-up' : ''
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative w-full h-44 overflow-hidden rounded-xl">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className={`w-full h-full object-cover ${proj.imagePosition ?? 'object-top'} grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Category Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[10px] font-sans uppercase tracking-wider">
                      {proj.category}
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-sm font-serif font-medium text-white drop-shadow-lg line-clamp-1">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-white/70 font-sans mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {proj.location}
                        </p>
                      </div>
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i className="ri-arrow-right-up-line text-white text-xs"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
