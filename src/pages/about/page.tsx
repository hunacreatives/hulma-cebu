import { useEffect, useState } from 'react';
import { useSEO } from '../../utils/seo';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import AboutHero from './components/AboutHero';
import AboutTagline from './components/AboutTagline';
import AboutValues from './components/AboutValues';
import WhatWeDo from './components/WhatWeDo';
import OurStory from './components/OurStory';
import AboutCTA from './components/AboutCTA';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: 'About HULMA - Fiberglass Innovation & Architectural Excellence in Cebu',
    description: 'Discover HULMA\'s story of crafting premium fiberglass architectural materials in Cebu. Learn about our commitment to innovation, quality, and sustainable design solutions for modern architecture.',
    keywords: 'about HULMA, fiberglass manufacturer Cebu, architectural materials company, building materials innovation',
    canonical: '/about',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About HULMA',
      description: 'Learn about HULMA\'s commitment to crafting premium fiberglass architectural materials',
      url: `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/about`,
      mainEntity: {
        '@type': 'Organization',
        name: 'HULMA',
        description: 'Premium fiberglass architectural materials manufacturer',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cebu',
          addressRegion: 'Cebu',
          addressCountry: 'PH',
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
      <Header />
      <main>
        <AboutHero />
        <AboutTagline />
        <AboutValues />
        <WhatWeDo />
        <OurStory />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}
