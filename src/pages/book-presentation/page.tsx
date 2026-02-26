
import { useEffect, useState } from 'react';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import BookingHero from './components/BookingHero';
import BookingForm from './components/BookingForm';

export default function BookPresentationPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure the component is visible after mount and scroll to top
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main>
        <BookingHero />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
