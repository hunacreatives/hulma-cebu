import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Natural Stone Look',
    image:
      'https://readdy.ai/api/search-image?query=Natural%20stone%20texture%20fiberglass%20architectural%20panel%20beige%20cream%20limestone%20appearance%20smooth%20refined%20surface%20modern%20premium%20material%20sample%20clean%20minimal%20background%20professional%20product%20photography&width=400&height=400&seq=product-natural-stone-002&orientation=squarish',
  },
  {
    id: 2,
    name: 'Terrazzo Look',
    image:
      'https://readdy.ai/api/search-image?query=Terrazzo%20texture%20fiberglass%20architectural%20panel%20speckled%20aggregate%20pattern%20neutral%20tones%20smooth%20surface%20modern%20premium%20material%20sample%20clean%20minimal%20background%20professional%20product%20photography&width=400&height=400&seq=product-terrazzo-002&orientation=squarish',
  },
  {
    id: 3,
    name: 'Organic',
    image:
      'https://readdy.ai/api/search-image?query=Organic%20texture%20fiberglass%20architectural%20panel%20natural%20flowing%20pattern%20warm%20neutral%20tones%20textured%20surface%20modern%20premium%20material%20sample%20clean%20minimal%20background%20professional%20product%20photography&width=400&height=400&seq=product-organic-002&orientation=squarish',
  },
  {
    id: 4,
    name: 'Custom Forms',
    image:
      'https://readdy.ai/api/search-image?query=Custom%20fiberglass%20architectural%20element%20sculptural%20form%20modern%20design%20warm%20neutral%20tones%20contemporary%20material%20geometric%20pattern%20clean%20minimal%20background%20professional%20product%20photography&width=400&height=400&seq=product-custom-003&orientation=squarish',
  },
];

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  // Observe section visibility for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProductClick = () => {
    try {
      navigate('/coming-soon');
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // Build a sliding window of four items (wrap‑around)
  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
    products[(currentIndex + 3) % products.length],
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="pt-8 pb-24 px-6 lg:px-12 bg-hulma-ghost relative"
      data-product-shop
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-xl md:text-2xl font-serif font-light text-center mb-10 text-hulma-brown transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our Materials
        </h2>

        <div className="relative px-0 md:px-16">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all shadow-lg cursor-pointer"
            aria-label="Previous products"
          >
            <i className="ri-arrow-left-s-line text-2xl text-hulma-green"></i>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all shadow-lg cursor-pointer"
            aria-label="Next products"
          >
            <i className="ri-arrow-right-s-line text-2xl text-hulma-green"></i>
          </button>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {visibleProducts.map((product, index) => (
              <div
                key={`${product.id}-${currentIndex}-${index}`}
                className={`group cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={handleProductClick}
              >
                <div className="relative overflow-hidden rounded-3xl bg-hulma-taupe/20 aspect-[4/6] w-full h-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-base font-medium text-white drop-shadow-lg">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
