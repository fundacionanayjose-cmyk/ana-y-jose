import React from 'react';
import { Link } from 'react-router-dom'; 
import { ArrowRight, Clock, Heart, HandHeart, Smile } from 'lucide-react';

// Integramos los datos directamente aquí para evitar errores de importación
const programsData = [
  {
    id: 'nutricion',
    title: "Nutrición con Amor",
    shortDesc: "Garantizamos seguridad alimentaria con menús balanceados diseñados por expertos.",
    icon: Clock,
    color: "#e11d48", // Rose-600
  },
  {
    id: 'salud',
    title: "Salud Integral",
    shortDesc: "Jornadas médicas, fisioterapia y acompañamiento psicológico continuo.",
    icon: Heart,
    color: "#1e40af", // Blue-800
  },
  {
    id: 'vivienda',
    title: "Vivienda Digna",
    shortDesc: "Mejoramiento de espacios habitacionales para asegurar un entorno seguro.",
    icon: HandHeart,
    color: "#ca8a04", // Yellow-600
  },
  {
    id: 'recreacion',
    title: "Recreación y Vida",
    shortDesc: "Arte, danza, paseos y talleres para mantener la alegría y la agilidad mental.",
    icon: Smile,
    color: "#16a34a", // Green-600
  }
];

const Programs = () => {
  return (
    <section id="programas" className="py-20 bg-white relative">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-stone-50 to-white"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Pilares</h2>
          <p className="text-xl text-gray-600">Abordamos la vejez de manera integral. Haz clic en cada uno para conocer el impacto en detalle.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programsData.map((prog) => {
            const Icon = prog.icon;
            return (
              <Link 
                key={prog.id} 
                to={`/proyecto/${prog.id}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:-translate-y-2 flex flex-col h-full cursor-pointer" 
                style={{ borderColor: prog.color }}
              >
                {/* Icono */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12`} style={{ backgroundColor: `${prog.color}20` }}>
                  <Icon className="w-8 h-8" style={{ color: prog.color }} />
                </div>
                
                {/* Título */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors">
                  {prog.title}
                </h3>
                
                {/* Descripción Corta */}
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {prog.shortDesc}
                </p>
                
                {/* Botón "Ver detalles" */}
                <div className="flex items-center text-sm font-bold uppercase tracking-wider mt-auto group-hover:underline" style={{ color: prog.color }}>
                  Ver detalles <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;