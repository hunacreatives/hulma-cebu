
import { useEffect, useState } from 'react';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import SamplesHero from './components/SamplesHero';
import SamplesForm from './components/SamplesForm';
import { useSEO } from '../../utils/seo';

export default function RequestSamplesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: 'Request Material Samples — Hulma Cebu',
    description: 'Request free material samples from HULMA Cebu to evaluate fiberglass finishes for your project. Terracotta, limestone, sandstone, and custom textures available for architects and designers.',
    keywords: 'fiberglass material samples, fiberglass samples Philippines, architectural material samples Cebu, terracotta fiberglass, limestone fiberglass, sandstone fiberglass',
  });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header forceDark={true} />
      <main>
        <SamplesHero />
        <SamplesForm />
      </main>
      <Footer />
    </div>
  );
}
