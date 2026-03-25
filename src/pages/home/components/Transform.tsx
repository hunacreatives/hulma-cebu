import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Transform() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height + window.innerHeight);
        setScrollY(scrollProgress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="samples"
      ref={sectionRef}
      className="relative py-4 px-6 lg:px-12 overflow-hidden min-h-[200px] flex items-center"
    >
      {/* Background Image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/1767797f3b50420e55aa0e9afa4e86cb.jpeg"
          alt="Natural stone texture"
          className="w-full h-full object-cover object-center transition-transform duration-100"
          style={{ transform: `scale(1.2) translateY(${Math.max(-10, Math.min(10, scrollY * 0.15))}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
      </div>

      {/* Content with glass card */}
      <div
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div
          className="rounded-3xl px-6 md:px-10 py-5"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 className="text-xl md:text-2xl font-serif font-light text-white mb-1">
            Experience Our Materials
          </h2>
          <p className="text-xs text-white/70 mb-3 max-w-md mx-auto leading-relaxed">
            Schedule a product presentation or request material samples to evaluate our fiberglass finishes for your project.
          </p>

          <div className="flex flex-col items-center justify-center gap-3">
            <Link
              to="/book-presentation"
              className="w-full sm:w-auto relative px-6 py-3 bg-transparent border border-white/30 text-white rounded-full text-xs font-medium hover:bg-white/10 transition-all whitespace-nowrap cursor-pointer tracking-wide overflow-hidden group text-center"
            >
              <span className="relative z-10">Book a Product Presentation</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </Link>
            <Link
              to="/request-samples"
              className="w-full sm:w-auto relative px-6 py-3 bg-white text-hulma-green rounded-full text-xs font-medium hover:bg-hulma-taupe hover:text-hulma-brown hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer tracking-wide overflow-hidden group text-center"
            >
              <span className="relative z-10">Request Product Samples</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-hulma-brown/10 to-transparent"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}