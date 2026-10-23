export type ZonaHogar = 'costa' | 'ciudad' | 'ladera' | 'rio_quebrada' | 'volcan';
export type TipoVivienda = 'un_nivel' | 'dos_niveles' | 'apartamento' | 'lamina_mixta';
export type RiesgoPrincipal = 'sismos' | 'inundaciones' | 'deslizamientos' | 'tormentas' | 'todos';

export type RangoEdad = 'bebe' | 'nino' | 'adulto' | 'adulto_mayor';

export type NecesidadEspecial = 
  | 'movilidad_reducida'
  | 'medicamentos'
  | 'bebe'
  | 'embarazo'
  | 'discapacidad_sensorial'
  | 'ninguna';

export interface MiembroFamilia {
  id: string;
  alias: string;
  edad: number;
  rangoEdad: RangoEdad;
  necesidades: NecesidadEspecial[];
  detalleNecesidad?: string;
}

export interface Mascota {
  id: string;
  tipo: 'perro' | 'gato' | 'aves' | 'otro';
  cantidad: number;
  detalles?: string;
}

export interface HomeData {
  zona: ZonaHogar;
  tipoVivienda: TipoVivienda;
  riesgoPrincipal: RiesgoPrincipal;
  tieneGasPropano: boolean;
  pisoApartamento?: number;
  tienePatioAbierto: boolean;
  departamentoOZona?: string;
}

export interface ContactoEmergencia {
  id: string;
  nombre: string;
  numero: string;
  tipo: 'institucional' | 'familiar';
  descripcion: string;
  icono?: string;
}

export interface ItemMochila {
  id: string;
  item: string;
  categoria: 'agua_alimentos' | 'botiquin' | 'herramientas' | 'documentos' | 'especiales_familia';
  motivo: string;
  esencial: boolean;
  completado: boolean;
}

export interface RolFamiliar {
  id: string;
  miembroAlias: string;
  rolTitulo: string;
  tareasClave: string[];
  equipoAsignado: string;
  prioridad: 'alta' | 'media' | 'apoyo';
}

export interface PasoFase {
  id: string;
  titulo: string;
  detalle: string;
  advertencia?: string;
  alerta?: string;
  categoria?: string;
}

export interface PlanEmergencia {
  id: string;
  createdAt: string;
  resumenEjecutivo: string;
  diagnosticoVulnerabilidad: {
    nivel: 'Alto' | 'Medio' | 'Crítico';
    explicacion: string;
    puntosCriticos: string[];
  };
  fases: {
    antes: PasoFase[];
    durante: PasoFase[];
    despues: PasoFase[];
  };
  roles: RolFamiliar[];
  mochila: ItemMochila[];
  puntosReunion: {
    puntoInterno: string;
    puntoExterno: string;
    rutaEvacuacion: string;
    zonaSeguraComunitaria: string;
  };
  consejosLocales: string[];
  source: 'gemini' | 'reglas_sv';
}
