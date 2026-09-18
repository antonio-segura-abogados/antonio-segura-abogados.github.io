import { useEffect, useRef, useState } from 'react';
import { DemoScene } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';
import { SearchSelect } from './SearchSelect';
import { answerError, answerLabel, getQuestions, goals, isAnswered, reviewNotes, toggleMultiple, updateAnswer, type Answers, type Goal, type Question } from './cuestionario';

function QuestionInput({ question, value, today, onChange }: { question: Question; value: string; today: string; onChange: (value: string) => void }) {
  if (question.type === 'choice' || question.type === 'multi') return <fieldset className="interview-choices" aria-labelledby="interview-question">
    {question.options!.map(option => <label key={option.value} className={value.split(',').includes(option.value) ? 'selected' : ''}>
      <input type={question.type === 'multi' ? 'checkbox' : 'radio'} name={question.id} value={option.value} checked={value.split(',').includes(option.value)} onChange={() => onChange(question.type === 'multi' ? toggleMultiple(value, option.value) : option.value)} />
      <span>{option.label}</span>
    </label>)}
  </fieldset>;
  return <>
    {question.type === 'select' ? <SearchSelect options={question.options!} value={value} onChange={onChange} multiple={question.multiple} placeholder={question.placeholder!} label={question.summary} /> : <>
      <label className="field-label" htmlFor={question.id}>{question.type === 'date' ? 'Fecha, si la conoces' : 'Tu respuesta'}</label>
      {question.type === 'text' ? <textarea id={question.id} aria-labelledby="interview-question" aria-describedby="interview-help" value={value === 'unknown' ? '' : value} disabled={value === 'unknown'} maxLength={500} rows={3} placeholder={question.placeholder} onChange={event => onChange(event.target.value)} /> :
        <input id={question.id} type="date" aria-labelledby="interview-question" aria-describedby="interview-help interview-error" value={value === 'unknown' ? '' : value} disabled={value === 'unknown'} min="1900-01-01" max={question.past ? today : undefined} autoComplete="off" onChange={event => onChange(event.target.value)} />}
    </>}
    <label className="check-label"><input type="checkbox" checked={value === 'unknown'} onChange={event => onChange(event.target.checked ? 'unknown' : '')} />No lo sé; necesito revisarlo</label>
  </>;
}

export function EntrevistaScene() {
  const [welcome, setWelcome] = useState(true);
  const [goal, setGoal] = useState<Goal>('nacionalidad');
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [summary, setSummary] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftValue, setDraftValue] = useState('');
  const [sent, setSent] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const today = new Intl.DateTimeFormat('en-CA').format(new Date());
  const questions = getQuestions(goal, answers);
  const question = questions[step];
  const goalLabel = goals.find(item => item.id === goal)!.label;
  const missing = questions.filter(item => !isAnswered(item, answers[item.id], today, answers)).length;
  const currentValue = editing ? draftValue : answers[question?.id] || '';
  const currentError = question ? answerError(question, currentValue, today, answers) : undefined;
  function reset() { setWelcome(true); setGoal('nacionalidad'); setAnswers({}); setStep(0); setSummary(false); setEditing(false); setSent(false); }
  useEffect(() => {
    if (!welcome) heading.current?.focus({ preventScroll: true });
    const scroller = screen.current?.closest('.device-scroll');
    if (scroller) scroller.scrollTop = 0;
    if (window.matchMedia('(max-width: 520px)').matches) screen.current?.scrollIntoView({ block: 'start' });
  }, [welcome, summary, step, sent]);
  function edit(index: number) { setDraftValue(answers[questions[index].id] || ''); setStep(index); setSummary(false); setEditing(true); setSent(false); }
  function next() {
    if (!question || !isAnswered(question, currentValue, today, answers)) return;
    if (editing) { setAnswers(current => updateAnswer(goal, current, question.id, draftValue)); setSummary(true); setEditing(false); return; }
    if (step === questions.length - 1) setSummary(true); else setStep(step + 1);
  }
  return <DemoScene title="Primera entrevista" label="Empecemos por ti" showHeader={false} onReset={reset} note="Entrevista de demostración. Usa datos ficticios; las respuestas se pierden al recargar.">
    {welcome ? <div className="welcome-screen" ref={screen}>
      <div className="welcome-mark" aria-hidden="true"><Icon name="home" /><span /></div>
      <p className="product-kicker">TU VIDA EN ESPAÑA</p><h1>Un objetivo.<br /><em>Un camino.</em></h1>
      <p>Primero, entendamos dónde estás y qué necesitas.</p>
      <fieldset className="goal-list"><legend>¿Qué quieres conseguir?</legend>{goals.map((item, i) => <label key={item.id} className={goal === item.id ? 'selected' : ''}><input type="radio" name="goal" value={item.id} checked={goal === item.id} onChange={() => { setGoal(item.id); setAnswers({}); setStep(0); setSummary(false); setEditing(false); setSent(false); }} /><span>{String(i + 1).padStart(2, '0')}</span><strong>{item.label}</strong></label>)}</fieldset>
      <button className="primary-button" onClick={() => { setWelcome(false); setStep(0); setSummary(false); setEditing(false); setSent(false); }}>Comenzar mi entrevista<Icon name="arrow" /></button>
      <p className="quiet-note">A tu ritmo. Puedes dejar una respuesta pendiente.</p>
    </div> : <div className="interview-screen" ref={screen}>
      <div className="greeting"><p>Vamos a conocerte.</p><h1>Tu punto de partida.</h1></div>
      <div className="goal-answer"><span>{goalLabel}</span><button onClick={() => setWelcome(true)}>Cambiar</button></div>
      {sent ? <section className="question-block interview-sent">
        <span className="status-label"><Icon name="check" />Confirmación de demostración</span>
        <h2 ref={heading} tabIndex={-1}>Entrevista confirmada.</h2>
        <p>En la aplicación, este paso enviaría tus respuestas al equipo para revisar el caso.</p>
        <p className="quiet-note">Esta demo no envía ni guarda datos personales.</p>
        <button className="secondary-button" onClick={() => { setSent(false); setSummary(true); }}>Volver al resumen</button>
      </section> : summary ? <section className="question-block interview-summary">
        <span className="status-label"><Icon name="check" />{missing ? 'Revisa las respuestas pendientes' : 'Entrevista preparada'}</span>
        <h2 ref={heading} tabIndex={-1}>Tu situación, ordenada.</h2>
        <p>Estas son tus respuestas. El equipo revisaría el caso antes de proponerte un trámite.</p>
        <dl className="answer-summary">{questions.map((item, index) => <div key={item.id}><dt>{item.summary}<button aria-label={`${answers[item.id] ? 'Editar' : 'Responder'}: ${item.summary}`} onClick={() => edit(index)}>{answers[item.id] ? 'Editar' : 'Responder'}</button></dt><dd>{answerLabel(item, answers[item.id])}</dd>{answerError(item, answers[item.id], today, answers) && <dd className="interview-error">{answerError(item, answers[item.id], today, answers)}</dd>}</div>)}</dl>
        <h3>Qué necesita revisar el equipo</h3>
        <ul className="interview-review">{reviewNotes(goal, answers).map(note => <li key={note}>{note}</li>)}</ul>
        {missing > 0 && <p role="status">{missing === 1 ? 'Hay una respuesta pendiente de completar o corregir.' : `Hay ${missing} respuestas pendientes de completar o corregir.`} Puedes hacerlo desde el resumen.</p>}
        <div className="interview-actions">
          <button className="secondary-button" onClick={() => edit(0)}>Editar mis respuestas</button>
          <button className="primary-button" disabled={missing > 0} onClick={() => setSent(true)}>Confirmar y enviar<Icon name="arrow" /></button>
        </div>
      </section> : <form onSubmit={event => { event.preventDefault(); next(); }}>
        <div className="interview-progress"><span>Pregunta {step + 1}</span><span>{question.section}</span></div>
        <section className="question-block" key={question.id} data-question={question.id}>
          <h2 id="interview-question" ref={heading} tabIndex={-1}>{question.title}</h2>
          <p id="interview-help">{question.help}</p>
          <QuestionInput question={question} value={currentValue} today={today} onChange={value => editing ? setDraftValue(value) : setAnswers(current => updateAnswer(goal, current, question.id, value))} />
          <p id="interview-error" className="interview-error" role="status">{currentError}</p>
        </section>
        <button type="submit" className="primary-button" disabled={!isAnswered(question, currentValue, today, answers)}>{editing ? 'Volver al resumen' : step === questions.length - 1 ? 'Ver mi resumen' : 'Continuar'}<Icon name="arrow" /></button>
        {editing && <button type="button" className="text-button" onClick={() => { setEditing(false); setSummary(true); }}>Cancelar edición</button>}
        {!editing && step > 0 && <button type="button" className="text-button" onClick={() => setStep(step - 1)}>Volver a la pregunta anterior</button>}
        <p className="quiet-note">{editing ? 'Se conservarán las respuestas que sigan siendo válidas.' : 'Las siguientes preguntas se adaptan a tus respuestas.'}</p>
      </form>}
    </div>}
  </DemoScene>;
}
