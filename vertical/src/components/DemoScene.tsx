import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import logo from '../../../recursos-compartidos/assets/marca/logo-azul-web.jpg';
import { Icon, type IconName } from './Icon';

export type GuideStep = { title: string; text: string; target?: string };
const sections: { icon: IconName; label: string }[] = [
  { icon: 'home', label: 'Inicio' }, { icon: 'documents', label: 'Documentos' },
  { icon: 'practice', label: 'Práctica' }, { icon: 'consultations', label: 'Consultas' },
  { icon: 'profile', label: 'Perfil' },
];

export function DemoScene({ title, label, guide, children, onReset, navigation = false, note }: {
  title: string; label: string; guide: GuideStep[];
  children: (highlight?: string) => ReactNode; onReset: () => void; navigation?: boolean; note?: string;
}) {
  const [params] = useSearchParams();
  const [tour, setTour] = useState<number | null>(params.get('tour') === '1' ? 0 : null);
  const guideTitle = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (tour !== null) guideTitle.current?.focus(); }, [tour]);
  return <div className="scene-shell">
    <aside className="demo-toolbar" aria-label="Controles de la demostración">
      <span><span className="demo-dot" />Demo · datos ficticios</span>
      <div><button onClick={() => setTour(0)}>Ver guía</button><button onClick={() => { setTour(null); onReset(); }}>Reiniciar</button></div>
    </aside>
    <div className="scene-stage">
      <div className="device-frame" data-capture="phone">
        <div className="device-status" aria-hidden="true"><span>9:41</span><i /><span className="device-signal">▮▮▮ ▰</span></div>
        <main className="client-screen" id="contenido" aria-label={title}>
          <header className="client-header"><img src={logo} alt="Antonio Segura Abogados y Gestores" /><span className="avatar" aria-label="Lucía, perfil de ejemplo">L</span></header>
          <div className="case-label"><span>{label}</span><span>Tu espacio AS</span></div>
          <div className="device-scroll"><div className="screen-content">{children(tour === null ? undefined : guide[tour].target)}</div></div>
          {navigation && <nav className="bottom-menu" aria-label="Secciones de la app (muestra visual)">{sections.map((section, i) => <span key={section.icon} className={`menu-item ${i === 0 ? 'is-active' : ''}`} aria-current={i === 0 ? 'page' : undefined}><Icon name={section.icon} /><span>{section.label}</span></span>)}</nav>}
        </main>
        <div className="device-home" aria-hidden="true"><i /></div>
      </div>
      {tour !== null && <aside className="tour-panel" role="region" aria-label={`Guía: ${title}`}>
        <div className="tour-header"><span>GUÍA · {tour + 1} / {guide.length}</span><button aria-label="Cerrar guía" onClick={() => setTour(null)}>×</button></div>
        <h2 ref={guideTitle} tabIndex={-1}>{guide[tour].title}</h2><p>{guide[tour].text}</p>
        <div className="tour-controls"><button disabled={tour === 0} onClick={() => setTour(tour - 1)}>Anterior</button><button className="tour-next" onClick={() => setTour(tour === guide.length - 1 ? null : tour + 1)}>{tour === guide.length - 1 ? 'Explorar la escena' : 'Siguiente'}<span aria-hidden="true">→</span></button></div>
      </aside>}
    </div>
    <p className="scene-caption">Propuesta de Pol Surriel para Antonio Segura Abogados.<br />{note || 'Ejemplo interactivo con datos ficticios.'}</p>
  </div>;
}

export function SceneDialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = `dialog-${title.replace(/\W/g, '').toLowerCase()}`;
  useEffect(() => { if (open) dialog.current?.showModal(); else dialog.current?.close(); }, [open]);
  return <dialog className="detail-dialog" ref={dialog} onCancel={onClose} onClose={onClose} aria-labelledby={headingId}>
    <div className="dialog-top"><span id={headingId}>{title}</span><button autoFocus onClick={onClose} aria-label="Cerrar detalle">×</button></div>{open && children}
  </dialog>;
}
