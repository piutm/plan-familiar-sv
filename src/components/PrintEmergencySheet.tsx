import React from 'react';
import { PlanEmergencia, HomeData, MiembroFamilia } from '../types/plan';
import { INSTITUTIONAL_CONTACTS } from '../utils/emergencyEngine';
import { Shield, PhoneCall, AlertTriangle, MapPin, Users, Backpack } from 'lucide-react';

interface PrintEmergencySheetProps {
  plan: PlanEmergencia;
  home: HomeData;
  family: MiembroFamilia[];
}

export const PrintEmergencySheet: React.FC<PrintEmergencySheetProps> = ({ plan, home, family }) => {
  return (
    <div className="hidden print:block p-6 bg-white text-slate-900 text-xs font-sans">
      {/* Encabezado oficial */}
      <div className="border-b-2 border-slate-900 pb-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">
              Plan Familiar de Emergencia • El Salvador
            </h1>
            <p className="text-[11px] text-slate-600 font-semibold">
              Ficha oficial para refrigerador y mochila de 72 horas • Revisión {new Date().toLocaleDateString('es-SV')}
            </p>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-500">
          <span className="font-bold block text-slate-800">
            Hogar: {home.zona.toUpperCase()} • {home.tipoVivienda.toUpperCase()}
          </span>
          <span>Riesgo principal: {home.riesgoPrincipal.toUpperCase()}</span>
        </div>
      </div>

      {/* Puntos de encuentro urgentes */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="border-2 border-slate-800 rounded-xl p-3 bg-slate-50">
          <span className="text-[10px] font-black uppercase text-slate-700 block mb-1">
            📍 Punto Interno Seguro (Dentro de casa)
          </span>
          <p className="text-xs font-bold text-slate-900">
            {plan.puntosReunion.puntoInterno}
          </p>
        </div>

        <div className="border-2 border-slate-800 rounded-xl p-3 bg-slate-50">
          <span className="text-[10px] font-black uppercase text-slate-700 block mb-1">
            🚩 Punto de Reunión Externo (Punto de Encuentro)
          </span>
          <p className="text-xs font-bold text-slate-900">
            {plan.puntosReunion.puntoExterno}
          </p>
        </div>
      </div>

      {/* Roles de cada miembro */}
      <div className="mb-4">
        <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          Roles Familiares Asignados
        </h3>
        <table className="w-full text-[11px] border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 text-left font-black">
              <th className="p-2 border border-slate-300">Miembro</th>
              <th className="p-2 border border-slate-300">Rol asignado</th>
              <th className="p-2 border border-slate-300">Tareas durante la emergencia</th>
              <th className="p-2 border border-slate-300">Equipo a cargo</th>
            </tr>
          </thead>
          <tbody>
            {plan.roles.map((r, i) => (
              <tr key={r.id || i} className="border-b border-slate-200">
                <td className="p-2 font-bold border border-slate-300 whitespace-nowrap">{r.miembroAlias}</td>
                <td className="p-2 font-bold text-slate-800 border border-slate-300">{r.rolTitulo}</td>
                <td className="p-2 border border-slate-300">{r.tareasClave.join('; ')}</td>
                <td className="p-2 font-bold border border-slate-300">{r.equipoAsignado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Protocolo de los primeros 60 segundos (Durante) */}
      <div className="mb-4">
        <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          Pasos Exactos en el Momento del Evento (Durante)
        </h3>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {plan.fases.durante.slice(0, 4).map((p, idx) => (
            <div key={idx} className="p-2 border border-slate-300 rounded-lg">
              <span className="font-black text-slate-900 block">{p.titulo}</span>
              <span className="text-slate-700">{p.detalle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mochila de las 72 Horas Checklist */}
      <div className="mb-4">
        <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1 flex items-center gap-1.5">
          <Backpack className="w-3.5 h-3.5" />
          Mochila de Emergencia (72 Horas)
        </h3>
        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          {plan.mochila.slice(0, 12).map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 p-1 border border-slate-200 rounded">
              <div className="w-3 h-3 border border-slate-400 rounded-xs" />
              <span className="truncate font-semibold">{item.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Teléfonos de Auxilio El Salvador */}
      <div className="border-t-2 border-slate-900 pt-3">
        <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5" />
          Teléfonos de Auxilio Oficiales • El Salvador
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 border border-slate-300 rounded-lg bg-slate-50">
            <span className="block font-black text-sm text-red-600">913</span>
            <span className="text-[10px] text-slate-600 font-bold">Bomberos SV</span>
          </div>
          <div className="p-2 border border-slate-300 rounded-lg bg-slate-50">
            <span className="block font-black text-sm text-red-600">132</span>
            <span className="text-[10px] text-slate-600 font-bold">SEM Ambulancias</span>
          </div>
          <div className="p-2 border border-slate-300 rounded-lg bg-slate-50">
            <span className="block font-black text-sm text-blue-900">2281-0888</span>
            <span className="text-[10px] text-slate-600 font-bold">Protección Civil</span>
          </div>
          <div className="p-2 border border-slate-300 rounded-lg bg-slate-50">
            <span className="block font-black text-sm text-blue-900">911</span>
            <span className="text-[10px] text-slate-600 font-bold">PNC Emergencias</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
          <span>Compromiso familiar: Pegar esta ficha en la refrigeradora o junto a la puerta principal.</span>
          <span>Generado por PlanFamiliar SV</span>
        </div>
      </div>
    </div>
  );
};
