import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../mocks/blogs";
import Header from "../home/components/Header";
import Footer from "../home/components/Footer";
import { useSEO } from "../../utils/seo";

export default function BlogPage() {
  const [visible, setVisible] = useState(false);

  useSEO({
    title: 'Journal — Fiberglass Insights & Project Stories | Hulma Cebu',
    description: 'Explore HULMA Cebu\'s blog for architectural fiberglass insights, project case studies, material comparisons, and design inspiration for commercial and residential projects in the Philippines.',
    keywords: 'fiberglass blog, architectural materials Philippines, fiberglass cladding, custom fabrication insights, Cebu architecture, building materials guide',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'HULMA Cebu Journal',
      url: 'https://hulmacebu.com/blog',
      description: 'Fiberglass insights, project stories, and architectural material guides from HULMA Cebu.',
      publisher: {
        '@type': 'Organization',
        name: 'HULMA Cebu',
        url: 'https://hulmacebu.com',
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8' }}>
      <Header forceDark={true} />

      {/* ── Page header ── */}
      <section className="pt-36 pb-14 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="mb-7">
              <span className="font-serif font-light text-hulma-green text-base tracking-wide">
                Journal
              </span>
            </div>
            <h1
              className="font-serif font-light text-hulma-green leading-tight mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)' }}
            >
              Insights &amp; <em className="italic text-hulma-brown">ideas.</em>
            </h1>
            <p
              className="text-sm text-hulma-brown/55 leading-relaxed"
            >
              Thoughts on fiberglass craft, material innovation, and the spaces we help shape.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4-column grid ── */}
      <section className="px-6 lg:px-16 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogs.map((blog, i) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className={`group flex flex-col cursor-pointer transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                {/* Image */}
                <div
                  className="w-full overflow-hidden rounded-lg mb-4"
                  style={{ aspectRatio: '4/3' }}
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Meta */}
                <span
                  className="text-[10px] font-medium text-hulma-brown/40 tracking-widest uppercase mb-2"
                  style={{ letterSpacing: '0.13em' }}
                >
                  {blog.tags[0]}
                </span>

                {/* Title */}
                <h2
                  className="font-serif font-light text-hulma-green leading-snug mb-2.5 group-hover:text-hulma-brown transition-colors"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
                >
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs text-hulma-brown/50 leading-relaxed line-clamp-3 mb-4 flex-1">
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-hulma-green/8">
                  <span className="text-[10px] text-hulma-brown/35">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    {' · '}{blog.readTime}
                  </span>
                  <span className="text-[11px] font-medium text-hulma-orange group-hover:text-hulma-brown transition-colors whitespace-nowrap">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
