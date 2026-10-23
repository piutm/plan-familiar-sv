import React, { useEffect, useState } from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface GeneratingScreenProps {
  zona: string;
  tipoVivienda: string;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({ zona, tipoVivienda }) => {
  const steps = [
    'Analizando los riesgos geológicos e hidrológicos de tu zona en El Salvador...',
    'Evaluando la estructura de tu vivienda y vulnerabilidades estructurales...',
    'Asignando roles familiares seguros según edades y necesidades especiales...',
    'Calculando raciones de agua, botiquín y mochila de 72 horas...',
    'Compilando rutas de escape y directorios oficiales de auxilio SV...'
  ];

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94;
        return prev + 2;
      });
    }, 120);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [steps.length]);

  return (
    <div className="max-w-xl mx-auto py-12 px-4 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 space-y-8 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FFC93C]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Icono de escudo pulsante */}
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#0B2545] to-blue-900 text-[#FFC93C] flex items-center justify-center mx-auto shadow-xl shadow-blue-950/20 animate-pulse">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FFC93C] text-[#0B2545] flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Título de estado */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Generando tu plan personalizado
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Diseñando medidas exactas para {tipoVivienda} en {zona}
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="space-y-2">
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-[#0B2545] via-blue-800 to-[#FFC93C] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold px-1">
            <span>Diagnóstico en proceso</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Mensaje dinámico del paso actual */}
        <div className="min-h-[64px] flex items-center justify-center px-4 py-3 rounded-2xl bg-blue-50/70 border border-blue-100">
          <p className="text-xs sm:text-sm font-bold text-[#0B2545] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFC93C] animate-ping shrink-0" />
            <span>{steps[currentStepIdx]}</span>
          </p>
        </div>

        {/* Pasos completados miniatura */}
        <div className="grid grid-cols-1 gap-1.5 text-left pt-2 border-t border-slate-100">
          {steps.map((st, i) => {
            const isDone = i < currentStepIdx;
            const isCurrent = i === currentStepIdx;
            return (
              <div 
                key={i} 
                className={`text-[11px] flex items-center gap-2 transition-opacity ${
                  isDone ? 'text-emerald-700 font-medium' : isCurrent ? 'text-[#0B2545] font-bold' : 'text-slate-300 opacity-60'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDone ? 'text-emerald-600' : isCurrent ? 'text-[#FFC93C]' : 'text-slate-300'}`} />
                <span className="truncate">{st}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
