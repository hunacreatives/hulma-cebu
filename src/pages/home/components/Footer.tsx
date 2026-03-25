export default function Footer() {
  return (
    <footer id="about" className="bg-hulma-ghost pt-8 pb-5 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Top: Logo + Contact side by side */}
        <div className="flex items-start justify-between mb-6">
          <a href="/" className="cursor-pointer">
            <img
              src="https://static.readdy.ai/image/08981d36cd0b73cf08022d4d82071d03/a8afafe632f6fe43b8ba47586ff5e10a.png"
              alt="HULMA - Your Vision, Our Craft"
              className="h-12 lg:h-16 w-auto object-contain"
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

        {/* Nav Sections — 3 cols on mobile */}
        <div className="grid grid-cols-3 lg:flex lg:flex-row gap-4 lg:gap-12 mb-6">

          {/* MENU */}
          <div>
            <span className="text-[10px] font-semibold text-hulma-brown tracking-wider uppercase block mb-2">
              Menu
            </span>
            <ul className="flex flex-col gap-1.5">
              <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Products</a></li>
              <li><a href="/projects" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Get Inspired</a></li>
              <li><a href="/request-samples" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Samples</a></li>
              <li><a href="/about" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">About</a></li>
            </ul>
          </div>

          {/* PRODUCTS */}
          <div>
            <span className="text-[10px] font-semibold text-hulma-brown tracking-wider uppercase block mb-2">
              Products
            </span>
            <ul className="flex flex-col gap-1.5">
              <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Material Look</a></li>
              <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Series</a></li>
              <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Form</a></li>
              <li><a href="/coming-soon" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Color</a></li>
            </ul>
          </div>

          {/* PROJECTS */}
          <div>
            <span className="text-[10px] font-semibold text-hulma-brown tracking-wider uppercase block mb-2">
              Projects
            </span>
            <ul className="flex flex-col gap-1.5">
              <li><a href="/projects?category=Entertainment" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Entertainment</a></li>
              <li><a href="/projects?category=Hospitality" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Hospitality</a></li>
              <li><a href="/projects?category=Commercial" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Commercial</a></li>
              <li><a href="/projects?category=Government" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Government</a></li>
              <li><a href="/projects?category=Retail" className="text-[11px] text-hulma-brown/60 hover:text-hulma-green transition-colors cursor-pointer">Retail</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-hulma-taupe/30 flex flex-col-reverse gap-1.5 sm:flex-row items-center justify-between">
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