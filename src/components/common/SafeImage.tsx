import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import {
  normalizeExternalImageUrl,
  buildProxyFallbackImageUrl,
} from '../../utils/imageUpload.ts';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

/**
 * Resilient image component enforcing Zero-Broken-Image Policy and Universal Link Support.
 * Automatically normalizes Google Drive, Pinterest, Dropbox, Imgur, and external web links,
 * and falls back to an optimized global CDN proxy if direct browser loading is blocked.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Bahams Realty Property',
  className = '',
  containerClassName = '',
  fallbackTitle,
  ...props
}) => {
  const normalizedInitialSrc = normalizeExternalImageUrl(src || '');
  const [activeSrc, setActiveSrc] = useState<string>(normalizedInitialSrc);
  const [triedProxy, setTriedProxy] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const nextNormalized = normalizeExternalImageUrl(src || '');
    setActiveSrc(nextNormalized);
    setTriedProxy(false);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleImageError = () => {
    if (!triedProxy && activeSrc) {
      const proxyUrl = buildProxyFallbackImageUrl(activeSrc);
      if (proxyUrl && proxyUrl !== activeSrc) {
        setTriedProxy(true);
        setActiveSrc(proxyUrl);
        return;
      }
    }
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-[#F0EFEB] ${containerClassName}`}>
      {!hasError && activeSrc ? (
        <>
          <img
            src={activeSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
              <Building2 className="w-8 h-8 text-neutral-400 opacity-50" />
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-linear-to-br from-neutral-100 to-neutral-200 text-neutral-600">
          <Building2 className="w-10 h-10 mb-2 text-[#0F5C4A]/60" />
          <span className="text-xs font-medium tracking-wide uppercase text-neutral-500 text-center line-clamp-1">
            {fallbackTitle || 'Bahams Realty'}
          </span>
          <span className="text-[11px] text-neutral-400 mt-0.5">Verified Lagos Listing</span>
        </div>
      )}
    </div>
  );
};
