import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  // Estilos base: redondeado, sombra, transición suave
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2";
  
  // Variantes de color basadas en tu identidad corporativa
  const variants = {
    primary: "bg-rose-600 hover:bg-rose-700 text-white border-2 border-transparent", // Rojo principal
    secondary: "bg-blue-800 hover:bg-blue-900 text-white border-2 border-transparent", // Azul institucional
    outline: "bg-transparent text-white border-2 border-white hover:bg-white/10", // Transparente para fondos oscuros
    accent: "bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-2 border-transparent" // Amarillo para resaltar
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;