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
    // Navbar
    'nav.home': 'Início',
    'nav.about': 'Quem somos',
    'nav.photos': 'Fotos',
    'nav.contact': 'Contato',
    
    // Hero
    'hero.welcome': '',
    'hero.title': 'JUNTIM',
    'hero.subtitle': 'Descubra o poder da conexão através da dança. Desbloqueie seu potencial com ritmo, paixão e alma.',
    'hero.start': 'Começar a Dançar',
    'hero.watch': 'Assistir Vídeo',
    
    // Forró
    'forro.title': 'FORRÓ',
    'forro.subtitle': 'RITMO DO NORDESTE',
    'forro.description': 'Experimente o calor do abraço. Forró é mais que uma dança; é uma conversa sem palavras. Terreno, terrenal e incrivelmente conectado.',
    'forro.button': 'Fazer Aula de Forró',
    
    // Zouk
    'zouk.title': 'ZOUK',
    'zouk.subtitle': 'A Dança do Fluxo',
    'zouk.description': 'Fluidez, conexão e movimento de cabelo. Zouk traz uma energia moderna e dinâmica que desafia a gravidade e une almas em movimento.',
    'zouk.button': 'Descobrir Zouk',
    
    // Brand
    'brand.title': 'RECARREGUE SUA ALMA',
    'brand.description': 'Combinamos as raízes terrenas do <span class="font-bold text-juntim-yellow">Forró</span>, a energia fluida do <span class="font-bold text-juntim-yellow">Zouk</span>, e o bem-estar holístico para transformar sua vida.',
    'brand.instructors': 'Instrutores',
    'brand.classes': 'Aulas Semanais',
    'brand.passion': 'Paixão',
    'brand.member': 'Tornar-se Membro',
    
    // Contact
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
    
    // Footer
    'footer.mission': 'Transformando corpos e almas através do ritmo da dança e do poder da comunidade.',
    'footer.contact': 'Entre em Contato',
    'footer.follow': 'Siga-nos',
    'footer.copyright': '© 2024 Juntim. Todos os direitos reservados.',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.photos': 'Photos',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.welcome': 'Welcome to Movement',
    'hero.title': 'JUNTIM',
    'hero.subtitle': 'Discover the power of connection through dance. Unlock your potential with rhythm, passion, and soul.',
    'hero.start': 'Start Dancing',
    'hero.watch': 'Watch Video',
    
    // Forró
    'forro.title': 'FORRÓ',
    'forro.subtitle': 'RHYTHM OF THE NORTHEAST',
    'forro.description': 'Experience the warmth of the embrace. Forró is more than a dance; it\'s a conversation without words. Grounded, earthly, and incredibly connected.',
    'forro.button': 'Join Forró Class',
    
    // Zouk
    'zouk.title': 'ZOUK',
    'zouk.subtitle': 'The Dance of Flow',
    'zouk.description': 'Fluidity, connection, and hair movement. Zouk brings a modern, dynamic energy that challenges gravity and unites souls in motion.',
    'zouk.button': 'Discover Zouk',
    
    // Brand
    'brand.title': 'RECHARGE YOUR SOUL',
    'brand.description': 'We combine the earthly roots of <span class="font-bold text-juntim-yellow">Forró</span>, the fluid energy of <span class="font-bold text-juntim-yellow">Zouk</span>, and holistic wellness to transform your life.',
    'brand.instructors': 'Instructors',
    'brand.classes': 'Classes Weekly',
    'brand.passion': 'Passion',
    'brand.member': 'Become a Member',
    
    // Contact
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
    
    // Footer
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

