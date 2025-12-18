import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import History from './History'; 
import ImpactMap from './ImpactMap';
import ParallaxBanner from './ParallaxBanner';
import OfficialServices from './OfficialServices';
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

  const openGeneralForm = () => {
    setFormBeneficiaryName(null);
    setIsFormModalOpen(true);
  };

  const openBeneficiaryDetail = (abuelo) => {
    setSelectedAbuelo(abuelo);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-white selection:bg-rose-100 selection:text-rose-900">
      
      {/* Botón flotante de WhatsApp */}
      <a 
        href="https://wa.me/573145520393" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 group animate-bounce-slow"
      >
        <Phone className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
          ¡Hablemos!
        </span>
      </a>
      
      <Navbar scrolled={scrolled} logoUrl={logoUrl} onOpenModal={openGeneralForm} />
      
      {/* Sección INICIO (Controlada por scroll to top del router) */}
      <Hero onPrimaryAction={openGeneralForm} />
      
      {/* Sección NOSOTROS (About + History) */}
      <section id="nosotros" className="scroll-mt-24">
        <About />
        <History />
      </section>

      {/* Mapa fuera de sección nosotros pero parte del bloque informativo */}
      <ImpactMap />

      <SponsorSection onOpenModal={openBeneficiaryDetail} />
      
      <ParallaxBanner 
        image="/galeria/20210503_205438.jpg" 
        quote="El amor es el único tesoro que se multiplica al dividirlo."
      />

      <OfficialServices />

      {/* Sección PROGRAMAS */}
      <section id="programas" className="scroll-mt-24">
        <Programs />
      </section>

      <Gallery />
      <Testimonials />
      <Partners />
      
      {/* Sección EQUIPO */}
      <section id="equipo" className="scroll-mt-24">
        <Team />
      </section>

      {/* Sección TRANSPARENCIA */}
      <section id="transparencia" className="scroll-mt-24">
        <Transparency />
      </section>

      <Donation />
      <Footer logoUrl={logoUrl} />

      {/* MODALES */}
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        initialBeneficiary={formBeneficiaryName} 
      />

      <BeneficiaryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        beneficiary={selectedAbuelo}
        onDonate={() => {
          setIsDetailModalOpen(false);
          openGeneralForm();
        }}
      />
    </div>
  );
};

export default Home;