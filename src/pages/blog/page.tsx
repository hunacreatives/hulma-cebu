import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../mocks/blogs";
import Header from "../home/components/Header";
import Footer from "../home/components/Footer";

export default function BlogPage() {
  useEffect(() => {
    document.title = "Fiberglass Insights & Ideas | Expert Articles on Architectural Fiberglass";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore expert insights on fiberglass cladding, fiberglass panels, and architectural fiberglass. Stay updated with the latest trends, tips, and innovations in fiberglass construction materials.');
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'fiberglass blog, fiberglass cladding, fiberglass panels, architectural fiberglass, building materials, construction insights');
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header forceDark={true} />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Fiberglass Insights & Ideas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert articles on fiberglass cladding, architectural panels, and innovative building materials. Stay informed with the latest trends and best practices.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <Link to={`/blog/${blog.slug}`} className="block">
                    <div className="relative w-full h-80 overflow-hidden">
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded-full whitespace-nowrap">
                          {blog.tags[0]}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <time dateTime={blog.date}>
                          {new Date(blog.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </time>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                        {blog.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {blog.author}</span>
                        <span className="inline-flex items-center gap-2 text-teal-600 font-medium group-hover:gap-3 transition-all whitespace-nowrap cursor-pointer">
                          Read More
                          <i className="ri-arrow-right-line"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
