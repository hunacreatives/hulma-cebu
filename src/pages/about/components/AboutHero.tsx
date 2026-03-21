import { useEffect, useRef, useState } from 'react';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollBlur, setScrollBlur] = useState(0);
  const [scrollDim, setScrollDim] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (sectionHeight * 0.7), 1);
      setScrollBlur(progress * 12);
      setScrollDim(progress * 0.45);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[70vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://storage.readdy-site.link/project_files/b63dedce-304e-445f-9039-a113450b67ef/9d32fd30-bfcf-404e-ad45-fbc99c035bb8_Hulma-Website-About-Us.png?v=b3994982ee30a541212f8a4ba5f2a5c4"
          alt="HULMA fiberglass manufacturing workshop"
          className="w-full h-full object-cover object-center transition-none"
          style={{ filter: `blur(${scrollBlur}px)`, transform: 'scale(1.05)' }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40 transition-none"
          style={{ background: `rgba(0,0,0,${scrollDim})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full px-5 lg:px-12 pb-10 lg:pb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">

          {/* Title */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p
              className="text-white/50 text-xs tracking-[0.22em] uppercase mb-2"
              style={{ letterSpacing: '0.2em' }}
            >
              About
            </p>
            <h1
              className="font-serif font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              Hulma Cebu
            </h1>
          </div>

          {/* Stats */}
          <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:items-end lg:text-right">
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs lg:text-sm font-medium whitespace-nowrap">
                30+ years in the industry
              </span>
            </div>
            <div
              className={`transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-block px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs lg:text-sm font-medium whitespace-nowrap">
                500+ Completed Projects
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}