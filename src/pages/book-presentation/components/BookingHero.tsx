
import { useEffect, useState } from 'react';

export default function BookingHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Elegant%20modern%20showroom%20interior%20with%20warm%20ambient%20lighting%20natural%20stone%20wall%20panels%20soft%20beige%20tones%20architectural%20presentation%20space%20minimalist%20luxury%20design%20warm%20earthy%20atmosphere%20professional%20setting&width=1920&height=800&seq=booking-hero-001&orientation=landscape"
          alt="Product presentation showroom"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      <div
        className={`relative z-10 text-center px-6 max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[4px] text-white/60 mb-4">
          Private Viewing
        </p>
        <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
          Book a Product Presentation
        </h2>
        <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
          Schedule a private product presentation to experience our architectural fiberglass materials firsthand. Available in-person or virtually.
        </p>
      </div>
    </section>
  );
}
