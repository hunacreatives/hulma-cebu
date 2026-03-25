export default function Footer() {
  return (
    <footer id="about" className="bg-hulma-ghost pt-10 pb-5 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* ── DESKTOP layout (lg+) ── */}
        <div className="hidden lg:flex flex-row items-start justify-between gap-8 mb-6">

          {/* Left — Logo + Contact side by side */}
          <div className="flex flex-row items-start gap-6 lg:gap-8 flex-shrink-0">
            <a href="/" className="cursor-pointer self-start">
              <img
                src="https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/a8afafe632f6fe43b8ba47586ff5e10a.png"
                alt="HULMA - Your Vision, Our Craft"
                className="h-16 w-auto object-contain"
              />
            </a>
            <div className="pt-0.5">
              <h4 className="text-[11px] font-semibold text-hulma-brown mb-2 tracking-wider uppercase">
                Get in Touch
              </h4>
              <a
                href="mailto:hulmacebu@gmail.com"
                className="text-xs text-hulma-brown/70 hover:text-hulma-green transition-colors block mb-3 cursor-pointer"
              >
                hulmacebu@gmail.com
              </a>
              <div className="flex items-center gap-1 -ml-2.5">
                <a href="https://www.facebook.com/hulmacebu/" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="Facebook">
                  <i className="ri-facebook-fill text-base" />
                </a>
                <a href="https://www.instagram.com/hulmafiberglasscebu/" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="Instagram">
                  <i className="ri-instagram-line text-base" />
                </a>
                <a href="https://www.tiktok.com/@hulmacebu" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="TikTok">
                  <i className="ri-tiktok-fill text-base" />
                </a>
                <a href="https://www.linkedin.com/company/hulmafiberglasscebu" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="LinkedIn">
                  <i className="ri-linkedin-fill text-base" />
                </a>
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
                <a href="/projects?category=Entertainment" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Entertainment</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/projects?category=Hospitality" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Hospitality</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/projects?category=Commercial" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Commercial</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/projects?category=Government" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Government</a>
                <span className="mx-1.5 text-hulma-brown/25">|</span>
                <a href="/projects?category=Retail" className="text-xs text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Retail</a>
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
                src="https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/a8afafe632f6fe43b8ba47586ff5e10a.png"
                alt="HULMA - Your Vision, Our Craft"
                className="h-12 w-auto object-contain"
              />
            </a>
            <div className="text-right">
              <a
                href="mailto:hulmacebu@gmail.com"
                className="text-xs text-hulma-brown/70 hover:text-hulma-green transition-colors block mb-2 cursor-pointer"
              >
                hulmacebu@gmail.com
              </a>
              <div className="flex items-center justify-end gap-0.5">
                <a href="https://www.facebook.com/hulmacebu/" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="Facebook">
                  <i className="ri-facebook-fill text-sm" />
                </a>
                <a href="https://www.instagram.com/hulmafiberglasscebu/" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="Instagram">
                  <i className="ri-instagram-line text-sm" />
                </a>
                <a href="https://www.tiktok.com/@hulmacebu" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="TikTok">
                  <i className="ri-tiktok-fill text-sm" />
                </a>
                <a href="https://www.linkedin.com/company/hulmafiberglasscebu" target="_blank" rel="noopener noreferrer nofollow" className="w-7 h-7 flex items-center justify-center text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer" aria-label="LinkedIn">
                  <i className="ri-linkedin-fill text-sm" />
                </a>
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
                <li><a href="/projects?category=Entertainment" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Entertainment</a></li>
                <li><a href="/projects?category=Hospitality" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Hospitality</a></li>
                <li><a href="/projects?category=Commercial" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Commercial</a></li>
                <li><a href="/projects?category=Government" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Government</a></li>
                <li><a href="/projects?category=Retail" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Retail</a></li>
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
