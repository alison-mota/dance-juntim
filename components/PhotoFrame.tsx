import React from 'react';
import { CAROUSEL_HEIGHT } from './PhotoCarousel';

interface PhotoFrameProps {
  photo: string;
  color: string;
  rotation: number;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({ photo, color, rotation }) => {
  // Calcula o tamanho máximo considerando que a hipotenusa não deve ultrapassar 95% da altura do carrossel
  // Usa o CAROUSEL_HEIGHT fixo para calcular o tamanho dos frames
  // Para um quadrado: hipotenusa = lado × √2
  // Extrai o valor numérico do CAROUSEL_HEIGHT (ex: '24vh' → 24)
  const carouselHeightNum = parseFloat(CAROUSEL_HEIGHT) || 24;
  // Calcula 95% da altura do carrossel
  const frameHeightVh = carouselHeightNum * 0.95;
  // Divide por √2 para obter o lado do quadrado
  const frameSize = `calc(${frameHeightVh}vh / 1.414)`; // 95% da altura do carrossel dividido por √2 (≈ 1.414)
  const borderSize = '2px';
  
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center"
      style={{ 
        backgroundColor: color,
        width: frameSize,
        height: frameSize,
        padding: '4px',
        boxSizing: 'border-box',
        marginRight: borderSize,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div 
        className="w-full h-full overflow-hidden"
        style={{ 
          backgroundColor: color,
          border: `${borderSize} solid ${color}`,
        }}
      >
        <img
          src={photo}
          alt="Carousel photo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

