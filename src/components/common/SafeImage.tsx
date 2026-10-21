import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

/**
 * Resilient image component enforcing Zero-Broken-Image Policy.
 * If an image fails to load or is offline, it cleanly renders a styled
 * architectural fallback container rather than an unstyled broken frame.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Bahams Realty Property',
  className = '',
  containerClassName = '',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#F0EFEB] ${containerClassName}`}>
      {!hasError && src ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
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
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-600">
          <Building2 className="w-10 h-10 mb-2 text-[#0F5C4A]/60" />
          <span className="text-xs font-medium tracking-wide uppercase text-neutral-500">
            {fallbackTitle || 'Bahams Realty'}
          </span>
          <span className="text-[11px] text-neutral-400 mt-0.5">Verified Lagos Listing</span>
        </div>
      )}
    </div>
  );
};
