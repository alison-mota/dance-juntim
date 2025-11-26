import React from 'react';
import { Button } from '../components/Button';

export const Services: React.FC = () => {
  const services = [
    {
      title: "Forró Fundamentals",
      desc: "Master the basic steps and embrace of this northeastern Brazilian dance.",
      img: ""
    },
    {
      title: "Zouk Flow",
      desc: "Learn head movements and fluid transitions in our signature Zouk class.",
      img: ""
    },
    {
      title: "Rhythm & Soul",
      desc: "Connecting spiritual growth with physical expression through music.",
      img: ""
    },
    {
      title: "Private Coaching",
      desc: "One-on-one sessions tailored to your specific dance goals.",
      img: ""
    },
    {
      title: "Social Dance Nights",
      desc: "Put your skills to practice in a friendly, welcoming environment.",
      img: ""
    },
    {
      title: "Weekend Workshops",
      desc: "Intensive deep dives into specific techniques and styles.",
      img: ""
    }
  ];

  // Color reference for Barroco
  const bronzeColor = '#C77B43';
  const footerColor = '#000000';

  return (
    <div className="w-full bg-gray-900 min-h-screen pt-24">
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-16 relative">
         <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               <h1 className="text-5xl font-black text-white mb-6">OUR <span className="text-recharge-rust">SERVICES</span></h1>
               <p className="text-gray-300 text-lg mb-8">
                  From the grounded roots of Forró to the fluid skies of Zouk. We offer a comprehensive curriculum for all levels of dancers.
               </p>
               <Button variant="primary">Start Your Journey</Button>
            </div>
            <div className="md:w-1/2 relative">
               <div className="rounded-[40px] shadow-2xl border-4 border-recharge-rust z-10 relative bg-recharge-rust/20 h-96 flex items-center justify-center">
                  <span className="text-white/50 text-lg">Visual Placeholder</span>
               </div>
               <div className="absolute -bottom-6 -left-6 w-full h-full bg-recharge-gold/20 rounded-[40px] -z-0"></div>
            </div>
         </div>
      </div>


      {/* Grid - "Barroco" Background */}
      <div className="bg-recharge-bronze pb-24 pt-12">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {services.map((service, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300 group border-b-4 border-recharge-rust">
                     <div className="h-48 overflow-hidden relative bg-recharge-rust/10 flex items-center justify-center">
                        <span className="text-recharge-rust/30 text-sm">Visual Placeholder</span>
                     </div>
                     <div className="p-8">
                        <h3 className="text-recharge-rust font-bold text-xl mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-6">{service.desc}</p>
                        <a href="#" className="text-gray-900 font-bold text-sm uppercase tracking-wider border-b-2 border-recharge-gold pb-1 hover:text-recharge-rust transition-colors">Learn More</a>
                     </div>
                  </div>
               ))}
            </div>

            {/* Featured Section */}
            <div className="mt-20 bg-gray-900 rounded-3xl p-8 md:p-12 border border-recharge-rust/30 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-96 h-96 bg-recharge-rust/20 rounded-full blur-3xl"></div>
               <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                     <span className="text-recharge-gold font-bold uppercase tracking-widest text-xs mb-2 block">Featured Program</span>
                     <h2 className="text-3xl font-bold text-white mb-4">12 Week Intensive Zouk Course</h2>
                     <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        Immerse yourself in the technique and connection of Zouk. This intensive program is designed to take you from beginner to confident social dancer in 3 months.
                     </p>
                     <Button variant="rust">Join Program</Button>
                  </div>
                  <div>
                     <div className="rounded-xl shadow-lg w-full h-64 border-2 border-recharge-gold bg-recharge-rust/10 flex items-center justify-center">
                        <span className="text-white/30 text-sm">Visual Placeholder</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};