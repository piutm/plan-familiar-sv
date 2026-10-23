import React from 'react';
import { 
  ShieldAlert, 
  ArrowRight, 
  Users, 
  Backpack, 
  PhoneCall, 
  Sparkles, 
  Home, 
  MapPin, 
  Flame,
  Waves,
  Mountain,
  Building2,
  Lock
} from 'lucide-react';
import { PRESET_SCENARIOS, PresetScenario } from '../utils/presets';

interface WelcomeScreenProps {
  onStart: () => void;
  onSelectPreset: (preset: PresetScenario) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onSelectPreset }) => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white text-slate-900 p-6 sm:p-10 md:p-14 shadow-xl border border-slate-200">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Badge salvadoreño */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0B2545] text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 shadow-xs">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Protección Civil y Gestión de Riesgo • El Salvador
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B2545] leading-tight mb-4">
            Un plan hecho a la <span className="text-amber-500">medida</span> de tu familia.
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
            En El Salvador enfrentamos sismos frecuentes, lluvias torrenciales y deslizamientos. 
            <strong className="text-slate-900 font-semibold"> Un plan genérico copiado de un afiche no sirve igual para todos: </strong> 
            no es lo mismo una casa de lámina en ladera que un apartamento en un tercer nivel. 
            Describe tu hogar y genera tu plan personalizado en 2 minutos.
          </p>

          {/* Gran Botón de Inicio */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <button
              onClick={onStart}
              className="px-8 py-5 rounded-2xl bg-[#FFC93C] hover:bg-amber-400 text-[#0B2545] font-extrabold text-lg sm:text-xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 select-none"
            >
              <span>Crear mi plan</span>
              <ArrowRight className="w-6 h-6 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 px-3 py-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>100% gratuito • Adaptado a sismos, deslaves y tambo de gas</span>
            </div>
          </div>

          {/* AVISO DE PRIVACIDAD OBLIGATORIO POR RÚBRICA */}
          <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 text-amber-800">
              <Lock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                Aviso importante de seguridad y privacidad
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                <strong>No ingreses datos personales reales</strong> (evita números de DUI, apellidos reales o tu dirección exacta). 
                Usa únicamente alias o nombres ficticios para tu familia (ejemplo: <em>"Mamá"</em>, <em>"Hijo menor"</em>, <em>"Abuela Chepita"</em>).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Qué incluye tu plan personalizado */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
            ¿Qué incluye tu plan familiar?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Estrategias claras pensadas para el segundo exacto en que ocurre la emergencia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B2545] flex items-center justify-center mb-4">
              <Home className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2545] mb-2">Rutas y Puntos Seguros</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Evaluación según si vives en casa de lámina, ladera o apartamento, identificando el sitio más seguro.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Backpack className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2545] mb-2">Mochila de las 72 Horas</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Checklist interactiva con barra de progreso adaptada a bebés, medicamentos crónicos y mascotas.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D64545] flex items-center justify-center mb-4">
              <Users className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2545] mb-2">Roles Familiares</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Quién toma la mochila, quién asiste al abuelo o bebé, y quién cierra la válvula del tambo de gas.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-bold text-base text-[#0B2545] mb-2">Contactos de Auxilio SV</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Acceso a un clic a Bomberos 913, SEM 132, Protección Civil 2281-0888 y botón para compartir por WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Casos típicos de El Salvador (Prueba rápida con 1 clic) */}
      <div className="bg-slate-100/80 rounded-3xl p-6 sm:p-8 border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Prueba rápida en 1 clic
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2545]">
              O explora con un ejemplo real de El Salvador
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Ideal para evaluar y ver la personalización instantánea
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="text-left bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#FFC93C] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2545] group-hover:bg-[#FFC93C]/20 group-hover:text-[#0B2545] flex items-center justify-center transition-colors">
                    {preset.icono === 'Mountain' && <Mountain className="w-5 h-5" />}
                    {preset.icono === 'Waves' && <Waves className="w-5 h-5" />}
                    {preset.icono === 'Building2' && <Building2 className="w-5 h-5" />}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {preset.badge}
                  </span>
                </div>
                <h4 className="font-extrabold text-[#0B2545] text-sm group-hover:text-blue-900 mb-1">
                  {preset.titulo}
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  {preset.subtitulo}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B2545] group-hover:text-blue-900">
                <span>Cargar este caso</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFC93C]" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
