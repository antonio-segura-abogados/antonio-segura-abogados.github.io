import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/acompanamiento.json';
import { DemoScene, type GuideStep } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';

const guide: GuideStep[] = [
  { title: 'Un punto cercano', text: 'Elige una ciudad y un punto ficticio. El mapa y las distancias ilustran una red logística por validar.', target: 'puntos' },
  { title: 'Preparar y dejar constancia', text: 'Confirma la preparación y crea un resguardo de ejemplo. La entrega queda asociada al expediente.' },
  { title: 'Seguir el original', text: 'Prueba los estados de transporte, recepción, incidencia y devolución. Recibir el sobre no valida ni apostilla el documento.' },
];

export function OriginalesScene() {
  const [city, setCity] = useState('Barcelona');
  const [point, setPoint] = useState(data.puntos[0].id);
  const [phase, setPhase] = useState<'puntos' | 'preparar' | 'envio'>('puntos');
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);
  const [incident, setIncident] = useState(false);
  const selected = data.puntos.find(p => p.id === point)!;
  function reset() { setCity('Barcelona'); setPoint(data.puntos[0].id); setPhase('puntos'); setReady(false); setStage(0); setIncident(false); }
  return <DemoScene title="Entrega de originales" label="Del documento al despacho" guide={guide} navigation activeSection="documents" onReset={reset} note="Red logística propuesta. Puntos, distancias, resguardos y envíos ficticios.">{highlight => <>
    <div className="greeting"><p>Cuando hace falta el original.</p><h1>{phase === 'envio' ? 'Siempre localizado.' : 'Entrégalo cerca.'}</h1></div>
    {phase === 'puntos' && <div className={highlight === 'puntos' ? 'is-highlighted' : ''}>
      <label className="field-label" htmlFor="ciudad">Ciudad del ejemplo</label><select id="ciudad" className="product-select" value={city} onChange={e => setCity(e.target.value)}>{['Barcelona', 'Madrid', 'Sevilla'].map(c => <option key={c}>{c}</option>)}</select>
      <div className="pickup-map"><svg viewBox="0 0 340 215" role="img" aria-label="Esquema de tres puntos ficticios"><rect width="340" height="215" fill="#edf6fa" /><path d="M0 58H340M0 120H340M0 183H340M48 0V215M118 0V215M234 0V215M304 0V215" stroke="white" strokeWidth="17" /><path d="M340 0Q220 60 320 215" fill="none" stroke="#d0e8ec" strokeWidth="35" />{data.puntos.map((p, i) => <g key={p.id}><circle cx={p.x} cy={p.y} r={p.id === point ? 18 : 14} fill={p.id === point ? '#0192e5' : '#06283d'} /><text x={p.x} y={p.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">{i + 1}</text></g>)}</svg><span>Esquema · ubicaciones ficticias</span></div>
      <div className="pickup-list">{data.puntos.map((p, i) => <button key={p.id} aria-pressed={point === p.id} className={point === p.id ? 'selected' : ''} onClick={() => setPoint(p.id)}><b>{String(i + 1).padStart(2, '0')}</b><span><strong>{p.nombre}</strong><small>{p.horario}</small></span><em>{p.distancia}</em></button>)}</div>
      <button className="primary-button" onClick={() => setPhase('preparar')}>Preparar la entrega<Icon name="arrow" /></button>
    </div>}
    {phase === 'preparar' && <><span className="status-label">{selected.nombre} · {city}</span><h2 className="compact-title">Antes de llevarlo</h2><ol className="instruction-list">{data.envio.preparacion.map(t => <li key={t}>{t}</li>)}</ol><p className="review-callout">El envío no sustituye la apostilla ni otros requisitos que determine el equipo.</p><label className="check-label"><input type="checkbox" checked={ready} onChange={e => setReady(e.target.checked)} />He revisado la preparación del ejemplo.</label><button className="primary-button" disabled={!ready} onClick={() => setPhase('envio')}>Crear resguardo de ejemplo<Icon name="arrow" /></button><button className="text-button" onClick={() => setPhase('puntos')}>Cambiar punto</button></>}
    {phase === 'envio' && <><div className="shipment-receipt"><span>RESGUARDO DE DEMOSTRACIÓN</span><strong>{data.envio.referencia}</strong><p>{selected.nombre} · {city}<br />Certificado de nacimiento · expediente de Lucía</p></div><ol className="shipment-track">{data.envio.estados.map((label, i) => <li key={label} className={i <= stage ? 'complete' : ''} aria-current={i === stage ? 'step' : undefined}><span>{i < stage ? <Icon name="check" /> : i + 1}</span><strong>{label}</strong></li>)}</ol>
      <p className="shipment-status" role="status">{incident ? 'Incidencia de ejemplo: el transporte requiere revisión.' : `${data.envio.estados[stage]}. ${stage === 3 ? 'La revisión documental sigue pendiente.' : ''}`}</p>
      <button className="primary-button" disabled={stage === 5 || incident} onClick={() => setStage(s => s + 1)}>{stage === 5 ? 'Ejemplo completado' : 'Simular siguiente estado'}<Icon name="arrow" /></button>
      {stage < 5 && <button className="text-button" onClick={() => setIncident(v => !v)}>{incident ? 'Resolver incidencia de ejemplo' : 'Ver incidencia de ejemplo'}</button>}
    </>}
  </>}</DemoScene>;
}
