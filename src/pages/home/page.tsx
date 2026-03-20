import { useEffect, useState } from 'react';
import { useSEO } from '../../utils/seo';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Products from './components/Products';
import Inspiration from './components/Inspiration';
import Clients from './components/Clients';
import Transform from './components/Transform';
import Footer from './components/Footer';
import AnimatedSection from '../../components/feature/AnimatedSection';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: 'HULMA',
    description: 'HULMA crafts architectural excellence through innovative fiberglass solutions in Cebu. Lightweight yet strong, precise yet expressive - discover materials that bend to your vision. Premium terracotta, limestone, and custom fiberglass products for hospitality, residential, and commercial spaces.',
    keywords: 'fiberglass Cebu, architectural materials Cebu, terracotta, limestone, custom design, building materials, premium materials',
    canonical: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'HULMA',
      url: `${import.meta.env.VITE_SITE_URL || 'https://example.com'}`,
      logo: `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/logo.png`,
      description: 'Premium fiberglass architectural materials manufacturer in Cebu',
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
      sameAs: [],
    },
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <Hero />

      <AnimatedSection direction="up" duration="slow" threshold={0.15}>
        <Intro />
      </AnimatedSection>

      <AnimatedSection direction="up" duration="slow" delay={0} threshold={0.1} rootMargin="0px 0px -60px 0px">
        <Products />
      </AnimatedSection>

      <AnimatedSection direction="fade" duration="slow" threshold={0.1} rootMargin="0px 0px -60px 0px">
        <Inspiration />
      </AnimatedSection>

      <AnimatedSection direction="up" duration="slow" threshold={0.1} rootMargin="0px 0px -40px 0px">
        <Clients />
      </AnimatedSection>

      <AnimatedSection direction="scale" duration="slow" threshold={0.15} rootMargin="0px 0px -40px 0px">
        <Transform />
      </AnimatedSection>

      <AnimatedSection direction="up" duration="normal" threshold={0.05} rootMargin="0px 0px -20px 0px">
        <Footer />
      </AnimatedSection>
    </div>
  );
}
