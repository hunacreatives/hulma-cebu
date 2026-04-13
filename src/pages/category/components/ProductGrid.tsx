
import { useState, useMemo } from 'react';
import type { CategoryProduct } from '../../../mocks/categories';

interface ProductGridProps {
  subCategories: string[];
  products: CategoryProduct[];
}

export default function ProductGrid({ subCategories, products }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeTab) return products;
    return products.filter((p) => p.subCategory === activeTab);
  }, [activeTab, products]);

  return (
    <section className="bg-white py-16 px-6 lg:px-12" data-product-shop>
      <div className="max-w-6xl mx-auto">
        {/* Sub‑category Tabs */}
        {subCategories.length > 1 && (
          <div className="flex items-center justify-center gap-8 mb-14">
            {subCategories.map((sub, i) => (
              <button
                key={sub}
                onClick={() => setActiveTab(activeTab === sub ? null : sub)}
                className={`text-sm font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === sub
                    ? 'text-hulma-green'
                    : 'text-hulma-brown/60 hover:text-hulma-green'
                }`}
              >
                {sub}
                {i < subCategories.length - 1 && (
                  <span className="ml-8 text-hulma-taupe/50 pointer-events-none select-none">
                    |
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <a
              key={product.id}
              href={`#${product.id}`}
              className="group cursor-pointer"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-hulma-ghost/50 rounded-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-xs text-hulma-brown leading-relaxed group-hover:text-hulma-green transition-colors">
                {product.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
