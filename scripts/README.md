# Scripts de Otimização

## Otimização de Imagens do Carrossel

O script `optimizeImages.ts` otimiza automaticamente todas as imagens da pasta `public/images/photos-carousel-to-optimize` e salva as versões otimizadas em `public/images/photos-carousel`.

### Como usar:

#### Manualmente:
```bash
npm run optimize:images
```

#### Em Produção (automático):
A otimização é executada automaticamente antes do build de produção através do hook `prebuild`:

```bash
npm run build
```

O script detecta automaticamente se está em produção através das variáveis de ambiente:
- `NODE_ENV === 'production'`
- `CI === 'true'` (definido automaticamente no GitHub Actions)

### O que o script faz:

#### Em qualquer ambiente:
- ✅ Redimensiona imagens (redução de 70% nas dimensões)
- ✅ Converte para JPEG otimizado com qualidade 70%
- ✅ Usa compressão mozjpeg avançada
- ✅ Gera JPEG progressivo
- ✅ Mostra estatísticas de redução

#### **Somente em PRODUÇÃO:**
- ✅ **Valida** que todas as imagens foram otimizadas com sucesso
- ✅ **Remove** as imagens originais da pasta `photos-carousel-to-optimize` após validação
- ✅ **Falha o build** se alguma imagem não foi otimizada corretamente

### Pipeline de Produção:

1. **GitHub Actions / CI detecta push para `main`**
2. **`npm run build` é executado**
3. **Hook `prebuild` executa automaticamente:**
   - Detecta ambiente de produção (`CI=true`)
   - Otimiza todas as imagens
   - Valida que todas foram processadas
   - Remove imagens originais após validação bem-sucedida
   - Se validação falhar, build é abortado
4. **Build do Vite continua normalmente**

### Formato de saída:

Todas as imagens serão convertidas para `.jpg` otimizado, independente do formato original.

### Exemplo de saída em produção:

```
🚀 Modo PRODUÇÃO detectado - Executando otimização de imagens...

🖼️  Iniciando otimização de imagens...
📁 Origem: .../public/images/photos-carousel-to-optimize
📁 Destino: .../public/images/photos-carousel

📸 Encontradas 21 imagem(ns) para otimizar:

✓ DSC05164.jpg
  Dimensões: 4000x3000 → 1200x900 (70% redução)
  Tamanho: 4.5 MB → 180.15 KB (96.0% redução de arquivo)

📊 Estatísticas:
   Tamanho original: 94.5 MB
   Tamanho otimizado: 3.78 MB
   Redução total: 96.0%

🔍 Validando otimizações...
✓ DSC05164.jpg - OK
✓ DSC05184.jpg - OK
...

✅ Todas as 21 imagem(ns) foram validadas com sucesso!

🗑️  Removendo imagens originais...
✓ Removido: DSC05164.jpg
✓ Removido: DSC05184.jpg
...

📊 Limpeza concluída:
   ✅ Removidas: 21
   ⚠️  Erros: 0

✅ Otimização concluída! 21 imagem(ns) processada(s).
```

### Exemplo de saída em desenvolvimento:

```
ℹ️  Modo DESENVOLVIMENTO - Pulando otimização de imagens.
```

As imagens originais são mantidas em desenvolvimento para facilitar testes locais.

### Segurança:

- ✅ Build falha se validação não passar
- ✅ Imagens originais só são removidas após validação bem-sucedida
- ✅ Logs detalhados de todo o processo
- ✅ Tratamento de erros robusto
