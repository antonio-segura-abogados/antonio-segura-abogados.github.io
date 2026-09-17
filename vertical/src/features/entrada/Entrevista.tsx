import { useState } from 'react';
import { useSearchParams } from 'react-router';
import data from '../../../../recursos-compartidos/demo/entrada.json';
import { DemoScene, type GuideStep } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';

const guide: GuideStep[] = [
  { title: 'Un objetivo, primero', text: 'La conversación empieza por lo que la persona quiere conseguir. Puedes cambiar el objetivo del ejemplo.', target: 'objetivo' },
  { title: 'Preguntas que se adaptan', text: 'Selecciona una respuesta o marca «No lo sé». La fecha de llegada se distingue del inicio de la residencia legal.', target: 'pregunta' },
  { title: 'Contexto para el abogado', text: 'Al terminar, el resumen reúne las respuestas y señala lo que falta revisar. Puedes corregirlas sin empezar de cero.', target: 'pregunta' },
];
const prettyDate = (s: string) => s ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${s}T12:00:00Z`)) : 'No lo sé';

export function EntrevistaScene() {
  const [params] = useSearchParams();
  const [welcome, setWelcome] = useState(params.get('vista') === 'objetivo');
  const [goal, setGoal] = useState(data.objetivos[0]);
  const [step, setStep] = useState(0);
  const [origin, setOrigin] = useState(data.perfil.origen);
  const [legalDate, setLegalDate] = useState(data.perfil.residenciaLegal);
  const [unknown, setUnknown] = useState(false);
  const [family, setFamily] = useState(data.perfil.vinculo);
  function reset() { setWelcome(params.get('vista') === 'objetivo'); setGoal(data.objetivos[0]); setStep(0); setOrigin(data.perfil.origen); setLegalDate(data.perfil.residenciaLegal); setUnknown(false); setFamily(data.perfil.vinculo); }
  const summary = step === 3;
  return <DemoScene title="Primera entrevista" label="Empecemos por ti" guide={guide} onReset={reset} note={data.nota}>{highlight => welcome ? <div className="welcome-screen">
    <div className="welcome-mark" aria-hidden="true"><Icon name="home" /><span /></div>
    <p className="product-kicker">TU VIDA EN ESPAÑA</p><h1>Un objetivo.<br /><em>Un camino.</em></h1>
    <p>Te acompañamos desde la primera pregunta hasta el siguiente paso.</p>
    <fieldset className="goal-list"><legend>¿Qué quieres conseguir?</legend>{data.objetivos.map((item, i) => <label key={item} className={goal === item ? 'selected' : ''}><input type="radio" name="goal" value={item} checked={goal === item} onChange={() => setGoal(item)} /><span>{String(i + 1).padStart(2, '0')}</span><strong>{item}</strong></label>)}</fieldset>
    <button className="primary-button" onClick={() => { setWelcome(false); setStep(0); }}>Comenzar mi entrevista<Icon name="arrow" /></button>
    <p className="quiet-note">A tu ritmo. Con el equipo de AS detrás.</p>
  </div> : <div className="interview-screen">
    <div className="greeting"><p>Hola, Lucía.</p><h1>Cuéntanos tu objetivo.</h1></div>
    <div className={`goal-answer ${highlight === 'objetivo' ? 'is-highlighted' : ''}`}><span>{goal}</span><button onClick={() => setWelcome(true)}>Cambiar</button></div>
    <div className="conversation-intro"><span className="support-initials">AS</span><p>Vamos a preparar tu caso con unas preguntas sencillas.</p></div>
    <div className="interview-progress"><span>{summary ? 'Resumen preparado' : `Pregunta ${step + 1} de 3`}</span><div>{[0, 1, 2].map(i => <i key={i} className={i <= step ? 'filled' : ''} />)}</div></div>
    <section className={`question-block ${highlight === 'pregunta' ? 'is-highlighted' : ''}`}>
      {step === 0 && <><h2>¿Cuál es tu nacionalidad de origen?</h2><label className="field-label" htmlFor="origen">País del ejemplo</label><select id="origen" value={origin} onChange={e => setOrigin(e.target.value)}><option>Colombia</option><option>Argentina</option><option>Otro país</option></select><p>Este dato ayuda al equipo a valorar el supuesto que corresponde.</p></>}
      {step === 1 && <><h2>¿Desde cuándo tienes residencia legal?</h2><p>Llegar a España y comenzar la residencia legal pueden ser fechas distintas.</p><label className="field-label" htmlFor="residencia">Fecha de inicio</label><input id="residencia" type="date" value={legalDate} max={data.fechaReferencia} disabled={unknown} onChange={e => setLegalDate(e.target.value)} /><label className="check-label"><input type="checkbox" checked={unknown} onChange={e => setUnknown(e.target.checked)} />No lo sé; necesito revisarlo</label></>}
      {step === 2 && <><h2>¿Estás casada con una persona española?</h2><div className="answer-buttons">{['Sí', 'No', 'No lo sé'].map(item => <button key={item} className={family === item ? 'selected' : ''} aria-pressed={family === item} onClick={() => setFamily(item)}>{item}</button>)}</div><p>Si existe ese vínculo, el equipo pedirá después las fechas y los detalles necesarios.</p></>}
      {summary && <><span className="status-label"><Icon name="check" />Listo para revisar</span><h2>Tu situación, ordenada.</h2><dl className="answer-summary"><dt>Objetivo</dt><dd>{goal}</dd><dt>Origen</dt><dd>{origin}</dd><dt>Residencia legal</dt><dd>{unknown ? 'Pendiente de confirmar' : prettyDate(legalDate)}</dd><dt>Vínculo matrimonial</dt><dd>{family}</dd></dl><p className="review-callout">{unknown || family === 'No lo sé' ? 'Hay datos pendientes. El abogado sabría qué necesita aclarar.' : 'El abogado revisaría las respuestas antes de valorar una vía.'}</p></>}
    </section>
    {!summary ? <button className="primary-button" disabled={step === 1 && !unknown && !legalDate} onClick={() => setStep(step + 1)}>{step === 2 ? 'Ver mi resumen' : 'Continuar'}<Icon name="arrow" /></button> : <button className="primary-button" onClick={() => setStep(0)}>Editar mis respuestas<Icon name="arrow" /></button>}
    {step > 0 && !summary && <button className="text-button" onClick={() => setStep(step - 1)}>Volver a la pregunta anterior</button>}
    <p className="quiet-note">Tus respuestas preparan la revisión del equipo.</p>
  </div>}</DemoScene>;
}
