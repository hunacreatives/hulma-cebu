
import { useEffect, useState } from 'react';

export default function ContactHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Elegant%20modern%20interior%20design%20showroom%20with%20warm%20ambient%20lighting%20featuring%20natural%20stone%20walls%20and%20fiberglass%20architectural%20panels%20displayed%20in%20a%20minimalist%20gallery%20setting%20soft%20golden%20hour%20light%20streaming%20through%20large%20windows%20warm%20beige%20and%20brown%20earth%20tones%20sophisticated%20atmosphere&width=1920&height=1080&seq=contact-hero-showroom-001&orientation=landscape"
          alt="HULMA showroom interior"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/50"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full px-6 lg:px-12 pb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-6">
            Get In Touch
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line text-sm"></i>
            </span>
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight max-w-2xl">
            Let&apos;s Bring Your<br />
            <em className="italic">Vision</em> to Life
          </h1>
        </div>
      </div>
    </section>
  );
}
