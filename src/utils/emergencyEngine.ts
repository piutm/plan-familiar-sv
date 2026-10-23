import { HomeData, MiembroFamilia, Mascota, PlanEmergencia, ItemMochila, RolFamiliar, PasoFase } from '../types/plan';

export const INSTITUTIONAL_CONTACTS = [
  {
    id: 'pc-sv',
    nombre: 'Protección Civil SV',
    numero: '2281-0888',
    tipo: 'institucional' as const,
    descripcion: 'Centro de Operaciones de Emergencia (COEN) y reportes de alertas nacionales.',
    icono: 'ShieldAlert'
  },
  {
    id: 'bomberos-sv',
    nombre: 'Cuerpo de Bomberos',
    numero: '913',
    tipo: 'institucional' as const,
    descripcion: 'Incendios, fugas de gas propano, rescates y retiro de árboles caídos.',
    icono: 'Flame'
  },
  {
    id: 'sem-sv',
    nombre: 'SEM (Emergencias Médicas)',
    numero: '132',
    tipo: 'institucional' as const,
    descripcion: 'Ambulancias y atención prehospitalaria pública inmediata.',
    icono: 'Ambulance'
  },
  {
    id: 'cruz-roja-sv',
    nombre: 'Cruz Roja Salvadoreña',
    numero: '2222-5155',
    tipo: 'institucional' as const,
    descripcion: 'Rescate acuático, primeros auxilios y evacuaciones.',
    icono: 'HeartPulse'
  },
  {
    id: 'comandos-sv',
    nombre: 'Comandos de Salvamento',
    numero: '2133-0000',
    tipo: 'institucional' as const,
    descripcion: 'Cuerpo de socorro voluntario para rescates y traslados.',
    icono: 'LifeBuoy'
  },
  {
    id: 'cruz-verde-sv',
    nombre: 'Cruz Verde Salvadoreña',
    numero: '2284-5792',
    tipo: 'institucional' as const,
    descripcion: 'Atención de emergencias y desastres en todo el país.',
    icono: 'Cross'
  },
  {
    id: 'pnc-sv',
    nombre: 'Policía Nacional Civil',
    numero: '911',
    tipo: 'institucional' as const,
    descripcion: 'Seguridad ciudadana y apoyo en cordones de evacuación.',
    icono: 'Shield'
  },
  {
    id: 'anda-sv',
    nombre: 'ANDA (Reportes de Agua)',
    numero: '915',
    tipo: 'institucional' as const,
    descripcion: 'Fugas graves en red pública y cisternas comunitarias.',
    icono: 'Droplets'
  }
];

export function generateLocalEmergencyPlan(
  home: HomeData,
  family: MiembroFamilia[],
  pets: Mascota[]
): PlanEmergencia {
  const isLamina = home.tipoVivienda === 'lamina_mixta';
  const isApto = home.tipoVivienda === 'apartamento';
  const isLadera = home.zona === 'ladera';
  const isRio = home.zona === 'rio_quebrada';
  const isCosta = home.zona === 'costa';
  const isVolcan = home.zona === 'volcan';
  const hasGas = home.tieneGasPropano;

  const totalMembers = family.length;
  const hasBabies = family.some(m => m.rangoEdad === 'bebe' || m.necesidades.includes('bebe'));
  const hasElderly = family.some(m => m.rangoEdad === 'adulto_mayor');
  const hasReducedMobility = family.some(m => m.necesidades.includes('movilidad_reducida'));
  const hasDailyMeds = family.some(m => m.necesidades.includes('medicamentos'));
  const hasPets = pets.length > 0 && pets.reduce((acc, p) => acc + p.cantidad, 0) > 0;

  // Calculo nivel de vulnerabilidad
  let nivelVulnerabilidad: 'Alto' | 'Medio' | 'Crítico' = 'Medio';
  const puntosCriticos: string[] = [];

  if (isLamina && (isLadera || isRio)) {
    nivelVulnerabilidad = 'Crítico';
    puntosCriticos.push('Vivienda de lámina sobre terreno inestable o cercano a cuerpo de agua (alto riesgo de colapso por deslizamiento o socavamiento).');
  } else if (isLadera || isRio || isCosta) {
    nivelVulnerabilidad = 'Alto';
  }

  if (isLamina) {
    puntosCriticos.push('Estructura liviana: peligro por desprendimiento de láminas con vientos fuertes y menor resistencia a caída de ramas o escombros.');
  }
  if (isApto) {
    puntosCriticos.push(`Apartamento en nivel ${home.pisoApartamento || 'superior'}: ruta de salida dependiente de gradas compartidas. Prohibido usar elevadores.`);
  }
  if (hasReducedMobility || hasElderly) {
    puntosCriticos.push('Presencia de personas con movilidad reducida o adultos mayores: la evacuación toma al menos el doble de tiempo y requiere asistencia dedicada.');
  }
  if (hasGas) {
    puntosCriticos.push('Cilindro de gas propano en el hogar: riesgo latente de fuga e incendio si cae o se fisura la manguera durante sismos.');
  }

  const zonaLabelMap: Record<string, string> = {
    costa: 'zona costera',
    ciudad: 'área urbana',
    ladera: 'ladera o terreno en pendiente',
    rio_quebrada: 'cercanía a río o quebrada',
    volcan: 'falda volcánica'
  };

  const riesgoLabelMap: Record<string, string> = {
    sismos: 'sismos y terremotos',
    inundaciones: 'inundaciones y crecidas repentinas',
    deslizamientos: 'deslizamientos y derrumbes',
    tormentas: 'temporales y lluvias torrenciales',
    todos: 'múltiples amenazas (sismos, lluvias torrenciales y deslaves)'
  };

  const resumenEjecutivo = `Plan de Contingencia y Protección Familiar diseñado para un hogar de ${totalMembers} ${totalMembers === 1 ? 'persona' : 'personas'} ubicado en ${zonaLabelMap[home.zona] || 'El Salvador'}, habitando una ${isLamina ? 'vivienda de lámina/material mixto' : isApto ? 'vivienda en apartamento' : 'casa residencial'} con exposición prioritaria a ${riesgoLabelMap[home.riesgoPrincipal] || 'emergencias naturales'}. Se enfoca en tiempos de respuesta ultra-rápidos, protección de grupos vulnerables y preservación de suministros vitales para 72 horas.`;

  // FASE ANTES
  const antes: PasoFase[] = [
    {
      id: 'a1',
      titulo: 'Inspección de rutas de escape y puertas',
      detalle: 'Asegurar que pasillos y puertas principales no estén obstruidos por macetas, muebles o cilindros. Mantener las llaves colgadas siempre junto a la salida a la altura de un adulto.',
      categoria: 'organizacion'
    },
    {
      id: 'a2',
      titulo: hasGas ? 'Aseguramiento del tambo de gas propano' : 'Revisión de conexiones de energía',
      detalle: hasGas 
        ? 'Amarrar el cilindro de gas propano a la pared con una cadena o cincho resistente para evitar que vuelque. Verificar que la válvula reguladora cierre con suavidad y no tenga fugas.'
        : 'Identificar la palanca principal (caja térmica o breaker) para corte instantáneo en caso de cortocircuito o inundación.',
      categoria: 'infraestructura'
    }
  ];

  if (isLamina) {
    antes.push({
      id: 'a-lamina',
      titulo: 'Revisión de anclajes de láminas y canales de lluvia',
      detalle: 'Revisar clavos con capuchón y ganchos de lámina. Limpiar canaletas de agua lluvia para evitar sobrepeso y filtraciones que debiliten las soleras o postes.',
      categoria: 'infraestructura',
      advertencia: 'No subir a techos de lámina durante tormentas eléctricas o lluvias activas.'
    });
  }

  if (isLadera) {
    antes.push({
      id: 'a-ladera',
      titulo: 'Monitoreo de grietas en el suelo o muro de contención',
      detalle: 'Revisar semanalmente si surgen grietas nuevas en paredes, pisos o tierra circundante. Si los árboles o postes lucen inclinados, alertar de inmediato a Protección Civil.',
      categoria: 'infraestructura'
    });
  }

  if (isRio) {
    antes.push({
      id: 'a-rio',
      titulo: 'Identificación de cota de desborde y ruta hacia terreno alto',
      detalle: 'Mapear el camino más corto hacia un punto elevado de la comunidad. No esperar que el agua llegue a la puerta; si el río cambia de color a marrón oscuro o arrastra troncos, prepararse para evacuar.',
      categoria: 'organizacion'
    });
  }

  if (hasDailyMeds) {
    antes.push({
      id: 'a-meds',
      titulo: 'Reserva preventiva de medicamentos de uso continuo',
      detalle: 'Apartar una dotación de al menos 7 días de medicamentos vitales (presión, glucosa, asma) con copia de recetas médicas en empaque hermético impermeable.',
      categoria: 'suministros'
    });
  }

  // FASE DURANTE
  const durante: PasoFase[] = [];
  let pasoNum = 1;

  if (home.riesgoPrincipal === 'sismos' || home.riesgoPrincipal === 'todos') {
    let sismoDetalle = 'Agacharse bajo una mesa sólida o junto a un muro estructural, protegiendo cabeza y cuello.';
    if (isLamina) {
      sismoDetalle = 'No correr al exterior de inmediato si caen ramas o cables. Proteger la cabeza con los brazos o cojines bajo una mesa de madera sólida, lejos de celosías de vidrio o repisas.';
    } else if (isApto) {
      sismoDetalle = 'Mantener la calma dentro del apartamento. Protegerse junto a una columna o bajo mueble sólido. JAMÁS usar los elevadores ni arrojarse a gradas durante la sacudida.';
    }

    durante.push({
      id: `d-${pasoNum}`,
      titulo: `Paso ${pasoNum}: ¡Agacharse, Cubrirse y Sujetarse!`,
      detalle: sismoDetalle,
      alerta: 'El 80% de lesiones en sismos ocurren por objetos que caen al intentar salir corriendo descalzos.'
    });
    pasoNum++;
  }

  if (hasGas) {
    durante.push({
      id: `d-${pasoNum}`,
      titulo: `Paso ${pasoNum}: Corte inmediato de válvula de gas y breakers`,
      detalle: 'La persona designada debe girar la mariposa del regulador del tambo de gas para cerrar el paso y bajar la palanca principal de electricidad si el camino es seguro.',
      alerta: 'Si ya huele a gas con intensidad, NO toques interruptores eléctricos; sal de inmediato.'
    });
    pasoNum++;
  }

  if (isRio || isLadera || home.riesgoPrincipal === 'inundaciones' || home.riesgoPrincipal === 'deslizamientos') {
    durante.push({
      id: `d-${pasoNum}`,
      titulo: `Paso ${pasoNum}: Evacuación preventiva hacia cota segura`,
      detalle: 'Al activarse la alerta de lluvia o crecida, tomar la mochila de 72 horas y evacuar con calma siguiendo la ruta preestablecida hacia la zona alta comunal.',
      alerta: 'Nunca intentar cruzar a pie o en vehículo calles anegadas, badenes o quebradas desbordadas.'
    });
    pasoNum++;
  }

  durante.push({
    id: `d-${pasoNum}`,
    titulo: `Paso ${pasoNum}: Desplazamiento en bloque familiar`,
    detalle: 'Caminar juntos, sujetando de la mano a menores y asistiendo a los adultos mayores o personas con movilidad limitada. Mantener a las mascotas con correa corta.',
  });

  // FASE DESPUÉS
  const despues: PasoFase[] = [
    {
      id: 'dp1',
      titulo: 'Pase de lista y primeros auxilios básicos',
      detalle: 'Verificar que todos los miembros del hogar estén completos en el punto de encuentro. Atender cortes o crisis nerviosas con los insumos del botiquín.',
      advertencia: 'No mover a personas con sospecha de fractura en cuello o espalda a menos que haya peligro inminente de fuego o colapso.'
    },
    {
      id: 'dp2',
      titulo: 'Revisión sensorial del inmueble (fugas y daños)',
      detalle: 'Revisar la casa usando linterna (NUNCA fósforos, velas ni encendedores). Olfatear si hay gas. Si se observan fisuras diagonales en paredes o vigas vencidas, no ingresar.',
      advertencia: 'El gas propano es más pesado que el aire y se acumula en el piso o rincones bajos.'
    },
    {
      id: 'dp3',
      titulo: 'Sintonización de canales oficiales salvadoreños',
      detalle: 'Encender la radio portátil en emisoras nacionales para escuchar los comunicados oficiales del Sistema Nacional de Protección Civil y MARN (Ministerio de Medio Ambiente). Desestimar audios alarmistas sin fuente en WhatsApp.',
    },
    {
      id: 'dp4',
      titulo: 'Comunicación familiar vía SMS o datos breves',
      detalle: 'Utilizar mensajes de texto cortos ("Estamos bien en el parque") en lugar de llamadas largas para no saturar las antenas celulares de la zona.',
    }
  ];

  // ROLES FAMILIARES
  const roles: RolFamiliar[] = [];
  const capableAdults = family.filter(m => m.rangoEdad === 'adulto' && !m.necesidades.includes('movilidad_reducida'));

  family.forEach((miembro, idx) => {
    if (miembro.rangoEdad === 'bebe') {
      roles.push({
        id: `rol-${miembro.id}`,
        miembroAlias: miembro.alias || `Bebé ${idx + 1}`,
        rolTitulo: 'Protegido Prioritario',
        tareasClave: [
          'Permanecer en brazos del adulto asignado.',
          'Uso de manta abrigadora y gorrito para evitar hipotermia.',
          'Su mochila contiene pañales, fórmula y toallitas.'
        ],
        equipoAsignado: 'Manta térmica y pulsera con datos de contacto bordados/anotados.',
        prioridad: 'alta'
      });
    } else if (miembro.necesidades.includes('movilidad_reducida') || (miembro.rangoEdad === 'adulto_mayor' && capableAdults.length > 0)) {
      roles.push({
        id: `rol-${miembro.id}`,
        miembroAlias: miembro.alias || `Adulto Mayor ${idx + 1}`,
        rolTitulo: 'Miembro de Evacuación Acompañada',
        tareasClave: [
          'Mantener calzado cómodo y bastón/andadera junto a la cama.',
          'Acatar la indicación del acompañante sin titubear.',
          'Llevar consigo su estuche de medicamentos recetados.'
        ],
        equipoAsignado: 'Silbato personal de emergencia colgado al cuello y bastón/andadera.',
        prioridad: 'alta'
      });
    } else if (idx === 0 || (capableAdults.length > 0 && capableAdults[0].id === miembro.id)) {
      roles.push({
        id: `rol-${miembro.id}`,
        miembroAlias: miembro.alias || 'Líder del Hogar',
        rolTitulo: 'Coordinador General y Portador de Mochila',
        tareasClave: [
          'Tomar la Mochila de Emergencia de 72 horas ubicada junto a la salida.',
          hasGas ? 'Cerrar la válvula del tambo de gas propano en la cocina.' : 'Bajar la palanca principal eléctrica si es seguro.',
          'Guiar el desplazamiento hacia el punto de reunión acordado.'
        ],
        equipoAsignado: 'Mochila de Emergencia y linterna principal.',
        prioridad: 'alta'
      });
    } else if (hasElderly || hasReducedMobility || hasBabies) {
      const vulnerable = family.find(f => f.rangoEdad === 'bebe' || f.necesidades.includes('movilidad_reducida') || f.rangoEdad === 'adulto_mayor');
      roles.push({
        id: `rol-${miembro.id}`,
        miembroAlias: miembro.alias || `Familiar de Asistencia`,
        rolTitulo: 'Asistente de Movilidad y Acompañamiento',
        tareasClave: [
          `Asistir y acompañar directamente a ${vulnerable?.alias || 'los miembros vulnerables'}.`,
          'Ayudar a colocarse el calzado adecuado y despejar la puerta de salida.',
          'Llevar el portabebé o silla de ruedas según corresponda.'
        ],
        equipoAsignado: 'Linterna de mano secundaria y cangurera con botiquín rápido.',
        prioridad: 'alta'
      });
    } else if (hasPets) {
      roles.push({
        id: `rol-${miembro.id}`,
        miembroAlias: miembro.alias || `Guardián de Mascotas`,
        rolTitulo: 'Encargado de Mascotas y Seguridad Externa',
        tareasClave: [
          'Colocar correas y meter gatos/aves en jaula transportadora.',
          'Llevar la bolsa con agua y alimento para las mascotas.',
          'Asegurar el candado o pasador exterior al evacuar.'
        ],
        equipoAsignado: 'Correas, bolsa de alimento y transportadora.',
        prioridad: 'media'
      });
    } else if (miembro.rangoEdad === 'nino') {
      roles.push({
        id: `rol-${miembro.id}`,
        miembroAlias: miembro.alias || `Pequeño Guardián`,
        rolTitulo: 'Mensajero y Silbato de Alerta',
        tareasClave: [
          'Caminar siempre tomado de la mano de un adulto.',
          'Portar su silbato para hacer sonar 3 toques cortos si alguien se extravía.',
          'Llevar su juguete o libro favorito pequeño para mantener la calma.'
        ],
        equipoAsignado: 'Silbato infantil de plástico y mini linterna.',
        prioridad: 'apoyo'
      });
    } else {
      roles.push({
        id: `rol-${miembro.id}`,
        miembroAlias: miembro.alias || `Apoyo Logístico`,
        rolTitulo: 'Apoyo Logístico y Comunicaciones',
        tareasClave: [
          'Verificar que puertas traseras y ventanas queden trabadas.',
          'Portar el radio portátil con baterías y teléfono cargado.',
          'Mantener contacto visual con todo el grupo familiar.'
        ],
        equipoAsignado: 'Radio a baterías y banco de carga (powerbank).',
        prioridad: 'media'
      });
    }
  });

  // Si no se asignó alguien a mascotas y hay mascotas, añadir nota al líder
  if (hasPets && !roles.some(r => r.rolTitulo.includes('Mascotas'))) {
    if (roles[0]) {
      roles[0].tareasClave.push('Asegurar a las mascotas con correa o jaula antes de salir.');
    }
  }

  // MOCHILA DE 72 HORAS
  const mochila: ItemMochila[] = [
    {
      id: 'm1',
      item: 'Agua potable embotellada (mínimo 2 litros por persona)',
      categoria: 'agua_alimentos',
      motivo: 'El Salvador tiene altas temperaturas y los cortes de servicio de ANDA son inmediatos tras sismos o desbordes.',
      esencial: true,
      completado: false
    },
    {
      id: 'm2',
      item: 'Alimentos no perecederos con abrefácil (atún, frijoles enlatados, galletas)',
      categoria: 'agua_alimentos',
      motivo: 'Nutrición lista para consumir sin requerir cocción con gas ni refrigeración.',
      esencial: true,
      completado: false
    },
    {
      id: 'm3',
      item: 'Botiquín de primeros auxilios (alcohol, gasas estériles, curitas, acetaminofén, suero oral)',
      categoria: 'botiquin',
      motivo: 'Atención primaria ante cortes con vidrios de celosía, raspaduras o deshidratación.',
      esencial: true,
      completado: false
    },
    {
      id: 'm4',
      item: 'Linterna potente recargable o con juego de baterías alcalinas nuevas',
      categoria: 'herramientas',
      motivo: 'Los tendidos eléctricos suelen colapsar por ramas o postes caídos.',
      esencial: true,
      completado: false
    },
    {
      id: 'm5',
      item: 'Radio portátil a baterías AM/FM',
      categoria: 'herramientas',
      motivo: 'Para sintonizar las cadenas nacionales de Protección Civil sin depender de señal celular.',
      esencial: true,
      completado: false
    },
    {
      id: 'm6',
      item: 'Silbato náutico o de emergencia para cada persona',
      categoria: 'herramientas',
      motivo: 'Gritar agota el oxígeno; un silbato emite 100 decibelios y alerta a cuerpos de socorro a gran distancia.',
      esencial: true,
      completado: false
    },
    {
      id: 'm7',
      item: 'Copias de DUIs, partidas de nacimiento y títulos de propiedad en bolsa Ziploc hermética',
      categoria: 'documentos',
      motivo: 'Evita la pérdida irreversible de identidad y comprobantes ante inundaciones o albergues.',
      esencial: true,
      completado: false
    },
    {
      id: 'm8',
      item: 'Dinero en efectivo en billetes de baja denominación ($1, $5, monedas)',
      categoria: 'documentos',
      motivo: 'En emergencias no funcionan los POS ni cajeros automáticos; se compra en tiendas locales.',
      esencial: true,
      completado: false
    },
    {
      id: 'm9',
      item: 'Fósforos o encendedor sellado en doble plástico + velas en frasco',
      categoria: 'herramientas',
      motivo: 'Fuente de fuego de respaldo (usar solo si se ha descartado fuga de gas).',
      esencial: false,
      completado: false
    },
    {
      id: 'm10',
      item: 'Mascarillas quirúrgicas o KN95 (ceniza volcánica y polvo de escombros)',
      categoria: 'botiquin',
      motivo: isVolcan ? 'Fundamental ante expulsión de ceniza del volcán.' : 'Protección de vías respiratorias contra polvo.',
      esencial: isVolcan,
      completado: false
    }
  ];

  // Adiciones condicionales a la mochila
  if (hasDailyMeds) {
    mochila.push({
      id: 'm-meds',
      item: 'Medicamentos crónicos para 7 días (presión, insulina, metformina, etc.)',
      categoria: 'especiales_familia',
      motivo: 'Preservar la estabilidad de los miembros con enfermedades preexistentes.',
      esencial: true,
      completado: false
    });
  }

  if (hasBabies) {
    mochila.push({
      id: 'm-bebe',
      item: 'Paquete de pañales, fórmula láctea, biberón esterilizado y toallitas húmedas',
      categoria: 'especiales_familia',
      motivo: 'Atención vital para el lactante durante las primeras 72 horas.',
      esencial: true,
      completado: false
    });
  }

  if (hasPets) {
    mochila.push({
      id: 'm-pets',
      item: 'Bolsa de concentrado para mascotas (3 días), correa extra y plato plegable',
      categoria: 'especiales_familia',
      motivo: 'Garantizar el bienestar y control de los animales de compañía en albergues o traslados.',
      esencial: true,
      completado: false
    });
  }

  if (isLamina) {
    mochila.push({
      id: 'm-lamina-guantes',
      item: 'Par de guantes de carnaza o construcción gruesos',
      categoria: 'herramientas',
      motivo: 'Manipulación segura de láminas afiladas o escombros sin cortarse las manos.',
      esencial: true,
      completado: false
    });
  }

  // PUNTOS DE REUNIÓN
  const puntosReunion = {
    puntoInterno: isApto 
      ? `Dentro del apartamento: pasillo central o muro estructural sin ventanas de vidrio ni repisas elevadas.`
      : isLamina
      ? `Zona interna de la vivienda: marco de la puerta de madera más resistente o bajo una mesa sólida, lejos del alero exterior de la lámina.`
      : `Bajo el marco de puerta principal o junto a muro maestro portante, alejados de ventanas de celosía.`,
    puntoExterno: isLadera
      ? `Terreno plano comunal fuera del ángulo de deslizamiento (por ejemplo, cancha de fútbol comunal o calle ancha pavimentada a más de 50 metros de la pendiente).`
      : isRio
      ? `Zona alta del barrio o comunidad (plaza o escuela designada como albergue oficial en cota elevada).`
      : `Parque del vecindario, área verde o calle despejada libre de cables de media tensión, transformadores y árboles antiguos.`,
    rutaEvacuacion: isApto
      ? `Salida por la grada de emergencia hacia la planta baja. Nunca tomar el ascensor. Caminar por el lado derecho de la escalera agarrados del pasamanos.`
      : `Salida recta por la puerta principal despejada hacia la vía pública más ancha. Si la puerta principal se traba por deformación del marco, usar la salida de servicio/patio.`,
    zonaSeguraComunitaria: isCosta
      ? `Punto de encuentro ante alerta de tsunami: zona de elevación mínima a 30 metros sobre el nivel del mar o 2 km tierra adentro.`
      : `Casa comunal, centro escolar local o iglesia comunitaria registrada como albergue temporal por Protección Civil.`
  };

  const consejosLocales = [
    'En El Salvador, tras sismos mayores a 6.0, las líneas telefónicas colapsan por saturación. Usa mensajes SMS directos o WhatsApp breve.',
    'Nunca creas ni reenvíes audios anónimos de WhatsApp que predicen terremotos a horas fijas (la ciencia aún no predice sismos). Sigue la cuenta oficial de @MedioAmbienteSV y @PROCIVILSV.',
    'El tambo de gas propano causa la mayoría de incendios posteriores a un terremoto en San Salvador y zonas urbanas. Revisa el regulador con agua jabonosa si sospechas de escape.',
    isLamina 
      ? 'En casas de lámina, las altas temperaturas diurnas y lluvias nocturnas aflojan los clavos con el tiempo. Realiza una inspección visual trimestral de los amarres.' 
      : 'Identifica la ubicación de la llave de paso de agua de ANDA en la acera para cerrarla si hay tuberías rotas que erosionen el cimiento.',
    'Ten a la mano una radio a baterías con frecuencias AM/FM de cobertura nacional (Radio Nacional de El Salvador 96.9 FM / YSUCA 91.7 FM / YSKL 104.1 FM) para boletines de emergencia.'
  ];

  return {
    id: `plan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    resumenEjecutivo,
    diagnosticoVulnerabilidad: {
      nivel: nivelVulnerabilidad,
      explicacion: `Tu hogar presenta un nivel de vulnerabilidad ${nivelVulnerabilidad.toUpperCase()} debido a su ubicación en ${zonaLabelMap[home.zona] || 'zona vulnerable'} combinada con una estructura de ${isLamina ? 'lámina/material ligero' : isApto ? 'apartamento en altura' : 'material tradicional'}.`,
      puntosCriticos
    },
    fases: {
      antes,
      durante,
      despues
    },
    roles,
    mochila,
    puntosReunion,
    consejosLocales,
    source: 'reglas_sv'
  };
}
