import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Natural Stone Look',
    image:
      '/images/d912c870cf912a368974d4fef7a553e3.jpeg',
  },
  {
    id: 2,
    name: 'Terrazzo Look',
    image:
      '/images/7f6d95a8745cc8f0e12e9677cdbc0700.jpeg',
  },
  {
    id: 3,
    name: 'Limestone',
    image:
      '/images/9bcb8ecbc7371b9a0570cc7d81344810.png',
  },
  {
    id: 4,
    name: 'Custom',
    image:
      '/images/7cb17a2720703a994ecbebd01424183f.jpeg',
  },
];

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animKey, setAnimKey] = useState(0);
  const [btnActive, setBtnActive] = useState<'prev' | 'next' | null>(null);
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
    setDirection('left');
    setAnimKey((k) => k + 1);
    setBtnActive('prev');
    setTimeout(() => setBtnActive(null), 300);
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('right');
    setAnimKey((k) => k + 1);
    setBtnActive('next');
    setTimeout(() => setBtnActive(null), 300);
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
      className="pt-8 pb-14 md:pb-24 px-6 lg:px-12 bg-hulma-ghost relative"
      data-product-shop
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-lg md:text-xl font-serif font-light text-center mb-10 text-hulma-brown transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Discover Our Materials
        </h2>

        <div className="relative px-0 md:px-16">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-lg cursor-pointer ${
              btnActive === 'prev' ? 'scale-90 bg-white' : 'scale-100'
            }`}
            aria-label="Previous products"
          >
            <i className={`ri-arrow-left-s-line text-2xl text-hulma-green transition-transform duration-200 ${btnActive === 'prev' ? '-translate-x-1' : ''}`}></i>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-lg cursor-pointer ${
              btnActive === 'next' ? 'scale-90 bg-white' : 'scale-100'
            }`}
            aria-label="Next products"
          >
            <i className={`ri-arrow-right-s-line text-2xl text-hulma-green transition-transform duration-200 ${btnActive === 'next' ? 'translate-x-1' : ''}`}></i>
          </button>

          <div
            key={animKey}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4"
          >
            {visibleProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className={`group cursor-pointer ${
                  isVisible
                    ? direction === 'right'
                      ? 'carousel-card-drift-right'
                      : 'carousel-card-drift-left'
                    : 'opacity-0'
                }`}
                style={{ perspective: '1000px', animationDelay: `${index * 110}ms` }}
                onClick={handleProductClick}
              >
                <div className="relative overflow-hidden rounded-3xl bg-hulma-taupe/20 aspect-[4/6] w-full h-auto group-hover:[transform:rotateY(2deg)_rotateX(-2deg)] transition-transform duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition-all duration-400" />

                  {/* Shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>

                  {/* Name centered by default, nudges up on hover; Coming Soon fades in centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-sm font-medium text-white drop-shadow-lg group-hover:-translate-y-3 transition-transform duration-500">
                      {product.name}
                    </h3>
                    <p className="text-[10px] tracking-widest uppercase text-white/70 mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      Coming Soon
                    </p>
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