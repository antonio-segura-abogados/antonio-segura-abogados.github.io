# Plan de las escenas de demostración

17 de septiembre de 2026. **Alcance corregido por Pol: una URL, una escena
autónoma.** Las 18 vistas previstas están cubiertas por 16 escenas, el índice de
demos y el detalle local de opciones. La home muestra la presentación completa. Relación con el papel: [plan editorial](../librito/PLAN-EDITORIAL.md).

## Decisión que prevalece sobre el planteamiento anterior

> El demo es cada url una pantalla, no pretendo hacer una aplicación funcional
> navegable. […] Las pages y urls del qr no tienen pq estar relacionadas.
> Obviamente estructura y reutilización de componentes necesitaremos.

El plan inicial proponía un recorrido conectado y estado global. Esa parte queda
sustituida: **no es necesario construir una aplicación completa, enlazar sus
secciones ni completar pantallas anteriores**. Cada QR abre el ejemplo que
explica su página del librito. Las URLs no se necesitan entre sí. La instrucción editorial posterior de Pol
es desarrollar las páginas en orden; esa es la secuencia de trabajo vigente.

Cada pantalla podrá tener interacciones locales, paneles, estados y tutorial si
ayudan a entender la propuesta. Por ejemplo, comparar planes en la misma escena
o abrir las instrucciones de una tarea. No se crea un flujo global de alta,
entrevista, compra y expediente. Un índice de muestras es una comodidad de revisión.

## Qué debe demostrar

Cómo se entenderían y utilizarían las ideas: entrevista inicial, alternativas,
acompañamiento, siguiente acción, documentos, práctica, consultas y configuración.
Cliente primero en móvil. El configurador puede usar escritorio con adaptación
móvil. React, TypeScript, Vite y HashRouter conservan la estructura ya elegida.

Se comparten diseño, componentes y definiciones que eviten duplicación. Los datos
iniciales y el estado pertenecen a cada escena. La coherencia editorial no exige
sincronización entre URLs, persistencia global ni una aplicación de producción.

## Caso ficticio y contenido

Lucía es el personaje de seguimiento; su expediente y documentos son ficticios.
Puede reutilizarse en otras escenas si resulta útil, sin obligación de representar
una única sesión que avance entre páginas. Cada estado se identifica por su propio
contexto. Se conservan fechas fijas y ejemplos precargados.

El perfil ilustrativo está fijado en `demo/entrada.json`: origen colombiano,
llegada en mayo de 2022 y residencia legal desde julio de 2023. Se contrastó
el artículo 22 del Código Civil y la información del Ministerio de Justicia. La entrevista distingue llegada a España de residencia
legal y admite «no lo sé». No certifica elegibilidad. El ejemplo no afirma que
exista elegibilidad confirmada ni promete un plazo de resolución.

Las tres tarjetas de opciones pueden mostrar una opción a valorar, una condicionada
y una de preparación/revisión. Otra posibilidad es mostrar tres perfiles distintos.
**No presentar «2 años con examen / 10 sin examen» como norma real**, ni confundir
requisitos, tiempo de resolución y plan comercial. No simular que pagar o contestar
preguntas provoca una aprobación inmediata.

## Catálogo de vistas implementadas

Son 18 vistas de producto para explicar ideas, **no una secuencia que deba completarse**.
Cada ruta que se implemente cargará directamente sus datos. Se podrán agrupar
estados secundarios en un panel de la misma escena cuando simplifique la muestra.
Los parámetros van dentro del fragmento: `…/#/entrevista?tour=1`.

| ID | URL o vista prevista | Qué muestra y qué se puede probar localmente | Papel / estado |
| --- | --- | --- | --- |
| V00 | `/demos` | Índice de muestras disponibles; `/` muestra el librito | 8, 24; implementado |
| V01 | `/entrevista` | Chat estructurado, objetivo, respuestas editables, rama «no lo sé» y resumen | 9; implementada |
| V02 | `/opciones` | Tres tarjetas; condiciones y estados de aplicabilidad | 10; implementada |
| V03 | `/opciones/:id` o panel | Detalle de una opción: requisitos, pasos, documentos y costes | 10; implementada |
| V04 | `/planes` | Dos planes, mensual/anual y total coherente | 11; implementada |
| V05 | `/contratacion` | Compra precargada, desglose y confirmación simulada | 11; implementada |
| V06 | `/expediente` | Home, una siguiente acción, recorrido, responsables y menú ilustrativo | 12; revisada con marco HTML/CSS |
| V07 | `/expediente/pasos/documentacion` | Instrucciones, dos documentos y aportación de ejemplo | 13; revisada con guía propia |
| V08 | `/documentos` | Recibido, revisión, subsanación y validado como estados diferentes | 14; implementada |
| V09 | `/originales` | Puntos ficticios, preparación, resguardo y tracking | 15; implementada |
| V10 | `/practica` | Sesión breve, correcciones explicadas y repaso | 16; implementada |
| V11 | `/consultas` | Hilo escrito, documentos de contexto y reserva ficticia | 17; implementada |
| V12 | `/consultas/sala-demo` o panel | Sala ilustrativa, controles y resumen | 17; implementada |
| V13 | `/perfil` | Perfil ficticio y preferencias locales | Apoyo; implementada |
| V14 | `/gestion/rutas` | Catálogo de plantillas y versiones | 18; implementada |
| V15 | `/gestion/rutas/residencia-demo` | Editor y previsualización en la misma escena | 18; implementada |
| V16 | `/gestion/cambios` | Cambio ficticio, diferencias, afectados y revisión jurídica | 19; implementada |
| V17 | `/gestion/expedientes/lucia-demo` | Excepción individual y previsualización local del cliente | 19; implementada |

Los detalles de opciones se muestran en un panel. Las rutas de gestión tienen
ejemplos concretos precargados. El menú de producto sigue siendo ilustrativo.
Los elementos decorativos no se presentan como enlaces activos sin destino.

## Estado de seguimiento y documentación

- `/expediente`: home, menú inferior ilustrativo, detalle en diálogo y guía de
  tres pasos. `?tour=1` abre la guía. También se puede abrir, cerrar y repetir.
- `/expediente/pasos/documentacion`: carga directamente el mismo componente de
  instrucciones con su propio estado. No depende de haber abierto la home.
- «Usar documento de ejemplo» cambia pendiente a recibido. La revisión sigue
  pendiente y no se marca como validado. No se solicitan archivos al usuario.
- «Reiniciar» restaura el estado local; una recarga también comienza de nuevo.
  No hay almacenamiento global ni sincronización entre escenas.
- Datos y textos: `recursos-compartidos/demo/seguimiento.json`, compartido con
  la maqueta del librito. Las páginas 12–13
  vigentes utilizan capturas reales de navegador dentro del marco HTML/CSS.
- TypeScript/build y pruebas interactivas con Chrome comprobados: recibido
  frente a revisado, reinicio, acceso directo y recarga. Guía también en el detalle.

## Entrevista, opciones y contratación

- `/entrevista`: objetivo, tres preguntas preparadas, fecha legal diferenciada
  de llegada, «No lo sé», resumen y edición. `?vista=objetivo` abre el selector inicial.
- `/opciones`: tres tarjetas con estados distintos. Cada una abre un detalle;
  elegir cambia solo el estado de esta escena. El contenido requiere revisión profesional.
- `/planes`: 19/29 € al mes o 190/290 € al año (ficticios, IVA incluido). Total
  en céntimos y equivalente mensual redondeado; gastos y trámites separados.
- La elección del plan abre un panel de resumen y confirmación simulada.
  `/contratacion` carga ese resumen directamente, con estado propio.
- Todas las entradas incluyen guía opcional, cierre, anterior/siguiente y reinicio.
- Marco y guías en `components/DemoScene.tsx`; datos comunes de los ejemplos en
  `recursos-compartidos/demo/entrada.json`. Estado con hooks locales.
- Probados casos relevantes y seis URLs a 320/390 px; capturas y registro en
  `librito/muestras/08-13-app/VERIFICACION-UI.json`.

## Tutoriales implementados

Guías breves, opcionales, repetibles, de 3–5 pasos. No avanzan por tiempo y no
requieren visitar otro capítulo. Botones visibles de cerrar, anterior y siguiente.
No tapar los controles descritos en móvil. Al terminar, permitir explorar o reiniciar
esa misma escena. La guía explica el valor del producto, no su infraestructura.

| Escena / páginas | Qué explica | Objetivo de duración, sin medir |
| --- | --- | --- |
| Entrevista / 9 | Responder, editar y entender el resumen | 60–90 s |
| Opciones / 10–11 | Condiciones, costes y planes; cada muestra con estado propio | 60–90 s |
| Seguimiento / 12–13 | Próxima acción, responsables e instrucciones | 45–60 s |
| Documentos / 14 | Aportar ejemplo y distinguir recibido de validado | 45–60 s |
| Originales / 15 | Preparar entrega, resguardo y seguimiento | 45–60 s |
| Práctica / 16 | Respuesta, explicación y repaso | 60 s |
| Consultas / 17 | Contexto, cita y resumen | 60 s |
| Configurador / 18–19 | Editar, previsualizar, revisar impacto y excepción | 90–120 s |

## Qué se simula

| Idea | Muestra local | Fuera del alcance |
| --- | --- | --- |
| Entrevista | Preguntas preparadas con ramificaciones | LLM, APIs y decisión jurídica automática |
| Compra | Precios ilustrativos y confirmación | Cobros, tarjetas y facturación real |
| Documentos | Archivos de ejemplo y estados locales | Recoger o enviar documentos personales |
| Originales | Lista o mapa esquemático y tracking ficticio | GPS, mensajería contratada y custodia real |
| Examen | Banco breve revisado y progreso de la sesión | Certificación, inscripción o banco completo |
| Consultas | Texto, agenda y sala ilustrativa | Mensajes enviados, cámara y micrófono |
| Normativa | Cambio ficticio identificado como tal | BOE en tiempo real e interpretación automática |
| Seguridad | Roles ilustrados cuando sean relevantes | Autenticación real o certificación de seguridad |

Mantener «Demo · datos ficticios» de forma discreta. No inventar integraciones
oficiales con AS, BOE, Cervantes u operadores de mensajería. Las fuentes y la
trayectoria de Pol son reales; no se mockea el contenido jurídico como si fuese ley.

Precios en una única tabla por escena, importes en céntimos, total anual exacto,
equivalente mensual etiquetado y cuota separada de trámites/tasas/gastos. La tanda 08–13
utiliza 19/29 € mensuales y 190/290 € anuales como ejemplos, con IVA incluido.

## Reutilización proporcionada al alcance

- `components/`: controles, estados, navegación ilustrativa y componentes visuales.
- `features/<escena>/`: pantalla y componentes específicos.
- `recursos-compartidos/demo/`: datos y textos que utilizan también las páginas.
- `App.tsx`: registro de las URLs de muestras; no gestor de un recorrido global.
- `recursos-compartidos/estilos/`: paleta y tipografía comunes.

Estado con hooks locales. Añadir un modelo compartido solo cuando dos componentes
lo necesiten; no anticipar un motor de expedientes, autenticación, backend o CRM.
Una escena puede contener su propio contexto/reducer si lo requiere su interacción.

El configurador es un caso especial: editor y previsualización **dentro de la
misma escena** usan la misma definición de pasos. No hace falta modificar otras
URLs. Versiones, vigencia, aprobación y excepciones pueden mostrarse con un ejemplo
pequeño: v1, borrador v2, dos expedientes ficticios y una condición sencilla.
Los expedientes existentes conservan su versión; una excepción individual no
modifica la plantilla de todos. No se promete adaptar cualquier norma sin código.

## Orden de desarrollo y comprobación

1. La UX de seguimiento se conserva; las maquetaciones 12–13 se han rechazado.
   Fijar la dirección del libro desde la apertura 2–3, siguiendo el orden de lectura.
2. Elegir sistema visual y componentes comunes que merezca la pena reutilizar.
3. Desarrollar las escenas al llegar a su capítulo del librito: entrevista,
   opciones/planes, documentos/originales, práctica, consultas, configurador.
4. Revisar cada URL de forma independiente: acceso directo, recarga, reinicio,
   contenido y móvil. Probar sus interacciones locales y su guía cuando existan.
5. Capturar las interfaces aprobadas, sustituir maquetas, publicar en la cuenta
   dedicada de GitHub Pages y generar los QR definitivos.

Pruebas según el riesgo: importes en compra; respuestas y corrección en práctica;
estados documentales; aislamiento de versiones en el configurador. No añadir
pruebas de un recorrido global que no se ha pedido. TypeScript/build al cambiar
código. Las comprobaciones futuras no se dan por ejecutadas.

## Acompañamiento y operación implementados

`acompanamiento.json` contiene documentos, puntos logísticos, práctica y consulta.
`gestion.json` contiene una ruta v1, un cambio ficticio v2 y dos expedientes.
Los datos alimentan escenas locales, sin sincronización entre URLs.

- Documentos: filtro, instrucciones de subsanación y copia recibida pendiente de revisión.
- Originales: punto, preparación, resguardo, incidencia, recepción y devolución.
- Práctica: cinco preguntas propias, explicación referenciada, puntos por respuesta y repaso de errores.
- Consultas: mensaje local, reserva ficticia, sala visual y resumen; sin cámara o micrófono.
- Perfil: preferencias locales, sin traducción ni notificaciones conectadas.
- Rutas: editor y vista cliente, orden y nuevo paso. Editar invalida la revisión; publicar conserva los casos abiertos.
- Cambios: aplicación explícita solo a Lucía, avance conservado, excepción individual con vista previa y cancelación del borrador.

Las diez nuevas URLs y las seis anteriores se han probado a 320/390 px. Registros:
[14–24](../librito/muestras/14-24-cierre/VERIFICACION-UI.json) y
[08–13](../librito/muestras/08-13-app/VERIFICACION-UI.json).

## Presentación en la home

`/` muestra las 24 páginas seleccionadas como imágenes optimizadas. Hay flechas,
teclado, miniaturas, índice, ampliación, texto accesible y PDF descargable. La
URL `/#/?pagina=14` permite abrir directamente una página. Su botón contextual
abre la demo asociada; todas mantienen sus rutas QR anteriores. No se inserta un
visor PDF. `/demos` conserva el índice de experiencias.

El [compilador](../librito/COMPILAR.md) produce las imágenes a partir de la misma
selección que los `index` y el PDF. GitHub Actions regenera y publica con cada
push a `main`. La revisión de Pol y la prueba física siguen pendientes.
