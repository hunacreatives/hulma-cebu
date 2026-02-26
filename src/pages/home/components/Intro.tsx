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
      className="py-16 px-6 lg:px-12 bg-hulma-ghost"
    >
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-lg md:text-xl font-serif font-light text-hulma-green mb-5 leading-relaxed">
          Fiberglass, without limits.
        </p>
        <p className="text-sm md:text-[15px] text-hulma-brown mb-8 leading-relaxed max-w-xl mx-auto">
          A material that bends to vision, not the other way around. Lightweight yet strong, precise yet expressive, fiberglass allows forms, textures, and scales that traditional materials can&apos;t achieve.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#products"
            className="px-6 py-3 bg-hulma-green text-white rounded-full text-xs font-medium hover:bg-hulma-brown transition-all whitespace-nowrap cursor-pointer tracking-wide"
          >
            View Our Materials
          </a>
          <a
            href="#inspiration"
            className="text-hulma-green text-xs font-medium hover:text-hulma-orange transition-colors whitespace-nowrap cursor-pointer underline underline-offset-4 tracking-wide"
          >
            Explore Projects
          </a>
        </div>

        {/* Subtle divider */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="block w-12 h-px bg-hulma-brown/15"></span>
          <span className="block w-1.5 h-1.5 rounded-full bg-hulma-brown/20"></span>
          <span className="block w-12 h-px bg-hulma-brown/15"></span>
        </div>
      </div>
    </section>
  );
}
