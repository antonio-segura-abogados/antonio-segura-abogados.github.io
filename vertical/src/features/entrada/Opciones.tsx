import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/entrada.json';
import { DemoScene, SceneDialog } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';


export function OpcionesScene() {
  const [detail, setDetail] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const item = data.opciones.find(o => o.id === detail);
  return <>
    <DemoScene dialog={
    <SceneDialog open={!!item} onClose={() => setDetail(null)} title="Detalle de la opción">{item && <div className="option-detail"><span className="status-label">{item.estado}</span><h2>{item.titulo}</h2><p>{item.detalle}</p><h3>El recorrido previsto</h3><ol className="instruction-list">{item.pasos.map(step => <li key={step}>{step}</li>)}</ol><p className="review-callout">{item.nota}</p><p>La suscripción se muestra en su propia escena. Los trámites y gastos externos tendrían un presupuesto separado.</p>{item.fuente && <a className="source-link" href={item.fuente} target="_blank" rel="noreferrer">Referencia: Código Civil, artículo 22 ↗</a>}<button className="primary-button" onClick={() => { setChosen(item.id); setDetail(null); }}>Elegir para el ejemplo<Icon name="arrow" /></button></div>}</SceneDialog>
  } title="Opciones para tu caso" label="Tus siguientes pasos" onReset={() => { setDetail(null); setChosen(null); }} note={data.nota}>{<>
      <div className="greeting"><p>Lucía, con lo que nos has contado…</p><h1>Veamos tus opciones.</h1></div>
      <p className="screen-lead">Una vía a estudiar y otras formas de ayudarte a avanzar.</p>
      <div className="option-list">{data.opciones.map((option, i) => <button className={`option-card ${i === 0 ? 'option-card--main' : ''}`} key={option.id} onClick={() => setDetail(option.id)}>
        <span className={`option-status status-${i}`}>{option.estado}</span><h2>{option.titulo}</h2><p>{option.resumen}</p><span className="option-link">{chosen === option.id ? 'Seleccionada para el ejemplo' : 'Ver requisitos y pasos'}<Icon name={chosen === option.id ? 'check' : 'arrow'} /></span>
      </button>)}</div>
      <p className="quiet-note" role="status">{chosen ? 'Opción seleccionada. Pendiente de revisión del equipo.' : 'El equipo confirmará la vía antes de iniciar el trámite.'}</p>
    </>}</DemoScene>

  </>;
}
