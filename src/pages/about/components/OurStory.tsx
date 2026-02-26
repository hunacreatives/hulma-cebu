
import { useEffect, useRef, useState } from 'react';

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-hulma-green">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Label */}
          <div className="lg:col-span-2">
            <span
              className={`text-sm font-medium text-hulma-taupe transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Our Story
            </span>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-10">
            <h2
              className={`text-3xl md:text-4xl font-serif font-light text-hulma-ghost mb-10 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Not everything should be standard.<br />
              <strong className="font-semibold">Especially the spaces we shape.</strong>
            </h2>

            <div
              className={`space-y-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-sm text-hulma-taupe leading-relaxed">
                Hulma began with a simple question:<br />
                Why should form be limited by standard sizes, familiar looks, or ready-made solutions?
              </p>

              <p className="text-sm text-hulma-taupe leading-relaxed">
                Rooted in architecture and hands-on fabrication, we chose to work differently. Instead of forcing ideas into existing products, we built a process that shapes materials around the designer&apos;s vision.
              </p>

              <p className="text-sm text-hulma-taupe leading-relaxed">
                Fiberglass became our medium, not for convenience, but for its strength, flexibility, and freedom of form.
              </p>

              <p className="text-sm text-hulma-taupe leading-relaxed">
                We create made-to-order fiberglass pieces shaped directly from ideas and drawings.<br />
                Our work spans:
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 pl-4">
                <ul className="space-y-2">
                  <li className="text-sm text-hulma-taupe flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hulma-orange mt-1.5 flex-shrink-0"></span>
                    Architectural wall and facade elements
                  </li>
                  <li className="text-sm text-hulma-taupe flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hulma-orange mt-1.5 flex-shrink-0"></span>
                    Sculptural installations
                  </li>
                  <li className="text-sm text-hulma-taupe flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hulma-orange mt-1.5 flex-shrink-0"></span>
                    Custom animal and art forms
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="text-sm text-hulma-taupe flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hulma-orange mt-1.5 flex-shrink-0"></span>
                    Decorative objects, pots, and planters
                  </li>
                  <li className="text-sm text-hulma-taupe flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hulma-orange mt-1.5 flex-shrink-0"></span>
                    Outdoor furniture
                  </li>
                  <li className="text-sm text-hulma-taupe flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hulma-orange mt-1.5 flex-shrink-0"></span>
                    Landscape and site-specific pieces
                  </li>
                </ul>
              </div>

              <p className="text-sm text-hulma-taupe leading-relaxed pt-2">
                With over 30 years of industry experience and 500+ completed projects, Hulma has grown into a collaborative studio based in Cebu, Philippines, working closely with architects, interior designers, and builders across projects of all scales.
              </p>

              <p className="text-sm text-hulma-taupe leading-relaxed">
                Today, we continue to push beyond flat surfaces and predictable finishes&mdash;exploring depth, curvature, and material expression to create work that feels intentional, tactile, and fully part of the space it inhabits.
              </p>

              <p className="text-sm text-hulma-ghost leading-relaxed pt-2">
                <strong className="font-semibold underline underline-offset-4">Your vision.</strong> Our craft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
