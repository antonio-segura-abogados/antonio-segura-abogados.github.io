import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/acompanamiento.json';
import { DemoScene } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';


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
  return <DemoScene title="Consultas con tu equipo" showHeader={false} immersive={inCall} navigation activeSection="consultations" onReset={reset} note="Mensajes, citas y videollamada simulados. No se envía información ni se accede a cámara o micrófono.">{inCall ? <div className="video-room"><div className="video-room-label"><i />Sala de demostración</div><div className="lawyer-illustration"><span>AS</span><i /><b /></div><div className="video-name"><strong>Tu equipo jurídico</strong><span>Revisión del expediente</span></div><div className="video-self"><span>{camera ? 'L' : '—'}</span><small>{camera ? 'Lucía' : 'Cámara apagada'}</small></div><div className="video-controls"><button aria-pressed={mic} onClick={() => setMic(v => !v)}><span aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" />{!mic && <path d="m3 3 18 18" />}</svg></span>{mic ? 'Silenciar' : 'Activar audio'}</button><button aria-pressed={camera} onClick={() => setCamera(v => !v)}><span aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="14" height="14" rx="3" /><path d="m16 10 6-4v12l-6-4" />{!camera && <path d="m2 2 20 20" />}</svg></span>{camera ? 'Apagar cámara' : 'Activar cámara'}</button><button className="end-call" onClick={() => { setInCall(false); setEnded(true); setTab('resumen'); }}><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 15v-4c5-5 13-5 18 0v4l-5-1v-3a13 13 0 0 0-8 0v3z" /></svg></span>Terminar</button></div></div> : <>
    <div className="greeting"><p>Tu equipo, al otro lado.</p><h1>Hablemos de tu caso.</h1></div>
    <div className="consultation-context"><span>EXPEDIENTE DE LUCÍA</span><strong>Revisión de documentos</strong><small>Copia recibida · revisión pendiente</small></div>
    <div className="filter-row consultation-tabs" aria-label="Tipo de consulta">{([['mensajes', 'Mensajes'], ['cita', 'Videollamada'], ['resumen', 'Resumen']] as const).map(([value, label]) => <button key={value} aria-pressed={tab === value} className={tab === value ? 'selected' : ''} onClick={() => setTab(value)}>{label}</button>)}</div>
    <section>
      {tab === 'mensajes' && <><div className="message-list" aria-live="polite">{messages.map((m, i) => <article key={i} className={m.autor === 'Lucía' ? 'message-client' : 'message-team'}><span>{m.autor} · {m.hora}</span><p>{m.texto}</p></article>)}</div><form className="message-compose" onSubmit={e => { e.preventDefault(); if (!draft.trim()) return; setMessages(m => [...m, { autor: 'Lucía', texto: draft.trim(), hora: 'Ahora · ejemplo' }]); setDraft(''); }}><label className="field-label" htmlFor="mensaje">Escribe un mensaje de ejemplo</label><textarea id="mensaje" maxLength={500} value={draft} onChange={e => setDraft(e.target.value)} rows={2} placeholder="¿Qué te gustaría consultar?" /><button className="primary-button" disabled={!draft.trim()} type="submit">Añadir al ejemplo<Icon name="arrow" /></button></form></>}
      {tab === 'cita' && <><h2 className="compact-title">Elige un momento.</h2><p className="screen-lead">Agenda ficticia para una consulta sobre tu documentación.</p><div className="appointment-list">{data.consulta.citas.map(t => <button key={t} disabled={reserved} aria-pressed={slot === t} className={slot === t ? 'selected' : ''} onClick={() => setSlot(t)}>{t}<Icon name="check" /></button>)}</div>{reserved ? <><p className="review-callout" role="status">Cita de ejemplo reservada: {slot}.</p><button className="primary-button" onClick={() => { setInCall(true); setEnded(false); }}>Entrar en la sala de ejemplo<Icon name="arrow" /></button><button className="text-button" onClick={() => setReserved(false)}>Cambiar cita de ejemplo</button></> : <button className="primary-button" onClick={() => setReserved(true)}>Reservar cita de ejemplo<Icon name="arrow" /></button>}</>}
      {tab === 'resumen' && <div className="consultation-summary"><span className="status-label">{ended ? 'Llamada de ejemplo terminada' : 'Resumen de ejemplo'}</span><h2 className="compact-title">Lo que viene ahora.</h2><ol className="instruction-list">{data.consulta.resumen.map(t => <li key={t}>{t}</li>)}</ol><p className="review-callout">El equipo revisaría este resumen antes de incorporarlo al expediente.</p></div>}
    </section>
  </>}</DemoScene>;
}
