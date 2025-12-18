import React from 'react';

const Partners = () => {
  // Lista de aliados con los logos reales que ya cargamos
  const partners = [
    { 
      id: 1, 
      name: "Banco de Alimentos", 
      logo: "/galeria/logobancodealimentos.png",
      description: "Seguridad Alimentaria"
    },
    { 
      id: 2, 
      name: "Grupo Éxito", 
      logo: "/galeria/logoexito.png",
      description: "Donaciones en Especie"
    },
    { 
      id: 3, 
      name: "Cámara de Comercio", 
      logo: "/galeria/camaradecomercio.png",
      description: "Fortalecimiento Institucional"
    },
    { 
      id: 4, 
      name: "Alcaldía de Bogotá", 
      logo: "/galeria/Protekto-Logo-Alcaldia-de-Bogota.jpg",
      description: "Programas Distritales"
    },
    // Agregamos algunos repetidos o extras si es necesario para llenar espacio visual
    { 
      id: 5, 
      name: "Wompi", 
      logo: "/galeria/wompi.png",
      description: "Pasarela de Pagos"
    }
  ];

  // TRUCO TÉCNICO: Duplicamos la lista para que el scroll sea infinito y perfecto
  const infinitePartners = [...partners, ...partners, ...partners]; 

  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
          Nuestros Aliados
        </h2>
      </div>

      {/* CONTENEDOR DE LA CINTA */}
      <div className="relative w-full overflow-hidden">
        
        {/* Degradados laterales para suavizar la entrada/salida (Efecto elegante) */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent"></div>

        {/* PISTA QUE SE MUEVE */}
        <div className="flex items-center w-max animate-scroll hover:[animation-play-state:paused]">
          {infinitePartners.map((partner, index) => (
            <div 
              key={`${partner.id}-${index}`} 
              className="flex-shrink-0 mx-8 md:mx-14 w-32 md:w-40 group relative flex flex-col items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="w-full h-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                style={{ maxHeight: '80px' }}
              />
              {/* Tooltip simple */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-full shadow-sm border border-gray-100 whitespace-nowrap">
                {partner.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;