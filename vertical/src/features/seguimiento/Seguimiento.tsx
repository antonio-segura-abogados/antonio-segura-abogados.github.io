import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import contenido from '../../../../recursos-compartidos/demo/seguimiento.json';
import logo from '../../../../recursos-compartidos/assets/marca/logo-azul-web.jpg';
import { Icon, type IconName } from '../../components/Icon';

const sections: { icon: IconName; label: string }[] = [
  { icon: 'home', label: 'Inicio' }, { icon: 'documents', label: 'Documentos' },
  { icon: 'practice', label: 'Práctica' }, { icon: 'consultations', label: 'Consultas' },
  { icon: 'profile', label: 'Perfil' },
];
const guide = [
  { title: 'Una siguiente acción', text: 'La tarea pendiente aparece primero. El cliente sabe qué necesita el despacho para continuar.', target: 'next-action' },
  { title: 'Cada fase tiene un responsable', text: 'El recorrido distingue lo completado, tu turno y las fases que corresponden al despacho o a la Administración.', target: 'case-progress' },
  { title: 'Las instrucciones, a mano', text: '«Ver qué falta» abre el detalle dentro de esta escena. Las demás secciones del menú muestran la estructura propuesta.', target: 'next-action' },
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
  const [params] = useSearchParams();
  const [tour, setTour] = useState<number | null>(params.get('tour') === '1' && !detail ? 0 : null);
  const [opened, setOpened] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const tourTitle = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (opened) dialog.current?.showModal(); else dialog.current?.close(); }, [opened]);
  useEffect(() => { if (tour !== null) tourTitle.current?.focus(); }, [tour]);
  function reset() { setOpened(false); setTour(null); setResetKey(key => key + 1); }
  return <div className="scene-shell">
    <aside className="demo-toolbar" aria-label="Controles de la demostración"><span><span className="demo-dot" />Demo · datos ficticios</span><div>{!detail && <button onClick={() => setTour(0)}>Ver guía</button>}<button onClick={reset}>Reiniciar</button></div></aside>
    {tour !== null && <aside className="tour-panel" role="region" aria-label="Guía de seguimiento"><div className="tour-header"><span>GUÍA · {tour + 1} / {guide.length}</span><button aria-label="Cerrar guía" onClick={() => setTour(null)}>×</button></div><h2 ref={tourTitle} tabIndex={-1}>{guide[tour].title}</h2><p>{guide[tour].text}</p><div className="tour-controls"><button disabled={tour === 0} onClick={() => setTour(step => step! - 1)}>Anterior</button><button className="tour-next" onClick={() => tour === guide.length - 1 ? setTour(null) : setTour(step => step! + 1)}>{tour === guide.length - 1 ? 'Explorar la escena' : 'Siguiente'}<span aria-hidden="true">→</span></button></div></aside>}
    <main className={`client-screen ${detail ? 'client-screen--detail' : ''}`} id="contenido">
      <header className="client-header"><img src={logo} alt="Antonio Segura Abogados y Gestores" /><span className="avatar" aria-label="Lucía, perfil de ejemplo">L</span></header>
      <div className="case-label"><span>{contenido.objetivo}</span><span>{contenido.identificador}</span></div>
      <div className="screen-content">{detail ? <DocumentDetail key={resetKey} /> : <HomeScreen openDetail={() => { setTour(null); setOpened(true); }} highlight={tour !== null ? guide[tour].target : undefined} />}</div>
      <nav className="bottom-menu" aria-label="Secciones de la app (muestra visual)">{sections.map((section, index) => <span key={section.icon} className={`menu-item ${index === 0 ? 'is-active' : ''}`} aria-current={index === 0 ? 'page' : undefined}><Icon name={section.icon} /><span>{section.label}</span></span>)}</nav>
    </main>
    <p className="scene-caption">Propuesta de Pol Surriel para Antonio Segura Abogados.<br />{contenido.nota}</p>
    <dialog className="detail-dialog" ref={dialog} onCancel={() => setOpened(false)} onClose={() => setOpened(false)}><div className="dialog-top"><span>Documentación · Paso 2 de 5</span><button autoFocus onClick={() => setOpened(false)} aria-label="Cerrar detalle">×</button></div>{opened && <DocumentDetail key={resetKey} />}</dialog>
  </div>;
}
