import { getAssetPath } from '../utils/paths';

// Lista de fotos do carrossel
// As fotos devem estar na pasta public/images/photos-carousel/
// O script de otimização gera automaticamente as versões otimizadas
export const carouselPhotos = [
  'DSC05164.jpg',
  'DSC05184.jpg',
  'DSC05201.jpg',
  'DSC05224.jpg',
  'DSC05248.jpg',
  'DSC05301.jpg',
  'DSC05314.jpg',
  'DSC05320.jpg',
  'DSC05332.jpg',
  'DSC05421.jpg',
  'DSC05447.jpg',
  'DSC05660.jpg',
  'DSC06011.jpg',
  'DSC06014.jpg',
  'DSC06022.jpg',
  'DSC06051.jpg',
  'DSC06104.jpg',
  'DSC06106.jpg',
  'DSC06132.jpg',
  'DSC06682.jpg',
  'DSC06710.jpg',
  'DSC06845.jpg',
];

// Função auxiliar para gerar os caminhos completos
// Usa getAssetPath para funcionar corretamente no GitHub Pages
// Agora usa a nova estrutura: images/photos-carousel/
export const getCarouselPhotoPaths = () => {
  return carouselPhotos.map(photo => getAssetPath(`images/photos-carousel/${photo}`));
};

