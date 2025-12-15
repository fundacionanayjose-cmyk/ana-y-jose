import React, { useState, useEffect, useRef } from 'react';
import { Star, Heart, Users, MapPin, Award } from 'lucide-react';

const milestones = [
  {
    id: 'h-2020',
    year: "2020",
    title: "El Nacimiento de un Sueño",
    description: "En medio de la incertidumbre global, nos constituimos legalmente el 2 de marzo. Nacimos con una misión clara: ser el refugio y la familia de los abuelos olvidados de Bogotá llegando con acompañamiento psicosocial y ayudas tecnicas a personas mayores y personas con discapacidad.",
    icon: Star,
    color: "bg-yellow-400",
    image: "/galeria/IMG20250805144021 (1).jpg"
  },
  {
    id: 'h-2021',
    year: "2021",
    title: "Manos a la Obra en Pandemia",
    description: "Mientras el mundo se detenía, nosotros avanzamos.llevando mas de 5500 raciones alimentarias a los diferente hogares de la localidad de kennedy,bosa,ciudad bolivar y cuidades como fresno tolima y mansanares caldas.",
    icon: Heart,
    color: "bg-rose-500",
    image: "/galeria/20210503_205438.jpg"
  },
  {
    id: 'h-2023',
    year: "2023",
    title: "Consolidación y Crecimiento",
    description: "Logramos atender a más de 150 adultos mayores en nuestras celebraciones y jornadas de salud. Fortalecimos nuestros comedores comunitarios y las alianzas locales.",
    icon: Users,
    color: "bg-blue-500",
    image: "/galeria/20211224_163500_HDR.jpg"
  },
  {
    id: 'h-2024',
    year: "2024",
    title: "Huellas en Colombia",
    description: "¡Rompimos fronteras! Llevamos nuestra labor a Honda (Tolima) apoyando a pescadores, y extendimos brazos solidarios a comunidades en La Guajira y Cundinamarca.",
    icon: MapPin,
    color: "bg-green-500",
    image: "/galeria/20211120_111629_HDR.jpg"
  },
  {
    id: 'h-actual',
    year: "Actualidad",
    title: "Una Gran Familia",
    description: "Hoy somos más que una fundación; somos un hogar. Con tu ayuda, seguimos escribiendo esta historia, transformando la soledad en compañía y el hambre en sonrisas.",
    icon: Award,
    color: "bg-rose-600",
    image: "/galeria/20211121_132212_HDR.jpg"
  }
];

const History = () => {
  const [activeImage, setActiveImage] = useState(milestones[0].image);
  
  // Referencias para los observadores
  const itemsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Zona central de detección
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const milestone = milestones.find(m => m.id === entry.target.id);
          if (milestone) {
            setActiveImage(milestone.image);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full">
      
      {/* --- FONDO DINÁMICO (STICKY) --- */}
      {/* Se queda fijo al fondo mientras haces scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden -z-10">
        {milestones.map((item) => (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              activeImage === item.image ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        ))}
        {/* Overlay blanco suave para que el diseño original (tarjetas blancas) resalte bien */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80"></div>
      </div>

      {/* --- CONTENIDO (DISEÑO ORIGINAL ZIG-ZAG) --- */}
      {/* Margen negativo para montarse sobre el sticky */}
      <div className="container mx-auto px-6 py-24 relative z-10 -mt-[100vh]"> 
        
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rose-600 font-bold uppercase tracking-widest text-sm mb-2 block bg-white/80 inline-block px-4 py-1 rounded-full backdrop-blur-md shadow-sm">
            Nuestra Trayectoria
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-sm">
            Caminando <span className="text-yellow-500">Juntos</span>
          </h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto font-medium bg-white/60 p-2 rounded-xl backdrop-blur-sm">
            Cada año ha sido un escalón más hacia nuestro sueño de una vejez digna para todos.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto pb-20">
          {/* Línea vertical central */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform md:-translate-x-1/2"></div>

          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={item.id}
                id={item.id}
                ref={el => itemsRef.current[index] = el} 
                className={`relative flex items-center justify-between mb-12 md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Espacio vacío para alternar lados */}
                <div className="hidden md:block w-5/12"></div>

                {/* Punto central (Icono) */}
                <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-xl z-10 ${item.color} text-white transition-transform duration-500 hover:scale-110`}>
                  <item.icon size={20} strokeWidth={2.5} />
                </div>

                {/* Tarjeta de Contenido (DISEÑO ORIGINAL RESTAURADO) */}
                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                  <div className={`
                    bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 
                    hover:-translate-y-1 transition-all duration-300 group
                    ${isEven ? 'md:text-right' : 'md:text-left'}
                    ${activeImage === item.image ? 'ring-2 ring-offset-2 ring-rose-200' : ''}
                  `}>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${item.color} shadow-md`}>
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
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