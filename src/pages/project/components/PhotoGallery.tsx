
import { useState, useEffect, useCallback } from 'react';

interface PhotoGalleryProps {
  images: string[];
  projectName: string;
}

/**
 * PhotoGallery component renders a responsive image grid with a lightbox.
 * It includes robust handling for edge‑cases (empty list, invalid indexes) and
 * safe class‑name generation to avoid template‑literal syntax errors.
 */
export default function PhotoGallery({ images, projectName }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /** Open the lightbox at a given index */
  const openLightbox = (index: number) => {
    if (!images || index < 0 || index >= images.length) return; // guard
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  /** Close the lightbox */
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  /** Navigate to next image (wrap‑around) */
  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  /** Navigate to previous image (wrap‑around) */
  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  /** Keyboard navigation */
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

  // Guard against missing/empty image array
  if (!images || images.length === 0) return null;

  /**
   * Generate the grid layout based on the number of images.
   * The function is deliberately kept small to avoid JSX parsing errors.
   */
  const getGridLayout = () => {
    const count = images.length;

    // ---------- 1 image ----------
    if (count === 1) {
      return (
        <div
          className="w-full h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt={`${projectName} - Photo 1`}
            title={`${projectName} gallery photo`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
        </div>
      );
    }

    // ---------- 2 images ----------
    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-[420px] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <img
                src={img}
                alt={`${projectName} - Photo ${i + 1}`}
                title={`${projectName} gallery photo`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      );
    }

    // ---------- 3 images ----------
    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div
            className="relative w-full h-[500px] rounded-2xl overflow-hidden cursor-pointer group row-span-2"
            onClick={() => openLightbox(0)}
          >
            <img
              src={images[0]}
              alt={`${projectName} - Photo 1`}
              title={`${projectName} gallery photo`}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div className="flex flex-col gap-4">
            {images.slice(1).map((img, i) => (
              <div
                key={i}
                className="relative w-full h-[242px] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={img}
                  alt={`${projectName} - Photo ${i + 2}`}
                  title={`${projectName} gallery photo`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ---------- 4+ images ----------
    // Determine grid columns for the thumbnail strip safely.
    const remaining = count - 1; // images after the featured one
    const gridColsClass =
      remaining >= 4
        ? 'grid-cols-4'
        : remaining > 0
        ? `grid-cols-${remaining}`
        : '';

    return (
      <div className="space-y-4">
        {/* Featured large image */}
        <div
          className="relative w-full h-[480px] rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt={`${projectName} - Photo 1`}
            title={`${projectName} gallery photo`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Grid of remaining images */}
        <div className={`grid gap-4 ${gridColsClass}`}>
          {images.slice(1).map((img, i) => {
            const isLastVisible =
              i === remaining - 1 && count > 5; // show overlay on the last thumb when more exist
            return (
              <div
                key={i}
                className="relative w-full h-[200px] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={img}
                  alt={`${projectName} - Photo ${i + 2}`}
                  title={`${projectName} gallery photo`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
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
      {/* Gallery Grid */}
      <section className="py-16 px-6 lg:px-16 bg-hulma-ghost">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-light text-hulma-green">
              Project Gallery
            </h2>
            <span className="text-sm text-hulma-brown/50 font-sans">
              {images.length} {images.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>
          {getGridLayout()}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <i className="ri-close-line text-white text-xl"></i>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/60 text-sm font-sans z-10">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Previous Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <i className="ri-arrow-left-s-line text-white text-2xl"></i>
            </button>
          )}

          {/* Main Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex]}
              alt={`${projectName} - Photo ${activeIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <i className="ri-arrow-right-s-line text-white text-2xl"></i>
            </button>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                    i === activeIndex
                      ? 'border-white opacity-100 scale-110'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
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
