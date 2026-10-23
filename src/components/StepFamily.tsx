import React, { useState } from 'react';
import { 
  MiembroFamilia, 
  Mascota, 
  RangoEdad, 
  NecesidadEspecial 
} from '../types/plan';
import { 
  User, 
  UserPlus, 
  Trash2, 
  Baby, 
  HeartHandshake, 
  Pill, 
  Accessibility, 
  Dog, 
  Cat, 
  Bird, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ShieldAlert,
  Plus,
  Minus
} from 'lucide-react';

interface StepFamilyProps {
  family: MiembroFamilia[];
  pets: Mascota[];
  onChangeFamily: (family: MiembroFamilia[]) => void;
  onChangePets: (pets: Mascota[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepFamily: React.FC<StepFamilyProps> = ({
  family,
  pets,
  onChangeFamily,
  onChangePets,
  onNext,
  onBack,
}) => {
  // Estado para modal / formulario rápido de agregar persona
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlias, setNewAlias] = useState('');
  const [newEdad, setNewEdad] = useState<number>(30);
  const [newNecesidades, setNewNecesidades] = useState<NecesidadEspecial[]>(['ninguna']);
  const [newDetalle, setNewDetalle] = useState('');

  // Helper para determinar rango de edad
  const calculateRango = (edad: number): RangoEdad => {
    if (edad <= 2) return 'bebe';
    if (edad <= 12) return 'nino';
    if (edad >= 60) return 'adulto_mayor';
    return 'adulto';
  };

  const handleAddMember = () => {
    const aliasClean = newAlias.trim() || `Familiar ${family.length + 1}`;
    const rango = calculateRango(newEdad);

    const newMember: MiembroFamilia = {
      id: `m-${Date.now()}`,
      alias: aliasClean,
      edad: Number(newEdad) || 25,
      rangoEdad: rango,
      necesidades: newNecesidades.length > 0 ? newNecesidades : ['ninguna'],
      detalleNecesidad: newDetalle.trim() || undefined,
    };

    onChangeFamily([...family, newMember]);
    // Reset modal
    setNewAlias('');
    setNewEdad(30);
    setNewNecesidades(['ninguna']);
    setNewDetalle('');
    setShowAddModal(false);
  };

  const handleQuickAdd = (tipo: 'bebe' | 'nino' | 'adulto' | 'adulto_mayor') => {
    let edad = 30;
    let alias = 'Familiar';
    let necesidades: NecesidadEspecial[] = ['ninguna'];

    if (tipo === 'bebe') {
      edad = 1;
      alias = `Bebé ${family.filter(f => f.rangoEdad === 'bebe').length + 1}`;
      necesidades = ['bebe'];
    } else if (tipo === 'nino') {
      edad = 7;
      alias = `Hijo/a ${family.filter(f => f.rangoEdad === 'nino').length + 1}`;
    } else if (tipo === 'adulto_mayor') {
      edad = 68;
      alias = `Abuelo/a`;
      necesidades = ['medicamentos'];
    } else {
      edad = 35;
      alias = `Adulto ${family.filter(f => f.rangoEdad === 'adulto').length + 1}`;
    }

    const newMember: MiembroFamilia = {
      id: `m-${Date.now()}`,
      alias,
      edad,
      rangoEdad: tipo,
      necesidades,
    };

    onChangeFamily([...family, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    if (family.length <= 1) {
      alert('Tu plan debe incluir al menos una persona responsable en el hogar.');
      return;
    }
    onChangeFamily(family.filter(m => m.id !== id));
  };

  const toggleNecesidad = (nec: NecesidadEspecial) => {
    if (nec === 'ninguna') {
      setNewNecesidades(['ninguna']);
      return;
    }
    const filtered = newNecesidades.filter(n => n !== 'ninguna');
    if (filtered.includes(nec)) {
      const next = filtered.filter(n => n !== nec);
      setNewNecesidades(next.length === 0 ? ['ninguna'] : next);
    } else {
      setNewNecesidades([...filtered, nec]);
    }
  };

  // Helper iconos miembros
  const getMemberIcon = (rango: RangoEdad) => {
    switch (rango) {
      case 'bebe':
        return <Baby className="w-5 h-5 text-amber-600" />;
      case 'nino':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'adulto_mayor':
        return <Accessibility className="w-5 h-5 text-purple-600" />;
      default:
        return <User className="w-5 h-5 text-[#0B2545]" />;
    }
  };

  // Manejo de mascotas
  const updatePetCount = (tipo: 'perro' | 'gato' | 'aves' | 'otro', delta: number) => {
    const existing = pets.find(p => p.tipo === tipo);
    if (!existing) {
      if (delta > 0) {
        onChangePets([...pets, { id: `pet-${tipo}`, tipo, cantidad: delta }]);
      }
    } else {
      const newCount = Math.max(0, existing.cantidad + delta);
      if (newCount === 0) {
        onChangePets(pets.filter(p => p.tipo !== tipo));
      } else {
        onChangePets(pets.map(p => p.tipo === tipo ? { ...p, cantidad: newCount } : p));
      }
    }
  };

  const getPetCount = (tipo: 'perro' | 'gato' | 'aves' | 'otro') => {
    const p = pets.find(item => item.tipo === tipo);
    return p ? p.cantidad : 0;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-2">
          <span className="w-6 h-6 rounded-full bg-[#0B2545] text-[#FFC93C] flex items-center justify-center font-black">2</span>
          Paso 2 de 2: Tu familia y mascotas
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
          ¿Quiénes integran tu hogar?
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          La app asignará roles claros (quién lleva la mochila, quién ayuda a niños o abuelos, y quién protege a las mascotas).
        </p>

        {/* Recordatorio de privacidad */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-3 text-xs text-amber-900 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Usa nombres ficticios o alias:</strong> Escribe "Mamá", "Tío", "Abuelita Tere", "Bebé". No uses apellidos reales ni DUIs.
          </span>
        </div>
      </div>

      {/* MIEMBROS DE LA FAMILIA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-[#0B2545] flex items-center gap-2">
              <span>Miembros del hogar</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0B2545] text-xs font-extrabold">
                {family.length} {family.length === 1 ? 'persona' : 'personas'}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Agrega a cada persona que duerme o pasa la noche en la vivienda
            </p>
          </div>

          {/* Botón principal "+ Agregar persona" */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#0B2545] hover:bg-blue-900 text-[#FFC93C] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Agregar persona</span>
          </button>
        </div>

        {/* Botones de agregar rápido */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold mr-1">Añadir rápido:</span>
          <button
            type="button"
            onClick={() => handleQuickAdd('adulto')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1.5 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-slate-600" />
            + Adulto
          </button>
          <button
            type="button"
            onClick={() => handleQuickAdd('adulto_mayor')}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Accessibility className="w-3.5 h-3.5 text-purple-600" />
            + Adulto Mayor
          </button>
          <button
            type="button"
            onClick={() => handleQuickAdd('nino')}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            + Niño
          </button>
          <button
            type="button"
            onClick={() => handleQuickAdd('bebe')}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Baby className="w-3.5 h-3.5 text-amber-600" />
            + Bebé / Lactante
          </button>
        </div>

        {/* TARJETAS PEQUEÑAS DE MIEMBROS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {family.map((miembro, idx) => (
            <div
              key={miembro.id}
              className="p-4 rounded-2xl border-2 border-slate-200/90 bg-white hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {getMemberIcon(miembro.rangoEdad)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#0B2545] leading-tight">
                        {miembro.alias}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {miembro.edad} años • {
                          miembro.rangoEdad === 'bebe' ? 'Bebé' :
                          miembro.rangoEdad === 'nino' ? 'Niño/a' :
                          miembro.rangoEdad === 'adulto_mayor' ? 'Adulto mayor' : 'Adulto'
                        }
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveMember(miembro.id)}
                    title="Eliminar este miembro"
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Necesidades especiales badges */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {miembro.necesidades.map((nec) => {
                    if (nec === 'ninguna') return null;
                    return (
                      <span
                        key={nec}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200"
                      >
                        {nec === 'movilidad_reducida' && 'Movilidad reducida'}
                        {nec === 'medicamentos' && 'Medicamentos diarios'}
                        {nec === 'bebe' && 'Lactancia / Pañales'}
                        {nec === 'embarazo' && 'Embarazo'}
                        {nec === 'discapacidad_sensorial' && 'Sensorial'}
                      </span>
                    );
                  })}
                  {miembro.detalleNecesidad && (
                    <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-2">
                      "{miembro.detalleNecesidad}"
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Miembro #{idx + 1}</span>
                {idx === 0 && <span className="font-bold text-blue-700">Responsable 1</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MASCOTAS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[#0B2545]">
            Mascotas y animales en el hogar
          </h3>
          <p className="text-xs text-slate-500">
            En emergencias requieren ración de alimento, agua, correa o jaula para evacuación segura
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Perros */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B2545] flex items-center justify-center mb-2">
              <Dog className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0B2545] mb-2">Perros</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updatePetCount('perro', -1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-extrabold text-sm text-[#0B2545]">
                {getPetCount('perro')}
              </span>
              <button
                type="button"
                onClick={() => updatePetCount('perro', 1)}
                className="w-7 h-7 rounded-lg bg-[#0B2545] text-[#FFC93C] flex items-center justify-center hover:bg-blue-900"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Gatos */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
              <Cat className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0B2545] mb-2">Gatos</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updatePetCount('gato', -1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-extrabold text-sm text-[#0B2545]">
                {getPetCount('gato')}
              </span>
              <button
                type="button"
                onClick={() => updatePetCount('gato', 1)}
                className="w-7 h-7 rounded-lg bg-[#0B2545] text-[#FFC93C] flex items-center justify-center hover:bg-blue-900"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Aves */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
              <Bird className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0B2545] mb-2">Aves</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updatePetCount('aves', -1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-extrabold text-sm text-[#0B2545]">
                {getPetCount('aves')}
              </span>
              <button
                type="button"
                onClick={() => updatePetCount('aves', 1)}
                className="w-7 h-7 rounded-lg bg-[#0B2545] text-[#FFC93C] flex items-center justify-center hover:bg-blue-900"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Otros animales */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-2">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0B2545] mb-2">Otros</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updatePetCount('otro', -1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-extrabold text-sm text-[#0B2545]">
                {getPetCount('otro')}
              </span>
              <button
                type="button"
                onClick={() => updatePetCount('otro', 1)}
                className="w-7 h-7 rounded-lg bg-[#0B2545] text-[#FFC93C] flex items-center justify-center hover:bg-blue-900"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL / FORMULARIO PARA AGREGAR MIEMBRO */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-[#0B2545] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#FFC93C]" />
                Agregar miembro al hogar
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Alias */}
            <div>
              <label className="text-xs font-bold text-[#0B2545] block mb-1">
                Alias o apodo (sin apellidos reales):
              </label>
              <input
                type="text"
                placeholder="Ejemplo: Mamá Karla, Tío Chepe, Bebé Mateo..."
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                autoFocus
              />
            </div>

            {/* Edad */}
            <div>
              <label className="text-xs font-bold text-[#0B2545] block mb-1">
                Edad: <span className="font-extrabold text-blue-900">{newEdad} años</span>
              </label>
              <input
                type="range"
                min="0"
                max="95"
                value={newEdad}
                onChange={(e) => setNewEdad(Number(e.target.value))}
                className="w-full accent-[#0B2545] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1">
                <span>0 (Lactante)</span>
                <span>12</span>
                <span>30</span>
                <span>60</span>
                <span>90+</span>
              </div>
            </div>

            {/* Necesidades especiales */}
            <div>
              <label className="text-xs font-bold text-[#0B2545] block mb-2">
                Condiciones o necesidades especiales:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => toggleNecesidad('movilidad_reducida')}
                  className={`p-2.5 rounded-xl text-left border flex items-center gap-2 ${
                    newNecesidades.includes('movilidad_reducida')
                      ? 'border-[#0B2545] bg-blue-50 font-bold text-[#0B2545]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Accessibility className="w-4 h-4 text-purple-600" />
                  <span>Movilidad reducida</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleNecesidad('medicamentos')}
                  className={`p-2.5 rounded-xl text-left border flex items-center gap-2 ${
                    newNecesidades.includes('medicamentos')
                      ? 'border-[#0B2545] bg-blue-50 font-bold text-[#0B2545]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Pill className="w-4 h-4 text-rose-600" />
                  <span>Medicinas continuas</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleNecesidad('bebe')}
                  className={`p-2.5 rounded-xl text-left border flex items-center gap-2 ${
                    newNecesidades.includes('bebe')
                      ? 'border-[#0B2545] bg-blue-50 font-bold text-[#0B2545]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Baby className="w-4 h-4 text-amber-600" />
                  <span>Bebé / Lactancia</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleNecesidad('embarazo')}
                  className={`p-2.5 rounded-xl text-left border flex items-center gap-2 ${
                    newNecesidades.includes('embarazo')
                      ? 'border-[#0B2545] bg-blue-50 font-bold text-[#0B2545]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Embarazo</span>
                </button>
              </div>
            </div>

            {/* Detalle opcional */}
            <div>
              <label className="text-xs font-bold text-[#0B2545] block mb-1">
                Detalle específico (opcional):
              </label>
              <input
                type="text"
                placeholder="Ej. 'Toma insulina', 'Usa bastón', 'Alergia a penicilina'..."
                value={newDetalle}
                onChange={(e) => setNewDetalle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>

            {/* Botones modal */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddMember}
                className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-blue-900 text-[#FFC93C] text-xs font-bold shadow-md"
              >
                Guardar persona
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTONES DE NAVEGACIÓN INFERIOR */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a hogar</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-4 rounded-2xl bg-[#FFC93C] hover:bg-amber-400 text-[#0B2545] font-extrabold text-base flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
        >
          <span>Generar mi plan personalizado</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
