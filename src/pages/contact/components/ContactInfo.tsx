export default function ContactInfo() {
  return (
    <div className="space-y-5">
      {/* Quick Contact Card */}
      <div
        className="rounded-2xl p-6 bg-white"
        style={{ border: '1px solid rgba(191,184,174,0.25)' }}
      >
        <h3 className="text-xs font-semibold text-hulma-green mb-5 uppercase tracking-wider">
          Quick Contact
        </h3>

        <div className="space-y-4">
          <a
            href="mailto:hulmacebu@gmail.com"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-hulma-taupe/20 text-hulma-brown flex-shrink-0">
              <i className="ri-mail-line text-sm"></i>
            </span>
            <p className="text-sm text-hulma-green group-hover:text-hulma-orange transition-colors">
              hulmacebu@gmail.com
            </p>
          </a>

          <a
            href="tel:+639123456789"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-hulma-taupe/20 text-hulma-brown flex-shrink-0">
              <i className="ri-phone-line text-sm"></i>
            </span>
            <p className="text-sm text-hulma-green group-hover:text-hulma-orange transition-colors">
              +63 912 345 6789
            </p>
          </a>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-hulma-taupe/20 text-hulma-brown flex-shrink-0">
              <i className="ri-time-line text-sm"></i>
            </span>
            <p className="text-sm text-hulma-green">Mon – Sat: 10:00 AM – 5:00 PM</p>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div
        className="rounded-2xl p-6 bg-white"
        style={{ border: '1px solid rgba(191,184,174,0.25)' }}
      >
        <h3 className="text-xs font-semibold text-hulma-green mb-4 uppercase tracking-wider">
          Our Location
        </h3>

        <div className="flex items-start gap-3 mb-4">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-hulma-taupe/20 text-hulma-brown flex-shrink-0 mt-0.5">
            <i className="ri-map-pin-line text-sm"></i>
          </span>
          <div>
            <p className="text-sm text-hulma-green leading-relaxed">Consolacion, Cebu City</p>
            <p className="text-sm text-hulma-brown/60 leading-relaxed">Philippines</p>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-44 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31381.0!2d123.9626!3d10.3742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99912b0c3c3c3%3A0x0!2sConsolacion%2C%20Cebu%2C%20Philippines!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HULMA Location - Consolacion, Cebu"
          ></iframe>
        </div>

        <a
          href="https://maps.google.com/?q=Consolacion+Cebu+Philippines"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-hulma-orange hover:text-hulma-brown transition-colors cursor-pointer"
        >
          Get Directions
          <span className="w-3.5 h-3.5 flex items-center justify-center">
            <i className="ri-external-link-line text-xs"></i>
          </span>
        </a>
      </div>

      {/* Stats Card */}
      <div
        className="rounded-2xl p-6 bg-white"
        style={{ border: '1px solid rgba(191,184,174,0.25)' }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-serif font-light text-hulma-green">500+</p>
            <p className="text-[10px] text-hulma-brown/50 mt-1 uppercase tracking-wider">Projects</p>
          </div>
          <div className="border-x border-hulma-taupe/30">
            <p className="text-2xl font-serif font-light text-hulma-green">30+</p>
            <p className="text-[10px] text-hulma-brown/50 mt-1 uppercase tracking-wider">Years</p>
          </div>
          <div>
            <p className="text-2xl font-serif font-light text-hulma-green">100%</p>
            <p className="text-[10px] text-hulma-brown/50 mt-1 uppercase tracking-wider">Custom</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3 pt-1">
        <a
          href="https://www.facebook.com/hulmacebu/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-hulma-brown/50 hover:text-hulma-orange transition-all cursor-pointer"
          style={{ border: '1px solid rgba(191,184,174,0.3)' }}
          aria-label="Facebook"
        >
          <i className="ri-facebook-fill text-sm"></i>
        </a>
        <a
          href="https://www.instagram.com/hulmafiberglasscebu/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-hulma-brown/50 hover:text-hulma-orange transition-all cursor-pointer"
          style={{ border: '1px solid rgba(191,184,174,0.3)' }}
          aria-label="Instagram"
        >
          <i className="ri-instagram-line text-sm"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/hulmafiberglasscebu"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-hulma-brown/50 hover:text-hulma-orange transition-all cursor-pointer"
          style={{ border: '1px solid rgba(191,184,174,0.3)' }}
          aria-label="LinkedIn"
        >
          <i className="ri-linkedin-fill text-sm"></i>
        </a>
      </div>
    </div>
  );
}
