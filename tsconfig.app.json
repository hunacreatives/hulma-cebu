import { useEffect, useState } from 'react';

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/4d5ac0876686ef10bdd779de2ab9c5e7.png"
          alt="Modern architectural interior"
          className="w-full h-full object-cover object-top animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6">
        <div
          className="overflow-hidden"
          style={{ lineHeight: 1.1 }}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight transition-all duration-1000 ease-out cursor-default"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? 'translateY(0)' : 'translateY(60px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Your Vision,{' '}
            <em
              className="not-italic font-medium relative inline-block"
              style={{
                color: hovered ? 'rgb(188, 170, 148)' : 'white',
                transition: 'color 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: hovered ? 'translateY(-2px)' : 'translateY(0px)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                Our Craft.
              </span>
              {/* Underline sweep */}
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  height: '1px',
                  width: hovered ? '100%' : '0%',
                  background: 'rgb(188, 170, 148)',
                  transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'block',
                }}
              />
            </em>
          </h1>
        </div>
      </div>
    </section>
  );
}
