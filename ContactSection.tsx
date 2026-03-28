import { useEffect, useState } from 'react';

export default function BookingHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[44vh] min-h-[320px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=elegant%20Filipino%20interior%20design%20showroom%20warm%20wood%20tones%20rattan%20woven%20textures%20natural%20materials%20product%20display%20table%20two%20Filipino%20professionals%20reviewing%20material%20samples%20together%20warm%20ambient%20light%20nipa-inspired%20modern%20contemporary%20space%20Cebu%20Philippines%20earthy%20neutral%20tones%20refined%20artisan%20setting&width=1920&height=600&seq=booking-hero-filipino-v1-001&orientation=landscape"
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

      <div className="relative z-10 w-full px-6 lg:px-12 pb-14">
        <div className="max-w-6xl mx-auto">
          <h1
            className={`font-serif font-light text-hulma-green leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
          >
            Book a product
            <br />
            <em className="italic text-hulma-brown">presentation.</em>
          </h1>
        </div>
      </div>
    </section>
  );
}