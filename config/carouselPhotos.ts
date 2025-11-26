// Lista de fotos do carrossel
// Para adicionar novas fotos, adicione o nome do arquivo neste array
// As fotos devem estar na pasta public/photos-carousel/
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
];

// Função auxiliar para gerar os caminhos completos
export const getCarouselPhotoPaths = () => {
  return carouselPhotos.map(photo => `/photos-carousel/${photo}`);
};

