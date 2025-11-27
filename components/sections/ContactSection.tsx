import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../Button';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
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

              <Button className="w-full md:w-auto text-xs" variant="rust" type="submit">
                {t('contact.form.send')}
              </Button>
            </form>
          </div>
        </div>
      </div>

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
  );
};

