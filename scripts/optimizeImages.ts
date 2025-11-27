import sharp from 'sharp';
import { readdir, mkdir, stat, unlink, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { constants } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Otimizador de imagens para o carrossel
 * 
 * Pega imagens da pasta public/images/photos-carousel-to-optimize,
 * otimiza para reduzir tamanho mantendo qualidade visual,
 * e salva em public/images/photos-carousel
 */
export class ImageOptimizer {
  private readonly sourceDir: string;
  private readonly outputDir: string;
  private readonly supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

  constructor() {
    // Caminhos relativos à raiz do projeto
    this.sourceDir = join(__dirname, '../public/images/photos-carousel-to-optimize');
    this.outputDir = join(__dirname, '../public/images/photos-carousel');
  }

  /**
   * Verifica se o arquivo é uma imagem suportada
   */
  private isSupportedImage(filename: string): boolean {
    const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
    return this.supportedFormats.includes(ext);
  }

  /**
   * Obtém tamanho do arquivo em formato legível
   */
  private async getFileSize(filePath: string): Promise<string> {
    const stats = await stat(filePath);
    const sizeInBytes = stats.size;
    
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  }

  /**
   * Otimiza uma única imagem
   */
  private async optimizeImage(inputPath: string, outputPath: string): Promise<void> {
    try {
      const originalSize = await this.getFileSize(inputPath);
      
      // Lê a imagem original para obter suas dimensões
      const metadata = await sharp(inputPath).metadata();
      const originalWidth = metadata.width || 1920;
      const originalHeight = metadata.height || 1080;

      // Aplica redução total de 70% nas dimensões (mantém 30% do tamanho original)
      // Redução inicial de 60% + redução adicional de 25% = 70% total
      // Para otimização agressiva de tamanho de arquivo
      const reductionFactor = 0.3; // Mantém 30% = reduz 70% (60% + 25% adicional)
      
      // Calcula dimensões finais com redução total de 70%
      let targetWidth = Math.round(originalWidth * reductionFactor);
      let targetHeight = Math.round(originalHeight * reductionFactor);
      
      // Define tamanho máximo absoluto para evitar imagens muito grandes
      // mesmo após a redução (ajustado para as novas dimensões reduzidas)
      const maxWidth = 576; // Reduzido proporcionalmente (768 * 0.75)
      const maxHeight = 576;
      
      // Se ainda exceder o máximo, reduz proporcionalmente
      if (targetWidth > maxWidth || targetHeight > maxHeight) {
        const ratio = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
        targetWidth = Math.round(targetWidth * ratio);
        targetHeight = Math.round(targetHeight * ratio);
      }

      // Determina o formato de saída
      const outputExt = outputPath.toLowerCase().split('.').pop();
      
      // Pipeline de otimização base
      let pipeline = sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });

      // Aplica otimização baseada no formato de saída
      if (outputExt === 'jpg' || outputExt === 'jpeg') {
        pipeline = pipeline.jpeg({
          quality: 70, // Qualidade reduzida para diminuir tamanho do arquivo
          progressive: true, // JPEG progressivo para melhor carregamento
          mozjpeg: true, // Usa mozjpeg para melhor compressão
          optimizeScans: true, // Otimiza scans para compressão adicional
        });
      } else {
        // Para outros formatos, mantém o original com otimizações
        pipeline = pipeline.toFormat(outputExt as any);
      }

      await pipeline.toFile(outputPath);

      const optimizedSize = await this.getFileSize(outputPath);
      
      // Calcula redução de tamanho
      const originalBytes = (await stat(inputPath)).size;
      const optimizedBytes = (await stat(outputPath)).size;
      const reduction = originalBytes > 0 
        ? ((originalBytes - optimizedBytes) / originalBytes * 100).toFixed(1)
        : '0';

      const fileName = inputPath.split(/[/\\]/).pop() || '';
      console.log(`✓ ${fileName}`);
      console.log(`  Dimensões: ${originalWidth}x${originalHeight} → ${targetWidth}x${targetHeight} (70% redução)`);
      console.log(`  Tamanho: ${originalSize} → ${optimizedSize} (${reduction}% redução de arquivo)`);
    } catch (error) {
      console.error(`✗ Erro ao otimizar ${inputPath}:`, error);
      throw error;
    }
  }

  /**
   * Garante que o diretório de saída existe
   */
  private async ensureOutputDir(): Promise<void> {
    try {
      await mkdir(this.outputDir, { recursive: true });
      console.log(`✓ Diretório de saída verificado: ${this.outputDir}`);
    } catch (error) {
      console.error('✗ Erro ao criar diretório de saída:', error);
      throw error;
    }
  }

  /**
   * Valida se todas as imagens foram otimizadas com sucesso
   */
  private async validateOptimization(imageFiles: string[]): Promise<boolean> {
    console.log('\n🔍 Validando otimizações...\n');
    
    let allValid = true;
    const missingImages: string[] = [];

    for (const file of imageFiles) {
      const outputFileName = file.replace(/\.(png|webp|jpeg)$/i, '.jpg');
      const outputPath = join(this.outputDir, outputFileName);

      try {
        await access(outputPath, constants.F_OK);
        console.log(`✓ ${outputFileName} - OK`);
      } catch {
        console.error(`✗ ${outputFileName} - NÃO ENCONTRADO`);
        missingImages.push(outputFileName);
        allValid = false;
      }
    }

    if (!allValid) {
      console.error(`\n❌ Validação falhou! ${missingImages.length} imagem(ns) não foram otimizadas:`);
      missingImages.forEach(img => console.error(`   - ${img}`));
      return false;
    }

    console.log(`\n✅ Todas as ${imageFiles.length} imagem(ns) foram validadas com sucesso!\n`);
    return true;
  }

  /**
   * Remove as imagens originais após validação bem-sucedida
   */
  private async removeOriginalImages(imageFiles: string[]): Promise<void> {
    console.log('🗑️  Removendo imagens originais...\n');

    let removedCount = 0;
    let errorCount = 0;

    for (const file of imageFiles) {
      const inputPath = join(this.sourceDir, file);
      
      try {
        await unlink(inputPath);
        console.log(`✓ Removido: ${file}`);
        removedCount++;
      } catch (error) {
        console.error(`✗ Erro ao remover ${file}:`, error);
        errorCount++;
      }
    }

    console.log(`\n📊 Limpeza concluída:`);
    console.log(`   ✅ Removidas: ${removedCount}`);
    if (errorCount > 0) {
      console.log(`   ⚠️  Erros: ${errorCount}`);
    }
  }

  /**
   * Processa todas as imagens
   */
  async optimizeAll(production: boolean = false): Promise<void> {
    try {
      if (production) {
        console.log('\n🚀 Modo PRODUÇÃO ativado - Otimização completa será executada\n');
      }

      console.log('\n🖼️  Iniciando otimização de imagens...\n');
      console.log(`📁 Origem: ${this.sourceDir}`);
      console.log(`📁 Destino: ${this.outputDir}\n`);

      // Garante que o diretório de saída existe
      await this.ensureOutputDir();

      // Verifica se o diretório de origem existe
      try {
        await access(this.sourceDir, constants.F_OK);
      } catch {
        console.log(`⚠️  Diretório de origem não encontrado: ${this.sourceDir}`);
        console.log('ℹ️  Pulando otimização de imagens (pasta não existe).');
        return;
      }

      // Lê todos os arquivos da pasta de origem
      const files = await readdir(this.sourceDir);
      const imageFiles = files.filter(file => this.isSupportedImage(file));

      if (imageFiles.length === 0) {
        console.log('⚠️  Nenhuma imagem encontrada para otimizar na pasta de origem.');
        if (production) {
          console.log('ℹ️  Isso pode ser normal se as imagens já foram otimizadas anteriormente.');
          console.log('✅ Continuando build normalmente.');
        } else {
          console.log('ℹ️  Isso é normal em desenvolvimento se as imagens já foram otimizadas.');
        }
        return;
      }

      console.log(`📸 Encontradas ${imageFiles.length} imagem(ns) para otimizar:\n`);

      // Processa cada imagem
      let totalOriginalSize = 0;
      let totalOptimizedSize = 0;
      const processedImages: string[] = [];

      for (const file of imageFiles) {
        const inputPath = join(this.sourceDir, file);
        // Converte tudo para JPG otimizado
        const outputFileName = file.replace(/\.(png|webp|jpeg)$/i, '.jpg');
        const outputPath = join(this.outputDir, outputFileName);
        
        const originalBytes = (await stat(inputPath)).size;
        totalOriginalSize += originalBytes;
        
        await this.optimizeImage(inputPath, outputPath);
        
        const optimizedBytes = (await stat(outputPath)).size;
        totalOptimizedSize += optimizedBytes;
        processedImages.push(file);
      }

      // Mostra estatísticas finais
      const totalReduction = totalOriginalSize > 0 
        ? ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)
        : '0';
      
      const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
      };

      console.log(`\n📊 Estatísticas:`);
      console.log(`   Tamanho original: ${formatBytes(totalOriginalSize)}`);
      console.log(`   Tamanho otimizado: ${formatBytes(totalOptimizedSize)}`);
      console.log(`   Redução total: ${totalReduction}%`);

      // Em produção: valida e remove originais (apenas se houver imagens processadas)
      if (production && processedImages.length > 0) {
        // Valida que todas foram otimizadas
        const isValid = await this.validateOptimization(processedImages);
        
        if (!isValid) {
          console.error('\n❌ Validação falhou! Abortando limpeza de arquivos originais.');
          process.exit(1);
        }

        // Remove as imagens originais após validação bem-sucedida
        await this.removeOriginalImages(processedImages);
      } else if (production && processedImages.length === 0) {
        console.log('ℹ️  Nenhuma imagem foi processada. Isso pode ser normal se as imagens já foram otimizadas anteriormente.');
      }

      console.log(`\n✅ Otimização concluída! ${processedImages.length} imagem(ns) processada(s).\n`);
    } catch (error) {
      console.error('\n❌ Erro durante a otimização:', error);
      process.exit(1);
    }
  }
}

// Executa a otimização apenas se o script for chamado diretamente (não quando importado)
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || 
    process.argv[1]?.includes('optimizeImages.ts')) {
  const optimizer = new ImageOptimizer();
  // Verifica se está em produção via variável de ambiente
  const isProduction = process.env.NODE_ENV === 'production' || process.env.CI === 'true';
  optimizer.optimizeAll(isProduction).catch((error) => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
}

