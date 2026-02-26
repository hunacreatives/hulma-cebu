
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../utils/seo';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';

export default function ComingSoonPage() {
  const [isVisible, setIsVisible] = useState(false);

  // Apply SEO metadata
  useSEO({
    title: 'Coming Soon - HULMA Premium Fiberglass Materials',
    description:
      "Our product catalog is coming soon. Stay tuned for HULMA's premium fiberglass architectural materials crafted in Cebu.",
    keywords: 'HULMA coming soon, fiberglass products, architectural materials',
    canonical: '/coming-soon',
  });

  // Scroll to top on mount and trigger fade‑in animation
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
    <div className="min-h-screen flex flex-col">
      <Header forceDark />

      <main className="flex-1 flex items-center justify-center px-6 py-32 bg-hulma-ghost relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-hulma-taupe/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-hulma-brown/5 blur-3xl"></div>

        <div
          className={`relative z-10 max-w-lg mx-auto text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-hulma-green/10 flex items-center justify-center">
            <i className="ri-tools-line text-2xl text-hulma-green"></i>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-light text-hulma-green mb-3">
            Coming Soon
          </h2>

          <p className="text-sm text-hulma-brown/80 leading-relaxed mb-3 max-w-md mx-auto">
            We&apos;re putting the finishing touches on our product catalog. Our full
            range of premium fiberglass materials will be available here shortly.
          </p>

          <p className="text-xs text-hulma-brown/50 mb-8">
            In the meantime, feel free to reach out — we&apos;d love to discuss your
            project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 bg-hulma-green text-white rounded-full text-xs font-medium hover:bg-hulma-brown transition-all whitespace-nowrap cursor-pointer tracking-wide"
            >
              Get in Touch
            </Link>
            <Link
              to="/book-presentation"
              className="px-6 py-3 bg-transparent border border-hulma-green/20 text-hulma-green rounded-full text-xs font-medium hover:bg-hulma-green/5 transition-all whitespace-nowrap cursor-pointer tracking-wide"
            >
              Book a Presentation
            </Link>
          </div>

          {/* Decorative divider */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="block w-12 h-px bg-hulma-brown/15"></span>
            <span className="block w-1.5 h-1.5 rounded-full bg-hulma-brown/20"></span>
            <span className="block w-12 h-px bg-hulma-brown/15"></span>
          </div>

          <p className="mt-6 text-[11px] text-hulma-brown/40 tracking-wide uppercase">
            Crafting something beautiful
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
