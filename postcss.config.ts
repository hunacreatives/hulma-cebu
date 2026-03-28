import { useEffect, useRef, useState } from 'react';

const clients = [
  { id: 1, name: 'Crown Regency', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/09c23f55db03c7cfa00145638ec8abc0.png' },
  { id: 2, name: 'Solea', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/3e5b0662d1dc97f7dea0b82a9e779aaf.png' },
  { id: 3, name: 'Kenjelo', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/65065cc48ce03baeaea2017b3b57459e.png' },
  { id: 4, name: 'Casino Filipino', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/80f4e57b674cab0da4a90ec4763318a2.png' },
  { id: 5, name: 'Mango Daycare', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/84cebfa8ea5718f488e60bf15bc17ea5.png' },
  { id: 6, name: 'Dosage', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/631aa53423aa4567025fc5fb19af8810.png' },
  { id: 7, name: 'Fifties Cafe', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/2a621138e7eba8f5e79035fba28b1e50.png' },
  { id: 8, name: 'Palace Casino', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/cd9eacbe9268de453b5a7a3b385be8b4.png' },
  { id: 9, name: 'FS Architects', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/a1aa46be0122728e3a9a1d2f871f77db.png' },
  { id: 10, name: 'Kite PH', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/115feb98ba44fb7d99600f4a95b5236a.png' },
  { id: 11, name: 'MOD', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/de232222583d5b7d529858a2794b0f3a.png' },
  { id: 12, name: 'LK Bakery', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/0e4504edafad9f29b3bccab5d057d2a6.png' },
  { id: 13, name: 'Client 13', logo: 'https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/3eed00b508d5dee60aed93dc830e214e.png' },
  { id: 14, name: 'Client 14', logo: 'https://storage.readdy-site.link/project_files/b63dedce-304e-445f-9039-a113450b67ef/5c411155-828a-4662-9ad6-c9d45e39cdbd_18.png?v=0180772e40f29a385692e4963f5d78d4' },
  { id: 15, name: 'Client 15', logo: 'https://storage.readdy-site.link/project_files/b63dedce-304e-445f-9039-a113450b67ef/9ccd21e7-8208-47a8-a0d1-9c1b2ffc08d5_19.png?v=c04a8cad04415fd901faf4ff00984a34' },
];

const row1 = clients.slice(0, 7);
const row2 = clients.slice(7);

interface MarqueeRowProps {
  items: typeof clients;
  direction: 'left' | 'right';
  isVisible: boolean;
}

function MarqueeRow({ items, direction, isVisible }: MarqueeRowProps) {
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full relative">
      {/* Fade mask on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-hulma-green to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-hulma-green to-transparent z-10 pointer-events-none"></div>
      
      <div
        className={`flex items-center gap-8 w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } ${isPaused ? '[animation-play-state:paused]' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {doubled.map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className={`flex-shrink-0 w-44 h-16 flex items-center justify-center transition-all duration-700 ${
              isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <img
              src={client.logo}
              alt={client.name}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:brightness-0 hover:invert hover:opacity-100 transition-all duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="py-10 bg-hulma-green overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2
          className={`text-lg md:text-xl font-serif font-light text-center mb-6 text-hulma-ghost transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our Clients
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeRow items={row1} direction="left" isVisible={isVisible} />
        <MarqueeRow items={row2} direction="right" isVisible={isVisible} />
      </div>
    </section>
  );
}