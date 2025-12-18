import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, CheckCircle, Sun } from 'lucide-react'; 
import { programsData } from '../data/programs';
import Button from './Button';
import Modal from './Modal';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = programsData.find(p => p.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div className="text-center py-20">Proyecto no encontrado</div>;

  const IconComponent = project.icon || Sun;

  return (
    <div className="bg-stone-50 min-h-screen relative">
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        preSelectedBeneficiary={`Proyecto: ${project.title}`} 
      />

      {/* Navbar simplificado para detalle */}
      <nav className="absolute top-0 w-full z-20 p-6 flex justify-between items-center text-white">
        <Link to="/" className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-all border border-white/10">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>
      </nav>

      <header className="relative h-[60vh] min-h-[400px]">
        <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-gray-900 mb-4 shadow-lg">
              <IconComponent size={20} style={{ color: project.color }} />
              <span className="font-bold uppercase tracking-wide text-xs">Estrategia CIAMAJ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg shadow-black">
              {project.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 rounded-full" style={{ backgroundColor: project.color }}></span>
              Sobre esta Estrategia
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 text-justify">
              {project.longDesc}
            </p>

            {/* --- SECCIÓN DE MÉTRICAS ELIMINADA --- */}

            <h3 className="text-xl font-bold text-gray-900 mb-6">Galería del Programa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-xl h-64 group">
                  <img 
                    src={img} 
                    alt={`Galería ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=500"}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 sticky top-8" style={{ borderColor: project.color }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Apoya esta causa</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Tu aporte nos ayuda a sostener las actividades de <strong>{project.title}</strong>.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <CheckCircle size={18} className="text-green-500 shrink-0" /> Donación 100% segura
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <CheckCircle size={18} className="text-green-500 shrink-0" /> Certificado de donación
                </li>
                <li className="flex items-center gap-3 text-gray-600 text-sm">
                  <CheckCircle size={18} className="text-green-500 shrink-0" /> Impacto directo local
                </li>
              </ul>

              <Button 
                variant="primary" 
                className="w-full justify-center mb-4 py-4 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" 
                style={{ backgroundColor: project.color, borderColor: project.color }}
                onClick={() => setIsModalOpen(true)}
              >
                <Heart className="w-5 h-5 mr-2 fill-white animate-pulse" /> Patrocinar
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">¿Quieres ser voluntario en este programa?</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-500 hover:text-gray-800 text-sm font-medium underline decoration-dotted"
                >
                  Postúlate aquí
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;