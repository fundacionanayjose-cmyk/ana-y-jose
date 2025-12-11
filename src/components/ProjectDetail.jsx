import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import { programsData } from '../data/programs'; // Importamos los datos
import Button from './Button';

const ProjectDetail = () => {
  const { id } = useParams(); // Capturamos el ID de la URL (ej: /proyecto/nutricion)
  const project = programsData.find(p => p.id === id);

  // Scroll al inicio al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div className="text-center py-20">Proyecto no encontrado</div>;

  const Icon = project.icon;

  return (
    <div className="bg-stone-50 min-h-screen">
      
      {/* Navbar Simplificado para la página interna */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center text-white">
        <Link to="/" className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/50 transition-all">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>
      </nav>

      {/* Hero Image del Proyecto */}
      <header className="relative h-[60vh] min-h-[400px]">
        <img 
          src={project.heroImage} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white mb-4 border border-white/20">
              <Icon size={20} style={{ color: project.color }} />
              <span className="font-bold uppercase tracking-wide text-sm">Programa Oficial</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl">
              {project.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Contenido Detallado */}
      <div className="container mx-auto px-6 py-16 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: Información */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre el Proyecto</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {project.longDesc}
            </p>

            {/* Estadísticas de Impacto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center">
                  <div className="text-3xl font-extrabold text-gray-900 mb-1" style={{ color: project.color }}>
                    {stat.number}
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Galería del Programa</h3>
            <div className="grid grid-cols-2 gap-4">
              {project.gallery.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Galería ${idx}`} 
                  className="rounded-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=500"}
                />
              ))}
            </div>
          </div>

          {/* Columna Derecha: Call to Action (Pegajoso) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 sticky top-8" style={{ borderColor: project.color }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Apoya esta causa</h3>
              <p className="text-gray-500 mb-6 text-sm">Tu aporte va dirigido 100% a este programa específico.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600">
                  <CheckCircle size={20} className="text-green-500" /> Donación segura
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <CheckCircle size={20} className="text-green-500" /> Certificado de donación
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <CheckCircle size={20} className="text-green-500" /> Reporte de impacto
                </li>
              </ul>

              <Button variant="primary" className="w-full justify-center mb-4" style={{ backgroundColor: project.color }}>
                <Heart className="w-4 h-4 mr-2 fill-white" /> Donar a este Proyecto
              </Button>
              
              <Link to="/" className="block text-center text-gray-400 hover:text-gray-600 text-sm font-medium">
                ¿Tienes dudas? Contáctanos
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;