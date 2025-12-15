import React from 'react';
import { X, MapPin, Activity, Heart } from 'lucide-react';
import Button from './Button';

const BeneficiaryDetailModal = ({ abuelo, isOpen, onClose, onSponsor }) => {
  if (!isOpen || !abuelo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay oscuro */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Contenido de la Tarjeta Grande */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-fade-in-up max-h-[90vh]">
        
        {/* Columna Izquierda: Foto */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={abuelo.foto} 
            alt={abuelo.nombre} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md transition-all md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Columna Derecha: Historia y Detalles */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{abuelo.nombre}</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="flex items-center gap-1 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <MapPin size={14} /> {abuelo.origen}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  <Activity size={14} /> {abuelo.diagnostico}
                </span>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hidden md:block"
            >
              <X size={28} />
            </button>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Su Historia</h4>
            <p className="text-gray-600 text-lg leading-relaxed italic">
              "{abuelo.historia}"
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-xl">
            <p className="text-sm font-bold text-yellow-800 uppercase mb-1">Necesidad Urgente</p>
            <p className="text-yellow-900 font-medium">{abuelo.necesidad}</p>
          </div>

          <div className="mt-auto">
            <Button 
              variant="primary" 
              className="w-full justify-center py-4 text-lg shadow-xl shadow-rose-200"
              onClick={() => onSponsor(abuelo)}
            >
              <Heart className="w-5 h-5 mr-2 fill-white animate-pulse" /> Apadrinar a {abuelo.nombre}
            </Button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Tu aporte será destinado 100% a su bienestar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDetailModal;