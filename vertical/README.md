# Escenas de demostración

La demo usa React, TypeScript, Vite y HashRouter. **Cada URL es una escena
autónoma**: no hay obligación de navegar por una aplicación funcional ni de
completar pantallas anteriores. Se comparten componentes y estilos.

El [plan de demo](PLAN-DEMO.md) registra 18 vistas propuestas, interacciones
locales. Por petición de Pol (18-09-2026), todas las guías paso a paso están retiradas. La **home muestra las 24 páginas del librito** con un
visor propio de imágenes: flechas, teclado, miniaturas, índice, ampliación,
texto accesible y descarga de PDF. `/#/?pagina=14` abre una página concreta.
«Ampliar» abre la vista independiente `/#/presentacion?pagina=14`, ajustada al
ancho y alto disponibles, con zoom opcional, navegación y vuelta a la página
elegida en el inicio. En ambas vistas, pulsar una diapositiva con QR abre su
destino en otra pestaña; los enlaces se contrastan con el registro de QR.
Los destinos del dominio público de esta demo se adaptan al origen y puerto
local al navegar desde localhost o loopback. En GitHub Pages mantienen su URL
publicada. Las rutas, parámetros y fragmentos se conservan, y los dominios
externos no se modifican.
El índice de escenas está en `/#/demos`. Muestras implementadas:

- `/#/entrevista`: empieza por elegir objetivo, continúa con preguntas y resumen editable.
  Es la escena de registro: no muestra el encabezado con logo y avatar. Reiniciar
  vuelve a la elección de objetivo. Preguntas condicionales sobre ubicación,
  entrada, situación actual y contexto; [criterio y fuentes](diseno/entrevista/CRITERIO.md).
- `/#/opciones`: tres estados de orientación, detalle y selección local.
- `/#/planes`: dos planes, mensual/anual, desglose y confirmación simulada.
- `/#/contratacion`: entrada directa al resumen del plan Acompañado.
- `/#/expediente`: home, detalle en diálogo y reinicio.
- `/#/expediente/pasos/documentacion`: instrucciones y documentos de ejemplo,
  accesibles directamente con su propio estado.
- `/#/documentos`, `/#/originales` y `/#/practica`: carpeta, logística y sesión de estudio.
- `/#/consultas` y `/#/consultas/sala-demo`: conversación, cita, sala visual y resumen.
  Sin cabecera ni franja de contexto. La llamada ocupa toda la pantalla de la app
  (interior del marco en ordenador, viewport en móvil), con controles superpuestos
  y sin menú ni pestañas. Colgar vuelve al resumen; cámara y micrófono son simulados.
- `/#/perfil`: preferencias ficticias.
- `/#/gestion/rutas` y `/#/gestion/rutas/residencia-demo`: catálogo y editor.
- `/#/gestion/cambios` y `/#/gestion/expedientes/lucia-demo`: impacto y excepción individual.
- `/#/demos`: índice. Las rutas desconocidas tienen su propia pantalla.

El menú inferior es ilustrativo. La acción documental usa un ejemplo y deja
la revisión pendiente; no recoge archivos. No hay estado global entre escenas.
La recarga y el reinicio restauran cada escena, salvo el historial de estudio
de `/practica`, que se conserva en este dispositivo hasta usar Reiniciar.
Los enlaces ya generados con
`?tour=1` siguen funcionando, pero no muestran tutoriales. El índice facilita revisar ejemplos autónomos.
La [tanda 08–13](../librito/muestras/08-13-app/README.md) utiliza capturas reales
del marco HTML/CSS compartido con estas escenas. El diseño anterior de seguimiento
se conserva como antecedente en `diseno/seguimiento/`.

Ejecutar `npm ci`, `npm run dev` y `npm run build` desde `../`.
Para publicar, ejecutar `npm run build:pages` desde esa misma carpeta. El lockfile está
allí; no generar otro aquí. TypeScript/build y pruebas interactivas locales
verificados con Chrome: respuestas desconocidas/edición, importes, confirmación,
documentos, acceso directo, recarga y guías a 320/390 px. Ver
[registro de revisión](../librito/muestras/08-13-app/VERIFICACION-UI.json).

## Backoffice CRM · revisión del 18-09-2026

Las cuatro escenas de gestión anteriores se han integrado en **AS Workspace**,
un CRM mockeado a pantalla completa. Se conservan sus URL; `/gestion` abre la
vista general. Menú lateral y cabecera comunes conectan expedientes, tareas,
documentos, conversaciones, rutas, cambios y equipo. Constructor y Control de
cambios comparten componentes estructurales, estados y diálogos.

El CRM mantiene su estado de muestra al navegar entre vistas. Cada URL permite
entrada directa; recargar, salir del CRM o Reiniciar restaura los datos.
Esta ampliación responde a una petición explícita de Pol y no introduce sesión
global en las escenas de cliente. No hay backend ni operaciones externas.

Ver [alcance, límites y verificación](diseno/crm/README.md). TypeScript/build,
40 comprobaciones responsive y flujos principales revisados en Chrome.
Capturas editoriales de 18–19 actualizadas al CRM completo, junto con el PDF
y el visor local. Pendientes valoración visual y publicación.
Los informes anteriores y scripts basados en `.workspace-frame` corresponden
al diseño de gestión anterior.

## Entrevista y verificación actual

Las preguntas ya no asumen una residencia legal ni respuestas de Lucía. El
recorrido distingue exterior/España, ciudadanía europea, menores, visita,
estudios, residencia, autorizaciones vencidas, solicitudes y protección.
El objetivo añade regularización. El resumen se adapta a la rama; corregir una
respuesta permite volver directamente al resumen y elimina solo las ramas que
dejan de corresponder. Las preguntas nuevas aparecen pendientes y se completan
desde el resumen, sin repetir el recorrido. Editar trabaja en un borrador que
se aplica al volver al resumen; cancelar conserva las respuestas previas.
Provincia, países, autorizaciones y nacionalidades son selectores con búsqueda;
nacionalidades admite varias selecciones. Se deriva de
ellas la ciudadanía, sin una segunda pregunta, y se excluye España al solicitar
la nacionalidad española. El cierre ofrece edición y confirmación/envío simulado.
Las decisiones y sus fuentes oficiales
están en [CRITERIO.md](diseno/entrevista/CRITERIO.md).

La [auditoría del árbol](diseno/entrevista/REVISION-COHERENCIA.md) documenta los
problemas corregidos, el control elegido para cada campo y los límites de la demo.
`node vertical/diseno/entrevista/auditar.mjs` comprueba 41 casos y 7.776 cruces del
modelo; `node vertical/diseno/entrevista/verificar.mjs` recorre esos 41 casos a
1440 y 390 px, más controles a 320 px, edición, cancelación, fechas y confirmación.
[Informe actual de entrevista](diseno/entrevista/VERIFICACION-UI.json).
Usa Chrome con perfil temporal y Playwright externo. El script general de
`diseno/movil/` reutiliza esta comprobación y añade las escenas y modales.
No regenera imágenes del librito.

## Marco y diálogos

La pantalla del móvil tiene un único recorte interior redondeado, compartido por
la barra superior, el contenido, el menú y la barra inferior. El contenido no
invade el bisel en las esquinas inferiores. Los diálogos de cliente se pasan al
marco mediante `dialog` y se muestran en una capa dentro de esa pantalla, con su
propio desplazamiento, fondo atenuado, Escape, foco contenido y retorno al botón
que los abrió. En móvil real se ajustan al viewport; los paneles de gestión y el
índice del libro conservan sus diálogos nativos. La ampliación del libro usa
una vista independiente, sin modal.

Estos ajustes y la retirada de tutoriales están implementados localmente el
18-09-2026; su publicación está pendiente.

## Recursos

El [banco CCSE 2026](../recursos-compartidos/ccse/README.md) está integrado en
`/practica`: ruta de 20 secciones con temas y repasos finales, selector de
temáticas, repaso inteligente de 5 minutos y simulacro de 30 minutos. Progreso
local guardado por pregunta y paso de la ruta, sin backend. El banco se carga
al entrar en esta escena. La pequeña muestra de `acompanamiento.json` queda como
antecedente y ya no alimenta la vista. Ver [criterios y verificación](diseno/practica/README.md).
Estructura implementada el 18-09-2026; UX detallada de los cuestionarios pendiente
de las próximas instrucciones de Pol. Publicación pendiente.
Las secciones y el repaso por temáticas incorporan los 20 iconos SVG entregados
por Pol: galerías con ilustraciones grandes, progreso visible y cabecera
ilustrada de cada sección. Originales en
[`assets/ccse/tematicas`](../recursos-compartidos/assets/ccse/tematicas/README.md).
Integración local verificada a 320, 390, 768 y 1100 px; publicación pendiente.

La aplicación importa directamente los estilos y assets necesarios desde
`../recursos-compartidos/`. Vite los empaqueta y ajusta sus URLs en `dist/`.
No se copia toda la carpeta de investigación, anexos o fuentes TTF al sitio.
La presentación publica los renders vigentes, incluidas las páginas de CV y fotos,
por petición de Pol. El PDF original de LinkedIn y los demás anexos no se copian al sitio.
Las fuentes WOFF2 se sirven localmente, sin depender de Google Fonts al visitar
la demo.
La compilación incluye automáticamente la licencia de la fuente en
`dist/licencias/PlusJakartaSans-OFL.txt`, tomada del original compartido.

## Direcciones permanentes para QR

Se usa `HashRouter`. Las escenas conservan sus URLs en el registro de QR.
El QR general abre la nueva presentación, con acceso a las demos. La prueba
física sigue pendiente. Ver [compilación y selección](../librito/COMPILAR.md).

La base relativa de Vite (`./`) y las rutas con `#` permiten que el mismo
contenido compilado funcione en una raíz o subcarpeta de GitHub Pages.
URL pública de la escena de seguimiento:

```text
https://antonio-segura-abogados.github.io/#/expediente
```

Después de imprimir un QR, conservar su ruta. Si una pantalla cambia de sitio,
añadir una redirección en la aplicación. No renombrar la cuenta/repositorio
sin una estrategia para conservar los enlaces impresos.

## Publicación en GitHub Pages

La fuente de Pages se ha cambiado a **GitHub Actions**. El workflow
`../.github/workflows/publicar.yml` instala dependencias, compila el librito y
la web y publica `docs/` con cada push a `main`. No depende de que un PNG o un
PDF compilado se actualice a mano antes del push.

```sh
npm run build:book  # renders index por slide + librito-final.pdf + imágenes web
npm run build:pages # lo anterior y compilación web
```

La preparación de Python y el cambio de variante están en
[COMPILAR.md](../librito/COMPILAR.md). `npm run build` sigue siendo la compilación
web local, usando los derivados de la última compilación del librito.
La carpeta `docs/` es una salida, no se edita a mano. Pages recibe ese mismo
contenido como artefacto de Actions; no ejecuta Vite por su cuenta.

La demo de 16 escenas se ha comprobado con Chrome. El visor de 24 páginas se
ha probado a 320, 390, 768 y 1440 px: navegación, recarga, índice, ampliación,
PDF, lectura accesible y acceso a la escena contextual. Registros en
`diseno/presentacion/`. No había navegador integrado conectado; se utilizó
Chrome con perfil temporal.

Referencias consultadas el 14-09-2026:
[despliegue estático de Vite](https://vite.dev/guide/static-deploy),
[base relativa de Vite](https://vite.dev/guide/build#relative-base),
[assets de Vite](https://vite.dev/guide/assets) y
[HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter).

## Presentación publicada y comprobada

Primera compilación automática completada desde `1099bfb`. La
[prueba en la URL pública](diseno/presentacion/VERIFICACION-PUBLICA.json) recorre
las 24 páginas, descarga el PDF, prueba índice/teclado/ampliación y abre las
16 escenas con su guía. Anchos de 320, 390, 768 y 1440 px; sin errores JS ni
recursos fallidos. El PDF publicado conserva exactamente el render, texto y
enlaces del local; los hashes binarios pueden diferir entre macOS y Linux.
