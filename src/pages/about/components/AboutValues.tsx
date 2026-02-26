import { useEffect, useRef, useState } from 'react';

const values = [
  {
    id: 1,
    title: 'Made-to-Order Craft',
    description:
      'We don\u2019t work from catalogs. Every piece is made to order, built from drawings, sketches, and real project needs.',
    image:
      'https://readdy.ai/api/search-image?query=Fiberglass%20architectural%20panels%20being%20handcrafted%20in%20workshop%20warm%20amber%20lighting%20artisan%20hands%20shaping%20curved%20material%20pieces%20custom%20fabrication%20process%20detailed%20craftsmanship%20warm%20brown%20tones%20industrial%20workshop%20setting&width=500&height=350&seq=about-value-craft-001&orientation=landscape',
  },
  {
    id: 2,
    title: 'Material Freedom',
    description:
      'Fiberglass lets us bend, curve, texture, and scale without forcing the design to compromise. What you draw is what we build.',
    image:
      'https://readdy.ai/api/search-image?query=Curved%20fiberglass%20architectural%20element%20being%20molded%20flexible%20material%20design%20freedom%20organic%20shapes%20smooth%20surface%20warm%20studio%20lighting%20contemporary%20fabrication%20process%20warm%20neutral%20tones&width=500&height=350&seq=about-value-freedom-001&orientation=landscape',
  },
  {
    id: 3,
    title: 'Trusted Collaboration',
    description:
      'With over 30 years of experience, we work closely with architects, designers, and builders to deliver project-specific solutions.',
    image:
      'https://readdy.ai/api/search-image?query=Architects%20and%20designers%20reviewing%20architectural%20material%20samples%20together%20in%20modern%20studio%20collaborative%20meeting%20warm%20lighting%20professional%20team%20discussion%20fiberglass%20panels%20on%20table%20warm%20brown%20neutral%20tones&width=500&height=350&seq=about-value-collab-001&orientation=landscape',
  },
];

export default function AboutValues() {
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
    <section ref={sectionRef} className="py-20 px-6 lg:px-12 bg-hulma-ghost">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div
              key={value.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6">
                <img
                  src={value.image}
                  alt={value.title}
                  title={`HULMA ${value.title} - fiberglass architectural craftsmanship`}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-base font-semibold text-hulma-green mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-hulma-brown/80 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
