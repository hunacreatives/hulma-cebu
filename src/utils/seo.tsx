import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

export function useSEO({ title, description, keywords, ogImage, schema }: SEOProps) {
  const location = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://hulmacebu.com';
  const canonicalUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);
    
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Schema.org JSON-LD
    if (schema) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(schema);
    }

    // Update last-modified
    const lastModified = document.querySelector('meta[name="last-modified"]');
    if (lastModified) {
      lastModified.setAttribute('content', new Date().toISOString().split('T')[0]);
    }
  }, [title, description, keywords, ogImage, schema, canonicalUrl]);
}

// SEO configurations for each page
export const seoConfig = {
  home: {
    title: 'Hulma Cebu - Architectural Fiberglass Solutions | Custom Fabrication',
    description: 'HULMA Cebu specializes in architectural fiberglass solutions for commercial, hospitality, and residential projects. Custom fabrication, lightweight yet structurally strong materials, project-specific solutions.',
    keywords: 'architectural fiberglass, custom fabrication, fiberglass panels, terracotta finish, limestone finish, sandstone texture, Cebu, project-specific solutions, architectural materials',
  },
  about: {
    title: 'About Hulma Cebu - 30+ Years of Fiberglass Expertise',
    description: 'With over 30 years of experience, HULMA Cebu delivers architectural fiberglass solutions through custom fabrication and design collaboration. Trusted by architects, designers, and developers.',
    keywords: 'fiberglass fabrication, architectural solutions, custom design, Cebu manufacturer, project collaboration, design consultation',
  },
  contact: {
    title: 'Contact Hulma Cebu - Product Presentations & Consultations',
    description: 'Schedule a product presentation or material consultation with HULMA Cebu. Discuss your architectural project and explore our custom fiberglass solutions.',
    keywords: 'product presentation, material consultation, project discussion, architectural fiberglass, Cebu, custom fabrication',
  },
  inspiration: {
    title: 'Project Gallery - Hulma Cebu Architectural Solutions',
    description: 'Explore completed projects featuring HULMA Cebu\'s architectural fiberglass solutions. Commercial, hospitality, and residential applications showcasing custom fabrication.',
    keywords: 'project gallery, architectural projects, fiberglass applications, commercial projects, hospitality design, custom fabrication examples',
  },
  bookPresentation: {
    title: 'Book a Product Presentation - Hulma Cebu',
    description: 'Schedule a private product presentation to experience HULMA Cebu\'s architectural fiberglass materials. Available in-person or virtually for architects and designers.',
    keywords: 'product presentation, material consultation, architectural fiberglass, design consultation, Cebu',
  },
  requestSamples: {
    title: 'Request Material Samples - Hulma Cebu',
    description: 'Request material samples to evaluate HULMA Cebu\'s fiberglass finishes for your project. Terracotta, limestone, sandstone, and custom textures available.',
    keywords: 'material samples, fiberglass samples, architectural materials, terracotta finish, limestone finish, sandstone texture',
  },
};
