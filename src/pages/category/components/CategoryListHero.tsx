
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
        src="https://readdy.ai/api/search-image?query=Dramatic%20close%20up%20of%20textured%20fiberglass%20architectural%20panels%20in%20warm%20earthy%20terracotta%20and%20brown%20tones%20arranged%20in%20layered%20composition%20showing%20material%20depth%20and%20craftsmanship%20with%20soft%20directional%20lighting%20and%20clean%20modern%20aesthetic&width=1600&height=800&seq=cat-list-hero-001&orientation=landscape"
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
