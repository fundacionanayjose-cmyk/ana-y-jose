import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';
import Button from './Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center text-center px-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg border-2 border-rose-50">
        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
          <Heart size={48} className="animate-pulse fill-current" />
        </div>
        
        <h1 className="text-6xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Página no encontrada</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Parece que te has perdido, pero no te preocupes. 
          En nuestra fundación, <span className="text-rose-600 font-bold">siempre hay un camino de regreso a casa</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" className="w-full justify-center">
              <Home size={18} className="mr-2" /> Ir al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;