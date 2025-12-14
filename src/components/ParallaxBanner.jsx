import React from 'react';

const ParallaxBanner = ({ image, quote }) => {
  return (
    <div 
      className="relative w-full h-[400px] md:h-[600px] bg-fixed bg-center bg-cover bg-no-repeat flex items-center justify-center"
      style={{ 
        backgroundImage: `url('${image}')`,
        // Fallback para móviles que no soportan bg-fixed nativo
        backgroundAttachment: 'fixed' 
      }}
    >
      {/* Overlay oscuro para que el texto se lea perfecto */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Texto Emocional */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in-up">
        <h3 className="text-2xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl italic font-serif">
          "{quote}"
        </h3>
        <div className="mt-6 w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
      </div>
    </div>
  );
};

export default ParallaxBanner;