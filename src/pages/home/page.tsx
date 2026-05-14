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
    title: 'Hulma Cebu — Architectural Fiberglass Solutions | Custom Fabrication',
    description: 'HULMA Cebu crafts architectural fiberglass solutions for commercial, hospitality, and residential projects. Lightweight yet strong — terracotta, limestone, sandstone, and custom finishes. 30+ years of expertise.',
    keywords: 'architectural fiberglass Cebu, custom fiberglass fabrication, fiberglass panels Philippines, terracotta finish, limestone finish, sandstone texture, Cebu building materials, fiberglass manufacturer Cebu',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://hulmacebu.com/#business',
      name: 'HULMA Cebu',
      url: 'https://hulmacebu.com',
      logo: 'https://hulmacebu.com/images/39c992fc-c8b4-46e8-8a17-1e16cdb8536c_Hulma-Icon-Brown.png',
      image: 'https://hulmacebu.com/images/305588e21288d5abdb78f9019557dda5.png',
      description: 'Architectural fiberglass manufacturer in Cebu specializing in custom fabrication for commercial, hospitality, and residential projects. Terracotta, limestone, sandstone, and custom fiberglass finishes.',
      telephone: '+63-922-013-6834',
      email: 'hulmacebu@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cebu City',
        addressRegion: 'Cebu',
        addressCountry: 'PH',
        postalCode: '6000',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '10.3157',
        longitude: '123.8854',
      },
      areaServed: [
        { '@type': 'City', name: 'Cebu City' },
        { '@type': 'AdministrativeArea', name: 'Cebu' },
        { '@type': 'Country', name: 'Philippines' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Architectural Fiberglass Products',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Fiberglass Panels' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom Fiberglass Fabrication' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Terracotta Finish Fiberglass' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Limestone Finish Fiberglass' } },
        ],
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
