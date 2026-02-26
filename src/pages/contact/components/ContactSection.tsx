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
    <section ref={sectionRef} className="relative py-20 px-6 lg:px-12 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-hulma-ghost"></div>

      {/* Decorative glassmorphism blobs */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(177, 141, 117, 0.15) 0%, transparent 70%)',
        }}
      ></div>
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(180, 201, 204, 0.2) 0%, transparent 70%)',
        }}
      ></div>

      <div
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[3px] text-hulma-brown/60 mb-3">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-hulma-green mb-3">
            We&apos;d Love to Hear From You
          </h2>
          <p className="text-sm text-hulma-brown/80 max-w-lg leading-relaxed">
            Whether you&apos;re an architect, designer, developer, or builder — reach out and let&apos;s discuss how Hulma Cebu can elevate your next project.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form — Glass Card */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.05)',
              }}
            >
              <ContactForm />
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
