
export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Quick Contact Card */}
      <div
        className="rounded-2xl p-7"
        style={{
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        }}
      >
        <h3 className="text-sm font-semibold text-hulma-green mb-5 uppercase tracking-wider">
          Quick Contact
        </h3>

        <div className="space-y-4">
          <a
            href="mailto:hulmacebu@gmail.com"
            className="flex items-start gap-3 group cursor-pointer"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-hulma-orange/10 text-hulma-orange flex-shrink-0 mt-0.5">
              <i className="ri-mail-line text-base"></i>
            </span>
            <div>
              <p className="text-xs text-hulma-brown/60 mb-0.5">Email</p>
              <p className="text-sm text-hulma-green group-hover:text-hulma-orange transition-colors">
                hulmacebu@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:+639123456789"
            className="flex items-start gap-3 group cursor-pointer"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-hulma-orange/10 text-hulma-orange flex-shrink-0 mt-0.5">
              <i className="ri-phone-line text-base"></i>
            </span>
            <div>
              <p className="text-xs text-hulma-brown/60 mb-0.5">Phone</p>
              <p className="text-sm text-hulma-green group-hover:text-hulma-orange transition-colors">
                +63 912 345 6789
              </p>
            </div>
          </a>

          <div className="flex items-start gap-3">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-hulma-orange/10 text-hulma-orange flex-shrink-0 mt-0.5">
              <i className="ri-time-line text-base"></i>
            </span>
            <div>
              <p className="text-xs text-hulma-brown/60 mb-0.5">Business Hours</p>
              <p className="text-sm text-hulma-green">Mon – Fri: 8:00 AM – 5:00 PM</p>
              <p className="text-sm text-hulma-brown/70">Sat: 8:00 AM – 12:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div
        className="rounded-2xl p-7"
        style={{
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        }}
      >
        <h3 className="text-sm font-semibold text-hulma-green mb-5 uppercase tracking-wider">
          Our Location
        </h3>

        <div className="flex items-start gap-3 mb-5">
          <span className="w-9 h-9 flex items-center justify-center rounded-full bg-hulma-orange/10 text-hulma-orange flex-shrink-0 mt-0.5">
            <i className="ri-map-pin-line text-base"></i>
          </span>
          <div>
            <p className="text-sm text-hulma-green leading-relaxed">
              Cebu City, Philippines
            </p>
            <p className="text-sm text-hulma-brown/70 leading-relaxed">
              Metro Cebu Area
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-44 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125529.0!2d123.8!3d10.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999258a7e8b07%3A0x71e8a1b3c8f1c4a0!2sCebu%20City%2C%20Cebu%2C%20Philippines!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HULMA Showroom Location"
          ></iframe>
        </div>

        <a
          href="https://maps.google.com/?q=Cebu+City+Philippines"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-hulma-orange hover:text-hulma-brown transition-colors cursor-pointer"
        >
          Get Directions
          <span className="w-3.5 h-3.5 flex items-center justify-center">
            <i className="ri-external-link-line text-xs"></i>
          </span>
        </a>
      </div>

      {/* Stats Card */}
      <div
        className="rounded-2xl p-7"
        style={{
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-serif font-light text-hulma-green">500+</p>
            <p className="text-[11px] text-hulma-brown/60 mt-1 uppercase tracking-wider">Projects</p>
          </div>
          <div className="border-x border-hulma-taupe/40">
            <p className="text-2xl font-serif font-light text-hulma-green">30+</p>
            <p className="text-[11px] text-hulma-brown/60 mt-1 uppercase tracking-wider">Years</p>
          </div>
          <div>
            <p className="text-2xl font-serif font-light text-hulma-green">100%</p>
            <p className="text-[11px] text-hulma-brown/60 mt-1 uppercase tracking-wider">Custom</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3 pt-2">
        <a
          href="https://www.facebook.com/hulmacebu/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-10 h-10 flex items-center justify-center rounded-full text-hulma-brown hover:text-hulma-orange transition-all cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
          aria-label="Facebook"
        >
          <i className="ri-facebook-fill text-base"></i>
        </a>
        <a
          href="https://www.instagram.com/hulmafiberglasscebu/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-10 h-10 flex items-center justify-center rounded-full text-hulma-brown hover:text-hulma-orange transition-all cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
          aria-label="Instagram"
        >
          <i className="ri-instagram-line text-base"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/hulmafiberglasscebu"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-10 h-10 flex items-center justify-center rounded-full text-hulma-brown hover:text-hulma-orange transition-all cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
          aria-label="LinkedIn"
        >
          <i className="ri-linkedin-fill text-base"></i>
        </a>
      </div>
    </div>
  );
}
