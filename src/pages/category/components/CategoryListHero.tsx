
import { useEffect, useState } from 'react';

interface CategoryListHeroProps {
  title: string;
}

export default function CategoryListHero({ title }: CategoryListHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <img
        src="/images/site/cat-list-hero-001.webp"
        alt={title}
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className={`text-4xl md:text-6xl font-serif font-semibold text-white tracking-[0.15em] text-center uppercase transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
