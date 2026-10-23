import { HomeData, MiembroFamilia, Mascota } from '../types/plan';

export interface PresetScenario {
  id: string;
  titulo: string;
  subtitulo: string;
  badge: string;
  icono: string;
  home: HomeData;
  family: MiembroFamilia[];
  pets: Mascota[];
  notas: string;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'ladera-san-salvador',
    titulo: 'Vivienda de lámina en ladera vulnerable',
    subtitulo: 'San Salvador / Ilopango • Pendiente pronunciada y lluvias torrenciales',
    badge: 'Alta Vulnerabilidad',
    icono: 'Mountain',
    home: {
      zona: 'ladera',
      tipoVivienda: 'lamina_mixta',
      riesgoPrincipal: 'todos',
      tieneGasPropano: true,
      tienePatioAbierto: true,
      departamentoOZona: 'Comunidad en ladera, San Salvador'
    },
    family: [
      {
        id: 'f1',
        alias: 'Mamá Elena',
        edad: 39,
        rangoEdad: 'adulto',
        necesidades: ['ninguna']
      },
      {
        id: 'f2',
        alias: 'Abuelita Chepita',
        edad: 68,
        rangoEdad: 'adulto_mayor',
        necesidades: ['movilidad_reducida', 'medicamentos'],
        detalleNecesidad: 'Usa bastón, toma Enalapril y Metformina a diario'
      },
      {
        id: 'f3',
        alias: 'Mateo',
        edad: 8,
        rangoEdad: 'nino',
        necesidades: ['ninguna']
      },
      {
        id: 'f4',
        alias: 'Sofía',
        edad: 4,
        rangoEdad: 'nino',
        necesidades: ['ninguna']
      }
    ],
    pets: [
      {
        id: 'p1',
        tipo: 'perro',
        cantidad: 1,
        detalles: 'Perro mestizo mediano (Rocky)'
      }
    ],
    notas: 'Vivienda con techo de lámina galvanizada, pasillo estrecho hacia el callejón comunal.'
  },
  {
    id: 'rio-la-libertad',
    titulo: 'Casa de 1 nivel cerca de quebrada / río',
    subtitulo: 'La Libertad / Costa del Balsamar • Crecidas súbitas y sismos',
    badge: 'Riesgo Hídrico',
    icono: 'Waves',
    home: {
      zona: 'rio_quebrada',
      tipoVivienda: 'un_nivel',
      riesgoPrincipal: 'inundaciones',
      tieneGasPropano: true,
      tienePatioAbierto: true,
      departamentoOZona: 'Ribera del río, La Libertad'
    },
    family: [
      {
        id: 'f1',
        alias: 'Papá René',
        edad: 32,
        rangoEdad: 'adulto',
        necesidades: ['ninguna']
      },
      {
        id: 'f2',
        alias: 'Mamá Karen',
        edad: 30,
        rangoEdad: 'adulto',
        necesidades: ['bebe'],
        detalleNecesidad: 'Madre en período de lactancia'
      },
      {
        id: 'f3',
        alias: 'Bebé Lucas',
        edad: 1,
        rangoEdad: 'bebe',
        necesidades: ['bebe'],
        detalleNecesidad: 'Lactante de 10 meses'
      }
    ],
    pets: [
      {
        id: 'p1',
        tipo: 'gato',
        cantidad: 1,
        detalles: 'Gato pequeño (Michi)'
      }
    ],
    notas: 'A 40 metros del cauce del río, se inunda el patio con tormentas de más de 2 horas continuas.'
  },
  {
    id: 'apto-san-benito',
    titulo: 'Apartamento urbano en 3er nivel',
    subtitulo: 'San Benito / Santa Tecla • Edificio multifamiliar y sismos',
    badge: 'Riesgo Sísmico Urbano',
    icono: 'Building2',
    home: {
      zona: 'ciudad',
      tipoVivienda: 'apartamento',
      riesgoPrincipal: 'sismos',
      tieneGasPropano: false,
      pisoApartamento: 3,
      tienePatioAbierto: false,
      departamentoOZona: 'Colonia céntrica, Santa Tecla'
    },
    family: [
      {
        id: 'f1',
        alias: 'Carlos',
        edad: 28,
        rangoEdad: 'adulto',
        necesidades: ['ninguna']
      },
      {
        id: 'f2',
        alias: 'Gabriela',
        edad: 27,
        rangoEdad: 'adulto',
        necesidades: ['ninguna']
      }
    ],
    pets: [
      {
        id: 'p1',
        tipo: 'gato',
        cantidad: 2,
        detalles: 'Dos gatos de departamento con jaulas transportadoras'
      }
    ],
    notas: 'Tercer piso, escaleras de concreto estrechas, sin patio privado.'
  }
];
