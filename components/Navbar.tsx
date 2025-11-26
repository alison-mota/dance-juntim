import React, { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getAssetPath } from '../utils/paths';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Detectar seção ativa baseado no scroll horizontal
      const sections = ['hero', 'about', 'photos', 'contact'];
      const scrollPosition = window.scrollX + window.innerWidth / 2;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetLeft, offsetWidth } = element;
          if (scrollPosition >= offsetLeft && scrollPosition < offsetLeft + offsetWidth) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar na montagem
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const navLinks = [
    { name: t('nav.home'), id: 'hero' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.photos'), id: 'photos' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white py-4 shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gray-100">
      {/* Divisão moderna e suave */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"></div>
      
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center relative">
        {/* Logo */}
        <button 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <img
            src={getAssetPath('images/logo-e-nome.gif')}
            alt="Juntim Festival"
            className="h-12 md:h-14"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-110 cursor-pointer ${activeSection === link.id ? 'text-[#992005] border-b-2 border-[#992005]' : 'text-gray-700 hover:text-gray-900'}`}
            >
              {link.name}
            </button>
          ))}
          <div className="flex gap-4 ml-4 pl-4 border-l border-gray-200 items-center">
             {/* Botão de idioma */}
             <button
               onClick={toggleLanguage}
               className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-recharge-rust hover:text-white transition-all duration-300 text-gray-600"
               title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
             >
               <Languages size={16} />
             </button>
             {/* Social placeholders */}
             <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-recharge-rust hover:text-white transition-all duration-300 text-gray-600">
                <span className="font-bold text-xs">f</span>
             </div>
             <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-recharge-rust hover:text-white transition-all duration-300 text-gray-600">
                <span className="font-bold text-xs">ig</span>
             </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-700 hover:text-recharge-rust transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-gray-700 font-bold uppercase tracking-wider text-center py-3 hover:bg-gray-50 rounded-lg transition-colors ${activeSection === link.id ? 'text-[#992005] bg-gray-50' : 'hover:text-[#992005]'}`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="text-gray-700 font-bold uppercase tracking-wider text-center py-3 hover:bg-gray-50 rounded-lg hover:text-recharge-rust transition-colors flex items-center justify-center gap-2"
          >
            <Languages size={18} />
            {language === 'pt' ? 'English' : 'Português'}
          </button>
        </div>
      )}
    </nav>
  );
};