import React from 'react';

interface AfrocentricDividerProps {
  className?: string;
  variant?: 'emerald' | 'gold' | 'subtle';
}

/**
 * Subtle Yoruba Adire & Aso-Oke inspired geometric architectural border motif.
 * Adds authentic Nigerian/Afrocentric visual heritage while maintaining clean luxury restraint.
 */
export const AfrocentricDivider: React.FC<AfrocentricDividerProps> = ({
  className = '',
  variant = 'subtle',
}) => {
  const strokeColor =
    variant === 'emerald'
      ? '#0F5C4A'
      : variant === 'gold'
      ? '#C59B27'
      : '#D4D4CE';

  return (
    <div
      className={`w-full overflow-hidden flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-7xl h-4 sm:h-5 opacity-75"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="12" x2="460" y2="12" stroke={strokeColor} strokeWidth="1" />
        {/* Center Adire Diamond & Chevron Weave */}
        <g stroke={strokeColor} strokeWidth="1.5">
          <path d="M475 12L487 4L499 12L487 20L475 12Z" />
          <path d="M505 6L513 12L505 18" />
          <path d="M518 6L526 12L518 18" />
          <path d="M535 12L547 4L559 12L547 20L535 12Z" />
          <circle cx="547" cy="12" r="2" fill={strokeColor} />
          <path d="M568 12L582 3L596 12L582 21L568 12Z" />
          <path d="M575 12L582 7L589 12L582 17L575 12Z" />
          {/* Center Point */}
          <path d="M600 2L610 12L600 22L590 12L600 2Z" fill={strokeColor} fillOpacity="0.15" />
          <circle cx="600" cy="12" r="2.5" fill={strokeColor} />
          <path d="M604 12L618 3L632 12L618 21L604 12Z" />
          <path d="M611 12L618 7L625 12L618 17L611 12Z" />
          <path d="M641 12L653 4L665 12L653 20L641 12Z" />
          <circle cx="653" cy="12" r="2" fill={strokeColor} />
          <path d="M682 6L674 12L682 18" />
          <path d="M695 6L687 12L695 18" />
          <path d="M701 12L713 4L725 12L713 20L701 12Z" />
        </g>
        <line x1="740" y1="12" x2="1200" y2="12" stroke={strokeColor} strokeWidth="1" />
      </svg>
    </div>
  );
};

/**
 * Subtle background SVG watermark pattern inspired by Nigerian Adire geometric textiles.
 */
export const AfrocentricWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05] ${className}`}
    aria-hidden="true"
  >
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="adire-geometric-pattern"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M32 4 L60 32 L32 60 L4 32 Z M32 16 L48 32 L32 48 L16 32 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
          <path
            d="M0 0 L12 12 M64 0 L52 12 M0 64 L12 52 M64 64 L52 52"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#adire-geometric-pattern)" />
    </svg>
  </div>
);
