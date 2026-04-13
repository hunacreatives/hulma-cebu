
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductCategory } from '../../../mocks/categories';

interface CategoryCardProps {
  category: ProductCategory;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/products/material-look/${category.slug}`);
  };

  return (
    <div ref={cardRef} className="relative w-full">
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div
          className={`absolute bottom-0 left-0 right-0 p-8 md:p-10 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <h3 className="text-2xl md:text-3xl font-serif font-medium text-white mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-white/80 max-w-md leading-relaxed mb-4">
            {category.description}
          </p>
          <a
            href={`/products/material-look/${category.slug}`}
            onClick={handleExplore}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium hover:bg-white/30 transition-all cursor-pointer whitespace-nowrap"
          >
            Explore
          </a>
        </div>
      </div>
    </div>
  );
}
