import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../components/Button';
import { Music, Heart, Zap, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { EventCard } from '../components/EventCard';
import { PhotoCarousel, CAROUSEL_HEIGHT, CAROUSEL_VERTICAL_POSITION } from '../components/PhotoCarousel';
import { getCarouselPhotoPaths } from '../config/carouselPhotos';

export const Landing: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const googlePhotosUrl =
    'https://photos.google.com/share/AF1QipOx2naO2Q0fdu-EjIvjnPDn6X0Tmud9g2kTfKraVEymxzfMUrA0Nki_uosdlB3_7w?key=U3M5OEswWXlvZVk1VTJ1UmhjTkwzNG9MNGEyN2Jn';

  useEffect(() => {
    let container: HTMLDivElement | null = null;
    let handleWheel: ((e: WheelEvent) => void) | null = null;

    const setupListeners = () => {
      // Tenta encontrar o container de várias formas
      container = containerRef.current || document.querySelector('.snap-container') as HTMLDivElement;
      
      if (!container) {
        // Se ainda não existe, tenta novamente
        setTimeout(setupListeners, 50);
        return;
      }

      handleWheel = (e: WheelEvent) => {
        // Só processa se não for um elemento interativo (input, textarea, etc)
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
          return; // Permite scroll normal em campos de texto
        }

        // Previne o scroll vertical padrão
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Converte scroll vertical em horizontal
        const scrollContainer = containerRef.current || document.querySelector('.snap-container') as HTMLDivElement;
        
        if (!scrollContainer) {
          return;
        }
        
        // Força overflow-x: scroll via style inline
        scrollContainer.style.overflowX = 'scroll';
        scrollContainer.style.overflowY = 'hidden';
        
        const scrollAmount = e.deltaY;
        const currentScroll = scrollContainer.scrollLeft;
        const maxScroll = Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
        const newScroll = Math.max(0, Math.min(currentScroll + scrollAmount, maxScroll));
        
        // Aplica o scroll
        scrollContainer.scrollLeft = newScroll;
        scrollContainer.scrollTo({ left: newScroll, behavior: 'auto' });
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'auto' });
        
        // Força reflow
        void scrollContainer.offsetHeight;
      };

      // Adiciona listener no container
      container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      
      // Adiciona no window para capturar todos os eventos
      window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      
      // Adiciona no document também
      document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    };

    // Inicia a configuração
    setupListeners();

    return () => {
      if (container && handleWheel) {
        container.removeEventListener('wheel', handleWheel, { capture: true });
        window.removeEventListener('wheel', handleWheel, { capture: true });
        document.removeEventListener('wheel', handleWheel, { capture: true });
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes pendulum {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        .banner-float {
          animation: pendulum 3s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>
      <div 
        ref={containerRef}
        className="snap-container"
      >
      {/* SEÇÃO 1: HERO */}
      <section
        id="hero"
        className="snap-section relative"
        style={{
          backgroundColor: '#FFFFFF',
          backgroundImage: 'url(/images/fundo-home-fitas.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        <div className="container mx-auto px-6 flex items-center relative" style={{ zIndex: 2, paddingTop: '80px', maxHeight: '90vh', minHeight: '90vh' }}>
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* Bloco esquerdo: apenas logo */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left" style={{ transform: 'translateY(-45%)' }}>
              <div className="w-full max-w-[416px] md:max-w-[582px]">
                <img
                  src="/images/logo-e-nome.svg"
                  alt={t('hero.title')}
                  className="w-full"
                  style={{
                    filter: 'drop-shadow(0 0 2px white) drop-shadow(0 0 2px white) drop-shadow(0 0 4px white) drop-shadow(0 0 4px white)',
                  }}
                />
              </div>
            </div>

            {/* Bloco direito: banner de marketing */}
            <div className="w-full max-w-md md:ml-auto" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="w-full banner-float cursor-pointer"
              >
                <img
                  src="/images/virada-de-lote.png"
                  alt="Virada de lote - garanta seu ingresso"
                  className="w-full rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] border-4 border-white/20 object-cover hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300"
                  style={{ maxHeight: '70vh' }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: QUEM SOMOS */}
      <section id="about" className="snap-section" style={{ backgroundColor: '#82251C', position: 'relative', zIndex: 2 }}>
        <div className="container mx-auto px-6 h-full flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-20">
            {/* Bloco esquerdo: Título */}
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Juntim é bem<br />
                <span className="text-white">MELHOR!</span>
              </h1>
            </div>

            {/* Bloco direito: Conteúdo */}
            <div className="text-white text-lg md:text-xl leading-relaxed">
              <p>
                O Festival Juntim é uma marca que <strong>conecta.</strong> Um lugar para <strong>troca</strong> cultural, onde
                o forró e o zouk se <strong>unificam</strong> para
                proporcionar uma incrível experiência
                dançante. Através da marca as pessoas se
                sentem <strong>acolhidas</strong> como um <strong>abraço.</strong> Aqui o
                forró e o zouk andam <strong>JUNTOS</strong>, lado a lado
                para proporcionar aos participantes o que
                de melhor a <strong>dança</strong> pode oferecer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: FOTOS / EVENTOS */}
      <section id="photos" className="snap-section" style={{ backgroundColor: '#111827', position: 'relative', zIndex: 2 }}>
        <div className="container mx-auto px-6 h-full flex items-center justify-center">
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-[0.18em] uppercase bg-juntim-yellow/10 text-juntim-yellow border border-juntim-yellow/40 mb-4">
                JUNTOS EM MOVIMENTO
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Memórias Juntim
              </h2>
              <p className="text-white/70 text-sm md:text-base max-w-xl">
                Reviva os momentos do <span className="font-bold text-juntim-yellow">Juntim 2025</span>.
                Veja as fotos separadas por dias e bailes, em álbuns organizados no Google Fotos.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <EventCard
                title="Juntim 2025"
                subtitle="Festival & Imersão"
                description="Fotos oficiais do evento, divididas por Primeiro dia, Segundo dia, Primeiro baile e Segundo baile."
                badge="Evento"
                onClick={() => setIsPhotosModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Modal de dias do evento */}
        {isPhotosModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-3xl border border-white/10 shadow-2xl w-full max-w-lg mx-4 p-6 md:p-8 relative">
              <button
                onClick={() => setIsPhotosModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Juntim 2025
              </h3>
              <p className="text-xs md:text-sm text-white/60 mb-4">
                Escolha um dia para abrir o álbum de fotos correspondente no Google Fotos.
              </p>

              <div className="space-y-3 mt-4">
                {['Primeiro dia', 'Segundo dia', 'Primeiro baile', 'Segundo baile'].map((label) => (
                  <button
                    key={label}
                    onClick={() => window.open(googlePhotosUrl, '_blank', 'noopener,noreferrer')}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-juntim-yellow text-left text-sm md:text-base text-white transition-all"
                  >
                    <span>{label}</span>
                    <span className="text-juntim-yellow text-xs md:text-sm">&rarr;</span>
                  </button>
                ))}
              </div>

              <p className="text-[0.7rem] text-white/40 mt-4">
                As fotos serão abertas em uma nova aba através da integração com Google Fotos.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* MODAL DE COMPRA DE INGRESSO (HOME) */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-3xl border border-white/10 shadow-2xl w-full max-w-lg mx-4 p-6 md:p-8 relative">
            <button
              onClick={() => setIsTicketModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              Reserva de Ingresso
            </h3>
            <p className="text-xs md:text-sm text-white/60 mb-4">
              Preencha seus dados para iniciar a compra. Entraremos em contato para confirmar o pagamento e a sua vaga.
            </p>

            <form
              className="space-y-3 mt-2"
              onSubmit={(e) => {
                e.preventDefault();
                // Aqui futuramente podemos integrar com backend/formulário real
                alert('Dados enviados! Em breve entraremos em contato para concluir a compra.');
                setIsTicketModalOpen(false);
              }}
            >
              <div className="space-y-1">
                <label className="text-xs text-white/80 font-semibold">Nome completo</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black/40 border border-white/15 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-juntim-yellow"
                  placeholder="Seu nome"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/80 font-semibold">E-mail</label>
                <input
                  type="email"
                  required
                  className="w-full bg-black/40 border border-white/15 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-juntim-yellow"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/80 font-semibold">WhatsApp</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-black/40 border border-white/15 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-juntim-yellow"
                  placeholder="(DDD) 99999-9999"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/80 font-semibold">Tipo de ingresso</label>
                <select
                  className="w-full bg-black/40 border border-white/15 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-juntim-yellow"
                  defaultValue="integral"
                >
                  <option value="integral">Integral - Pacote completo</option>
                  <option value="meia">Meia - Estudantes / Parceiros</option>
                  <option value="baile">Somente bailes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/80 font-semibold">Observações</label>
                <textarea
                  rows={3}
                  className="w-full bg-black/40 border border-white/15 rounded-2xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-juntim-yellow resize-none"
                  placeholder="Conte qualquer informação importante (parceiro(a), nível, necessidades especiais, etc.)"
                />
              </div>

              <Button type="submit" variant="rust" className="w-full mt-2">
                Quero garantir meu ingresso
              </Button>

              <p className="text-[0.65rem] text-white/40 mt-2">
                Ao enviar, você autoriza contato por WhatsApp e e-mail para finalizar a compra do ingresso.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* SEÇÃO 3: CONTACT + FOOTER */}
      <section id="contact" className="snap-section bg-black flex flex-col" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container mx-auto px-6 flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h1 
                className="text-3xl md:text-4xl font-black text-white mb-2"
                dangerouslySetInnerHTML={{ __html: t('contact.title') }}
              />
              <p className="text-gray-400 text-xs max-w-xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start mb-8">
              {/* Contact Info */}
              <div className="space-y-4 bg-gray-900/80 p-5 md:p-6 rounded-3xl border border-gray-800 backdrop-blur-sm shadow-xl">
                <div className="flex items-start gap-2.5">
                  <div className="bg-recharge-gold/20 p-2 rounded-full text-recharge-gold flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">{t('contact.location')}</h3>
                    <p className="text-gray-400 text-xs">123 Rhythm Ave.<br />Cedar Rapids, IA 52402</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="bg-recharge-gold/20 p-2 rounded-full text-recharge-gold flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">{t('contact.phone')}</h3>
                    <p className="text-gray-400 text-xs">319.555.5845</p>
                    <p className="text-gray-500 text-xs mt-0.5">Seg-Sex 9h-20h</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="bg-recharge-gold/20 p-2 rounded-full text-recharge-gold flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5">{t('contact.email')}</h3>
                    <p className="text-gray-400 text-xs">info@juntim.com</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="col-span-2 md:col-span-1">
                    <input 
                      type="text" 
                      placeholder={t('contact.form.firstName')} 
                      className="w-full bg-white rounded-full px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <input 
                      type="text" 
                      placeholder={t('contact.form.lastName')} 
                      className="w-full bg-white rounded-full px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="col-span-2 md:col-span-1">
                    <input 
                      type="email" 
                      placeholder={t('contact.form.email')} 
                      className="w-full bg-white rounded-full px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <input 
                      type="tel" 
                      placeholder={t('contact.form.phone')} 
                      className="w-full bg-white rounded-full px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                    />
                  </div>
                </div>

                <textarea 
                  rows={3} 
                  placeholder={t('contact.form.message')} 
                  className="w-full bg-white rounded-3xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg resize-none border-2 border-transparent focus:border-recharge-rust transition-all"
                ></textarea>

                <Button className="w-full md:w-auto text-xs" variant="rust" type="submit">{t('contact.form.send')}</Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer integrado */}
        <div className="border-t border-gray-900">
          <div className="container mx-auto px-6 py-6">
            <div className="grid md:grid-cols-3 gap-6 items-center text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-transparent border-2 border-recharge-rust rounded-lg flex items-center justify-center transform rotate-45">
                    <Heart className="text-recharge-rust w-4 h-4 -rotate-45" fill="currentColor" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-lg tracking-tight">{t('hero.title')}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-2 max-w-xs mx-auto md:mx-0">
                  {t('footer.mission')}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs text-gray-400 items-center md:items-start">
                <h4 className="text-white font-bold uppercase tracking-widest mb-1">{t('footer.contact')}</h4>
                <div className="flex items-center gap-1.5 hover:text-recharge-gold transition-colors cursor-pointer">
                  <Phone size={14} className="text-recharge-rust" />
                  <span>319.555.5845</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-recharge-gold transition-colors cursor-pointer">
                  <Mail size={14} className="text-recharge-rust" />
                  <span>info@rechargeandtransform.com</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-recharge-gold transition-colors cursor-pointer">
                  <MapPin size={14} className="text-recharge-rust" />
                  <span>Cedar Rapids, IA</span>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <h4 className="text-white font-bold uppercase tracking-widest mb-2 text-xs">{t('footer.follow')}</h4>
                <div className="flex gap-2 justify-center md:justify-end mb-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-recharge-rust hover:text-white transition-all cursor-pointer text-xs">F</div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-recharge-rust hover:text-white transition-all cursor-pointer text-xs">In</div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-recharge-rust hover:text-white transition-all cursor-pointer text-xs">Yt</div>
                </div>
                <div className="text-xs text-gray-600">
                  {t('footer.copyright')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Fotos - fixo e sobrepondo tudo */}
      <div className="fixed left-0 w-full" style={{ height: CAROUSEL_HEIGHT, bottom: CAROUSEL_VERTICAL_POSITION, zIndex: 9999, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <PhotoCarousel photos={getCarouselPhotoPaths()} />
        </div>
      </div>
      </div>
    </>
  );
};

