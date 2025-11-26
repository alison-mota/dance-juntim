import React from 'react';

interface EventCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  description,
  badge,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-md text-left rounded-3xl bg-gradient-to-br from-juntim-dark to-black/90 border border-white/10 shadow-2xl p-6 md:p-8 hover:border-juntim-yellow hover:shadow-[0_0_40px_rgba(252,211,77,0.35)] transition-all group"
    >
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-[0.18em] uppercase bg-juntim-yellow/10 text-juntim-yellow border border-juntim-yellow/40 mb-4">
          {badge}
        </span>
      )}
      <h3 className="text-2xl md:text-3xl font-black text-white mb-1 group-hover:text-juntim-yellow transition-colors">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs md:text-sm text-white/70 uppercase tracking-[0.2em] mb-4">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-sm md:text-base text-white/70 mb-6">
          {description}
        </p>
      )}
      <div className="flex items-center justify-between text-xs md:text-sm font-semibold text-juntim-yellow">
        <span>Ver dias e álbuns</span>
        <span className="group-hover:translate-x-1 transition-transform">
          &rarr;
        </span>
      </div>
    </button>
  );
}


