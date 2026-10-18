
export interface CategoryProduct {
  id: string;
  name: string;
  subCategory: string;
  image: string;
}

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  about: string;
  specification: string;
  heroImage: string;
  image: string;
  lifestyleImage: string;
  subCategories: string[];
  products: CategoryProduct[];
  faqs: CategoryFAQ[];
}

export const productCategories: ProductCategory[] = [
  {
    id: 'natural-stone',
    name: 'Natural Stone',
    slug: 'natural-stone',
    tagline: 'Bold Statements Rooted in Nature',
    description:
      'Authentic stone textures reimagined in lightweight fiberglass. Each panel captures the raw beauty of natural formations, delivering timeless elegance with modern performance.',
    about:
      'HULMA Natural Stone series brings the timeless beauty of real stone into a lightweight, versatile fiberglass format. Each piece is meticulously crafted to replicate the organic textures, veining, and depth found in natural stone formations. Ideal for both interior accent walls and exterior facades, these panels offer the visual weight of stone without the structural demands.',
    specification:
      'Material: Fiberglass Reinforced Polymer (FRP) | Thickness: 8mm - 12mm | Panel Size: 600mm x 1200mm (standard) | Weight: 3.5 kg/sqm | Fire Rating: Class A | UV Resistance: High | Installation: Adhesive or mechanical fixing | Finish: Matte textured | Colors: 12 standard options, custom available',
    heroImage:
      '/images/site/cat-hero-stone-001.webp',
    image:
      '/images/site/cat-stone-detail-001.webp',
    lifestyleImage:
      '/images/site/cat-stone-lifestyle-001.webp',
    subCategories: ['Fluted Out Mosaic', 'Fluted In Mosaic', 'Concave Strip'],
    products: [
      {
        id: 'ns-001',
        name: 'Slab Strip | Gray Travertine',
        subCategory: 'Fluted Out Mosaic',
        image: '/images/site/ns-gray-trav-001.webp',
      },
      {
        id: 'ns-002',
        name: 'Slab Strip | Red Travertine',
        subCategory: 'Fluted Out Mosaic',
        image: '/images/site/ns-red-trav-001.webp',
      },
      {
        id: 'ns-003',
        name: 'Slab Strip | White Travertine',
        subCategory: 'Fluted Out Mosaic',
        image: '/images/site/ns-white-trav-001.webp',
      },
      {
        id: 'ns-004',
        name: 'Fluted In Mosaic | Verde Green Marble',
        subCategory: 'Fluted In Mosaic',
        image: '/images/site/ns-verde-001.webp',
      },
      {
        id: 'ns-005',
        name: 'Fluted In Mosaic | White Travertine',
        subCategory: 'Fluted In Mosaic',
        image: '/images/site/ns-fluted-white-001.webp',
      },
      {
        id: 'ns-006',
        name: 'Fluted In Mosaic | Volakas White',
        subCategory: 'Fluted In Mosaic',
        image: '/images/site/ns-volakas-001.webp',
      },
      {
        id: 'ns-007',
        name: 'Fluted In Mosaic | Red Travertine',
        subCategory: 'Fluted In Mosaic',
        image: '/images/site/ns-fluted-red-001.webp',
      },
      {
        id: 'ns-008',
        name: 'Concave Strip | Jade Green Marble',
        subCategory: 'Concave Strip',
        image: '/images/site/ns-jade-001.webp',
      },
      {
        id: 'ns-009',
        name: 'Concave Strip | White Travertine',
        subCategory: 'Concave Strip',
        image: '/images/site/ns-concave-white-001.webp',
      },
      {
        id: 'ns-010',
        name: 'Concave Strip | Gray Travertine',
        subCategory: 'Concave Strip',
        image: '/images/site/ns-concave-gray-001.webp',
      },
      {
        id: 'ns-011',
        name: 'Concave Strip | Black Marquina',
        subCategory: 'Concave Strip',
        image: '/images/site/ns-black-marq-001.webp',
      },
      {
        id: 'ns-012',
        name: 'Concave Strip | Red Travertine',
        subCategory: 'Concave Strip',
        image: '/images/site/ns-concave-red-001.webp',
      },
    ],
    faqs: [
      { question: 'Can stones be used for outdoor installations?', answer: 'Yes, our Natural Stone series is engineered with UV-resistant fiberglass that withstands outdoor conditions including rain, humidity, and direct sunlight without fading or deteriorating.' },
      { question: 'Is grouting recommended when working with stones?', answer: 'Grouting is optional depending on the installation style. For a seamless look, panels can be installed edge-to-edge. For a traditional stone appearance, thin grout lines can be applied.' },
      { question: 'What tools are best for cutting stones?', answer: 'A standard circular saw with a fine-tooth blade or a jigsaw works perfectly. No specialized stone-cutting equipment is needed since the panels are fiberglass-based.' },
      { question: 'Are stones flexible or bendable?', answer: 'Our fiberglass stone panels have a slight flex that allows them to conform to gently curved surfaces. For tighter radii, we offer custom-molded solutions.' },
      { question: 'Is it necessary to always apply a sealer as a coating on stones?', answer: 'No sealer is required. The factory finish provides full protection against moisture, stains, and UV exposure. However, a clear coat can be applied for added sheen if desired.' },
    ],
  },
  {
    id: 'terrazzo',
    name: 'Terrazzo',
    slug: 'terrazzo',
    tagline: 'A Mosaic of Modern Craft',
    description:
      'Expressive and flexible, creating a curated sensory experience through warmth and color. Our terrazzo collection brings artisan craftsmanship to contemporary spaces.',
    about:
      'HULMA Terrazzo collection reimagines the classic Italian flooring tradition in a modern fiberglass format. Each panel features carefully embedded aggregate patterns that capture the artisanal charm of traditional terrazzo while offering the lightweight versatility of composite materials. Perfect for feature walls, countertops, and decorative installations.',
    specification:
      'Material: Fiberglass Reinforced Polymer (FRP) with embedded aggregates | Thickness: 10mm - 15mm | Panel Size: 600mm x 600mm / 600mm x 1200mm | Weight: 4.2 kg/sqm | Fire Rating: Class A | UV Resistance: High | Installation: Adhesive or mechanical fixing | Finish: Polished or matte | Colors: 8 standard patterns, custom available',
    heroImage:
      '/images/site/cat-hero-terrazzo-001.webp',
    image:
      '/images/site/cat-terrazzo-detail-001.webp',
    lifestyleImage:
      '/images/site/cat-terrazzo-lifestyle-001.webp',
    subCategories: ['Classic Chip', 'Fine Grain', 'Bold Aggregate'],
    products: [
      {
        id: 'tz-001',
        name: 'Classic Chip | Warm Ivory',
        subCategory: 'Classic Chip',
        image: '/images/site/tz-ivory-001.webp',
      },
      {
        id: 'tz-002',
        name: 'Classic Chip | Rose Quartz',
        subCategory: 'Classic Chip',
        image: '/images/site/tz-rose-001.webp',
      },
      {
        id: 'tz-003',
        name: 'Classic Chip | Charcoal Blend',
        subCategory: 'Classic Chip',
        image: '/images/site/tz-charcoal-001.webp',
      },
      {
        id: 'tz-004',
        name: 'Fine Grain | Sand Dune',
        subCategory: 'Fine Grain',
        image: '/images/site/tz-sand-001.webp',
      },
      {
        id: 'tz-005',
        name: 'Fine Grain | Ocean Mist',
        subCategory: 'Fine Grain',
        image: '/images/site/tz-ocean-001.webp',
      },
      {
        id: 'tz-006',
        name: 'Bold Aggregate | Earth Tone',
        subCategory: 'Bold Aggregate',
        image: '/images/site/tz-earth-001.webp',
      },
      {
        id: 'tz-007',
        name: 'Bold Aggregate | Midnight',
        subCategory: 'Bold Aggregate',
        image: '/images/site/tz-midnight-001.webp',
      },
      {
        id: 'tz-008',
        name: 'Bold Aggregate | Coral Reef',
        subCategory: 'Bold Aggregate',
        image: '/images/site/tz-coral-001.webp',
      },
    ],
    faqs: [
      { question: 'Can terrazzo panels be used on floors?', answer: 'Our terrazzo panels are designed primarily for wall applications and decorative surfaces. For flooring, we recommend our thicker 15mm variant with additional structural backing.' },
      { question: 'Are the aggregate chips real stone?', answer: 'Yes, we use genuine stone, marble, and glass aggregates embedded in our fiberglass matrix to achieve authentic terrazzo aesthetics with superior durability.' },
      { question: 'Can I customize the chip colors and sizes?', answer: 'Absolutely. We offer custom terrazzo designs where you can select aggregate type, size, color, and base tone to match your project vision.' },
      { question: 'How do I clean terrazzo panels?', answer: 'Simply wipe with a damp cloth and mild soap. The sealed surface resists stains and does not require special cleaning products or maintenance routines.' },
    ],
  },
  {
    id: 'organic',
    name: 'Organic',
    slug: 'organic',
    tagline: 'Surfaces Shaped by Nature',
    description:
      'Versatile and warm, transforming spaces through a blend of simplicity and style. Organic textures that bring the outside in with sustainable elegance.',
    about:
      'The HULMA Organic collection draws inspiration from natural wood grains, bamboo textures, and botanical patterns. These panels bring warmth and biophilic design principles into any space, creating environments that feel connected to nature while maintaining the durability and low maintenance of fiberglass construction.',
    specification:
      'Material: Fiberglass Reinforced Polymer (FRP) | Thickness: 6mm - 10mm | Panel Size: 300mm x 2400mm (plank) / 600mm x 1200mm (panel) | Weight: 3.0 kg/sqm | Fire Rating: Class A | UV Resistance: High | Installation: Tongue-and-groove or adhesive | Finish: Textured matte | Colors: 10 standard wood tones, custom available',
    heroImage:
      '/images/site/cat-hero-organic-001.webp',
    image:
      '/images/site/cat-organic-detail-001.webp',
    lifestyleImage:
      '/images/site/cat-organic-lifestyle-001.webp',
    subCategories: ['Wood Grain', 'Bamboo Weave', 'Botanical'],
    products: [
      {
        id: 'og-001',
        name: 'Wood Grain | Honey Oak',
        subCategory: 'Wood Grain',
        image: '/images/site/og-honey-001.webp',
      },
      {
        id: 'og-002',
        name: 'Wood Grain | Walnut',
        subCategory: 'Wood Grain',
        image: '/images/site/og-walnut-001.webp',
      },
      {
        id: 'og-003',
        name: 'Wood Grain | Ash White',
        subCategory: 'Wood Grain',
        image: '/images/site/og-ash-001.webp',
      },
      {
        id: 'og-004',
        name: 'Bamboo Weave | Natural',
        subCategory: 'Bamboo Weave',
        image: '/images/site/og-bamboo-001.webp',
      },
      {
        id: 'og-005',
        name: 'Bamboo Weave | Smoked',
        subCategory: 'Bamboo Weave',
        image: '/images/site/og-smoked-001.webp',
      },
      {
        id: 'og-006',
        name: 'Botanical | Fern Leaf',
        subCategory: 'Botanical',
        image: '/images/site/og-fern-001.webp',
      },
    ],
    faqs: [
      { question: 'Do organic panels look like real wood?', answer: "Yes, our advanced molding process captures authentic wood grain details, knots, and color variations that are virtually indistinguishable from real wood at arm's length." },
      { question: 'Are organic panels suitable for wet areas?', answer: 'Absolutely. Unlike real wood, our fiberglass panels are completely waterproof and will not warp, swell, or rot when exposed to moisture, making them ideal for bathrooms and kitchens.' },
      { question: 'Can I install these panels over existing walls?', answer: 'Yes, our panels can be installed directly over existing surfaces using construction adhesive, making renovation projects quick and mess-free.' },
    ],
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    slug: 'hybrid',
    tagline: 'Where Innovation Meets Design',
    description:
      'Durable and sleek, enhancing exteriors with a balance of grace and style. Our hybrid collection merges cutting-edge materials with refined aesthetics.',
    about:
      'The HULMA Hybrid collection represents the cutting edge of composite material technology. By combining fiberglass with WPC (Wood Plastic Composite) elements, these panels deliver exceptional weather resistance and structural integrity for demanding exterior applications. The collection is engineered for facades, outdoor living spaces, and high-traffic commercial environments.',
    specification:
      'Material: Fiberglass + WPC Composite | Thickness: 12mm - 20mm | Panel Size: 190mm x 2900mm (plank) / 200mm x 2900mm (plank) | Weight: 5.8 kg/sqm | Fire Rating: Class B1 | UV Resistance: Very High | Installation: Clip system or mechanical fixing | Finish: Textured or smooth | Colors: 6 standard options, custom available',
    heroImage:
      '/images/site/cat-hero-hybrid-001.webp',
    image:
      '/images/site/cat-hybrid-detail-001.webp',
    lifestyleImage:
      '/images/site/cat-hybrid-lifestyle-001.webp',
    subCategories: ['Outdoor Panels', 'Accessories'],
    products: [
      {
        id: 'hy-001',
        name: 'WPC Outdoor Half Round 4-Strip 200mm',
        subCategory: 'Outdoor Panels',
        image: '/images/site/hy-halfround-001.webp',
      },
      {
        id: 'hy-002',
        name: 'WPC Outdoor Pillow 6-Strip 190mm',
        subCategory: 'Outdoor Panels',
        image: '/images/site/hy-pillow-001.webp',
      },
      {
        id: 'hy-003',
        name: 'WPC Outdoor C-2 Strip 190mm',
        subCategory: 'Outdoor Panels',
        image: '/images/site/hy-cstrip-001.webp',
      },
      {
        id: 'hy-004',
        name: 'WPC Outdoor Keel 2m',
        subCategory: 'Accessories',
        image: '/images/site/hy-keel-001.webp',
      },
      {
        id: 'hy-005',
        name: 'WPC Outdoor Clip Set',
        subCategory: 'Accessories',
        image: '/images/site/hy-clip-001.webp',
      },
    ],
    faqs: [
      { question: 'How weather-resistant are hybrid panels?', answer: 'Our hybrid panels are engineered for extreme conditions including heavy rain, intense UV exposure, salt spray, and temperature fluctuations from -20°C to 60°C without warping or fading.' },
      { question: 'What is the expected lifespan of outdoor panels?', answer: 'With proper installation, our hybrid outdoor panels have an expected lifespan of 25+ years with minimal maintenance required.' },
      { question: 'Can hybrid panels be painted or stained?', answer: 'While our panels come in factory-finished colors, they can accept exterior-grade paint or stain if you wish to change the color in the future.' },
      { question: 'What mounting system is recommended?', answer: 'We recommend our proprietary clip system for a clean, hidden fastener look. Mechanical screwing is also supported for high-wind areas.' },
    ],
  },
];
