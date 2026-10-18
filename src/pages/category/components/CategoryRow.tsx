
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductCategory } from '../../../mocks/categories';

interface CategoryRowProps {
  category: ProductCategory;
  index: number;
}

export default function CategoryRow({ category, index }: CategoryRowProps) {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lifestyleImages = [
    '/images/site/cat-row-stone-001.webp',
    '/images/site/cat-row-terrazzo-001.webp',
    '/images/site/cat-row-organic-001.webp',
    '/images/site/cat-row-hybrid-001.webp',
  ];

  return (
    <div ref={rowRef} className="relative w-full h-[75vh] min-h-[500px] overflow-hidden group">
      {/* Background Image */}
      <img
        src={lifestyleImages[index % lifestyleImages.length]}
        alt={category.name}
        className="w-full h-full object-cover object-top transition-transform duration-[1.5s] group-hover:scale-[1.03]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Content — slides in from left on scroll */}
      <div className="absolute inset-0 flex items-end pb-16 px-8 lg:px-16">
        <div
          className={`max-w-xl transition-all duration-1000 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Category Name */}
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-3 tracking-wide">
            {category.name}
          </h2>

          {/* Short Description */}
          <p
            className={`text-sm md:text-base text-white/85 leading-relaxed mb-6 max-w-md transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {category.description}
          </p>

          {/* Explore Button */}
          <button
            onClick={() => navigate(`/products/material-look/${category.slug}`)}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/40 text-white text-sm font-medium rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-500 cursor-pointer whitespace-nowrap ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Explore
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line text-sm"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
