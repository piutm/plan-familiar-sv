import React, { useState } from 'react';
import { 
  PlanEmergencia, 
  HomeData, 
  MiembroFamilia,
  RolFamiliar 
} from '../types/plan';
import { EditRolesModal } from './EditRolesModal';
import { 
  ShieldAlert, 
  Share2, 
  Printer, 
  Users, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Flame, 
  Building2, 
  Heart, 
  Backpack, 
  Radio, 
  Sparkles,
  PhoneCall,
  Check,
  ChevronRight,
  Edit3
} from 'lucide-react';

interface PlanDashboardProps {
  plan: PlanEmergencia;
  home: HomeData;
  family: MiembroFamilia[];
  onOpenBackpack: () => void;
  onOpenContacts: () => void;
  onPrint: () => void;
  onUpdateRoles?: (updatedRoles: RolFamiliar[]) => void;
}

export const PlanDashboard: React.FC<PlanDashboardProps> = ({
  plan,
  home,
  family,
  onOpenBackpack,
  onOpenContacts,
  onPrint,
  onUpdateRoles,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'antes' | 'durante' | 'despues' | 'roles' | 'puntos'>('durante');
  const [copiedShare, setCopiedShare] = useState(false);
  const [isEditRolesOpen, setIsEditRolesOpen] = useState(false);

  const handleSaveRoles = (updatedRoles: RolFamiliar[]) => {
    if (onUpdateRoles) {
      onUpdateRoles(updatedRoles);
    } else {
      plan.roles = updatedRoles;
    }
  };

  // Formatear texto para compartir por WhatsApp
  const handleShareWhatsApp = () => {
    const text = `🚨 *PLAN FAMILIAR DE EMERGENCIA SV* 🚨
Hogar de ${family.length} personas en ${home.zona} (${home.tipoVivienda})
Riesgo: ${home.riesgoPrincipal.toUpperCase()}

📍 *PUNTO DE REUNIÓN EXTERNO:*
${plan.puntosReunion.puntoExterno}

👥 *ROLES ASIGNADOS:*
${plan.roles.map(r => `• *${r.miembroAlias}:* ${r.rolTitulo}`).join('\n')}

🎒 *MOCHILA DE 72 HORAS:*
Revisada y lista en la salida principal.

📞 *EMERGENCIAS EL SALVADOR:*
• Bomberos: 913
• SEM (Ambulancias): 132
• Protección Civil: 2281-0888
• PNC: 911

Generado con PlanFamiliar SV - ¡Por la seguridad de nuestra familia!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopySummary = () => {
    const text = `PLAN FAMILIAR DE EMERGENCIA SV
Punto de reunión externo: ${plan.puntosReunion.puntoExterno}
Punto interno seguro: ${plan.puntosReunion.puntoInterno}
Roles: ${plan.roles.map(r => `${r.miembroAlias} (${r.rolTitulo})`).join(', ')}
Emergencias SV: Bomberos 913 | SEM 132 | Protección Civil 2281-0888`;

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Crítico':
        return 'bg-red-500 text-white border-red-600';
      case 'Alto':
        return 'bg-[#D64545] text-white border-red-700';
      default:
        return 'bg-[#FFC93C] text-[#0B2545] border-amber-500';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* TARJETA PRINCIPAL DE ENCABEZADO Y RESUMEN */}
      <div className="bg-[#0B2545] text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-blue-900/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC93C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getNivelColor(plan.diagnosticoVulnerabilidad.nivel)}`}>
                Vulnerabilidad: {plan.diagnosticoVulnerabilidad.nivel}
              </span>
              <span className="text-xs text-blue-200">
                • {plan.source === 'gemini' ? 'Optimizado con IA Gemini' : 'Protocolo Oficial SV'}
              </span>
            </div>

            {/* Botones de Compartir, Editar Roles y Descargar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsEditRolesOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#D64545] hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-red-900/30 transition-all active:scale-95"
              >
                <Users className="w-4 h-4" />
                <span>Editar Roles</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={onPrint}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimir Ficha</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Tu Plan Familiar de Emergencia
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 leading-relaxed max-w-3xl">
              {plan.resumenEjecutivo}
            </p>
          </div>

          {/* Puntos críticos identificados */}
          {plan.diagnosticoVulnerabilidad.puntosCriticos.length > 0 && (
            <div className="pt-2 border-t border-blue-900/60">
              <span className="text-xs font-bold text-[#FFC93C] uppercase tracking-wider block mb-1.5">
                Factores críticos detectados en tu vivienda:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {plan.diagnosticoVulnerabilidad.puntosCriticos.map((critico, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-blue-950/50 p-2.5 rounded-xl border border-blue-900/40">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#FFC93C] shrink-0 mt-0.5" />
                    <span>{critico}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABS DE SECCIONES (Antes, Durante, Después, Roles, Puntos) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Barra superior de pestañas */}
        <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none bg-slate-50/70 p-2 gap-1.5">
          <button
            onClick={() => setActiveSubTab('durante')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeSubTab === 'durante'
                ? 'bg-[#0B2545] text-[#FFC93C] shadow-md shadow-blue-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#FFC93C]" />
            <span>Durante (Actuar)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('antes')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeSubTab === 'antes'
                ? 'bg-[#0B2545] text-[#FFC93C] shadow-md shadow-blue-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Antes (Preparar)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('despues')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeSubTab === 'despues'
                ? 'bg-[#0B2545] text-[#FFC93C] shadow-md shadow-blue-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Después (Evaluar)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('roles')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeSubTab === 'roles'
                ? 'bg-[#0B2545] text-[#FFC93C] shadow-md shadow-blue-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Roles Familiares ({plan.roles.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('puntos')}
            className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeSubTab === 'puntos'
                ? 'bg-[#0B2545] text-[#FFC93C] shadow-md shadow-blue-950/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Puntos de Reunión</span>
          </button>
        </div>

        {/* CONTENIDO DE CADA PESTAÑA */}
        <div className="p-6 sm:p-8">
          {/* PESTAÑA: DURANTE */}
          {activeSubTab === 'durante' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#D64545] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-red-950">
                    Protocolo en caso de {home.riesgoPrincipal.toUpperCase()}
                  </h4>
                  <p className="text-xs text-red-800 mt-0.5">
                    Sigue estos pasos en orden cronológico exacto. Mantén la calma para transmitir seguridad a los demás.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {plan.fases.durante.map((paso, idx) => (
                  <div 
                    key={paso.id || idx}
                    className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#0B2545] transition-all flex flex-col sm:flex-row items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#0B2545] text-[#FFC93C] font-black text-lg flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <h4 className="text-base font-extrabold text-[#0B2545]">
                        {paso.titulo}
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {paso.detalle}
                      </p>

                      {paso.alerta && (
                        <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{paso.alerta}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PESTAÑA: ANTES */}
          {activeSubTab === 'antes' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0B2545] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-[#0B2545]">
                    Qué revisar y preparar en tu hogar antes del evento
                  </h4>
                  <p className="text-xs text-slate-700 mt-0.5">
                    La prevención salva vidas. Realiza estas tareas con tu familia este fin de semana.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.fases.antes.map((paso, idx) => (
                  <div
                    key={paso.id || idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {paso.categoria || 'Preparación'}
                        </span>
                        <CheckCircle className="w-4 h-4 text-slate-300" />
                      </div>

                      <h4 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
                        {paso.titulo}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {paso.detalle}
                      </p>

                      {paso.advertencia && (
                        <div className="mt-2 p-2 rounded-lg bg-red-50 text-[11px] font-bold text-red-900 border border-red-200">
                          ⚠️ {paso.advertencia}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PESTAÑA: DESPUÉS */}
          {activeSubTab === 'despues' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-emerald-950">
                    Protocolo de recuperación inmediata tras la emergencia
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Evita accidentes secundarios (incendios por fugas de gas, colapso de cables o réplicas).
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {plan.fases.despues.map((paso, idx) => (
                  <div 
                    key={paso.id || idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-white flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold text-sm flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
                        {paso.titulo}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {paso.detalle}
                      </p>
                      {paso.advertencia && (
                        <p className="text-xs font-bold text-red-700 mt-1">
                          ⚠️ {paso.advertencia}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PESTAÑA: ROLES FAMILIARES */}
          {activeSubTab === 'roles' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#0B2545] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0B2545]">
                      Asignación clara de responsabilidades familiares
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Cada miembro debe tener una tarea clara para no perder tiempo ni dudar durante el suceso.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditRolesOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#D64545] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Personalizar Roles</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.roles.map((rol) => (
                  <div
                    key={rol.id}
                    className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#0B2545] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#0B2545] text-[#FFC93C]">
                          {rol.miembroAlias}
                        </span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          rol.prioridad === 'alta' 
                            ? 'bg-red-100 text-red-800' 
                            : rol.prioridad === 'media'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}>
                          Prioridad {rol.prioridad}
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-[#0B2545] mb-2">
                        {rol.rolTitulo}
                      </h4>

                      <ul className="space-y-1.5 mb-4 text-xs sm:text-sm text-slate-700">
                        {rol.tareasClave.map((t, tidx) => (
                          <li key={tidx} className="flex items-start gap-2">
                            <span className="text-[#0B2545] font-black shrink-0">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">
                        Equipo o suministros a cargo:
                      </span>
                      <span className="text-xs font-bold text-[#0B2545]">
                        🎒 {rol.equipoAsignado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PESTAÑA: PUNTOS DE REUNIÓN */}
          {activeSubTab === 'puntos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#0B2545]">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Punto Interno (Dentro de la vivienda)
                  </div>
                  <h4 className="text-base font-extrabold text-[#0B2545]">
                    Zona segura inmediata
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {plan.puntosReunion.puntoInterno}
                  </p>
                </div>

                <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-emerald-800">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Punto Externo (Fuera de la vivienda)
                  </div>
                  <h4 className="text-base font-extrabold text-emerald-950">
                    Zona de encuentro familiar
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {plan.puntosReunion.puntoExterno}
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500 block">
                    Ruta de Evacuación Principal
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {plan.puntosReunion.rutaEvacuacion}
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500 block">
                    Zona Segura Comunitaria / Albergue
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {plan.puntosReunion.zonaSeguraComunitaria}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONSEJOS LOCALES SALVADOREÑOS */}
      {plan.consejosLocales && plan.consejosLocales.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-900">
            <Radio className="w-4 h-4 text-amber-700" />
            Recomendaciones esenciales para El Salvador
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-amber-950">
            {plan.consejosLocales.map((consejo, i) => (
              <div key={i} className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-200/60">
                <span className="font-black text-amber-700 shrink-0">•</span>
                <span>{consejo}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACCIONES DESTACADAS INFERIORES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Ir a Mochila */}
        <button
          onClick={onOpenBackpack}
          className="p-5 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#FFC93C] shadow-sm flex items-center justify-between text-left transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Backpack className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-[#0B2545]">
                Revisar Mochila de las 72 Horas
              </h4>
              <p className="text-xs text-slate-500">
                Checklist interactiva con barra de progreso
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Ir a Directorio de Emergencias */}
        <button
          onClick={onOpenContacts}
          className="p-5 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#D64545] shadow-sm flex items-center justify-between text-left transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D64545] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-[#0B2545]">
                Números Clave y Directorio SV
              </h4>
              <p className="text-xs text-slate-500">
                Bomberos 913, SEM 132, Protección Civil y contactos
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* MODAL PARA EDITAR ROLES FAMILIARES */}
      <EditRolesModal
        isOpen={isEditRolesOpen}
        onClose={() => setIsEditRolesOpen(false)}
        roles={plan.roles}
        onSaveRoles={handleSaveRoles}
      />
    </div>
  );
};
