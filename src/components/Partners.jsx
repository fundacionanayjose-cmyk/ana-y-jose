import React from 'react';

const Partners = () => {
  // Lista de Patrocinadores con las IMÁGENES REALES de tu carpeta galeria
  const partners = [
    { 
      name: "Alcaldía de Bogotá", 
      logo: "/galeria/Protekto-Logo-Alcaldia-de-Bogota.jpg" 
    },
    { 
      name: "Banco de Alimentos", 
      logo: "/galeria/logobancodealimentos.png" 
    },
    { 
      name: "Éxito", 
      logo: "/galeria/logoexito.png" 
    },
    { 
      name: "Cámara de Comercio", 
      logo: "/galeria/camaradecomercio.png" 
    },
    { 
      name: "Wompi", 
      logo: "/galeria/wompi.png" 
    }
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
            <div key={index} className="flex flex-col items-center justify-center w-32 md:w-48 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-16 md:h-20 object-contain"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none'; // Oculta si falla
                  console.error(`Error cargando logo: ${partner.logo}`);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Estilos Inline para la animación */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;