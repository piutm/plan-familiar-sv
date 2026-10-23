import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateLocalEmergencyPlan } from './src/utils/emergencyEngine.ts';
import type { HomeData, MiembroFamilia, Mascota, PlanEmergencia } from './src/types/plan.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API route for generating tailored emergency plan
app.post('/api/generate-plan', async (req, res) => {
  try {
    const { home, family, pets, customNotes } = req.body as {
      home: HomeData;
      family: MiembroFamilia[];
      pets: Mascota[];
      customNotes?: string;
    };

    if (!home || !family || !Array.isArray(family)) {
      return res.status(400).json({ error: 'Datos incompletos para generar el plan familiar.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Si no hay API key configurada, usar de inmediato el motor inteligente salvadoreño
    if (!apiKey) {
      console.log('[Server] No GEMINI_API_KEY found. Using Salvadoran emergency engine.');
      const localPlan = generateLocalEmergencyPlan(home, family, pets || []);
      return res.json(localPlan);
    }

    // Usar Gemini 3.8 Flash con el SDK oficial @google/genai
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const prompt = `
Eres un especialista sénior en Gestión de Riesgos y Protección Civil de El Salvador. 
Genera un PLAN FAMILIAR DE EMERGENCIA PERSONALIZADO y realista para el siguiente hogar en El Salvador.

DATOS DEL HOGAR:
- Zona geográfica: ${home.zona} (ej: costa, ciudad, ladera, río o quebrada, falda de volcán)
- Tipo de vivienda: ${home.tipoVivienda} (ej: casa de un nivel, dos niveles, apartamento, o vivienda de lámina/mixta)
- Riesgo principal: ${home.riesgoPrincipal} (sismos, inundaciones, deslizamientos, tormentas tropicales o todos)
- Cilindro de gas propano en el hogar: ${home.tieneGasPropano ? 'SÍ (tambo de gas en cocina)' : 'NO'}
- Patio abierto: ${home.tienePatioAbierto ? 'SÍ' : 'NO'}
- Nivel de apartamento (si aplica): ${home.pisoApartamento || 'N/A'}
- Notas o comunidad: ${home.departamentoOZona || 'El Salvador'} ${customNotes ? `| Notas: ${customNotes}` : ''}

COMPOSICIÓN FAMILIAR (Nombres ficticios/alias):
${family.map((m, i) => `${i + 1}. Alias: ${m.alias}, Edad: ${m.edad} (${m.rangoEdad}), Necesidades especiales: ${m.necesidades.join(', ') || 'ninguna'} ${m.detalleNecesidad ? `(${m.detalleNecesidad})` : ''}`).join('\n')}

MASCOTAS:
${pets && pets.length > 0 ? pets.map(p => `- ${p.cantidad} ${p.tipo} (${p.detalles || 'sin detalles'})`).join('\n') : 'Sin mascotas'}

CONTEXTO DE EL SALVADOR OBLIGATORIO:
1. Si la vivienda es de LÁMINA, enfatiza riesgos específicos: láminas sueltas por vientos, calor intenso, sujeción de ganchos, no apoyarse en postes delgados durante sismos, no subir al techo en tormentas.
2. Si está en LADERA o cerca de RÍO/QUEBRADA (ej: Acelhuate, Lempa, Arenales), da alertas tempranas salvadoreñas (color del agua turbia marrón, ruidos de tierra, 50mm de lluvia continua) y ruta hacia zona alta.
3. Si tienen TAMBO DE GAS PROPANO, incluye en "Durante" el corte exacto de la válvula mariposa del regulador.
4. Asigna un rol concreto y adaptado a CADA familiar (incluyendo quién asiste a bebés/abuelos/personas con movilidad reducida, quién lleva la mochila, quién coordina a las mascotas).
5. Mochila de 72 horas con suministros exactos requeridos (copias de DUI en bolsa ziploc hermética, billetes de $1 y $5, radio a pilas con emisoras salvadoreñas, medicamentos específicos de la familia).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'Eres un experto en Protección Civil y Reducción de Desastres de El Salvador (COEN, SNET). Genera planes de emergencia prácticos, directos, sin rodeos, adaptados a la realidad salvadoreña.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              resumenEjecutivo: { type: Type.STRING },
              diagnosticoVulnerabilidad: {
                type: Type.OBJECT,
                properties: {
                  nivel: { type: Type.STRING, enum: ['Alto', 'Medio', 'Crítico'] },
                  explicacion: { type: Type.STRING },
                  puntosCriticos: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['nivel', 'explicacion', 'puntosCriticos']
              },
              fases: {
                type: Type.OBJECT,
                properties: {
                  antes: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        titulo: { type: Type.STRING },
                        detalle: { type: Type.STRING },
                        categoria: { type: Type.STRING },
                        advertencia: { type: Type.STRING }
                      },
                      required: ['id', 'titulo', 'detalle']
                    }
                  },
                  durante: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        titulo: { type: Type.STRING },
                        detalle: { type: Type.STRING },
                        alerta: { type: Type.STRING }
                      },
                      required: ['id', 'titulo', 'detalle']
                    }
                  },
                  despues: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        titulo: { type: Type.STRING },
                        detalle: { type: Type.STRING },
                        advertencia: { type: Type.STRING }
                      },
                      required: ['id', 'titulo', 'detalle']
                    }
                  }
                },
                required: ['antes', 'durante', 'despues']
              },
              roles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    miembroAlias: { type: Type.STRING },
                    rolTitulo: { type: Type.STRING },
                    tareasClave: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    equipoAsignado: { type: Type.STRING },
                    prioridad: { type: Type.STRING, enum: ['alta', 'media', 'apoyo'] }
                  },
                  required: ['id', 'miembroAlias', 'rolTitulo', 'tareasClave', 'equipoAsignado', 'prioridad']
                }
              },
              mochila: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    item: { type: Type.STRING },
                    categoria: { 
                      type: Type.STRING, 
                      enum: ['agua_alimentos', 'botiquin', 'herramientas', 'documentos', 'especiales_familia'] 
                    },
                    motivo: { type: Type.STRING },
                    esencial: { type: Type.BOOLEAN },
                    completado: { type: Type.BOOLEAN }
                  },
                  required: ['id', 'item', 'categoria', 'motivo', 'esencial', 'completado']
                }
              },
              puntosReunion: {
                type: Type.OBJECT,
                properties: {
                  puntoInterno: { type: Type.STRING },
                  puntoExterno: { type: Type.STRING },
                  rutaEvacuacion: { type: Type.STRING },
                  zonaSeguraComunitaria: { type: Type.STRING }
                },
                required: ['puntoInterno', 'puntoExterno', 'rutaEvacuacion', 'zonaSeguraComunitaria']
              },
              consejosLocales: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: [
              'resumenEjecutivo',
              'diagnosticoVulnerabilidad',
              'fases',
              'roles',
              'mochila',
              'puntosReunion',
              'consejosLocales'
            ]
          }
        }
      });

      const responseText = response.text?.trim() || '';
      const parsedPlan = JSON.parse(responseText);

      const finalPlan: PlanEmergencia = {
        ...parsedPlan,
        id: `plan-ai-${Date.now()}`,
        createdAt: new Date().toISOString(),
        source: 'gemini'
      };

      return res.json(finalPlan);
    } catch (aiError) {
      console.warn('[Server] Gemini call failed or quota exceeded. Falling back to local engine.', aiError);
      const fallbackPlan = generateLocalEmergencyPlan(home, family, pets || []);
      return res.json(fallbackPlan);
    }
  } catch (error) {
    console.error('[Server] Error handling /api/generate-plan:', error);
    res.status(500).json({ error: 'Error interno generando el plan de emergencia.' });
  }
});

// Vite middleware in dev, static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] PlanFamiliar SV listening on port ${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
