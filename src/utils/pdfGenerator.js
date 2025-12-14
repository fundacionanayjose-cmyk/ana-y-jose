// Eliminamos el import estático superior para ahorrar peso inicial
// import { jsPDF } from 'jspdf'; 

export const generateCertificate = async (donorName, donorId, amount, donationType) => {
  // --- LAZY LOADING ---
  // Importamos la librería SOLO cuando se ejecuta esta función
  const { jsPDF } = await import('jspdf');

  // Sanitización básica de inputs para el PDF
  const safeName = donorName.replace(/[^\w\sñÑáéíóúÁÉÍÓÚüÜ]/g, '').toUpperCase();
  const safeId = donorId.replace(/[^\d]/g, '');
  const date = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const doc = new jsPDF();
  
  // Diseño del certificado
  doc.setDrawColor(225, 29, 72); // Color Rose-600
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
  doc.text(safeName, 105, 95, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Identificado con C.C./NIT: ${safeId}`, 105, 105, { align: 'center' });
  
  doc.text(`Ha realizado una donación ${donationType === 'money' ? 'económica' : 'en especie'} por valor de:`, 105, 125, { align: 'center' });
  
  doc.setFontSize(16);
  if (donationType === 'money') {
    doc.text(`$ ${parseInt(amount).toLocaleString('es-CO')} COP`, 105, 135, { align: 'center' });
  } else {
    doc.text("DONACIÓN EN ESPECIE", 105, 135, { align: 'center' });
  }
  
  doc.setFontSize(10);
  doc.text(`Fecha: ${date}`, 105, 150, { align: 'center' });
  
  doc.text('¡Gracias por ayudar a nuestros abuelos!', 105, 200, { align: 'center' });

  // Nota legal de transparencia
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text('* Este documento es simbólico y de agradecimiento inmediato.', 105, 260, { align: 'center' });
  doc.text('El certificado fiscal oficial será enviado una vez validado el ingreso bancario.', 105, 265, { align: 'center' });

  doc.save(`Certificado_Simbólico_${safeName.replace(/\s+/g, '_')}.pdf`);
};