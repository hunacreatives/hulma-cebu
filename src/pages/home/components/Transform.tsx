import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Transform() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="samples"
      ref={sectionRef}
      className="relative py-8 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Natural%20stone%20texture%20background%20warm%20beige%20sand%20tones%20limestone%20surface%20organic%20pattern%20elegant%20material%20close-up%20soft%20lighting%20high-end%20architectural%20finish&width=1920&height=800&seq=transform-bg-001&orientation=landscape"
          alt="Natural stone texture"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div
          className="rounded-3xl px-10 py-5"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-1">
            Experience Our Materials
          </h2>
          <p className="text-xs text-white/70 mb-3 max-w-md mx-auto leading-relaxed">
            Schedule a product presentation or request material samples to evaluate our fiberglass finishes for your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/book-presentation"
              className="px-6 py-3 bg-transparent border border-white/30 text-white rounded-full text-xs font-medium hover:bg-white/10 transition-all whitespace-nowrap cursor-pointer tracking-wide"
            >
              Book a Product Presentation
            </Link>
            <Link
              to="/request-samples"
              className="px-6 py-3 bg-white text-hulma-green rounded-full text-xs font-medium hover:bg-hulma-ghost transition-all whitespace-nowrap cursor-pointer tracking-wide"
            >
              Request Product Samples
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
