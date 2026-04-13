import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../../utils/seo';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import CategoryListHero from './components/CategoryListHero';
import CategoryRow from './components/CategoryRow';
import CategoryHero from './components/CategoryHero';
import MaterialInfo from './components/MaterialInfo';
import ProductGrid from './components/ProductGrid';
import CategoryFAQs from './components/CategoryFAQs';
import { productCategories } from '../../mocks/categories';

export default function CategoryPage() {
  const { type, slug } = useParams<{ type: string; slug: string }>();
  const [isVisible, setIsVisible] = useState(false);

  // If we have a slug, show a single category detail page
  const category = slug
    ? productCategories.find((c) => c.slug === slug)
    : null;

  // SEO for category detail page
  useSEO({
    title: category
      ? `${category.name} - Premium Fiberglass ${category.name} Materials | HULMA Cebu`
      : `${type === 'series' ? 'Series Collection' : 'Material Look'} - HULMA Fiberglass Products`,
    description: category
      ? `Explore HULMA's ${category.name} collection. ${category.tagline} Premium fiberglass architectural materials crafted in Cebu for modern design projects.`
      : `Browse HULMA's complete collection of premium fiberglass architectural materials. Discover innovative ${type === 'series' ? 'series' : 'material looks'} for your next project.`,
    keywords: category
      ? `${category.name} fiberglass, ${category.name} architectural materials, premium ${category.name}, HULMA ${category.name}`
      : 'fiberglass materials, architectural products, building materials, premium fiberglass',
    canonical: category ? `/category/${type}/${slug}` : `/category/${type}`,
    schema: category
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: category.name,
          description: category.tagline,
          brand: {
            '@type': 'Brand',
            name: 'HULMA',
          },
          image: category.image,
          offers: {
            '@type': 'AggregateOffer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'PHP',
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: type === 'series' ? 'Series Collection' : 'Material Look',
          description: 'Browse HULMA\'s complete collection of premium fiberglass architectural materials',
          url: `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/category/${type}`,
        },
  });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, [type, slug]);

  // If no slug, show the full-width vertical category listing
  if (!category) {
    return (
      <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        <CategoryListHero title={type === 'series' ? 'Series Collection' : 'Material Look'} />

        {/* Vertical category rows */}
        <div>
          {productCategories.map((cat, index) => (
            <CategoryRow key={cat.id} category={cat} index={index} />
          ))}
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header />

      {/* Hero */}
      <CategoryHero title={category.name} image={category.heroImage} />

      {/* Material Info with Accordions */}
      <MaterialInfo
        name={category.name}
        tagline={category.tagline}
        image={category.image}
        about={category.about}
        specification={category.specification}
      />

      {/* Product Grid with Tabs */}
      <ProductGrid subCategories={category.subCategories} products={category.products} />

      {/* Lifestyle Banner */}
      <section className="relative w-full h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={category.lifestyleImage}
          alt={`${category.name} in use`}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/10" />
      </section>

      {/* FAQs */}
      <CategoryFAQs faqs={category.faqs} />

      <Footer />
    </div>
  );
}
