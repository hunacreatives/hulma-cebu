import { useState, useEffect, useCallback } from 'react';

interface GalleryImage {
  src: string;
  caption?: string;
}

interface PhotoGalleryProps {
  images: (GalleryImage | string)[];
  projectName: string;
}

function normalizeImages(images: (GalleryImage | string)[]): GalleryImage[] {
  return images.map((img) =>
    typeof img === 'string' ? { src: img } : img
  );
}

export default function PhotoGallery({ images, projectName }: PhotoGalleryProps) {
  const normalized = normalizeImages(images);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('photo-gallery-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const openLightbox = (index: number) => {
    if (!normalized || index < 0 || index >= normalized.length) return;
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === normalized.length - 1 ? 0 : prev + 1));
  }, [normalized.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? normalized.length - 1 : prev - 1));
  }, [normalized.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, goNext, goPrev]);

  if (!normalized || normalized.length === 0) return null;

  const renderCaption = (caption?: string) =>
    caption ? (
      <div className="absolute bottom-3 left-3 right-3 hidden sm:block">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
          <span className="text-white text-xs font-sans tracking-wide">{caption}</span>
        </div>
      </div>
    ) : null;

  const getGridLayout = () => {
    const count = normalized.length;

    if (count === 1) {
      return (
        <div
          className={`relative w-full h-[380px] rounded-2xl overflow-hidden cursor-pointer group opacity-0-init ${
            isVisible ? 'animate-scale-in' : ''
          }`}
          onClick={() => openLightbox(0)}
        >
          <img
            src={normalized[0].src}
            alt={`${projectName} - Photo 1`}
            title={`${projectName} gallery photo`}
            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          {renderCaption(normalized[0].caption)}
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-4">
          {normalized.map((img, i) => (
            <div
              key={i}
              className={`relative w-full h-[320px] rounded-2xl overflow-hidden cursor-pointer group opacity-0-init ${
                isVisible ? 'animate-scale-in' : ''
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={`${projectName} - Photo ${i + 1}`}
                title={`${projectName} gallery photo`}
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              {renderCaption(img.caption)}
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`relative w-full h-[380px] rounded-2xl overflow-hidden cursor-pointer group row-span-2 opacity-0-init ${
              isVisible ? 'animate-scale-in' : ''
            }`}
            onClick={() => openLightbox(0)}
          >
            <img
              src={normalized[0].src}
              alt={`${projectName} - Photo 1`}
              title={`${projectName} gallery photo`}
              className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            {renderCaption(normalized[0].caption)}
          </div>
          <div className="flex flex-col gap-4">
            {normalized.slice(1).map((img, i) => (
              <div
                key={i}
                className={`relative w-full h-[183px] rounded-2xl overflow-hidden cursor-pointer group opacity-0-init ${
                  isVisible ? 'animate-scale-in' : ''
                }`}
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={img.src}
                  alt={`${projectName} - Photo ${i + 2}`}
                  title={`${projectName} gallery photo`}
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {renderCaption(img.caption)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    const remaining = count - 1;
    const gridColsClass =
      remaining >= 4
        ? 'grid-cols-4'
        : remaining > 0
        ? `grid-cols-${remaining}`
        : '';

    return (
      <div className="space-y-4">
        <div
          className={`relative w-full h-[360px] rounded-2xl overflow-hidden cursor-pointer group opacity-0-init ${
            isVisible ? 'animate-scale-in' : ''
          }`}
          onClick={() => openLightbox(0)}
        >
          <img
            src={normalized[0].src}
            alt={`${projectName} - Photo 1`}
            title={`${projectName} gallery photo`}
            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          {renderCaption(normalized[0].caption)}
        </div>

        <div className={`grid gap-4 ${gridColsClass}`}>
          {normalized.slice(1).map((img, i) => {
            const isLastVisible = i === remaining - 1 && count > 5;
            return (
              <div
                key={i}
                className={`relative w-full h-[160px] rounded-xl overflow-hidden cursor-pointer group opacity-0-init ${
                  isVisible ? 'animate-scale-in' : ''
                }`}
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={img.src}
                  alt={`${projectName} - Photo ${i + 2}`}
                  title={`${projectName} gallery photo`}
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {renderCaption(img.caption)}
                {isLastVisible && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-lg font-sans font-medium">
                      +{count - 4} more
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="photo-gallery-section" className="py-12 px-6 lg:px-16 bg-hulma-ghost">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex items-center justify-between mb-7 opacity-0-init ${
              isVisible ? 'animate-fade-up' : ''
            }`}
          >
            <h2 className="text-2xl font-serif font-light text-hulma-green">
              Project Gallery
            </h2>
            <span className="text-sm text-hulma-brown/50 font-sans">
              {normalized.length} {normalized.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>
          {getGridLayout()}
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-fade-in-fast"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <i className="ri-close-line text-white text-xl"></i>
          </button>

          <div className="absolute top-6 left-6 text-white/60 text-sm font-sans z-10">
            {activeIndex + 1} / {normalized.length}
          </div>

          {normalized.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <i className="ri-arrow-left-s-line text-white text-2xl"></i>
            </button>
          )}

          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center gap-3 animate-scale-in-fast"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={normalized[activeIndex].src}
              alt={`${projectName} - Photo ${activeIndex + 1}`}
              className="max-w-full max-h-[78vh] object-contain rounded-lg"
            />
            {normalized[activeIndex].caption && (
              <span className="text-white/80 text-sm font-sans tracking-wide">
                {normalized[activeIndex].caption}
              </span>
            )}
          </div>

          {normalized.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <i className="ri-arrow-right-s-line text-white text-2xl"></i>
            </button>
          )}

          {normalized.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {normalized.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                    i === activeIndex
                      ? 'border-white opacity-100 scale-110'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}