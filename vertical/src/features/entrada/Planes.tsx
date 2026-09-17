import { useState } from 'react';
import data from '../../../../recursos-compartidos/demo/entrada.json';
import { DemoScene, SceneDialog, type GuideStep } from '../../components/DemoScene';
import { Icon } from '../../components/Icon';

type Plan = typeof data.planes[number];
type Period = 'mensual' | 'anual';
export const money = (cents: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);
export const total = (plan: Plan, period: Period) => period === 'mensual' ? plan.mensualCentimos : plan.anualCentimos;
const guide: GuideStep[] = [
  { title: 'Elegir acompañamiento', text: 'Compara dos planes ficticios. La suscripción organiza el servicio; el encargo jurídico se presupuestaría aparte.', target: 'planes' },
  { title: 'Ver el importe completo', text: 'Cambia entre mensual y anual. En anual se muestra el total del año y su equivalente mensual.', target: 'periodo' },
  { title: 'Contratar con claridad', text: 'Abre el resumen del plan. La confirmación es una simulación y no solicita tarjeta ni produce un cobro.' },
];

function Checkout({ plan, period }: { plan: Plan; period: Period }) {
  const [accepted, setAccepted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  return <div className="checkout">{confirmed ? <div className="purchase-confirmation" role="status"><span className="confirmation-check"><Icon name="check" /></span><p className="product-kicker">CONFIRMACIÓN DE EJEMPLO</p><h2>Todo preparado.</h2><p>Plan {plan.nombre}, con pago {period}.</p><strong>{money(total(plan, period))}{period === 'mensual' ? ' / mes' : ' / año'}</strong><p>No se ha realizado ningún cobro.</p></div> : <><p className="product-kicker">RESUMEN DE SUSCRIPCIÓN</p><h2>Tu acompañamiento,<br />bien definido.</h2><dl className="checkout-summary"><dt>Plan</dt><dd>{plan.nombre}</dd><dt>Modalidad</dt><dd>{period === 'mensual' ? 'Mensual' : 'Anual'}</dd><dt>Cuota · IVA incluido</dt><dd>{money(total(plan, period))}</dd><dt>Trámites y tasas</dt><dd>No incluidos</dd></dl><div className="checkout-total"><span>Total del {period === 'mensual' ? 'mes' : 'año'}</span><strong>{money(total(plan, period))}</strong></div><p className="quiet-note">{period === 'anual' ? 'Un pago por el año completo.' : 'Cuota mensual.'} Precios ficticios.</p><label className="check-label"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} />He revisado qué incluye el plan y su periodicidad.</label><button className="primary-button" disabled={!accepted} onClick={() => setConfirmed(true)}>Simular contratación<Icon name="arrow" /></button></>}</div>;
}

export function PlanesScene({ checkout = false }: { checkout?: boolean }) {
  const [period, setPeriod] = useState<Period>('mensual');
  const [chosen, setChosen] = useState<Plan | null>(null);
  const [resetKey, setResetKey] = useState(0);
  return <><DemoScene title={checkout ? 'Contratación de ejemplo' : 'Elige tu acompañamiento'} label="Acompañamiento a tu medida" guide={guide} onReset={() => { setPeriod('mensual'); setChosen(null); setResetKey(k => k + 1); }} note={data.precioNota}>{highlight => checkout ? <Checkout key={resetKey} plan={data.planes[1]} period="mensual" /> : <>
    <div className="greeting"><p>Elige cómo te acompañamos.</p><h1>Un plan para avanzar.</h1></div>
    <div className={`billing-toggle ${highlight === 'periodo' ? 'is-highlighted' : ''}`} aria-label="Periodicidad">{(['mensual', 'anual'] as const).map(value => <button key={value} aria-pressed={period === value} className={period === value ? 'selected' : ''} onClick={() => setPeriod(value)}>{value === 'mensual' ? 'Mensual' : 'Anual · ahorra 2 meses'}</button>)}</div>
    <div className={`plan-list ${highlight === 'planes' ? 'is-highlighted' : ''}`}>{data.planes.map((plan, i) => <section className={`plan-card ${i === 1 ? 'plan-card--plus' : ''}`} key={plan.id}>
      <div className="plan-heading"><h2>{plan.nombre}</h2><span>{plan.descripcion}</span></div>
      <div className="plan-price"><strong>{money(total(plan, period))}</strong><span>/{period === 'mensual' ? 'mes' : 'año'}</span></div>
      {period === 'anual' && <p className="annual-note">{money(Math.round(plan.anualCentimos / 12))}/mes · ahorro {money(plan.mensualCentimos * 12 - plan.anualCentimos)}/año</p>}
      <ul>{plan.incluye.map(feature => <li key={feature}><Icon name="check" />{feature}</li>)}</ul>
      <button className="primary-button" onClick={() => setChosen(plan)}>Elegir {plan.nombre}<Icon name="arrow" /></button>
    </section>)}</div><p className="quiet-note">{data.precioNota}</p>
  </>}</DemoScene><SceneDialog open={!!chosen} onClose={() => setChosen(null)} title="Resumen del plan">{chosen && <Checkout plan={chosen} period={period} />}</SceneDialog></>;
}
