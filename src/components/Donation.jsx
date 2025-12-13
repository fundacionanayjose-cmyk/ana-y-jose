import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  Trophy, CreditCard, Lock, QrCode, Download, CheckCircle, 
  User, FileText, AlertTriangle, Phone, Mail, Package, Heart, Globe 
} from 'lucide-react';
import Button from './Button';

const Donation = () => {
  // --- ESTADOS ---
  const [donationType, setDonationType] = useState('money'); // 'money' | 'kind' (especie)
  const [amount, setAmount] = useState('50000');
  const [customAmount, setCustomAmount] = useState('');
  
  // Datos del donante más robustos
  const [donorData, setDonorData] = useState({ 
    name: '', 
    id: '', 
    email: '', 
    phone: '', 
    type: 'Persona Natural', // Persona Natural o Jurídica
    itemDescription: '', // Para donación en especie
    pickupAddress: ''    // Para donación en especie
  });
  
  const [step, setStep] = useState(1); // 1: Datos, 2: Pago/Coordinación, 3: Certificado/Gracias
  const wompiRef = useRef(null);

  // --- 1. LÓGICA DE WOMPI ---
  useEffect(() => {
    if (step === 2 && donationType === 'money' && wompiRef.current) {
      wompiRef.current.innerHTML = ''; 

      const finalAmount = customAmount || amount;
      // Validación básica
      if (!finalAmount || parseInt(finalAmount) < 1500) return;

      const amountInCents = finalAmount + '00'; 

      const script = document.createElement('script');
      script.src = 'https://checkout.wompi.co/widget.js';
      script.setAttribute('data-render', 'button');
      script.setAttribute('data-public-key', 'pub_test_Q5yDA9N9W3uW3a0a1a2b3c4d5e6f7g8h'); // TU LLAVE
      script.setAttribute('data-currency', 'COP');
      script.setAttribute('data-amount-in-cents', amountInCents);
      script.setAttribute('data-reference', `DON-${Date.now()}-${donorData.id}`);
      script.setAttribute('data-redirect-url', window.location.href); 
      
      script.onerror = () => console.warn("Error cargando Wompi");
      wompiRef.current.appendChild(script);
    }
  }, [step, amount, customAmount, donorData.id, donationType]);

  // --- 2. GENERAR CERTIFICADO (Solo Dinero) ---
  const generateCertificate = () => {
    const doc = new jsPDF();
    const donationDate = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    const finalAmount = parseInt(customAmount || amount).toLocaleString('es-CO');
    
    // Marco y Fondo
    doc.setDrawColor(225, 29, 72); 
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 190, 277);
    doc.setDrawColor(200, 200, 200); 
    doc.setLineWidth(0.5);
    doc.rect(15, 15, 180, 267);

    // Marca de Agua
    doc.setTextColor(245, 245, 245);
    doc.setFontSize(60);
    doc.setFont('helvetica', 'bold');
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.1 })); 
    doc.text("FUNDACIÓN ANA Y JOSÉ", 105, 150, { align: 'center', angle: 45 });
    doc.restoreGraphicsState();

    // Logo
    try {
        const logoUrl = "/galeria/LOGO.png"; 
        doc.addImage(logoUrl, 'PNG', 85, 25, 40, 40); 
    } catch (e) { console.warn("No logo"); }

    // Cabecera
    doc.setTextColor(50, 50, 50); 
    doc.setFont('times', 'bold'); 
    doc.setFontSize(24);
    doc.text('CERTIFICADO DE DONACIÓN', 105, 80, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text('NIT: 901.372.375-0 | Régimen Tributario Especial', 105, 87, { align: 'center' });

    // Cuerpo
    doc.setTextColor(0);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    const introText = "LA SUSCRITA REPRESENTANTE LEGAL DE LA FUNDACIÓN ANA Y JOSÉ, ENTIDAD SIN ÁNIMO DE LUCRO DEBIDAMENTE INSCRITA.";
    doc.text(doc.splitTextToSize(introText, 160), 105, 110, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('HACE CONSTAR QUE:', 105, 130, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`El donante tipo ${donorData.type}:`, 25, 145);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(225, 29, 72); 
    doc.text(donorData.name.toUpperCase(), 105, 155, { align: 'center' });
    
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Identificado(a) con C.C./NIT: ${donorData.id}`, 105, 165, { align: 'center' });
    doc.text(`Teléfono de contacto: ${donorData.phone}`, 105, 172, { align: 'center' });

    doc.text('Ha efectuado una donación por valor de:', 25, 190);
    
    doc.setFillColor(245, 245, 245);
    doc.rect(25, 195, 160, 15, 'F'); 
    doc.setFont('courier', 'bold'); 
    doc.setFontSize(14);
    doc.text(`$ ${finalAmount} PESOS M/CTE`, 105, 205, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(11);
    doc.text(`Fecha de recepción: Bogotá D.C., ${donationDate}`, 105, 225, { align: 'center' });

    // Firma
    doc.setDrawColor(0);
    doc.line(75, 255, 135, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('ANA / JOSÉ', 105, 260, { align: 'center' });
    doc.text('Representante Legal', 105, 265, { align: 'center' });

    doc.save(`Certificado_${donorData.name.replace(/\s+/g, '_')}.pdf`);
  };

  // Validación
  const handleNext = (e) => {
    e.preventDefault();
    if (donationType === 'money') {
        if (donorData.name && donorData.id && donorData.email && donorData.phone && (amount || customAmount)) {
            setStep(2);
        } else {
            alert("Por favor completa todos los campos obligatorios (*)");
        }
    } else {
        // Validación para especie
        if (donorData.name && donorData.phone && donorData.itemDescription) {
            setStep(2);
        } else {
            alert("Cuéntanos qué deseas donar y déjanos tu contacto.");
        }
    }
  };

  // Función para coordinar donación en especie por WhatsApp
  const handleInKindCoordination = () => {
      const message = `Hola Fundación Ana y José, mi nombre es ${donorData.name}. Deseo donar: ${donorData.itemDescription}. Mi dirección es: ${donorData.pickupAddress || 'A coordinar'}.`;
      window.open(`https://wa.me/573145520393?text=${encodeURIComponent(message)}`, '_blank');
      setStep(3); // Pasamos a agradecimiento
  };

  return (
    <section id="donar" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-900/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-900/20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tu Ayuda nos Mueve</h2>
          <p className="text-xl text-gray-300">Elige cómo quieres transformar vidas hoy.</p>
        </div>

        <div className="max-w-5xl mx-auto bg-white text-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* --- BARRA LATERAL --- */}
          <div className="bg-gray-50 p-8 md:w-1/3 border-r border-gray-100 flex flex-col">
             {/* Selector de Tipo de Donación */}
             <div className="mb-8 p-1 bg-gray-200 rounded-xl flex">
                 <button 
                    onClick={() => { setDonationType('money'); setStep(1); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'money' ? 'bg-white shadow text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                    Dinero
                 </button>
                 <button 
                    onClick={() => { setDonationType('kind'); setStep(1); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'kind' ? 'bg-white shadow text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                    En Especie
                 </button>
             </div>

             <div className="space-y-6 flex-grow">
               <div className={`flex items-center gap-3 ${step >= 1 ? 'text-rose-600' : 'text-gray-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-rose-100' : 'bg-gray-200'}`}>1</div>
                 <span className="font-bold">Datos</span>
               </div>
               <div className={`flex items-center gap-3 ${step >= 2 ? 'text-rose-600' : 'text-gray-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-rose-100' : 'bg-gray-200'}`}>2</div>
                 <span className="font-bold">{donationType === 'money' ? 'Pago' : 'Coordinar'}</span>
               </div>
               <div className={`flex items-center gap-3 ${step >= 3 ? 'text-rose-600' : 'text-gray-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-rose-100' : 'bg-gray-200'}`}>3</div>
                 <span className="font-bold">Finalizar</span>
               </div>
             </div>
             
             {donationType === 'money' && (
                <div className="mt-8 bg-blue-50 p-4 rounded-xl text-xs text-blue-900 border border-blue-100">
                    <p className="flex items-center gap-2 font-bold mb-1"><FileText size={14}/> Certificado Legal</p>
                    Recibe automáticamente tu certificado para deducción de impuestos.
                </div>
             )}
          </div>

          {/* --- CONTENIDO PRINCIPAL --- */}
          <div className="p-8 md:w-2/3 flex flex-col justify-center bg-white relative">
            
            {/* PASO 1: FORMULARIO ROBUSTO */}
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-5 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {donationType === 'money' ? <CreditCard className="text-rose-600"/> : <Package className="text-rose-600"/>}
                    {donationType === 'money' ? 'Aporte Económico' : 'Donar Artículos'}
                </h3>
                
                {/* Datos Comunes */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Nombre Completo *</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400 w-4 h-4"/>
                        <input type="text" required className="w-full pl-9 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Tu nombre" value={donorData.name} onChange={(e) => setDonorData({...donorData, name: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Teléfono / WhatsApp *</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4"/>
                        <input type="tel" required className="w-full pl-9 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" placeholder="300 123 4567" value={donorData.phone} onChange={(e) => setDonorData({...donorData, phone: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* Campos Específicos DINERO */}
                {donationType === 'money' && (
                    <>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Correo Electrónico *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4"/>
                                    <input type="email" required className="w-full pl-9 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" placeholder="email@ejemplo.com" value={donorData.email} onChange={(e) => setDonorData({...donorData, email: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">C.C. o NIT (Para Certificado) *</label>
                                <input type="number" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Número sin puntos" value={donorData.id} onChange={(e) => setDonorData({...donorData, id: e.target.value})} />
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                           <label className="text-sm font-bold text-gray-700">Monto a Donar (COP)</label>
                           <div className="grid grid-cols-3 gap-2">
                             {['50000', '100000', '200000'].map((val) => (
                               <button type="button" key={val} className={`py-2 px-3 rounded-lg text-sm font-bold border transition-all ${amount === val && !customAmount ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-200 text-gray-600 hover:border-rose-300'}`} onClick={() => { setAmount(val); setCustomAmount(''); }}>
                                 ${parseInt(val).toLocaleString()}
                               </button>
                             ))}
                           </div>
                           <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Otro valor (COP)" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} />
                        </div>
                    </>
                )}

                {/* Campos Específicos ESPECIE */}
                {donationType === 'kind' && (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">¿Qué deseas donar? *</label>
                            <textarea required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none h-24 resize-none" placeholder="Ej: Ropa de niño talla 8, Alimentos no perecederos, Silla de ruedas..." value={donorData.itemDescription} onChange={(e) => setDonorData({...donorData, itemDescription: e.target.value})}></textarea>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Dirección de Recogida (Opcional)</label>
                            <input type="text" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Si necesitas que pasemos por ello" value={donorData.pickupAddress} onChange={(e) => setDonorData({...donorData, pickupAddress: e.target.value})} />
                        </div>
                    </>
                )}

                <Button variant="primary" className="w-full py-3 shadow-lg mt-2">
                  Continuar
                </Button>
              </form>
            )}

            {/* PASO 2: PAGO O COORDINACIÓN */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                {donationType === 'money' ? (
                    <>
                        <div className="text-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Método de Pago</h3>
                            <p className="text-gray-500 text-sm">Estás donando: <span className="font-bold text-rose-600">${parseInt(customAmount || amount).toLocaleString()} COP</span></p>
                        </div>
                        
                        {/* Wompi Widget */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                            <p className="font-bold text-gray-700 mb-2 text-sm flex items-center justify-center gap-2"><CreditCard size={16}/> Tarjetas / PSE / Nequi (Colombia)</p>
                            <div className="min-h-[50px] flex items-center justify-center"><form ref={wompiRef}></form></div>
                        </div>

                        {/* Botón PayPal NUEVO */}
                        <a href="https://www.paypal.com/donate/?hosted_button_id=TU_ID_PAYPAL" target="_blank" rel="noopener noreferrer" className="block">
                            <div className="bg-[#003087] hover:bg-[#00256b] text-white rounded-xl p-4 text-center shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2">
                                <Globe size={18} /> Donar con PayPal (Internacional)
                            </div>
                        </a>

                        {/* Simulación para Pruebas */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center mt-4">
                           <button onClick={() => setStep(3)} className="text-yellow-700 font-bold text-xs hover:underline flex items-center justify-center gap-1 w-full">
                             <AlertTriangle size={12}/> Simular Pago Exitoso (Modo Prueba)
                           </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-pulse"/>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por tu generosidad!</h3>
                        <p className="text-gray-600 mb-6">
                            Para las donaciones en especie, necesitamos coordinar la logística. Al hacer clic abajo, se abrirá WhatsApp con los detalles de tu donación listos para enviar.
                        </p>
                        <button onClick={handleInKindCoordination} className="w-full bg-[#25D366] hover:bg-[#128c7e] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" /> Coordinar por WhatsApp
                        </button>
                    </div>
                )}
              </div>
            )}

            {/* PASO 3: FINALIZACIÓN */}
            {step === 3 && (
              <div className="text-center animate-fade-in-up py-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h3 className="text-3xl font-extrabold text-gray-800 mb-2">¡Misión Cumplida!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {donationType === 'money' 
                        ? "Tu aporte financiero ha sido registrado. Puedes descargar tu certificado legal ahora mismo." 
                        : "Gracias por iniciar el proceso. Nuestro equipo te responderá en WhatsApp para recibir tus artículos."}
                </p>
                
                {donationType === 'money' && (
                    <button onClick={generateCertificate} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl shadow-xl flex items-center justify-center gap-3 transition-transform hover:scale-105">
                      <Download className="w-6 h-6" /> Descargar Certificado PDF
                    </button>
                )}
                
                <button onClick={() => { setStep(1); setDonorData({name:'', id:'', email:'', phone:'', type:'Persona Natural', itemDescription:'', pickupAddress:''}); }} className="mt-8 text-rose-600 font-bold text-sm hover:underline block mx-auto">
                  Hacer otra donación
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;