import { useSiteSettings } from '../../../lib/cms';

export default function ContactInfo() {
  const settings = useSiteSettings();
  const telHref = `tel:${settings.phone.replace(/[^\d+]/g, '')}`;
  const mapQuery = encodeURIComponent(settings.mapQuery || settings.address);
  const socials = ([
    ['Facebook', settings.facebook, 'ri-facebook-fill'],
    ['Instagram', settings.instagram, 'ri-instagram-line'],
    ['TikTok', settings.tiktok, 'ri-tiktok-fill'],
    ['LinkedIn', settings.linkedin, 'ri-linkedin-fill'],
  ] as const).filter(([, href]) => href);

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
            href={`mailto:${settings.email}`}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-hulma-taupe/20 text-hulma-brown flex-shrink-0">
              <i className="ri-mail-line text-sm"></i>
            </span>
            <p className="text-sm text-hulma-green group-hover:text-hulma-orange transition-colors">
              {settings.email}
            </p>
          </a>

          <a
            href={telHref}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-hulma-taupe/20 text-hulma-brown flex-shrink-0">
              <i className="ri-phone-line text-sm"></i>
            </span>
            <p className="text-sm text-hulma-green group-hover:text-hulma-orange transition-colors">
              {settings.phone}
            </p>
          </a>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-hulma-taupe/20 text-hulma-brown flex-shrink-0">
              <i className="ri-time-line text-sm"></i>
            </span>
            <p className="text-sm text-hulma-green">{settings.hours}</p>
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
            <p className="text-sm text-hulma-green leading-relaxed">{settings.address}</p>
            {settings.addressLine2 && <p className="text-sm text-hulma-brown/60 leading-relaxed">{settings.addressLine2}</p>}
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-44 rounded-xl overflow-hidden">
          <iframe
            src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`HULMA location: ${settings.address}`}
          ></iframe>
        </div>

        <a
          href={`https://maps.google.com/?q=${mapQuery}`}
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
        {socials.map(([label, href, icon]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-hulma-brown/50 hover:text-hulma-orange transition-all cursor-pointer"
            style={{ border: '1px solid rgba(191,184,174,0.3)' }}
            aria-label={label}
          >
            <i className={`${icon} text-sm`}></i>
          </a>
        ))}
      </div>
    </div>
  );
}
