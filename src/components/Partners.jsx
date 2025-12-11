import React from 'react';

const Partners = () => {
  // Aquí pondrás los logos de las empresas (archivos PNG con fondo transparente preferiblemente)
  const partners = [
    { name: "Alcaldía Mayor", logo: "/logos/alcaldia.png" },
    { name: "Éxito", logo: "/logos/exito.png" },
    { name: "Bancolombia", logo: "/logos/bancolombia.png" },
    { name: "Nutresa", logo: "/logos/nutresa.png" },
    { name: "Postobón", logo: "/logos/postobon.png" },
    { name: "Sena", logo: "/logos/sena.png" },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-gray-400 font-bold uppercase tracking-widest text-sm mb-10">
          Con el apoyo incondicional de
        </h3>

        {/* Grid de Logos Interactivos */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {partners.map((partner, idx) => (
            <div 
              key={idx} 
              className="group relative w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
            >
              {/* Logo (Usamos un placeholder de texto si no hay imagen, pero está listo para <img>) */}
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300"
                onError={(e) => {
                  // Fallback visual si no hay logo: muestra el nombre en texto bonito
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              {/* Texto de respaldo (se muestra si falla la imagen) */}
              <span className="hidden font-bold text-gray-400 group-hover:text-rose-600 text-xl">
                {partner.name}
              </span>
              
              {/* Pequeño punto decorativo al hacer hover */}
              <div className="absolute -bottom-4 w-2 h-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;