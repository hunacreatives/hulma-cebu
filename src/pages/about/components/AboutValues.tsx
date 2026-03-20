import { useEffect, useRef, useState } from 'react';

const values = [
  {
    id: 1,
    title: 'Made-to-Order Craft',
    tagline: 'Every piece begins with your idea.',
    description:
      "We don't work from catalogs. Every piece is made to order, built from drawings, sketches, and real project needs. Your idea is the starting point, not a limitation.",
    image: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/333f9e1132674a880ff8d1df9b813467.png',
    icon: 'ri-tools-line',
  },
  {
    id: 2,
    title: 'Material Freedom',
    tagline: 'What you draw is what we build.',
    description:
      "Fiberglass lets us bend, curve, texture, and scale without forcing the design to compromise. What you draw is what we build. No shortcuts, no substitutions.",
    image:
      'https://readdy.ai/api/search-image?query=Filipino%20craftsmen%20workers%20in%20workshop%20fabricating%20large%20curved%20fiberglass%20architectural%20panels%20hands%20on%20work%20molding%20shaping%20material%20warm%20workshop%20lighting%20Cebu%20Philippines%20artisan%20manufacturing%20authentic%20industrial%20setting%20brown%20skin%20workers&width=700&height=500&seq=about-value-freedom-ph-001&orientation=landscape',
    icon: 'ri-shape-line',
  },
  {
    id: 3,
    title: 'Trusted Collaboration',
    tagline: 'Partners in the process, not just suppliers.',
    description:
      'With over 30 years of experience, we work closely with architects, designers, and builders to deliver project-specific solutions. We are partners in the process, not just suppliers.',
    image:
      'https://readdy.ai/api/search-image?query=Architects%20and%20designers%20reviewing%20architectural%20material%20samples%20together%20in%20modern%20studio%20collaborative%20meeting%20warm%20lighting%20professional%20team%20discussion%20fiberglass%20panels%20on%20table%20warm%20brown%20neutral%20tones&width=700&height=500&seq=about-value-collab-001&orientation=landscape',
    icon: 'ri-team-line',
  },
];

export default function AboutValues() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleInteraction = (index: number) => {
    if (isMobile) {
      setActiveIndex(prev => (prev === index ? -1 : index));
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-24 px-6 lg:px-16 overflow-hidden"
      style={{ background: '#F5F4F0' }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(177,141,117,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2
            className={`font-serif font-light text-hulma-green leading-tight transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.5rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Three principles that guide{' '}
            <em className="italic text-hulma-brown">every piece we make.</em>
          </h2>
        </div>

        {/* ── DESKTOP: horizontal accordion ── */}
        <div
          className={`hidden md:flex gap-3 h-[480px] transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {values.map((value, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={value.id}
                onMouseEnter={() => setActiveIndex(index)}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  flex: isActive ? '3.5' : '1',
                  background: isActive ? 'rgba(20,22,20,0.2)' : 'rgba(255,255,255,0.82)',
                  border: isActive ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(63,68,63,0.10)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  transition: 'flex 0.7s cubic-bezier(0.4,0,0.2,1), background 0.5s ease, border-color 0.5s ease',
                }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: isActive ? 1 : 0.12 }}
                >
                  <img src={value.image} alt={value.title} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Collapsed state */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-500 ${
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <span
                    className="font-serif font-light text-xs tracking-widest"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'rgba(63,68,63,0.4)' }}
                  >
                    0{value.id}
                  </span>
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-full"
                    style={{
                      background: 'rgba(63,68,63,0.07)',
                      border: '1px solid rgba(63,68,63,0.14)',
                    }}
                  >
                    <i className={`${value.icon} text-sm`} style={{ color: 'rgba(63,68,63,0.55)' }} />
                  </div>
                  <span
                    className="text-[11px] font-medium tracking-[0.18em] uppercase"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: 'rgba(63,68,63,0.55)' }}
                  >
                    {value.title}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-8 transition-all duration-600 ${
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                  }`}
                >
                  <div
                    className="rounded-xl p-6 max-w-sm"
                    style={{
                      background: 'rgba(255,255,255,0.82)',
                      border: '1px solid rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-px bg-hulma-orange" />
                      <span className="text-[10px] tracking-[0.22em] uppercase text-hulma-brown/50">
                        Principle 0{value.id}
                      </span>
                    </div>
                    <h3
                      className="font-serif font-light text-hulma-green mb-1 leading-snug"
                      style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-hulma-brown/60 italic text-xs mb-3">{value.tagline}</p>
                    <div className="w-full h-px mb-4" style={{ background: 'rgba(63,68,63,0.10)' }} />
                    <p className="text-sm text-hulma-brown/70 leading-relaxed">{value.description}</p>
                  </div>
                </div>

                {/* Top-right badge */}
                <div className={`absolute top-5 right-5 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.75)',
                      border: '1px solid rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                  >
                    <span className="font-serif font-light text-hulma-green text-xs">0{value.id}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE: vertical tap accordion ── */}
        <div
          className={`flex md:hidden flex-col gap-3 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {values.map((value, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={value.id}
                onClick={() => handleInteraction(index)}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(63,68,63,0.06)',
                  border: `1px solid ${isActive ? 'rgba(177,141,117,0.25)' : 'rgba(63,68,63,0.12)'}`,
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Header row — always visible */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        background: isActive ? 'rgba(177,141,117,0.2)' : 'rgba(63,68,63,0.08)',
                        border: `1px solid ${isActive ? 'rgba(177,141,117,0.3)' : 'rgba(63,68,63,0.15)'}`,
                        transition: 'background 0.3s ease, border-color 0.3s ease',
                      }}
                    >
                      <i
                        className={`${value.icon} text-sm`}
                        style={{ color: isActive ? '#B18D75' : '#7a7a6e', transition: 'color 0.3s ease' }}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-hulma-brown/40 block mb-0.5">
                        Principle 0{value.id}
                      </span>
                      <p className="text-sm font-medium text-hulma-green leading-snug">{value.title}</p>
                    </div>
                  </div>
                  <div
                    className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      background: 'rgba(63,68,63,0.06)',
                      border: '1px solid rgba(63,68,63,0.12)',
                      transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.35s ease',
                    }}
                  >
                    <i className="ri-arrow-down-s-line text-hulma-brown/50 text-sm" />
                  </div>
                </div>

                {/* Expandable body — grid-rows trick for smooth animation */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    {/* Image */}
                    <div className="relative w-full h-44 overflow-hidden">
                      <img
                        src={value.image}
                        alt={value.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="px-5 py-5">
                      <p className="text-xs italic text-hulma-brown/60 mb-3">{value.tagline}</p>
                      <div className="w-full h-px mb-3" style={{ background: 'rgba(63,68,63,0.1)' }} />
                      <p className="text-sm text-hulma-brown/70 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom hint — desktop only */}
        <p
          className={`hidden md:block mt-5 text-center text-[10px] tracking-[0.2em] uppercase text-hulma-brown/30 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Hover to explore each principle
        </p>
        <p
          className={`md:hidden mt-5 text-center text-[10px] tracking-[0.2em] uppercase text-hulma-brown/30 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Tap to explore each principle
        </p>
      </div>
    </section>
  );
}
