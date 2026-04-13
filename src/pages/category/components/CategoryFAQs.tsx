
import { useState } from 'react';
import type { CategoryFAQ } from '../../../mocks/categories';

interface CategoryFAQsProps {
  faqs: CategoryFAQ[];
}

export default function CategoryFAQs({ faqs }: CategoryFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Guard clause: if no FAQs are provided, render nothing
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="bg-hulma-ghost py-20 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-hulma-green mb-12">
          FAQs
        </h2>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-hulma-taupe/30">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-5 cursor-pointer group text-left"
              >
                <span className="text-sm font-medium text-hulma-green pr-8 leading-relaxed">
                  {faq.question}
                </span>
                <span
                  className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-hulma-brown transition-transform duration-300"
                  style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <i className="ri-add-line text-lg"></i>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[300px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={openIndex !== index}
              >
                <p className="text-sm text-hulma-brown leading-relaxed pl-0 pr-12">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
