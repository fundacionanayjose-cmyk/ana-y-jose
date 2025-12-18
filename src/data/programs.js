import { BookOpen, Palette, Users, Sun, Stethoscope, HeartHandshake } from 'lucide-react';

export const programsData = [
  {
    id: 'envejecimiento-digno',
    title: "Capacitación en Envejecimiento Digno",
    shortDesc: "Fortalecimiento cognitivo y emocional para la apropiación de derechos.",
    icon: BookOpen,
    color: "#e11d48",
    heroImage: "/galeria/20210909_160146.jpg", 
    longDesc: "Busca el fortalecimiento de las competencias cognitivas tanto del adulto mayor como de sus familiares y cuidadores. Trabajamos temáticas psicosociales como la escucha activa, gestión de emociones y memoria histórica familiar.",
    stats: [
      { number: "25", label: "Participantes/Taller" },
      { number: "2", label: "Sesiones semanales" },
      { number: "5", label: "Módulos temáticos" }
    ],
    gallery: [
      "/galeria/20210909_161536.jpg",
      "/galeria/20210909_161739.jpg"
    ]
  },
  {
    id: 'fisico-arte',
    title: "Físico y Arte",
    shortDesc: "Danzas, gimnasio, pintura, cocina y juegos tradicionales.",
    icon: Palette,
    color: "#d97706",
    heroImage: "/galeria/20211120_111728_HDR.jpg", 
    longDesc: "Fortalecemos competencias comunicativas y emocionales a través de la estética y el movimiento. Incluye danzas folclóricas, gimnasio para activación motriz, pintura en tela y espacios de juegos tradicionales.",
    stats: [
      { number: "100%", label: "Activación motriz" },
      { number: "5", label: "Disciplinas activas" },
      { number: "Permanente", label: "Disponibilidad gimnasio" }
    ],
    gallery: [
      "/galeria/20210503_230137.jpg", 
      "/galeria/20211121_132212_HDR.jpg"
    ]
  },
  {
    id: 'familia',
    title: "Actividades Familiares",
    shortDesc: "Reconstrucción del tejido afectivo mediante celebraciones conjuntas.",
    icon: Users,
    color: "#16a34a",
    heroImage: "/galeria/20211224_163500_HDR.jpg", 
    longDesc: "Impulsamos el fortalecimiento de las relaciones familiares y la integración con el adulto mayor. Realizamos salidas pedagógicas, celebraciones de fechas especiales y cenas de integración.",
    stats: [
      { number: "200", label: "Participantes totales" },
      { number: "3", label: "Cenas anuales" },
      { number: "5", label: "Eventos masivos" }
    ],
    gallery: [
      "/galeria/20211120_133951_HDR.jpg", 
      "/galeria/20211120_132956_HDR.jpg"
    ]
  },
  {
    id: 'bienestar-integral',
    title: "Bienestar Integral",
    shortDesc: "Hábitos saludables, alfabetización, finanzas y enseñanza de manejo de equipos tecnologicos y redes sociales.",
    icon: Sun,
    color: "#0284c7",
    heroImage: "/galeria/20211121_130107_HDR.jpg", 
    longDesc: "Promovemos la autonomía y calidad de vida. Ofrecemos formación en hábitos de alimentación, alfabetización y manejo de finanzas personales. Incluye el servicio de 'centro dia para adultos'.",
    stats: [
      { number: "20", label: "Cupos Hogar de Paso" },
      { number: "80%", label: "Nivel de satisfacción" },
      { number: "2", label: "Sesiones semanales" }
    ],
    gallery: [
      "/galeria/20210503_232548.jpg",
      "/galeria/20211121_131215_HDR.jpg"
    ]
  },
  {
    id: 'brigadas',
    title: "Brigadas de Salud",
    shortDesc: "Prevención y atención: Medicina general, salud oral y visual.",
    icon: Stethoscope,
    color: "#7c3aed",
    heroImage: "/galeria/IMG20250805144021 (1).jpg", 
    longDesc: "Mitigamos riesgos de enfermedad mediante jornadas de salud visual, medicina general y salud oral. Ofrecemos también consultorio jurídico de primera instancia.",
    stats: [
      { number: "100", label: "Atenciones/Brigada" },
      { number: "4", label: "Tipos de servicios" },
      { number: "10", label: "Brigadas médicas" }
    ],
    gallery: [
      "/galeria/20210503_205438.jpg",
      "/galeria/20211120_111849_HDR.jpg"
    ]
  },
  {
    id: 'cuidadores',
    title: "Escuela de Cuidadores",
    shortDesc: "Prevención del síndrome de burnout y herramientas de autocuidado.",
    icon: HeartHandshake,
    color: "#db2777",
    heroImage: "/galeria/20210909_163513.jpg", 
    longDesc: "Cuidar a quien cuida. Fortalecemos las competencias de los cuidadores mediante talleres sobre el síndrome de burnout, autocuidado y espacios de esparcimiento.",
    stats: [
      { number: "25", label: "Cuidadores/Grupo" },
      { number: "1", label: "Sesión semanal" },
      { number: "100%", label: "Apoyo psicosocial" }
    ],
    gallery: [
      "/galeria/20210909_163516.jpg",
      "/galeria/20210909_163603.jpg"
    ]
  }
];