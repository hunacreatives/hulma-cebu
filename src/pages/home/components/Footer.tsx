import { useProjectCategories, useSiteSettings } from '../../../lib/cms';

export default function Footer() {
  const settings = useSiteSettings();
  const categories = useProjectCategories();
  const socials = ([
    ['Facebook', settings.facebook, 'ri-facebook-fill'],
    ['Instagram', settings.instagram, 'ri-instagram-line'],
    ['TikTok', settings.tiktok, 'ri-tiktok-fill'],
    ['LinkedIn', settings.linkedin, 'ri-linkedin-fill'],
  ] as const).filter(([, href]) => href);

  return (
    <footer id="about" className="bg-hulma-ghost pt-10 pb-5 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* ── DESKTOP layout (lg+) ── */}
        <div className="hidden lg:flex flex-row items-start justify-between gap-8 mb-6">

          {/* Left — Logo + Contact side by side */}
          <div className="flex flex-row items-start gap-6 lg:gap-8 flex-shrink-0">
            <a href="/" className="cursor-pointer self-start">
              <img
                src="/images/a8afafe632f6fe43b8ba47586ff5e10a.webp"
                alt="HULMA - Your Vision, Our Craft"
                className="h-16 w-auto object-contain"
              />
            </a>
            <div className="pt-0.5">
              <h4 className="text-[11px] font-semibold text-hulma-brown mb-2 tracking-wider uppercase">
                Get in Touch
              </h4>
              <a
                href={`mailto:${settings.email}`}
                className="text-xs text-hulma-brown/70 hover:text-hulma-green transition-colors block mb-3 cursor-pointer"
              >
                {settings.email}
              </a>
              <div className="flex items-center gap-1 -ml-2.5">
                {socials.map(([label, href, icon]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label={label}>
                    <i className={`${icon} text-base`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Nav rows with inline pipe links */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-0">
              <span className="text-[11px] font-semibold text-hulma-brown tracking-wider uppercase w-20 flex-shrink-0">Menu</span>
              <div className="flex flex-wrap items-center gap-y-1">
                <a href="/coming-soon" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Products</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/projects" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Get Inspired</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/request-samples" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Samples</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/about" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">About</a>
              </div>
            </div>
            <div className="flex flex-row items-center gap-0">
              <span className="text-[11px] font-semibold text-hulma-brown tracking-wider uppercase w-20 flex-shrink-0">Products</span>
              <div className="flex flex-wrap items-center gap-y-1">
                <a href="/coming-soon" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Material Look</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/coming-soon" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Series</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/coming-soon" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Form</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/coming-soon" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Color</a>
              </div>
            </div>
            <div className="flex flex-row items-center gap-0">
              <span className="text-[11px] font-semibold text-hulma-brown tracking-wider uppercase w-20 flex-shrink-0">Projects</span>
              <div className="flex flex-wrap items-center gap-y-1">
                {categories.map((cat, i) => (
                  <span key={cat} className="flex items-center">
                    {i > 0 && <span className="mx-1.5 text-hulma-brown/25">|</span>}
                    <a href={`/projects?category=${encodeURIComponent(cat)}`} className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">{cat}</a>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE layout (below lg) ── */}
        <div className="lg:hidden mb-6">
          {/* Logo + contact on one row */}
          <div className="flex items-start justify-between mb-6">
            <a href="/" className="cursor-pointer">
              <img
                src="/images/a8afafe632f6fe43b8ba47586ff5e10a.webp"
                alt="HULMA - Your Vision, Our Craft"
                className="h-12 w-auto object-contain"
              />
            </a>
            <div className="text-right">
              <a
                href={`mailto:${settings.email}`}
                className="text-xs text-hulma-brown/70 hover:text-hulma-green transition-colors block mb-2 cursor-pointer"
              >
                {settings.email}
              </a>
              <div className="flex items-center justify-end gap-0.5">
                {socials.map(([label, href, icon]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label={label}>
                    <i className={`${icon} text-sm`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 3-col nav grid */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] font-semibold text-hulma-brown tracking-wider uppercase block mb-2">Menu</span>
              <ul className="flex flex-col gap-1.5">
                <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Products</a></li>
                <li><a href="/projects" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Get Inspired</a></li>
                <li><a href="/request-samples" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Samples</a></li>
                <li><a href="/about" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">About</a></li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-hulma-brown tracking-wider uppercase block mb-2">Products</span>
              <ul className="flex flex-col gap-1.5">
                <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Material Look</a></li>
                <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Series</a></li>
                <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Form</a></li>
                <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Color</a></li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-hulma-brown tracking-wider uppercase block mb-2">Projects</span>
              <ul className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <li key={cat}><a href={`/projects?category=${encodeURIComponent(cat)}`} className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">{cat}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-hulma-taupe/30 flex flex-col-reverse gap-1.5 sm:flex-row items-center justify-between">
          <p className="text-[10px] text-hulma-brown/50">
            Website by{' '}
            <a href="https://hunacreatives.com" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-hulma-green transition-colors cursor-pointer">
              Huna Creatives
            </a>
          </p>
          <p className="text-[10px] text-hulma-brown/50">
            © {new Date().getFullYear()} HULMA. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
