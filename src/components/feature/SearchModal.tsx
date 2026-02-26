import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchSuggestions = [
  { name: 'Terracotta', type: 'Material', path: '/products/material-look' },
  { name: 'Limestone', type: 'Material', path: '/products/material-look' },
  { name: 'Sandstone', type: 'Material', path: '/products/material-look' },
  { name: 'Natural Stone Look', type: 'Material Look', path: '/products/material-look' },
  { name: 'Terrazzo Look', type: 'Material Look', path: '/products/material-look' },
  { name: 'Earth Series', type: 'Series', path: '/products/series' },
  { name: 'Ocean Series', type: 'Series', path: '/products/series' },
  { name: 'Marble Series', type: 'Series', path: '/products/series' },
  { name: 'Beige', type: 'Color', path: '/products/material-look' },
  { name: 'Grey', type: 'Color', path: '/products/material-look' },
  { name: 'White', type: 'Color', path: '/products/material-look' },
];

const quickSearches = [
  'Natural Stone',
  'Terrazzo',
  'Organic',
  'Hybrid',
  'Fluted Mosaic',
  'Wood Grain',
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(searchSuggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
      setFilteredResults(searchSuggestions);
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
    if (searchQuery.trim() === '') {
      setFilteredResults(searchSuggestions);
    } else {
      const filtered = searchSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchQuery]);

  const handleResultClick = (path: string) => {
    onClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 160px)' }}
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-hulma-ghost">
          <span className="w-5 h-5 flex items-center justify-center text-hulma-brown/60">
            <i className="ri-search-line text-xl"></i>
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, materials, colors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-base text-hulma-green placeholder:text-hulma-brown/40 outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-hulma-ghost transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <i className="ri-close-line text-xl text-hulma-brown/60"></i>
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {filteredResults.length > 0 ? (
            <div className="py-2">
              {filteredResults.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(item.path)}
                  className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-hulma-ghost transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-hulma-ghost group-hover:bg-white transition-colors">
                      <i className="ri-product-hunt-line text-lg text-hulma-orange"></i>
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-hulma-green group-hover:text-hulma-orange transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs text-hulma-brown/60">{item.type}</p>
                    </div>
                  </div>
                  <span className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="ri-arrow-right-line text-sm text-hulma-brown/60"></i>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-16 px-6 text-center">
              <span className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-hulma-ghost mb-4">
                <i className="ri-search-line text-3xl text-hulma-brown/40"></i>
              </span>
              <p className="text-sm text-hulma-brown/60">No results found for "{searchQuery}"</p>
              <p className="text-xs text-hulma-brown/40 mt-2">Try searching for materials, colors, or series</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="border-t border-hulma-ghost px-6 py-4 bg-hulma-ghost/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-hulma-brown/60 mb-3">
            Quick Links
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleResultClick('/products/material-look')}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-hulma-green hover:bg-hulma-orange hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              All Materials
            </button>
            <button
              onClick={() => handleResultClick('/products/series')}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-hulma-green hover:bg-hulma-orange hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              All Series
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/');
                setTimeout(() => {
                  document.querySelector('#inspiration')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-hulma-green hover:bg-hulma-orange hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
