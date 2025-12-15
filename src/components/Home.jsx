import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
// 1. IMPORTAMOS LOS COMPONENTES PERDIDOS
import History from './History'; 
import ImpactMap from './ImpactMap';
import ParallaxBanner from './ParallaxBanner';
import OfficialServices from './OfficialServices';
// (Fin de nuevos imports)

import SponsorSection from './SponsorSection';
import Team from './Team';
import Programs from './Programs';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Partners from './Partners';
import Transparency from './Transparency';
import Donation from './Donation';
import Footer from './Footer';
import Modal from './Modal';
import BeneficiaryDetailModal from './BeneficiaryDetailModal';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formBeneficiaryName, setFormBeneficiaryName] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAbuelo, setSelectedAbuelo] = useState(null);

  const logoUrl = "/galeria/LOGO.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funciones de modales
  const openGeneralForm = () => {
    setFormBeneficiaryName(null);
    setIsFormModalOpen(true);
  };

  const openBeneficiaryDetail = (abuelo) => {
    setSelectedAbuelo(abuelo);
    setIsDetailModalOpen(true);
  };

  const handleSponsorFromDetail = (abuelo) => {
    setIsDetailModalOpen(false);
    setFormBeneficiaryName(abuelo.nombre);
    setTimeout(() => setIsFormModalOpen(true), 300);
  };

  return (
    <div className="font-sans text-gray-800 bg-stone-50 overflow-x-hidden relative">
      
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        preSelectedBeneficiary={formBeneficiaryName} 
      />

      <BeneficiaryDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        abuelo={selectedAbuelo}
        onSponsor={handleSponsorFromDetail}
      />
      
      <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 group animate-bounce-slow"><Phone className="w-6 h-6 fill-current" /><span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">¡Hablemos!</span></a>
      
      <Navbar scrolled={scrolled} logoUrl={logoUrl} onOpenModal={openGeneralForm} />
      <Hero onPrimaryAction={openGeneralForm} />
      
      <About />
      
      {/* 2. AQUÍ AGREGAMOS LA HISTORIA DESPUÉS DE "NOSOTROS" */}
      <History /> 

      {/* 3. AQUÍ AGREGAMOS EL MAPA */}
      <ImpactMap />

      <SponsorSection onOpenModal={openBeneficiaryDetail} />
      
      {/* 4. AQUÍ ESTÁ LA CORRECCIÓN: AGREGAMOS PROPS AL BANNER PARA EVITAR EL ERROR 404 */}
      <ParallaxBanner 
        image="/galeria/20210503_205438.jpg" 
        quote="El envejecimiento no es juventud perdida, sino una nueva etapa de oportunidad y fuerza." 
      />

      <Team />
      <Programs />

      {/* 5. SERVICIOS OFICIALES DESPUÉS DE PROGRAMAS */}
      <OfficialServices />

      <Gallery />
      <Testimonials />
      <Partners />
      <Transparency />
      <Donation />
      <Footer logoUrl={logoUrl} />
    </div>
  );
};
export default Home;