import { useEffect, useRef, useState } from 'react';

const capabilities = [
  {
    id: 1,
    title: 'Architectural Elements and Facade Details',
    image:
      'https://readdy.ai/api/search-image?query=Architectural%20fiberglass%20facade%20detail%20panel%20installed%20on%20modern%20building%20exterior%20warm%20brown%20terracotta%20tones%20clean%20lines%20contemporary%20design%20close-up%20shot%20warm%20natural%20lighting&width=400&height=350&seq=about-wwd-facade-001&orientation=landscape',
  },
  {
    id: 2,
    title: 'Interior Cladding, Decorative Panels',
    image:
      'https://readdy.ai/api/search-image?query=Interior%20wall%20cladding%20decorative%20fiberglass%20panels%20modern%20hotel%20lobby%20warm%20ambient%20lighting%20elegant%20design%20textured%20surface%20warm%20neutral%20brown%20tones%20contemporary%20architecture&width=400&height=350&seq=about-wwd-interior-001&orientation=landscape',
  },
  {
    id: 3,
    title: 'Custom Animal Forms & Sculptures',
    image:
      'https://readdy.ai/api/search-image?query=Large%20fiberglass%20animal%20sculptures%20safari%20themed%20elephant%20giraffe%20realistic%20detailed%20artistic%20fabrication%20warm%20studio%20lighting%20brown%20earth%20tones%20workshop%20setting%20display%20pieces&width=400&height=350&seq=about-wwd-safari-001&orientation=landscape',
  },
  {
    id: 4,
    title: 'Sculptural Installations',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20fiberglass%20sculptural%20installation%20modern%20art%20piece%20smooth%20white%20organic%20curved%20forms%20contemporary%20gallery%20setting%20soft%20lighting%20minimalist%20elegant%20design%20warm%20neutral%20background&width=400&height=350&seq=about-wwd-sculpture-001&orientation=landscape',
  },
  {
    id: 5,
    title: 'Bollards and Outdoor Garden Pots',
    image:
      'https://readdy.ai/api/search-image?query=Modern%20fiberglass%20garden%20pots%20and%20bollards%20outdoor%20landscape%20design%20contemporary%20planters%20geometric%20shapes%20warm%20earth%20tones%20garden%20setting%20natural%20lighting%20green%20plants&width=400&height=350&seq=about-wwd-garden-001&orientation=landscape',
  },
  {
    id: 6,
    title: 'Domes, Canopies, Pergolas',
    image:
      'https://readdy.ai/api/search-image?query=Fiberglass%20dome%20canopy%20pergola%20structure%20modern%20architectural%20outdoor%20covering%20curved%20elegant%20design%20warm%20lighting%20contemporary%20building%20exterior%20warm%20brown%20tones&width=400&height=350&seq=about-wwd-domes-001&orientation=landscape',
  },
  {
    id: 7,
    title: 'Outdoor Furniture',
    image:
      'https://readdy.ai/api/search-image?query=Modern%20fiberglass%20outdoor%20furniture%20chairs%20tables%20sleek%20contemporary%20design%20poolside%20resort%20setting%20warm%20ambient%20lighting%20elegant%20minimalist%20warm%20neutral%20tones&width=400&height=350&seq=about-wwd-furniture-001&orientation=landscape',
  },
  {
    id: 8,
    title: 'Custom Forms and Shapes from Your Drawings',
    image:
      'https://readdy.ai/api/search-image?query=Custom%20fiberglass%20mold%20being%20created%20from%20architectural%20drawings%20blueprints%20workshop%20fabrication%20process%20unique%20shapes%20warm%20lighting%20artisan%20craftsmanship%20warm%20brown%20tones%20industrial%20setting&width=400&height=350&seq=about-wwd-custom-001&orientation=landscape',
  },
];

export default function WhatWeDo() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-hulma-green">
            <a href="/about" className="cursor-pointer">What We Do</a>
          </h4>
        </div>
        <p
          className={`text-sm text-hulma-brown/80 mb-12 max-w-2xl leading-relaxed transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Hulma designs and fabricates custom fiberglass pieces for architecture, interiors, and landscapes.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {capabilities.map((item, index) => (
            <a
              key={item.id}
              href="/about"
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  title={`HULMA - ${item.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs font-medium text-hulma-green leading-snug group-hover:text-hulma-orange transition-colors">
                {item.title}
              </p>
            </a>
          ))}
        </div>

        <p className="text-xs text-hulma-brown/60 mt-8 italic">
          *Every piece is made to order
        </p>
      </div>
    </section>
  );
}
