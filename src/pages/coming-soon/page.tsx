import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../utils/seo';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';

export default function ComingSoonPage() {
  const [isVisible, setIsVisible] = useState(false);

  useSEO({
    title: 'Coming Soon — HULMA',
    description:
      'Something new is taking shape. HULMA\'s full product catalog of premium fiberglass architectural materials is arriving soon.',
    keywords: 'HULMA coming soon, fiberglass materials, architectural surfaces',
    canonical: '/coming-soon',
  });

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Failed to scroll to top:', err);
    }
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-hulma-ghost">
      <Header forceDark />

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left — Image Panel */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=Close%20up%20of%20luxurious%20architectural%20fiberglass%20panel%20surface%20with%20subtle%20organic%20texture%2C%20warm%20cream%20and%20sand%20tones%2C%20soft%20directional%20light%20casting%20gentle%20shadows%20across%20the%20relief%2C%20premium%20material%20detail%20shot%2C%20minimalist%20studio%20photography%2C%20depth%20and%20tactility%2C%20no%20people&width=960&height=1200&seq=coming-soon-left-panel-v2&orientation=portrait"
            alt="HULMA material texture"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
          {/* Vertical label */}
          <div className="absolute bottom-10 left-8 flex items-end gap-3">
            <span className="block w-px h-12 bg-white/40" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 font-light">
              Fiberglass Architectural Materials
            </p>
          </div>
        </div>

        {/* Right — Content Panel */}
        <div className="flex-1 flex items-center justify-center px-8 py-32 lg:py-0 relative overflow-hidden">
          {/* Subtle background texture */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-hulma-taupe/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-hulma-brown/5 blur-3xl pointer-events-none" />

          <div
            className={`relative z-10 max-w-md w-full transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-hulma-brown/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-hulma-brown/50 font-medium">
                Something is taking shape
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif font-light text-hulma-green leading-tight mb-6" style={{ fontSize: '2.4rem' }}>
              Our catalog is<br />
              <em className="not-italic text-hulma-orange">being crafted.</em>
            </h2>

            {/* Body */}
            <p className="text-sm text-hulma-brown/70 leading-relaxed mb-3 max-w-sm">
              Every surface tells a story. We&apos;re curating our full range of fiberglass architectural materials — each one designed to transform the spaces you build.
            </p>
            <p className="text-xs text-hulma-brown/45 leading-relaxed mb-10 max-w-sm">
              While we prepare, we&apos;re happy to walk you through what&apos;s available — or discuss your next project in person.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-12">
              <Link
                to="/contact"
                className="px-6 py-3 bg-hulma-green text-white rounded-full text-xs font-medium hover:bg-hulma-brown transition-all whitespace-nowrap cursor-pointer tracking-wide"
              >
                Start a Conversation
              </Link>
              <Link
                to="/book-presentation"
                className="px-6 py-3 bg-transparent border border-hulma-green/20 text-hulma-green rounded-full text-xs font-medium hover:bg-hulma-green/5 transition-all whitespace-nowrap cursor-pointer tracking-wide"
              >
                Book a Presentation
              </Link>
            </div>

            {/* Divider + tagline */}
            <div className="flex items-center gap-4">
              <span className="block flex-1 h-px bg-hulma-brown/10 max-w-[60px]" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-hulma-brown/35 font-light">
                Your Vision, Our Craft
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
