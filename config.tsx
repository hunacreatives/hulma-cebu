import { useEffect, useState } from 'react';

export default function ContactHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[44vh] min-h-[320px] flex items-end overflow-hidden">
      {/* Light warm background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=warm%20bright%20minimal%20architectural%20studio%20interior%20soft%20natural%20light%20cream%20white%20walls%20smooth%20plaster%20surface%20airy%20open%20space%20warm%20neutral%20tones%20elegant%20contemporary%20design%20photography&width=1920&height=600&seq=contact-hero-light-v3-001&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(248,244,238,0.82)' }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 70% at 10% 100%, rgba(177,141,117,0.12) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 pb-14">
        <div className="max-w-6xl mx-auto">
          <h1
            className={`font-serif font-light text-hulma-green leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
          >
            Let's bring your
            <br />
            <em className="italic text-hulma-brown">vision</em> to life.
          </h1>
        </div>
      </div>
    </section>
  );
}
