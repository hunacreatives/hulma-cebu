
import { useEffect, useState } from 'react';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Industrial%20fiberglass%20manufacturing%20workshop%20interior%20with%20large%20machinery%20equipment%20warm%20lighting%20concrete%20floors%20factory%20production%20line%20architectural%20materials%20being%20fabricated%20workers%20in%20background%20wide%20angle%20shot%20dramatic%20industrial%20atmosphere%20warm%20tones%20brown%20and%20amber%20lighting&width=1920&height=1080&seq=about-hero-factory-001&orientation=landscape"
          alt="HULMA fiberglass manufacturing workshop"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full px-6 lg:px-12 pb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* About Hulma Button */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium">
              About Hulma
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line text-sm"></i>
              </span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-3 items-end text-right">
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-block px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium">
                30+ years in the industry
              </span>
            </div>
            <div
              className={`transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-block px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium">
                500+ Completed Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
