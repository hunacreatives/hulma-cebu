import { useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6 lg:px-12 overflow-hidden bg-hulma-ghost">

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="font-serif font-light text-hulma-green"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.5rem)' }}
          >
            Contact Us
          </span>
          <p className="text-sm text-hulma-brown/60 leading-relaxed">
            Whether you&apos;re an architect, designer, developer, or builder — reach out and let&apos;s discuss how Hulma can elevate your next project.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div
              className="rounded-2xl p-8 md:p-10 bg-white"
              style={{
                border: '1px solid rgba(191,184,174,0.25)',
              }}
            >
              <ContactForm />
            </div>
          </div>

          {/* Info Sidebar */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
