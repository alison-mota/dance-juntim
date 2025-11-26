import React from 'react';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-900 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start gap-3">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-transparent border-2 border-recharge-rust rounded-lg flex items-center justify-center transform rotate-45">
                   <Heart className="text-recharge-rust w-6 h-6 -rotate-45" fill="currentColor" />
               </div>
               <div className="flex flex-col">
                  <span className="font-black text-2xl tracking-tight">TEAM</span>
                  <span className="text-recharge-gold text-sm tracking-[0.3em] font-bold">RECHARGE</span>
               </div>
             </div>
             <p className="text-gray-500 text-sm mt-4 max-w-xs mx-auto md:mx-0">
               Transforming bodies and souls through the rhythm of dance and the power of community.
             </p>
          </div>

          <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">Contact Us</h4>
            <div className="flex items-center gap-2 hover:text-recharge-gold transition-colors cursor-pointer">
              <Phone size={16} className="text-recharge-rust" />
              <span>319.555.5845</span>
            </div>
            <div className="flex items-center gap-2 hover:text-recharge-gold transition-colors cursor-pointer">
              <Mail size={16} className="text-recharge-rust" />
              <span>info@rechargeandtransform.com</span>
            </div>
             <div className="flex items-center gap-2 hover:text-recharge-gold transition-colors cursor-pointer">
              <MapPin size={16} className="text-recharge-rust" />
              <span>Cedar Rapids, IA</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
             <h4 className="text-white font-bold uppercase tracking-widest mb-4">Follow Us</h4>
             <div className="flex gap-4 justify-center md:justify-end">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-recharge-rust hover:text-white transition-all cursor-pointer">F</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-recharge-rust hover:text-white transition-all cursor-pointer">In</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-recharge-rust hover:text-white transition-all cursor-pointer">Yt</div>
             </div>
             <div className="text-xs text-gray-600 mt-6">
               © 2024 Team Recharge. All Rights Reserved.
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};