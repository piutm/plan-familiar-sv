/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StepHome } from './components/StepHome';
import { StepFamily } from './components/StepFamily';
import { GeneratingScreen } from './components/GeneratingScreen';
import { PlanDashboard } from './components/PlanDashboard';
import { EmergencyBackpack } from './components/EmergencyBackpack';
import { ContactsSection } from './components/ContactsSection';
import { SOSModal } from './components/SOSModal';
import { DrillModal } from './components/DrillModal';
import { PrintEmergencySheet } from './components/PrintEmergencySheet';
import { generateLocalEmergencyPlan } from './utils/emergencyEngine';
import { PresetScenario, PRESET_SCENARIOS } from './utils/presets';
import { HomeData, MiembroFamilia, Mascota, PlanEmergencia, ItemMochila, RolFamiliar } from './types/plan';
import { Shield, Sparkles, BookOpen, CheckSquare, PhoneCall, AlertTriangle } from 'lucide-react';

const STORAGE_KEY_PLAN = 'plan_familiar_sv_saved_plan';
const STORAGE_KEY_HOME = 'plan_familiar_sv_home';
const STORAGE_KEY_FAMILY = 'plan_familiar_sv_family';
const STORAGE_KEY_PETS = 'plan_familiar_sv_pets';
const STORAGE_KEY_MOCHILA = 'plan_familiar_sv_mochila';

export default function App() {
  // Wizard & view states
  const [screen, setScreen] = useState<'welcome' | 'step_home' | 'step_family' | 'generating' | 'dashboard'>('welcome');
  const [currentTab, setCurrentTab] = useState<'generator' | 'plan' | 'backpack' | 'contacts'>('generator');

  // Modales
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isDrillOpen, setIsDrillOpen] = useState(false);

  // Form State
  const [homeData, setHomeData] = useState<HomeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_HOME);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      zona: 'ladera',
      tipoVivienda: 'lamina_mixta',
      riesgoPrincipal: 'todos',
      tieneGasPropano: true,
      tienePatioAbierto: true,
      departamentoOZona: 'San Salvador'
    };
  });

  const [familyMembers, setFamilyMembers] = useState<MiembroFamilia[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FAMILY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'f1',
        alias: 'Papá',
        edad: 38,
        rangoEdad: 'adulto',
        necesidades: ['ninguna']
      },
      {
        id: 'f2',
        alias: 'Mamá',
        edad: 36,
        rangoEdad: 'adulto',
        necesidades: ['ninguna']
      },
      {
        id: 'f3',
        alias: 'Abuelita',
        edad: 67,
        rangoEdad: 'adulto_mayor',
        necesidades: ['movilidad_reducida', 'medicamentos'],
        detalleNecesidad: 'Presión alta y bastón'
      },
      {
        id: 'f4',
        alias: 'Hijo menor',
        edad: 6,
        rangoEdad: 'nino',
        necesidades: ['ninguna']
      }
    ];
  });

  const [pets, setPets] = useState<Mascota[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PETS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [{ id: 'p1', tipo: 'perro', cantidad: 1, detalles: 'Perro familiar' }];
  });

  // Generated Plan
  const [plan, setPlan] = useState<PlanEmergencia | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PLAN);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  // Backpack checklist
  const [backpackItems, setBackpackItems] = useState<ItemMochila[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MOCHILA);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Persist form state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HOME, JSON.stringify(homeData));
  }, [homeData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FAMILY, JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PETS, JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    if (plan) {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(plan));
    }
  }, [plan]);

  useEffect(() => {
    if (backpackItems.length > 0) {
      localStorage.setItem(STORAGE_KEY_MOCHILA, JSON.stringify(backpackItems));
    }
  }, [backpackItems]);

  // Si ya existía un plan guardado, sincronizar pestañas iniciales
  useEffect(() => {
    if (plan && screen === 'welcome') {
      // Dejamos en welcome para que el usuario pueda ver la bienvenida o hacer clic en "Ver mi plan actual"
    }
    if (plan && backpackItems.length === 0) {
      setBackpackItems(plan.mochila);
    }
  }, []);

  // Generar plan (invocando endpoint /api/generate-plan con fallback local)
  const handleGeneratePlan = async () => {
    setScreen('generating');

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          home: homeData,
          family: familyMembers,
          pets: pets
        })
      });

      if (!response.ok) {
        throw new Error('Servidor no disponible');
      }

      const generated: PlanEmergencia = await response.json();
      setPlan(generated);
      setBackpackItems(generated.mochila);
      setScreen('dashboard');
      setCurrentTab('plan');
    } catch (err) {
      console.warn('[Client] Error fetching AI plan. Generating with Salvadoran rule engine.', err);
      // Fallback inmediato con el motor local salvadoreño para garantizar que nunca falle
      const localPlan = generateLocalEmergencyPlan(homeData, familyMembers, pets);
      setPlan(localPlan);
      setBackpackItems(localPlan.mochila);
      setScreen('dashboard');
      setCurrentTab('plan');
    }
  };

  // Cargar caso de prueba rápido
  const handleSelectPreset = (preset: PresetScenario) => {
    setHomeData(preset.home);
    setFamilyMembers(preset.family);
    setPets(preset.pets);
    setScreen('step_home');
  };

  const handleToggleBackpackItem = (id: string) => {
    setBackpackItems(prev =>
      prev.map(it => it.id === id ? { ...it, completado: !it.completado } : it)
    );
  };

  const handleAddBackpackItem = (item: ItemMochila) => {
    setBackpackItems(prev => [item, ...prev]);
  };

  const handleResetBackpackItems = () => {
    setBackpackItems(prev => prev.map(it => ({ ...it, completado: false })));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!plan) return;
    const text = `🚨 *PLAN FAMILIAR DE EMERGENCIA SV* 🚨
Hogar de ${familyMembers.length} personas en ${homeData.zona} (${homeData.tipoVivienda})
Riesgo: ${homeData.riesgoPrincipal.toUpperCase()}

📍 *PUNTO DE REUNIÓN EXTERNO:*
${plan.puntosReunion.puntoExterno}

👥 *ROLES FAMILIARES:*
${plan.roles.map(r => `• *${r.miembroAlias}:* ${r.rolTitulo}`).join('\n')}

🎒 *MOCHILA DE 72 HORAS:*
Revisada y lista en la salida principal.

📞 *EMERGENCIAS EL SALVADOR:*
• Bomberos: 913
• SEM (Ambulancias): 132
• Protección Civil: 2281-0888
• PNC: 911

Generado con PlanFamiliar SV`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleUpdateRoles = (updatedRoles: RolFamiliar[]) => {
    if (!plan) return;
    const updatedPlan: PlanEmergencia = {
      ...plan,
      roles: updatedRoles
    };
    setPlan(updatedPlan);
    localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(updatedPlan));
  };

  const handleResetPlan = () => {
    setScreen('step_home');
    setCurrentTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900">
      {/* Top Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'generator' && !plan) {
            setScreen('step_home');
          } else if (plan) {
            setScreen('dashboard');
          }
        }}
        hasPlan={Boolean(plan)}
        onOpenSOSModal={() => setIsSOSOpen(true)}
        onOpenDrillModal={() => setIsDrillOpen(true)}
        onResetPlan={handleResetPlan}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Banner de "Tienes un plan generado" si está en la pantalla de bienvenida */}
        {plan && screen === 'welcome' && (
          <div className="mb-6 p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#0B2545]">Tienes un plan familiar guardado</h4>
                <p className="text-xs text-slate-500">
                  Para tu hogar en {homeData.zona} ({homeData.tipoVivienda})
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setScreen('dashboard');
                setCurrentTab('plan');
              }}
              className="px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-blue-900 text-[#FFC93C] font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Ver mi plan activo</span>
            </button>
          </div>
        )}

        {/* PANTALLA 1: BIENVENIDA */}
        {screen === 'welcome' && (
          <WelcomeScreen
            onStart={() => setScreen('step_home')}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {/* PANTALLA 2: DATOS DE TU HOGAR */}
        {screen === 'step_home' && (
          <StepHome
            data={homeData}
            onChange={setHomeData}
            onNext={() => setScreen('step_family')}
            onBack={() => setScreen('welcome')}
          />
        )}

        {/* PANTALLA 3: TU FAMILIA Y MASCOTAS */}
        {screen === 'step_family' && (
          <StepFamily
            family={familyMembers}
            pets={pets}
            onChangeFamily={setFamilyMembers}
            onChangePets={setPets}
            onNext={handleGeneratePlan}
            onBack={() => setScreen('step_home')}
          />
        )}

        {/* PANTALLA 4: GENERANDO EL PLAN (ANIMACIÓN) */}
        {screen === 'generating' && (
          <GeneratingScreen
            zona={homeData.zona}
            tipoVivienda={homeData.tipoVivienda}
          />
        )}

        {/* PANTALLA 5: DASHBOARD Y SECCIONES */}
        {screen === 'dashboard' && plan && (
          <div>
            {currentTab === 'plan' && (
              <PlanDashboard
                plan={plan}
                home={homeData}
                family={familyMembers}
                onOpenBackpack={() => setCurrentTab('backpack')}
                onOpenContacts={() => setCurrentTab('contacts')}
                onPrint={handlePrint}
                onUpdateRoles={handleUpdateRoles}
              />
            )}

            {currentTab === 'backpack' && (
              <EmergencyBackpack
                items={backpackItems}
                onToggleItem={handleToggleBackpackItem}
                onAddItem={handleAddBackpackItem}
                onResetItems={handleResetBackpackItems}
              />
            )}

            {currentTab === 'contacts' && (
              <ContactsSection
                onPrint={handlePrint}
                onShareWhatsApp={handleShareWhatsApp}
              />
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-extrabold text-sm">
              <span>PlanFamiliar SV</span>
              <span className="text-[#FFC93C]">•</span>
              <span className="text-slate-400 font-normal text-xs">Protección Civil de El Salvador</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Diseñado para madres, padres y estudiantes en zonas de riesgo ante sismos, lluvias e inundaciones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSOSOpen(true)}
              className="text-[#FFC93C] hover:underline font-bold flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Números de Emergencia
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL SOS RÁPIDO */}
      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />

      {/* MODAL SIMULACRO */}
      <DrillModal
        isOpen={isDrillOpen}
        onClose={() => setIsDrillOpen(false)}
        plan={plan}
      />

      {/* FICHA IMPRIMIBLE (SOLO VISIBLE AL IMPRIMIR) */}
      {plan && (
        <PrintEmergencySheet
          plan={plan}
          home={homeData}
          family={familyMembers}
        />
      )}
    </div>
  );
}
