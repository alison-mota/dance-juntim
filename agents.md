## Contexto Geral do Projeto

- **Nome do projeto**: `dance-juntim`
- **Objetivo**: Landing page/evento para o festival Juntim, com foco em divulgação, informações do evento e destaque visual para fotos e identidade visual.
- **Stack principal**:
  - React 19 + TypeScript
  - Vite 6 (bundler/dev server)
  - Tailwind CSS 4 (via `@tailwindcss/postcss`)

## Estrutura Principal

- **Entrada da aplicação**:
  - `index.html`: contém apenas o `<div id="root">` e o `<script type="module" src="/index.tsx">`.
  - `index.tsx`: monta o React (`ReactDOM.createRoot`) e importa `./index.css`.
- **Layout e páginas**:
  - `App.tsx`: componente raiz da SPA.
  - `pages/Landing.tsx`: página principal com seções horizontais (hero, sobre, fotos, contato).
  - `pages/Home.tsx`, `pages/Contact.tsx`, `pages/Services.tsx`: páginas adicionais.
- **Componentes importantes**:
  - `components/Navbar.tsx`: navegação fixa superior, controle de idioma, rolagem entre seções.
  - `components/PhotoCarousel.tsx` + `components/PhotoFrame.tsx`: carrossel de fotos fixo na parte inferior.
  - `components/EventCard.tsx`, `components/Button.tsx`, `components/Footer.tsx`.
- **Contextos**:
  - `contexts/LanguageContext.tsx`: gerenciamento de idioma (pt/en) e função `t()` de tradução.

## Estilos e Tailwind

- **Tailwind CSS 4**:
  - Configuração via `tailwind.config.js` (cores e fontes customizadas).
  - PostCSS configurado em `postcss.config.js` com:
    - `@tailwindcss/postcss`
    - `autoprefixer`
  - Arquivo principal de estilos: `index.css`, que:
    - Importa Tailwind: `@import "tailwindcss";`
    - Importa fontes do Google Fonts (`Montserrat`, `Open Sans`).
    - Define estilos globais para `html`, `body` e `#root`.
    - Define animações, scrollbar customizado e utilitários (`.snap-container`, `.snap-section`, `.button-organic`, etc.).

## Assets e Caminhos

- **Pasta pública**:
  - `public/images`: logos, fundos, banners (ex.: `logo-juntim.svg`, `fundo-home-fitas.svg`, `virada-de-lote.png`).
  - `public/photos-carousel`: fotos usadas no carrossel.
- **Helpers**:
  - `utils/paths.ts`:
    - Função `getAssetPath(path: string)` que usa `import.meta.env.BASE_URL` para montar URLs corretas em produção (especialmente em GitHub Pages).
  - `config/carouselPhotos.ts`:
    - Lista de arquivos de fotos e função `getCarouselPhotoPaths()` que usa `getAssetPath('photos-carousel/...')`.
- **Uso típico de imagens**:
  - Em JSX: `src={getAssetPath('images/logo-e-nome.svg')}`.
  - Em estilos inline: `backgroundImage: \`url(${getAssetPath('images/fundo-home-fitas.svg')})\``.

## Build, Deploy e Base Path

- **Scripts** (`package.json`):
  - `npm run dev` — desenvolvimento.
  - `npm run build` — build de produção.
  - `npm run preview` — pré-visualização do build.
- **Configuração Vite** (`vite.config.ts`):
  - Usa `defineConfig` com:
    - `plugins: [react()]`
    - `server`: porta 3000, host `0.0.0.0`.
    - `resolve.alias` para `@` apontando para a raiz.
    - `build`: `outDir = dist`, `assetsDir = assets`.
  - **Base path**:
    - Calculado como:
      - `const basePath = env.VITE_BASE_PATH || (mode === 'production' ? '/dance-juntim/' : '/');`
    - `base: basePath` garante que CSS/JS/imagens funcionem em subdiretórios (como GitHub Pages).
- **Variáveis de ambiente**:
  - `VITE_BASE_PATH` opcional para sobrescrever o base path (ex.: `/` para site raiz, `/dance-juntim/` para repositório de projeto).
  - Chaves de API (`GEMINI_API_KEY`) são lidas via `loadEnv` e injetadas em `process.env.*` se necessário.

## Considerações para Agentes Futuros

- **Ao mexer em caminhos de arquivos estáticos**:
  - Prefira sempre `getAssetPath()` em vez de caminhos absolutos iniciando com `/`.
- **Ao alterar layout horizontal/scroll**:
  - Cuidado com os estilos de `html`, `body`, `#root` e classes `.snap-container` / `.snap-section`.
- **Ao mexer na internacionalização**:
  - Use `useLanguage()` e a função `t()` para textos visíveis ao usuário.
- **Ao configurar deploy em outro host**:
  - Ajuste `VITE_BASE_PATH` conforme a URL final.
  - Verifique se o servidor está servindo corretamente `index.html` como fallback (SPA).
