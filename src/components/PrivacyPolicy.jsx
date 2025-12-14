import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// CORRECCIÓN: Se agregó 'Heart' a la lista de importaciones
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Heart } from 'lucide-react';

const PrivacyPolicy = () => {
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
              <ShieldCheck size={40} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Política de Tratamiento de Datos Personales</h1>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wider font-bold">Actualizado: 2025 • Cumplimiento Ley 1581 de 2012</p>
            </div>
          </div>
        </div>

        {/* Contenido Legal */}
        <div className="prose prose-stone max-w-none text-justify space-y-8">
          
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-2">1. Identificación del Responsable</h3>
            <p className="text-sm md:text-base text-blue-800 m-0">
              <strong>Razón Social:</strong> FUNDACIÓN ANA Y JOSÉ<br/>
              <strong>NIT:</strong> 901.372.375-0<br/>
              <strong>Domicilio Principal:</strong> Bogotá D.C., Colombia<br/>
              <strong>Dirección de Notificación:</strong> Calle 8 # 73-11, Barrio Castilla<br/>
              <strong>Email:</strong> fundacionanayjose@gmail.com<br/>
              <strong>Teléfono:</strong> 314 552 0393
            </p>
          </div>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Marco Normativo y Objetivo</h3>
            <p>
              La presente política se rige por lo dispuesto en la Constitución Política de Colombia (Art. 15 y 20), la <strong>Ley 1581 de 2012</strong>, el Decreto Reglamentario 1377 de 2013 y demás normas concordantes. Su objetivo es garantizar el derecho constitucional que tienen todas las personas a conocer, actualizar y rectificar las informaciones que se hayan recogido sobre ellas en bases de datos o archivos de la <strong>FUNDACIÓN ANA Y JOSÉ</strong>.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Definiciones Clave</h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-rose-500">
              <li><strong>Dato Personal:</strong> Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</li>
              <li><strong>Datos Sensibles:</strong> Aquellos que afectan la intimidad del Titular o cuyo uso indebido puede generar su discriminación (ej. estado de salud, datos biométricos).</li>
              <li><strong>Titular:</strong> Persona natural cuyos datos personales sean objeto de Tratamiento (Donantes, Voluntarios, Beneficiarios).</li>
              <li><strong>Tratamiento:</strong> Cualquier operación sobre datos personales, tales como la recolección, almacenamiento, uso, circulación o supresión.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Finalidad del Tratamiento</h3>
            <p>La Fundación recolecta datos con las siguientes finalidades específicas:</p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Heart size={18} className="text-rose-500"/> Gestión de Donantes</h4>
                <p className="text-sm">Procesamiento de aportes, emisión de certificados de donación para beneficios tributarios, y reporte de información a la DIAN cuando aplique.</p>
              </div>
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Lock size={18} className="text-rose-500"/> Datos Sensibles</h4>
                <p className="text-sm">Manejo de historias clínicas, datos nutricionales y psicosociales de los adultos mayores beneficiarios, exclusivamente para la prestación del servicio social.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Derechos del Titular</h3>
            <p>Como titular de los datos, usted tiene derecho a:</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Conocer, actualizar y rectificar sus datos personales frente a la Fundación.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado sobre el uso que se le ha dado a sus datos personales.</li>
              <li>Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a la ley.</li>
              <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios constitucionales.</li>
              <li>Acceder en forma gratuita a sus datos personales.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Seguridad y Pasarelas de Pago</h3>
            <p>
              La Fundación <strong>NO almacena</strong> información financiera sensible (números de tarjetas de crédito, códigos CVC) en sus servidores. Todas las transacciones de donación se realizan a través de pasarelas de pago certificadas (como Wompi, ePayco o entidades bancarias directas) que cumplen con los estándares de seguridad PCI DSS.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Procedimiento para Consultas y Reclamos</h3>
            <p>
              Para ejercer sus derechos, el Titular puede enviar una solicitud escrita al correo electrónico <strong>fundacionanayjose@gmail.com</strong>. La solicitud debe contener:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nombre completo e identificación del Titular.</li>
              <li>Descripción de los hechos que dan lugar al reclamo o consulta.</li>
              <li>Dirección de correspondencia (física o electrónica).</li>
              <li>Documentos que quiera hacer valer.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              * La Fundación responderá las consultas en un término máximo de diez (10) días hábiles y los reclamos en quince (15) días hábiles.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">8. Vigencia</h3>
            <p>
              La presente Política de Tratamiento de Información entra en vigencia a partir de su publicación. Las bases de datos tendrán una vigencia igual al tiempo en que se mantenga y utilice la información para las finalidades descritas, y se conservarán mientras no se solicite su supresión por el interesado y siempre que no exista un deber legal de conservarlos.
            </p>
          </section>

        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-sm">
            Fundación Ana y José © {new Date().getFullYear()} - Entidad Sin Ánimo de Lucro vigilada.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;