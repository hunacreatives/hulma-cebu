import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { projects } from '../../../mocks/projects';
import SearchModal from '../../../components/feature/SearchModal';

const productMenuData = {
  materialLook: [
    'Natural Stone Look',
    'Terrazzo Look',
    'Organic',
    'Hybrid',
  ],
  series: [
    'Earth Series',
    'Ocean Series',
    'Marble Series',
    'Volcanic Series',
  ],
  colors: [
    'Beige',
    'Black',
    'Grey',
    'Green',
    'White',
    'Brown',
  ],
};

const inspiredCategories = [
  'Entertainment',
  'Hospitality',
  'Commercial',
  'Retail',
  'Government',
];

type DropdownType = 'products' | 'inspired' | 'about' | 'contact' | null;

export default function Header({ forceDark = false }: { forceDark?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<'products' | 'inspired' | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
        setActiveDropdown(null);
      } else {
        setHidden(false);
      }

      setPastHero(currentY > heroHeight * 0.6);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setMobileSubmenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleMouseEnter = useCallback((dropdown: DropdownType) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveDropdown(dropdown);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash?: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
    
    if (hash && location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (hash) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSearchModalOpen(true);
  };

  const isOpen = activeDropdown !== null;

  const showSolidBg = forceDark || pastHero || isOpen;

  const navBarStyle = showSolidBg
    ? {
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
      }
    : {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      };

  const textColor = showSolidBg ? 'text-hulma-green' : 'text-white/90';
  const textHover = showSolidBg ? 'hover:text-hulma-orange' : 'hover:text-white';
  const contactBg = showSolidBg
    ? { background: '#766C62', border: '1px solid #766C62', color: '#FFFFFF' }
    : { background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white' };
  const contactHoverBg = showSolidBg ? '#3F443F' : 'rgba(255, 255, 255, 0.35)';

  const logoSrc = showSolidBg 
    ? '/images/305588e21288d5abdb78f9019557dda5.png'
    : '/images/f80f0ad8019cef13d6a90e36f07c49f1.png';

  const activeTextClass = (dropdown: DropdownType) =>
    activeDropdown === dropdown ? (showSolidBg ? 'text-hulma-orange' : 'text-white') : '';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
          hidden && !mobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="mx-auto px-4 pt-4 max-w-7xl">
          <div
            className="flex items-center justify-between h-16 px-6 rounded-full transition-all duration-500"
            style={mobileMenuOpen ? {
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
            } : navBarStyle}
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <a 
                href="/" 
                onClick={(e) => handleNavClick(e, '/')}
                className="cursor-pointer"
              >
                <h1>
                  <img
                    src={mobileMenuOpen ? '/images/305588e21288d5abdb78f9019557dda5.png' : logoSrc}
                    alt="HULMA"
                    className="h-12 w-auto transition-all duration-500"
                  />
                </h1>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
                className={`text-xs font-medium ${textColor} ${textHover} transition-colors whitespace-nowrap cursor-pointer`}
              >
                Home
              </a>

              {/* Products */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="/#products"
                  onClick={(e) => handleNavClick(e, '/', '#products')}
                  className={`text-xs font-medium ${textColor} ${textHover} ${activeTextClass('products')} transition-colors whitespace-nowrap cursor-pointer flex items-center gap-0.5`}
                >
                  Products
                  <span className={`w-3.5 h-3.5 flex items-center justify-center transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`}>
                    <i className="ri-arrow-down-s-line text-[10px]"></i>
                  </span>
                </a>
              </div>

              {/* Get Inspired */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('inspired')}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="/projects"
                  onClick={(e) => handleNavClick(e, '/projects')}
                  className={`text-xs font-medium ${textColor} ${textHover} ${activeTextClass('inspired')} transition-colors whitespace-nowrap cursor-pointer flex items-center gap-0.5`}
                >
                  Get Inspired
                  <span className={`w-3.5 h-3.5 flex items-center justify-center transition-transform duration-300 ${activeDropdown === 'inspired' ? 'rotate-180' : ''}`}>
                    <i className="ri-arrow-down-s-line text-[10px]"></i>
                  </span>
                </a>
              </div>

              <a
                href="/about"
                onClick={(e) => handleNavClick(e, '/about')}
                className={`text-xs font-medium ${textColor} ${textHover} transition-colors whitespace-nowrap cursor-pointer flex items-center gap-0.5`}
              >
                About Us
              </a>

              <a
                href="/blog"
                onClick={(e) => handleNavClick(e, '/blog')}
                className={`text-xs font-medium ${textColor} ${textHover} transition-colors whitespace-nowrap cursor-pointer flex items-center gap-0.5`}
              >
                Blog
              </a>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                onClick={handleSearchClick}
                className={`hidden md:flex w-4 h-4 items-center justify-center ${textColor} ${textHover} transition-colors cursor-pointer`}
              >
                <i className="ri-search-line text-sm"></i>
              </a>
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="hidden md:inline-flex px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all"
                style={contactBg}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = contactHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = contactBg.background;
                }}
              >
                Contact
                <span className="ml-1 inline-flex w-4 h-4 items-center justify-center">
                  <i className="ri-arrow-right-up-line text-xs"></i>
                </span>
              </a>

              {/* Mobile Hamburger */}
              <button
                className={`md:hidden w-10 h-10 flex items-center justify-center ${mobileMenuOpen ? 'text-hulma-green' : textColor} cursor-pointer`}
                onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileSubmenu(null); }}
                aria-label="Toggle menu"
              >
                <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mega Dropdown Panel (Desktop) */}
        <div
          className={`absolute left-0 right-0 transition-all duration-500 ease-in-out overflow-hidden hidden md:block ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ top: '88px' }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mx-auto max-w-7xl px-4">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E5E0',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div
                className={`transition-all duration-400 ${
                  activeDropdown === 'products' ? 'block' : 'hidden'
                }`}
              >
                <ProductsDropdown navigate={navigate} onClose={() => setActiveDropdown(null)} />
              </div>

              <div
                className={`transition-all duration-400 ${
                  activeDropdown === 'inspired' ? 'block' : 'hidden'
                }`}
              >
                <InspiredDropdown navigate={navigate} onClose={() => setActiveDropdown(null)} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/30" onClick={() => { setMobileMenuOpen(false); setMobileSubmenu(null); }} />
        <div
          className={`absolute top-[88px] left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-400 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{ maxHeight: 'calc(100vh - 110px)', overflowY: 'auto', border: '1px solid #E8E5E0' }}
        >
          <nav className="py-4">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="flex items-center px-6 py-3.5 text-sm font-medium text-hulma-green hover:bg-hulma-ghost transition-colors cursor-pointer"
            >
              Home
            </a>

            {/* Products with submenu */}
            <div>
              <div className="flex items-center justify-between hover:bg-hulma-ghost transition-colors">
                <a
                  href="/#products"
                  onClick={(e) => handleNavClick(e, '/', '#products')}
                  className="flex-1 px-6 py-3.5 text-sm font-medium text-hulma-green cursor-pointer"
                >
                  Products
                </a>
                <button
                  className="px-4 py-3.5 text-hulma-green cursor-pointer"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'products' ? null : 'products')}
                  aria-label="Toggle products submenu"
                >
                  <span className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${mobileSubmenu === 'products' ? 'rotate-180' : ''}`}>
                    <i className="ri-arrow-down-s-line text-sm"></i>
                  </span>
                </button>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenu === 'products' ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="bg-hulma-ghost/50 py-2 px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-hulma-brown/60 mb-2 mt-1">Material Look</p>
                  {productMenuData.materialLook.map((item) => (
                    <a
                      key={item}
                      href="/coming-soon"
                      onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setMobileSubmenu(null); navigate('/coming-soon'); }}
                      className="block py-2 text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                    >
                      {item}
                    </a>
                  ))}
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-hulma-brown/60 mb-2 mt-4">Series</p>
                  {productMenuData.series.map((item) => (
                    <a
                      key={item}
                      href="/coming-soon"
                      onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setMobileSubmenu(null); navigate('/coming-soon'); }}
                      className="block py-2 text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                    >
                      {item}
                    </a>
                  ))}
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-hulma-brown/60 mb-2 mt-4">Colors</p>
                  {productMenuData.colors.map((item) => (
                    <a
                      key={item}
                      href="/coming-soon"
                      onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setMobileSubmenu(null); navigate('/coming-soon'); }}
                      className="block py-2 text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Get Inspired with submenu */}
            <div>
              <div className="flex items-center justify-between hover:bg-hulma-ghost transition-colors">
                <a
                  href="/projects"
                  onClick={(e) => handleNavClick(e, '/projects')}
                  className="flex-1 px-6 py-3.5 text-sm font-medium text-hulma-green cursor-pointer"
                >
                  Get Inspired
                </a>
                <button
                  className="px-4 py-3.5 text-hulma-green cursor-pointer"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'inspired' ? null : 'inspired')}
                  aria-label="Toggle inspired submenu"
                >
                  <span className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${mobileSubmenu === 'inspired' ? 'rotate-180' : ''}`}>
                    <i className="ri-arrow-down-s-line text-sm"></i>
                  </span>
                </button>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenu === 'inspired' ? 'max-h-[400px]' : 'max-h-0'}`}>
                <div className="bg-hulma-ghost/50 py-2 px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-hulma-brown/60 mb-2 mt-1">By Category</p>
                  {inspiredCategories.map((cat) => (
                    <a
                      key={cat}
                      href={`/projects?category=${encodeURIComponent(cat)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setMobileSubmenu(null);
                        navigate(`/projects?category=${encodeURIComponent(cat)}`);
                      }}
                      className="block py-2 text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="/about"
              onClick={(e) => handleNavClick(e, '/about')}
              className="flex items-center px-6 py-3.5 text-sm font-medium text-hulma-green hover:bg-hulma-ghost transition-colors cursor-pointer"
            >
              About Us
            </a>

            <a
              href="/blog"
              onClick={(e) => handleNavClick(e, '/blog')}
              className="flex items-center px-6 py-3.5 text-sm font-medium text-hulma-green hover:bg-hulma-ghost transition-colors cursor-pointer"
            >
              Blog
            </a>

            {/* Mobile Contact Button */}
            <div className="px-6 pt-2 pb-4">
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="flex items-center justify-center w-full py-3 rounded-full text-sm font-medium text-white whitespace-nowrap cursor-pointer transition-all"
                style={{ background: '#766C62' }}
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-500 hidden md:block ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setActiveDropdown(null)}
      />
    </>
  );
}

function ProductsDropdown({ navigate, onClose }: { navigate: ReturnType<typeof useNavigate>; onClose: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onClose();
    navigate('/coming-soon');
  };

  const handleColorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    navigate('/coming-soon');
  };

  return (
    <div className="flex">
      {/* Menu Columns */}
      <div className="flex-1 p-8 pb-5">
        <div className="grid grid-cols-4 gap-0">
          {/* Material Look */}
          <div className="flex flex-col">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-hulma-brown mb-4">
              <a
                href="/coming-soon"
                onClick={(e) => handleClick(e, '/coming-soon')}
                className="cursor-pointer hover:text-hulma-orange transition-colors"
              >
                By Material Look
              </a>
            </h4>
            <ul className="space-y-2.5 flex-1">
              {productMenuData.materialLook.map((item) => (
                <li key={item}>
                  <a
                    href="/coming-soon"
                    onClick={(e) => handleClick(e, '/coming-soon')}
                    className="text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Series */}
          <div className="flex flex-col">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-hulma-brown mb-4">
              <a
                href="/coming-soon"
                onClick={(e) => handleClick(e, '/coming-soon')}
                className="cursor-pointer hover:text-hulma-orange transition-colors"
              >
                By Series
              </a>
            </h4>
            <ul className="space-y-2.5 flex-1">
              {productMenuData.series.map((item) => (
                <li key={item}>
                  <a
                    href="/coming-soon"
                    onClick={(e) => handleClick(e, '/coming-soon')}
                    className="text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colors */}
          <div className="flex flex-col">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-hulma-brown mb-4">
              <a
                href="/coming-soon"
                onClick={handleColorClick}
                className="cursor-pointer hover:text-hulma-orange transition-colors"
              >
                By Color
              </a>
            </h4>
            <ul className="space-y-2.5 flex-1">
              {productMenuData.colors.map((item) => (
                <li key={item}>
                  <a
                    href="/coming-soon"
                    onClick={handleColorClick}
                    className="text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* All Products */}
          <div className="flex flex-col">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-hulma-brown mb-4">
              <a
                href="/coming-soon"
                onClick={handleColorClick}
                className="cursor-pointer hover:text-hulma-orange transition-colors"
              >
                View All Products
              </a>
            </h4>
            <div className="flex-1">
              <a
                href="/coming-soon"
                onClick={(e) => handleClick(e, '/coming-soon')}
                className="group flex items-center gap-2 mt-2 text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
              >
                Browse Everything
                <span className="w-4 h-4 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <i className="ri-arrow-right-line text-sm"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom "View All" row — uniform across all 4 columns */}
        <div className="grid grid-cols-4 gap-0 mt-6 pt-5 border-t border-hulma-brown/10">
          <a
            href="/coming-soon"
            onClick={(e) => handleClick(e, '/coming-soon')}
            className="text-xs font-semibold uppercase tracking-wider text-hulma-orange hover:text-hulma-brown transition-colors cursor-pointer"
          >
            View All Materials
          </a>
          <a
            href="/coming-soon"
            onClick={(e) => handleClick(e, '/coming-soon')}
            className="text-xs font-semibold uppercase tracking-wider text-hulma-orange hover:text-hulma-brown transition-colors cursor-pointer"
          >
            View All Series
          </a>
          <a
            href="/coming-soon"
            onClick={handleColorClick}
            className="text-xs font-semibold uppercase tracking-wider text-hulma-orange hover:text-hulma-brown transition-colors cursor-pointer"
          >
            View All Colors
          </a>
          <div />
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-64 p-4 flex-shrink-0">
        <div className="relative w-full h-full rounded-xl overflow-hidden min-h-[220px]">
          <img
            src="/images/9bcb8ecbc7371b9a0570cc7d81344810.png"
            alt="Featured product"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <span className="text-white text-sm font-medium">Featured</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InspiredDropdown({ navigate, onClose }: { navigate: ReturnType<typeof useNavigate>; onClose: () => void }) {
  const featuredProjects = projects.slice(0, 4);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, projectSlug: string) => {
    e.preventDefault();
    onClose();
    navigate(`/project/${projectSlug}`);
  };

  const handleInspirationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    navigate('/projects');
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, category: string) => {
    e.preventDefault();
    onClose();
    navigate(`/projects?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="p-8">
      <div className="flex gap-8">
        {/* Categories Column */}
        <div className="w-48 flex-shrink-0">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-hulma-brown mb-4">
            <a 
              href="/projects" 
              onClick={handleInspirationClick}
              className="cursor-pointer hover:text-hulma-orange transition-colors"
            >
              By Category
            </a>
          </h4>
          <ul className="space-y-2.5">
            {inspiredCategories.map((cat) => (
              <li key={cat}>
                <a
                  href={`/projects?category=${encodeURIComponent(cat)}`}
                  onClick={(e) => handleCategoryClick(e, cat)}
                  className="text-sm text-hulma-green/80 hover:text-hulma-orange transition-colors cursor-pointer"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/projects"
            onClick={handleInspirationClick}
            className="inline-block mt-5 text-xs font-semibold uppercase tracking-wider text-hulma-orange hover:text-hulma-brown transition-colors cursor-pointer"
          >
            View All Projects
          </a>
        </div>

        {/* Featured Projects Grid */}
        <div className="flex-1">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-hulma-brown mb-4">
            Featured Projects
          </h4>
          <div className="grid grid-cols-4 gap-4">
            {featuredProjects.map((project) => (
              <a
                key={project.id}
                href={`/project/${project.slug}`}
                onClick={(e) => handleProjectClick(e, project.slug)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p className="mt-2 text-xs font-medium text-hulma-green group-hover:text-hulma-orange transition-colors">
                  {project.name}
                </p>
                <p className="text-[11px] text-hulma-brown/70">{project.location}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
