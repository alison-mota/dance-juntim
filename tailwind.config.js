/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'juntim-red': '#992005', // Vermelho vibrante (da identidade)
        'juntim-orange': '#EA580C', // Laranja quente (da identidade)
        'juntim-yellow': '#FCD34D', // Amarelo dourado (da identidade)
        'juntim-dark': '#1F1F1F', // Preto suave
        'juntim-light': '#F9FAFB', // Branco suave
        // Mantém cores antigas para compatibilidade
        'recharge-blue': '#0B5D70',
        'recharge-gold': '#E6AA3E',
        'recharge-rust': '#992005', // Atualizado para vermelho da identidade
        'recharge-bronze': '#EA580C', // Atualizado para laranja da identidade
        'gray-900': '#1F1F1F',
        'gray-800': '#2A2A2A',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
