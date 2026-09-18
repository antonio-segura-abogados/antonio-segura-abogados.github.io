import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/gestion.json';
import { DemoScene, SceneDialog } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';

type Step = typeof data.ruta.pasos[number];

function MiniPreview({ step }: { step: Step }) {
  return <div className="route-preview"><span className="product-kicker">VISTA DEL CLIENTE</span><div className="mini-phone"><div className="mini-island" /><span>Tu siguiente paso</span><h3>{step.titulo}</h3><p>{step.instruccion}</p><div className="mini-file"><Icon name="documents" /><span>{step.tipo}</span></div><div className="mini-cta">Ver instrucciones <span>→</span></div><small>Vista previa del borrador</small></div></div>;
}

export function RutasScene({ catalogo = false }: { catalogo?: boolean }) {
  const [opened, setOpened] = useState(!catalogo);
  const [steps, setSteps] = useState(data.ruta.pasos);
  const [selected, setSelected] = useState('documentos');
  const [reviewed, setReviewed] = useState(false);
  const [published, setPublished] = useState(false);
  const [date, setDate] = useState(data.cambio.vigencia);
  const step = steps.find(s => s.id === selected)!;
  function edit(change: Partial<Step>) { setSteps(items => items.map(s => s.id === selected ? { ...s, ...change } : s)); setReviewed(false); }
  function reset() { setOpened(!catalogo); setSteps(data.ruta.pasos); setSelected('documentos'); setReviewed(false); setPublished(false); setDate(data.cambio.vigencia); }
  function move(direction: number) { const index = steps.findIndex(s => s.id === selected); const target = index + direction; if (target < 0 || target >= steps.length) return; const next = [...steps]; [next[index], next[target]] = [next[target], next[index]]; setSteps(next); setReviewed(false); }
  return <DemoScene title="Configurar las rutas" label="Operación · rutas de acompañamiento" workspace onReset={reset} note="Gestión simulada. El criterio jurídico y la publicación requieren supervisión profesional.">{<>
    <div className="management-heading"><div><p className="product-kicker">CRITERIO DEL DESPACHO, DENTRO DEL PROCESO</p><h1>Rutas que podéis adaptar.</h1></div><span className="management-badge">{published ? 'Versión 2 publicada · ejemplo' : 'Borrador de la versión 2'}</span></div>
    {!opened ? <div className="route-catalog"><div><span className="status-label">VERSIÓN 1 · PUBLICADA</span><h2>{data.ruta.nombre}</h2><p>5 pasos · instrucciones, documentos y revisiones</p><button className="primary-button" onClick={() => setOpened(true)}>Abrir configurador<Icon name="arrow" /></button></div><p className="quiet-note">Ejemplo de catálogo. Cada tipología tendría su propia ruta revisada.</p></div> : <>
      <div className="management-board" data-capture="board">
        <section className="route-steps"><span className="board-label">01 · SECUENCIA</span><h2>{data.ruta.nombre}</h2><ol>{steps.map((s, i) => <li key={s.id}><button className={selected === s.id ? 'selected' : ''} aria-pressed={selected === s.id} onClick={() => setSelected(s.id)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{s.titulo}</strong></button></li>)}</ol><button disabled={published || steps.some(s => s.id === 'extra')} className="text-button" onClick={() => { setSteps(s => [...s, { id: 'extra', titulo: 'Consulta de seguimiento', tipo: 'Revisión profesional', instruccion: 'Revisa con el equipo las dudas pendientes del ejemplo.' }]); setSelected('extra'); setReviewed(false); }}>+ Añadir paso de ejemplo</button></section>
        <section className="route-editor"><span className="board-label">02 · CONTENIDO Y ORDEN</span><label className="field-label" htmlFor="paso-titulo">Nombre del paso</label><input id="paso-titulo" maxLength={64} disabled={published} value={step.titulo} onChange={e => edit({ titulo: e.target.value })} /><label className="field-label" htmlFor="paso-tipo">Tipo de paso</label><select id="paso-tipo" disabled={published} value={step.tipo} onChange={e => edit({ tipo: e.target.value })}>{['Formulario', 'Documentos', 'Revisión profesional', 'Gestión del despacho', 'Seguimiento'].map(t => <option key={t}>{t}</option>)}</select><label className="field-label" htmlFor="paso-texto">Instrucciones para el cliente</label><textarea id="paso-texto" maxLength={400} rows={3} disabled={published} value={step.instruccion} onChange={e => edit({ instruccion: e.target.value })} /><div className="order-controls"><button disabled={published || steps[0].id === selected} onClick={() => move(-1)}>↑ Subir</button><button disabled={published || steps[steps.length - 1].id === selected} onClick={() => move(1)}>↓ Bajar</button></div></section>
        <MiniPreview step={step} />
      </div>
      <div className="publication-bar"><label>Vigencia propuesta<input aria-label="Vigencia propuesta" type="date" value={date} disabled={published} onChange={e => { setDate(e.target.value); setReviewed(false); }} /></label><label className="check-label"><input type="checkbox" checked={reviewed} disabled={published} onChange={e => setReviewed(e.target.checked)} />Revisión profesional simulada</label><button className="primary-button" disabled={!reviewed || !date || published || steps.some(s => !s.titulo.trim() || !s.instruccion.trim())} onClick={() => setPublished(true)}>{published ? 'Versión 2 publicada' : 'Publicar versión de ejemplo'}<Icon name="check" /></button></div>
      <p className="management-status" role="status">{published ? `Versión 2 publicada para nuevas asignaciones desde ${date}. Lucía y Omar conservan la versión 1 y sus pasos completados.` : 'Borrador local. Los expedientes abiertos siguen usando la versión 1.'}</p>
    </>}
    <p className="quiet-note">El panel adapta contenido y secuencias. Nuevas capacidades o integraciones pueden requerir desarrollo.</p>
  </>}</DemoScene>;
}

export function CambiosScene({ expediente = false }: { expediente?: boolean }) {
  const [reviewed, setReviewed] = useState(false);
  const [applied, setApplied] = useState(false);
  const [exception, setException] = useState(false);
  const [dialog, setDialog] = useState(expediente);
  const [reason, setReason] = useState(data.excepcion.instruccion);
  const [savedReason, setSavedReason] = useState(data.excepcion.instruccion);
  function reset() { setReviewed(false); setApplied(false); setException(false); setDialog(expediente); setReason(data.excepcion.instruccion); setSavedReason(data.excepcion.instruccion); }
  return <><DemoScene dialog={
    <SceneDialog open={dialog} onClose={() => setDialog(false)} title="Excepción del expediente de Lucía"><div className="option-detail"><span className="status-label">SOLO ESTE EXPEDIENTE</span><h2>{data.excepcion.titulo}</h2><p>Un paso entre la documentación y la revisión. No modifica la plantilla ni los demás casos.</p><label className="field-label" htmlFor="motivo-excepcion">Motivo e instrucciones del ejemplo</label><textarea className="exception-input" id="motivo-excepcion" maxLength={400} rows={4} value={reason} onChange={e => setReason(e.target.value)} /><MiniPreview step={{ id: 'excepcion', titulo: data.excepcion.titulo, tipo: 'Revisión profesional', instruccion: reason }} /><button className="primary-button" disabled={!reason.trim()} onClick={() => { setException(true); setSavedReason(reason); setDialog(false); }}>Guardar excepción de ejemplo<Icon name="check" /></button></div></SceneDialog>
  } title="Cambios y casos particulares" label="Operación · versiones y alcance" workspace onReset={reset} note="Cambio de procedimiento ficticio. No reproduce una reforma legal ni interpreta el BOE.">{<>
    <div className="management-heading"><div><p className="product-kicker">ACTUALIZAR SIN PERDER EL CONTEXTO</p><h1>Una versión. Una decisión.</h1></div><span className="management-badge">Vigencia de ejemplo · 01 oct. 2026</span></div>
    <div className="changes-board" data-capture="board">
      <section className="change-comparison"><span className="board-label">01 · REVISAR EL CAMBIO</span><h2>{data.cambio.titulo}</h2><div className="comparison-old"><span>VERSIÓN 1 · ACTUAL</span><p>{data.ruta.pasos[1].instruccion}</p></div><div className="comparison-new"><span>VERSIÓN 2 · PROPUESTA</span><p>{data.cambio.instruccion}</p></div><small>Cambio ficticio. La revisión jurídica determina su aplicación.</small></section>
      <section className="affected-cases"><span className="board-label">02 · DECIDIR EL ALCANCE</span><h2>Expedientes abiertos</h2>{data.expedientes.map(file => <article className="affected-case" key={file.id}><div><strong>{file.nombre}</strong><span className="state-tag">v{file.elegible && applied ? 2 : 1}</span></div><p>{file.paso}</p><small>{file.completados} {file.completados === 1 ? 'paso completado' : 'pasos completados'} · avance conservado</small><b className={file.elegible ? 'case-eligible' : 'case-review'}>{file.elegible ? applied ? 'Actualización aplicada en el ejemplo' : 'Puede recibir la nueva instrucción' : 'Requiere revisión individual'}</b></article>)}<label className="check-label"><input type="checkbox" checked={reviewed} disabled={applied} onChange={e => setReviewed(e.target.checked)} />He revisado el alcance del ejemplo</label><button className="primary-button" disabled={!reviewed || applied} onClick={() => setApplied(true)}>{applied ? 'Aplicado solo a Lucía' : 'Aplicar a Lucía · ejemplo'}<Icon name="check" /></button></section>
      <section className="case-exception"><span className="board-label">03 · ATENDER EL MATIZ</span><h2>Solo para Lucía</h2><div className="exception-route"><div><i />Entrevista completada</div><div><i />Preparar documentación</div>{exception && <div className="exception-added"><i />{data.excepcion.titulo}</div>}<div><i />Revisión del equipo</div></div><p>{exception ? savedReason : 'Si su caso lo necesita, el equipo añade una comprobación individual.'}</p><button className="secondary-button" onClick={() => { setReason(savedReason); setDialog(true); }}>{exception ? 'Ver excepción de Lucía' : 'Añadir excepción a Lucía'}</button><small>La plantilla general y el expediente de Omar no cambian.</small></section>
    </div>
    <p className="management-status" role="status">{applied ? 'Lucía: versión 2 · entrevista completada conservada. Omar: versión 1 · sin cambios.' : 'Lucía y Omar mantienen la versión 1 hasta una decisión explícita del equipo.'}{exception ? ' Excepción individual añadida únicamente a Lucía.' : ''}</p>
  </>}</DemoScene></>;
}
