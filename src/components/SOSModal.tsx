import React from 'react';
import { INSTITUTIONAL_CONTACTS } from '../utils/emergencyEngine';
import { PhoneCall, X, ShieldAlert, Copy, Check } from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, numero: string) => {
    navigator.clipboard.writeText(numero);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#D64545] flex items-center justify-center font-black">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#0B2545]">
                Marcación de Auxilio Rápido SV
              </h3>
              <p className="text-xs text-slate-500">
                Llamadas directas a instituciones de primera respuesta
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INSTITUTIONAL_CONTACTS.map((inst) => {
            const isRed = inst.numero === '913' || inst.numero === '132' || inst.numero === '911';
            const isCopied = copiedId === inst.id;

            return (
              <div 
                key={inst.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
              >
                <div>
                  <span className={`text-base font-black px-2 py-0.5 rounded-lg ${
                    isRed ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-900'
                  }`}>
                    {inst.numero}
                  </span>
                  <h4 className="font-extrabold text-xs text-[#0B2545] mt-1.5">{inst.nombre}</h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(inst.id, inst.numero)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
                    title="Copiar número"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`tel:${inst.numero.replace('-', '')}`}
                    className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition-transform active:scale-95 ${
                      isRed ? 'bg-[#D64545] text-white hover:bg-red-700' : 'bg-[#0B2545] text-[#FFC93C] hover:bg-blue-900'
                    }`}
                    title="Llamar"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
