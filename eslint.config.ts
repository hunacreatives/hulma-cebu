import { useEffect, useState } from 'react';
import { useSEO } from '../../utils/seo';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import ContactHero from './components/ContactHero';
import ContactSection from './components/ContactSection';
import ContactCTA from './components/ContactCTA';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: 'HULMA - Contact Us',
    description: 'Contact HULMA for premium fiberglass architectural materials in Cebu. Reach out to discuss your project needs, request samples, or schedule a consultation with our design team.',
    keywords: 'contact HULMA, fiberglass supplier Cebu, architectural materials inquiry, building materials consultation',
    canonical: '/contact',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact HULMA',
      description: 'Get in touch with HULMA for premium fiberglass architectural materials',
      url: `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/contact`,
      mainEntity: {
        '@type': 'Organization',
        name: 'HULMA',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cebu',
          addressRegion: 'Cebu',
          addressCountry: 'PH',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '10.3157',
          longitude: '123.8854',
        },
      },
    },
  });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header forceDark={true} />
      <main>
        <ContactHero />
        <ContactSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
