import { useEffect, useRef, useState } from 'react';

const bulletPoints = [
  'Architectural wall and façade elements',
  'Sculptural installations',
  'Custom animal and art forms',
  'Decorative objects, pots, and planters',
  'Outdoor furniture',
  'Landscape and site-specific pieces',
];

const stats = [
  { value: '30+', label: 'Years of experience' },
  { value: '500+', label: 'Completed projects' },
];

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-0 px-6 lg:px-16 overflow-hidden"
      style={{ background: '#FAFAF8' }}
    >
      {/* ── Top label bar ── */}
      <div className="max-w-7xl mx-auto pt-12 md:pt-20 pb-8 md:pb-10">
        <div
          className={`flex items-center gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex-1 h-px bg-hulma-green/10 lg:hidden" />
          <span
            className="font-serif font-light text-hulma-green"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.5rem)' }}
          >
            Our Story
          </span>
          <div className="flex-1 h-px bg-hulma-green/10" />
        </div>
      </div>

      {/* ── Main split layout ── */}
      <div className="max-w-7xl mx-auto pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-14 items-start">

          {/* LEFT — sticky image panel */}
          <div
            className={`lg:sticky lg:top-24 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden w-full">
              <img
                src="https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/4d2efdee661260035aaa5af8c591651d.png"
                alt="Raul S. Masaya, Founder of HULMA Fiberglass Cebu"
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hulma-green/70 via-hulma-green/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 px-7 py-6">
                <p className="text-sm font-medium text-white/90 font-serif">Raul S. Masaya</p>
                <p className="text-white/55 tracking-widest uppercase mt-0.5" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
                  Founder, HULMA Fiberglass
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — text content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Headline as quote */}
            <div className="mb-10 relative lg:pl-5">
              {/* Desktop quote mark — absolute positioned */}
              <span
                className="hidden lg:block absolute -top-4 -left-1 font-serif text-hulma-orange/30 leading-none select-none"
                style={{ fontSize: '4rem', lineHeight: 1 }}
              >
                &ldquo;
              </span>
              <div className="flex flex-col gap-1">
                <h3
                  className="font-serif font-light text-hulma-green leading-snug text-center lg:text-left"
                  style={{ fontSize: 'clamp(1.05rem, 4.5vw, 2.1rem)' }}
                >
                  <span
                    className="lg:hidden font-serif text-hulma-orange/35 select-none"
                    style={{ fontSize: 'clamp(1.4rem, 5.5vw, 2.6rem)', lineHeight: 1, verticalAlign: 'middle', marginRight: '0.1em' }}
                  >
                    &ldquo;
                  </span>
                  Not everything should be standard.
                </h3>
                <h3
                  className="font-serif italic text-hulma-brown leading-snug text-center lg:text-left"
                  style={{ fontSize: 'clamp(1.05rem, 4.5vw, 2.1rem)' }}
                >
                  Especially the spaces we shape.&rdquo;
                </h3>
              </div>
            </div>

            <div className="w-10 h-px bg-hulma-orange/50 mb-10 mx-auto lg:mx-0" />

            {/* Body paragraphs */}
            <div className="space-y-5">
              <p className="text-sm text-hulma-brown/75 leading-relaxed">
                Hulma began with a simple question: Why should form be limited by standard sizes, familiar looks, or ready-made solutions?
              </p>
              <p className="text-sm text-hulma-brown/75 leading-relaxed">
                Rooted in architecture and hands-on fabrication, we chose to work differently. Instead of forcing ideas into existing products, we built a process that shapes materials around the designer&apos;s vision.
              </p>
              <p className="text-sm text-hulma-brown/75 leading-relaxed">
                Fiberglass became our medium — not for convenience, but for its{' '}
                <strong className="text-hulma-green font-medium">strength, flexibility, and freedom of form.</strong>
              </p>
            </div>

            {/* What we make */}
            <div className="mt-8 pl-5 border-l-2 border-hulma-orange/30">
              <p
                className="text-xs font-medium text-hulma-brown/40 tracking-widest uppercase mb-3"
                style={{ letterSpacing: '0.14em' }}
              >
                Our work spans
              </p>
              <div className="space-y-1.5">
                {bulletPoints.map((point, i) => (
                  <p
                    key={i}
                    className={`text-sm text-hulma-green/80 leading-snug transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    style={{ transitionDelay: `${400 + i * 70}ms` }}
                  >
                    {point}
                  </p>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className={`mt-10 flex gap-10 justify-center lg:justify-start transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="font-serif font-light text-hulma-green leading-none"
                    style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-hulma-brown/45 mt-1.5" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
          {/* END RIGHT COLUMN */}

        </div>
        {/* END GRID */}

        {/* ── Full-width closing ── */}
        <div
          className={`mt-12 md:mt-16 pt-10 md:pt-12 border-t border-hulma-green/10 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Two closing paragraphs — merged into one */}
          <div className="mb-12">
            <p className="text-sm text-hulma-brown/70 leading-relaxed text-center">
              Hulma has grown into a collaborative studio based in Cebu, Philippines — working closely with architects, interior designers, and builders across projects of all scales. Today, we continue to push beyond flat surfaces and predictable finishes — exploring depth, curvature, and material expression to create work that feels intentional, tactile, and fully part of the space it inhabits.
            </p>
          </div>

          {/* Glowing closing statement */}
          <div
            className={`relative flex items-center justify-center py-10 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <style>{`
              @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .moving-gradient-text {
                background: linear-gradient(135deg, #3F443F, #C4956A, #B18D75, #8a7060, #C4956A, #B18D75, #3F443F);
                background-size: 300% 300%;
                animation: gradientShift 6s ease infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                filter: drop-shadow(0 0 18px rgba(196,149,106,0.55)) drop-shadow(0 0 40px rgba(196,149,106,0.25));
              }
            `}</style>
            <p
              className="moving-gradient-text relative font-serif font-light leading-tight text-center"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}
            >
              Your vision.{' '}
              <em className="italic">Our craft.</em>
            </p>
          </div>
        </div>

      </div>
      {/* END MAX-W CONTAINER */}

    </section>
  );
}
