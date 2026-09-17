import { Link, Route, Routes } from 'react-router';
import { SeguimientoScene } from './features/seguimiento/Seguimiento';
import { EntrevistaScene } from './features/entrada/Entrevista';
import { OpcionesScene } from './features/entrada/Opciones';
import { PlanesScene } from './features/entrada/Planes';
import { DocumentosScene } from './features/acompanamiento/Documentos';
import { OriginalesScene } from './features/acompanamiento/Originales';
import { PracticaScene } from './features/acompanamiento/Practica';
import { ConsultasScene } from './features/acompanamiento/Consultas';
import { PerfilScene } from './features/acompanamiento/Perfil';
import { RutasScene, CambiosScene } from './features/gestion/Gestion';
import { Presentacion } from './features/presentacion/Presentacion';

export function App() {
  return (
        <Routes>
          <Route path="/" element={<Presentacion />} />
          <Route path="/demos" element={
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
                <Link to="/documentos?tour=1">14 <span>La carpeta documental<small>Estados, observaciones y correcciones</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/originales?tour=1">15 <span>El recorrido del original<small>Puntos, resguardo, seguimiento y devolución</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/practica?tour=1">16 <span>Practicar un poco cada día<small>Preguntas, explicaciones y repaso de errores</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/consultas?tour=1">17 <span>Hablar con contexto<small>Mensajes, cita, sala visual y resumen</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/gestion/rutas/residencia-demo?tour=1">18 <span>Configurar el proceso<small>Pasos, instrucciones, vista previa y revisión</small></span><b aria-hidden="true">↗</b></Link>
                <Link to="/gestion/cambios?tour=1">19 <span>Gestionar cambios y excepciones<small>Versiones, alcance y casos particulares</small></span><b aria-hidden="true">↗</b></Link>
              </div>
              <footer>Demo con datos ficticios · Propuesta de Pol Surriel<br /><Link to="/">← Volver a la presentación</Link></footer>
            </main>
          } />
          <Route path="/entrevista" element={<EntrevistaScene />} />
          <Route path="/opciones" element={<OpcionesScene />} />
          <Route path="/planes" element={<PlanesScene key="planes" />} />
          <Route path="/contratacion" element={<PlanesScene checkout key="contratacion" />} />
          <Route path="/expediente" element={<SeguimientoScene key="seguimiento" />} />
          <Route path="/expediente/pasos/documentacion" element={<SeguimientoScene detail key="documentacion" />} />
          <Route path="/documentos" element={<DocumentosScene />} />
          <Route path="/originales" element={<OriginalesScene />} />
          <Route path="/practica" element={<PracticaScene />} />
          <Route path="/consultas" element={<ConsultasScene key="consultas" />} />
          <Route path="/consultas/sala-demo" element={<ConsultasScene sala key="sala" />} />
          <Route path="/perfil" element={<PerfilScene />} />
          <Route path="/gestion/rutas" element={<RutasScene catalogo key="catalogo" />} />
          <Route path="/gestion/rutas/residencia-demo" element={<RutasScene key="editor" />} />
          <Route path="/gestion/cambios" element={<CambiosScene key="cambios" />} />
          <Route path="/gestion/expedientes/lucia-demo" element={<CambiosScene expediente key="excepcion" />} />
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
