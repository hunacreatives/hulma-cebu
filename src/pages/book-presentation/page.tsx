
import { useEffect, useState } from 'react';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import BookingHero from './components/BookingHero';
import BookingForm from './components/BookingForm';
import { useSEO } from '../../utils/seo';

export default function BookPresentationPage() {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: 'Book a Product Presentation — Hulma Cebu',
    description: 'Schedule a private product presentation to experience HULMA Cebu\'s architectural fiberglass materials in person or virtually. Available for architects, designers, and developers.',
    keywords: 'product presentation, material consultation, architectural fiberglass, design consultation, Cebu fiberglass showroom',
  });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header forceDark={true} />
      <main>
        <BookingHero />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
