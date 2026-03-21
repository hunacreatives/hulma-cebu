import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ctaItems = [
  {
    to: '/contact',
    icon: 'ri-mail-line',
    title: 'Contact Us',
    desc: 'Send us your project brief',
  },
  {
    to: '/book-presentation',
    icon: 'ri-calendar-line',
    title: 'Book a Presentation',
    desc: 'Schedule a walkthrough of our work',
  },
  {
    to: '/request-samples',
    icon: 'ri-box-3-line',
    title: 'Request Samples',
    desc: 'Feel the material before you decide',
  },
];

export default function AboutCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#2A2E2A' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20warm%20beige%20stone%20texture%20close%20up%20natural%20organic%20surface%20soft%20diffused%20light%20minimal%20architectural%20material%20background%20earthy%20warm%20tones%20sophisticated%20atmosphere&width=1920&height=600&seq=about-cta-v2-bg-001&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-center opacity-15"
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(42,46,42,0.97) 0%, rgba(55,50,44,0.92) 100%)' }} />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(177,141,117,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-14 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left — simple headline block */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2
              className="font-serif font-light text-hulma-ghost leading-tight mb-5"
              style={{ fontSize: 'clamp(1.3rem, 1.6vw, 1.5rem)' }}
            >
              Your vision deserves <br />
              <em className="italic text-hulma-taupe">more than a catalog.</em>
            </h2>
            <p className="text-sm text-hulma-taupe/50 leading-relaxed max-w-xs mx-auto lg:mx-0" style={{ textWrap: 'pretty' } as React.CSSProperties}>
              We work directly with architects, designers, and builders from first sketch to finished piece.
            </p>
            <p className="mt-6 text-[10px] tracking-[0.22em] uppercase text-hulma-taupe/25">
              Cebu, Philippines · Est. 30+ Years
            </p>
          </div>

          {/* Right — CTA cards */}
          <div
            className={`flex flex-col gap-3 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {ctaItems.map((item, i) => {
              const isHovered = hoveredCard === i;
              return (
                <Link
                  key={i}
                  to={item.to}
                  className="group relative flex items-center justify-between px-5 py-4 lg:px-7 lg:py-5 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: isHovered ? 'rgba(177,141,117,0.22)' : 'rgba(245,244,240,0.06)',
                    border: isHovered
                      ? '1px solid rgba(177,141,117,0.55)'
                      : '1px solid rgba(191,184,174,0.13)',
                    boxShadow: isHovered
                      ? '0 0 35px rgba(177,141,117,0.28), inset 0 1px 0 rgba(255,255,255,0.12)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    transform: isHovered ? 'scale(1.025)' : 'scale(1)',
                    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Glass shimmer sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.13) 50%, transparent 60%)',
                      transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                      transition: isHovered ? 'transform 0.55s ease' : 'none',
                    }}
                  />

                  {/* Top edge highlight */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                      transition: 'background 0.35s ease',
                    }}
                  />

                  {isHovered && (
                    <div
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(177,141,117,0.35) 0%, transparent 70%)',
                        filter: 'blur(12px)',
                      }}
                    />
                  )}

                  <div className="flex items-center gap-5 relative z-10">
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{
                        width: isHovered ? '48px' : '40px',
                        height: isHovered ? '48px' : '40px',
                        background: isHovered ? 'rgba(177,141,117,0.35)' : 'rgba(177,141,117,0.15)',
                        border: isHovered
                          ? '1px solid rgba(177,141,117,0.6)'
                          : '1px solid rgba(177,141,117,0.2)',
                        boxShadow: isHovered ? '0 0 18px rgba(177,141,117,0.45)' : 'none',
                        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    >
                      <i
                        className={`${item.icon}`}
                        style={{
                          color: isHovered ? 'rgba(245,235,220,1)' : 'rgba(191,174,157,0.8)',
                          fontSize: isHovered ? '18px' : '14px',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold mb-0.5 whitespace-nowrap"
                        style={{
                          fontSize: isHovered ? '15px' : '14px',
                          color: isHovered ? 'rgba(255,250,244,1)' : 'rgba(245,244,240,0.9)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          color: isHovered ? 'rgba(191,174,157,0.75)' : 'rgba(191,174,157,0.45)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className="relative z-10 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: isHovered ? '40px' : '32px',
                      height: isHovered ? '40px' : '32px',
                      background: isHovered ? 'rgba(177,141,117,0.4)' : 'rgba(245,244,240,0.07)',
                      border: isHovered
                        ? '1px solid rgba(177,141,117,0.6)'
                        : '1px solid rgba(191,184,174,0.15)',
                      boxShadow: isHovered ? '0 0 14px rgba(177,141,117,0.4)' : 'none',
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <i
                      className="ri-arrow-right-line"
                      style={{
                        color: isHovered ? 'rgba(255,250,244,1)' : 'rgba(191,174,157,0.6)',
                        fontSize: isHovered ? '16px' : '14px',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
