
import { useEffect, useState } from 'react';

export default function SamplesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the entrance animation once the component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Collection%20of%20premium%20material%20samples%20arranged%20neatly%20on%20warm%20beige%20surface%20natural%20stone%20fiberglass%20terracotta%20swatches%20elegant%20product%20photography%20soft%20diffused%20lighting%20architectural%20material%20palette%20earthy%20tones&width=1920&height=800&seq=samples-hero-001&orientation=landscape"
          alt="Material samples collection"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      <div
        className={`relative z-10 text-center px-6 max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[4px] text-white/60 mb-4">
          Material Samples
        </p>
        <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
          Request Product Samples
        </h2>
        <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
          Request material samples to evaluate our fiberglass finishes for your project. Experience the quality, texture, and finish options firsthand.
        </p>
      </div>
    </section>
  );
}
