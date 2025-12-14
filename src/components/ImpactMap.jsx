import React, { useState, memo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Users, Heart, Home, Star } from 'lucide-react';

// --- ACTIVOS SVG INCRUSTADOS (ESTILO CARICATURA) ---

// 1. Marcador de Arbolito (Pequeño para el mapa)
const CartoonTreeMarker = () => (
  <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg hover:scale-110 transition-transform duration-300">
    <path d="M20 50V35" stroke="#78350F" strokeWidth="4" strokeLinecap="round"/>
    <path d="M20 38C28 38 36 32 36 22C36 12 28 2 20 2C12 2 4 12 4 22C4 32 12 38 20 38Z" fill="#22C55E" stroke="#15803D" strokeWidth="3"/>
    <circle cx="14" cy="18" r="3" fill="#86EFAC"/>
    <circle cx="26" cy="24" r="2" fill="#86EFAC"/>
    <circle cx="22" cy="12" r="2" fill="#86EFAC"/>
  </svg>
);

// 2. Arbolito Grande (Para el Tooltip)
const TooltipTreeIllustration = className => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 120V85" stroke="#78350F" strokeWidth="8" strokeLinecap="round"/>
    <path d="M50 95C75 95 95 75 95 45C95 20 75 5 50 5C25 5 5 20 5 45C5 75 25 95 50 95Z" fill="#22C55E" stroke="#15803D" strokeWidth="6"/>
    <circle cx="30" cy="35" r="8" fill="#86EFAC"/>
    <circle cx="65" cy="55" r="6" fill="#86EFAC"/>
    <circle cx="55" cy="25" r="5" fill="#86EFAC"/>
    <circle cx="75" cy="30" r="4" fill="#86EFAC"/>
    <circle cx="25" cy="60" r="5" fill="#86EFAC"/>
  </svg>
);

// 3. Garabatos de Fondo (Montañas/Ondas)
const BackgroundDoodles = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100 L70 80 L90 100" stroke="#6B7280" strokeWidth="2" fill="none" transform="translate(50, 50) scale(1.5)"/>
    <path d="M20 200 L40 180 L60 200 L80 180" stroke="#6B7280" strokeWidth="2" fill="none" transform="translate(100, 250) scale(1.2)"/>
    <path d="M500 50 L520 30 L540 50" stroke="#6B7280" strokeWidth="2" fill="none" transform="translate(20, -20)"/>
    <path d="M400 400 L420 380 L440 400 L460 380" stroke="#6B7280" strokeWidth="2" fill="none" transform="scale(1.3)"/>
    <circle cx="100" cy="100" r="5" fill="#FCD34D" opacity="0.5"/>
    <circle cx="450" cy="350" r="8" fill="#FCD34D" opacity="0.5"/>
  </svg>
);

// --- CONFIGURACIÓN DEL MAPA ---
// APUNTA AL ARCHIVO TOPOJSON LIGERO QUE SUBISTE
const GEO_URL = "/colombia-topo.json";

const LOCATIONS = [
  { 
    name: "BOGOTÁ", 
    coordinates: [-74.0721, 4.7110], 
    color: "#e11d48", 
    stats: "Sede Principal",
    activities: ["Comedor Comunitario", "Atención Psicológica", "Talleres de Arte","acompañamiento y reabilitacion de adultos mayores"],
    icon: Home,
    programName: "Nutriendo el Alma" // Nombre ficticio del programa para la tarjeta
  },
  { 
    name: "TOLIMA", 
    coordinates: [-75.2, 4.0], 
    color: "#ca8a04", 
    stats: "Municipio de Honda",
    activities: ["Apoyo a Pescadores", "Desayunos Saludables", "Jornadas de Salud"],
    icon: Heart,
    programName: "Red de Apoyo Fluvial"
  },
  { 
    name: "CUNDINAMARCA", 
    coordinates: [-74.0, 5.0], 
    color: "#16a34a", 
    stats: "Municipios Aledaños",
    activities: ["Mejoramiento de Vivienda", "Donaciones en Especie", "Ropa y Juguetes"],
    icon: Users,
    programName: "Hogares Seguros"
  },
  { 
    name: "LA GUAJIRA", 
    coordinates: [-72.5, 11.2], 
    color: "#2563eb", 
    stats: "Comunidades Wayúu",
    activities: ["Entrega de Mercados", "Brigadas Médicas", "Agua Potable"],
    icon: Star,
    programName: "Agua y Vida"
  }
];

const ImpactMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Huellas de Amor en <span className="relative inline-block">Colombia
              <svg className="absolute bottom-1 left-0 w-full h-3 text-yellow-400 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none" fill="currentColor"><path d="M0,10 C30,0 70,0 100,10 L100,12 L0,12 Z"/></svg>
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
          
          {/* --- CONTENEDOR DEL MAPA ESTILO CARICATURA --- */}
          <div className="w-full lg:w-3/5 h-[550px] md:h-[650px] relative drop-shadow-2xl bg-stone-100 rounded-[3rem] border-4 border-white p-6 overflow-hidden group">
            
            {/* Garabatos de fondo */}
            <BackgroundDoodles />

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 2300, center: [-74.2, 4.5] }}
              className="w-full h-full relative z-10"
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const deptNameRaw = geo.properties.DPTO_CNMBR || geo.properties.NOMBRE_DPT || geo.properties.name || "";
                    const deptName = deptNameRaw.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const activeLoc = LOCATIONS.find(l => deptName.includes(l.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: "#FBBF24", // Color Dorado Uniforme
                            stroke: "#B45309", // Borde marrón oscuro
                            strokeWidth: 1.5,
                            outline: "none",
                            opacity: activeLoc ? 1 : 0.85 // Departamentos activos resaltan más
                          },
                          hover: {
                            fill: "#F59E0B", // Dorado más oscuro al pasar el mouse
                            stroke: "#78350F",
                            strokeWidth: 2,
                            outline: "none",
                            opacity: 1,
                            cursor: activeLoc ? "pointer" : "default"
                          },
                          pressed: { fill: "#FBBF24", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {LOCATIONS.map((loc, index) => (
                <Marker 
                  key={index} 
                  coordinates={loc.coordinates}
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Onda de expansión amarilla */}
                  <circle r={15} fill="#FCD34D" opacity={0.5} className="animate-ping" />
                  {/* Icono de Arbolito SVG */}
                  <g transform="translate(-20, -45)">
                    <CartoonTreeMarker />
                  </g>
                </Marker>
              ))}
            </ComposableMap>

            {/* --- TOOLTIP ESTILO TARJETA CON ILUSTRACIÓN --- */}
            {hoveredLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-20 md:left-20 md:transform-none bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[320px] overflow-hidden border-2 border-yellow-400 z-30 animate-fade-in-up">
                
                {/* Barra superior amarilla */}
                <div className="h-3 w-full bg-yellow-400"></div>
                
                <div className="p-5 relative flex overflow-hidden">
                  {/* Contenido de Texto */}
                  <div className="relative z-10 w-2/3 pr-2">
                    <h3 className="font-extrabold text-gray-900 text-xl mb-1">{hoveredLocation.name}</h3>
                    <p className="text-yellow-600 font-bold text-sm uppercase tracking-wider mb-3">{hoveredLocation.programName}</p>
                    
                    <ul className="space-y-1.5">
                      {hoveredLocation.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-bold leading-tight">
                           <span className="text-green-500 mt-0.5">●</span> {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ilustración de Arbolito Grande */}
                  <div className="absolute -right-4 bottom-0 w-2/5 h-full flex items-end justify-end pointer-events-none">
                     <TooltipTreeIllustration className="w-full h-auto object-bottom drop-shadow-lg transform translate-x-2 translate-y-2" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- LISTA LATERAL ESTILO BOTONES --- */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
             {LOCATIONS.map((loc, idx) => (
               <div 
                 key={idx}
                 onMouseEnter={() => setHoveredLocation(loc)}
                 onMouseLeave={() => setHoveredLocation(null)}
                 className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer border-2 ${
                   hoveredLocation?.name === loc.name 
                     ? 'bg-white shadow-xl scale-105 border-yellow-400' 
                     : 'bg-stone-50 border-stone-100 hover:border-yellow-200 hover:bg-white'
                 }`}
               >
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold shadow-md transition-transform group-hover:scale-110 ${hoveredLocation?.name === loc.name ? 'bg-yellow-500' : ''}`} style={{ backgroundColor: hoveredLocation?.name === loc.name ? '' : loc.color }}>
                   <loc.icon size={24} />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-gray-800 text-lg">{loc.name}</h4>
                   <p className="text-sm text-gray-500 font-bold">{loc.stats}</p>
                 </div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(ImpactMap);