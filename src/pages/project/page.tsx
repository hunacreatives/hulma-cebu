import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSEO } from '../../utils/seo';
import { projects } from '../../mocks/projects';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import PhotoGallery from './components/PhotoGallery';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const project = projects.find((p) => p.id === Number(id));
  const currentIndex = projects.findIndex((p) => p.id === Number(id));
  const otherProjects = projects.filter((p) => p.id !== Number(id));

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
    canonical: `/project/${id}`,
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
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hulma-ghost">
        <div className="text-center">
          <p className="text-hulma-brown text-lg mb-4">Project not found</p>
          <a
            href="/#inspiration"
            className="text-hulma-orange hover:underline cursor-pointer"
          >
            Back to projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover object-top transition-all duration-1000 ${
            isVisible ? 'scale-100' : 'scale-110'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-28 left-8 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <i className="ri-arrow-left-line text-lg"></i>
          </span>
          <span className="text-sm font-sans">Back</span>
        </button>

        {/* Project Info Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-8 lg:p-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-sans mb-4">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-3">
              {project.name}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-sm font-sans">
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
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Left - Description */}
            <div>
              <h2 className="text-3xl font-serif font-light text-hulma-green mb-6">
                About the Project
              </h2>
              <p className="text-hulma-brown text-base leading-relaxed font-sans mb-8">
                {project.description}
              </p>
              <p className="text-hulma-brown/70 text-sm leading-relaxed font-sans">
                This project demonstrates HULMA&apos;s commitment to delivering architectural fiberglass solutions that combine aesthetic excellence with structural durability. Every panel and element was precision-crafted to meet the unique demands of the space.
              </p>
            </div>

            {/* Right - Details Card */}
            <div className="bg-hulma-ghost rounded-2xl p-8">
              <h3 className="text-lg font-serif font-medium text-hulma-green mb-6">
                Project Details
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-start border-b border-hulma-taupe/30 pb-4">
                  <span className="text-sm text-hulma-brown/60 font-sans">Project Name</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.name}</span>
                </div>
                <div className="flex justify-between items-start border-b border-hulma-taupe/30 pb-4">
                  <span className="text-sm text-hulma-brown/60 font-sans">Location</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.location}</span>
                </div>
                <div className="flex justify-between items-start border-b border-hulma-taupe/30 pb-4">
                  <span className="text-sm text-hulma-brown/60 font-sans">Category</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.category}</span>
                </div>
                <div className="flex justify-between items-start border-b border-hulma-taupe/30 pb-4">
                  <span className="text-sm text-hulma-brown/60 font-sans">Year</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.year}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-hulma-brown/60 font-sans">Scope</span>
                  <span className="text-sm text-hulma-green font-medium font-sans text-right">{project.scope}</span>
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

      {/* Navigation Between Projects */}
      <section className="py-4 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between border-t border-b border-hulma-taupe/30 py-6">
          <button
            onClick={() => {
              const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
              navigate(`/project/${projects[prevIndex].id}`);
            }}
            className="flex items-center gap-3 text-hulma-brown hover:text-hulma-green transition-colors cursor-pointer group"
          >
            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-hulma-taupe group-hover:border-hulma-green transition-colors">
              <i className="ri-arrow-left-s-line text-xl"></i>
            </span>
            <div className="text-left">
              <span className="text-xs text-hulma-brown/50 font-sans block">Previous</span>
              <span className="text-sm font-medium font-sans">
                {projects[currentIndex === 0 ? projects.length - 1 : currentIndex - 1].name}
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
              navigate(`/project/${projects[nextIndex].id}`);
            }}
            className="flex items-center gap-3 text-hulma-brown hover:text-hulma-green transition-colors cursor-pointer group"
          >
            <div className="text-right">
              <span className="text-xs text-hulma-brown/50 font-sans block">Next</span>
              <span className="text-sm font-medium font-sans">
                {projects[currentIndex === projects.length - 1 ? 0 : currentIndex + 1].name}
              </span>
            </div>
            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-hulma-taupe group-hover:border-hulma-green transition-colors">
              <i className="ri-arrow-right-s-line text-xl"></i>
            </span>
          </button>
        </div>
      </section>

      {/* Other Projects Grid */}
      <section className="py-20 px-6 lg:px-16 bg-hulma-ghost">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-hulma-green mb-12">
            More Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((proj, index) => (
              <a
                key={proj.id}
                href={`/project/${proj.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/project/${proj.id}`);
                }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-2xl font-serif font-light text-white/80 drop-shadow-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[10px] font-sans uppercase tracking-wider">
                      {proj.category}
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-lg font-serif font-medium text-white drop-shadow-lg">
                          {proj.name}
                        </h3>
                        <p className="text-xs text-white/70 font-sans mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {proj.location}
                        </p>
                      </div>
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i className="ri-arrow-right-up-line text-white text-sm"></i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description Below Card */}
                <div className="p-4 bg-white rounded-b-2xl">
                  <p className="text-xs text-hulma-brown/70 font-sans leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
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
