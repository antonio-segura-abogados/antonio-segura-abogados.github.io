import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/acompanamiento.json';
import { DemoScene, SceneDialog } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';

const labels: Record<string, string> = { pendiente: 'Pendiente', recibido: 'En revisión', subsanar: 'Subsanar', validado: 'Validado' };

export function DocumentosScene() {
  const [docs, setDocs] = useState(data.documentos);
  const [filter, setFilter] = useState('todos');
  const [selected, setSelected] = useState<string | null>(null);
  const doc = docs.find(d => d.id === selected);
  const pending = docs.filter(d => d.estado === 'pendiente' || d.estado === 'subsanar').length;
  const visible = docs.filter(d => filter === 'todos' || (filter === 'pendientes' ? ['pendiente', 'subsanar'].includes(d.estado) : d.estado === filter));
  return <><DemoScene dialog={
    <SceneDialog open={!!doc} onClose={() => setSelected(null)} title="Documento e instrucciones">{doc && <div className="option-detail"><span className={`state-tag state-${doc.estado}`}>{labels[doc.estado]}</span><h2>{doc.nombre}</h2><div className="sample-document"><Icon name="documents" /><strong>{doc.archivo}</strong><span>VISTA DE EJEMPLO</span></div><p role="status">{doc.detalle}</p>{['subsanar', 'pendiente'].includes(doc.estado) && <button className="primary-button" onClick={() => setDocs(items => items.map(item => item.id === doc.id ? { ...item, estado: 'recibido', detalle: 'Copia completa de ejemplo recibida. Pendiente de revisión por el equipo.' } : item))}>Usar copia completa de ejemplo<Icon name="arrow" /></button>}{doc.estado === 'recibido' && <p className="review-callout">Recibido. El equipo comprobaría el contenido antes de validarlo.</p>}</div>}</SceneDialog>
  } title="Mis documentos" label="Tu carpeta documental" navigation activeSection="documents" note="Archivos ficticios. Esta lista ilustra estados, no requisitos de un trámite." onReset={() => { setDocs(data.documentos); setSelected(null); setFilter('todos'); }}>{<>
    <div className="greeting"><p>Todo, en su sitio.</p><h1>Mis documentos.</h1></div>
    <div className="document-overview"><strong>{pending}</strong><div><b>requieren tu atención</b><span>Te indicamos qué falta en cada uno.</span></div></div>
    <div className="filter-row" aria-label="Filtrar documentos">{[['todos', 'Todos'], ['pendientes', 'Pendientes'], ['recibido', 'En revisión'], ['validado', 'Validados']].map(([value, label]) => <button key={value} aria-pressed={filter === value} className={filter === value ? 'selected' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div>
    <div className="archive-list">{visible.map(file => <button key={file.id} className="archive-card" onClick={() => setSelected(file.id)}><div className="archive-top"><Icon name="documents" /><span className={`state-tag state-${file.estado}`}>{labels[file.estado]}</span></div><strong>{file.nombre}</strong><p>{file.detalle}</p><span className="archive-link">Ver documento e instrucciones <Icon name="arrow" /></span></button>)}</div>
    {visible.length === 0 && <p className="quiet-note" role="status">No hay documentos en este estado.</p>}
  </>}</DemoScene></>;
}
