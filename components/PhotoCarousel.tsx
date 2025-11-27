import React from 'react';
import { PhotoFrame } from './PhotoFrame';
import { CAROUSEL_FRAME_COLORS } from '../constants/config';

// ===== VARIÁVEIS DE CONFIGURAÇÃO DO CARROSSEL =====
// Posicionamento do carrossel no eixo vertical (em relação ao bottom)
export const CAROUSEL_VERTICAL_POSITION = '0'; // '0' = bottom, valores positivos = acima do bottom

// Tamanho do carrossel (altura) no eixo vertical
export const CAROUSEL_HEIGHT = '24vh'; // Altura do carrossel (fixo e independente)

// Borda do carrossel em pixels
export const CAROUSEL_BORDER = '5px'; // Borda do carrossel em pixels

// Velocidade da animação (em segundos por ciclo completo)
export const CAROUSEL_ANIMATION_SPEED = 2.3; // Multiplicador: photos.length * animationSpeed = duração total
// ===================================================

interface PhotoCarouselProps {
  photos: string[];
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  // Duplica as fotos múltiplas vezes para criar loop infinito suave
  const duplicatedPhotos = [...photos, ...photos, ...photos];
  
  // Atribui cores de forma aleatória mas consistente para cada foto
  const getColorForPhoto = (index: number) => {
    const originalIndex = index % photos.length;
    return CAROUSEL_FRAME_COLORS[originalIndex % CAROUSEL_FRAME_COLORS.length];
  };

  // Gera rotação aleatória mas consistente para cada foto (entre 3 e 7 graus, horário ou anti-horário)
  const getRotationForPhoto = (index: number) => {
    const originalIndex = index % photos.length;
    // Usa o índice como seed para gerar um valor pseudo-aleatório
    const seed = originalIndex * 17 + 23;
    const randomValue = (seed % 100) / 100; // Valor entre 0 e 1
    const angle = 3 + (randomValue * 4); // Entre 3 e 7 graus
    const direction = (seed % 2 === 0) ? 1 : -1; // Alterna entre positivo e negativo
    return angle * direction;
  };

  // Para a animação, precisamos calcular a largura total
  // frameSize usa 95% da altura do carrossel (calculado via CSS no PhotoFrame)
  // Extrai o valor numérico do CAROUSEL_HEIGHT apenas para aproximação da animação
  const carouselHeightValue = parseFloat(CAROUSEL_HEIGHT) || 24; // Valor numérico em vh (apenas para cálculo)
  const frameHeightVh = carouselHeightValue * 0.95; // 95% da altura do carrossel
  const frameWidth = 'calc(95% / 1.414 + 2px)'; // Mesmo cálculo do PhotoFrame, mas com margin
  // Aproximação para cálculo da animação (assumindo 1vh ≈ 10px em viewport padrão)
  const frameWidthPx = (frameHeightVh * 10) / 1.414 + 2; // Aproximação em pixels
  const totalWidth = photos.length * frameWidthPx;

  return (
    <>
      <div 
        className="w-full overflow-hidden" 
        style={{ 
          height: '100%', 
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderTop: `${CAROUSEL_BORDER} solid rgba(0, 0, 0, 0.1)`,
          borderBottom: `${CAROUSEL_BORDER} solid rgba(0, 0, 0, 0.1)`,
          boxShadow: '0 -10px 20px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)',
          filter: 'drop-shadow(0 -5px 10px rgba(0, 0, 0, 0.15)) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.15))',
        }}
      >
        
        <div
          className="flex items-center"
          style={{
            animation: `scroll ${photos.length * CAROUSEL_ANIMATION_SPEED}s linear infinite`,
            width: `calc(${duplicatedPhotos.length} * ${frameWidth})`,
            willChange: 'transform',
            height: '100%',
          }}
        >
          {duplicatedPhotos.map((photo, index) => (
            <PhotoFrame
              key={`${photo}-${index}`}
              photo={photo}
              color={getColorForPhoto(index)}
              rotation={getRotationForPhoto(index)}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }
      `}</style>
    </>
  );
};

