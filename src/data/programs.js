import { Clock, Heart, HandHeart, Smile } from 'lucide-react';

export const programsData = [
  {
    id: 'nutricion',
    title: "Nutrición con Amor",
    shortDesc: "Garantizamos seguridad alimentaria con menús balanceados diseñados por expertos.",
    icon: Clock,
    color: "#e11d48", // Rose-600
    // INFORMACIÓN AMPLIADA
    heroImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000",
    longDesc: "En Colombia, miles de adultos mayores sufren de malnutrición silenciosa. Nuestro programa 'Nutrición con Amor' no solo entrega alimentos; diseñamos dietas específicas para hipertensión, diabetes y pérdida de masa muscular. Contamos con un comedor comunitario que sirve desayunos y almuerzos calientes de lunes a sábado.",
    stats: [
      { number: "8,500", label: "Platos servidos/mes" },
      { number: "120", label: "Abuelos beneficiados" },
      { number: "40%", label: "Mejora en peso" }
    ],
    gallery: [
      "/galeria/foto1.jpg", 
      "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1000"
    ]
  },
  {
    id: 'salud',
    title: "Salud Integral",
    shortDesc: "Jornadas médicas, fisioterapia y acompañamiento psicológico continuo.",
    icon: Heart,
    color: "#1e40af", // Blue-800
    heroImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000",
    longDesc: "La vejez trae consigo retos físicos que requieren atención constante. Realizamos brigadas de salud mensual con geriatras voluntarios, sesiones de fisioterapia para mejorar la movilidad y, muy importante, acompañamiento psicológico para combatir la depresión senil y la soledad.",
    stats: [
      { number: "24", label: "Jornadas Médicas/año" },
      { number: "500+", label: "Terapias físicas" },
      { number: "100%", label: "Cobertura médica" }
    ],
    gallery: [
      "/galeria/foto5.jpg",
      "https://images.unsplash.com/photo-1584515933487-9bdb75f77f1e?q=80&w=1000"
    ]
  },
  {
    id: 'vivienda',
    title: "Vivienda Digna",
    shortDesc: "Mejoramiento de espacios habitacionales para asegurar un entorno seguro.",
    icon: HandHeart,
    color: "#ca8a04", // Yellow-600
    heroImage: "https://images.unsplash.com/photo-1505244781498-8e62d473489e?q=80&w=2000",
    longDesc: "Muchos de nuestros abuelos viven en condiciones precarias que ponen en riesgo su salud. Nuestro equipo de voluntarios arquitectos e ingenieros realiza reparaciones locativas: arreglos de techos, instalación de baños seguros, rampas y pintura, transformando casas frías en hogares cálidos.",
    stats: [
      { number: "15", label: "Techos reparados" },
      { number: "32", label: "Baños adaptados" },
      { number: "45", label: "Hogares pintados" }
    ],
    gallery: [
      "/galeria/foto3.jpg",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000"
    ]
  },
  {
    id: 'recreacion',
    title: "Recreación y Vida",
    shortDesc: "Arte, danza, paseos y talleres para mantener la alegría y la agilidad mental.",
    icon: Smile,
    color: "#16a34a", // Green-600
    heroImage: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2000",
    longDesc: "Creemos que la vida se debe celebrar hasta el último día. Nuestros talleres de pintura, clases de baile y salidas pedagógicas no son solo diversión; son terapia cognitiva vital para prevenir el deterioro mental y fortalecer los lazos de amistad entre ellos.",
    stats: [
      { number: "3", label: "Talleres semanales" },
      { number: "12", label: "Paseos anuales" },
      { number: "Infinitas", label: "Sonrisas" }
    ],
    gallery: [
      "/galeria/foto1.jpg",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000"
    ]
  }
];