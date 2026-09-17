import { Link, Route, Routes } from 'react-router';
import { SeguimientoScene } from './features/seguimiento/Seguimiento';

export function App() {
  return (
        <Routes>
          <Route path="/" element={
            <main className="scene-index" id="contenido">
              <p className="eyebrow">Pol Surriel · Propuesta para AS</p>
              <h1>Una idea.<br />Una escena para verla.</h1>
              <p>Primeras muestras de la experiencia de extranjería. Cada dirección abre un ejemplo independiente.</p>
              <div className="scene-links">
                <Link to="/expediente">01 <span>Seguimiento del expediente<small>La home y la siguiente acción</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/expediente/pasos/documentacion">02 <span>Un paso, en detalle<small>Instrucciones y documentos de ejemplo</small></span><b aria-hidden="true">↗</b></Link>
              </div>
              <footer>Demo con datos ficticios · Dirección visual en exploración</footer>
            </main>
          } />
          <Route path="/expediente" element={<SeguimientoScene key="seguimiento" />} />
          <Route path="/expediente/pasos/documentacion" element={<SeguimientoScene detail key="documentacion" />} />
          <Route path="*" element={
            <main className="scene-index">
              <h1>Pantalla no disponible</h1>
              <p>Esta dirección todavía no tiene una demostración.</p>
              <Link to="/">Volver al inicio</Link>
            </main>
          } />
        </Routes>
  );
}
