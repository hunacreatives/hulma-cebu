import { useEffect, useState } from 'react';

export default function SamplesHero() {
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
          src="https://readdy.ai/api/search-image?query=collection%20of%20premium%20fiberglass%20material%20sample%20swatches%20arranged%20on%20clean%20surface%20earthy%20warm%20tones%20beige%20brown%20cream%20textured%20architectural%20material%20palette%20elegant%20product%20photography%20soft%20natural%20light%20minimal%20background&width=1920&height=600&seq=samples-hero-materials-v1-001&orientation=landscape"
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
            Request your
            <br />
            material <em className="italic text-hulma-brown">samples.</em>
          </h1>
        </div>
      </div>
    </section>
  );
}
