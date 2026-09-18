# Primera entrevista de extranjería

Revisión del 18-09-2026. Petición de Pol: investigar y sustituir las tres
preguntas genéricas por una entrevista que entienda primero dónde está la
persona, cómo llegó y cuál es su situación. Implementación local en
`src/features/entrada/cuestionario.ts` y `Entrevista.tsx`.

La [segunda revisión de coherencia](REVISION-COHERENCIA.md), solicitada antes
de la prueba de Pol, documenta 18 problemas corregidos y la validación actual:
41 casos completos en dos anchos de navegador y 7.776 cruces del modelo.

## Decisión de producto

La entrada es una elección de objetivo, sin cabecera de usuario identificado.
El formulario recoge contexto para una primera revisión profesional. No declara
regularidad, elegibilidad, concesiones ni una vía de arraigo concreta. Las
preguntas son de redacción propia; la secuencia y las ramas son una decisión de
diseño basada en las distinciones de las fuentes oficiales siguientes.

No se rellenan respuestas con el perfil ficticio de Lucía. Se pueden probar
situaciones distintas en la misma escena. Se mantienen respuestas desconocidas,
resumen editable y reinicio. Ningún dato se envía ni se guarda al recargar.

## Orden y motivos

| Bloque | Preguntas y uso |
| --- | --- |
| Objetivo | Nacionalidad, residencia, regularizar la situación o reunirse con familiares. Regularización aparece expresamente como motivo de consulta. |
| Ubicación | Si está en España; provincia si está aquí o país actual si está fuera. Estar fuera no descarta una residencia española; el domicilio habitual y la competencia consular se confirmarían después. |
| Nacionalidades y edad | Todas las nacionalidades; ciudadanía española, UE/EEE/Suiza o de otros países. Mayoría de edad o representación del menor. No se deduce la ciudadanía solo del país de nacimiento. |
| Atención prioritaria | Antes del historial migratorio: notificaciones, requerimientos, denegaciones u órdenes de salida, tipo y fecha si se conocen. No se calculan recursos o plazos automáticamente. |
| Entrada | Para personas de terceros países que están aquí, incluidos menores: visado de visita, exención, autorización, Schengen, entrada sin documentación exigida o haber vivido siempre en España. Si hubo regreso desde el extranjero, se recoge esa llegada aunque haya nacido aquí. Schengen abre una pregunta sobre documentación. |
| Situación actual | Visita autorizada o terminada; residencia temporal, larga duración/permanente; estudios; permiso vencido; ausencia de autorización; protección. Una solicitud pendiente se recoge aparte y puede coexistir con esas situaciones. |
| Fechas y expedientes | Visita: fin de estancia e historial de viajes. Permiso temporal: tipo, vencimiento y renovación. Larga duración: tarjeta física. Otra solicitud: tipo y presentación. Protección: estado. Para nacionalidad, se pregunta por inicio de la residencia declarada; si un europeo no declara registro, se pregunta por llegada sin equipararla a residencia legal. |
| Permanencia y contexto | Cuando procede: ausencias, pruebas de permanencia y autorizaciones anteriores. Familia, parentesco, nacionalidad y convivencia; trabajo, estudios o medios según objetivo y situación. |
| Familia | Familiar principal: parentesco, ubicación, nacionalidades, edad y situación si corresponde. Dependencia entre adultos. Vivienda y medios solo en el contexto de residente adulto de tercer país que quiere traer a un familiar del exterior. Otros familiares se indican aparte. |
| Nacionalidad | Contexto adicional: nacimiento, matrimonio, ascendientes españoles o protección reconocida, con fechas conocidas. No se convierte la fecha de llegada en tiempo de residencia legal. |

## Distinciones documentadas

- **Entrada sin visado frente a entrada irregular.** Hay nacionalidades exentas
  de visado de corta estancia. La entrevista las ofrece como respuestas
  diferentes y no llama «ilegal» a una persona. La visita, además, requiere
  revisar el historial de estancias; no basta con mirar la última llegada.
  Fuentes: [Exteriores: condiciones de entrada](https://www.exteriores.gob.es/Consulados/washington/en/ServiciosConsulares/Paginas/Consular/Condiciones-de-entrada-en-Espana.aspx)
  y [clasificación consular de visados](https://www.exteriores.gob.es/Consulados/buenosaires/es/ServiciosConsulares/Paginas/TramitesConsulares/Visados.aspx).
- **Estancia, residencia y solicitud pendiente.** Las hojas oficiales parten
  de situaciones diferentes; no se pregunta por una residencia legal que la
  persona no ha declarado tener. Fuente: [Hojas informativas de Migraciones](https://www.inclusion.gob.es/es/web/migraciones/hojas-informativas).
- **Ciudadanía de la Unión.** Se pregunta por registro y contexto propio,
  sin llevar a la persona por las preguntas de visado de turismo. Fuente:
  [Policía: certificado de registro](https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_certificadoregistro_ciudadanoue.php).
- **Regularización.** Permanencia, vínculos, empleo y autorizaciones previas
  pueden requerir revisión. La app no asigna automáticamente un arraigo ni
  anuncia campañas o ventanas de solicitud. Tampoco equipara un permiso vencido
  con una renovación pendiente a una ausencia de autorización. Fuente:
  [Reglamento de Extranjería, texto consolidado](https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099),
  en particular residencia, renovaciones y artículos 124–127.
- **Protección internacional.** Se recoge por separado si hay solicitud,
  concesión o procedimiento finalizado. No se solicita un relato de persecución
  ni se sugiere renunciar al asilo para obtener otra autorización. Fuente:
  [Interior: procedimientos de protección internacional](https://sede.interior.gob.es/portal/sede/tramites).
- **Vínculos familiares.** La primera pregunta no se limita a «casada con
  español». Incluye parentesco, nacionalidad, convivencia, ubicación y
  dependencia, sin adjudicar un régimen. Fuentes: [familiares de españoles](https://www.inclusion.gob.es/es/web/migraciones/w/18.-autorizacion-de-residencia-temporal-de-familiares-de-personas-con-nacionalidad-espanola)
  y [reagrupación familiar](https://www.inclusion.gob.es/web/migraciones/reagrupacion-familiar-traer-a-sus-familiares-).
- **Nacionalidad.** La residencia requerida es legal y continuada; existen
  distintos supuestos. Se recogen fechas, ausencias y vínculos para revisión,
  sin convertirlos en un resultado automático. Fuentes: [Justicia](https://www.mjusticia.gob.es/es/ciudadania/tramites/nacionalidad-residencia)
  y [artículo 22 del Código Civil](https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763#art22).

## Implementado y límites

Una pregunta por pantalla, con ayuda breve y opciones comprensibles. No se
promete un número fijo de preguntas antes de conocer la rama. El resumen muestra
solo las preguntas pertinentes y los asuntos a revisar. Cambiar una respuesta
anterior conserva las respuestas que siguen siendo pertinentes y elimina las
ramas que desaparecen. «Volver al resumen» evita repetir el cuestionario. Las
preguntas nuevas aparecen pendientes, con acceso directo para responder;
confirmar requiere haber contestado o marcado «No lo sé» en cada una.
La edición usa un borrador hasta pulsar «Volver al resumen»; también puede
cancelarse. Quitar y reponer una nacionalidad durante la edición no borra datos.

Provincia usa las 50 provincias y las dos ciudades autónomas del
[catálogo del INE](https://www.ine.es/daco/daco42/codmun/cod_provincia.htm).
Nacionalidades permite seleccionar varios países y retirar cada selección.
Los 196 países proceden de la [lista estándar del INE](https://www.ine.es/daco/daco42/clasificaciones/paisesyterritorios.xls),
edición 10-12-2024, consultada el 18-09-2026. Se añaden apatridia y nacionalidad
no incluida (con un campo para indicarla), sin forzar una elección incorrecta.
Se busca sin distinguir tildes ni mayúsculas, y con alias habituales. Los códigos
se guardan solo en el estado local y el resumen muestra los nombres.
País actual, país del familiar y tipo de permiso también usan selectores.
Trámite pendiente, notificación y parentesco usan opciones; los vínculos y
medios admiten selección múltiple. Las opciones «ninguno» o «no lo sé» excluyen
las demás. Solo las aclaraciones y datos variables conservan texto libre.

La selección determina ciudadanía española, UE/EEE/Suiza u otra; desaparece
la pregunta redundante. Por petición de Pol, España no se ofrece en el objetivo
de obtener nacionalidad española y sí en otros, como reunión familiar.
Agrupación contrastada con [Estados miembros de la UE](https://eur-lex.europa.eu/EN/legal-content/glossary/member_states.html),
[EEE](https://eur-lex.europa.eu/EN/legal-content/glossary/european-economic-area-eea.html)
y [Your Europe](https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_en.htm).
Esto ordena preguntas; no determina un derecho ni una vía aplicable.

El resumen termina con «Editar mis respuestas» y «Confirmar y enviar». La segunda
acción lleva a una confirmación expresamente de demostración: no hay backend,
envío, almacenamiento persistente ni comunicación al despacho.

El formulario no es un cuestionario jurídico exhaustivo. Antecedentes penales,
prueba documental, medios exactos, seguro, requisitos particulares y situaciones
sensibles se revisarían después según el procedimiento y por un profesional.
Los casos de menores y ciudadanía española tienen una primera recogida de
contexto, no una simulación del procedimiento completo.

Se han consultado las fuentes vigentes accesibles el 18-09-2026. No se codifican
umbrales ni conclusiones sobre procedimientos extraordinarios de 2026; sus
cambios y posibles efectos judiciales requieren una revisión propia antes de
plantear una vía al cliente. No hay promesas de autorización ni plazos de concesión.

Pruebas reproducibles desde `as-abogados/`: `node vertical/diseno/entrevista/auditar.mjs`
para el modelo y `node vertical/diseno/entrevista/verificar.mjs` para el navegador.
Incluyen 41 situaciones del cuestionario en ordenador y móvil, corrección y
cancelación de ediciones, respuestas desconocidas y confirmación. Los selectores
se comprueban a 1440, 390 y 320 px. Informes: [modelo](AUDITORIA.json) y
[navegador](VERIFICACION-UI.json). El script general de móvil reutiliza los casos.
Las capturas de las páginas vigentes 8–17 y el librito se han regenerado por
petición de Pol; las muestras acumuladas anteriores conservan su carácter histórico.
