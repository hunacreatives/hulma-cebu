import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20warm%20beige%20and%20brown%20textured%20surface%20close%20up%20natural%20stone%20organic%20pattern%20soft%20diffused%20lighting%20elegant%20minimal%20architectural%20material%20background%20earthy%20warm%20tones%20sophisticated%20atmosphere&width=1920&height=500&seq=contact-cta-texture-001&orientation=landscape"
          alt="Textured surface background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/30"></div>
      </div>

      {/* Glass Card */}
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
            Your Vision, <em>Our Craft</em>
          </h2>
          <p className="text-xs text-white/70 mb-3 max-w-md mx-auto leading-relaxed">
            Ready to discuss your next project? Let&apos;s collaborate to bring your architectural vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-hulma-green rounded-full text-xs font-medium hover:bg-hulma-ghost transition-all whitespace-nowrap cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-mail-line text-xs"></i>
              </span>
              Contact Us Today
            </Link>
            <Link
              to="/book-presentation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white rounded-full text-xs font-medium hover:bg-white/10 transition-all whitespace-nowrap cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-calendar-line text-xs"></i>
              </span>
              Book a Presentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
