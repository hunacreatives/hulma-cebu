import { useEffect, useRef, useState } from 'react';

interface CategoryHeroProps {
  title: string;
  image: string;
}

export default function CategoryHero({ title, image }: CategoryHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Ensure the component is mounted before triggering the animation
  useEffect(() => {
    // Guard against potential SSR where window/document may be undefined
    if (typeof window !== 'undefined') {
      setIsVisible(true);
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[70vh] min-h-[500px] overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className={`
            text-4xl md:text-6xl font-serif font-semibold text-white 
            tracking-[0.15em] text-center uppercase transition-all duration-1000 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
