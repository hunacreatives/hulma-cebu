import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { blogs } from "../../../mocks/blogs";
import Header from "../../home/components/Header";
import Footer from "../../home/components/Footer";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const blog = blogs.find(b => b.slug === slug);
  
  // Get related posts (exclude current post)
  const relatedPosts = blog 
    ? blogs.filter(b => b.id !== blog.id).slice(0, 3)
    : [];

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | HULMA Cebu Fiberglass Insights`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.excerpt);
      }
      
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', blog.tags.join(', '));
      }
    }
  }, [blog]);

  // Redirect to blog list if post not found
  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header forceDark={true} />
        
        {/* Breadcrumb */}
        <nav className="pt-32 pb-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-teal-600 transition-colors">
                Home
              </Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <Link to="/blog" className="hover:text-teal-600 transition-colors">
                Blog
              </Link>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-900">{blog.title}</span>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <article className="pb-24">
          <header className="px-6 pb-12">
            <div className="max-w-4xl mx-auto">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-user-line"></i>
                  <span>{blog.author}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <i className="ri-calendar-line"></i>
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </time>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <i className="ri-time-line"></i>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="px-6 mb-12">
            <div className="max-w-5xl mx-auto">
              <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-6">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-base md:text-xl text-gray-700 leading-relaxed text-justify">
                  {blog.content.intro}
                </p>
              </div>

              {/* Content Sections */}
              {blog.content.sections.map((section, index) => (
                <section key={index} className="mb-12">
                  <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-sm md:text-lg text-gray-700 leading-relaxed mb-6 text-justify">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              {/* Conclusion */}
              <section className="mb-12 p-6 md:p-8 bg-gray-50 rounded-2xl border-l-4 border-teal-600">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
                  Conclusion
                </h2>
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed text-justify">
                  {blog.content.conclusion}
                </p>
              </section>

              {/* Share Section */}
              <div className="py-8 border-t border-b border-gray-200 mb-12">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">Share this article:</span>
                  <div className="flex items-center gap-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer"
                      aria-label="Share on Twitter"
                    >
                      <i className="ri-twitter-x-line text-lg"></i>
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer"
                      aria-label="Share on Facebook"
                    >
                      <i className="ri-facebook-fill text-lg"></i>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer"
                      aria-label="Share on LinkedIn"
                    >
                      <i className="ri-linkedin-fill text-lg"></i>
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer"
                      aria-label="Copy link"
                    >
                      <i className="ri-link text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedBlog) => (
                  <article key={relatedBlog.id} className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <Link to={`/blog/${relatedBlog.slug}`} className="block">
                      <div className="relative w-full h-48 overflow-hidden">
                        <img 
                          src={relatedBlog.coverImage} 
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs md:text-sm font-medium rounded-full whitespace-nowrap">
                            {relatedBlog.tags[0]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5 md:p-6">
                        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 mb-3">
                          <time dateTime={relatedBlog.date}>
                            {new Date(relatedBlog.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </time>
                          <span>•</span>
                          <span>{relatedBlog.readTime}</span>
                        </div>
                        
                        <h3 className="text-base md:text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                        
                        <span className="inline-flex items-center gap-2 text-teal-600 text-sm font-medium group-hover:gap-3 transition-all whitespace-nowrap cursor-pointer">
                          Read More
                          <i className="ri-arrow-right-line"></i>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
