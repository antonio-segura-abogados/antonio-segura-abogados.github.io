import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/acompanamiento.json';
import { DemoScene, type GuideStep } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';

const guide: GuideStep[] = [
  { title: 'El contexto viaja con la consulta', text: 'Mensajes, documentos y cita comparten el expediente. Añade un mensaje de ejemplo sin enviar nada al despacho.', target: 'consulta' },
  { title: 'Reservar y hablar', text: 'Elige una cita ficticia y entra en una sala visual. Sus controles simulan una llamada, sin acceder a tu cámara o micrófono.' },
  { title: 'Continuar con instrucciones', text: 'Al terminar la llamada de ejemplo, un resumen recoge los siguientes pasos. El equipo revisaría el contenido antes de compartirlo.' },
];

export function ConsultasScene({ sala = false }: { sala?: boolean }) {
  const [tab, setTab] = useState<'mensajes' | 'cita' | 'resumen'>(sala ? 'cita' : 'mensajes');
  const [messages, setMessages] = useState(data.consulta.mensajes);
  const [draft, setDraft] = useState('');
  const [slot, setSlot] = useState(data.consulta.citas[0]);
  const [reserved, setReserved] = useState(sala);
  const [inCall, setInCall] = useState(sala);
  const [ended, setEnded] = useState(false);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  function reset() { setTab(sala ? 'cita' : 'mensajes'); setMessages(data.consulta.mensajes); setDraft(''); setSlot(data.consulta.citas[0]); setReserved(sala); setInCall(sala); setEnded(false); setMic(true); setCamera(true); }
  return <DemoScene title="Consultas con tu equipo" label="Conversar con contexto" guide={guide} navigation activeSection="consultations" onReset={reset} note="Mensajes, citas y videollamada simulados. No se envía información ni se accede a cámara o micrófono.">{highlight => <>
    <div className="greeting"><p>Tu equipo, al otro lado.</p><h1>Hablemos de tu caso.</h1></div>
    <div className="consultation-context"><span>EXPEDIENTE DE LUCÍA</span><strong>Revisión de documentos</strong><small>Copia recibida · revisión pendiente</small></div>
    <div className="filter-row consultation-tabs" aria-label="Tipo de consulta">{([['mensajes', 'Mensajes'], ['cita', 'Videollamada'], ['resumen', 'Resumen']] as const).map(([value, label]) => <button key={value} aria-pressed={tab === value} className={tab === value ? 'selected' : ''} onClick={() => setTab(value)}>{label}</button>)}</div>
    <section className={highlight === 'consulta' ? 'is-highlighted' : ''}>
      {tab === 'mensajes' && <><div className="message-list" aria-live="polite">{messages.map((m, i) => <article key={i} className={m.autor === 'Lucía' ? 'message-client' : 'message-team'}><span>{m.autor} · {m.hora}</span><p>{m.texto}</p></article>)}</div><form className="message-compose" onSubmit={e => { e.preventDefault(); if (!draft.trim()) return; setMessages(m => [...m, { autor: 'Lucía', texto: draft.trim(), hora: 'Ahora · ejemplo' }]); setDraft(''); }}><label className="field-label" htmlFor="mensaje">Escribe un mensaje de ejemplo</label><textarea id="mensaje" maxLength={500} value={draft} onChange={e => setDraft(e.target.value)} rows={2} placeholder="¿Qué te gustaría consultar?" /><button className="primary-button" disabled={!draft.trim()} type="submit">Añadir al ejemplo<Icon name="arrow" /></button></form></>}
      {tab === 'cita' && (inCall ? <><div className="video-room"><div className="video-room-label"><i />Sala de demostración</div><div className="lawyer-illustration"><span>AS</span><i /><b /></div><div className="video-name"><strong>Tu equipo jurídico</strong><span>Revisión del expediente</span></div><div className="video-self"><span>{camera ? 'L' : '—'}</span><small>{camera ? 'Lucía' : 'Cámara apagada'}</small></div></div><div className="video-controls"><button aria-pressed={mic} onClick={() => setMic(v => !v)}><span aria-hidden="true">{mic ? '◉' : '○'}</span>{mic ? 'Silenciar' : 'Activar audio'}</button><button aria-pressed={camera} onClick={() => setCamera(v => !v)}><span aria-hidden="true">▣</span>{camera ? 'Apagar cámara' : 'Activar cámara'}</button><button className="end-call" onClick={() => { setInCall(false); setEnded(true); setTab('resumen'); }}><span aria-hidden="true">↘</span>Terminar</button></div><p className="quiet-note">Controles visuales de ejemplo. Sin conexión de vídeo.</p></> : <><h2 className="compact-title">Elige un momento.</h2><p className="screen-lead">Agenda ficticia para una consulta sobre tu documentación.</p><div className="appointment-list">{data.consulta.citas.map(t => <button key={t} disabled={reserved} aria-pressed={slot === t} className={slot === t ? 'selected' : ''} onClick={() => setSlot(t)}>{t}<Icon name="check" /></button>)}</div>{reserved ? <><p className="review-callout" role="status">Cita de ejemplo reservada: {slot}.</p><button className="primary-button" onClick={() => { setInCall(true); setEnded(false); }}>Entrar en la sala de ejemplo<Icon name="arrow" /></button><button className="text-button" onClick={() => setReserved(false)}>Cambiar cita de ejemplo</button></> : <button className="primary-button" onClick={() => setReserved(true)}>Reservar cita de ejemplo<Icon name="arrow" /></button>}</>)}
      {tab === 'resumen' && <div className="consultation-summary"><span className="status-label">{ended ? 'Llamada de ejemplo terminada' : 'Resumen de ejemplo'}</span><h2 className="compact-title">Lo que viene ahora.</h2><ol className="instruction-list">{data.consulta.resumen.map(t => <li key={t}>{t}</li>)}</ol><p className="review-callout">El equipo revisaría este resumen antes de incorporarlo al expediente.</p></div>}
    </section>
  </>}</DemoScene>;
}
