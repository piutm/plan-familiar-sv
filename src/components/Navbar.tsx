import React from 'react';
import { Shield, PhoneCall, PlusCircle, CheckSquare, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentTab: 'generator' | 'plan' | 'backpack' | 'contacts';
  setCurrentTab: (tab: 'generator' | 'plan' | 'backpack' | 'contacts') => void;
  hasPlan: boolean;
  onOpenSOSModal: () => void;
  onOpenDrillModal?: () => void;
  onResetPlan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  hasPlan,
  onOpenSOSModal,
  onOpenDrillModal,
  onResetPlan,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B2545] text-white shadow-md border-b border-blue-900/50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2">
          {/* Logo y Nombre de la App */}
          <div 
            onClick={() => window.location.reload()} 
            title="Reiniciar la página"
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0"
          >
            <div 
              onClick={(e) => {
                e.stopPropagation();
                window.location.reload();
              }}
              title="Reiniciar la página"
              role="button"
              aria-label="Reiniciar la página"
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#FFC93C] to-amber-500 flex items-center justify-center shadow-md sm:shadow-lg shadow-amber-500/20 text-[#0B2545] font-black group-hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
            >
              <Shield className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.4]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-2xl tracking-tight text-white truncate">
                  PlanFamiliar <span className="text-[#FFC93C]">SV</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-700/50 uppercase tracking-wider hidden md:inline-block">
                  El Salvador
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 hidden md:block truncate">
                Un plan hecho a la medida de tu familia
              </p>
            </div>
          </div>

          {/* Botones de Acción Rápida y Navegación de Escritorio */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {hasPlan && (
              <nav className="hidden lg:flex items-center bg-blue-900/70 p-1 rounded-xl border border-blue-700/60 shadow-sm">
                <button
                  onClick={() => setCurrentTab('plan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    currentTab === 'plan' 
                      ? 'bg-[#FFC93C] text-[#0B2545] shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-blue-800/60'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Tu Plan
                </button>
                <button
                  onClick={() => setCurrentTab('backpack')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    currentTab === 'backpack' 
                      ? 'bg-[#FFC93C] text-[#0B2545] shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-blue-800/60'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  Mochila 72h
                </button>
                <button
                  onClick={() => setCurrentTab('contacts')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    currentTab === 'contacts' 
                      ? 'bg-[#FFC93C] text-[#0B2545] shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-blue-800/60'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Directorio SV
                </button>
              </nav>
            )}

            {/* Botón SOS Números Clave */}
            <button
              onClick={onOpenSOSModal}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#D64545] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 transition-all shadow-md shadow-red-900/30 active:scale-95 animate-pulse hover:animate-none"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              <span>SOS<span className="hidden sm:inline"> SV</span></span>
            </button>

            {/* Botón Nuevo Plan */}
            <button
              onClick={onResetPlan}
              title="Crear un nuevo plan de emergencia para tu hogar"
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC93C]" />
              <span className="text-xs sm:text-sm">Nuevo<span className="hidden sm:inline"> Plan</span></span>
            </button>
          </div>
        </div>

        {/* Barra de Pestañas Móviles (Visible solo en celulares y tablets pequeñas cuando hay plan) */}
        {hasPlan && (
          <nav className="flex lg:hidden items-center justify-around border-t border-blue-900/60 py-1.5 pb-2 gap-1.5">
            <button
              onClick={() => setCurrentTab('plan')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 text-center ${
                currentTab === 'plan' 
                  ? 'bg-[#FFC93C] text-[#0B2545] shadow-xs' 
                  : 'text-slate-300 hover:text-white bg-blue-950/40 border border-blue-900/40'
              }`}
            >
              <BookOpen className="w-3 h-3 shrink-0" />
              <span className="truncate">Tu Plan</span>
            </button>
            <button
              onClick={() => setCurrentTab('backpack')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 text-center ${
                currentTab === 'backpack' 
                  ? 'bg-[#FFC93C] text-[#0B2545] shadow-xs' 
                  : 'text-slate-300 hover:text-white bg-blue-950/40 border border-blue-900/40'
              }`}
            >
              <CheckSquare className="w-3 h-3 shrink-0" />
              <span className="truncate">Mochila</span>
            </button>
            <button
              onClick={() => setCurrentTab('contacts')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 text-center ${
                currentTab === 'contacts' 
                  ? 'bg-[#FFC93C] text-[#0B2545] shadow-xs' 
                  : 'text-slate-300 hover:text-white bg-blue-950/40 border border-blue-900/40'
              }`}
            >
              <PhoneCall className="w-3 h-3 shrink-0" />
              <span className="truncate">Directorio</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
