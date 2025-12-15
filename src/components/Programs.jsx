import React from 'react';
import { ArrowRight, Sun } from 'lucide-react'; // Solo necesitamos iconos utilitarios
import { Link } from 'react-router-dom';
import { programsData } from '../data/programs';

const Programs = () => {
  return (
    <section id="programas" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-rose-600 font-bold uppercase tracking-wider text-sm">
            Nuestros Pilares
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            Programas Sociales
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((program) => {
            // CORRECCIÓN: Usamos directamente el icono que viene en los datos
            // Ya no hace falta el iconMap porque program.icon YA ES el componente
            const IconComponent = program.icon || Sun; 

            return (
              <div key={program.id} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${program.color}20` }}
                >
                  <IconComponent size={28} style={{ color: program.color }} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                  {program.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {program.shortDesc}
                </p>

                <Link 
                  to={`/proyecto/${program.id}`} 
                  className="inline-flex items-center font-bold text-sm tracking-wide transition-all group-hover:translate-x-2"
                  style={{ color: program.color }}
                >
                  CONOCER MÁS <ArrowRight size={16} className="ml-2" />
                </Link>
                
                <div 
                  className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: program.color }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;