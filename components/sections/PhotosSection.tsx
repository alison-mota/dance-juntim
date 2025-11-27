import React from 'react';
import { EventCard } from '../EventCard';
import { PhotoModal } from '../modals/PhotoModal';

interface PhotosSectionProps {
  isPhotosModalOpen: boolean;
  onPhotosModalOpen: () => void;
  onPhotosModalClose: () => void;
  googlePhotosUrl: string;
}

export const PhotosSection: React.FC<PhotosSectionProps> = ({
  isPhotosModalOpen,
  onPhotosModalOpen,
  onPhotosModalClose,
  googlePhotosUrl,
}) => {
  return (
    <section id="photos" className="snap-section" style={{ backgroundColor: '#111827', position: 'relative', zIndex: 2 }}>
      <div className="container mx-auto px-6 h-full flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-[0.18em] uppercase bg-juntim-yellow/10 text-juntim-yellow border border-juntim-yellow/40 mb-4">
              JUNTOS EM MOVIMENTO
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Memórias Juntim
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl">
              Reviva os momentos do <span className="font-bold text-juntim-yellow">Juntim 2025</span>.
              Veja as fotos separadas por dias e bailes, em álbuns organizados no Google Fotos.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <EventCard
              title="Juntim 2025"
              subtitle="Festival & Imersão"
              description="Fotos oficiais do evento, divididas por Primeiro dia, Segundo dia, Primeiro baile e Segundo baile."
              badge="Evento"
              onClick={onPhotosModalOpen}
            />
          </div>
        </div>
      </div>

      <PhotoModal
        isOpen={isPhotosModalOpen}
        onClose={onPhotosModalClose}
        googlePhotosUrl={googlePhotosUrl}
      />
    </section>
  );
};

