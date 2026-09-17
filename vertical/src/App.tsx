import { Link, Route, Routes } from 'react-router';
import { SeguimientoScene } from './features/seguimiento/Seguimiento';
import { EntrevistaScene } from './features/entrada/Entrevista';
import { OpcionesScene } from './features/entrada/Opciones';
import { PlanesScene } from './features/entrada/Planes';

export function App() {
  return (
        <Routes>
          <Route path="/" element={
            <main className="scene-index" id="contenido">
              <p className="eyebrow">Pol Surriel · Propuesta para AS</p>
              <h1>Tu app de extranjería.<br />Del objetivo al siguiente paso.</h1>
              <p>Explora la propuesta para AS. Cada escena carga su propio ejemplo; puedes empezar por cualquiera.</p>
              <div className="scene-links">
                <Link to="/entrevista?tour=1">09 <span>La primera entrevista<small>Responder, corregir y preparar el caso</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/opciones?tour=1">10 <span>Entender las opciones<small>Condiciones, pasos y revisión profesional</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/planes?tour=1">11 <span>Elegir acompañamiento<small>Planes, periodicidad y contratación simulada</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/expediente?tour=1">12 <span>Seguimiento del expediente<small>La home y la siguiente acción</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/expediente/pasos/documentacion?tour=1">13 <span>Un paso, en detalle<small>Instrucciones y documentos de ejemplo</small></span><b aria-hidden="true">↗</b></Link>
              </div>
              <footer>Demo con datos ficticios · Propuesta de Pol Surriel</footer>
            </main>
          } />
          <Route path="/entrevista" element={<EntrevistaScene />} />
          <Route path="/opciones" element={<OpcionesScene />} />
          <Route path="/planes" element={<PlanesScene key="planes" />} />
          <Route path="/contratacion" element={<PlanesScene checkout key="contratacion" />} />
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
