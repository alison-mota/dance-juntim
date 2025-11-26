import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path para GitHub Pages - pode ser configurado via variável de ambiente
    // Se VITE_BASE_PATH não estiver definido, tenta detectar automaticamente
    // Para repositório dance-juntim, usar '/dance-juntim/'
    // Para site principal, usar '/'
    const basePath = env.VITE_BASE_PATH || (mode === 'production' ? '/dance-juntim/' : '/');
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: undefined,
          }
        }
      },
      base: basePath,
      publicDir: 'public',
    };
});
