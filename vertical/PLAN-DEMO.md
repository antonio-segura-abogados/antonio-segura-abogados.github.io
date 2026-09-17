# Plan de las escenas de demostración

17 de septiembre de 2026. **Alcance corregido por Pol: una URL, una escena
autónoma.** Se han desarrollado las primeras muestras de seguimiento y detalle;
las demás vistas son propuestas. Relación con el papel: [plan editorial](../librito/PLAN-EDITORIAL.md).

## Decisión que prevalece sobre el planteamiento anterior

> El demo es cada url una pantalla, no pretendo hacer una aplicación funcional
> navegable. […] Las pages y urls del qr no tienen pq estar relacionadas.
> Obviamente estructura y reutilización de componentes necesitaremos.

El plan inicial proponía un recorrido conectado y estado global. Esa parte queda
sustituida: **no es necesario construir una aplicación completa, enlazar sus
secciones ni completar pantallas anteriores**. Cada QR abre el ejemplo que
explica su página del librito. El orden de desarrollo depende de la idea que se
quiera mostrar; empezar por la home no es un requisito arquitectónico.

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

Antes de desarrollar opciones jurídicas habrá que fijar el perfil ilustrativo y
contrastar su contenido. La entrevista distingue llegada a España de residencia
legal y admite «no lo sé». No certifica elegibilidad. La propuesta anterior de
origen colombiano y sin vínculo matrimonial con español sigue siendo una hipótesis.

Las tres tarjetas de opciones pueden mostrar una opción a valorar, una condicionada
y una de preparación/revisión. Otra posibilidad es mostrar tres perfiles distintos.
**No presentar «2 años con examen / 10 sin examen» como norma real**, ni confundir
requisitos, tiempo de resolución y plan comercial. No simular que pagar o contestar
preguntas provoca una aprobación inmediata.

## Catálogo de vistas propuestas

Son 18 vistas para explicar ideas, **no una secuencia que deba completarse**.
Cada ruta que se implemente cargará directamente sus datos. Se podrán agrupar
estados secundarios en un panel de la misma escena cuando simplifique la muestra.
Los parámetros van dentro del fragmento: `…/#/entrevista?tour=1`.

| ID | URL o vista prevista | Qué muestra y qué se puede probar localmente | Papel / estado |
| --- | --- | --- | --- |
| V00 | `/` | Índice de muestras disponibles | 8, 24; índice local implementado |
| V01 | `/entrevista` | Chat estructurado, objetivo, respuestas editables, rama «no lo sé» y resumen | 9; pendiente |
| V02 | `/opciones` | Tres tarjetas; condiciones y estados de aplicabilidad | 10; pendiente |
| V03 | `/opciones/:id` o panel | Detalle de una opción: requisitos, pasos, documentos y costes | 10; pendiente |
| V04 | `/planes` | Dos planes, mensual/anual y total coherente | 11; pendiente |
| V05 | `/contratacion` | Compra precargada, desglose y confirmación simulada | 11; pendiente |
| V06 | `/expediente` | Home, una siguiente acción, recorrido, responsables y menú ilustrativo | 12; primera versión local |
| V07 | `/expediente/pasos/documentacion` | Instrucciones, dos documentos y aportación de ejemplo | 13; primera versión local |
| V08 | `/documentos` | Recibido, revisión, subsanación y validado como estados diferentes | 14; pendiente |
| V09 | `/originales` | Puntos ficticios, preparación, resguardo y tracking | 15; pendiente |
| V10 | `/practica` | Sesión breve, correcciones explicadas y repaso | 16; pendiente |
| V11 | `/consultas` | Hilo escrito, documentos de contexto y reserva ficticia | 17; pendiente |
| V12 | `/consultas/sala-demo` o panel | Sala ilustrativa, controles y resumen | 17; pendiente |
| V13 | `/perfil` | Perfil ficticio, plan y preferencias | Apoyo; opcional, pendiente |
| V14 | `/gestion/rutas` | Catálogo de plantillas y versiones | 18; pendiente |
| V15 | `/gestion/rutas/:id` | Editor y previsualización en la misma escena | 18; pendiente |
| V16 | `/gestion/cambios` | Cambio ficticio, diferencias, afectados y revisión jurídica | 19; pendiente |
| V17 | `/gestion/expedientes/:id` | Excepción individual y previsualización local del cliente | 19; pendiente |

Las rutas de detalle aún no desarrolladas son orientativas. No se implementarán
pantallas de apoyo solo para que todos los botones de una app parezcan operativos.
Los elementos decorativos no se presentan como enlaces activos sin destino.

## Estado de la primera escena

- `/expediente`: home, menú inferior ilustrativo, detalle en diálogo y guía de
  tres pasos. `?tour=1` abre la guía. También se puede abrir, cerrar y repetir.
- `/expediente/pasos/documentacion`: carga directamente el mismo componente de
  instrucciones con su propio estado. No depende de haber abierto la home.
- «Usar documento de ejemplo» cambia pendiente a recibido. La revisión sigue
  pendiente y no se marca como validado. No se solicitan archivos al usuario.
- «Reiniciar» restaura el estado local; una recarga también comienza de nuevo.
  No hay almacenamiento global ni sincronización entre escenas.
- Datos y textos: `recursos-compartidos/demo/seguimiento.json`, compartido con
  la maqueta del librito. La interfaz del papel es un dibujo vectorial editorial;
  **todavía no es una captura de navegador**.
- TypeScript y build comprobados. Prueba interactiva en navegador pendiente:
  el navegador integrado no estaba disponible en esta sesión.

## Tutoriales propuestos

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
equivalente mensual etiquetado y cuota separada de trámites/tasas/gastos. Los
19,99/29,99 € del boceto siguen siendo ejemplos pendientes de decidir.

## Reutilización proporcionada al alcance

- `components/`: controles, estados, navegación ilustrativa y componentes visuales.
- `features/<escena>/`: pantalla y componentes específicos.
- `recursos-compartidos/demo/`: datos y textos que utilizan también las páginas.
- `App.tsx`: registro de las URLs de muestras; no gestor de un recorrido global.
- `recursos-compartidos/estilos/`: paleta y tipografía comunes.

Estado con hooks locales. Añadir un modelo compartido solo cuando dos componentes
lo necesiten; no anticipar un motor de expedientes, autenticación, backend o CRM.
Una escena puede contener su propio contexto/reducer si lo requiere su interacción.

El configurador será un caso especial: editor y previsualización **dentro de la
misma escena** usarán la misma definición de pasos. No hace falta modificar otras
URLs. Versiones, vigencia, aprobación y excepciones pueden mostrarse con un ejemplo
pequeño: v1, borrador v2, dos expedientes ficticios y una condición sencilla.
Los expedientes existentes conservan su versión; una excepción individual no
modifica la plantilla de todos. No se promete adaptar cualquier norma sin código.

## Orden de desarrollo y comprobación

1. Probar la dirección visual con las páginas 12–13 y su escena. **En revisión.**
2. Elegir sistema visual y componentes comunes que merezca la pena reutilizar.
3. Desarrollar escenas según prioridad editorial, en cualquier orden: entrevista,
   opciones/planes, documentos/originales, práctica, consultas, configurador.
4. Revisar cada URL de forma independiente: acceso directo, recarga, reinicio,
   contenido y móvil. Probar sus interacciones locales y su guía cuando existan.
5. Capturar las interfaces aprobadas, sustituir maquetas, publicar en la cuenta
   dedicada de GitHub Pages y generar los QR definitivos.

Pruebas según el riesgo: importes en compra; respuestas y corrección en práctica;
estados documentales; aislamiento de versiones en el configurador. No añadir
pruebas de un recorrido global que no se ha pedido. TypeScript/build al cambiar
código. Las comprobaciones futuras no se dan por ejecutadas.

## Pendiente

Elegir variante interior, revisar las muestras, concretar opciones y contenido
jurídico, decidir precios ficticios, preparar otras escenas, elegir cuenta/repositorio
y publicar. El resto del proyecto mantiene el plan editorial de 24 páginas.
