import { useEffect, useRef, useState } from 'react';

export default function AboutTagline() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-white">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-lg md:text-xl text-hulma-brown leading-relaxed mb-4">
          Most materials ask you to compromise.
        </p>
        <p className="text-lg md:text-xl text-hulma-green leading-relaxed mb-4">
          <strong className="font-semibold">Fiberglass doesn&apos;t.</strong>
        </p>
        <p className="text-base md:text-lg text-hulma-brown/80 leading-relaxed mb-2">
          At Hulma, fiberglass is not a substitute—it&apos;s a design tool.
        </p>
        <p className="text-base md:text-lg text-hulma-brown/80 leading-relaxed mb-6">
          One that gives form, control, and durability without limits.
        </p>
        <p className="text-base md:text-lg text-hulma-green font-medium">
          This is where <strong>vision meets craft.</strong>
        </p>
      </div>
    </section>
  );
}
