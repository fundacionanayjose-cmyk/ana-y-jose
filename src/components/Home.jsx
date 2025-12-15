import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
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

  // Abrir formulario general
  const openGeneralForm = () => {
    setFormBeneficiaryName(null);
    setIsFormModalOpen(true);
  };

  // Abrir detalle del abuelo (Tarjeta Grande)
  const openBeneficiaryDetail = (abuelo) => {
    setSelectedAbuelo(abuelo);
    setIsDetailModalOpen(true);
  };

  // Pasar del Detalle al Formulario de Donación
  const handleSponsorFromDetail = (abuelo) => {
    setIsDetailModalOpen(false);
    setFormBeneficiaryName(abuelo.nombre);
    setTimeout(() => setIsFormModalOpen(true), 300);
  };

  return (
    <div className="font-sans text-gray-800 bg-stone-50 overflow-x-hidden relative">
      
      {/* 1. Modal de Formulario (Datos + Supabase) */}
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        preSelectedBeneficiary={formBeneficiaryName} 
      />

      {/* 2. Modal de Historia (Visual + Emotivo) */}
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
      
      {/* 3. Sección de Tarjetas: Al hacer clic, abre el Detalle */}
      <SponsorSection onOpenModal={openBeneficiaryDetail} />
      
      <Team />
      <Programs />
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