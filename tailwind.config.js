/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Definimos la animación
      animation: {
        'scroll': 'scroll 40s linear infinite', // 40s es la velocidad (más alto = más lento)
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards', // Ya la usabas, la re-agregamos por si acaso
      },
      // 2. Definimos los pasos (Keyframes)
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Se mueve el 50% porque duplicamos la lista
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}