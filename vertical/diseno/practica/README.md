# Práctica CCSE: estructura de cuatro modos

Implementación local del 18-09-2026, según las indicaciones de Pol después de
preparar el [banco de 300 preguntas](../../../recursos-compartidos/ccse/README.md).
URL conservada: `/#/practica`. Esta revisión sigue pendiente de publicación.
Las capturas del librito se renovaron el 18-09-2026. Pol aprobó y seleccionó
`02-tres-momentos` para la página 16: entrada actual, ruta con su icono de
sección y una respuesta comprobada. `01-habito` se conserva como alternativa.
La mejora detallada de la UX de los
cuestionarios y del examen queda para la siguiente fase con Pol.

## Recorridos

- **Ruta de aprendizaje:** galería ilustrada de 20 secciones, una por temática, y camino
  visual con nodos para cada tema y un repaso final. Las 34 subcategorías se
  convierten en temas. Las 9 secciones sin subcategorías tienen un tema único
  con el nombre de la sección. Resultado: 43 cuestionarios de tema y 20 repasos
  finales. Cada cuestionario incluye todas las preguntas de su tema; el repaso
  final reúne todas las de la sección, en orden aleatorio. Todos los pasos son
  accesibles. Completar un paso significa responder todo su cuestionario;
  no presupone haber acertado todas las respuestas ni equivale a aprobar un
  examen. Los errores siguen pendientes para el repaso inteligente.
- **Repaso por temáticas:** cuadrícula de 20 temas con número de preguntas y
  progreso. Abre todas las preguntas de la temática, barajadas y sin duplicar.
- **Repaso inteligente:** introducción con 5 minutos de estudio y hasta 10
  preguntas. Prioriza respuestas falladas, repasos vencidos, preguntas nuevas y,
  por último, preguntas acertadas cuyo repaso todavía no vence. Dentro de cada
  nivel, atiende antes las más antiguas. Sin historial empieza con una muestra
  aleatoria del banco. El límite de tiempo empieza al iniciar; se puede terminar
  antes y el temporizador cierra la sesión a los 5 minutos.
- **Simulacro de examen:** aviso «Reserva 30 minutos» y mensaje «¡Si apruebas,
  estás listo para presentarte!». Selecciona 25 preguntas de todo el banco con
  el reparto de las cinco tareas oficiales: 10/3/2/3/7. La muestra representa
  las cinco tareas; no contiene las 300 preguntas a la vez ni garantiza incluir
  las 20 temáticas en cada intento. Permite revisar respuestas y las corrige al
  finalizar; 15 aciertos dan aprobado. El cronómetro cierra a los 30 minutos,
  por petición de Pol. La introducción distingue esta duración de los 45 minutos
  permitidos en la prueba oficial.

Formato, reparto, calificación y duración oficial contrastados el 18-09-2026
con [Cómo es la prueba CCSE, Instituto Cervantes](https://examenes.cervantes.es/es/ccse/como).

## Iconos de temáticas: integrados

Pol pide después una presentación más amigable, con iconos grandes y coherentes,
y solicita un prompt para generarlos en otro entorno. Preparado
[PROMPT-ICONOS-TEMATICAS.md](PROMPT-ICONOS-TEMATICAS.md): encargo autosuficiente
con un concepto por cada una de las 20 temáticas, paleta de la app, reglas de
estilo, tamaños y nombres de archivo asociados a los identificadores del JSON.
La lista aportada por Pol contenía 19; se incluye también **Constitución e
instituciones**, la primera del banco. Este encargo corresponde a las temáticas
o secciones, no a los 43 cuestionarios de tema de la ruta.

Pol entrega después [`familia-iconos-ccse.zip`](familia-iconos-ccse.zip), con los
20 SVG nativos, 20 PNG transparentes, lámina y manifiesto. Se extraen los SVG
sin alterar a la carpeta compartida de
[iconos CCSE](../../../recursos-compartidos/assets/ccse/tematicas/README.md).
Los PNG y los documentos de entrega permanecen en el ZIP original.

**Implementado localmente el 18-09-2026:** el desplegable de secciones se
sustituye por «Explorar secciones», que abre una galería de tarjetas con iconos
grandes, nombres, número de temas y progreso. Elegir una tarjeta abre su ruta;
«Mi ruta» regresa a la sección actual. Esta se destaca visualmente en la galería.
La cabecera de cada ruta tiene su ilustración grande sobre azul suave, y el
acceso a la siguiente sección anticipa su icono. El repaso por temáticas usa
la misma familia y diseño de tarjetas, con preguntas practicadas como progreso.

Iconos de 128 px en las galerías (112 px hasta 360 px de ancho), 144 px en la
cabecera y 64 px en la siguiente sección. SVG originales, sin pérdida al ampliar;
fondo, numeración, estado y texto pertenecen a la interfaz. Las imágenes no
duplican el nombre al usar lectores de pantalla. El camino mantiene sus nodos
de tema y el trofeo de repaso final. Revisión de Pol y publicación pendientes.

## Historial y estado

### Racha del cuestionario

El preguntador de ruta, temáticas y repaso inteligente incorpora una racha de
aciertos consecutivos que solo vive en esa sesión. Al comprobar, un acierto
suma uno y un fallo la reinicia a cero. La selección por sí sola no suma y
una pregunta comprobada no puede contarse otra vez. Al salir, terminar o
recargar desaparece; otra sesión empieza desde cero. No se guarda esta racha
en el historial ni se muestra en la entrada, la ruta o los resultados.

La descarga tiene cinco niveles: 1–2, 3–4, 5–7, 8–11 y 12 o más aciertos.
Aumentan los rayos (6, 9, 12, 15 y 18), su alcance, el pulso y la duración del
resplandor. Los dos últimos niveles añaden dorado a la paleta de marca.
Al fallar, una sacudida horizontal breve y un único destello rojo acompañan
la corrección. Con movimiento reducido se conservan contador, texto y colores,
sin animaciones. Los efectos no interceptan pulsaciones ni retrasan el avance.

El simulacro mantiene la corrección al entregar y no revela aciertos mediante
rachas durante el examen. Por petición expresa de Pol, **cada pregunta escribe
su código, opción y respuesta correcta en `console.log`**, también en simulacro,
con el prefijo `[CCSE · prueba]`. Se imprime al mostrar la pregunta, no en cada
render ni en los ticks del temporizador. Este apoyo de pruebas está activo
también en la compilación de producción hasta que se pida retirarlo.

Implementación en `Cuestionario.tsx`, `RachaCuestionario.tsx` y `racha.css`.
Prueba reproducible: `node vertical/diseno/practica/verificar-rachas.mjs`.
Verificación completada en Chrome, con compilación correcta:
[informe](VERIFICACION-RACHAS.json), [racha de 12](racha-12.png),
[fallo](racha-fallo.png) y [móvil de 320 px](racha-ancho-320.png).
Probados doce aciertos, fallo y recuperación, nueva sesión, recarga, resultado,
simulacro y movimiento reducido; sin errores JavaScript ni desbordamientos.

### Progreso guardado

La entrada muestra un medidor circular de preparación junto al titular. Cuenta
las preguntas cuyo último intento fue correcto respecto al total del banco.
Por petición de Pol se retira el texto visible con las preguntas pendientes.
Una pregunta fallada después de acertarla vuelve a pendientes. El porcentaje
se redondea hacia abajo. Este indicador refleja avance de estudio, no una
probabilidad de aprobar. Reutiliza el historial local y se vacía al reiniciar.

Se guardan intentos, aciertos, racha, última respuesta y fecha del siguiente
repaso por pregunta, además de los pasos completados. Los intervalos tras
aciertos sucesivos son 1, 3, 7, 14 y 30 días. Un fallo vuelve a poner la pregunta
pendiente. Es una heurística local de repetición espaciada, no un servicio de IA
ni una predicción validada de resultados.

Clave de almacenamiento: `as-practica-ccse-2026-v1`. Estado exclusivo de práctica,
sin sesión global ni sincronización. La recarga conserva historial y ruta; un
cuestionario o simulacro en curso no se reanuda después de recargar. Reiniciar
borra el historial de esta escena. Si el navegador impide guardar, la sesión
continúa en memoria y la pantalla informa del alcance de esa conservación.

En práctica, cada comprobación registra una respuesta; abandonar conserva las
ya comprobadas pero no completa el paso. En examen se registra el conjunto al
entregar; salir antes lo descarta y pide confirmación. Las respuestas en blanco
no suman puntos y pasan a pendientes de repaso al entregar. Se pide confirmación
para entregar un examen incompleto. Los temporizadores usan una hora límite,
también al volver de una pestaña suspendida.

## Archivos y pruebas

- `src/features/acompanamiento/Practica.tsx`: entrada y recorridos.
- `src/features/practica/`: selección de preguntas, progreso, cuestionario base,
  símbolos de interfaz y estilos de esta escena. `IconoTematica.tsx` conecta
  los SVG de la carpeta compartida con los identificadores del banco.
- El `App` carga práctica y su banco al abrir la ruta, sin añadirlos a la carga
  inicial de la presentación.
- Se reutiliza `SceneDialog` mediante el parámetro `dialog` de `DemoScene` para
  que los avisos permanezcan dentro del marco del móvil en escritorio.

Desde `as-abogados/`:

```sh
npm run build
node --test vertical/pruebas/practica.test.mjs
node vertical/diseno/practica/verificar.mjs
```

Las pruebas del modelo usan el compilador `esbuild` disponible con Vite.
La prueba de interfaz usa Chrome con perfil temporal y el Playwright externo
ya usado por los scripts locales del proyecto, en `/private/tmp/asa-browser/`.
Un argumento de URL o `ASA_DEMO_URL` permite probar otro servidor local. Las capturas de esta carpeta
son evidencias de revisión de la estructura; no sustituyen las imágenes
editoriales del librito.

## Verificación realizada

Verificación repetida tras integrar los iconos: TypeScript y compilación Vite
correctos; 8 pruebas del modelo superadas. La
[comprobación en Chrome](VERIFICACION.json) recorre las 20 secciones y las 20
temáticas, completa temas y repasos, recarga el progreso, comprueba la prioridad
de un error previo en el repaso inteligente y entrega un simulacro con 15 aciertos.
También verifica entrega en blanco, salida, Escape, diálogos dentro del móvil,
reinicio y expiración automática con avance del reloj. Sin errores JavaScript
ni desbordamientos horizontales a 320, 390 y 768 px. Escritorio revisado a
1100 px. Se comprueba la carga de los 20 SVG distintos en ambas galerías, sus
tamaños mínimos, el icono de la sección elegida, la marca de sección completada
y los nombres largos. Se utilizó una instancia limpia en `http://127.0.0.1:5177`, porque el
servidor anterior conservaba una referencia de módulo obsoleta ajena a práctica.

Capturas revisadas: [entrada móvil](09-inicio-movil.png),
[ruta completa](10-ruta-movil.png),
[galería de secciones](11-secciones-escritorio.png),
[selector de temas](03-tematicas-escritorio.png),
[repaso inteligente](05-inteligente-escritorio.png) y
[introducción del simulacro](06-simulacro-escritorio.png).
Capturas móviles completas de las nuevas galerías:
[secciones](12-secciones-movil.png) y [temáticas](13-tematicas-movil.png).
