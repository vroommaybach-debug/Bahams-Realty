import React from 'react';

interface BahamsLogoProps {
  variant?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}

/**
 * Curated Bahams Realty Brand Emblem + Wordmark.
 * Combines a modern architectural roofline crest with a subtle Yoruba Adire diamond
 * crown and precision "BR" monogram.
 */
export const BahamsLogo: React.FC<BahamsLogoProps> = ({
  variant = 'dark',
  showTagline = false,
  className = '',
}) => {
  const isLight = variant === 'light';

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Architectural Crest Icon */}
      <span className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0F5C4A] flex items-center justify-center shadow-xs border border-[#D4AF37]/40 shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className="w-6 h-6 sm:w-7 sm:h-7"
          aria-hidden="true"
        >
          {/* Adire Diamond Crown */}
          <path
            d="M32 8L36.5 12.5L32 17L27.5 12.5L32 8Z"
            stroke="#E8D399"
            strokeWidth="1.6"
            fill="#0B4638"
          />
          <circle cx="32" cy="12.5" r="1.4" fill="#E8D399" />

          {/* Architectural Roofline */}
          <path
            d="M12 28L32 15.5L52 28"
            stroke="#FAFAF8"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 25.5V49H46V25.5"
            stroke="#FAFAF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* B R Monogram */}
          <path
            d="M24.5 32V44M24.5 32H29C30.8 32 31.8 33 31.8 34.6C31.8 36 30.8 37.2 29 37.2H24.5M24.5 37.2H29.5C31.4 37.2 32.4 38.3 32.4 40.5C32.4 42.6 31.2 44 29 44H24.5"
            stroke="#E8D399"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.5 44V32H39.5C41.3 32 42.4 33.1 42.4 35C42.4 36.8 41.3 38 39.5 38H35.5M39 38L42.5 44"
            stroke="#FAFAF8"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Foundation Line */}
          <line
            x1="12"
            y1="53.5"
            x2="52"
            y2="53.5"
            stroke="#E8D399"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Brand Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className={`text-sm sm:text-lg font-extrabold tracking-[0.16em] uppercase transition-colors ${
            isLight
              ? 'text-[#FAFAF8] group-hover:text-emerald-300'
              : 'text-[#1A1A1A] group-hover:text-[#0F5C4A]'
          }`}
        >
          Bahams Realty
        </span>
        {showTagline && (
          <span
            className={`text-[9px] font-semibold tracking-[0.22em] uppercase mt-1 ${
              isLight ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Lagos · RC 1849204
          </span>
        )}
      </span>
    </span>
  );
};
