import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from '../common/SafeImage.tsx';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  title?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onSelectIndex,
  title,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white pb-3">
        <div>
          {title && <h3 className="text-sm font-semibold truncate max-w-md">{title}</h3>}
          <span className="text-xs text-neutral-400">
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close image lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Frame with Prev/Next Controls */}
      <div className="relative flex-1 flex items-center justify-center max-h-[75vh]">
        <SafeImage
          src={images[currentIndex]}
          alt={title ? `${title} photo ${currentIndex + 1}` : 'Property photo'}
          containerClassName="w-full h-full max-w-5xl rounded-lg"
          className="object-contain max-h-[75vh]"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onSelectIndex((currentIndex - 1 + images.length) % images.length)}
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => onSelectIndex((currentIndex + 1) % images.length)}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails strip */}
      <div className="pt-4 flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={img + idx}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all shrink-0 ${
              currentIndex === idx
                ? 'border-white scale-105 opacity-100'
                : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <SafeImage
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              containerClassName="w-full h-full"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
