/**
 * Script pré-build que executa otimização de imagens apenas em produção
 * Este script é executado automaticamente antes do build de produção via hook 'prebuild'
 */
import { ImageOptimizer } from './optimizeImages';

// Detecta se está em produção
// CI pode ser 'true' (string) ou true (boolean) no GitHub Actions
// NODE_ENV=production também pode ser definido manualmente
const isProduction = 
  process.env.NODE_ENV === 'production' || 
  process.env.CI === 'true' || 
  process.env.CI === true;

console.log(`🔍 Ambiente detectado: ${isProduction ? 'PRODUÇÃO' : 'DESENVOLVIMENTO'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`   CI: ${process.env.CI || 'undefined'} (tipo: ${typeof process.env.CI})`);
console.log(`   Resultado: ${isProduction ? '✅ PRODUÇÃO' : 'ℹ️  DESENVOLVIMENTO'}\n`);

async function runPrebuild() {
  try {
    if (isProduction) {
      console.log('🚀 Modo PRODUÇÃO detectado - Executando otimização de imagens...\n');
      
      const optimizer = new ImageOptimizer();
      
      try {
        await optimizer.optimizeAll(true);
        console.log('\n✅ Otimização de imagens concluída com sucesso!\n');
      } catch (error) {
        console.error('\n❌ Erro na otimização de imagens:', error);
        process.exit(1);
      }
    } else {
      console.log('ℹ️  Modo DESENVOLVIMENTO - Pulando otimização de imagens.\n');
      console.log('   (Para forçar otimização, use: npm run optimize:images:production)\n');
    }
  } catch (error) {
    console.error('❌ Erro fatal no prebuild:', error);
    // Se não for produção, permite continuar
    if (isProduction) {
      process.exit(1);
    } else {
      console.warn('⚠️  Continuando build mesmo com erro no prebuild (modo desenvolvimento)');
    }
  }
}

runPrebuild().catch((error) => {
  console.error('❌ Erro fatal no prebuild:', error);
  process.exit(1);
});

