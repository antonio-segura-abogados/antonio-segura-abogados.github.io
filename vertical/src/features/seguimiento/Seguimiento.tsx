import { useState } from 'react';
import contenido from '../../../../recursos-compartidos/demo/seguimiento.json';
import { Icon } from '../../components/Icon';
import { DemoScene, SceneDialog, type GuideStep } from '../../components/DemoScene';

const guide: GuideStep[] = [
  { title: 'Una siguiente acción', text: 'La tarea pendiente aparece primero. El cliente sabe qué necesita el despacho para continuar.', target: 'next-action' },
  { title: 'Cada fase tiene un responsable', text: 'El recorrido distingue lo completado, tu turno y las fases que corresponden al despacho o a la Administración.', target: 'case-progress' },
  { title: 'Las instrucciones, a mano', text: '«Ver qué falta» abre el detalle dentro de esta escena. Las demás secciones del menú muestran la estructura propuesta.', target: 'next-action' },
];
const detailGuide: GuideStep[] = [
  { title: 'Saber qué falta', text: 'El paso reúne los documentos pendientes y las instrucciones. Todo está en el mismo lugar.' },
  { title: 'Aportar el ejemplo', text: 'Pulsa «Usar documento de ejemplo». El certificado pasa a recibido; no necesitas subir archivos personales.' },
  { title: 'Recibir no es validar', text: 'El equipo todavía tiene que revisar el documento. La recepción no completa automáticamente la etapa.' },
];

function DocumentDetail() {
  const [exampleAdded, setExampleAdded] = useState(false);
  return <div className="document-detail">
    <span className="status-label"><span />Tu turno</span><h2>Completar<br />documentación</h2>
    <p className="detail-lead">Prepara los documentos de este paso. El equipo los revisará antes de continuar.</p>
    <div className="document-list">{contenido.documentos.map((doc, index) => <div className="document-row" key={doc.nombre}>
      <span className="document-symbol"><Icon name="documents" /></span>
      <div><strong>{doc.nombre}</strong><span>{index === 1 && exampleAdded ? 'Copia de ejemplo aportada' : doc.detalle}</span></div>
      <span className={`document-state ${index === 0 || exampleAdded ? 'is-received' : ''}`}>{index === 1 && exampleAdded ? 'Recibido' : doc.estado}</span>
    </div>)}</div>
    <h3>Cómo prepararlo</h3><ol className="instruction-list">{contenido.instrucciones.map(line => <li key={line}>{line}</li>)}</ol>
    <button className="primary-button" disabled={exampleAdded} onClick={() => setExampleAdded(true)}>{exampleAdded ? 'Ejemplo recibido' : 'Usar documento de ejemplo'}<Icon name={exampleAdded ? 'check' : 'arrow'} /></button>
    <p className="review-message" role="status">{exampleAdded ? 'Documento recibido. La revisión del equipo sigue pendiente.' : 'Recibido y revisado son estados diferentes.'}</p>
  </div>;
}

function HomeScreen({ openDetail, highlight }: { openDetail: () => void; highlight?: string }) {
  return <>
    <div className="greeting"><p>{contenido.saludo}</p><h1>{contenido.titular}</h1></div>
    <section id="next-action" className={`next-action ${highlight === 'next-action' ? 'is-highlighted' : ''}`}>
      <div className="action-top"><span className="status-label"><span />Tu turno</span><span>Paso 2 de 5</span></div>
      <h2>Completar<br />documentación</h2><p>{contenido.resumen}</p>
      <button className="primary-button" onClick={openDetail}>{contenido.cta}<Icon name="arrow" /></button>
    </section>
    <section id="case-progress" className={`case-progress ${highlight === 'case-progress' ? 'is-highlighted' : ''}`} aria-labelledby="progress-title">
      <div className="section-heading"><h2 id="progress-title">Tu recorrido</h2><span>5 etapas</span></div>
      <ol className="step-list">{contenido.pasos.map((step, index) => <li className={`step step--${step.estado}`} key={step.id} aria-current={step.estado === 'current' ? 'step' : undefined}>
        <span className="step-node">{step.estado === 'completed' ? <Icon name="check" /> : String(index + 1).padStart(2, '0')}</span>
        <div className="step-content"><strong>{step.nombre}</strong><span>{step.estado === 'current' ? step.detalle : step.responsable}</span></div>
        {step.estado === 'current' && <span className="current-label">Ahora</span>}
      </li>)}</ol>
    </section>
    <div className="human-support"><span className="support-initials">AS</span><p><strong>Tu equipo, cerca.</strong><span>Te avisaremos cuando haya novedades.</span></p></div>
  </>;
}

export function SeguimientoScene({ detail = false }: { detail?: boolean }) {
  const [opened, setOpened] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  return <>
    <DemoScene title={detail ? 'Documentación del expediente' : 'Seguimiento del expediente'} label={contenido.objetivo} guide={detail ? detailGuide : guide} onReset={() => { setOpened(false); setResetKey(key => key + 1); }} navigation note={contenido.nota}>
      {highlight => detail ? <DocumentDetail key={resetKey} /> : <HomeScreen openDetail={() => setOpened(true)} highlight={highlight} />}
    </DemoScene>
    <SceneDialog open={opened} onClose={() => setOpened(false)} title="Documentación · Paso 2 de 5"><DocumentDetail key={resetKey} /></SceneDialog>
  </>;
}
