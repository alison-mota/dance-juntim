import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="snap-section" style={{ backgroundColor: '#82251C', position: 'relative', zIndex: 2 }}>
      <div className="container mx-auto px-6 h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Juntim é bem<br />
              <span className="text-white">MELHOR!</span>
            </h1>
          </div>

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
  );
};

