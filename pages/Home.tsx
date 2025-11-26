import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Music, Heart, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const colors = {
    blue: '#0B5D70',
    rust: '#992005', // New primary
    gold: '#E6AA3E',
    bronze: '#C77B43',
    dark: '#111827',
    black: '#000000'
  };

  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: '#0B5D70' }}>
      
      {/* 
        LAYER 1: HERO (Base Layer)
        Visual: Dark, Mysterious, Intro
      */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32" style={{ backgroundColor: '#0B5D70' }}>
        <div className="container mx-auto px-6 relative grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
               <span className="h-px w-8 bg-recharge-gold"></span>
               <h2 className="text-recharge-gold font-bold tracking-[0.3em] uppercase text-xs">Welcome to Movement</h2>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight">
              TEAM<br/>
              <span className="text-recharge-rust drop-shadow-[0_0_15px_rgba(153,32,5,0.5)]">RECHARGE</span>
            </h1>
            
            <p className="text-gray-300 text-lg max-w-md border-l-4 border-recharge-rust pl-6 py-2">
              Discover the power of connection through dance. Unlock your potential with rhythm, passion, and soul.
            </p>
            
            <div className="pt-8 flex gap-4">
              <Button variant="rust">Start Dancing</Button>
              <Button variant="outline">Watch Video</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        LAYER 2: FORRÓ (Ouro/Gold Theme)
        Visual: Organic curve overlapping Hero. "3D" card effect.
      */}
      <section className="relative" style={{ backgroundColor: '#0B5D70' }}>
        <div className="relative pb-32 pt-10">
           <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              {/* Text Side */}
              <div className="order-2 md:order-1 relative">
                 <div className="flex items-center gap-3 mb-4">
                    <Music className="text-recharge-gold w-8 h-8" />
                    <h2 className="text-5xl font-black text-white tracking-tighter">FORRÓ</h2>
                 </div>
                 <h3 className="text-xl font-bold text-recharge-rust mb-6 bg-white/90 inline-block px-4 py-1 rounded-full">RHYTHM OF THE NORTHEAST</h3>
                 <p className="text-white text-lg leading-relaxed mb-8 drop-shadow-md">
                    Experience the warmth of the embrace. Forró is more than a dance; it's a conversation without words. 
                    Grounded, earthly, and incredibly connected.
                 </p>
                 <Button variant="white" className="text-recharge-bronze font-extrabold">Join Forró Class</Button>
              </div>
           </div>
        </div>
      </section>

      {/* 
        LAYER 3: ZOUK (Azul Theme)
        Visual: Organic curve overlapping Forró. "3D" card effect.
      */}
      <section className="relative" style={{ backgroundColor: '#0B5D70' }}>
        <div className="relative pb-40 pt-10">
           <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              {/* Text Side */}
              <div className="relative text-right md:text-left">
                 <div className="flex items-center justify-end md:justify-start gap-3 mb-4">
                    <h2 className="text-5xl font-black text-white tracking-tighter">ZOUK</h2>
                    <Zap className="text-cyan-300 w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-cyan-200 mb-6 uppercase tracking-widest">The Dance of Flow</h3>
                 <p className="text-blue-100 text-lg leading-relaxed mb-8 drop-shadow-md">
                    Fluidity, connection, and hair movement. Zouk brings a modern, dynamic energy that challenges gravity and unites souls in motion.
                 </p>
                 <Button variant="primary">Discover Zouk</Button>
              </div>
           </div>
        </div>
      </section>

      {/* 
        LAYER 4: BRAND CORE (Rust/Vermilion Theme)
        Visual: The foundation. Strongest color. Overlaps Zouk.
      */}
      <section className="relative" style={{ backgroundColor: '#0B5D70' }}>
        <div className="relative py-32">
           <div className="container mx-auto px-6 text-center">
              <div className="mb-12">
                 <Heart className="w-16 h-16 text-recharge-gold mx-auto mb-6 animate-pulse" fill="currentColor" />
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-6">RECHARGE YOUR SOUL</h2>
                 <p className="text-white/90 text-xl max-w-2xl mx-auto font-light">
                    We combine the earthly roots of <span className="font-bold text-recharge-gold">Forró</span>, 
                    the fluid energy of <span className="font-bold text-cyan-300">Zouk</span>, 
                    and holistic wellness to transform your life.
                 </p>
              </div>

              <div className="bg-black/20 backdrop-blur-md rounded-3xl p-10 max-w-4xl mx-auto border border-white/10 shadow-2xl">
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center group">
                       <h3 className="text-5xl font-black text-white mb-2 group-hover:text-recharge-gold transition-colors">15+</h3>
                       <p className="text-white/70 uppercase text-xs font-bold tracking-widest">Instructors</p>
                    </div>
                    <div className="text-center group">
                       <h3 className="text-5xl font-black text-white mb-2 group-hover:text-recharge-gold transition-colors">50+</h3>
                       <p className="text-white/70 uppercase text-xs font-bold tracking-widest">Classes Weekly</p>
                    </div>
                    <div className="text-center group">
                       <h3 className="text-5xl font-black text-white mb-2 group-hover:text-recharge-gold transition-colors">100%</h3>
                       <p className="text-white/70 uppercase text-xs font-bold tracking-widest">Passion</p>
                    </div>
                 </div>
              </div>
              
              <div className="mt-16">
                 <Button variant="white" className="shadow-[0_0_30px_rgba(255,255,255,0.3)]">Become a Member</Button>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};