import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../../mocks/projects';

const row1 = projects.slice(0, 3);
const row2 = projects.slice(3, 6);

function StyleOneCard({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[0];
  index: number;
  isVisible: boolean;
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={`/project/${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/project/${project.slug}`);
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-72 overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay with wipe effect */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 rounded-2xl transition-all duration-500 ${
          isHovered ? 'from-black/80' : ''
        }`} />

        {/* Category label top-left */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-sans font-medium tracking-wide">
            {project.clientType}
          </span>
        </div>

        {/* Dots indicator top-right */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <p className="text-white/90 text-[12px] font-sans leading-relaxed line-clamp-2 mb-2">
            {project.description}
          </p>
          <span className="text-hulma-orange text-[11px] font-sans font-medium">
            *{project.category}
          </span>
        </div>
      </div>
    </a>
  );
}

function StyleTwoCard({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[0];
  index: number;
  isVisible: boolean;
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <a
      href={`/project/${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/project/${project.slug}`);
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-12'
      }`}
      style={{ transitionDelay: `${(index + 3) * 120}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-72 overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        {/* Darker overlay with wipe effect */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/25 rounded-2xl transition-all duration-500 ${
          isHovered ? 'from-black/85' : ''
        }`} />

        {/* Large number */}
        <div className="absolute top-4 left-5 z-10">
          <span className="text-4xl font-serif font-light text-white/30">
            {num}
          </span>
        </div>

        {/* Top-right: Location + Name */}
        <div className="absolute top-4 right-0 left-16 z-10 pr-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] text-white/50 font-sans uppercase tracking-wider block">
                {project.location}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-white font-sans font-medium">
                  {project.name}
                </span>
              </div>
              <span className="text-[10px] text-white/40 font-sans italic">
                &quot;{project.tagline}&quot;
              </span>
            </div>
            {/* Dots indicator */}
            <div className="flex items-center gap-1 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            </div>
          </div>
        </div>

        {/* Bottom description */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <p className="text-white/85 text-[12px] font-sans leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function TrustedLeaders() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === 0 ? 0 : prev + 1));
  };

  return (
    <section
      id="inspiration"
      ref={sectionRef}
      className="py-14 md:py-24 px-6 lg:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-14">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-xl md:text-2xl font-serif font-light text-hulma-green leading-tight">
              Trusted by
            </h2>
            <h2 className="text-xl md:text-2xl font-serif font-light text-hulma-brown/60 leading-tight">
              Industry Leaders
            </h2>
          </div>

          <div
            className={`flex items-center gap-3 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={handlePrev}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-hulma-taupe/60 text-hulma-brown hover:bg-hulma-ghost hover:border-hulma-green transition-all cursor-pointer"
              aria-label="Previous"
            >
              <i className="ri-arrow-left-line text-lg"></i>
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-hulma-green text-white hover:bg-hulma-green/90 transition-all cursor-pointer"
              aria-label="Next"
            >
              <i className="ri-arrow-right-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Row 1 — Style 1: Category label cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {row1.map((project, index) => (
            <StyleOneCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Row 2 — Style 2: Numbered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {row2.map((project, index) => (
            <StyleTwoCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* View More */}
        <div
          className={`flex justify-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-2.5 rounded-full border border-hulma-taupe text-hulma-brown text-xs font-sans tracking-wide hover:bg-hulma-taupe/20 transition-all whitespace-nowrap cursor-pointer"
          >
            VIEW MORE PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
}