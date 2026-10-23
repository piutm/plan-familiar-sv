import React, { useState, useEffect } from 'react';
import { PlanEmergencia } from '../types/plan';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Award,
  X,
  Volume2
} from 'lucide-react';

interface DrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanEmergencia | null;
}

export const DrillModal: React.FC<DrillModalProps> = ({ isOpen, onClose, plan }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [drillCompleted, setDrillCompleted] = useState(false);

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    's1': false,
    's2': false,
    's3': false,
    's4': false,
    's5': false
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  if (!isOpen) return null;

  const handleToggleStep = (stepKey: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handleFinishDrill = () => {
    setIsRunning(false);
    setDrillCompleted(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setDrillCompleted(false);
    setCheckedSteps({
      's1': false,
      's2': false,
      's3': false,
      's4': false,
      's5': false
    });
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Cabecera modal */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Timer className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#0B2545]">
                Modo Simulacro en Casa
              </h3>
              <p className="text-xs text-slate-500">
                Pon a prueba el tiempo de respuesta y los roles de tu familia
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

        {/* Cronómetro grande */}
        <div className="bg-[#0B2545] text-white p-6 rounded-3xl text-center space-y-4">
          <span className="text-xs font-bold text-[#FFC93C] uppercase tracking-wider block">
            Tiempo de Evacuación Familiar
          </span>
          <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
            {String(Math.floor(seconds / 60)).padStart(2, '0')}:
            {String(seconds % 60).padStart(2, '0')}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            {!isRunning && !drillCompleted ? (
              <button
                onClick={() => setIsRunning(true)}
                className="px-6 py-3 rounded-2xl bg-[#FFC93C] hover:bg-amber-400 text-[#0B2545] font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>¡Iniciar Simulacro Ahora!</span>
              </button>
            ) : isRunning ? (
              <>
                <button
                  onClick={() => setIsRunning(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </button>
                <button
                  onClick={handleFinishDrill}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalizar y Evaluar</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Nuevo Ensayo</span>
              </button>
            )}
          </div>
        </div>

        {/* Checklist durante el simulacro */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#0B2545] uppercase tracking-wider">
            Verificación de pasos en tiempo real:
          </h4>

          <div className="space-y-2 text-xs">
            <div 
              onClick={() => handleToggleStep('s1')}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-colors ${
                checkedSteps['s1'] ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center ${checkedSteps['s1'] ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'}`}>
                {checkedSteps['s1'] && '✓'}
              </div>
              <span>1. Al escuchar la alarma, ¡Agacharse, cubrirse y sujetarse! (o proteger cabeza)</span>
            </div>

            <div 
              onClick={() => handleToggleStep('s2')}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-colors ${
                checkedSteps['s2'] ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center ${checkedSteps['s2'] ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'}`}>
                {checkedSteps['s2'] && '✓'}
              </div>
              <span>2. El líder del hogar tomó la mochila de 72 horas junto a la salida</span>
            </div>

            <div 
              onClick={() => handleToggleStep('s3')}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-colors ${
                checkedSteps['s3'] ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center ${checkedSteps['s3'] ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'}`}>
                {checkedSteps['s3'] && '✓'}
              </div>
              <span>3. Se cerró la válvula del tambo de gas o bajó el breaker simulado</span>
            </div>

            <div 
              onClick={() => handleToggleStep('s4')}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-colors ${
                checkedSteps['s4'] ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center ${checkedSteps['s4'] ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'}`}>
                {checkedSteps['s4'] && '✓'}
              </div>
              <span>4. Se acompañó al familiar vulnerable, menor o se aseguró la mascota</span>
            </div>

            <div 
              onClick={() => handleToggleStep('s5')}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-colors ${
                checkedSteps['s5'] ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center ${checkedSteps['s5'] ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'}`}>
                {checkedSteps['s5'] && '✓'}
              </div>
              <span>5. Todo el grupo llegó al punto de reunión externo acordado</span>
            </div>
          </div>
        </div>

        {/* Resultado tras finalizar */}
        {drillCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-emerald-950">
              ¡Simulacro concluido en {seconds} segundos!
            </h4>
            <p className="text-xs text-emerald-800">
              Completaron {completedCount} de 5 acciones clave. {
                seconds <= 60 
                  ? '🌟 Excelente tiempo. El estándar de Protección Civil recomienda evacuar en menos de 1 minuto.' 
                  : 'Buen ejercicio. Repitan el simulacro la próxima semana para reducir el tiempo a menos de 60 segundos.'
              }
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            Cerrar simulacro
          </button>
        </div>
      </div>
    </div>
  );
};
