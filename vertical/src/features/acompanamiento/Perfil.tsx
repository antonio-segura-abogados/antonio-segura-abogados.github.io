import { useState } from 'react';
import { DemoScene } from '../../components/DemoScene';

export function PerfilScene() {
  const [language, setLanguage] = useState('Español');
  const [alerts, setAlerts] = useState(true);
  return <DemoScene title="Mi perfil" label="Preferencias de ejemplo" navigation activeSection="profile" onReset={() => { setLanguage('Español'); setAlerts(true); }}>{<>
    <div className="greeting"><p>Tu espacio AS.</p><h1>Hola, Lucía.</h1></div><div className="profile-summary"><span className="avatar">L</span><strong>Lucía · perfil ficticio</strong><p>Expediente AS-0142</p></div><label className="field-label" htmlFor="idioma">Preferencia de idioma</label><select className="product-select" id="idioma" value={language} onChange={e => setLanguage(e.target.value)}><option>Español</option><option>English</option><option>Català</option></select><label className="check-label"><input type="checkbox" checked={alerts} onChange={e => setAlerts(e.target.checked)} />Avisos de cambios en mi expediente</label><p className="review-callout" role="status">Preferencia de ejemplo: {language}. Avisos {alerts ? 'activados' : 'desactivados'}.</p><p className="quiet-note">Los cambios solo se muestran en esta escena. La traducción y las notificaciones no están conectadas.</p>
  </>}</DemoScene>;
}
