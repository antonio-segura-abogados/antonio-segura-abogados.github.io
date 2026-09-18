import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ACIERTOS_APTO, segundosRestantes, tiempo, type Pregunta, type Respuesta } from './modelo';
import { Simbolo } from './Simbolo';
import { EnergiaRacha, IndicadorRacha } from './RachaCuestionario';
import './racha.css';

export type Sesion = {
  id: number; titulo: string; detalle: string;
  modo: 'ruta' | 'tematica' | 'inteligente' | 'examen';
  preguntas: Pregunta[]; minutos?: number; leccionId?: string;
};
export type DialogoPractica = { titulo: string; mensaje: string; detalle: string; continuar: string; confirmar: string; onConfirmar: () => void };

export function Cuestionario({ sesion, onVolver, onRespuesta, onFinalizar, onDialogo }: {
  sesion: Sesion; onVolver: () => void; onRespuesta: (respuesta: Respuesta) => void;
  onFinalizar: (respuestas: Respuesta[], completa: boolean) => void;
  onDialogo: (dialogo: DialogoPractica | null) => void;
}) {
  const [index, setIndex] = useState(0);
  const [elecciones, setElecciones] = useState<Record<string, string>>({});
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [resumen, setResumen] = useState<Respuesta[] | null>(null);
  const [agotado, setAgotado] = useState(false);
  const [racha, setRacha] = useState(0);
  const [fin] = useState(() => sesion.minutos ? Date.now() + sesion.minutos * 60_000 : null);
  const [ahora, setAhora] = useState(Date.now);
  const cerrado = useRef(false);
  const confirmadas = useRef(new Set<string>());
  const ultimaPreguntaRegistrada = useRef('');
  const heading = useRef<HTMLHeadingElement>(null);
  const examen = sesion.modo === 'examen';
  const pregunta = sesion.preguntas[index];
  const respondidas = Object.keys(elecciones).length;
  const comprobada = !examen && pregunta.id in elecciones;
  const elegida = examen ? elecciones[pregunta.id] ?? null : seleccion;
  const restante = fin === null ? null : segundosRestantes(fin, ahora);
  const correcta = comprobada && elegida === pregunta.respuestaCorrecta;
  const nivelRacha = racha >= 12 ? 5 : racha >= 8 ? 4 : racha >= 5 ? 3 : racha >= 3 ? 2 : 1;
  const efecto = comprobada ? (correcta ? 'is-hit' : 'is-miss') : '';

  const finalizar = useCallback((porTiempo = false) => {
    if (cerrado.current) return;
    cerrado.current = true;
    const respuestas = sesion.preguntas
      .filter(p => examen || p.id in elecciones)
      .map(p => ({ pregunta: p, elegida: elecciones[p.id] ?? null }));
    setResumen(respuestas);
    setAgotado(porTiempo);
    onDialogo(null);
    onFinalizar(respuestas, respondidas === sesion.preguntas.length);
  }, [elecciones, examen, onFinalizar, onDialogo, respondidas, sesion.preguntas]);

  useEffect(() => {
    if (fin === null || resumen !== null) return;
    const tick = () => setAhora(Date.now());
    const timer = window.setInterval(tick, 1000);
    window.addEventListener('focus', tick);
    document.addEventListener('visibilitychange', tick);
    return () => { clearInterval(timer); window.removeEventListener('focus', tick); document.removeEventListener('visibilitychange', tick); };
  }, [fin, resumen]);
  useEffect(() => { if (restante === 0 && resumen === null) finalizar(true); }, [restante, resumen, finalizar]);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.closest('.device-scroll')?.scrollTo(0, 0);
    if (window.matchMedia('(max-width: 520px)').matches) window.scrollTo(0, 0);
  }, [index, resumen]);
  useEffect(() => {
    if (resumen !== null) return;
    const clave = `${sesion.id}:${index}:${pregunta.id}`;
    if (ultimaPreguntaRegistrada.current === clave) return;
    ultimaPreguntaRegistrada.current = clave;
    const respuesta = pregunta.opciones.find(opcion => opcion.id === pregunta.respuestaCorrecta);
    console.log(`[CCSE · prueba] ${pregunta.id} · Respuesta correcta: ${respuesta?.id.toUpperCase()} — ${respuesta?.texto}`);
  }, [index, pregunta, resumen, sesion.id]);

  function dentroDeTiempo() {
    if (fin !== null && Date.now() >= fin) { finalizar(true); return false; }
    return !cerrado.current;
  }
  function comprobar() {
    if (!dentroDeTiempo() || seleccion === null || comprobada || confirmadas.current.has(pregunta.id)) return;
    confirmadas.current.add(pregunta.id);
    setRacha(prev => seleccion === pregunta.respuestaCorrecta ? prev + 1 : 0);
    setElecciones(prev => ({ ...prev, [pregunta.id]: seleccion }));
    onRespuesta({ pregunta, elegida: seleccion });
  }
  function mover(next: number) {
    if (!dentroDeTiempo()) return;
    setIndex(next); setSeleccion(null);
  }
  function pedirEntrega() {
    if (!dentroDeTiempo()) return;
    if (respondidas < sesion.preguntas.length) onDialogo({ titulo: 'Entregar el simulacro', mensaje: `Te quedan ${sesion.preguntas.length - respondidas} preguntas sin responder.`, detalle: 'Las preguntas en blanco no suman puntos. Puedes volver a ellas antes de entregar.', continuar: 'Seguir con el simulacro', confirmar: 'Entregar de todas formas', onConfirmar: () => finalizar() }); else finalizar();
  }
  function pedirSalida() {
    if (resumen) { onVolver(); return; }
    onDialogo({ titulo: 'Salir de la sesión', mensaje: '¿Lo dejamos por ahora?', detalle: examen ? 'Si sales, se descartará este simulacro. Tu progreso anterior se conserva.' : 'Las respuestas comprobadas se guardan para tu repaso. Puedes retomar otro cuestionario cuando quieras.', continuar: examen ? 'Seguir con el simulacro' : 'Seguir practicando', confirmar: examen ? 'Descartar y salir' : 'Guardar y salir', onConfirmar: onVolver });
  }
  const aciertos = resumen?.filter(r => r.elegida === r.pregunta.respuestaCorrecta).length ?? 0;
  const errores = resumen?.filter(r => r.elegida !== r.pregunta.respuestaCorrecta) ?? [];

  return <>
    <button className="practice-back" onClick={pedirSalida}><span aria-hidden="true">←</span> {resumen ? 'Volver' : 'Salir de la sesión'}</button>
    {resumen && <><p className="product-kicker">{sesion.detalle}</p>
    <h1 className="practice-title practice-session-title" ref={heading} tabIndex={-1}>{examen ? 'Tu resultado' : 'Sesión completada'}</h1></>}
    {resumen ? <div className="practice-result">
      <div className="practice-result-mark"><Simbolo nombre={examen && aciertos >= ACIERTOS_APTO ? 'trofeo' : 'check'} /></div>
      <p className="practice-result-score"><strong>{aciertos}</strong><span> / {resumen.length} aciertos</span></p>
      <h2>{examen ? (aciertos >= ACIERTOS_APTO ? '¡Simulacro aprobado!' : 'Cada repaso te acerca más.') : (resumen.length === 0 ? 'Retómalo cuando quieras.' : errores.length ? 'Ya sabes qué reforzar.' : '¡Muy buen trabajo!')}</h2>
      <p>{agotado ? `Han terminado los ${sesion.minutos} minutos. ` : ''}{examen ? `El objetivo es conseguir ${ACIERTOS_APTO} de 25 aciertos.` : resumen.length ? 'Tus respuestas ya cuentan para tu próximo repaso inteligente.' : 'Esta sesión no ha añadido respuestas a tu progreso.'}</p>
      {sesion.leccionId && respondidas === sesion.preguntas.length && <p className="practice-completed-note"><Simbolo nombre="check" /> Paso completado en tu ruta</p>}
      <button className="primary-button" onClick={onVolver}>{sesion.modo === 'ruta' ? 'Volver a mi ruta' : 'Seguir practicando'}<Simbolo nombre="flecha" /></button>
      {errores.length > 0 && <details className="practice-errors"><summary>{errores.length} {errores.length === 1 ? 'pregunta para repasar' : 'preguntas para repasar'}</summary>{errores.map(r => <div key={r.pregunta.id}><strong>{r.pregunta.enunciado}</strong><p>{r.elegida ? `Tu respuesta: ${r.pregunta.opciones.find(o => o.id === r.elegida)?.texto}` : 'Sin responder.'}</p><p className="practice-answer">Respuesta correcta: {r.pregunta.respuesta}</p></div>)}</details>}
    </div> : <div className="quiz-play" data-streak-level={examen ? undefined : nivelRacha} style={{ '--streak-level': nivelRacha } as CSSProperties}>
      <div className="practice-session-meta"><span>{examen ? `${respondidas} de ${sesion.preguntas.length} respondidas` : `Pregunta ${index + 1} de ${sesion.preguntas.length}`}</span>{restante !== null && <span className={`practice-timer ${restante < 60 ? 'is-ending' : ''}`} role="timer" aria-label={`Tiempo restante: ${tiempo(restante)}`}><Simbolo nombre="reloj" />{tiempo(restante)}</span>}</div>
      <progress className="practice-meter" value={respondidas} max={sesion.preguntas.length} aria-label="Preguntas respondidas" />
      {!examen && <IndicadorRacha key={`racha-${pregunta.id}`} racha={racha} efecto={efecto} />}
      <section key={`pregunta-${pregunta.id}`} className={`quiz-card quiz-streak-question ${efecto}`} data-question-id={pregunta.id}>
        <p className="product-kicker">{examen ? `PREGUNTA ${index + 1} DE 25 · TAREA ${pregunta.tareaOficial}` : pregunta.tipo === 'verdadero_falso' ? 'VERDADERO O FALSO' : 'ELIGE UNA RESPUESTA'}</p>
        <h2 ref={heading} tabIndex={-1}>{pregunta.enunciado}</h2>
        <div className="quiz-options">{pregunta.opciones.map(opcion => <button key={opcion.id} disabled={comprobada} aria-pressed={elegida === opcion.id} className={`${elegida === opcion.id ? 'selected' : ''} ${comprobada && opcion.id === pregunta.respuestaCorrecta ? 'correct' : ''} ${comprobada && elegida === opcion.id && opcion.id !== pregunta.respuestaCorrecta ? 'incorrect' : ''}`} onClick={() => {
          if (!dentroDeTiempo()) return;
          if (examen) setElecciones(prev => ({ ...prev, [pregunta.id]: opcion.id })); else setSeleccion(opcion.id);
        }}><span>{opcion.id.toUpperCase()}</span>{opcion.texto}{comprobada && opcion.id === pregunta.respuestaCorrecta && <Simbolo nombre="check" />}</button>)}</div>
        {comprobada && <div className={`quiz-explanation quiz-streak-feedback ${correcta ? 'is-correct' : 'is-incorrect'}`} role="status">
          {correcta && <EnergiaRacha nivel={nivelRacha} />}
          <strong>{correcta ? (racha === 1 ? '¡Correcto! Empieza tu racha.' : racha >= 8 ? `¡Excelente! ${racha} aciertos seguidos.` : `¡${racha} aciertos seguidos!`) : 'Esta vez no. La siguiente es una nueva oportunidad.'}</strong>
          <p>Respuesta correcta: {pregunta.respuesta}</p><small>{correcta ? `Racha de ${racha} · ` : 'Racha reiniciada · '}Manual CCSE 2026 · pregunta {pregunta.id}</small>
        </div>}
        {examen ? <>
          <div className="practice-exam-actions"><button className="practice-secondary" disabled={index === 0} onClick={() => mover(index - 1)}>Anterior</button>{index < sesion.preguntas.length - 1 ? <button className="primary-button" onClick={() => mover(index + 1)}>Siguiente<Simbolo nombre="flecha" /></button> : <button className="primary-button" onClick={pedirEntrega}>Finalizar simulacro<Simbolo nombre="check" /></button>}</div>
          <nav className="practice-question-nav" aria-label="Preguntas del simulacro">{sesion.preguntas.map((p, i) => <button key={p.id} aria-label={`Pregunta ${i + 1}${p.id in elecciones ? ', respondida' : ', sin responder'}`} aria-current={i === index ? 'step' : undefined} className={p.id in elecciones ? 'is-answered' : ''} onClick={() => mover(i)}>{i + 1}</button>)}</nav>
          <p className="quiet-note">Puedes cambiar tus respuestas. Verás la corrección al finalizar.</p>
        </> : !comprobada ? <button className="primary-button" disabled={seleccion === null} onClick={comprobar}>Comprobar respuesta<Simbolo nombre="check" /></button> : <button className="primary-button" onClick={() => index === sesion.preguntas.length - 1 ? finalizar() : mover(index + 1)}>{index === sesion.preguntas.length - 1 ? 'Ver mi resultado' : 'Siguiente pregunta'}<Simbolo nombre="flecha" /></button>}
        {sesion.modo === 'inteligente' && respondidas > 0 && <button className="text-button" onClick={() => finalizar()}>Terminar repaso</button>}
      </section>
    </div>}
  </>;
}
