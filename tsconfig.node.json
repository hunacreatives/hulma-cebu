import { useEffect, useRef, useState } from 'react';

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-24 px-6 lg:px-12 bg-hulma-ghost"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <p
          className={`text-xl md:text-2xl lg:text-3xl font-serif font-bold text-hulma-green mb-4 leading-tight transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Fiberglass, without limits.
        </p>

        {/* Row 1 */}
        <p
          className={`text-xs md:text-sm text-hulma-brown font-normal mb-0.5 leading-relaxed mx-auto transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          A material that bends to vision, not the other way around.
        </p>

        {/* Row 2 */}
        <p
          className={`text-xs md:text-sm text-hulma-brown font-normal mb-12 leading-relaxed mx-auto transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          Lightweight yet strong, precise yet expressive, fiberglass allows forms, textures, and scales that traditional materials can&apos;t achieve.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <a
            href="#products"
            className="px-6 py-2.5 bg-hulma-green text-white rounded-full text-[11px] font-medium hover:bg-hulma-brown transition-all whitespace-nowrap cursor-pointer tracking-wide"
          >
            Discover Our Materials
          </a>
          <a
            href="#inspiration"
            className="text-hulma-green text-[11px] font-medium hover:text-hulma-orange transition-colors whitespace-nowrap cursor-pointer underline underline-offset-4 tracking-wide"
          >
            Explore Projects
          </a>
        </div>
      </div>
    </section>
  );
}