import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Quem somos',
    'nav.photos': 'Fotos',
    'nav.contact': 'Contato',
    'hero.title': 'JUNTIM',
    'contact.title': 'ENTRE EM <span class="text-recharge-rust">CONTATO</span>',
    'contact.subtitle': 'Pronto para começar sua jornada na dança? Envie-nos uma mensagem para agendar sua primeira aula ou perguntar sobre nossos programas.',
    'contact.location': 'Localização do Estúdio',
    'contact.phone': 'Telefone',
    'contact.email': 'E-mail',
    'contact.form.firstName': 'Nome *',
    'contact.form.lastName': 'Sobrenome',
    'contact.form.email': 'E-mail *',
    'contact.form.phone': 'Telefone',
    'contact.form.message': 'Conte-nos sobre seus objetivos na dança *',
    'contact.form.send': 'ENVIAR MENSAGEM',
    'footer.mission': 'Transformando corpos e almas através do ritmo da dança e do poder da comunidade.',
    'footer.contact': 'Entre em Contato',
    'footer.follow': 'Siga-nos',
    'footer.copyright': '© 2024 Juntim. Todos os direitos reservados.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.photos': 'Photos',
    'nav.contact': 'Contact',
    'hero.title': 'JUNTIM',
    'contact.title': 'CONTACT <span class="text-recharge-rust">US</span>',
    'contact.subtitle': 'Ready to start your dance journey? Send us a message to book your first class or ask about our programs.',
    'contact.location': 'Studio Location',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email Address',
    'contact.form.firstName': 'First Name *',
    'contact.form.lastName': 'Last Name',
    'contact.form.email': 'Email Address *',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Tell us about your dance goals *',
    'contact.form.send': 'SEND MESSAGE',
    'footer.mission': 'Transforming bodies and souls through the rhythm of dance and the power of community.',
    'footer.contact': 'Contact Us',
    'footer.follow': 'Follow Us',
    'footer.copyright': '© 2024 Juntim. All Rights Reserved.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'pt' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations.pt];
    return translation || translations.pt[key as keyof typeof translations.pt] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Em ambiente de desenvolvimento (React Refresh) alguns componentes
    // podem ser renderizados fora da árvore principal. Neste caso,
    // fazemos um fallback seguro para evitar quebrar a UI.
    console.warn('useLanguage foi usado fora de LanguageProvider. Usando fallback padrão (pt).');
    return {
      language: 'pt' as const,
      setLanguage: () => {},
      t: (key: string) => {
        const translation = translations.pt[key as keyof typeof translations.pt];
        return translation || key;
      },
    };
  }
  return context;
};

