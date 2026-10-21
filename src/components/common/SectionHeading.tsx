import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`space-y-2.5 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {kicker && (
        <span className="block text-xs font-semibold tracking-widest uppercase text-[#0F5C4A]">
          {kicker}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1A1A1A] [text-wrap:balance]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl [text-wrap:balance]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
