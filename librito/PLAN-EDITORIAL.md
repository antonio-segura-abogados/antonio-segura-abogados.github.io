# Propuesta de estructura del librito

17 de septiembre de 2026. **Desarrollo en orden, por instrucción de Pol.**
La portada 03 diagonal está elegida. Las tres variantes de 12–13 se han rechazado;
la UX se conserva. Pol ha aprobado la dirección de las páginas 2–5. La pareja
6–7 está desarrollada y pendiente de revisión. La tanda **8–13**, solicitada
después, está desarrollada en orden. La petición «implementa las que faltan»
completa **14–24**. El librito íntegro está maquetado; 06–24 quedan en revisión.

El [encargo](planificacion/ENCARGO-2026-09-17.md) guarda las instrucciones de origen.
Cada una de las 24 carpetas bajo `slides/` tiene prefijo numérico e instrucciones.
Ver la [apertura](muestras/01-03-apertura/README.md), la
[continuación 4–5](muestras/04-05-negocio/README.md), la
[pareja 6–7 y lectura acumulada](muestras/06-07-modelo/README.md) y la
[tanda 8–13 con móviles y QR](muestras/08-13-app/README.md), además de la
[guía narrativa](GUIA-NARRATIVA.md) y el [cierre y PDF completo](muestras/14-24-cierre/README.md). Las pantallas de la demo son autónomas;
**el libro se desarrolla en orden aunque las URLs sean independientes**.

## Hilo del relato

**Quiero dirigir vuestra tecnología → entiendo el negocio → veo una oportunidad
concreta → puedo demostrar cómo funcionaría → sé cómo convertirla en una
operación sostenible.**

La app es la prueba de capacidad de Pol, dentro de una candidatura personal a
director tecnológico. El librito debe demostrar criterio de negocio y de
operaciones además de capacidad de construir pantallas. La apertura explica la
candidatura; el cierre recupera la persona y propone una conversación.

Propuesta: **24 páginas A5 horizontales, incluidas las cuatro caras de cubierta**.
Coincide con el objetivo de impresión existente. Son 20 páginas interiores y
cuatro de cubierta, aunque las caras interiores de cubierta también llevan
contenido. No se añaden páginas en blanco. Las 24 páginas ya están maquetadas y
comprobadas como A5; falta validarlas en la prueba física.

## Qué significa dividir un tema

Se numeran todas las caras en orden de lectura: p. 1 es portada; p. 2, interior
de portada; p. 23, interior de contraportada; p. 24, contraportada.

Al abrir el librito se ven **2–3, 4–5, 6–7… 22–23**. Una pareja enfrentada
empieza en una página par. Las caras 5–6, por ejemplo, están en el anverso y
reverso de una misma hoja y no se ven juntas. Esta distinción rige las divisiones.
No confundir hoja del libro con pliego de impresión: la imposición la hará el taller.

Por ello, mercado ocupa 6–7, elección y compra 10–11, seguimiento 12–13,
documentación 14–15 y configuración 18–19. La antigua slide 8 se convierte en
dos parejas, cada una con una idea completa. No hace falta recordar una pantalla
del reverso para interpretar su continuación.

El PDF completo está en páginas individuales y orden de lectura. Los
elementos importantes no cruzarán el lomo. Mantener la
[especificación de impresión](IMPRESION.md), con prueba física pendiente.

## Paginación implementada, pendiente de revisión editorial

Las carpetas llevan **número de página de dos cifras y título**, por petición de Pol.
Los ids semánticos del manifiesto y las rutas QR son estables. Si se reordena el libro,
actualizar los prefijos de carpeta y sus referencias para que el orden siga visible.
La doble «slide 3» del encargo se distingue como **S03-IA** y **S03-CADENA**.

| Página | Contenido y propósito | Tratamiento previsto | Origen / ficha |
| --- | --- | --- | --- |
| 1 | Quiero ser vuestro director tecnológico | Elegida la 03 diagonal; conservar firma y protagonismo del cargo | [Portada](slides/01-portada/INSTRUCCIONES.md) |
| 2 | Una candidatura personal, con una propuesta concreta | Carta de 60–85 palabras: quién soy, qué busco y por qué he preparado esto | [S02](slides/02-presentacion/INSTRUCCIONES.md) |
| 3 | La próxima década exige dirección tecnológica | Tesis breve, una figura del informe, pie de fuente y QR directo al PDF | [S03-IA](slides/03-direccion-tecnologica/INSTRUCCIONES.md) |
| 4 | Empiezo por extranjería | Recorrido del cliente, bifurcación documental y trabajo del despacho alineado debajo; variante desarrollada | [S03-CADENA](slides/04-cadena-de-valor/INSTRUCCIONES.md) |
| 5 | Vuestro criterio. A mayor escala | Tres objetivos: cómodo, digital y escalable; variante desarrollada | [S04, apertura](slides/05-oportunidad/INSTRUCCIONES.md) |
| 6 | Extranjería vía app. Un espacio por ocupar. | Estudio de mercado de Pol y oportunidad para AS; Campmany como respaldo en una franja secundaria; variante 03 | [S04 y corrección del 18-09](slides/06-referente-campmany/INSTRUCCIONES.md) |
| 7 | Crecer también es organizar mejor | Clientes a distancia, equipo distribuido y procesos reutilizables; tres relaciones con beneficios esperados para AS | [S04, lectura de negocio](slides/07-modelo-operativo/INSTRUCCIONES.md) |
| 8 | Tu app de extranjería | Concepto e índice visual: entender, elegir, avanzar, resolver; números de página definitivos al cerrar | [S05](slides/08-concepto-app/INSTRUCCIONES.md) |
| 9 | Cada caso empieza por escuchar | Chat con fecha, respuesta desconocida y resumen editable; captura y QR | [S06](slides/09-entrevista/INSTRUCCIONES.md) |
| 10 | Elegir con claridad | Vía a estudiar, revisión complementaria y valoración individual; detalle local y QR | [S07, p1](slides/10-opciones/INSTRUCCIONES.md) |
| 11 | El valor, claro. La cuota, también | Comparación de dos planes; mensual/anual y confirmación simulada en la demo | [S07, p2 → p3](slides/11-contratacion/INSTRUCCIONES.md) |
| 12 | ¿Cómo va lo mío? | Captura de la home, siguiente acción y responsables; nueva variante 04 | [S08, home](slides/12-seguimiento/INSTRUCCIONES.md) |
| 13 | Saber qué falta. Y cómo resolverlo | Detalle documental, instrucciones y responsable; recibido distinto de revisado; variante 04 | [S05 + S08](slides/13-paso-actual/INSTRUCCIONES.md) |
| 14 | Cada documento, en su sitio. | Pendientes, recibidos, subsanaciones y validados; demo de aportación | [S08, documentos](slides/14-documentos/INSTRUCCIONES.md) |
| 15 | También hay un camino para el papel. | Punto cercano, resguardo, transporte, recepción y devolución; propuesta logística | [S08, originales](slides/15-originales/INSTRUCCIONES.md) |
| 16 | Un poco cada día. | Pregunta, corrección explicada y progreso personal; QR de práctica | [S09](slides/16-practica/INSTRUCCIONES.md) |
| 17 | Una consulta, con todo el contexto. | Escrito → reserva → videollamada → resumen; QR de consulta | [S10](slides/17-consultas/INSTRUCCIONES.md) |
| 18 | Vuestro criterio. Reglas configurables. | Plantilla versionada de pasos, condiciones y previsualización | [S11, plantilla](slides/18-configurador/INSTRUCCIONES.md) |
| 19 | Actualizar la ruta. Decidir a quién afecta. | Diferencias, validación jurídica, vigencia y adaptación individual | [S11, aplicación](slides/19-cambios-y-excepciones/INSTRUCCIONES.md) |
| 20 | Más alcance. Mejor operación. | Mapa desde Cataluña y cuatro beneficios vinculados a mecanismos del producto | [S12](slides/20-beneficios/INSTRUCCIONES.md) |
| 21 | Yo lideraría la puesta en marcha. | Piloto, validación, medición y ampliación; funciones que Pol propone asumir | [Añadido editorial](slides/21-puesta-en-marcha/INSTRUCCIONES.md) |
| 22 | Pol Surriel. Desarrollo, equipos y formación. | CV comprimido: VIEWNEXT, Surreal Boost, docencia y formación | [S13](slides/22-curriculum/INSTRUCCIONES.md) |
| 23 | Me gustaría hacerlo con vosotros. | Dos fotos con contexto, aportación propuesta y contacto | [S13 + cierre editorial](slides/23-conversacion/INSTRUCCIONES.md) |
| 24 | ¿Hablamos? | Firma, destinatario y acceso general a demo; composición muy limpia | [Petición de contraportada](slides/24-contraportada/INSTRUCCIONES.md) |

La página 21 es una sugerencia editorial, no una instrucción original atribuida
a Pol. Convierte el producto en una propuesta de liderazgo. La 23 desarrolla
la petición de fotos profesionales y añade el cierre personal: dos fotografías
permiten dar aire al CV sin concentrar toda la trayectoria en una sola cara.

## Desarrollo de las ideas que requieren más criterio

### Apertura personal y argumento tecnológico

Dirección de texto para p. 2, pendiente de edición final:

> Soy Pol Surriel y quiero incorporarme a Antonio Segura Abogados como director
> tecnológico. He preparado esta propuesta para mostrar cómo analizo un negocio,
> detecto oportunidades y las convierto en productos concretos. He elegido
> extranjería como punto de partida: una experiencia digital que acompañe al
> cliente y ayude al despacho a atender más demanda. El librito explica la idea;
> la demostración permite recorrerla.

P. 3 debe justificar una responsabilidad estratégica continuada. La conclusión
«necesitáis una dirección tecnológica» es la valoración de Pol. El estudio es
contexto para esa tesis, no prueba de que el despacho deba contratarlo ni un
pronóstico específico de la abogacía española. Localizados PDF, pasaje jurídico
y figura candidata en la ficha de fuentes. El QR de esta página irá directamente
al PDF oficial, como pide el encargo.

### Cadena de valor con comprensión de negocio

La variante desarrollada reinterpreta `slide3.png` en dos bandas alineadas.
Arriba, recorrido del cliente: entrevista → encargo → documentos → tramitación
→ resolución. Debajo, el trabajo correspondiente del despacho: valorar la vía,
definir alcance y honorarios, orientar y validar, revisar y presentar, informar
y acompañar. El mapa identifica el proceso como una interpretación externa.

Las fricciones por validar —información incompleta, explicaciones repetidas y
preguntas de estado— se reservan para 6–7, junto a los mecanismos operativos.
Así el mapa establece primero dónde se aporta valor sin atribuir a AS problemas
internos no comprobados.

No mostrar residencia → nacionalidad como destino inevitable de todo expediente.
La secuencia se ramifica según objetivo. En el tramo documental caben autogestión
con instrucciones y servicio adicional contratado. Distinguir quién actúa y
qué puede facturarse, sin dibujar un ingreso por cada clic.

### Referente y oportunidad

La página 6 parte del estudio de mercado de Pol y su conclusión de que el
espacio de extranjería vía app está libre. Antonio Segura es el destinatario
de esa oportunidad. Campmany refuerza el argumento como caso de éxito en
bajas e incapacidades. Pol aprueba: «Campmany demuestra que un despacho
especializado puede crecer con un modelo digital. Mi propuesta es llevar estos
principios a extranjería». El crecimiento se respalda con el caso publicado
por HubSpot sobre marketing y ventas digitales; la web de Premium acredita
el servicio. No se atribuye el crecimiento al estudio de Pol ni a la app.
La página 7 desarrolla la aplicación a AS. Conocer demanda, capacidad, costes
y disposición a pagar será necesario para validar esa aplicación.

**Última aclaración de Pol:** añadir las comparaciones salariales al punto 2.
La ventaja del equipo distribuido incluye explorar salarios inferiores a los
de Barcelona para perfiles equivalentes. Se presenta como hipótesis de ahorro
por validar, sin importes inventados ni atribuir esta estructura a Campmany.
Esta aclaración sustituye la exclusión anterior; ambas quedan conservadas
en las instrucciones de la página.

Las variantes desarrolladas hacen explícita esa distinción. P. 6 presenta el
referente y su recorrido, con fuente fechada y enlace. La variante 02 incorpora
el logo y la ilustración oficial de Campmany, tras la corrección visual de Pol;
la primera composición se conserva. P. 7 habla de lo que
Pol exploraría para AS y concreta tres cambios: atender a distancia, coordinar
un equipo distribuido y reutilizar instrucciones, documentos y estados. Demanda,
costes y tiempo por expediente quedan como medidas por validar. El cierre
introduce «Tu app de extranjería».

### Opciones y monetización

Conservar la secuencia conceptual de bocetos **p1 → p2 → p3** en el relato.
Las muestras pueden abrirse por URLs independientes, cada una precargada. En el papel,
p. 10 explica la decisión jurídica y p. 11 la contratación comercial. No
mezclar «ruta jurídica» con «plan de suscripción».

La comparación tendrá tres estados comprensibles: opción a valorar ahora,
opción condicionada y opción futura/no aplicable. No deben aparecer tres vías
legalmente incompatibles como alternativas igualmente válidas de un mismo cliente.
Los ejemplos «dos años con examen / diez sin examen» se preservan como boceto,
pero se reemplazan en el contenido público: los requisitos de residencia y de
exámenes no funcionan como ese intercambio. Los datos del caso serán ficticios;
la explicación de la ley no será inventada.

El plan mensual debe explicar qué valor entrega durante la espera. Evitar que
parezca un peaje por consultar el estado. Hipótesis para validar: acompañamiento,
documentación, consultas y preparación. Honorarios de trámites, tasas y gastos
de terceros se distinguen de la cuota. No hay previsiones de ingresos reales.

### Progreso y documentación

P. 12 prioriza una sola siguiente acción. La línea de pasos explica el expediente;
no representa una probabilidad de concesión ni permite acelerar una espera oficial.
El menú inferior propuesto: **Inicio, Documentos, Práctica, Consultas, Perfil**.

P. 13 muestra un detalle grande, acompañado de pequeños ejemplos de otros tipos
de paso. Las cuatro páginas 12–15 forman dos unidades: entender/actuar y
aportar/entregar. La llegada de un original no lo convierte automáticamente en
documento jurídicamente validado. Las apostillas y la custodia tienen un proceso
propio; un punto de mensajería no las expide ni las verifica por sí mismo.

### Práctica, consultas y configurador

P. 16 propone hábito, repaso de errores y conexión con el expediente. Ya existe
una app oficial gratuita del CCSE: la diferenciación debe ser el acompañamiento
integrado y personalizado. No afirmar «herramienta única», mayor tasa de aprobados
ni que la demo puede certificar que alguien está preparado.

P. 17 mantiene el trato humano y añade contexto: al abogado le llegan documentos
y motivo antes de la llamada, y el cliente conserva indicaciones después. La
consulta escrita merece tanta presencia como el vídeo para no contradecir el
valor de la atención asíncrona.

P. 18–19 es una prueba central de dirección tecnológica. Mostrar una norma
identificada, revisión por el equipo jurídico, borrador de cambio, vista previa,
afectación a expedientes, aprobación y versión vigente. Un cambio de textos,
documentos o secuencia podrá configurarse; una capacidad nueva o integración
podrá requerir desarrollo. La personalización de un cliente no modifica la
plantilla común. La demo usará un cambio de procedimiento ficticio, nunca una
publicación del BOE fabricada con apariencia real.

### Beneficios, ejecución y candidato

Relacionar cada beneficio con una función visible y una medida futura: alcance
geográfico, expedientes por profesional, tiempo de revisión documental, consultas
repetitivas, conversión y satisfacción. Sin porcentajes inventados de ahorro.

P. 21 propone fases y criterios de avance, sin comprometer un calendario con
información insuficiente: observar el servicio, pilotar una ruta, medir y ampliar.
Explicitar qué lideraría Pol y qué debe decidir el equipo jurídico.

P. 22 se ha diseñado desde la trayectoria real. Pol ha aportado el PDF de LinkedIn y
cuatro fotos. La [base de CV](../anexos/BASE-CV.md) permite priorizar la progresión
Senior → Tech Lead en VIEWNEXT, la coordinación de ocho personas en Surreal Boost
y la docencia. Se omiten las skills desactualizadas por petición expresa. No
confundir el puesto al que se aspira con uno ya ejercido ni inventar resultados
del puesto actual. P. 23 propone dos fotos —VIEWNEXT y Surreal Boost— con pies,
cierre y contacto; SIGMA y la otra foto de VIEWNEXT quedan como alternativas.

## Criterios de diseño y variantes

- Una idea y un elemento visual dominante por página. Aproximadamente 45–90
  palabras de cuerpo en páginas de producto; el CV admite más densidad si sigue
  legible. Estos límites guían la edición, no fuerzan texto de relleno.
- No reducir una pantalla de escritorio completa hasta volverla ilegible. Usar
  recortes con contexto en 18–19 y un detalle de compra en 11. Máximo dos focos
  visuales en una página, relacionados entre sí.
- QR de 27–28 mm con zona limpia y etiqueta de acción (27 mm en 18–19). Un QR por pareja cuando
  comparte recorrido; dos solo si abren escenas distintas útiles. Un capítulo
  debe entenderse sin abrir su QR.
- Variantes que cambien composición y jerarquía, no solo frases. Explorar primero
  desde el inicio del relato. La anterior prueba 12–13 no sirve como base: Pol
  rechaza su falta de fuerza comercial. Mantener una lectura persuasiva y secuencial.
- Cada carpeta tendrá `INSTRUCCIONES.md` y, al ejecutar, `variantes/01-…/`,
  `variantes/02-…/` con fuente editable, PDF y PNG. La portada conserva sus
  archivos actuales. Compartir tipografía, color y recursos, sin duplicar paletas.
- Cada ficha registra su estado: propuesta, diseño en revisión, aprobado o
  rechazado. La dirección de 2–5 está aprobada; 6–24 están en revisión;
  las tres maquetaciones anteriores de 12–13 están rechazadas.

## Revisión del conjunto y siguientes variantes

La versión de 24 páginas está completa. Revisar 06–24 con Pol en la lectura
continua, manteniendo 01–05 aprobadas. Las cinco parejas nuevas 14–23 permiten
valorar ritmo y espacio; 24 cierra como contraportada. Si una revisión requiere
otra composición, conservar la anterior en la carpeta de variantes.

Las escenas correspondientes están implementadas y comprobadas. Los trece QR
se han leído desde el PDF completo. Las fuentes jurídicas y de práctica están
referenciadas; logística, cambios de procedimiento y resultados de negocio son
propuestas o simulaciones identificadas. CV y fotos usan los materiales aportados.

La siguiente fase de producción debe ajustar sangrado y color a la copistería,
revisar legibilidad al tamaño real y escanear una prueba física. El PDF de parejas
es de revisión; el taller recibe páginas individuales y decide la imposición.

## Forma de continuar acordada tras la corrección

Un chat de coordinación y **páginas en orden**. Primera lectura: portada elegida,
quién es Pol y qué quiere, por qué propone dirección tecnológica. Continuar con
cadena de valor y oportunidad, después referente, producto y beneficios.

La calidad de la UX y la del librito se juzgan por separado. Pol valora la UX
existente y rechaza las tres maquetaciones de 12–13. No volver a pedir que elija
entre ellas. Conservarlas identificadas como descartadas.

Al llegar a las demostraciones, presentar la interfaz dentro de una silueta de
móvil HTML/CSS con escala legible y detalles ampliados donde sea necesario. El
móvil debe servir a la explicación, no convertirse en decoración repetida en todas
las páginas. Antes de cada función, establecer el problema y el beneficio.

Guardar variantes por página, revisar las parejas enfrentadas y actualizar el
estado. Las páginas 1–5 están aprobadas como dirección y 6–24 están en revisión.
El desarrollo previsto está completo; continuar con variantes y revisión del conjunto.
