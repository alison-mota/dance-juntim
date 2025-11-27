import React, { useState } from 'react';
import { PhotoCarousel, CAROUSEL_HEIGHT, CAROUSEL_VERTICAL_POSITION } from '../components/PhotoCarousel';
import { getCarouselPhotoPaths } from '../config/carouselPhotos';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { PhotosSection } from '../components/sections/PhotosSection';
import { ContactSection } from '../components/sections/ContactSection';
import { TicketModal } from '../components/modals/TicketModal';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { GOOGLE_PHOTOS_URL } from '../constants/config';

export const Landing: React.FC = () => {
  const containerRef = useHorizontalScroll();
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <>
      <div ref={containerRef} className="snap-container">
        <HeroSection onTicketClick={() => setIsTicketModalOpen(true)} />
        <AboutSection />
        <PhotosSection
          isPhotosModalOpen={isPhotosModalOpen}
          onPhotosModalOpen={() => setIsPhotosModalOpen(true)}
          onPhotosModalClose={() => setIsPhotosModalOpen(false)}
          googlePhotosUrl={GOOGLE_PHOTOS_URL}
        />
        <ContactSection />

        {/* Carrossel de Fotos - fixo e sobrepondo tudo */}
        <div className="fixed left-0 w-full" style={{ height: CAROUSEL_HEIGHT, bottom: CAROUSEL_VERTICAL_POSITION, zIndex: 9999, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <PhotoCarousel photos={getCarouselPhotoPaths()} />
          </div>
        </div>
      </div>

      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
    </>
  );
};

