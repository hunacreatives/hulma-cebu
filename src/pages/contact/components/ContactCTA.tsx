import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 px-6 lg:px-12 overflow-hidden"
    >
      {/* Light warm textured background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=close%20up%20natural%20stone%20wall%20surface%20textured%20rough%20hewn%20sandstone%20limestone%20warm%20beige%20tan%20cream%20tones%20subtle%20organic%20pattern%20architectural%20material%20elegant%20minimal%20background%20soft%20diffused%20light%20no%20harsh%20shadows&width=1920&height=400&seq=cta-stone-bg-001&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(240,234,225,0.5)' }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(177,120,60,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Glass Card */}
      <div
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <div
          className="rounded-3xl px-10 py-9"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(32px) saturate(160%)',
            WebkitBackdropFilter: 'blur(32px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 40px rgba(140,100,60,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-light text-hulma-green mb-2">
            Your Vision, <em className="italic text-hulma-brown">Our Craft</em>
          </h2>
          <p className="text-xs mb-6 max-w-md mx-auto leading-relaxed text-hulma-brown/60">
            Ready to discuss your next project? Let&apos;s collaborate to bring your architectural vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/request-samples"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer hover:opacity-90"
              style={{ background: '#3f443f', color: '#fff' }}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-flask-line text-xs"></i>
              </span>
              Request Samples
            </Link>
            <Link
              to="/book-presentation"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer hover:bg-hulma-green/5"
              style={{
                border: '1px solid rgba(63,68,63,0.2)',
                color: '#3f443f',
              }}
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
