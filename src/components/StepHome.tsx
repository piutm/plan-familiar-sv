import React from 'react';
import { 
  HomeData, 
  ZonaHogar, 
  TipoVivienda, 
  RiesgoPrincipal 
} from '../types/plan';
import { 
  Building2, 
  Home, 
  Mountain, 
  Waves, 
  Flame, 
  Activity, 
  CloudRain, 
  Layers, 
  ArrowRight,
  FlameKindling,
  Sparkles,
  TreePine
} from 'lucide-react';

interface StepHomeProps {
  data: HomeData;
  onChange: (data: HomeData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepHome: React.FC<StepHomeProps> = ({ data, onChange, onNext, onBack }) => {
  const zonas: { id: ZonaHogar; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'ladera',
      label: 'Ladera o pendiente',
      desc: 'Colinas, cerros o zonas con riesgo de derrumbes y deslaves de tierra.',
      icon: <Mountain className="w-5 h-5" />
    },
    {
      id: 'rio_quebrada',
      label: 'Cerca de río o quebrada',
      desc: 'Río Lempa, Acelhuate, Quebrada El Piro o arenales con crecidas súbitas.',
      icon: <Waves className="w-5 h-5" />
    },
    {
      id: 'ciudad',
      label: 'Ciudad o zona urbana',
      desc: 'San Salvador, Santa Ana, San Miguel. Cables caídos, tráfico y sismos.',
      icon: <Building2 className="w-5 h-5" />
    },
    {
      id: 'costa',
      label: 'Costa o litoral',
      desc: 'La Libertad, Usulután. Riesgo de oleaje fuerte, marejadas y sismos.',
      icon: <Waves className="w-5 h-5" />
    },
    {
      id: 'volcan',
      label: 'Falda de volcán',
      desc: 'Cercanía al Boquerón, Ilamatepec o Chaparrastique. Ceniza y sismos.',
      icon: <Flame className="w-5 h-5" />
    }
  ];

  const tiposVivienda: { id: TipoVivienda; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'lamina_mixta',
      label: 'Vivienda de lámina / mixta',
      desc: 'Techo o paredes de lámina galvanizada, madera o material ligero.',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'un_nivel',
      label: 'Casa de un nivel',
      desc: 'Construcción tradicional (bloque, ladrillo o sistema mixto) de 1 planta.',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'dos_niveles',
      label: 'Casa de dos niveles',
      desc: 'Cuenta con gradas internas y dormitorios en segunda planta.',
      icon: <Layers className="w-5 h-5" />
    },
    {
      id: 'apartamento',
      label: 'Apartamento en edificio',
      desc: 'Edificio multifamiliar con gradas comunes y vecinos en niveles.',
      icon: <Building2 className="w-5 h-5" />
    }
  ];

  const riesgos: { id: RiesgoPrincipal; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'sismos',
      label: 'Sismos / Terremotos',
      desc: 'El Salvador es el "Valle de las Hamacas". Temblor súbito y réplicas.',
      icon: <Activity className="w-5 h-5" />,
      color: 'border-amber-400'
    },
    {
      id: 'inundaciones',
      label: 'Inundaciones / Crecidas',
      desc: 'Desborde de aguas lluvias, alcantarillado colapsado o ríos.',
      icon: <Waves className="w-5 h-5" />,
      color: 'border-blue-400'
    },
    {
      id: 'deslizamientos',
      label: 'Deslizamientos / Deslaves',
      desc: 'Saturación del suelo por lluvias continuas en laderas o taludes.',
      icon: <Mountain className="w-5 h-5" />,
      color: 'border-orange-400'
    },
    {
      id: 'tormentas',
      label: 'Tormentas / Temporales',
      desc: 'Vientos fuertes, caída de árboles y lluvias de 48h o más.',
      icon: <CloudRain className="w-5 h-5" />,
      color: 'border-indigo-400'
    },
    {
      id: 'todos',
      label: 'Todos los anteriores',
      desc: 'Plan multiamenaza completo para máxima preparación familiar.',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'border-red-400'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Encabezado del paso */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-2">
          <span className="w-6 h-6 rounded-full bg-[#0B2545] text-[#FFC93C] flex items-center justify-center font-black">1</span>
          Paso 1 de 2: Condiciones de tu hogar
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
          ¿Cómo y dónde está ubicado tu hogar?
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Las medidas de supervivencia cambian radicalmente según el tipo de suelo y los materiales de tu casa.
        </p>
      </div>

      {/* SELECCIÓN 1: ZONA DONDE VIVEN */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="text-base sm:text-lg font-bold text-[#0B2545] block">
            1. Zona geográfica donde viven
          </label>
          <span className="text-xs text-slate-500">
            Selecciona la opción que mejor describa los alrededores de tu vivienda:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {zonas.map((z) => {
            const isSelected = data.zona === z.id;
            return (
              <button
                type="button"
                key={z.id}
                onClick={() => onChange({ ...data, zona: z.id })}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#0B2545] bg-blue-50/70 shadow-sm ring-2 ring-[#0B2545]/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#0B2545] text-[#FFC93C]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {z.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0B2545]" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B2545] mb-1">{z.label}</h4>
                  <p className="text-xs text-slate-600 leading-snug">{z.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECCIÓN 2: TIPO DE VIVIENDA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="text-base sm:text-lg font-bold text-[#0B2545] block">
            2. Tipo de vivienda
          </label>
          <span className="text-xs text-slate-500">
            Los materiales y niveles definen las zonas seguras internas y la velocidad de evacuación:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tiposVivienda.map((t) => {
            const isSelected = data.tipoVivienda === t.id;
            return (
              <button
                type="button"
                key={t.id}
                onClick={() => onChange({ ...data, tipoVivienda: t.id })}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#0B2545] bg-blue-50/70 shadow-sm ring-2 ring-[#0B2545]/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#0B2545] text-[#FFC93C]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {t.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0B2545]" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B2545] mb-1">{t.label}</h4>
                  <p className="text-xs text-slate-600 leading-snug">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Si seleccionó apartamento, preguntar nivel */}
        {data.tipoVivienda === 'apartamento' && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0B2545] block">¿En qué piso o nivel del edificio se encuentra?</span>
              <span className="text-xs text-slate-500">En pisos altos las gradas requieren mayor tiempo de evacuación</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => onChange({ ...data, pisoApartamento: lvl })}
                  className={`w-9 h-9 rounded-xl text-xs font-black transition-colors ${
                    (data.pisoApartamento || 3) === lvl 
                      ? 'bg-[#0B2545] text-[#FFC93C]' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lvl}º
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SELECCIÓN 3: RIESGO PRINCIPAL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="text-base sm:text-lg font-bold text-[#0B2545] block">
            3. Riesgo principal que más te preocupa
          </label>
          <span className="text-xs text-slate-500">
            La app priorizará los protocolos de "Durante" y "Después" para esta amenaza:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {riesgos.map((r) => {
            const isSelected = data.riesgoPrincipal === r.id;
            return (
              <button
                type="button"
                key={r.id}
                onClick={() => onChange({ ...data, riesgoPrincipal: r.id })}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#0B2545] bg-blue-50/70 shadow-sm ring-2 ring-[#0B2545]/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#0B2545] text-[#FFC93C]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {r.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0B2545]" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B2545] mb-1">{r.label}</h4>
                  <p className="text-xs text-slate-600 leading-snug">{r.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETALLES SALVADOREÑOS: TAMBO DE GAS Y ENTORNO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <label className="text-base sm:text-lg font-bold text-[#0B2545] block">
          4. Factores clave del hogar
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Cilindro de gas propano */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <FlameKindling className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#0B2545] block">
                  ¿Tienen cilindro (tambo) de gas propano?
                </span>
                <span className="text-[11px] text-slate-500">
                  Vital para incluir protocolo de cierre de válvula reguladora
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onChange({ ...data, tieneGasPropano: true })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  data.tieneGasPropano 
                    ? 'bg-[#0B2545] text-[#FFC93C]' 
                    : 'bg-white border border-slate-300 text-slate-600'
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...data, tieneGasPropano: false })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !data.tieneGasPropano 
                    ? 'bg-[#0B2545] text-[#FFC93C]' 
                    : 'bg-white border border-slate-300 text-slate-600'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Patio o zona abierta */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#0B2545] block">
                  ¿Tienen patio o espacio abierto?
                </span>
                <span className="text-[11px] text-slate-500">
                  Ayuda a definir el punto de encuentro interno/externo
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onChange({ ...data, tienePatioAbierto: true })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  data.tienePatioAbierto 
                    ? 'bg-[#0B2545] text-[#FFC93C]' 
                    : 'bg-white border border-slate-300 text-slate-600'
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...data, tienePatioAbierto: false })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !data.tienePatioAbierto 
                    ? 'bg-[#0B2545] text-[#FFC93C]' 
                    : 'bg-white border border-slate-300 text-slate-600'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Departamento o Comunidad de referencia (opcional y sin datos personales) */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-600 block mb-1">
            Municipio o departamento de referencia (opcional):
          </label>
          <input
            type="text"
            placeholder="Ejemplo: San Salvador, Soyapango, Santa Tecla, La Libertad..."
            value={data.departamentoOZona || ''}
            onChange={(e) => onChange({ ...data, departamentoOZona: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:border-transparent"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">
            Recuerda: no coloques números de casa ni pasajes específicos por privacidad.
          </span>
        </div>
      </div>

      {/* Botones de Navegación Inferior */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors"
        >
          Volver a inicio
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-4 rounded-2xl bg-[#FFC93C] hover:bg-amber-400 text-[#0B2545] font-extrabold text-base flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
        >
          <span>Siguiente: Miembros de la familia</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
