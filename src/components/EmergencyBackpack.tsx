import React, { useState } from 'react';
import { ItemMochila } from '../types/plan';
import { 
  Backpack, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Sparkles, 
  Droplets, 
  HeartPulse, 
  Wrench, 
  FileText, 
  Users,
  AlertCircle,
  RotateCcw
} from 'lucide-react';

interface EmergencyBackpackProps {
  items: ItemMochila[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: ItemMochila) => void;
  onResetItems: () => void;
}

export const EmergencyBackpack: React.FC<EmergencyBackpackProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onResetItems,
}) => {
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ItemMochila['categoria']>('herramientas');
  const [showAddForm, setShowAddForm] = useState(false);

  // Calcular progreso
  const total = items.length;
  const completed = items.filter(i => i.completado).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ItemMochila = {
      id: `custom-item-${Date.now()}`,
      item: newItemText.trim(),
      categoria: newItemCategory,
      motivo: 'Artículo añadido por la familia para su preparación específica.',
      esencial: false,
      completado: true
    };

    onAddItem(newItem);
    setNewItemText('');
    setShowAddForm(false);
  };

  const getCategoryDetails = (cat: ItemMochila['categoria']) => {
    switch (cat) {
      case 'agua_alimentos':
        return { label: 'Agua y Alimentos', icon: <Droplets className="w-4 h-4 text-blue-600" />, badge: 'bg-blue-50 text-blue-800' };
      case 'botiquin':
        return { label: 'Botiquín y Salud', icon: <HeartPulse className="w-4 h-4 text-rose-600" />, badge: 'bg-rose-50 text-rose-800' };
      case 'herramientas':
        return { label: 'Herramientas y Comunicación', icon: <Wrench className="w-4 h-4 text-amber-600" />, badge: 'bg-amber-50 text-amber-800' };
      case 'documentos':
        return { label: 'Documentos y Dinero', icon: <FileText className="w-4 h-4 text-emerald-600" />, badge: 'bg-emerald-50 text-emerald-800' };
      case 'especiales_familia':
        return { label: 'Insumos Específicos del Hogar', icon: <Users className="w-4 h-4 text-purple-600" />, badge: 'bg-purple-50 text-purple-800' };
    }
  };

  const categoriesOrder: ItemMochila['categoria'][] = [
    'agua_alimentos',
    'botiquin',
    'herramientas',
    'documentos',
    'especiales_familia'
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* TARJETA DE PROGRESO DE LA MOCHILA */}
      <div className="bg-[#0B2545] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC93C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC93C] text-[#0B2545] flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
                <Backpack className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Mochila de Emergencia (72 Horas)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Kit de supervivencia diseñado para resistir las primeras 72 horas sin servicios básicos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3.5 py-2 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-700/60 text-[#FFC93C] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ Agregar artículo</span>
              </button>
            </div>
          </div>

          {/* Barra de progreso requerida */}
          <div className="bg-blue-950/70 p-5 rounded-2xl border border-blue-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#FFC93C]">
                Tienes el {percentage}% de tu mochila lista
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                {completed} de {total} suministros preparados
              </span>
            </div>

            <div className="w-full h-4 rounded-full bg-blue-900/60 overflow-hidden border border-blue-700/60 p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  percentage >= 100 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-300' 
                    : percentage >= 60 
                    ? 'bg-gradient-to-r from-[#FFC93C] to-amber-300' 
                    : 'bg-gradient-to-r from-red-500 to-[#FFC93C]'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <span>
                {percentage === 100 
                  ? '🎉 ¡Excelente! Tu familia tiene la mochila 100% lista para cualquier evacuación.' 
                  : percentage >= 60 
                  ? 'Buen avance. Revisa los medicamentos y documentos que faltan.' 
                  : 'Faltan elementos vitales. Revisa cada casilla para prepararla con tiempo.'}
              </span>
              {completed > 0 && (
                <button
                  onClick={onResetItems}
                  className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1 transition-colors"
                  title="Reiniciar casillas"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reiniciar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO AGREGAR ARTÍCULO */}
      {showAddForm && (
        <form onSubmit={handleAddNew} className="bg-white p-5 rounded-3xl border-2 border-[#FFC93C] shadow-md space-y-4 animate-in fade-in duration-150">
          <h4 className="text-sm font-extrabold text-[#0B2545] flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#0B2545]" />
            Añadir artículo personalizado a tu mochila
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Nombre del artículo (ej. Lentes de repuesto, libreta con teléfonos)..."
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                autoFocus
              />
            </div>
            <div>
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as ItemMochila['categoria'])}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              >
                <option value="herramientas">Herramientas y Comunicación</option>
                <option value="agua_alimentos">Agua y Alimentos</option>
                <option value="botiquin">Botiquín y Salud</option>
                <option value="documentos">Documentos y Dinero</option>
                <option value="especiales_familia">Insumos Especiales</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0B2545] text-[#FFC93C] text-xs font-bold hover:bg-blue-900 shadow-sm"
            >
              Guardar en mochila
            </button>
          </div>
        </form>
      )}

      {/* CHECKLIST POR CATEGORÍAS */}
      <div className="space-y-6">
        {categoriesOrder.map((catKey) => {
          const categoryItems = items.filter(i => i.categoria === catKey);
          if (categoryItems.length === 0) return null;
          const { label, icon, badge } = getCategoryDetails(catKey);

          return (
            <div key={catKey} className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                    {icon}
                  </div>
                  <h3 className="font-extrabold text-base text-[#0B2545]">
                    {label}
                  </h3>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badge}`}>
                  {categoryItems.filter(i => i.completado).length} de {categoryItems.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryItems.map((it) => {
                  return (
                    <div
                      key={it.id}
                      onClick={() => onToggleItem(it.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                        it.completado
                          ? 'bg-emerald-50/50 border-emerald-300 text-slate-900 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={`Marcar ${it.item}`}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          it.completado
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'border-2 border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        {it.completado && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm font-bold leading-snug ${
                            it.completado ? 'line-through text-slate-500' : 'text-[#0B2545]'
                          }`}>
                            {it.item}
                          </h4>
                          {it.esencial && (
                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-800 shrink-0">
                              Vital
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed">
                          {it.motivo}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* RECOMENDACIÓN DE UBICACIÓN DE LA MOCHILA */}
      <div className="rounded-3xl p-6 bg-amber-50/70 border border-amber-200 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-extrabold text-sm text-amber-950">
            ¿Dónde colocar la mochila en casa?
          </h4>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            Guarda la mochila en un lugar de paso accesible, <strong>cerca de la puerta de salida principal</strong> y a una altura donde un adulto o joven pueda tomarla en un solo segundo sin buscar llaves ni abrir armarios trabados.
          </p>
        </div>
      </div>
    </div>
  );
};
