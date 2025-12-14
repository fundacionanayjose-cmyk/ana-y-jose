import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  CreditCard, Download, CheckCircle, 
  User, FileText, AlertTriangle, Phone, Mail, Package, Heart, Globe 
} from 'lucide-react';
import Button from './Button';
import { supabase } from '../supabaseClient'; 

const Donation = () => {
  const [donationType, setDonationType] = useState('money'); 
  const [amount, setAmount] = useState('50000');
  const [customAmount, setCustomAmount] = useState('');
  
  // NUEVO: Estado del Checkbox
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [donorData, setDonorData] = useState({ 
    name: '', 
    id: '', 
    email: '', 
    phone: '', 
    type: 'Persona Natural', 
    itemDescription: '', 
    pickupAddress: ''    
  });
  
  const [step, setStep] = useState(1); 
  const [isSaving, setIsSaving] = useState(false); 
  const wompiRef = useRef(null);

  const saveToDatabase = async () => {
    setIsSaving(true);
    try {
      const finalAmount = customAmount || amount;
      const descripcion = donationType === 'money' 
        ? `Donación Económica: $${finalAmount}` 
        : `Especie: ${donorData.itemDescription}`;

      const { error } = await supabase
        .from('contactos')
        .insert([{
          nombre: donorData.name,
          telefono: donorData.phone,
          email: donorData.email,
          tipo_ayuda: 'Donante', 
          monto: donationType === 'money' ? finalAmount : null,
          mensaje: descripcion,
          direccion: donorData.pickupAddress,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Error guardando donante:", err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (step === 2 && donationType === 'money' && wompiRef.current) {
      wompiRef.current.innerHTML = ''; 

      const finalAmount = customAmount || amount;
      if (!finalAmount || parseInt(finalAmount) < 1500) return;

      const amountInCents = finalAmount + '00'; 

      const script = document.createElement('script');
      script.src = 'https://checkout.wompi.co/widget.js';
      script.setAttribute('data-render', 'button');
      script.setAttribute('data-public-key', 'pub_test_Q5yDA9N9W3uW3a0a1a2b3c4d5e6f7g8h'); 
      script.setAttribute('data-currency', 'COP');
      script.setAttribute('data-amount-in-cents', amountInCents);
      script.setAttribute('data-reference', `DON-${Date.now()}-${donorData.id}`);
      script.setAttribute('data-redirect-url', window.location.href); 
      
      script.onerror = () => console.warn("Error cargando Wompi");
      wompiRef.current.appendChild(script);
    }
  }, [step, amount, customAmount, donorData.id, donationType]);

  const generateCertificate = () => {
    const doc = new jsPDF();
    const donationDate = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    const finalAmount = parseInt(customAmount || amount).toLocaleString('es-CO');
    
    doc.setDrawColor(225, 29, 72); 
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 190, 277);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('CERTIFICADO DE DONACIÓN', 105, 60, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`La Fundación Ana y José certifica que:`, 105, 80, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(donorData.name.toUpperCase(), 105, 95, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Identificado con C.C./NIT: ${donorData.id}`, 105, 105, { align: 'center' });
    
    doc.text(`Ha realizado una donación por valor de:`, 105, 125, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`$ ${finalAmount} COP`, 105, 135, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(`Fecha: ${donationDate}`, 105, 150, { align: 'center' });
    
    doc.text('¡Gracias por ayudar a nuestros abuelos!', 105, 200, { align: 'center' });

    doc.save(`Certificado_${donorData.name}.pdf`);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    
    // VALIDACIÓN CHECKBOX
    if (!acceptedTerms) {
        alert("Debes aceptar la Política de Privacidad para continuar.");
        return;
    }
    
    // Validación Campos
    let isValid = false;
    if (donationType === 'money') {
        if (donorData.name && donorData.id && donorData.email && donorData.phone && (amount || customAmount)) isValid = true;
    } else {
        if (donorData.name && donorData.phone && donorData.itemDescription) isValid = true;
    }

    if (isValid) {
        await saveToDatabase();
        setStep(2);
    } else {
        alert("Por favor completa los campos obligatorios (*)");
    }
  };

  const handleInKindCoordination = () => {
      const message = `Hola Fundación Ana y José, mi nombre es ${donorData.name}. Deseo donar: ${donorData.itemDescription}. Mi dirección es: ${donorData.pickupAddress || 'A coordinar'}.`;
      window.open(`https://wa.me/573145520393?text=${encodeURIComponent(message)}`, '_blank');
      setStep(3); 
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
          
          <div className="bg-gray-50 p-8 md:w-1/3 border-r border-gray-100 flex flex-col">
             <div className="mb-8 p-1 bg-gray-200 rounded-xl flex">
                 <button onClick={() => { setDonationType('money'); setStep(1); }} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'money' ? 'bg-white shadow text-rose-600' : 'text-gray-500'}`}>Dinero</button>
                 <button onClick={() => { setDonationType('kind'); setStep(1); }} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'kind' ? 'bg-white shadow text-rose-600' : 'text-gray-500'}`}>En Especie</button>
             </div>

             <div className="space-y-6 flex-grow">
               <div className={`flex items-center gap-3 ${step >= 1 ? 'text-rose-600' : 'text-gray-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-rose-100' : 'bg-gray-200'}`}>1</div><span className="font-bold">Datos</span>
               </div>
               <div className={`flex items-center gap-3 ${step >= 2 ? 'text-rose-600' : 'text-gray-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-rose-100' : 'bg-gray-200'}`}>2</div><span className="font-bold">{donationType === 'money' ? 'Pago' : 'Coordinar'}</span>
               </div>
               <div className={`flex items-center gap-3 ${step >= 3 ? 'text-rose-600' : 'text-gray-400'}`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-rose-100' : 'bg-gray-200'}`}>3</div><span className="font-bold">Certificado</span>
               </div>
             </div>
          </div>

          <div className="p-8 md:w-2/3 flex flex-col justify-center bg-white relative">
            
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-5 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {donationType === 'money' ? <CreditCard className="text-rose-600"/> : <Package className="text-rose-600"/>}
                    {donationType === 'money' ? 'Aporte Económico' : 'Donar Artículos'}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Nombre *</label>
                    <div className="relative"><User className="absolute left-3 top-3 text-gray-400 w-4 h-4"/><input type="text" required className="w-full pl-9 p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" value={donorData.name} onChange={(e) => setDonorData({...donorData, name: e.target.value})} /></div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Teléfono *</label>
                    <div className="relative"><Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4"/><input type="tel" required className="w-full pl-9 p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" value={donorData.phone} onChange={(e) => setDonorData({...donorData, phone: e.target.value})} /></div>
                  </div>
                </div>

                {donationType === 'money' && (
                    <>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Email *</label>
                                <div className="relative"><Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4"/><input type="email" required className="w-full pl-9 p-2.5 border rounded-lg" value={donorData.email} onChange={(e) => setDonorData({...donorData, email: e.target.value})} /></div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">C.C./NIT *</label>
                                <input type="number" required className="w-full p-2.5 border rounded-lg" value={donorData.id} onChange={(e) => setDonorData({...donorData, id: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-2 pt-2">
                           <label className="text-sm font-bold text-gray-700">Monto (COP)</label>
                           <div className="grid grid-cols-3 gap-2">
                             {['50000', '100000', '200000'].map((val) => (
                               <button type="button" key={val} className={`py-2 px-3 rounded-lg text-sm font-bold border ${amount === val && !customAmount ? 'bg-rose-600 text-white' : 'text-gray-600'}`} onClick={() => { setAmount(val); setCustomAmount(''); }}>${parseInt(val).toLocaleString()}</button>
                             ))}
                           </div>
                           <input type="number" className="w-full p-3 border rounded-lg" placeholder="Otro valor..." value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} />
                        </div>
                    </>
                )}

                {donationType === 'kind' && (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">¿Qué deseas donar?</label>
                        <textarea required className="w-full p-3 border rounded-lg h-24 resize-none" value={donorData.itemDescription} onChange={(e) => setDonorData({...donorData, itemDescription: e.target.value})}></textarea>
                    </div>
                )}

                {/* --- CHECKBOX DE TÉRMINOS (NUEVO) --- */}
                <div className="flex items-start gap-3 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center h-5">
                    <input
                      id="terms-donation"
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="terms-donation" className="text-xs text-gray-600 cursor-pointer select-none">
                    Acepto la <a href="/politica-privacidad" target="_blank" className="text-rose-600 font-bold hover:underline">Política de Privacidad</a> y autorizo el uso de mis datos para el certificado.
                  </label>
                </div>

                <Button variant="primary" className="w-full py-3 shadow-lg mt-2" disabled={isSaving}>
                  {isSaving ? 'Registrando...' : 'Continuar'}
                </Button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                {donationType === 'money' ? (
                    <>
                        <div className="text-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Método de Pago</h3>
                            <p className="text-gray-500 text-sm">Donación: <span className="font-bold text-rose-600">${parseInt(customAmount || amount).toLocaleString()} COP</span></p>
                        </div>
                        <div className="bg-white border rounded-xl p-4 text-center shadow-sm">
                            <p className="font-bold text-gray-700 mb-2 text-sm">Tarjetas / PSE / Nequi</p>
                            <div className="min-h-[50px] flex items-center justify-center"><form ref={wompiRef}></form></div>
                        </div>
                        <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" className="block">
                            <div className="bg-[#003087] text-white rounded-xl p-4 text-center shadow-md flex items-center justify-center gap-2 hover:bg-[#00256b] cursor-pointer">
                                <Globe size={18} /> Donar con PayPal
                            </div>
                        </a>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center mt-4">
                           <button onClick={() => setStep(3)} className="text-yellow-700 font-bold text-xs hover:underline w-full">
                             <AlertTriangle size={12} className="inline mr-1"/> Simular Pago Exitoso
                           </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-pulse"/>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias!</h3>
                        <p className="text-gray-600 mb-6">Hemos registrado tu intención. Finalicemos la logística por WhatsApp.</p>
                        <button onClick={handleInKindCoordination} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-[#128c7e]">
                            <Phone className="w-5 h-5" /> Abrir WhatsApp
                        </button>
                    </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="text-center animate-fade-in-up py-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-600" /></div>
                <h3 className="text-3xl font-extrabold text-gray-800 mb-2">¡Misión Cumplida!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Tu generosidad transforma vidas.</p>
                
                {donationType === 'money' && (
                    <button onClick={generateCertificate} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 hover:bg-gray-800">
                      <Download className="w-6 h-6" /> Descargar Certificado PDF
                    </button>
                )}
                
                <button onClick={() => { setStep(1); setAcceptedTerms(false); setDonorData({name:'', id:'', email:'', phone:'', type:'Persona Natural', itemDescription:'', pickupAddress:''}); }} className="mt-8 text-rose-600 font-bold text-sm hover:underline block mx-auto">
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