import React from 'react';
import { getAssetPath } from '../../utils/paths';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  onTicketClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTicketClick }) => {
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        @keyframes pendulum {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .banner-float {
          animation: pendulum 3s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>
      <section
        id="hero"
        className="snap-section relative"
        style={{
          backgroundColor: '#FFFFFF',
          backgroundImage: `url(${getAssetPath('images/backgrounds/fundo-home-fitas.svg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        <div className="container mx-auto px-6 flex items-center relative" style={{ zIndex: 2, paddingTop: '80px', maxHeight: '90vh', minHeight: '90vh' }}>
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center md:items-start text-center md:text-left" style={{ transform: 'translateY(-45%)' }}>
              <div className="w-full max-w-[416px] md:max-w-[582px]">
                <img
                  src={getAssetPath('logos/logo-e-nome.svg')}
                  alt={t('hero.title')}
                  className="w-full"
                  style={{
                    filter: 'drop-shadow(0 0 2px white) drop-shadow(0 0 2px white) drop-shadow(0 0 4px white) drop-shadow(0 0 4px white)',
                  }}
                />
              </div>
            </div>

            <div className="w-full max-w-md md:ml-auto" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
              <button
                onClick={onTicketClick}
                className="w-full banner-float cursor-pointer"
              >
                <img
                  src={getAssetPath('images/marketing/virada-de-lote.png')}
                  alt="Virada de lote - garanta seu ingresso"
                  className="w-full rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] border-4 border-white/20 object-cover hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300"
                  style={{ maxHeight: '70vh' }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

