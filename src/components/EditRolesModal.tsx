import React, { useState } from 'react';
import { RolFamiliar, PlanEmergencia } from '../types/plan';
import { 
  Users, 
  X, 
  Check, 
  Plus, 
  Trash2, 
  Shield, 
  Sparkles, 
  Flame, 
  Baby, 
  Dog, 
  Backpack, 
  HeartHandshake,
  RotateCcw
} from 'lucide-react';

interface EditRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  roles: RolFamiliar[];
  onSaveRoles: (updatedRoles: RolFamiliar[]) => void;
}

export const EditRolesModal: React.FC<EditRolesModalProps> = ({
  isOpen,
  onClose,
  roles,
  onSaveRoles,
}) => {
  const [editedRoles, setEditedRoles] = useState<RolFamiliar[]>(() => [...roles]);

  // Sincronizar si cambian los roles de props
  React.useEffect(() => {
    setEditedRoles([...roles]);
  }, [roles]);

  if (!isOpen) return null;

  const handleUpdateRole = (idx: number, field: keyof RolFamiliar, value: any) => {
    setEditedRoles(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleAddTask = (idx: number, taskText: string) => {
    if (!taskText.trim()) return;
    setEditedRoles(prev => {
      const copy = [...prev];
      copy[idx] = {
        ...copy[idx],
        tareasClave: [...copy[idx].tareasClave, taskText.trim()]
      };
      return copy;
    });
  };

  const handleRemoveTask = (roleIdx: number, taskIdx: number) => {
    setEditedRoles(prev => {
      const copy = [...prev];
      copy[roleIdx] = {
        ...copy[roleIdx],
        tareasClave: copy[roleIdx].tareasClave.filter((_, i) => i !== taskIdx)
      };
      return copy;
    });
  };

  const handleApplyPreset = (idx: number, presetTitle: string, presetEquip: string, defaultTasks: string[]) => {
    setEditedRoles(prev => {
      const copy = [...prev];
      copy[idx] = {
        ...copy[idx],
        rolTitulo: presetTitle,
        equipoAsignado: presetEquip,
        tareasClave: defaultTasks
      };
      return copy;
    });
  };

  const handleSave = () => {
    onSaveRoles(editedRoles);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D64545] text-white flex items-center justify-center font-black shadow-md shadow-red-900/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#0B2545]">
                Editar Roles Familiares
              </h3>
              <p className="text-xs text-slate-500">
                Personaliza la responsabilidad, equipo y tareas de cada miembro de tu hogar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roles editables */}
        <div className="space-y-6">
          {editedRoles.map((rol, idx) => (
            <div
              key={rol.id || idx}
              className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 space-y-4 hover:border-slate-300 transition-colors"
            >
              {/* Encabezado del miembro */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 rounded-xl bg-[#0B2545] text-[#FFC93C]">
                    {rol.miembroAlias}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Miembro #{idx + 1}
                  </span>
                </div>

                {/* Prioridad */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">Prioridad:</span>
                  <select
                    value={rol.prioridad}
                    onChange={(e) => handleUpdateRole(idx, 'prioridad', e.target.value)}
                    className="text-xs font-bold px-2 py-1 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  >
                    <option value="alta">Alta (Crítica)</option>
                    <option value="media">Media</option>
                    <option value="apoyo">Apoyo</option>
                  </select>
                </div>
              </div>

              {/* Título del rol */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0B2545] block">
                  Título del Rol:
                </label>
                <input
                  type="text"
                  value={rol.rolTitulo}
                  onChange={(e) => handleUpdateRole(idx, 'rolTitulo', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-[#0B2545] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                  placeholder="Ej. Líder del Hogar y Mochila..."
                />
              </div>

              {/* Atajos de roles predefinidos */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 block">
                  Plantillas rápidas:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset(
                      idx, 
                      'Coordinador General y Mochila 72h', 
                      'Mochila de 72 horas y linterna principal', 
                      ['Tomar la mochila de 72h junto a la puerta.', 'Cerrar llave de paso del gas propano.', 'Guiar hacia el punto de reunión acordado.']
                    )}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-1"
                  >
                    <Backpack className="w-3 h-3 text-amber-600" />
                    Líder y Mochila
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset(
                      idx, 
                      'Encargado de Tambo de Gas y Electricidad', 
                      'Linterna de mano y guantes de carnaza', 
                      ['Cerrar válvula del regulador del cilindro de gas.', 'Bajar palanca principal eléctrica (caja térmica).', 'Verificar que no haya fugas de gas.']
                    )}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-1"
                  >
                    <Flame className="w-3 h-3 text-red-600" />
                    Gas y Breakers
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset(
                      idx, 
                      'Acompañante de Movilidad y Asistencia', 
                      'Botiquín de mano y linterna secundaria', 
                      ['Asistir al adulto mayor o menor con calma.', 'Colocar calzado adecuado y bastón/andadera.', 'No separarse durante la salida.']
                    )}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-1"
                  >
                    <HeartHandshake className="w-3 h-3 text-purple-600" />
                    Asistencia y Adulto Mayor
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset(
                      idx, 
                      'Guardián de Mascotas y Seguridad', 
                      'Correas, transportadora y ración de alimento', 
                      ['Colocar correa y asegurar a las mascotas.', 'Meter gatos o aves en su jaula transportadora.', 'Llevar agua y alimento para los animales.']
                    )}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-1"
                  >
                    <Dog className="w-3 h-3 text-emerald-600" />
                    Mascotas
                  </button>
                </div>
              </div>

              {/* Equipo asignado */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0B2545] block">
                  Equipo o Suministros Asignados:
                </label>
                <input
                  type="text"
                  value={rol.equipoAsignado}
                  onChange={(e) => handleUpdateRole(idx, 'equipoAsignado', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                  placeholder="Ej. Mochila de emergencia, linterna, silbato..."
                />
              </div>

              {/* Tareas Clave */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0B2545] block">
                  Tareas Específicas durante la Emergencia:
                </label>
                <div className="space-y-1.5">
                  {rol.tareasClave.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => {
                          const updated = [...rol.tareasClave];
                          updated[tIdx] = e.target.value;
                          handleUpdateRole(idx, 'tareasClave', updated);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTask(idx, tIdx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar tarea"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Agregar tarea */}
                <button
                  type="button"
                  onClick={() => handleAddTask(idx, 'Nueva tarea específica')}
                  className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 pt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar otra tarea</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de acción del pie */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#D64545] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-red-900/20 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Guardar y Actualizar Roles</span>
          </button>
        </div>
      </div>
    </div>
  );
};
