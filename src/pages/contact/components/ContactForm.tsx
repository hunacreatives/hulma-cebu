import { useState, useRef } from 'react';

const projectTypes = [
  'Hospitality',
  'Residential',
  'Commercial',
  'Retail',
  'Entertainment',
  'Other',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

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
      body.append('message', formData.message);

      const res = await fetch('https://formspree.io/f/mykbzgny', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: body.toString(),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: '',
        });
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
    <form
      ref={formRef}
      id="contact-form"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Step Label */}
      <div className="flex items-center gap-4 mb-2">
        <span className="font-serif font-light text-hulma-green" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
          Your Details
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-hulma-green mb-1.5">
            First Name <span className="text-hulma-orange">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Juan"
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-hulma-green mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Dela Cruz"
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-hulma-green mb-1.5">
            Email <span className="text-hulma-orange">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-hulma-green mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+63 912 345 6789"
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all"
          />
        </div>
      </div>

      {/* Step Label */}
      <div className="flex items-center gap-4 pt-4 mb-2">
        <span className="font-serif font-light text-hulma-green" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
          Project Info
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-xs font-medium text-hulma-green mb-1.5">
            Company / Project Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company or project"
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-xs font-medium text-hulma-green mb-1.5">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all cursor-pointer appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23766C62\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
          >
            <option value="">Select type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Step Label */}
      <div className="flex items-center gap-4 pt-4 mb-2">
        <span className="font-serif font-light text-hulma-green" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
          Your Message
        </span>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-hulma-green mb-1.5">
          Message <span className="text-hulma-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          maxLength={500}
          rows={5}
          placeholder="Tell us about your project, preferred materials, timeline, and any specific requirements..."
          className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all resize-none"
        />
        <p className="text-right text-[11px] text-hulma-brown/50 mt-1">
          {formData.message.length}/500
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-hulma-green text-white rounded-full text-sm font-medium hover:bg-hulma-brown transition-all whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 flex items-center justify-center animate-spin">
              <i className="ri-loader-4-line text-sm"></i>
            </span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-green-50/80 backdrop-blur-sm border border-green-200/60">
          <span className="w-5 h-5 flex items-center justify-center text-green-600">
            <i className="ri-check-line text-lg"></i>
          </span>
          <p className="text-sm text-green-700">Thank you! We&apos;ll get back to you within 24 hours.</p>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/60">
          <span className="w-5 h-5 flex items-center justify-center text-red-600">
            <i className="ri-error-warning-line text-lg"></i>
          </span>
          <p className="text-sm text-red-700">Something went wrong. Please try again or email us directly.</p>
        </div>
      )}
    </form>
  );
}
