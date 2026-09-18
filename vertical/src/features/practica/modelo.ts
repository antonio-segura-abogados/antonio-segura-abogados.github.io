import banco from '../../../../recursos-compartidos/ccse/preguntas-2026.json';

export type Pregunta = (typeof banco.tematicas)[number]['preguntas'][number];
export type Tematica = Omit<(typeof banco.tematicas)[number], 'preguntas'> & { preguntas: Pregunta[] };
export type Leccion = { id: string; nombre: string; preguntas: Pregunta[]; final: boolean };
export type Recuerdo = { intentos: number; aciertos: number; racha: number; ultimoAcierto: boolean; ultimaVez: number; proximoRepaso: number };
export type Progreso = { preguntas: Record<string, Recuerdo>; lecciones: string[] };
export type Respuesta = { pregunta: Pregunta; elegida: string | null };
export const tematicas: Tematica[] = banco.tematicas;
export const preguntas = tematicas.flatMap<Pregunta>(t => t.preguntas);
export const STORAGE_KEY = 'as-practica-ccse-2026-v1';
export const MINUTOS_SIMULACRO = 30;
export const MINUTOS_REPASO = 5;
export const ACIERTOS_APTO = 15;
export const CUOTAS_EXAMEN = [10, 3, 2, 3, 7];
const DIA = 86_400_000;

export function leccionesDe(tematica: Tematica): Leccion[] {
  const temas = tematica.subcategorias.length
    ? tematica.subcategorias.map(s => ({ id: `${tematica.id}/${s.id}`, nombre: s.nombre, preguntas: tematica.preguntas.filter(p => p.subcategoriaId === s.id), final: false }))
    : [{ id: `${tematica.id}/tema-completo`, nombre: tematica.nombre, preguntas: tematica.preguntas, final: false }];
  return [...temas, { id: `${tematica.id}/repaso-final`, nombre: 'Repaso final', preguntas: tematica.preguntas, final: true }];
}

export function barajar<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function crearSimulacro(random = Math.random): Pregunta[] {
  return CUOTAS_EXAMEN.flatMap((cantidad, i) => barajar(preguntas.filter(p => p.tareaOficial === i + 1), random).slice(0, cantidad));
}

export function prioridad(recuerdo: Recuerdo | undefined, now: number): number {
  if (!recuerdo) return 2;
  if (!recuerdo.ultimoAcierto) return 4;
  if (recuerdo.proximoRepaso <= now) return 3;
  return 1;
}

export function crearRepaso(progreso: Progreso, now = Date.now(), random = Math.random): Pregunta[] {
  return barajar(preguntas, random).sort((a, b) => {
    const ra = progreso.preguntas[a.id], rb = progreso.preguntas[b.id];
    return prioridad(rb, now) - prioridad(ra, now)
      || (ra?.proximoRepaso ?? now) - (rb?.proximoRepaso ?? now);
  }).slice(0, 10);
}

export function registrar(progreso: Progreso, respuestas: Respuesta[], now = Date.now()): Progreso {
  const recuerdos = { ...progreso.preguntas };
  for (const { pregunta, elegida } of respuestas) {
    const anterior = recuerdos[pregunta.id];
    const correcto = elegida === pregunta.respuestaCorrecta;
    const racha = correcto ? (anterior?.racha ?? 0) + 1 : 0;
    recuerdos[pregunta.id] = {
      intentos: (anterior?.intentos ?? 0) + 1,
      aciertos: (anterior?.aciertos ?? 0) + Number(correcto),
      racha, ultimoAcierto: correcto, ultimaVez: now,
      proximoRepaso: correcto ? now + [1, 3, 7, 14, 30][Math.min(racha - 1, 4)] * DIA : now,
    };
  }
  return { ...progreso, preguntas: recuerdos };
}

export function progresoVacio(): Progreso { return { preguntas: {}, lecciones: [] }; }

export function leerProgreso(texto: string | null): Progreso {
  if (!texto) return progresoVacio();
  try {
    const value = JSON.parse(texto) as Progreso;
    if (!value || typeof value.preguntas !== 'object' || value.preguntas === null || !Array.isArray(value.lecciones)) return progresoVacio();
    const result = progresoVacio();
    for (const p of preguntas) {
      const r = value.preguntas[p.id];
      if (r && Number.isInteger(r.intentos) && r.intentos > 0 && Number.isInteger(r.aciertos)
        && r.aciertos >= 0 && r.aciertos <= r.intentos && Number.isInteger(r.racha) && r.racha >= 0 && r.racha <= r.aciertos
        && typeof r.ultimoAcierto === 'boolean' && Number.isFinite(r.ultimaVez) && r.ultimaVez >= 0
        && Number.isFinite(r.proximoRepaso) && r.proximoRepaso >= 0) result.preguntas[p.id] = r;
    }
    const validas = new Set(tematicas.flatMap(t => leccionesDe(t).map(l => l.id)));
    result.lecciones = [...new Set(value.lecciones.filter(id => validas.has(id)))];
    return result;
  } catch { return progresoVacio(); }
}

export function segundosRestantes(fin: number, now = Date.now()): number { return Math.max(0, Math.ceil((fin - now) / 1000)); }
export function tiempo(segundos: number): string { return `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`; }
