import { useEffect, useRef, useState } from 'react';

const capabilities = [
  {
    id: 1,
    title: 'Architectural Elements & Facade Details',
    image: 'https://readdy.ai/api/search-image?query=Architectural%20fiberglass%20facade%20detail%20panel%20installed%20on%20modern%20building%20exterior%20warm%20brown%20terracotta%20tones%20clean%20lines%20contemporary%20design%20close-up%20shot%20warm%20natural%20lighting&width=400&height=350&seq=about-wwd-facade-001&orientation=landscape',
  },
  {
    id: 2,
    title: 'Props, Decors & Sculpture Installations',
    image: 'https://readdy.ai/api/search-image?query=Interior%20wall%20cladding%20decorative%20fiberglass%20panels%20modern%20hotel%20lobby%20warm%20ambient%20lighting%20elegant%20design%20textured%20surface%20warm%20neutral%20brown%20tones%20contemporary%20architecture&width=400&height=350&seq=about-wwd-interior-001&orientation=landscape',
  },
  {
    id: 3,
    title: 'Safari Animals & More',
    image: 'https://readdy.ai/api/search-image?query=Large%20fiberglass%20animal%20sculptures%20safari%20themed%20elephant%20giraffe%20realistic%20detailed%20artistic%20fabrication%20warm%20studio%20lighting%20brown%20earth%20tones%20workshop%20setting%20display%20pieces&width=400&height=350&seq=about-wwd-safari-001&orientation=landscape',
  },
  {
    id: 4,
    title: 'Sculptural Installations',
    image: 'https://readdy.ai/api/search-image?query=Abstract%20fiberglass%20sculptural%20installation%20modern%20art%20piece%20smooth%20white%20organic%20curved%20forms%20contemporary%20gallery%20setting%20soft%20lighting%20minimalist%20elegant%20design%20warm%20neutral%20background&width=400&height=350&seq=about-wwd-sculpture-001&orientation=landscape',
  },
  {
    id: 5,
    title: 'Indoor & Outdoor Garden Pots',
    image: 'https://readdy.ai/api/search-image?query=Modern%20fiberglass%20garden%20pots%20and%20bollards%20outdoor%20landscape%20design%20contemporary%20planters%20geometric%20shapes%20warm%20earth%20tones%20garden%20setting%20natural%20lighting%20green%20plants&width=400&height=350&seq=about-wwd-garden-001&orientation=landscape',
  },
  {
    id: 6,
    title: 'Holiday Themed Decors',
    image: 'https://readdy.ai/api/search-image?query=Fiberglass%20dome%20canopy%20pergola%20structure%20modern%20architectural%20outdoor%20covering%20curved%20elegant%20design%20warm%20lighting%20contemporary%20building%20exterior%20warm%20brown%20tones&width=400&height=350&seq=about-wwd-domes-001&orientation=landscape',
  },
  {
    id: 7,
    title: 'Indoor & Outdoor Custom Furniture',
    image: 'https://readdy.ai/api/search-image?query=Modern%20fiberglass%20outdoor%20furniture%20chairs%20tables%20sleek%20contemporary%20design%20poolside%20resort%20setting%20warm%20ambient%20lighting%20elegant%20minimalist%20warm%20neutral%20tones&width=400&height=350&seq=about-wwd-furniture-001&orientation=landscape',
  },
  {
    id: 8,
    title: 'Custom Forms from Your Drawings or Concepts',
    image: 'https://readdy.ai/api/search-image?query=Custom%20fiberglass%20mold%20being%20created%20from%20architectural%20drawings%20blueprints%20workshop%20fabrication%20process%20unique%20shapes%20warm%20lighting%20artisan%20craftsmanship%20warm%20brown%20tones%20industrial%20setting&width=400&height=350&seq=about-wwd-custom-001&orientation=landscape',
  },
];

export default function WhatWeDo() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-28 px-6 lg:px-16 overflow-hidden" style={{ background: '#FAFAF8' }}>
      {/* Ambient glow blobs */}
      <div
        className="absolute top-20 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(177,141,117,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      ></div>
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(63,68,63,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 lg:mb-14">
          <div>
            <h2
              className={`font-serif font-light text-hulma-green leading-tight transition-all duration-700 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.5rem)' }}
            >
              Every form, built <br />
              <em className="italic text-hulma-brown">from your vision.</em>
            </h2>
          </div>
          <p
            className={`text-sm text-hulma-brown/60 max-w-xs leading-relaxed lg:text-right transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Hulma designs and fabricates custom fiberglass pieces for architecture, interiors, and landscapes.{' '}
            <span className="text-hulma-brown/40 italic">Every piece is made to order.</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {capabilities.map((item, index) => (
            <a
              key={item.id}
              href="/contact"
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              {/* Glassmorphism card */}
              <div
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 24px rgba(40,35,30,0.10), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  title={`HULMA - ${item.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
                />

                {/* Persistent glass tint */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(30,25,20,0.55) 0%, transparent 55%)',
                  }}
                />

                {/* Always-on glass shimmer — glassmorphism feel before hover */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(177,141,117,0.05) 100%)',
                  }}
                />

                {/* Category title — uniform glass strip at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-12 flex items-center px-3"
                  style={{
                    background: 'rgba(255,255,255,0.14)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    borderTop: '1px solid rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                  }}
                >
                  <p className="text-white text-xs font-light tracking-wide leading-snug line-clamp-2 flex-1">
                    {item.title}
                  </p>
                </div>

                {/* Hover shimmer — brighter on hover, no blur */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 50%, rgba(177,141,117,0.10) 100%)',
                  }}
                />

                {/* Hover arrow */}
                <div
                  className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                  style={{
                    background: 'rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    borderLeft: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <i className="ri-arrow-right-up-line text-white text-xs" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
