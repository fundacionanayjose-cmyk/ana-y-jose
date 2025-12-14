import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Copyright, AlertTriangle, Users } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-6 font-sans text-gray-700 leading-relaxed">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-gray-100">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-rose-600 font-bold mb-6 hover:underline transition-all">
            <ArrowLeft size={20} /> Regresar al Inicio
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl w-fit">
              <Scale size={40} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Términos y Condiciones de Uso</h1>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wider font-bold">Acuerdo Legal • {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>

        {/* Contenido Legal */}
        <div className="prose prose-stone max-w-none text-justify space-y-8">
          
          <p className="lead text-lg text-gray-600">
            Bienvenido al sitio web de la <strong>FUNDACIÓN ANA Y JOSÉ</strong> (en adelante "LA FUNDACIÓN"). Al acceder y utilizar este sitio, usted acepta cumplir con los siguientes términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, le rogamos abstenerse de usar nuestro sitio web.
          </p>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Copyright size={24} className="text-rose-600"/> 1. Propiedad Intelectual e Industrial
            </h3>
            <p>
              Todo el contenido alojado en este sitio web (textos, imágenes, logotipos, iconos, código fuente, diseño gráfico, videos y software) es propiedad exclusiva de <strong>LA FUNDACIÓN</strong> o de sus proveedores de contenido, y está protegido por las leyes nacionales (Decisión 351 de 1993, Ley 23 de 1982) e internacionales de derechos de autor.
            </p>
            <p className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 text-red-800 font-medium mt-2">
              <strong>Prohibición Estricta:</strong> Queda terminantemente prohibida la reproducción, copia, distribución, modificación o uso comercial de las fotografías de nuestros beneficiarios (adultos mayores y niños) sin autorización previa y por escrito. El uso indebido de la imagen de poblaciones vulnerables será perseguido legalmente.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Uso del Sitio Web</h3>
            <p>El usuario se compromete a:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hacer uso de la web únicamente para realizar consultas o donaciones legalmente válidas.</li>
              <li>No realizar donaciones falsas o fraudulentas. Si se pudiera considerar razonablemente que se ha hecho una donación de esta índole, estaremos autorizados a anularla e informar a las autoridades pertinentes.</li>
              <li>Facilitar datos de contacto veraces y exactos (correo electrónico, dirección y otros datos de contacto).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Política de Donaciones</h3>
            <p>
              Las donaciones realizadas a través de nuestra plataforma son voluntarias e irrevocables, destinadas al cumplimiento del objeto social de LA FUNDACIÓN (asistencia al adulto mayor).
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Certificados:</strong> LA FUNDACIÓN emitirá el certificado de donación correspondiente para efectos tributarios, previa solicitud y verificación del ingreso efectivo de los fondos.</li>
              <li><strong>Destinación Específica:</strong> Si el donante selecciona un programa específico (Nutrición, Vivienda, Salud), LA FUNDACIÓN hará sus mejores esfuerzos para destinar los recursos a dicho rubro; sin embargo, se reserva el derecho de redistribuir los excedentes a otras áreas críticas de la misión social si fuera necesario.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={24} className="text-yellow-600"/> 4. Limitación de Responsabilidad
            </h3>
            <p>
              LA FUNDACIÓN no será responsable de daños derivados del uso de este sitio, incluyendo pero no limitado a daños directos, indirectos, incidentales, punitivos y consecuentes. Tampoco garantizamos que el sitio esté libre de virus u otros componentes dañinos, aunque implementamos medidas de seguridad estándar.
            </p>
            <p>
              <strong>Enlaces a Terceros:</strong> Este sitio puede contener enlaces a sitios de terceros (ej. Wompi, PayPal). LA FUNDACIÓN no asume responsabilidad por el contenido, políticas de privacidad o prácticas de dichos sitios.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Voluntariado</h3>
            <p>
              El registro como voluntario a través de la web no constituye una relación laboral. La vinculación de voluntarios se rige por la legislación civil colombiana referente al voluntariado (Ley 720 de 2001), basada en la solidaridad y la gratuidad.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Modificaciones y Ley Aplicable</h3>
            <p>
              LA FUNDACIÓN se reserva el derecho de revisar y modificar estos términos en cualquier momento. El uso continuado del sitio tras cualquier cambio constituye la aceptación de los mismos. Estos términos se rigen e interpretan de acuerdo con las leyes de la <strong>República de Colombia</strong>. Cualquier controversia se someterá a los tribunales de Bogotá D.C.
            </p>
          </section>

          <div className="bg-gray-900 text-white p-8 rounded-2xl mt-12">
            <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Users className="text-rose-500"/> Información de Contacto Legal</h4>
            <p className="mb-2 opacity-90">Para notificaciones judiciales o consultas sobre estos términos:</p>
            <ul className="text-sm space-y-2 font-mono">
              <li>DIRECCIÓN: Calle 8 # 73-11, Barrio Castilla, Bogotá</li>
              <li>EMAIL: fundacionanayjose@gmail.com</li>
              <li>NIT: 901.372.375-0</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;