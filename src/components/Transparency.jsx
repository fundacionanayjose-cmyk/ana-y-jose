import React from 'react';
import { FileText, Download, ShieldCheck, Eye, FileType } from 'lucide-react';

const DocumentCard = ({ title, year, size, fileUrl, type }) => (
  <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-rose-200 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${type === 'PDF' ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
        {type === 'PDF' ? <FileText size={24} /> : <FileType size={24} />}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm md:text-base">{title}</h4>
        <p className="text-xs text-gray-500">{year} • {type} • {size}</p>
      </div>
    </div>
    
    <a 
      href={fileUrl} 
      download 
      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
      title="Descargar Documento"
    >
      <Download size={20} />
    </a>
  </div>
);

const Transparency = () => {
  // DOCUMENTOS REALES DE LA CARPETA PUBLIC/LEGAL
  const documents = [
    { 
      title: "Cámara de Comercio", 
      year: "Julio 2025", 
      size: "162 KB", 
      type: "PDF",
      fileUrl: "/legal/camara y comercio 07 de julio 2025.pdf" 
    },
    { 
      title: "Registro Único Tributario (RUT)", 
      year: "Julio 2025", 
      size: "269 KB", 
      type: "PDF",
      fileUrl: "/legal/RUT fundacion ana y jose julio 2025.pdf" 
    },
    { 
      title: "Informe de Gestión", 
      year: "2023", 
      size: "9.5 MB", 
      type: "DOCX",
      fileUrl: "/legal/INFORME DE GESTION 2023.docx" 
    },
    { 
      title: "Estado de Cuenta", 
      year: "2025", 
      size: "36 KB", 
      type: "PDF",
      fileUrl: "/legal/Estado de cuenta.pdf" 
    },
    { 
      title: "Misión, Visión y Valores", 
      year: "2025", 
      size: "123 KB", 
      type: "DOCX",
      fileUrl: "/legal/MISION-VISION-VALORES.docx" 
    },
  ];

  return (
    <section id="transparencia" className="py-20 bg-stone-50 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Mensaje */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6">
              <ShieldCheck size={18} /> Entidad Vigilada y Legal
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nuestras cuentas son claras, <br/>
              <span className="text-rose-600">nuestra labor es transparente.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              En la Fundación Ana y José, creemos que la confianza es el pilar de la solidaridad. Por eso, ponemos a disposición pública nuestra documentación legal y financiera al día.
            </p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start">
              <Eye className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Vigilancia y Control</h4>
                <p className="text-sm text-gray-500">
                  Somos una Entidad Sin Ánimo de Lucro (ESAL) debidamente constituida y vigilada por la Alcaldía Mayor de Bogotá.
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Descargas */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
              Documentación Legal
            </h3>
            <div className="space-y-4">
              {documents.map((doc, idx) => (
                <DocumentCard key={idx} {...doc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transparency;