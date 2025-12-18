import React from 'react';
import { X, MapPin, Activity, Heart } from 'lucide-react';
import Button from './Button';

const BeneficiaryDetailModal = ({ beneficiary, isOpen, onClose, onDonate }) => {
  if (!isOpen || !beneficiary) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-fade-in-up max-h-[90vh]">
        
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={beneficiary.foto} 
            alt={beneficiary.nombre} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 text-white bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-md transition-all md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{beneficiary.nombre}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full">
                  <Activity size={14} className="text-rose-500" /> {beneficiary.edad} años
                </span>
                <span className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full">
                  <MapPin size={14} className="text-blue-500" /> {beneficiary.origen}
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
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Su historia</h4>
            <p className="text-gray-600 text-lg leading-relaxed italic">
              "{beneficiary.historia}"
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-xl">
            <p className="text-sm font-bold text-yellow-800 uppercase mb-1">Necesidad urgente</p>
            <p className="text-yellow-900 font-medium">{beneficiary.necesidad}</p>
          </div>

          <div className="mt-auto">
            <Button 
              variant="primary" 
              className="w-full justify-center py-4 text-lg shadow-xl shadow-rose-200"
              onClick={() => onDonate(beneficiary)}
            >
              <Heart className="w-5 h-5 mr-2 fill-white animate-pulse" /> Apadrinar a {beneficiary.nombre}
            </Button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Serás redirigido al formulario de contacto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDetailModal;