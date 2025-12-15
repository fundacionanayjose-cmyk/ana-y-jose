import { BookOpen, Palette, Users, Sun, Stethoscope, HandHeart } from 'lucide-react';

export const programsData = [
  {
    id: 'envejecimiento-digno',
    title: "Capacitación Envejecimiento Digno",
    shortDesc: "Fortalecimiento cognitivo y emocional para la apropiación de derechos y gestión de emociones.",
    icon: BookOpen,
    color: "#e11d48", // Rose-600
    heroImage: "https://images.unsplash.com/photo-1513258496098-8830b3a98e19?q=80&w=2000", 
    longDesc: "Busca el fortalecimiento de las competencias cognitivas tanto del adulto mayor como de sus familiares y cuidadores. Trabajamos temáticas psicosociales como la escucha activa, gestión de emociones, manejo de la frustración, perdón, reconciliación y memoria histórica familiar para garantizar una vejez digna y activa.",
    stats: [
      { number: "25", label: "Participantes/Taller" },
      { number: "2", label: "Sesiones Semanales" },
      { number: "5", label: "Módulos Temáticos" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
      "/galeria/foto2.jpg"
    ]
  },
  {
    id: 'fisico-arte',
    title: "Físico y Arte",
    shortDesc: "Danzas, gimnasio, pintura, cocina y juegos tradicionales para la motricidad y el espíritu.",
    icon: Palette,
    color: "#d97706", // Amber-600
    heroImage: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2000", 
    longDesc: "Fortalecemos competencias comunicativas y emocionales a través de la estética y el movimiento. Incluye danzas folclóricas, gimnasio para activación motriz, pintura en tela, manualidades, clases de cocina y espacios de juegos tradicionales (parqués, dominó) para mejorar la interacción social.",
    stats: [
      { number: "100%", label: "Activación Motriz" },
      { number: "5", label: "Disciplinas Activas" },
      { number: "Permanente", label: "Disponibilidad Gimnasio" }
    ],
    gallery: [
      "/galeria/foto1.jpg", 
      "/galeria/foto3.jpg"
    ]
  },
  {
    id: 'familia',
    title: "Actividades Familiares",
    shortDesc: "Reconstrucción del tejido afectivo mediante salidas, cenas y celebraciones conjuntas.",
    icon: Users,
    color: "#16a34a", // Green-600
    heroImage: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2000", 
    longDesc: "Impulsamos el fortalecimiento de las relaciones familiares y la integración con el adulto mayor. Realizamos salidas pedagógicas, celebraciones de fechas especiales (cumpleaños, aniversarios), juegos familiares y cenas de integración para fortalecer los vínculos y redes de apoyo.",
    stats: [
      { number: "200", label: "Participantes Totales" },
      { number: "3", label: "Cenas Anuales" },
      { number: "5", label: "Eventos Masivos" }
    ],
    gallery: [
      "/galeria/foto5.jpg", 
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000"
    ]
  },
  {
    id: 'bienestar-integral',
    title: "Bienestar Integral",
    shortDesc: "Hábitos saludables, alfabetización, finanzas y servicio de Hogar de Paso.",
    icon: Sun,
    color: "#0284c7", // Sky-600
    heroImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2000", 
    longDesc: "Promovemos la autonomía y calidad de vida. Ofrecemos formación en hábitos de alimentación, alfabetización (escritura y lógica matemática), manejo de finanzas personales. Incluye el servicio de 'Hogar de Paso' para brindar descanso digno a quienes lo requieren temporalmente.",
    stats: [
      { number: "20", label: "Cupos Hogar de Paso" },
      { number: "80%", label: "Nivel de Satisfacción" },
      { number: "2", label: "Sesiones Semanales" }
    ],
    gallery: [
      "/galeria/foto4.jpg",
      "https://images.unsplash.com/photo-1459356979461-dae1b8dcb702?q=80&w=1000"
    ]
  },
  {
    id: 'brigadas',
    title: "Brigadas de Salud",
    shortDesc: "Prevención y atención: Medicina general, salud oral, visual y consultorio jurídico.",
    icon: Stethoscope,
    color: "#7c3aed", // Violet-600
    heroImage: "https://images.unsplash.com/photo-1584515933487-9bdb75f77f1e?q=80&w=2000", 
    longDesc: "Mitigamos riesgos de enfermedad mediante jornadas de salud visual, medicina general y salud oral. Adicionalmente, ofrecemos un consultorio jurídico de primera instancia para brindar orientación y defensa de los derechos de nuestros adultos mayores.",
    stats: [
      { number: "100", label: "Atenciones/Brigada" },
      { number: "4", label: "Tipos de Servicios" },
      { number: "10", label: "Brigadas Médicas" }
    ],
    gallery: [
      "/galeria/foto5.jpg",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000"
    ]
  },
  {
    id: 'cuidadores',
    title: "Escuela de Cuidadores",
    shortDesc: "Prevención del síndrome de burnout y herramientas de autocuidado para familias.",
    icon: HandHeart,
    color: "#db2777", // Pink-600
    heroImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000", 
    longDesc: "Cuidar a quien cuida. Fortalecemos las competencias de los cuidadores mediante talleres sobre el síndrome de burnout (agotamiento), autocuidado, espacios de esparcimiento y rutas de apoyo institucional, mejorando su bienestar físico y mental.",
    stats: [
      { number: "25", label: "Cuidadores/Grupo" },
      { number: "1", label: "Sesión Semanal" },
      { number: "100%", label: "Apoyo Psicosocial" }
    ],
    gallery: [
      "/galeria/foto2.jpg",
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=1000"
    ]
  }
];