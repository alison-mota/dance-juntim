import React from 'react';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const rustColor = '#992005';

  return (
    <div className="w-full bg-black min-h-screen pt-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">CONTACT <span className="text-recharge-rust">US</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ready to start your dance journey? Send us a message to book your first class or ask about our programs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-8 bg-gray-900/80 p-10 rounded-3xl border border-gray-800 backdrop-blur-sm shadow-xl">
            <div className="flex items-start gap-4">
              <div className="bg-recharge-gold/20 p-3 rounded-full text-recharge-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Studio Location</h3>
                <p className="text-gray-400">123 Rhythm Ave.<br />Cedar Rapids, IA 52402</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-recharge-gold/20 p-3 rounded-full text-recharge-gold">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Phone Number</h3>
                <p className="text-gray-400">319.555.5845</p>
                <p className="text-gray-500 text-xs mt-1">Mon-Fri 9am-8pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-recharge-gold/20 p-3 rounded-full text-recharge-gold">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Email Address</h3>
                <p className="text-gray-400">info@rechargeandtransform.com</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <input 
                  type="text" 
                  placeholder="First Name *" 
                  className="w-full bg-white rounded-full px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                 <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full bg-white rounded-full px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  className="w-full bg-white rounded-full px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                 <input 
                  type="tel" 
                  placeholder="Phone" 
                  className="w-full bg-white rounded-full px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg border-2 border-transparent focus:border-recharge-rust transition-all"
                />
              </div>
            </div>

            <textarea 
              rows={5} 
              placeholder="Tell us about your dance goals *" 
              className="w-full bg-white rounded-3xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-recharge-rust shadow-lg resize-none border-2 border-transparent focus:border-recharge-rust transition-all"
            ></textarea>

            <Button className="w-full md:w-auto" variant="rust" type="submit">Send Message</Button>
          </form>

        </div>
      </div>
    </div>
  );
};