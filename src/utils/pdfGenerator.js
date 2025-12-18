// src/utils/pdfGenerator.js

export const generateCertificate = async (donorName, donorId, amount, donationType) => {
  try {
    // --- LAZY LOADING ---
    // Importamos la librería SOLO cuando el usuario pide el certificado
    const { jsPDF } = await import('jspdf');

    // Sanitización básica para evitar caracteres raros en el PDF
    const safeName = donorName ? donorName.toUpperCase() : "DONANTE ANÓNIMO";
    const safeId = donorId || "---";
    const date = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const doc = new jsPDF();
    
    // --- DISEÑO DEL CERTIFICADO ---
    
    // Marco decorativo
    doc.setDrawColor(225, 29, 72); // Color Rose-600 (Tu marca)
    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277); // Borde externo
    
    // Encabezado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(225, 29, 72);
    doc.text('CERTIFICADO DE DONACIÓN', 105, 50, { align: 'center' });
    
    // Cuerpo del texto
    doc.setTextColor(0, 0, 0); // Negro
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`La Fundación Ana y José, con gratitud certifica que:`, 105, 80, { align: 'center' });
    
    // Nombre del Donante (Destacado)
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(safeName, 105, 100, { align: 'center' });
    
    // ID
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Identificado(a) con C.C./NIT: ${safeId}`, 105, 110, { align: 'center' });
    
    // Descripción de la donación
    doc.text(`Ha realizado una donación ${donationType === 'money' ? 'económica' : 'en especie'} por valor estimado de:`, 105, 130, { align: 'center' });
    
    // Monto (Grande y claro)
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    if (donationType === 'money') {
      doc.text(`$ ${parseInt(amount).toLocaleString('es-CO')} COP`, 105, 145, { align: 'center' });
    } else {
      doc.text("DONACIÓN EN ESPECIE", 105, 145, { align: 'center' });
    }
    
    // Fecha y Agradecimiento
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(`Fecha de emisión: ${date}`, 105, 165, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Gracias por ayudar a nuestros adultos mayores!', 105, 200, { align: 'center' });

    // Nota legal (Pie de página)
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('* Este documento es simbólico y de agradecimiento inmediato.', 105, 260, { align: 'center' });
    doc.text('El certificado fiscal oficial para deducción de impuestos será enviado', 105, 265, { align: 'center' });
    doc.text('una vez validado el ingreso bancario por nuestro equipo contable.', 105, 270, { align: 'center' });

    // Descargar PDF
    doc.save(`Certificado_Donacion_${safeName.replace(/\s+/g, '_')}.pdf`);
    
  } catch (error) {
    console.error("Error generando PDF:", error);
    alert("Hubo un error generando el certificado. Por favor intenta de nuevo.");
  }
};