import React from 'react';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  googlePhotosUrl: string;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onClose, googlePhotosUrl }) => {
  if (!isOpen) return null;

  const days = ['Primeiro dia', 'Segundo dia', 'Primeiro baile', 'Segundo baile'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl border border-white/10 shadow-2xl w-full max-w-lg mx-4 p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm font-bold"
        >
          ✕
        </button>

        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
          Juntim 2025
        </h3>
        <p className="text-xs md:text-sm text-white/60 mb-4">
          Escolha um dia para abrir o álbum de fotos correspondente no Google Fotos.
        </p>

        <div className="space-y-3 mt-4">
          {days.map((label) => (
            <button
              key={label}
              onClick={() => window.open(googlePhotosUrl, '_blank', 'noopener,noreferrer')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-juntim-yellow text-left text-sm md:text-base text-white transition-all"
            >
              <span>{label}</span>
              <span className="text-juntim-yellow text-xs md:text-sm">&rarr;</span>
            </button>
          ))}
        </div>

        <p className="text-[0.7rem] text-white/40 mt-4">
          As fotos serão abertas em uma nova aba através da integração com Google Fotos.
        </p>
      </div>
    </div>
  );
};

