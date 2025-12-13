import React from 'react';

const Partners = () => {
  // Lista de Patrocinadores (Puedes agregar más)
  const partners = [
    { name: "Alcaldía de Bogotá", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Escudo_de_Bogot%C3%A1.svg/1200px-Escudo_de_Bogot%C3%A1.svg.png" },
    { name: "Banco de Alimentos", logo: "https://www.bancodealimentos.org.co/wp-content/uploads/2020/06/Logo-Banco-de-Alimentos-Bogota-1.png" },
    { name: "Éxito", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Almacenes_%C3%89xito_logo.svg/2560px-Almacenes_%C3%89xito_logo.svg.png" },
    { name: "Cámara de Comercio", logo: "https://www.ccb.org.co/sites/default/files/2023-04/Logo%20CCB%20%281%29.png" },
    { name: "Wompi", logo: "https://images.ctfassets.net/5hl5xgwd51r7/271168/22b3112b322524d77a06752763261765/wompi_logo.png" }
  ];

  // Duplicamos la lista para crear el efecto infinito sin cortes
  const loopPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6 mb-8 text-center">
        <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest">Nuestros Aliados y Patrocinadores</h3>
      </div>
      
      {/* Contenedor del Carrusel */}
      <div className="relative w-full flex overflow-hidden">
        {/* Pista de deslizamiento */}
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
          {loopPartners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center justify-center w-32 md:w-48 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-16 md:h-20 object-contain"
              />
              <span className="text-xs text-gray-400 mt-2 font-semibold">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Estilos Inline para la animación (para no tocar tailwind.config) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;