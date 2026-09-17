import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import book from '../../generated/presentacion.json';
import logo from '../../../../recursos-compartidos/assets/marca/logo-azul-web.jpg';

const total = book.slides.length;
const asset = (file: string) => `${import.meta.env.BASE_URL}presentacion/${file}`;

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" style={back ? { transform: 'rotate(180deg)' } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function BookDialog({ open, title, onClose, children, className = '' }: { open: boolean; title: string; onClose: () => void; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (open) ref.current?.showModal(); else ref.current?.close(); }, [open]);
  return <dialog ref={ref} className={`book-dialog ${className}`} onCancel={onClose} onClose={onClose} aria-label={title}><div className="book-dialog-heading"><h2>{title}</h2><button autoFocus onClick={onClose} aria-label="Cerrar ventana">Cerrar <span aria-hidden="true">×</span></button></div>{open && children}</dialog>;
}

export function Presentacion() {
  const [params, setParams] = useSearchParams();
  const requested = Number(params.get('pagina') || '1');
  const index = Number.isInteger(requested) ? Math.max(0, Math.min(total - 1, requested - 1)) : 0;
  const slide = book.slides[index];
  const [showIndex, setShowIndex] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [readText, setReadText] = useState(false);
  const thumbs = useRef<HTMLDivElement>(null);
  function go(next: number) { const page = Math.max(0, Math.min(total - 1, next)); setParams(page ? { pagina: String(page + 1) } : {}, { replace: true }); setReadText(false); }
  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (showIndex || zoom || target.closest('input,select,textarea,[contenteditable=true]') || event.altKey || event.ctrlKey || event.metaKey) return;
      if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? total - 1 : index + (event.key === 'ArrowRight' ? 1 : -1);
        const clamped = Math.max(0, Math.min(total - 1, next));
        setParams(clamped ? { pagina: String(clamped + 1) } : {}, { replace: true }); setReadText(false);
      }
    }
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [index, showIndex, zoom, setParams]);
  useEffect(() => {
    const active = thumbs.current?.querySelector<HTMLElement>('[aria-current=page]');
    if (active && thumbs.current) {
      const left = active.offsetLeft;
      if (left < thumbs.current.scrollLeft || left + active.offsetWidth > thumbs.current.scrollLeft + thumbs.current.clientWidth) thumbs.current.scrollTo({ left: left - thumbs.current.clientWidth / 2 + active.offsetWidth / 2 });
    }
    // Solo las páginas vecinas: lectura fluida sin descargar las 24 imágenes grandes.
    for (const next of [index - 1, index + 1]) {
      if (book.slides[next]) { const image = new Image(); image.src = asset(book.slides[next].imagen); }
    }
  }, [index]);
  const demo = slide.enlaces.find(url => url.startsWith('https://antonio-segura-abogados.github.io/#/') && !url.endsWith('#/'));
  const source = slide.enlaces.find(url => url.startsWith('https://') && !url.includes('github.io'));
  const sourceLabel = source?.includes('anthropic') ? 'Leer el informe' : source?.includes('linkedin') ? 'Ver trayectoria' : source?.includes('cervantes') ? 'Ver el manual' : 'Ver la referencia';
  return <main className="presentation" id="contenido">
    <header className="book-header"><div className="book-signature"><span className="book-monogram">PS<span /></span><div><strong>Pol Surriel</strong><span>Una propuesta para vuestro equipo</span></div></div><div className="book-recipient"><span>PARA</span><img src={logo} alt="Antonio Segura Abogados y Gestores" /></div><nav aria-label="Accesos de la presentación"><Link to="/demos">Explorar las demos <span aria-hidden="true">↗</span></Link><a className="book-download" href={asset(book.pdf)} download="Pol-Surriel-Propuesta-AS.pdf">Descargar librito <span aria-hidden="true">↓</span></a></nav></header>
    <section className="book-reader" aria-label="Presentación completa">
      <div className="book-reader-top"><span>LA PRESENTACIÓN <i />{total} PÁGINAS</span><div><button onClick={() => setShowIndex(true)}><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M1 1h5v5H1zm9 0h5v5h-5zM1 10h5v5H1zm9 0h5v5h-5z" fill="none" stroke="currentColor" /></svg>Ver índice</button><button onClick={() => setZoom(true)}><svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true"><path d="M2 7V2h5m4 0h5v5M2 11v5h5m4 0h5v-5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>Ampliar</button></div></div>
      <div className="book-stage"><figure className="book-paper"><img key={slide.imagen} className="book-current-slide" src={asset(slide.imagen)} width={slide.ancho} height={slide.alto} alt={`Página ${slide.numero}. ${slide.titulo}`} fetchPriority="high" /></figure></div>
      <div className="book-reading-controls"><div className="book-current-title"><span>{slide.capitulo}</span><h1>{slide.titulo}</h1></div><div className="book-pagination" aria-label="Cambiar de página"><button aria-label="Página anterior" disabled={index === 0} onClick={() => go(index - 1)}><Arrow back /></button><span><b>{String(slide.numero).padStart(2,'0')}</b><i>/</i>{String(total).padStart(2,'0')}</span><button aria-label="Página siguiente" disabled={index === total - 1} onClick={() => go(index + 1)}><Arrow /></button></div><div className="book-page-action">{demo ? <Link to={demo.split('#')[1]}>Probar esta idea <Arrow /></Link> : source ? <a href={source} target="_blank" rel="noreferrer">{sourceLabel}<span aria-hidden="true">↗</span></a> : <span className="book-keyboard-hint">← → para pasar página</span>}</div></div>
      <div className="book-progress" aria-hidden="true"><span style={{ width: `${(index + 1) / total * 100}%` }} /></div>
      <div className="book-thumbnails" ref={thumbs} aria-label="Miniaturas de las páginas">{book.slides.map((item, i) => <button key={item.numero} aria-label={`Ir a página ${item.numero}: ${item.titulo}`} aria-current={i === index ? 'page' : undefined} onClick={() => go(i)}><img src={asset(item.miniatura)} alt="" width="150" height="106" loading="lazy" /><span>{String(item.numero).padStart(2,'0')}</span></button>)}</div>
      <div className="book-reader-bottom"><button aria-expanded={readText} aria-controls="texto-pagina" onClick={() => setReadText(v => !v)}>{readText ? 'Ocultar texto' : 'Leer el texto de esta página'}<span aria-hidden="true">{readText ? '−' : '+'}</span></button><span>Una propuesta de dirección tecnológica.</span></div>
      {readText && <section id="texto-pagina" className="book-transcript"><h2>Página {slide.numero} · {slide.titulo}</h2><p>{slide.texto}</p></section>}
      <p className="book-announcement" aria-live="polite" aria-atomic="true">Página {slide.numero} de {total}: {slide.titulo}</p>
    </section>
    <BookDialog open={showIndex} title="La historia, página a página." onClose={() => setShowIndex(false)}><div className="book-index-grid">{book.slides.map((item,i) => <button key={item.numero} aria-label={`Abrir página ${item.numero}: ${item.titulo}`} aria-current={index === i ? 'page' : undefined} onClick={() => { go(i); setShowIndex(false); }}><img src={asset(item.miniatura)} width="300" height="212" alt="" loading="lazy" /><span>{String(item.numero).padStart(2,'0')} <b>{item.titulo}</b></span></button>)}</div></BookDialog>
    <BookDialog open={zoom} title={`Página ${slide.numero} · ${slide.titulo}`} onClose={() => setZoom(false)} className="book-zoom-dialog"><div className="book-zoom-scroll"><img src={asset(slide.imagen)} width={slide.ancho} height={slide.alto} alt={`Página ${slide.numero}. ${slide.titulo}`} /></div><p className="book-zoom-note">Desplázate por la página para ver los detalles.</p></BookDialog>
    <footer className="book-footer"><span>Pol Surriel · Una candidatura con una propuesta concreta.</span><Link to="/demos">Continuar con las demostraciones <Arrow /></Link></footer>
  </main>;
}
