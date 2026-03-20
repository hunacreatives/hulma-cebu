
import { useEffect, useState } from 'react';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import SamplesHero from './components/SamplesHero';
import SamplesForm from './components/SamplesForm';

export default function RequestSamplesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure the component starts visible after mount
    setIsVisible(true);
    // Scroll to top when the page loads
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
