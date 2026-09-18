export type SimboloNombre = 'ruta' | 'temas' | 'inteligente' | 'examen' | 'reloj' | 'estrella' | 'trofeo' | 'libro' | 'check' | 'flecha';
const trazos: Record<SimboloNombre, React.ReactNode> = {
  ruta: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M8 5h7a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h7" /></>,
  temas: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  inteligente: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" /><path d="M20 2v4M18 4h4" /></>,
  examen: <><rect x="5" y="5" width="14" height="17" rx="2" /><rect x="9" y="2" width="6" height="5" rx="1" /><path d="m9 14 2 2 4-4M9 19h6" /></>,
  reloj: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  estrella: <path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4L12 17.5l-5.7 3.1 1.1-6.4-4.6-4.5 6.4-.9Z" />,
  trofeo: <><path d="M7 3h10v7a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4M12 15v5M8 21h8" /></>,
  libro: <><path d="M12 5C9 3 5 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-2-1-6-1-9 1ZM12 5v15" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  flecha: <path d="M4 12h16m-6-6 6 6-6 6" />,
};
export function Simbolo({ nombre }: { nombre: SimboloNombre }) {
  return <svg className="practice-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{trazos[nombre]}</svg>;
}
