
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/4d5ac0876686ef10bdd779de2ab9c5e7.png"
          alt="Modern architectural interior"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
      </div>

      {/* Content — only the headline */}
      <div
        className={`relative z-10 w-full px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-2xl md:text-4xl font-serif font-light text-white tracking-tight leading-tight">
          Your Vision, <strong className="font-medium whitespace-nowrap">Our Craft.</strong>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-white text-2xl"></i>
      </div>
    </section>
  );
}
