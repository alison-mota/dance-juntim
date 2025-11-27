import React from 'react';
import { Button } from '../Button';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Dados enviados! Em breve entraremos em contato para concluir a compra.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl border border-white/10 shadow-2xl w-full max-w-lg mx-4 p-6 md:p-8 relative">
        <button
          onClick={onClose}
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

        <form className="space-y-3 mt-2" onSubmit={handleSubmit}>
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
  );
};

