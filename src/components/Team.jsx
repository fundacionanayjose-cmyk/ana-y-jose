import React, { useState } from 'react';
import { X, Heart, Users, Star } from 'lucide-react'; // Cambié iconos sociales por unos más institucionales por ahora

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  // DATOS REALES BASADOS EN EL DOCUMENTO CIAMAJ
  const teamMembers = [
 
 
    {
      id: 3,
      name: "Profesionales de Salud",
      role: "Fisioterapia y Nutrición",
      // Foto sugerida de salud
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      bio: "Encargados de mantener el cuerpo en movimiento y sano. A través de fisioterapia, danzas y gimnasia, combaten el sedentarismo. El área de nutrición garantiza que cada almuerzo cumpla con los requerimientos dietarios específicos de nuestros abuelos."
    },
    {
      id: 4,
      name: "Equipo de Apoyo",
      role: "Logística y Cocina",
      // Foto sugerida de cocina/servicio
      image: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&q=80&w=800",
      bio: "El corazón operativo de la casa. Desde la preparación de alimentos calientes con amor, hasta el mantenimiento de espacios dignos y limpios. Su labor diaria es fundamental para que el Centro Integral funcione como un verdadero hogar."
    },
    {
      id: 5,
      name: "Cuerpo de Voluntarios",
      role: "Apoyo Transversal",
      // Foto sugerida de voluntarios
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800",
      bio: "Personas de gran corazón que donan su tiempo y talento. Apoyan en eventos, acompañamiento lúdico y logístico. Son la prueba viva de que la solidaridad intergeneracional existe y transforma vidas."
    },
    {
      id: 6,
      name: "Alianzas Externas",
      role: "Convenios Universitarios",
      // Foto sugerida de estudiantes/alianzas
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      bio: "Gracias a convenios con universidades como la Minuto de Dios y Monserrate, contamos con practicantes que aportan conocimientos frescos e innovación a nuestros procesos de intervención social."
    }
  ];

  return (
    // Agregué id="equipo" para que el enlace del menú funcione
    <section id="equipo" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-rose-600 font-bold uppercase tracking-wider text-sm mb-2 block">
            Talento Humano
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Profesionales y voluntarios unidos por una misma vocación de servicio.
          </p>
        </div>

        {/* GRID DE TARJETAS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer text-center"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg aspect-[4/5] border border-gray-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                    <Users size={16} /> Ver Perfil
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-rose-600 font-medium text-sm uppercase tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>

        {/* MODAL DETALLE */}
        {selectedMember && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedMember(null)}>
            <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-zoom-fade-in" onClick={(e) => e.stopPropagation()}>
              
              {/* Botón Cerrar */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-rose-100 hover:text-rose-600 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Imagen en Modal */}
              <div className="md:w-2/5 h-64 md:h-auto relative">
                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
              </div>

              {/* Info en Modal */}
              <div className="md:w-3/5 p-8 relative flex flex-col justify-center bg-white">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-1 leading-tight">{selectedMember.name}</h3>
                  <p className="text-rose-600 font-bold text-lg">{selectedMember.role}</p>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                  {selectedMember.bio}
                </p>

                <div className="flex gap-4 border-t border-gray-100 pt-6">
                   <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      <Star size={14} className="text-amber-400 fill-amber-400"/> Compromiso
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      <Heart size={14} className="text-rose-500 fill-rose-500"/> Servicio
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TeamSection;