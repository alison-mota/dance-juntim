/**
 * Função helper para gerar caminhos corretos considerando o base path do Vite
 * Isso é importante para funcionar corretamente no GitHub Pages
 */
export const getAssetPath = (path: string): string => {
  // Remove a barra inicial se existir para evitar duplicação
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // import.meta.env.BASE_URL já vem com a barra final
  const base = import.meta.env.BASE_URL || '/';
  
  // Se o base já termina com /, não precisa adicionar outra
  return `${base}${cleanPath}`;
};

