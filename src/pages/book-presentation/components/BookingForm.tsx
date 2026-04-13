import { useEffect, useRef, useState } from 'react';

export default function BookingForm() {
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
    <section ref={sectionRef} className="relative py-20 px-6 lg:px-12 overflow-hidden bg-hulma-ghost">
      <div
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="mb-10">
          <span
            className="font-serif font-light text-hulma-green block mb-3"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.5rem)' }}
          >
            Pick a time.
          </span>
          <p className="text-sm text-hulma-brown/60 leading-relaxed">
            Schedule a private walkthrough to experience our architectural fiberglass materials firsthand — in person or virtually.
          </p>
        </div>

        {/* Calendly iframe */}
        <div
          className="rounded-2xl overflow-hidden bg-white"
          style={{ border: '1px solid rgba(191,184,174,0.25)' }}
        >
          <iframe
            src="https://calendly.com/hulmacebu/30min"
            width="100%"
            height="700"
            frameBorder="0"
            title="Book a Product Presentation with HULMA Fiberglass"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}