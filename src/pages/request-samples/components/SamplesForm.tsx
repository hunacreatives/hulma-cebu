import { useState, useRef, useEffect } from 'react';

const materialOptions = [
  'Natural Stone Look',
  'Terrazzo Look',
  'Organic',
  'Hybrid',
  'Earth Series',
  'Ocean Series',
  'Marble Series',
  'Volcanic Series',
];

const colorOptions = [
  { label: 'Beige', bg: '#D4C5A9', text: '#3F443F' },
  { label: 'Black', bg: '#1A1A1A', text: '#FFFFFF' },
  { label: 'Grey', bg: '#8A8A8A', text: '#FFFFFF' },
  { label: 'Green', bg: '#3F443F', text: '#FFFFFF' },
  { label: 'White', bg: '#F5F3EF', text: '#3F443F' },
  { label: 'Brown', bg: '#766C62', text: '#FFFFFF' },
];

const projectTypes = [
  'Hospitality',
  'Residential',
  'Commercial',
  'Retail',
  'Entertainment',
  'Other',
];

const inputClass =
  'w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all';

const selectBg = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23766C62' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span
        className="font-serif font-light text-hulma-green"
        style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
      >
        {children}
      </span>
    </div>
  );
}

export default function SamplesForm() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    shippingAddress: '',
    city: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'notes' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.shippingAddress || selectedMaterials.length === 0) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const body = new URLSearchParams();
      body.append('firstName', formData.firstName);
      body.append('lastName', formData.lastName);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('company', formData.company);
      body.append('projectType', formData.projectType);
      body.append('materials', selectedMaterials.join(', '));
      body.append('colors', selectedColors.join(', '));
      body.append('shippingAddress', formData.shippingAddress);
      body.append('city', formData.city);
      body.append('notes', formData.notes);

      const res = await fetch('https://formspree.io/f/mvzvgpwb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: body.toString(),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', projectType: '', shippingAddress: '', city: '', notes: '' });
        setSelectedMaterials([]);
        setSelectedColors([]);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-6 lg:px-12 overflow-hidden bg-hulma-ghost">
      <div
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="mb-12">
          <span
            className="font-serif font-light text-hulma-green block mb-3"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.5rem)' }}
          >
            Choose &amp; ship.
          </span>
          <p className="text-sm text-hulma-brown/60 leading-relaxed">
            Choose your preferred materials and colors, provide your shipping details, and we&apos;ll send samples straight to you.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">

          {/* Left — Materials, Colors, Shipping */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="rounded-2xl p-8 md:p-10 bg-white h-full" style={{ border: '1px solid rgba(191,184,174,0.25)' }}>

              {/* Select Materials */}
              <SectionLabel>Select Materials <span className="text-hulma-orange text-sm">*</span></SectionLabel>
              <p className="text-xs text-hulma-brown/60 mb-4">Choose the material types you'd like to sample:</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {materialOptions.map((mat) => {
                  const isSelected = selectedMaterials.includes(mat);
                  return (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => toggleMaterial(mat)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-hulma-green text-white'
                          : 'bg-hulma-ghost text-hulma-green border border-hulma-green/10 hover:border-hulma-orange/40'
                      }`}
                    >
                      <span className={`w-4 h-4 flex items-center justify-center rounded flex-shrink-0 ${isSelected ? 'bg-white/20' : 'bg-white'}`}>
                        {isSelected && <i className="ri-check-line text-xs"></i>}
                      </span>
                      {mat}
                    </button>
                  );
                })}
              </div>

              {/* Preferred Colors */}
              <SectionLabel>Preferred Colors</SectionLabel>
              <div className="flex flex-wrap gap-2 mb-8">
                {colorOptions.map((color) => {
                  const isSelected = selectedColors.includes(color.label);
                  return (
                    <button
                      key={color.label}
                      type="button"
                      onClick={() => toggleColor(color.label)}
                      className="px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap"
                      style={
                        isSelected
                          ? { background: color.bg, color: color.text, border: `1px solid ${color.bg}` }
                          : { background: 'transparent', color: '#3F443F', border: '1px solid rgba(63,68,63,0.15)' }
                      }
                    >
                      {color.label}
                    </button>
                  );
                })}
              </div>

              {/* Shipping Address */}
              <SectionLabel>Shipping Address</SectionLabel>
              <div className="space-y-4">
                <div>
                  <label htmlFor="samples-address" className="block text-xs font-medium text-hulma-green mb-1.5">
                    Street Address <span className="text-hulma-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="samples-address"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                    placeholder="123 Main Street, Barangay..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="samples-city" className="block text-xs font-medium text-hulma-green mb-1.5">
                    City / Province
                  </label>
                  <input
                    type="text"
                    id="samples-city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Cebu City, Cebu"
                    className={inputClass}
                  />
                </div>
              </div>

              {selectedMaterials.length > 0 && (
                <div className="mt-6 flex items-start gap-3 px-4 py-3 rounded-xl bg-hulma-orange/10 border border-hulma-orange/20">
                  <span className="w-5 h-5 flex items-center justify-center text-hulma-orange mt-0.5">
                    <i className="ri-stack-line text-base"></i>
                  </span>
                  <div>
                    <p className="text-sm text-hulma-green font-medium">
                      {selectedMaterials.length} material{selectedMaterials.length > 1 ? 's' : ''} selected
                    </p>
                    <p className="text-xs text-hulma-brown/60 mt-0.5">{selectedMaterials.join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Your Details */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="rounded-2xl p-8 bg-white h-full" style={{ border: '1px solid rgba(191,184,174,0.25)' }}>
              <form id="samples-form" onSubmit={handleSubmit} className="space-y-5">

                <SectionLabel>Your Details</SectionLabel>

                <div>
                  <label htmlFor="samples-firstName" className="block text-xs font-medium text-hulma-green mb-1.5">
                    First Name <span className="text-hulma-orange">*</span>
                  </label>
                  <input type="text" id="samples-firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Juan" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="samples-lastName" className="block text-xs font-medium text-hulma-green mb-1.5">
                    Last Name
                  </label>
                  <input type="text" id="samples-lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Dela Cruz" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="samples-email" className="block text-xs font-medium text-hulma-green mb-1.5">
                    Email <span className="text-hulma-orange">*</span>
                  </label>
                  <input type="email" id="samples-email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@company.com" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="samples-phone" className="block text-xs font-medium text-hulma-green mb-1.5">
                    Phone
                  </label>
                  <input type="tel" id="samples-phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+63 912 345 6789" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="samples-company" className="block text-xs font-medium text-hulma-green mb-1.5">
                    Company
                  </label>
                  <input type="text" id="samples-company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="samples-projectType" className="block text-xs font-medium text-hulma-green mb-1.5">
                    Project Type
                  </label>
                  <select id="samples-projectType" name="projectType" value={formData.projectType} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all cursor-pointer appearance-none"
                    style={selectBg}
                  >
                    <option value="">Select type</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="samples-notes" className="block text-xs font-medium text-hulma-green mb-1.5">
                    Additional Notes
                  </label>
                  <textarea id="samples-notes" name="notes" value={formData.notes} onChange={handleChange} maxLength={500} rows={3}
                    placeholder="Specific sizes, finishes, or quantities..."
                    className={`${inputClass} resize-none`}
                  />
                  <p className="text-right text-[11px] text-hulma-brown/50 mt-1">{formData.notes.length}/500</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || selectedMaterials.length === 0}
                  className="w-full py-4 text-white rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: '#766C62' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 flex items-center justify-center animate-spin">
                        <i className="ri-loader-4-line text-sm"></i>
                      </span>
                      Submitting...
                    </span>
                  ) : 'Request Samples'}
                </button>

                {selectedMaterials.length === 0 && (
                  <p className="text-center text-xs text-hulma-brown/50">Please select at least one material</p>
                )}

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-green-50/80 border border-green-200/60">
                    <span className="w-5 h-5 flex items-center justify-center text-green-600">
                      <i className="ri-check-line text-lg"></i>
                    </span>
                    <p className="text-sm text-green-700">Request submitted! We'll prepare your samples and reach out soon.</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50/80 border border-red-200/60">
                    <span className="w-5 h-5 flex items-center justify-center text-red-600">
                      <i className="ri-error-warning-line text-lg"></i>
                    </span>
                    <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
