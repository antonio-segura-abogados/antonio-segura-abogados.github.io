import { useEffect, useId, useRef, type ReactNode } from 'react';

export type GlyphName = 'grid' | 'cases' | 'tasks' | 'file' | 'chat' | 'route' | 'history' | 'team' | 'search' | 'bell' | 'chevron' | 'arrow' | 'plus' | 'check' | 'close' | 'clock' | 'settings' | 'eye' | 'lock' | 'menu' | 'download' | 'filter' | 'calendar' | 'spark' | 'link';
const paths: Record<GlyphName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  cases: <><path d="M3 7h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /><path d="M3 7V5a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v2" /></>,
  tasks: <><rect x="5" y="4" width="15" height="17" rx="2" /><path d="M9 2h7v4H9zM9 11l2 2 4-4M9 17h7" /></>,
  file: <><path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10zM13 3v7h7M8 14h8M8 17h5" /></>,
  chat: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 0 1 19 0ZM7 10h10M7 14h6" />,
  route: <><rect x="9" y="2" width="6" height="5" rx="1" /><rect x="2" y="17" width="6" height="5" rx="1" /><rect x="16" y="17" width="6" height="5" rx="1" /><path d="M12 7v5M5 17v-5h14v5" /></>,
  history: <><path d="M3 10a9 9 0 1 1 2 8M3 3v7h7M12 7v5l3 2" /></>,
  team: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  chevron: <path d="m9 5 7 7-7 7" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  settings: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="3" /><circle cx="16" cy="17" r="3" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3" /></>,
  spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />,
  link: <><path d="m9 15 6-6M8 16l-2 2a4 4 0 0 1-5-5l5-5a4 4 0 0 1 5 0M16 8l2-2a4 4 0 0 1 5 5l-5 5a4 4 0 0 1-5 0" transform="translate(0 -1)" /></>,
};
export function Glyph({ name, size = 19 }: { name: GlyphName; size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>; }
export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) { return <span className={`crm-badge crm-badge--${tone}`}>{children}</span>; }
export function Avatar({ name, color = 0 }: { name: string; color?: number }) { return <span className={`crm-avatar crm-avatar--${color % 4}`}>{name.split(' ').slice(0, 2).map(n => n[0]).join('')}</span>; }
export function Modal({ title, children, close, wide = false }: { title: string; children: ReactNode; close: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => { const previous = document.activeElement as HTMLElement; const panel = ref.current; panel?.showModal(); return () => { panel?.close(); if (previous?.isConnected) previous.focus(); }; }, []);
  return <dialog ref={ref} aria-labelledby={titleId} className={`crm-modal ${wide ? 'crm-modal--wide' : ''}`} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><header><div><span className="crm-overline">ANTONIO SEGURA · WORKSPACE</span><h2 id={titleId}>{title}</h2></div><button className="crm-icon-button" onClick={close} aria-label="Cerrar ventana"><Glyph name="close" /></button></header>{children}</dialog>;
}
