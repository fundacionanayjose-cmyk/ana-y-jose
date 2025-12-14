import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  // Asegura que al entrar la vista esté arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <Link to="/" className="inline-flex items-center gap-2 text-rose-600 font-bold mb-8 hover:underline">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-10 h-10 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-900">Política de Tratamiento de Datos</h1>
        </div>

        <div className="prose prose-stone text-gray-600 text-justify">
          <p className="mb-4">
            En cumplimiento de la <strong>Ley 1581 de 2012</strong> y el Decreto 1377 de 2013, la <strong>FUNDACIÓN ANA Y JOSÉ</strong> informa que es responsable del tratamiento de los datos personales recolectados a través de este sitio web.
          </p>
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">1. Finalidad</h3>
          <p className="mb-4">
            Sus datos serán usados exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Envío de certificados de donación.</li>
              <li>Información sobre campañas y eventos de la fundación.</li>
              <li>Contacto para procesos de voluntariado y coordinación de ayudas.</li>
          </ul>
          
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">2. Sus Derechos</h3>
          <p className="mb-4">
            Como titular, usted tiene derecho a conocer, actualizar y rectificar sus datos personales, así como a solicitar la supresión de los mismos de nuestras bases de datos en cualquier momento.
          </p>
          <p className="mt-8 pt-8 border-t border-gray-200 text-sm">
            Para ejercer sus derechos, por favor escriba a: <strong>fundacionanayjose@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;