import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../mocks/projects';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  name: string;
  type: string;
  subtext: string;
  path: string;
  icon: string;
}

const productSuggestions: SearchResult[] = [
  { name: 'Natural Stone Look', type: 'Material Look', subtext: 'Products', path: '/coming-soon', icon: 'ri-stone-line' },
  { name: 'Terrazzo Look', type: 'Material Look', subtext: 'Products', path: '/coming-soon', icon: 'ri-stone-line' },
  { name: 'Organic', type: 'Material Look', subtext: 'Products', path: '/coming-soon', icon: 'ri-leaf-line' },
  { name: 'Hybrid', type: 'Material Look', subtext: 'Products', path: '/coming-soon', icon: 'ri-merge-cells-horizontal' },
  { name: 'Earth Series', type: 'Series', subtext: 'Products', path: '/coming-soon', icon: 'ri-earth-line' },
  { name: 'Ocean Series', type: 'Series', subtext: 'Products', path: '/coming-soon', icon: 'ri-water-flash-line' },
  { name: 'Marble Series', type: 'Series', subtext: 'Products', path: '/coming-soon', icon: 'ri-stone-line' },
  { name: 'Volcanic Series', type: 'Series', subtext: 'Products', path: '/coming-soon', icon: 'ri-fire-line' },
  { name: 'Beige', type: 'Color', subtext: 'Products', path: '/coming-soon', icon: 'ri-palette-line' },
  { name: 'Grey', type: 'Color', subtext: 'Products', path: '/coming-soon', icon: 'ri-palette-line' },
  { name: 'White', type: 'Color', subtext: 'Products', path: '/coming-soon', icon: 'ri-palette-line' },
  { name: 'Black', type: 'Color', subtext: 'Products', path: '/coming-soon', icon: 'ri-palette-line' },
  { name: 'Green', type: 'Color', subtext: 'Products', path: '/coming-soon', icon: 'ri-palette-line' },
  { name: 'Brown', type: 'Color', subtext: 'Products', path: '/coming-soon', icon: 'ri-palette-line' },
];

const projectSuggestions: SearchResult[] = projects.map((p) => ({
  name: p.name,
  type: p.category,
  subtext: p.location,
  path: `/project/${p.slug}`,
  icon: 'ri-building-line',
}));

const allSuggestions: SearchResult[] = [...productSuggestions, ...projectSuggestions];

const quickSearches = ['Natural Stone', 'Terrazzo', 'Organic', 'Hospitality', 'Retail', 'Entertainment'];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
      setFilteredResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q === '') {
      setFilteredResults([]);
    } else {
      const filtered = allSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.subtext.toLowerCase().includes(q)
      );
      setFilteredResults(filtered.slice(0, 10));
    }
  }, [searchQuery]);

  const handleResultClick = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
  };

  if (!isOpen) return null;

  const productResults = filteredResults.filter((r) => r.icon !== 'ri-building-line');
  const projectResults = filteredResults.filter((r) => r.icon === 'ri-building-line');

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 160px)', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-stone-100">
          <span className="w-5 h-5 flex items-center justify-center text-hulma-brown/50">
            <i className="ri-search-line text-xl"></i>
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, materials, colors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-base text-hulma-green placeholder:text-hulma-brown/40 outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <i className="ri-close-line text-xl text-hulma-brown/50"></i>
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          {searchQuery.trim() === '' ? (
            /* Empty state — show quick searches */
            <div className="py-6 px-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-hulma-brown/50 mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-hulma-green hover:bg-hulma-orange hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="py-2">
              {/* Product Results */}
              {productResults.length > 0 && (
                <>
                  <p className="px-6 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-hulma-brown/40">
                    Products
                  </p>
                  {productResults.map((item, index) => (
                    <button
                      key={`product-${index}`}
                      onClick={() => handleResultClick(item.path)}
                      className="w-full flex items-center justify-between px-6 py-3 hover:bg-stone-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-100 group-hover:bg-hulma-orange/10 transition-colors flex-shrink-0">
                          <i className={`${item.icon} text-sm text-hulma-brown/60 group-hover:text-hulma-orange`}></i>
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-medium text-hulma-green group-hover:text-hulma-orange transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-hulma-brown/50">{item.type}</p>
                        </div>
                      </div>
                      <span className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <i className="ri-arrow-right-line text-sm text-hulma-brown/50"></i>
                      </span>
                    </button>
                  ))}
                </>
              )}

              {/* Project Results */}
              {projectResults.length > 0 && (
                <>
                  <p className="px-6 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-hulma-brown/40">
                    Projects
                  </p>
                  {projectResults.map((item, index) => (
                    <button
                      key={`project-${index}`}
                      onClick={() => handleResultClick(item.path)}
                      className="w-full flex items-center justify-between px-6 py-3 hover:bg-stone-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-100 group-hover:bg-hulma-orange/10 transition-colors flex-shrink-0">
                          <i className="ri-building-line text-sm text-hulma-brown/60 group-hover:text-hulma-orange"></i>
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-medium text-hulma-green group-hover:text-hulma-orange transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-hulma-brown/50">{item.subtext} · {item.type}</p>
                        </div>
                      </div>
                      <span className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <i className="ri-arrow-right-line text-sm text-hulma-brown/50"></i>
                      </span>
                    </button>
                  ))}
                </>
              )}
            </div>
          ) : (
            <div className="py-16 px-6 text-center">
              <span className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-stone-100 mb-4">
                <i className="ri-search-line text-2xl text-hulma-brown/30"></i>
              </span>
              <p className="text-sm text-hulma-brown/60">No results for &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-hulma-brown/40 mt-1">Try a different keyword</p>
            </div>
          )}
        </div>

        {/* Footer quick links */}
        <div className="border-t border-stone-100 px-6 py-4 bg-stone-50/60 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => handleResultClick('/projects')}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-hulma-green hover:bg-hulma-orange hover:text-white transition-colors cursor-pointer whitespace-nowrap border border-stone-200"
            >
              All Projects
            </button>
            <button
              onClick={() => handleResultClick('/coming-soon')}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-hulma-green hover:bg-hulma-orange hover:text-white transition-colors cursor-pointer whitespace-nowrap border border-stone-200"
            >
              All Products
            </button>
          </div>
          <p className="text-[11px] text-hulma-brown/30">Press ESC to close</p>
        </div>
      </div>
    </div>
  );
}
