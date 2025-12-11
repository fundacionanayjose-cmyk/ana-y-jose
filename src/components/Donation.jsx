import React from 'react';
import { Trophy, HandHeart } from 'lucide-react';
import Button from './Button';

const Donation = () => {
  return (
    <section id="donar" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Fondos abstractos con colores corporativos */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-900/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-900/20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Columna Izquierda: Mensaje */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Tu ayuda transforma vidas.</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Cada aporte se convierte en un plato de sopa caliente, una medicina o una sonrisa.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-500 p-2 rounded-full mt-1"><Trophy className="w-5 h-5 text-gray-900"/></div>
                <div>
                  <h4 className="font-bold text-lg">Plan Padrino</h4>
                  <p className="text-gray-400">Apoyo mensual recurrente para un abuelo específico.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-2 rounded-full mt-1"><HandHeart className="w-5 h-5 text-white"/></div>
                <div>
                  <h4 className="font-bold text-lg">Donación Única</h4>
                  <p className="text-gray-400">Aportes voluntarios libres (dinero o especie).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Pagos */}
          <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Medios de Donación</h3>
            
            <div className="space-y-4">
              {/* Botón Nequi */}
              <div className="p-4 border border-gray-200 rounded-xl hover:border-rose-500 cursor-pointer transition-all flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center text-white font-bold">N</div>
                  <span className="font-bold text-lg">Nequi</span>
                </div>
                <span className="text-gray-500 group-hover:text-rose-600 font-mono">300 123 4567</span>
              </div>

              {/* Botón Daviplata */}
              <div className="p-4 border border-gray-200 rounded-xl hover:border-rose-500 cursor-pointer transition-all flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">D</div>
                  <span className="font-bold text-lg">Daviplata</span>
                </div>
                <span className="text-gray-500 group-hover:text-rose-600 font-mono">300 123 4567</span>
              </div>

              {/* Datos Bancarios */}
              <div className="p-4 border border-gray-200 rounded-xl hover:border-rose-500 cursor-pointer transition-all bg-gray-50">
                 <p className="font-bold text-lg mb-1 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Bancolombia Ahorros
                 </p>
                 <p className="text-gray-600 font-mono text-xl">123-456789-00</p>
                 <p className="text-xs text-gray-400 mt-1">NIT: 900.123.456-7</p>
              </div>

              {/* Botón WhatsApp Corregido */}
              {/* IMPORTANTE: Sin el símbolo '+' */}
              <a href="https://wa.me/573145520393" target="_blank" rel="noreferrer" className="block">
                <Button variant="primary" className="w-full mt-4">
                  Reportar Donación (WhatsApp)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;