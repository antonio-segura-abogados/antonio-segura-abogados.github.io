import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router';
import logo from '../../../recursos-compartidos/assets/marca/logo-azul-web.jpg';
import { Icon, type IconName } from './Icon';

const ContainedDialogContext = createContext(false);
const sections: { icon: IconName; label: string }[] = [
  { icon: 'home', label: 'Inicio' }, { icon: 'documents', label: 'Documentos' },
  { icon: 'practice', label: 'Práctica' }, { icon: 'consultations', label: 'Consultas' },
  { icon: 'profile', label: 'Perfil' },
];

export function DemoScene({ title, label, children, dialog, onReset, navigation = false, note, activeSection = 'home', workspace = false, showHeader = true, immersive = false }: {
  title: string; label?: string;
  children: ReactNode; dialog?: ReactNode; onReset: () => void; navigation?: boolean; note?: string;
  activeSection?: IconName; workspace?: boolean; showHeader?: boolean; immersive?: boolean;
}) {
  return <div className={`scene-shell${immersive ? ' scene-shell--immersive' : ''}`}>
    <aside className="demo-toolbar" aria-label="Controles de la demostración">
      <span><span className="demo-dot" />Demo · datos ficticios</span>
      <button onClick={onReset}>Reiniciar</button>
    </aside>
    <div className={`scene-stage ${workspace ? 'scene-stage--workspace' : ''}`}>
      <div className={workspace ? 'workspace-frame' : 'device-frame'} data-capture={workspace ? 'workspace' : 'phone'}>
        <div className={workspace ? undefined : 'device-viewport'}>
          {!workspace && !immersive && <div className="device-status" aria-hidden="true"><span>9:41</span><i /><span className="device-signal">▮▮▮ ▰</span></div>}
          <main className="client-screen" id="contenido" aria-label={title}>
            {showHeader && !immersive && <header className="client-header"><img src={logo} alt="Antonio Segura Abogados y Gestores" /><span className="avatar" aria-label={workspace ? 'Equipo de gestión, ejemplo' : 'Lucía, perfil de ejemplo'}>{workspace ? 'AS' : 'L'}</span></header>}
            {label && !immersive && <div className="case-label"><span>{label}</span><span>{workspace ? 'Gestión del despacho' : 'Tu espacio AS'}</span></div>}
            <div className="device-scroll"><div className="screen-content">{children}</div></div>
            {navigation && !immersive && <nav className="bottom-menu" aria-label="Secciones de la app (muestra visual)">{sections.map(section => <span key={section.icon} className={`menu-item ${section.icon === activeSection ? 'is-active' : ''}`} aria-current={section.icon === activeSection ? 'page' : undefined}><Icon name={section.icon} /><span>{section.label}</span></span>)}</nav>}
          </main>
          {!workspace && !immersive && <div className="device-home" aria-hidden="true"><i /></div>}
          <ContainedDialogContext.Provider value={!workspace}>{dialog}</ContainedDialogContext.Provider>
        </div>
      </div>
    </div>
    <p className="scene-caption">Propuesta de Pol Surriel para Antonio Segura Abogados.<br />{note || 'Ejemplo interactivo con datos ficticios.'}<br /><Link to="/">Volver a la presentación</Link></p>
  </div>;
}

export function SceneDialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const contained = useContext(ContainedDialogContext);
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  useEffect(() => {
    if (contained) return;
    if (open) dialog.current?.showModal(); else dialog.current?.close();
  }, [open, contained]);
  if (contained) return open ? <ContainedSceneDialog onClose={onClose} title={title} headingId={headingId}>{children}</ContainedSceneDialog> : null;
  return <dialog className="detail-dialog" ref={dialog} onCancel={onClose} onClose={onClose} aria-labelledby={headingId}>
    <div className="dialog-top"><span id={headingId}>{title}</span><button autoFocus onClick={onClose} aria-label="Cerrar detalle">×</button></div>{open && children}
  </dialog>;
}

function ContainedSceneDialog({ onClose, title, headingId, children }: { onClose: () => void; title: string; headingId: string; children: ReactNode }) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const screen = dialog.current?.closest('.device-viewport')?.querySelector<HTMLElement>('.client-screen');
    const wasInert = screen?.inert ?? false;
    if (screen) screen.inert = true;
    closeButton.current?.focus({ preventScroll: true });

    // En móvil real el panel sigue al viewport; en ordenador se desplaza con el marco.
    const mobile = window.matchMedia('(max-width: 520px)');
    const overflow = document.body.style.overflow;
    const updateScroll = () => { document.body.style.overflow = mobile.matches ? 'hidden' : overflow; };
    updateScroll();
    mobile.addEventListener('change', updateScroll);
    return () => {
      mobile.removeEventListener('change', updateScroll);
      document.body.style.overflow = overflow;
      if (screen) screen.inert = wasInert;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const panel = dialog.current;
      if (!panel) return;
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex]'))
        .filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!panel.contains(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first)?.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return <div className="scene-dialog-layer">
    <div className="detail-dialog" ref={dialog} role="dialog" aria-modal="true" aria-labelledby={headingId}>
      <div className="dialog-top"><span id={headingId}>{title}</span><button ref={closeButton} onClick={onClose} aria-label="Cerrar detalle">×</button></div>
      {children}
    </div>
  </div>;
}
