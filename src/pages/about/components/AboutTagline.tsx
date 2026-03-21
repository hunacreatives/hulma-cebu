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
    <section ref={sectionRef} className="py-6 md:py-10 px-6 lg:px-12 bg-white">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p
          className="font-serif text-hulma-brown/70 leading-snug mb-0.5"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', textWrap: 'balance' } as React.CSSProperties}
        >
          Most materials ask you to compromise.
        </p>
        <p
          className="font-serif font-semibold text-hulma-green leading-snug mb-2.5"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', textWrap: 'balance' } as React.CSSProperties}
        >
          Fiberglass doesn&apos;t.
        </p>
        <p
          className="font-serif text-hulma-brown/75 leading-snug mb-0.5"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', textWrap: 'balance' } as React.CSSProperties}
        >
          At Hulma, fiberglass is not a substitute—it&apos;s a design tool.
        </p>
        <p
          className="font-serif text-hulma-brown/75 leading-snug mb-2.5"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', textWrap: 'balance' } as React.CSSProperties}
        >
          One that gives form, control, and durability without limits.
        </p>
        <p
          className="font-serif font-semibold text-hulma-green leading-snug"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', textWrap: 'balance' } as React.CSSProperties}
        >
          This is where vision meets craft.
        </p>
      </div>
    </section>
  );
}