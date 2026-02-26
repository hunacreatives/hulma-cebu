
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
      'https://readdy.ai/api/search-image?query=Close%20up%20of%20natural%20red%20terracotta%20stone%20tiles%20arranged%20in%20rows%20showing%20texture%20and%20warm%20earthy%20tones%20architectural%20material%20photography%20with%20soft%20lighting%20and%20clean%20composition&width=1400&height=600&seq=cat-hero-stone-001&orientation=landscape',
    image:
      'https://readdy.ai/api/search-image?query=Closeup%20of%20various%20natural%20stone%20material%20samples%20arranged%20artistically%20showing%20different%20textures%20colors%20and%20patterns%20including%20marble%20travertine%20and%20slate%20warm%20studio%20lighting%20architectural%20material%20photography&width=700&height=500&seq=cat-stone-detail-001&orientation=landscape',
    lifestyleImage:
      'https://readdy.ai/api/search-image?query=Modern%20luxury%20living%20room%20interior%20with%20natural%20stone%20textured%20wall%20panels%20warm%20ambient%20lighting%20contemporary%20furniture%20earth%20tones%20elegant%20architectural%20design%20photography%20wide%20angle&width=1400&height=600&seq=cat-stone-lifestyle-001&orientation=landscape',
    subCategories: ['Fluted Out Mosaic', 'Fluted In Mosaic', 'Concave Strip'],
    products: [
      {
        id: 'ns-001',
        name: 'Slab Strip | Gray Travertine',
        subCategory: 'Fluted Out Mosaic',
        image: 'https://readdy.ai/api/search-image?query=Single%20gray%20travertine%20stone%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20composition%20showing%20natural%20stone%20texture%20and%20veining&width=300&height=300&seq=ns-gray-trav-001&orientation=squarish',
      },
      {
        id: 'ns-002',
        name: 'Slab Strip | Red Travertine',
        subCategory: 'Fluted Out Mosaic',
        image: 'https://readdy.ai/api/search-image?query=Single%20red%20travertine%20stone%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20composition%20showing%20warm%20reddish%20stone%20texture&width=300&height=300&seq=ns-red-trav-001&orientation=squarish',
      },
      {
        id: 'ns-003',
        name: 'Slab Strip | White Travertine',
        subCategory: 'Fluted Out Mosaic',
        image: 'https://readdy.ai/api/search-image?query=Single%20white%20travertine%20stone%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20composition%20showing%20light%20cream%20stone%20texture&width=300&height=300&seq=ns-white-trav-001&orientation=squarish',
      },
      {
        id: 'ns-004',
        name: 'Fluted In Mosaic | Verde Green Marble',
        subCategory: 'Fluted In Mosaic',
        image: 'https://readdy.ai/api/search-image?query=Single%20verde%20green%20marble%20mosaic%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20composition%20showing%20deep%20green%20stone%20pattern&width=300&height=300&seq=ns-verde-001&orientation=squarish',
      },
      {
        id: 'ns-005',
        name: 'Fluted In Mosaic | White Travertine',
        subCategory: 'Fluted In Mosaic',
        image: 'https://readdy.ai/api/search-image?query=Single%20white%20travertine%20fluted%20mosaic%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20vertical%20ribbed%20texture&width=300&height=300&seq=ns-fluted-white-001&orientation=squarish',
      },
      {
        id: 'ns-006',
        name: 'Fluted In Mosaic | Volakas White',
        subCategory: 'Fluted In Mosaic',
        image: 'https://readdy.ai/api/search-image?query=Single%20volakas%20white%20marble%20fluted%20mosaic%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20elegant%20white%20marble%20with%20gray%20veining&width=300&height=300&seq=ns-volakas-001&orientation=squarish',
      },
      {
        id: 'ns-007',
        name: 'Fluted In Mosaic | Red Travertine',
        subCategory: 'Fluted In Mosaic',
        image: 'https://readdy.ai/api/search-image?query=Single%20red%20travertine%20fluted%20mosaic%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20warm%20terracotta%20toned%20ribbed%20texture&width=300&height=300&seq=ns-fluted-red-001&orientation=squarish',
      },
      {
        id: 'ns-008',
        name: 'Concave Strip | Jade Green Marble',
        subCategory: 'Concave Strip',
        image: 'https://readdy.ai/api/search-image?query=Single%20jade%20green%20marble%20concave%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20curved%20green%20stone%20surface&width=300&height=300&seq=ns-jade-001&orientation=squarish',
      },
      {
        id: 'ns-009',
        name: 'Concave Strip | White Travertine',
        subCategory: 'Concave Strip',
        image: 'https://readdy.ai/api/search-image?query=Single%20white%20travertine%20concave%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20curved%20cream%20stone%20surface&width=300&height=300&seq=ns-concave-white-001&orientation=squarish',
      },
      {
        id: 'ns-010',
        name: 'Concave Strip | Gray Travertine',
        subCategory: 'Concave Strip',
        image: 'https://readdy.ai/api/search-image?query=Single%20gray%20travertine%20concave%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20curved%20gray%20stone%20surface&width=300&height=300&seq=ns-concave-gray-001&orientation=squarish',
      },
      {
        id: 'ns-011',
        name: 'Concave Strip | Black Marquina',
        subCategory: 'Concave Strip',
        image: 'https://readdy.ai/api/search-image?query=Single%20black%20marquina%20marble%20concave%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20curved%20dark%20stone%20with%20white%20veining&width=300&height=300&seq=ns-black-marq-001&orientation=squarish',
      },
      {
        id: 'ns-012',
        name: 'Concave Strip | Red Travertine',
        subCategory: 'Concave Strip',
        image: 'https://readdy.ai/api/search-image?query=Single%20red%20travertine%20concave%20strip%20tile%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20curved%20warm%20reddish%20stone%20surface&width=300&height=300&seq=ns-concave-red-001&orientation=squarish',
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
      'https://readdy.ai/api/search-image?query=Close%20up%20of%20colorful%20terrazzo%20surface%20with%20scattered%20stone%20chips%20in%20warm%20earth%20tones%20beige%20cream%20and%20brown%20fragments%20embedded%20in%20smooth%20surface%20architectural%20material%20photography&width=1400&height=600&seq=cat-hero-terrazzo-001&orientation=landscape',
    image:
      'https://readdy.ai/api/search-image?query=Closeup%20of%20terrazzo%20material%20samples%20showing%20colorful%20stone%20chip%20patterns%20in%20warm%20earth%20tones%20arranged%20on%20studio%20surface%20architectural%20material%20photography%20warm%20lighting&width=700&height=500&seq=cat-terrazzo-detail-001&orientation=landscape',
    lifestyleImage:
      'https://readdy.ai/api/search-image?query=Modern%20minimalist%20interior%20with%20terrazzo%20accent%20wall%20warm%20ambient%20lighting%20contemporary%20furniture%20neutral%20earth%20tones%20elegant%20architectural%20design%20photography%20wide%20angle&width=1400&height=600&seq=cat-terrazzo-lifestyle-001&orientation=landscape',
    subCategories: ['Classic Chip', 'Fine Grain', 'Bold Aggregate'],
    products: [
      {
        id: 'tz-001',
        name: 'Classic Chip | Warm Ivory',
        subCategory: 'Classic Chip',
        image: 'https://readdy.ai/api/search-image?query=Single%20terrazzo%20tile%20sample%20with%20warm%20ivory%20base%20and%20scattered%20stone%20chips%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-ivory-001&orientation=squarish',
      },
      {
        id: 'tz-002',
        name: 'Classic Chip | Rose Quartz',
        subCategory: 'Classic Chip',
        image: 'https://readdy.ai/api/search-image?query=Single%20terrazzo%20tile%20sample%20with%20soft%20pink%20rose%20quartz%20chips%20on%20cream%20base%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-rose-001&orientation=squarish',
      },
      {
        id: 'tz-003',
        name: 'Classic Chip | Charcoal Blend',
        subCategory: 'Classic Chip',
        image: 'https://readdy.ai/api/search-image?query=Single%20terrazzo%20tile%20sample%20with%20dark%20charcoal%20and%20gray%20stone%20chips%20on%20white%20base%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-charcoal-001&orientation=squarish',
      },
      {
        id: 'tz-004',
        name: 'Fine Grain | Sand Dune',
        subCategory: 'Fine Grain',
        image: 'https://readdy.ai/api/search-image?query=Single%20fine%20grain%20terrazzo%20tile%20sample%20with%20sandy%20beige%20tiny%20aggregate%20particles%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-sand-001&orientation=squarish',
      },
      {
        id: 'tz-005',
        name: 'Fine Grain | Ocean Mist',
        subCategory: 'Fine Grain',
        image: 'https://readdy.ai/api/search-image?query=Single%20fine%20grain%20terrazzo%20tile%20sample%20with%20soft%20gray%20and%20white%20tiny%20aggregate%20particles%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-ocean-001&orientation=squarish',
      },
      {
        id: 'tz-006',
        name: 'Bold Aggregate | Earth Tone',
        subCategory: 'Bold Aggregate',
        image: 'https://readdy.ai/api/search-image?query=Single%20bold%20aggregate%20terrazzo%20tile%20sample%20with%20large%20brown%20and%20beige%20stone%20pieces%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-earth-001&orientation=squarish',
      },
      {
        id: 'tz-007',
        name: 'Bold Aggregate | Midnight',
        subCategory: 'Bold Aggregate',
        image: 'https://readdy.ai/api/search-image?query=Single%20bold%20aggregate%20terrazzo%20tile%20sample%20with%20large%20dark%20stone%20pieces%20on%20black%20base%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-midnight-001&orientation=squarish',
      },
      {
        id: 'tz-008',
        name: 'Bold Aggregate | Coral Reef',
        subCategory: 'Bold Aggregate',
        image: 'https://readdy.ai/api/search-image?query=Single%20bold%20aggregate%20terrazzo%20tile%20sample%20with%20warm%20coral%20and%20cream%20large%20stone%20pieces%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal&width=300&height=300&seq=tz-coral-001&orientation=squarish',
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
      'https://readdy.ai/api/search-image?query=Close%20up%20of%20warm%20honey%20toned%20wood%20grain%20fluted%20panels%20with%20vertical%20ribbed%20texture%20natural%20organic%20material%20architectural%20photography%20soft%20lighting&width=1400&height=600&seq=cat-hero-organic-001&orientation=landscape',
    image:
      'https://readdy.ai/api/search-image?query=Closeup%20of%20organic%20wood%20grain%20material%20samples%20showing%20different%20warm%20tones%20and%20textures%20arranged%20artistically%20on%20studio%20surface%20architectural%20material%20photography&width=700&height=500&seq=cat-organic-detail-001&orientation=landscape',
    lifestyleImage:
      'https://readdy.ai/api/search-image?query=Modern%20spa%20interior%20with%20organic%20wood%20textured%20wall%20panels%20warm%20ambient%20lighting%20natural%20materials%20contemporary%20design%20photography%20wide%20angle&width=1400&height=600&seq=cat-organic-lifestyle-001&orientation=landscape',
    subCategories: ['Wood Grain', 'Bamboo Weave', 'Botanical'],
    products: [
      {
        id: 'og-001',
        name: 'Wood Grain | Honey Oak',
        subCategory: 'Wood Grain',
        image: 'https://readdy.ai/api/search-image?query=Single%20honey%20oak%20wood%20grain%20fiberglass%20panel%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20warm%20golden%20wood%20texture&width=300&height=300&seq=og-honey-001&orientation=squarish',
      },
      {
        id: 'og-002',
        name: 'Wood Grain | Walnut',
        subCategory: 'Wood Grain',
        image: 'https://readdy.ai/api/search-image?query=Single%20dark%20walnut%20wood%20grain%20fiberglass%20panel%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20rich%20brown%20wood%20texture&width=300&height=300&seq=og-walnut-001&orientation=squarish',
      },
      {
        id: 'og-003',
        name: 'Wood Grain | Ash White',
        subCategory: 'Wood Grain',
        image: 'https://readdy.ai/api/search-image?query=Single%20ash%20white%20wood%20grain%20fiberglass%20panel%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20light%20pale%20wood%20texture&width=300&height=300&seq=og-ash-001&orientation=squarish',
      },
      {
        id: 'og-004',
        name: 'Bamboo Weave | Natural',
        subCategory: 'Bamboo Weave',
        image: 'https://readdy.ai/api/search-image?query=Single%20natural%20bamboo%20weave%20textured%20fiberglass%20panel%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20woven%20pattern&width=300&height=300&seq=og-bamboo-001&orientation=squarish',
      },
      {
        id: 'og-005',
        name: 'Bamboo Weave | Smoked',
        subCategory: 'Bamboo Weave',
        image: 'https://readdy.ai/api/search-image?query=Single%20smoked%20dark%20bamboo%20weave%20textured%20fiberglass%20panel%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20dark%20woven%20pattern&width=300&height=300&seq=og-smoked-001&orientation=squarish',
      },
      {
        id: 'og-006',
        name: 'Botanical | Fern Leaf',
        subCategory: 'Botanical',
        image: 'https://readdy.ai/api/search-image?query=Single%20botanical%20fern%20leaf%20embossed%20fiberglass%20panel%20sample%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20organic%20leaf%20pattern&width=300&height=300&seq=og-fern-001&orientation=squarish',
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
      'https://readdy.ai/api/search-image?query=Close%20up%20of%20dark%20brown%20vertical%20ribbed%20composite%20outdoor%20wall%20panels%20modern%20architectural%20exterior%20material%20photography%20dramatic%20lighting%20showing%20texture%20detail&width=1400&height=600&seq=cat-hero-hybrid-001&orientation=landscape',
    image:
      'https://readdy.ai/api/search-image?query=Closeup%20of%20dark%20composite%20WPC%20outdoor%20panel%20material%20samples%20showing%20ribbed%20texture%20and%20cross%20section%20arranged%20on%20studio%20surface%20architectural%20material%20photography&width=700&height=500&seq=cat-hybrid-detail-001&orientation=landscape',
    lifestyleImage:
      'https://readdy.ai/api/search-image?query=Modern%20outdoor%20patio%20with%20dark%20vertical%20ribbed%20composite%20wall%20panels%20contemporary%20outdoor%20furniture%20green%20tropical%20plants%20warm%20ambient%20lighting%20architectural%20design%20photography%20wide%20angle&width=1400&height=600&seq=cat-hybrid-lifestyle-001&orientation=landscape',
    subCategories: ['Outdoor Panels', 'Accessories'],
    products: [
      {
        id: 'hy-001',
        name: 'WPC Outdoor Half Round 4-Strip 200mm',
        subCategory: 'Outdoor Panels',
        image: 'https://readdy.ai/api/search-image?query=Single%20dark%20brown%20WPC%20outdoor%20composite%20panel%20with%20half%20round%20profile%20four%20strips%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20cross%20section&width=300&height=300&seq=hy-halfround-001&orientation=squarish',
      },
      {
        id: 'hy-002',
        name: 'WPC Outdoor Pillow 6-Strip 190mm',
        subCategory: 'Outdoor Panels',
        image: 'https://readdy.ai/api/search-image?query=Single%20dark%20brown%20WPC%20outdoor%20composite%20panel%20with%20pillow%20profile%20six%20strips%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20ribbed%20surface&width=300&height=300&seq=hy-pillow-001&orientation=squarish',
      },
      {
        id: 'hy-003',
        name: 'WPC Outdoor C-2 Strip 190mm',
        subCategory: 'Outdoor Panels',
        image: 'https://readdy.ai/api/search-image?query=Single%20dark%20brown%20WPC%20outdoor%20composite%20panel%20with%20C%20profile%20two%20strips%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20angular%20profile&width=300&height=300&seq=hy-cstrip-001&orientation=squarish',
      },
      {
        id: 'hy-004',
        name: 'WPC Outdoor Keel 2m',
        subCategory: 'Accessories',
        image: 'https://readdy.ai/api/search-image?query=Single%20dark%20brown%20WPC%20outdoor%20keel%20mounting%20bracket%20accessory%20on%20pure%20white%20background%20architectural%20material%20product%20photography%20clean%20minimal%20showing%20structural%20support%20piece&width=300&height=300&seq=hy-keel-001&orientation=squarish',
      },
      {
        id: 'hy-005',
        name: 'WPC Outdoor Clip Set',
        subCategory: 'Accessories',
        image: 'https://readdy.ai/api/search-image?query=Small%20metal%20and%20plastic%20clip%20fastener%20set%20for%20WPC%20outdoor%20panels%20on%20pure%20white%20background%20product%20photography%20clean%20minimal%20showing%20installation%20hardware&width=300&height=300&seq=hy-clip-001&orientation=squarish',
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
