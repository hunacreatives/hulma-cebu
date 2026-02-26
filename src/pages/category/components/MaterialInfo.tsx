
import { useState } from 'react';

interface MaterialInfoProps {
  name: string;
  tagline: string;
  image: string;
  about: string;
  specification: string;
}

export default function MaterialInfo({
  name,
  tagline,
  image,
  about,
  specification,
}: MaterialInfoProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="bg-white">
      {/* Tagline */}
      <div className="py-12 text-center">
        <p className="text-xl md:text-2xl font-serif font-light text-hulma-taupe italic tracking-wide">
          {tagline}
        </p>
      </div>

      {/* Material Info Row */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-20">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left Image */}
          <div className="lg:w-1/2 w-full h-[400px] overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover object-top" />
          </div>

          {/* Right Info */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center lg:pl-12 pt-8 lg:pt-0">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-hulma-green mb-8">
              {name}
            </h2>

            {/* About Accordion */}
            <div className="border-b border-hulma-taupe\\/40">
              <button
                onClick={() => toggleSection('about')}
                className="w-full flex items-center justify-between py-4 cursor-pointer group"
              >
                <span className="text-sm font-medium text-hulma-green tracking-wide">
                  About
                </span>
                <span
                  className="w-5 h-5 flex items-center justify-center text-hulma-brown transition-transform duration-300"
                  style={{
                    transform: openSection === 'about' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <i className="ri-arrow-down-s-line text-lg"></i>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSection === 'about' ? 'max-h-[400px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-hulma-brown leading-relaxed">{about}</p>
              </div>
            </div>

            {/* Specification Accordion */}
            <div className="border-b border-hulma-taupe\\/40">
              <button
                onClick={() => toggleSection('specification')}
                className="w-full flex items-center justify-between py-4 cursor-pointer group"
              >
                <span className="text-sm font-medium text-hulma-green tracking-wide">
                  Specification
                </span>
                <span
                  className="w-5 h-5 flex items-center justify-center text-hulma-brown transition-transform duration-300"
                  style={{
                    transform:
                      openSection === 'specification' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <i className="ri-arrow-down-s-line text-lg"></i>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSection === 'specification'
                    ? 'max-h-[400px] opacity-100 pb-5'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-sm text-hulma-brown leading-relaxed">
                  {specification.split(' | ').map((spec, i) => (
                    <div key={i} className="py-1">
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
