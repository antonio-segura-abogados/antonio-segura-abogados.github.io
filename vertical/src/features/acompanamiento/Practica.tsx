import { useEffect, useRef, useState } from 'react';
import { DemoScene, SceneDialog } from '../../components/DemoScene';
import { Cuestionario, type DialogoPractica, type Sesion } from '../practica/Cuestionario';
import { Simbolo } from '../practica/Simbolo';
import { IconoTematica } from '../practica/IconoTematica';
import { ACIERTOS_APTO, MINUTOS_REPASO, MINUTOS_SIMULACRO, STORAGE_KEY, barajar, crearRepaso, crearSimulacro, leccionesDe, leerProgreso, preguntas, progresoVacio, registrar, tematicas, type Leccion, type Progreso } from '../practica/modelo';
import '../practica/practica.css';

type Vista = 'inicio' | 'ruta' | 'secciones' | 'tematicas' | 'inteligente' | 'examen';
const inicial = () => { try { return leerProgreso(localStorage.getItem(STORAGE_KEY)); } catch { return progresoVacio(); } };

export function PracticaScene() {
  const [vista, setVista] = useState<Vista>('inicio');
  const [progreso, setProgreso] = useState<Progreso>(inicial);
  const [guardado, setGuardado] = useState(true);
  const [seccion, setSeccion] = useState(() => {
    const estado = inicial();
    return Math.max(0, tematicas.findIndex(t => leccionesDe(t).some(l => !estado.lecciones.includes(l.id))));
  });
  const [sesion, setSesion] = useState<Sesion | null>(null);
  const [dialogo, setDialogo] = useState<DialogoPractica | null>(null);
  const serial = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const tematica = tematicas[seccion];
  const lecciones = leccionesDe(tematica);
  const completadas = lecciones.filter(l => progreso.lecciones.includes(l.id)).length;
  const siguiente = lecciones.find(l => !progreso.lecciones.includes(l.id));
  const seccionesCompletas = tematicas.filter(t => leccionesDe(t).every(l => progreso.lecciones.includes(l.id))).length;
  const vistas = Object.keys(progreso.preguntas).length;
  const acertadas = preguntas.filter(p => progreso.preguntas[p.id]?.ultimoAcierto).length;
  const pendientes = preguntas.length - acertadas;
  const preparacion = Math.floor(acertadas / preguntas.length * 100);
  const reforzar = Object.values(progreso.preguntas).filter(p => !p.ultimoAcierto || p.proximoRepaso <= Date.now()).length;

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso)); setGuardado(true); }
    catch { setGuardado(false); }
  }, [progreso]);
  useEffect(() => {
    const heading = root.current?.querySelector<HTMLElement>('h1');
    heading?.focus({ preventScroll: true });
    root.current?.closest('.device-scroll')?.scrollTo(0, 0);
    if (window.matchMedia('(max-width: 520px)').matches) window.scrollTo(0, 0);
  }, [vista, seccion, sesion?.id]);

  function empezar(config: Omit<Sesion, 'id'>) { setSesion({ ...config, id: ++serial.current }); }
  function empezarLeccion(leccion: Leccion) {
    empezar({ modo: 'ruta', titulo: leccion.nombre, detalle: `Sección ${seccion + 1} · ${leccion.final ? 'Repaso de toda la sección' : 'Ruta de aprendizaje'}`, preguntas: barajar(leccion.preguntas), leccionId: leccion.id });
  }
  function volver() { setDialogo(null); setSesion(null); }
  function reiniciar() { volver(); setVista('inicio'); setSeccion(0); setProgreso(progresoVacio()); }

  return <DemoScene title="Práctica del examen" showHeader={false} navigation activeSection="practice" onReset={reiniciar} note="Preguntas del manual CCSE 2026. Progreso local en este dispositivo. Reiniciar borra el progreso de práctica." dialog={<SceneDialog open={dialogo !== null} onClose={() => setDialogo(null)} title={dialogo?.titulo ?? ''}>{dialogo && <><h2>{dialogo.mensaje}</h2><p className="detail-lead">{dialogo.detalle}</p><button className="primary-button" onClick={() => setDialogo(null)}>{dialogo.continuar}</button><button className="text-button" onClick={dialogo.onConfirmar}>{dialogo.confirmar}</button></>}</SceneDialog>}>
    <div className="practice-space" ref={root}>
      {sesion ? <Cuestionario key={sesion.id} sesion={sesion} onVolver={volver} onDialogo={setDialogo} onRespuesta={respuesta => setProgreso(p => registrar(p, [respuesta]))} onFinalizar={(respuestas, completa) => setProgreso(p => {
        const next = sesion.modo === 'examen' ? registrar(p, respuestas) : p;
        return sesion.leccionId && completa ? { ...next, lecciones: [...new Set([...next.lecciones, sesion.leccionId])] } : next;
      })} /> : vista === 'inicio' ? <>
        <div className="practice-intro">
          <div className="practice-readiness" role="progressbar" aria-label="Preparación del examen" aria-valuemin={0} aria-valuemax={100} aria-valuenow={preparacion} aria-valuetext={`${acertadas} de ${preguntas.length} preguntas acertadas en el último intento; ${pendientes} pendientes`}>
            <div className="practice-readiness-ring">
              <svg viewBox="0 0 100 100" aria-hidden="true"><circle className="practice-readiness-track" cx="50" cy="50" r="43" /><circle className="practice-readiness-fill" cx="50" cy="50" r="43" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - preparacion} /></svg>
              <strong aria-hidden="true">{preparacion}<span>%</span></strong>
            </div>
            <span className="practice-readiness-label" aria-hidden="true">PREPARACIÓN</span>
          </div>
          <div className="practice-intro-copy"><span className="practice-eyebrow">UN POCO CADA DÍA</span><h1 className="practice-title" tabIndex={-1}>Más cerca de<br />tu nacionalidad.</h1></div>
        </div>
        <div className="practice-overview"><span><strong>{vistas}</strong> de 300 preguntas practicadas</span><span className="practice-edition">CCSE 2026</span></div>
        <button className="practice-route-card" onClick={() => setVista('ruta')}>
          <span className="practice-route-copy"><span className="practice-card-label">APRENDE DESDE CERO</span><strong>Ruta de<br />aprendizaje</strong><span>Un tema a la vez.<br />Cada paso cuenta.</span><span className="practice-route-cta">{progreso.lecciones.length ? 'Continuar mi ruta' : 'Empezar mi ruta'}<Simbolo nombre="flecha" /></span></span>
          <span className="practice-mini-route" aria-hidden="true"><svg viewBox="0 0 120 190"><path d="M65 160C-10 140 110 125 55 90S10 45 65 28" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 7" /><circle cx="65" cy="160" r="23" /><path d="m55 160 7 7 13-15" fill="none" stroke="white" strokeWidth="3" /><circle cx="55" cy="90" r="20" /><circle cx="65" cy="28" r="17" /><path d="m65 17 3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1Z" fill="white" /></svg></span>
          <span className="practice-route-footer"><span>{seccionesCompletas} / 20 secciones completadas</span><progress value={seccionesCompletas} max={20} aria-label="Secciones completadas" /></span>
        </button>
        <h2 className="practice-small-heading">Encuentra tu forma de repasar</h2>
        <div className="practice-mode-grid">
          <button className="practice-mode-card" onClick={() => setVista('tematicas')}><span className="practice-icon-box"><Simbolo nombre="temas" /></span><strong>Repaso por<br />temáticas</strong><span>Elige qué quieres<br />reforzar hoy.</span><small>20 temáticas<Simbolo nombre="flecha" /></small></button>
          <button className="practice-mode-card practice-mode-smart" onClick={() => setVista('inteligente')}><span className="practice-icon-box"><Simbolo nombre="inteligente" /></span><strong>Repaso<br />inteligente</strong><span>Justo lo que necesitas<br />volver a practicar.</span><small>5 minutos<Simbolo nombre="flecha" /></small></button>
        </div>
        <button className="practice-exam-card" onClick={() => setVista('examen')}><span className="practice-icon-box"><Simbolo nombre="examen" /></span><span><strong>Simulacro de examen</strong><small>El último ensayo antes del gran día.</small><span className="practice-duration"><Simbolo nombre="reloj" />Reserva 30 minutos</span></span><Simbolo nombre="flecha" /></button>
        <p className="practice-storage-note">{guardado ? 'Tu progreso se guarda en este dispositivo.' : 'Tu progreso se conserva mientras esta página siga abierta.'}</p>
      </> : <>
        <button className="practice-back" onClick={() => setVista(vista === 'secciones' ? 'ruta' : 'inicio')}><span aria-hidden="true">←</span> {vista === 'secciones' ? 'Mi ruta' : 'Práctica'}</button>
        {vista === 'ruta' && <>
          <p className="practice-eyebrow">PASO A PASO, A TU RITMO</p><h1 className="practice-title" tabIndex={-1}>Tu ruta de aprendizaje.</h1>
          <button className="practice-explore-sections" onClick={() => setVista('secciones')}><Simbolo nombre="temas" /><span>Explorar secciones</span><small>{tematicas.length}</small><Simbolo nombre="flecha" /></button>
          <section className="practice-section-banner">
            <div className="practice-section-art"><IconoTematica id={tematica.id} /></div>
            <span>SECCIÓN {seccion + 1} DE {tematicas.length}</span><h2>{tematica.nombre}</h2><p>{lecciones.length - 1} {lecciones.length === 2 ? 'tema' : 'temas'} + repaso final · {tematica.totalPreguntas} preguntas</p>
            <div className="practice-section-progress"><progress value={completadas} max={lecciones.length} aria-label="Pasos completados de esta sección" /><small>{completadas === lecciones.length ? '¡Sección completada!' : `${completadas} de ${lecciones.length} pasos completados`}</small></div>
          </section>
          <ol className="practice-learning-path" aria-label={`Temas de ${tematica.nombre}`}>{lecciones.map((leccion, i) => {
            const hecha = progreso.lecciones.includes(leccion.id);
            const actual = leccion.id === siguiente?.id;
            return <li key={leccion.id} className={`${hecha ? 'is-complete' : ''} ${actual ? 'is-current' : ''} ${leccion.final ? 'is-final' : ''}`}>
              {actual && <span className="practice-node-hint">{completadas ? 'SIGUE AQUÍ' : 'EMPIEZA AQUÍ'}</span>}
              <button className="practice-path-node" aria-label={`${leccion.final ? '' : `Tema ${i + 1}: `}${leccion.nombre}${hecha ? ', completado' : ''}`} onClick={() => empezarLeccion(leccion)}><Simbolo nombre={hecha ? 'check' : leccion.final ? 'trofeo' : actual ? 'estrella' : 'libro'} /></button>
              <span className="practice-path-title">{leccion.nombre}</span><small>{leccion.final ? 'Todos los temas · ' : ''}{leccion.preguntas.length} preguntas{hecha ? ' · Completado' : ''}</small>
              {i < lecciones.length - 1 && <svg className="practice-path-connector" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0C0 30 100 30 100 60" /></svg>}
            </li>;
          })}</ol>
          {seccion < tematicas.length - 1 && <button className="practice-next-section" onClick={() => setSeccion(s => s + 1)}><IconoTematica id={tematicas[seccion + 1].id} /><span><small>SIGUIENTE SECCIÓN</small><strong>{tematicas[seccion + 1].nombre}</strong></span><Simbolo nombre="flecha" /></button>}
          <p className="quiet-note">Puedes explorar cualquier sección y repetir los temas cuando quieras.</p>
        </>}
        {(vista === 'tematicas' || vista === 'secciones') && <>
          <p className="practice-eyebrow">{vista === 'secciones' ? 'UN MUNDO POR DESCUBRIR' : 'TÚ ELIGES EL FOCO'}</p><h1 className="practice-title" tabIndex={-1}>{vista === 'secciones' ? 'Cada sección, un nuevo paso.' : '¿Qué repasamos hoy?'}</h1><p className="practice-lead">{vista === 'secciones' ? 'Explora las temáticas y avanza a tu ritmo. Cada una tiene sus temas y un repaso final.' : 'Elige una temática. Sus preguntas aparecerán en un orden diferente cada vez.'}</p>
          <div className="practice-topics-grid">{tematicas.map((t, i) => {
            const ruta = vista === 'secciones';
            const pasos = leccionesDe(t);
            const hechas = ruta ? pasos.filter(l => progreso.lecciones.includes(l.id)).length : t.preguntas.filter(p => progreso.preguntas[p.id]).length;
            const total = ruta ? pasos.length : t.totalPreguntas;
            const estado = hechas === total ? (ruta ? 'Completada' : 'Todas practicadas') : hechas ? `${hechas} / ${total} ${ruta ? 'pasos' : 'practicadas'}` : 'Por descubrir';
            return <button className={`practice-topic-card${ruta && seccion === i ? ' is-selected' : ''}`} key={t.id} data-topic-id={t.id} aria-current={ruta && seccion === i ? 'step' : undefined} onClick={() => {
              if (ruta) { setSeccion(i); setVista('ruta'); }
              else empezar({ modo: 'tematica', titulo: t.nombre, detalle: 'Repaso por temáticas', preguntas: barajar(t.preguntas) });
            }}>
              <span className="practice-topic-art"><span className="practice-topic-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><IconoTematica id={t.id} />{hechas === total && <span className="practice-topic-complete"><Simbolo nombre="check" /></span>}</span>
              <strong>{t.nombre}</strong><span>{ruta ? `${pasos.length - 1} ${pasos.length === 2 ? 'tema' : 'temas'} + repaso final` : `${t.totalPreguntas} preguntas`}</span>
              <progress value={hechas} max={total} aria-label={`${hechas} de ${total} ${ruta ? 'pasos completados' : 'preguntas practicadas'} de ${t.nombre}`} /><small>{estado}<Simbolo nombre="flecha" /></small>
            </button>;
          })}</div>
        </>}
        {vista === 'inteligente' && <>
          <div className="practice-mode-intro practice-smart-intro"><span className="practice-large-icon"><Simbolo nombre="inteligente" /></span><p className="practice-eyebrow">UN RATITO QUE CUENTA</p><h1 className="practice-title" tabIndex={-1}>Cinco minutos.<br />Justo lo que necesitas.</h1><p className="practice-lead">El algoritmo te preguntará aquello que necesites repasar más.</p></div>
          <div className="practice-session-plan"><span><Simbolo nombre="reloj" /><strong>5 minutos de estudio</strong></span><span><Simbolo nombre="libro" /><strong>Hasta 10 preguntas para ti</strong></span></div>
          <div className="practice-smart-info"><h2>{vistas ? 'Tu repaso se adapta a ti.' : 'Empezamos por conocerte.'}</h2><p>{vistas ? `${reforzar ? `Tienes ${reforzar} preguntas que conviene repasar. ` : ''}Primero recuperamos errores y preguntas pendientes de repaso; después incorporamos preguntas nuevas.` : 'Tu primera sesión mezcla preguntas del temario. Con tus respuestas, los siguientes repasos se ajustarán a lo que más te cueste.'}</p><span>Cuanto más practicas, mejor elegimos.</span></div>
          <button className="primary-button practice-start" onClick={() => empezar({ modo: 'inteligente', titulo: 'Tu repaso inteligente', detalle: 'Cinco minutos para avanzar', preguntas: crearRepaso(progreso), minutos: MINUTOS_REPASO })}>Empezar mis 5 minutos<Simbolo nombre="flecha" /></button>
        </>}
        {vista === 'examen' && <>
          <div className="practice-mode-intro"><span className="practice-large-icon practice-exam-icon"><Simbolo nombre="examen" /></span><p className="practice-eyebrow">PONTE A PRUEBA</p><h1 className="practice-title" tabIndex={-1}>Tu ensayo para<br />el gran día.</h1><p className="practice-lead">Un simulacro completo con preguntas de las cinco tareas del examen.</p></div>
          <div className="practice-time-warning"><Simbolo nombre="reloj" /><div><strong>Reserva 30 minutos</strong><p>Busca un momento tranquilo. El tiempo empieza cuando pulses comenzar.</p></div></div>
          <div className="practice-exam-facts"><div><strong>25</strong><span>preguntas</span></div><div><strong>5</strong><span>tareas oficiales</span></div><div><strong>{ACIERTOS_APTO}</strong><span>aciertos para aprobar</span></div></div>
          <p className="practice-exam-motivation">¡Si apruebas, estás listo para presentarte!</p>
          <button className="primary-button practice-start" onClick={() => empezar({ modo: 'examen', titulo: 'Simulacro de examen', detalle: 'CCSE 2026 · Todo el temario', preguntas: crearSimulacro(), minutos: MINUTOS_SIMULACRO })}>Comenzar simulacro<Simbolo nombre="flecha" /></button>
          <p className="quiet-note">Se seleccionan preguntas del banco completo de {preguntas.length}. La corrección aparece al terminar. Este entrenamiento dura 30 minutos; la <a href="https://examenes.cervantes.es/es/ccse/como" target="_blank" rel="noreferrer">prueba oficial</a> permite 45.</p>
        </>}
      </>}
    </div>
  </DemoScene>;
}
