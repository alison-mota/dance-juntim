import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'white' | 'rust';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button'
}) => {
  const baseStyles = "px-8 py-3 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm uppercase tracking-wider flex items-center justify-center gap-2 button-organic";
  
  const variants = {
    primary: "bg-recharge-gold hover:bg-white text-gray-900 shadow-recharge-gold/30 hover:shadow-white/20",
    rust: "bg-recharge-rust hover:bg-recharge-bronze text-white shadow-recharge-rust/30",
    outline: "border-2 border-white text-white hover:bg-white hover:text-gray-900",
    white: "bg-white text-recharge-rust hover:bg-gray-100 shadow-white/10"
  };

  return (
    <button 
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};