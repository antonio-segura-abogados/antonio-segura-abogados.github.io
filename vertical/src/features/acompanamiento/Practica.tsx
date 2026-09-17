import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/acompanamiento.json';
import { DemoScene, type GuideStep } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';

const questions = data.practica.preguntas;
const guide: GuideStep[] = [
  { title: 'Una sesión breve', text: 'Cinco preguntas propias sobre contenidos del manual CCSE 2026. Elige una respuesta y compruébala.', target: 'pregunta' },
  { title: 'Entender la respuesta', text: 'Cada corrección tiene una explicación y referencia. Los puntos se suman una sola vez por pregunta.' },
  { title: 'Repasar lo que cuesta', text: 'Al terminar puedes repetir los errores. El resultado corresponde a esta práctica; no predice una nota oficial.' },
];

export function PracticaScene() {
  const [queue, setQueue] = useState(questions.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<{ question: number; correct: boolean }[]>([]);
  const [review, setReview] = useState(false);
  const finished = index >= queue.length;
  const question = questions[queue[index]];
  const correct = answers.filter(a => a.correct).length;
  function start(ids = questions.map((_, i) => i), isReview = false) { setQueue(ids); setIndex(0); setChoice(null); setChecked(false); setAnswers([]); setReview(isReview); }
  return <DemoScene title="Práctica del examen" label="Practicar, entender, repasar" guide={guide} navigation activeSection="practice" onReset={() => start()} note={data.practica.nota}>{highlight => <>
    <div className="greeting"><p>{review ? 'Repaso de tus errores.' : 'Un poco cada día.'}</p><h1>{finished ? 'Sesión completada.' : 'Hoy también avanzas.'}</h1></div>
    <div className="practice-stats"><span><b>{answers.length}</b> / {queue.length} preguntas</span><span><b>{correct * 10}</b> puntos</span></div>
    <div className="practice-progress"><span style={{ width: `${answers.length / queue.length * 100}%` }} /></div>
    {!finished ? <section className={`quiz-card ${highlight === 'pregunta' ? 'is-highlighted' : ''}`}><p className="product-kicker">PREGUNTA {index + 1} DE {queue.length}</p><h2>{question.enunciado}</h2><div className="quiz-options">{question.opciones.map((option, i) => <button key={option} disabled={checked} aria-pressed={choice === i} className={`${choice === i ? 'selected' : ''} ${checked && i === question.correcta ? 'correct' : ''} ${checked && choice === i && i !== question.correcta ? 'incorrect' : ''}`} onClick={() => setChoice(i)}><span>{String.fromCharCode(65 + i)}</span>{option}{checked && i === question.correcta && <Icon name="check" />}</button>)}</div>
      {checked && <div className={`quiz-explanation ${choice === question.correcta ? 'is-correct' : ''}`} role="status"><strong>{choice === question.correcta ? '¡Correcto! +10 puntos' : 'Esta merece un repaso.'}</strong><p>{question.explicacion}</p><a href={`${data.practica.fuente}#page=${question.pagina}`} target="_blank" rel="noreferrer">Manual CCSE 2026 · p. {question.pagina} ↗</a></div>}
      {!checked ? <button className="primary-button" disabled={choice === null} onClick={() => { setChecked(true); setAnswers(a => [...a, { question: queue[index], correct: choice === question.correcta }]); }}>Comprobar respuesta<Icon name="arrow" /></button> : <button className="primary-button" onClick={() => { setIndex(i => i + 1); setChoice(null); setChecked(false); }}>{index === queue.length - 1 ? 'Ver mi resultado' : 'Siguiente pregunta'}<Icon name="arrow" /></button>}
    </section> : <div className="quiz-result"><div className="score-circle"><strong>{correct}<small>/{queue.length}</small></strong><span>aciertos</span></div><h2>{correct === queue.length ? '¡Buen trabajo!' : 'Ya sabes qué repasar.'}</h2><p>{correct * 10} puntos en esta ronda de práctica.</p>{answers.some(a => !a.correct) && <button className="primary-button" onClick={() => start(answers.filter(a => !a.correct).map(a => a.question), true)}>Repasar errores<Icon name="arrow" /></button>}<button className="text-button" onClick={() => start()}>Empezar otra sesión</button></div>}
    <p className="quiet-note">Práctica propia basada en el <a href={data.practica.fuente} target="_blank" rel="noreferrer">manual oficial CCSE 2026</a>.</p>
  </>}</DemoScene>;
}
