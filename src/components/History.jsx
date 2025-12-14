import React from 'react';
import { Calendar, Star, MapPin, Heart, Award } from 'lucide-react';

const milestones = [
  {
    year: "2020",
    title: "El Nacimiento de un Sueño",
    description: "En medio de la incertidumbre global, nos constituimos legalmente el 2 de marzo. Nacimos con una misión clara: ser el refugio y la familia de los abuelos olvidados de Bogotá.",
    icon: Star,
    color: "bg-yellow-400"
  },
  {
    year: "2021",
    title: "Manos a la Obra en Pandemia",
    description: "Mientras el mundo se detenía, nosotros avanzamos. Llegamos a barrios como Patio Bonito y Techo Bavaria II, llevando alimentos y esperanza a quienes más lo necesitaban en el aislamiento.",
    icon: Heart,
    color: "bg-rose-500"
  },
  {
    year: "2023",
    title: "Consolidación y Crecimiento",
    description: "Logramos atender a más de 150 adultos mayores en nuestras celebraciones y jornadas de salud. Fortalecimos nuestros comedores comunitarios y las alianzas con líderes locales.",
    icon: Users, // Asegúrate de importar Users abajo si cambias el icono, o usa Heart
    color: "bg-blue-500"
  },
  {
    year: "2024",
    title: "Huellas en Colombia",
    description: "¡Rompimos fronteras! Llevamos nuestra labor a Honda (Tolima) apoyando a pescadores, y extendimos brazos solidarios a comunidades en La Guajira y Cundinamarca.",
    icon: MapPin,
    color: "bg-green-500"
  },
  {
    year: "Actualidad",
    title: "Una Gran Familia",
    description: "Hoy somos más que una fundación; somos un hogar. Con tu ayuda, seguimos escribiendo esta historia, transformando la soledad en compañía y el hambre en sonrisas.",
    icon: Award,
    color: "bg-rose-600"
  }
];

// Importamos el icono que faltaba en la definición
import { Users } from 'lucide-react';

const History = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rose-600 font-bold uppercase tracking-widest text-sm mb-2 block">
            Nuestra Trayectoria
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Caminando <span className="text-yellow-500">Juntos</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Cada año ha sido un escalón más hacia nuestro sueño de una vejez digna para todos.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Línea vertical central */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2"></div>

          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`relative flex items-center justify-between mb-12 md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Espacio vacío para alternar lados */}
                <div className="hidden md:block w-5/12"></div>

                {/* Punto central (Icono) */}
                <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-lg z-10 ${item.color} text-white`}>
                  <item.icon size={18} strokeWidth={2.5} />
                </div>

                {/* Tarjeta de Contenido */}
                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                  <div className={`bg-white p-6 rounded-2xl shadow-xl border border-gray-50 hover:-translate-y-1 transition-transform duration-300 group ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${item.color}`}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default History;