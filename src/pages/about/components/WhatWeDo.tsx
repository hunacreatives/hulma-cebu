import { useEffect, useRef, useState } from 'react';

const capabilities = [
  {
    id: 1,
    title: 'Architectural Elements & Facade Details',
    image: '/images/site/about-wwd-facade-001.webp',
  },
  {
    id: 2,
    title: 'Props, Decors & Sculpture Installations',
    image: '/images/site/about-wwd-interior-001.webp',
  },
  {
    id: 3,
    title: 'Safari Animals & More',
    image: '/images/site/about-wwd-safari-001.webp',
  },
  {
    id: 4,
    title: 'Sculptural Installations',
    image: '/images/site/about-wwd-sculpture-001.webp',
  },
  {
    id: 5,
    title: 'Indoor & Outdoor Garden Pots',
    image: '/images/site/about-wwd-garden-001.webp',
  },
  {
    id: 6,
    title: 'Holiday Themed Decors',
    image: '/images/site/about-wwd-domes-001.webp',
  },
  {
    id: 7,
    title: 'Indoor & Outdoor Custom Furniture',
    image: '/images/site/about-wwd-furniture-001.webp',
  },
  {
    id: 8,
    title: 'Custom Forms from Your Drawings or Concepts',
    image: '/images/site/about-wwd-custom-001.webp',
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
            className={`text-sm text-hulma-brown/60 max-w-xl leading-relaxed lg:text-right transition-all duration-700 delay-300 ${
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
