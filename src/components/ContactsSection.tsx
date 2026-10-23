import React, { useState } from 'react';
import { INSTITUTIONAL_CONTACTS } from '../utils/emergencyEngine';
import { 
  PhoneCall, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  UserCheck, 
  ShieldAlert, 
  Share2, 
  Printer,
  ExternalLink
} from 'lucide-react';
import { ContactoEmergencia } from '../types/plan';

interface ContactsSectionProps {
  onPrint: () => void;
  onShareWhatsApp: () => void;
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({
  onPrint,
  onShareWhatsApp,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Contactos de emergencia familiares (con nombres ficticios por seguridad)
  const [familyContacts, setFamilyContacts] = useState<ContactoEmergencia[]>([
    {
      id: 'fc-1',
      nombre: 'Tía Carmen (Contacto fuera de zona de riesgo)',
      numero: '7000-1234',
      tipo: 'familiar',
      descripcion: 'Familiar en otra ciudad/zona segura para avisar si colapsa la telefonía local.'
    },
    {
      id: 'fc-2',
      nombre: 'Vecino Don Chepe',
      numero: '7111-5678',
      tipo: 'familiar',
      descripcion: 'Vecino inmediato de confianza con llave de paso y apoyo mutuo.'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newNombre, setNewNombre] = useState('');
  const [newNumero, setNewNumero] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCopy = (id: string, numero: string) => {
    navigator.clipboard.writeText(numero);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddFamilyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre.trim() || !newNumero.trim()) return;

    const newContact: ContactoEmergencia = {
      id: `fc-${Date.now()}`,
      nombre: newNombre.trim(),
      numero: newNumero.trim(),
      tipo: 'familiar',
      descripcion: newDesc.trim() || 'Contacto de confianza familiar.'
    };

    setFamilyContacts([...familyContacts, newContact]);
    setNewNombre('');
    setNewNumero('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const handleRemoveContact = (id: string) => {
    setFamilyContacts(familyContacts.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* HEADER DE CONTACTOS */}
      <div className="bg-[#0B2545] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D64545]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFC93C] uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-[#FFC93C]" />
              Directorio de Auxilio Rápido
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Números de Emergencia de El Salvador
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Instituciones oficiales públicas con atención las 24 horas y directorio de enlace familiar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onShareWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir</span>
            </button>
            <button
              onClick={onPrint}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>
      </div>

      {/* INSTITUCIONES OFICIALES PÚBLICAS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#0B2545]">
            Instituciones de Primera Respuesta Nacional
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Marcación directa gratuita desde celular
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTITUTIONAL_CONTACTS.map((inst) => {
            const isCopied = copiedId === inst.id;
            const isRed = inst.numero === '913' || inst.numero === '132' || inst.numero === '911';

            return (
              <div
                key={inst.id}
                className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-[#0B2545] shadow-xs flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xl font-black px-3 py-1 rounded-xl tracking-tight ${
                      isRed 
                        ? 'bg-red-50 text-[#D64545] border border-red-200' 
                        : 'bg-blue-50 text-[#0B2545] border border-blue-200'
                    }`}>
                      {inst.numero}
                    </span>
                    <button
                      onClick={() => handleCopy(inst.id, inst.numero)}
                      title="Copiar número"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <h4 className="font-extrabold text-sm text-[#0B2545] mb-1">
                    {inst.nombre}
                  </h4>
                  <p className="text-xs text-slate-500 leading-snug mb-4">
                    {inst.descripcion}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`tel:${inst.numero.replace('-', '')}`}
                    className={`flex-1 py-2.5 rounded-xl text-center text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                      isRed
                        ? 'bg-[#D64545] hover:bg-red-700 text-white shadow-sm'
                        : 'bg-[#0B2545] hover:bg-blue-900 text-[#FFC93C]'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Llamar ahora</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTACTOS FAMILIARES DE ENLACE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-[#0B2545] flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-700" />
              <span>Contactos de Enlace Familiar y Vecinal</span>
            </h3>
            <p className="text-xs text-slate-500">
              Clave: Ten al menos un contacto que resida <strong>fuera</strong> de tu zona de riesgo para reenviar recados si falla la señal local.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2545] font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Agregar contacto</span>
          </button>
        </div>

        {/* Formulario para agregar contacto familiar */}
        {showAddForm && (
          <form onSubmit={handleAddFamilyContact} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-[#0B2545]">Nuevo contacto de enlace familiar:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Nombre o alias (ej. Tía Sonia fuera de zona)..."
                value={newNombre}
                onChange={(e) => setNewNombre(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                required
              />
              <input
                type="text"
                placeholder="Teléfono (ficticio de prueba o real)..."
                value={newNumero}
                onChange={(e) => setNewNumero(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                required
              />
              <input
                type="text"
                placeholder="Rol (ej. Vecino de confianza, tía)..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold bg-[#0B2545] text-[#FFC93C] rounded-lg hover:bg-blue-900"
              >
                Guardar contacto
              </button>
            </div>
          </form>
        )}

        {/* Lista de contactos familiares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {familyContacts.map((fc) => (
            <div
              key={fc.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-[#0B2545]">{fc.nombre}</h4>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-blue-900 bg-blue-100/70 px-2.5 py-0.5 rounded-md">
                    {fc.numero}
                  </span>
                  <button
                    onClick={() => handleCopy(fc.id, fc.numero)}
                    className="text-slate-400 hover:text-slate-700 text-xs p-1"
                    title="Copiar"
                  >
                    {copiedId === fc.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500 pt-1">{fc.descripcion}</p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={`tel:${fc.numero.replace('-', '')}`}
                  className="p-2 rounded-xl bg-[#0B2545] text-[#FFC93C] hover:bg-blue-900 transition-colors flex items-center justify-center"
                  title="Llamar"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleRemoveContact(fc.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECORDATORIO DE TELECOMUNICACIONES EN EL SALVADOR */}
      <div className="rounded-3xl p-6 bg-blue-50/70 border border-blue-200 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0B2545] flex items-center justify-center shrink-0 font-black">
          i
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-slate-700">
          <h4 className="font-extrabold text-sm text-[#0B2545]">
            Consejo técnico para comunicación durante terremotos en El Salvador:
          </h4>
          <p className="leading-relaxed">
            Cuando ocurre un sismo mayor a 6.0 en el territorio salvadoreño, las líneas de voz colapsan por llamadas simultáneas. 
            <strong> Usa mensajes de texto SMS tradicionales o notas de voz cortas por WhatsApp. </strong> 
            Los mensajes de texto pasan a través de los canales de señalización de la red celular incluso con congestión severa.
          </p>
        </div>
      </div>
    </div>
  );
};
