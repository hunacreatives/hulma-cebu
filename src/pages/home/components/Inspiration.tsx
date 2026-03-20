import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../../mocks/projects';

export default function Inspiration() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animKey, setAnimKey] = useState(0);
  const [btnActive, setBtnActive] = useState<'prev' | 'next' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setDirection('left');
    setAnimKey((k) => k + 1);
    setBtnActive('prev');
    setTimeout(() => setBtnActive(null), 300);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 3 : prev - 3));
  };

  const handleNext = () => {
    setDirection('right');
    setAnimKey((k) => k + 1);
    setBtnActive('next');
    setTimeout(() => setBtnActive(null), 300);
    setCurrentIndex((prev) => (prev + 3 >= projects.length ? 0 : prev + 3));
  };

  const visibleProjects = [
    projects[currentIndex % projects.length],
    projects[(currentIndex + 1) % projects.length],
    projects[(currentIndex + 2) % projects.length],
    projects[(currentIndex + 3) % projects.length],
    projects[(currentIndex + 4) % projects.length],
    projects[(currentIndex + 5) % projects.length],
  ];

  return (
    <section
      id="inspiration"
      ref={sectionRef}
      className="py-14 md:py-24 px-6 lg:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-lg md:text-xl font-serif font-light text-center mb-8 md:mb-10 text-hulma-brown transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Get Inspired
        </h2>

        <div className="relative px-0 md:px-16">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-lg cursor-pointer ${
              btnActive === 'prev' ? 'scale-90 bg-white' : 'scale-100'
            }`}
            aria-label="Previous projects"
          >
            <i className={`ri-arrow-left-s-line text-2xl text-hulma-green transition-transform duration-200 ${btnActive === 'prev' ? '-translate-x-1' : ''}`}></i>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-lg cursor-pointer ${
              btnActive === 'next' ? 'scale-90 bg-white' : 'scale-100'
            }`}
            aria-label="Next projects"
          >
            <i className={`ri-arrow-right-s-line text-2xl text-hulma-green transition-transform duration-200 ${btnActive === 'next' ? 'translate-x-1' : ''}`}></i>
          </button>

          <div
            key={animKey}
            className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 ${
              isVisible ? (direction === 'right' ? 'carousel-slide-right' : 'carousel-slide-left') : ''
            }`}
          >
            {visibleProjects.map((project, index) => (
              <a
                key={`${project.id}-${currentIndex}-${index}`}
                href={`/project/${project.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/project/${project.slug}`);
                }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-[3/2] w-full h-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 ${
                      hoveredId === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-white text-sm font-medium">{project.name}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/projects')}
            className="px-8 py-3 bg-hulma-green text-white text-xs font-medium rounded-full hover:bg-hulma-green/90 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
          >
            View More Projects
          </button>
        </div>
      </div>
    </section>
  );
}