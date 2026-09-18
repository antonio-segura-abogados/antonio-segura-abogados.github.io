# Candidatura proactiva · Antonio Segura Abogados

Este README conserva el contexto del proyecto para poder retomarlo en un chat
nuevo. Última actualización: **18 de septiembre de 2026**.

## Objetivo personal y estrategia

El promotor del proyecto es **Pol Surriel Muixench** y quiere cambiar de trabajo.
Está cansado de desempeñar
un papel pequeño dentro de una organización grande y busca un puesto desde el
que pueda dirigir, decidir y hacerse responsable de un proyecto completo.

La estrategia es una candidatura proactiva y muy personalizada, descrita por
él como de «francotirador»: seleccionar una empresa, entender su negocio y
presentarse con una propuesta concreta y una demostración funcional. El centro
de la candidatura será esa prueba de capacidad, acompañada de su presentación
personal; una versión breve del CV cerrará el librito y el CV ampliado podrá ir
en anexos. La intención inicial es **conseguir que lo
contraten con capacidad de liderazgo**, no asumir que se presenta como agencia
o proveedor externo.

El primer destinatario es **Antonio Segura Abogados**:
[segura-abogados.com](https://segura-abogados.com/).

## Qué vamos a preparar

Un librito impreso en una copistería, adaptado a la identidad visual del despacho,
que explique el proyecto y a su promotor. Incluirá códigos QR que abran pantallas
concretas de una demo de escenas autónomas. Cada URL mostrará una parte
acotada de la experiencia propuesta, sin exigir una aplicación navegable completa.

La demo está publicada en **GitHub Pages desde una cuenta dedicada a esta
candidatura**. El repositorio indicado es
`https://github.com/antonio-segura-abogados/antonio-segura-abogados.github.io.git`,
configurado como remoto `origin` del repositorio local en `as-abogados/`.
URL pública: `https://antonio-segura-abogados.github.io/`. Publicación desde
**GitHub Actions**, tras sustituir la publicación antigua desde `main → /docs`.
Cada push a `main` compila las variantes seleccionadas, el librito y la web.
La home muestra las 24 páginas; `/demos` reúne las 16 escenas.
Primera compilación y publicación automáticas completadas y verificadas en la URL pública: 24 páginas, descarga PDF y 16 escenas con guía.
[Comprobación pública](vertical/diseno/presentacion/VERIFICACION-PUBLICA.json) ·
[Workflow verificado](https://github.com/antonio-segura-abogados/antonio-segura-abogados.github.io/actions/runs/35179389212).

```text
as-abogados/
├── librito/                 Documento imprimible y especificación de impresión
│   ├── slides/              24 carpetas numeradas: 01-portada … 24-contraportada
│   │   ├── 01-portada/      Elegida: variante 03 diagonal
│   │   ├── 02-presentacion/ Dirección aprobada en 02–05
│   │   └── …               Instrucciones y variantes por página
│   ├── muestras/            Librito completo 01–24, parejas y pruebas históricas
│   ├── planificacion/       Encargo y paginación propuesta
│   └── PLAN-EDITORIAL.md    Relato y estructura propuesta de 24 páginas
├── docs/                    Compilación publicada en GitHub Pages
├── vertical/                Aplicación de demostración
├── anexos/                  Investigación de contacto, base del CV y otros apoyos
├── recursos-compartidos/
│   ├── assets/              Marca, fotografías, fuentes y referencias antiguas
│   ├── estilos/             Tipografía, paleta y estilos reutilizables
│   ├── investigacion/       Evidencias de marca e inventario de recursos
│   └── qr/                  Convenciones y registro de destinos futuros
├── tmp/                     Bocetos, LinkedIn PDF y fotos de Pol; conservar
├── package.json             Comandos comunes y workspace npm
└── package-lock.json        Dependencias reproducibles
```

Los tres entregables comparten la misma identidad. No crear copias divergentes
de los colores, las tipografías o los originales gráficos en cada carpeta.
La compilación de la demo incorpora únicamente los assets importados por ella;
la presentación completa se publica ahora como renders y PDF por petición de Pol,
incluidas las páginas de CV y fotos. Los anexos y el PDF fuente de LinkedIn
no se copian a la web.

## Antecedente y propuesta de producto

`../as-abogados-planteamiento-antiguo/` contiene una presentación Angular de
12 diapositivas, implementadas en `src/app/slides/slide*.component.ts`.
No es el proyecto de producción: se conserva como referencia sin modificarlo.

Su idea central es una experiencia digital de extranjería que acompañe al
cliente desde la entrevista inicial hasta la gestión y seguimiento de su caso.
Las diapositivas plantean entrevista guiada, presentación de opciones,
seguimiento por etapas, gestión documental, preparación de exámenes,
consultas online, suscripciones y pagos. Son propuestas por validar.

Los precios, cifras de plantilla, ahorros y proyecciones del planteamiento
antiguo **no son datos confirmados del despacho**. El catálogo de escenas ya está definido e implementado. El librito no debe convertir esas hipótesis en
promesas ni atribuir al promotor experiencia o recomendaciones aún no aportadas.

## Antecedente: primera fase completada

1. Crear esta estructura independiente.
2. Inicializar un proyecto en blanco con una tecnología adecuada.
3. Analizar la presentación antigua y seleccionar recursos reutilizables.
4. Revisar la web del despacho y guardar fuentes, colores e imágenes.
5. Investigar impresión económica y definir las medidas iniciales.
6. Documentar el contexto para continuar en futuras conversaciones.

Ese alcance inicial se amplió después por instrucciones de Pol: el librito,
el CV y las escenas ya están desarrollados; Pol creó la cuenta de GitHub.

## Fase actual: construir el relato desde el principio

**Corrección explícita de Pol, 17-09-2026:** las tres variantes interiores de
12–13 quedan rechazadas. La UX web sí le parece buena y se conserva. El librito
tiene que vender la candidatura, construir interés y contar una historia.
**Desarrollar las páginas EN ORDEN**; no volver a empezar por una página intermedia
para fijar el diseño. La independencia técnica de las URLs no cambia esta orden.

La portada elegida sigue siendo la **03 diagonal**. Pol ha aprobado la dirección
de la [apertura 01–03](librito/muestras/01-03-apertura/README.md) con
«EXCELENTE. ESTE ES EL CAMINO. Sigue así». Las páginas 2–3 se conservan como base.
Pol ha aprobado también la línea de **4–5: cadena de valor y oportunidad** con
«Bien, continua en esta linea». El diseño de las páginas 1–5 se conserva.
Se han desarrollado después **6–7: referente Campmany y modelo operativo**,
pendientes de revisión. La [muestra 06–07](librito/muestras/06-07-modelo/README.md)
incluye la pareja enfrentada y las siete primeras páginas en orden.
Por petición de Pol («haz una tanda de 6 diapositivas»), se han desarrollado
después **8–13**, en orden: concepto, entrevista, opciones, contratación,
seguimiento y acción del paso. La [tanda 08–13](librito/muestras/08-13-app/README.md)
incluye las seis páginas, tres parejas enfrentadas y el acumulado 01–13.
Las interfaces son capturas reales dentro de un móvil HTML/CSS. Pendientes de
revisión de Pol. Con «implementa las que faltan», se completa después
**14–24** en orden: documentos, originales, práctica, consultas, configurador,
cambios, beneficios, puesta en marcha, CV, fotos y contraportada.
La [tanda 14–24](librito/muestras/14-24-cierre/README.md) contiene el
**[librito completo de 24 páginas](librito/librito-final.pdf)**,
las once páginas nuevas y cinco parejas enfrentadas. Cada página conserva
instrucciones, texto editable y exportaciones. Las páginas 01–13 conservan su diseño.

**Corrección posterior en 6–7:** Pol pide recursos visuales reales de Campmany.
La página 6 incorpora entonces la variante 02 con logo e ilustración oficiales descargados;
la composición anterior se conserva. En su última aclaración, Pol pide
**añadir las comparaciones salariales al punto 2 de la página 7**. El equipo
distribuido permite explorar salarios inferiores a los de Barcelona para
perfiles equivalentes, como hipótesis de ahorro por validar, sin cifras inventadas.

**Nuevo enfoque de la página 6, 18-09-2026:** Pol pide que su estudio de mercado
y la oportunidad para Antonio Segura sean el mensaje principal. La
[variante 03](librito/slides/06-referente-campmany/variantes/03-oportunidad-de-mercado/README.md),
«Extranjería vía app. Un espacio por ocupar», recoge en primera persona su
conclusión de mercado y propone a AS liderar ese espacio. Campmany pasa a una
franja secundaria como caso de éxito. Tras aclarar Pol que conoce su historia
personalmente, la investigación localiza un caso de HubSpot con ingresos
duplicados en cuatro meses al integrar marketing y ventas digitales en 2017.
Pol aprueba el cierre: «Campmany demuestra que un despacho especializado puede
crecer con un modelo digital. Mi propuesta es llevar estos principios a
extranjería». Aplicado con enlaces al servicio y al caso, sin atribuir el
resultado económico al estudio de Pol ni específicamente a la app.
Seleccionada en la presentación local; variantes anteriores conservadas.
Pendientes la revisión editorial de Pol y la publicación.

Las **24 carpetas están juntas en `librito/slides/` y llevan prefijo de página**:
`01-portada`, `02-presentacion`, …, `24-contraportada`. El identificador semántico
se mantiene en el manifiesto; si cambia la paginación, se actualizará también el
prefijo y sus enlaces. Cada carpeta conserva `INSTRUCCIONES.md`.

Las tres variantes rechazadas están en `12-seguimiento/descartadas/` y
`13-paso-actual/descartadas/`. Sus comparativas históricas permanecen identificadas
como rechazadas. No presentarlas de nuevo como candidatas ni recomendarlas.

**Dirección editorial:** candidatura personal → necesidad de dirección tecnológica
→ entendimiento del negocio → oportunidad → propuesta demostrable → beneficios
→ capacidad de Pol para liderarla. Texto breve con intención, titulares con
jerarquía y recursos visuales que respalden el argumento. Cuando llegue el producto,
mostrar la UX dentro de una silueta de móvil construida con HTML/CSS, como propone
Pol; preservar la interacción que ya funciona. Evitar repetir un catálogo de funciones.

Se conservan 24 páginas y todas las parejas enfrentadas previstas. Hay **16
escenas autónomas más el índice**: entrada y seguimiento (seis), documentos,
originales, práctica, consultas y sala, perfil, catálogo de rutas, editor,
cambios y excepción individual (diez). Los detalles también pueden abrirse
en un panel local. Todas las escenas admiten reinicio. Los tutoriales se han retirado por petición de Pol (18-09-2026). El catálogo de
18 vistas queda cubierto sin sesión global ni navegación obligatoria de app.

Decisiones y matices incorporados al plan:

- Datos de clientes, precios, expedientes, pagos, envíos y actividad: simulados.
  Las fuentes citadas y la trayectoria de Pol son reales; no se inventa normativa.
- Informe de Anthropic confirmado por enlace de Pol: *Economic Scenarios for
  Transformative AI*, septiembre de 2026. PDF descargado en investigación,
  fuera de anexos conforme a la frase literal del encargo. La selección de
  figura 4 (primer panel, con todos sus escenarios) ya está en la propuesta
  de página 3. QR directo al PDF generado y decodificado, también desde el render.
- Campmany es una referencia de oferta digital comprobable. La conclusión de
  mercado libre en extranjería vía app procede del estudio de Pol. El crecimiento
  del referente se respalda con el caso publicado por HubSpot, que documenta
  ingresos duplicados en cuatro meses tras adoptar marketing y ventas digitales
  en 2017. No es una auditoría independiente ni acredita el efecto de la app.
  La página 6 recoge el precedente de crecimiento con la frase aprobada por
  Pol, sin cifras. Rentabilidad, ahorros y estructura interna no se deducen
  de la oferta pública.
  El logo y la ilustración de su web se conservan con procedencia en
  `recursos-compartidos/assets/referentes/campmany/` y se usan en la página 6.
- La comparativa de opciones debe separar requisitos jurídicos, plazos de
  resolución y planes comerciales. Corregir los ejemplos de plazos/exámenes
  antes de convertirlos en interfaz o texto público.
- El configurador requiere revisión jurídica, versiones, vigencia y control
  de los expedientes existentes. No se promete adaptar cualquier cambio sin código.
- Pol pide omitir las skills desactualizadas de LinkedIn y centrarse en las
  experiencias. La base de CV extrae VIEWNEXT, Surreal Boost, docencia y formación,
  y relaciona las fotos aportadas. CV maquetado en p. 22 y foto original de VIEWNEXT en p. 23, con contacto.
  La presentación pública incluye esas páginas por petición posterior de Pol;
  el PDF fuente personal no se publica como recurso de la web.
- La página de puesta en marcha y el cierre son aportaciones editoriales para
  conectar el producto con la candidatura a dirigir tecnología; pendientes de revisión.

## Decisiones de base

- **Tecnología:** React, TypeScript y Vite; npm workspaces desde esta carpeta.
  El usuario permite elegir tecnología. Se ha escogido una aplicación estática
  sencilla de compilar para GitHub Pages.
- **Navegación:** `HashRouter` y `base: './'`. Los enlaces de las escenas tendrán la
  forma `https://antonio-segura-abogados.github.io/#/pantalla`. Los fragmentos permiten
  acceder y recargar sin necesitar reescrituras del servidor de GitHub Pages.
- **Marca:** Plus Jakarta Sans local; azul de marca `#0192E5`, azul claro
  `#47B5FF`, azul medio `#2172BC`, azul oscuro `#06283D` y grises de la web.
  Las equivalencias y sus evidencias están en la investigación visual.
- **Formato elegido:** A5 horizontal, **210 × 148 mm**, por indicación de Pol.
  Interior con márgenes blancos; portada y contraportada con fondo azul corporativo
  **#0192E5** hasta el borde. Grapado al caballete, sujeto a viabilidad y presupuesto para
  el formato apaisado. Objetivo inicial orientativo de 24 páginas incluidas
  las cuatro caras de cubierta; podrá ajustarse en múltiplos de cuatro.
  Interior de 100 g/m² y cubierta de 200 g/m², mate, sin plastificado,
  sujetos a presupuesto y disponibilidad de la copistería. La portada dispone
  de una exportación con 3 mm de sangrado, pendientes de confirmar con el taller.
  El cálculo anterior sobre pliegos A4 no sirve para este formato horizontal.
- **Recursos compartidos:** `recursos-compartidos/estilos/tokens.css` es la
  referencia de valores de estilo; `librito/formato.json` es la especificación
  de producción. Si cambia el formato, actualizar ambos y `librito/impresion.css`.
- **QR:** base pública indicada por Pol. Catorce QR generados en SVG y PNG:
  doce de presentación/demo y dos externos, informe y LinkedIn. Todos se han
  decodificado también desde el PDF a 300 ppp. Páginas 3, 9–19, 23 y 24. Generado no significa publicado:
  el registro conserva `printReady: false` hasta verificar destino y prueba física.
  Por petición de Pol del 18/09, los QR del librito llevan una banda azul inclinada
  5° y una flecha hacia el código: «Demo interactiva» en 9–19, «Informe completo
  aquí» en la 3 y «Explora el proyecto» en la contraportada, cuyo destino es la
  presentación con acceso a las demos. Componente compartido en
  `recursos-compartidos/qr/etiqueta.py`; banda y código enlazan al mismo destino.
  Se conservan las URLs exactas, la corrección M, los 27–28 mm y los cuatro
  módulos de margen. El diseño nuevo está pendiente de revisión de Pol.
- **Dirección de portada:** por petición de Pol, se han eliminado las cuatro
  propuestas verticales y la anterior 05 pasa a ser la **portada 1**. Se mantiene
  la composición horizontal de cartel, con el cargo en gran escala, franja
  blanca inclinada y cierre con invitación a hablar. El fondo se corrige al
  azul principal **#0192E5**, identificado como `--primary_color` en el CSS
  guardado de la web; el anterior `#47B5FF` era un azul de apoyo.
  Pol ha rechazado la exploración 1A/1B/1C por limitarse a cambiar la primera
  frase. **Pide diseños completos distintos**, con cambios en la distribución,
  jerarquía, composición y recorrido de lectura; no solo retoques tipográficos.
  Se conserva la portada 1 como referencia y se presentan tres propuestas nuevas:
  **2, editorial a dos columnas; 3, composición diagonal; 4, invitación centrada
  con un semicírculo azul**. Todas mantienen el texto, el protagonismo de la
  frase del CV, la firma **Pol Surriel** y el azul corporativo. **Pol elige la
  portada 03, diagonal, el 17-09-2026.** Se conservan las otras composiciones
  y el sistema de carpetas para desarrollar variantes. La elección no implica
  que todos los interiores deban usar diagonales.
  Las afirmaciones sobre el proyecto presuponen que estará listo en la entrega.

## Cómo trabajar con la demo

Desde `as-abogados/`, usar Node compatible con las versiones fijadas de Vite
y React Router (ver `package.json`; preferible Node 22.12+ o una LTS posterior).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build:book` regenera las variantes de [seleccion.json](librito/seleccion.json),
los `index.pdf` y `index.png` de las 24 carpetas, el [PDF final](librito/librito-final.pdf)
y los recursos de la presentación. Ver [COMPILAR.md](librito/COMPILAR.md) para
preparar Python y cambiar de variante. Los renders vigentes se derivan de una
única selección; no se editan a mano.

`npm run build` comprueba TypeScript y genera `vertical/dist/` con los recursos
preparados. `npm run build:pages` compila el libro y después genera `docs/`.
El workflow `.github/workflows/publicar.yml` realiza esos pasos en cada push a
`main` y publica el resultado mediante GitHub Pages. `docs/` es una salida generada.

No hay backend, autenticación, cobros ni recogida de documentación personal.
Las escenas de demo usan datos ficticios locales. La home muestra el librito con
teclado, miniaturas, índice, ampliación y texto accesible, sin incrustar un visor PDF.

## Documentación para retomar cada parte

- [Identidad visual y análisis del proyecto antiguo](recursos-compartidos/investigacion/identidad-visual.md).
- [Inventario, fuentes y límites de los assets](recursos-compartidos/investigacion/catalogo-assets.md).
- [Investigación de contacto de Antonio Segura y antecedentes societarios](anexos/contacto-antonio-segura.md).
- [Comparativa de impresión y presupuesto](librito/IMPRESION.md).
- [Portadas horizontales y comparativa de tres diseños nuevos](librito/slides/01-portada/README.md).
- [Especificación de formato](librito/formato.json).
- [Compilar, elegir variantes y publicar automáticamente](librito/COMPILAR.md).
- [Base técnica y publicación](vertical/README.md).
- [Banco completo CCSE 2026 por temáticas](recursos-compartidos/ccse/README.md).
- [Convenciones de QR](recursos-compartidos/qr/README.md).
- [Material disponible y pendiente en anexos](anexos/README.md).
- [Plan editorial: páginas, parejas y trazas de diseño](librito/PLAN-EDITORIAL.md).
- [Apertura actual: portada y páginas 2–3 en orden](librito/muestras/01-03-apertura/README.md).
- [Negocio y oportunidad: pareja 4–5 y lectura acumulada 1–5](librito/muestras/04-05-negocio/README.md).
- [Referente y modelo operativo: pareja 6–7 y lectura acumulada 1–7](librito/muestras/06-07-modelo/README.md).
- [Tanda de app 8–13: seis páginas, tres parejas y lectura acumulada 1–13](librito/muestras/08-13-app/README.md).
- [Cierre 14–24 y librito completo de 24 páginas](librito/muestras/14-24-cierre/README.md).
- [Guía narrativa y forma de continuar](librito/GUIA-NARRATIVA.md).
- [Muestra 12–13 rechazada: conservación histórica](librito/muestras/12-13/README.md).
- [Registro del encargo y aclaraciones de Pol](librito/planificacion/ENCARGO-2026-09-17.md).
- [Plan del vertical: vistas, escenas, datos y criterios de aceptación](vertical/PLAN-DEMO.md).
- [Fuentes contrastadas y límites de las afirmaciones](recursos-compartidos/investigacion/FUENTES-PROPUESTA.md).
- [Base del CV y selección de fotografías](anexos/BASE-CV.md).

## Estado actual

**Aclaración de Pol, 18-09-2026, página 7:** la comparación salarial debía
añadirse al argumento del equipo distribuido. El punto 2 recupera coordinación
de especialistas, reparto de carga y asignación de cada caso al perfil adecuado;
el posible menor coste salarial frente a Barcelona queda como beneficio adicional.
Texto, composición e instrucciones de la variante `01-procesos` corregidos.
Los `index` y el librito compilado reflejan esta revisión.

- **Preguntador más compacto, 18-09-2026:** retirados el subtítulo y el título
  de sesión durante las preguntas. «Salir de la sesión» precede directamente
  al contador de preguntas; el foco al avanzar pasa al enunciado. Implementado
  localmente; publicación pendiente.

- **Gamificación del preguntador, 18-09-2026:** racha de aciertos exclusiva de
  cada cuestionario de ruta, temáticas o repaso inteligente. Cinco intensidades
  de rayos y resplandor, dorado desde ocho aciertos; fallo con sacudida breve,
  destello rojo y reinicio de racha. Respeta movimiento reducido. El simulacro
  conserva la corrección al terminar. Por petición de Pol, la consola muestra
  la respuesta correcta al abrir cada pregunta, también en simulacro.
  Sin cambios en las otras pantallas ni persistencia de la racha de sesión.
  Ver [criterios del preguntador](vertical/diseno/practica/README.md).
  Compilación y [prueba de rachas en Chrome](vertical/diseno/practica/VERIFICACION-RACHAS.json)
  correctas: 12 aciertos, fallo, recuperación, reinicio, fin de sesión,
  movimiento reducido y anchos 320/390/1100 px. Capturas revisadas; sin errores.
  Implementado localmente; publicación pendiente.

- **Consultas y videollamada, 18-09-2026:** retirada la cabecera con logo/avatar
  y la franja «Conversar con contexto / Tu espacio AS» de consultas. Al entrar
  en la sala, la llamada ocupa toda la pantalla de la app: todo el interior del
  marco en ordenador y el viewport en móvil. Se ocultan pestañas, expediente y
  menú; cámara propia y controles quedan superpuestos. Colgar devuelve al resumen.
  Sigue siendo una simulación sin acceso a cámara ni micrófono. Compilación y
  TypeScript correctos; vista, controles y cierre verificados en Chrome.
  Implementado localmente; publicación y capturas del librito pendientes.

- **Medidor de preparación del 18-09-2026:** añadido un indicador circular a
  la izquierda de «Más cerca de tu nacionalidad» en la entrada de `/practica`.
  Muestra el porcentaje de preguntas del banco acertadas en el último intento,
  usando el progreso local. Por petición posterior de Pol, se retira el texto
  con las preguntas pendientes junto al titular. El porcentaje se redondea
  hacia abajo para reservar el 100% al banco completo. Es una medida de avance, no una predicción de
  aprobado. Compilación correcta y composición revisada en Chrome a 320, 390
  y 1100 px, sin desbordamientos. Implementado localmente; publicación pendiente.

- **Cabecera de práctica retirada el 18-09-2026:** todas las vistas de
  `/practica`, incluidos cuestionarios y resultados, omiten el encabezado con
  logo/avatar y la franja «Tu preparación CCSE / Tu espacio AS». Implementado
  localmente; publicación pendiente.

- **Ruta de aprendizaje, caminos corregidos el 18-09-2026:** sustituidas las
  líneas verticales entre lecciones por curvas de puntos hacia la derecha o la
  izquierda según la posición del siguiente nodo. El desplazamiento se adapta
  al ancho de la ruta y el último paso no tiene conector. TypeScript y
  compilación correctos; revisión visual pendiente por falta de navegador
  conectado en esta sesión. Implementado localmente, publicación pendiente.

- **Slide 20, ajuste estético del 18-09-2026:** punto de Barcelona desplazado
  ligeramente hacia arriba y a la derecha sobre el mapa simplificado. Las cinco
  flechas comparten ese origen y trazan arcos parabólicos, con puntas tangentes
  a la llegada. Regenerados la variante `01-alcance`, sus `index`, el librito
  y los recursos del visor local; composición revisada en el render. Las otras
  23 páginas conservan su aspecto. Publicación pendiente.

- **Slide 6, variante 03, preparada el 18-09-2026:** estudio de mercado de Pol
  y oportunidad para AS en primer plano; Campmany como respaldo, con su logo
  oficial y enlace al servicio. Texto editable, generador, PDF y PNG propios.
  Selección local actualizada, junto con los `index`, el librito y los recursos
  del visor. Las variantes 01 y 02 y las otras 23 páginas conservan sus renders.
  Frase de cierre de Campmany aprobada por Pol y aplicada: «Campmany demuestra
  que un despacho especializado puede crecer con un modelo digital. Mi propuesta
  es llevar estos principios a extranjería». Añadido enlace al caso de HubSpot
  y corregida la atribución económica anterior. Publicación pendiente.
  Composición del PDF revisada; fuentes, tamaño, enlace y conservación de las
  otras páginas verificados; dos enlaces correctos y HTTP 200 para la imagen
  actualizada. En esta revisión, `npm run build` se detiene por TS2345 en
  `Practica.tsx:90`, ajeno al cambio editorial. Sin navegador conectado para
  una prueba de interacción.

- **Slide 3, variante 2, aprobada y seleccionada el 18-09-2026:** por petición de Pol,
  [«Vais a necesitar un experto tecnológico»](librito/slides/03-direccion-tecnologica/variantes/02-experto-tecnologico/README.md)
  afirma la necesidad de un experto para adaptar el despacho a los cambios de
  la IA, decidir qué automatizar y dirigir su implantación. La candidatura de
  Pol responde a esa responsabilidad. Es un argumento estratégico de la
  propuesta; el informe conserva sus escenarios y límites originales.
  Nueva carpeta con texto editable, generador propio, configuración de render,
  PDF y PNG. Composición revisada también junto a la página 2; originales del
  generador de apertura y de sus renderizados conservados byte a byte. El QR,
  sus enlaces y el gráfico permanecen idénticos. Pol confirma «esta es la buena»:
  la selección vigente, los `index`, el librito final y los recursos de la
  presentación local usan la variante 2. La variante 01 y sus originales se
  conservan. Publicación en GitHub Pages pendiente.

- **Banco CCSE 2026 completo, preparado el 18-09-2026:**
  [JSON de 300 preguntas](recursos-compartidos/ccse/preguntas-2026.json) extraído
  del manual aportado en anexos, organizado en 20 temáticas y 34 subcategorías
  donde aportan valor. Conserva códigos, tareas oficiales, opciones, respuestas
  y páginas del enunciado y del solucionario. Cotejados los 300 enunciados,
  todas las opciones y las 300 soluciones mediante una segunda extracción
  del PDF; ver [criterios y verificación](recursos-compartidos/ccse/README.md).
  **Integrado localmente en `/practica`** con la estructura solicitada después
  por Pol: ruta de aprendizaje, repaso por temáticas, repaso inteligente y
  simulacro. La ruta tiene 20 secciones, 43 temas (34 subcategorías y 9 temas
  únicos) y un repaso final por sección. El repaso inteligente prioriza errores
  y preguntas pendientes en sesiones de hasta 10 preguntas y 5 minutos.
  El simulacro usa el banco completo para seleccionar 25 preguntas con el
  reparto oficial 10/3/2/3/7 y dura 30 minutos por petición de Pol; se distingue
  de los 45 minutos de la prueba oficial. Historial y pasos completados se
  guardan solo en este dispositivo; Reiniciar borra ese progreso. No se
  establece una sesión global entre escenas.
  **Pendientes:** revisión de esta estructura, siguiente fase de UX de
  cuestionarios/exámenes y publicación. Ver [criterios de práctica](vertical/diseno/practica/README.md).
  Por petición posterior de Pol, preparado el
  [prompt para los 20 iconos de temática](vertical/diseno/practica/PROMPT-ICONOS-TEMATICAS.md)
  para generarlos en otro entorno. Incluye una idea por temática, paleta compartida,
  estilo redondeado, tamaños y archivos independientes. La lista facilitada
  contenía 19; se añade Constitución e instituciones conforme al JSON.
  **Iconos recibidos e integrados localmente el 18-09-2026:** Pol aporta
  `familia-iconos-ccse.zip`. Sus 20 SVG originales se conservan en
  [recursos compartidos](recursos-compartidos/assets/ccse/tematicas/README.md).
  Las secciones se eligen ahora en una galería ilustrada, con iconos grandes,
  progreso y selección actual. La cabecera de cada sección, el acceso a la
  siguiente y el selector de repaso usan la misma familia. Comprobados los
  20 iconos, ambas galerías, navegación y progreso en móvil y escritorio;
  TypeScript, compilación y pruebas correctos. Pendientes la revisión de Pol,
  la publicación y reflejar los iconos en las capturas editoriales del librito.

- **Ajustes de demo del 18-09-2026, implementados localmente:** eliminados todos
  los tutoriales, el botón «Ver guía» y sus resaltados. Los enlaces antiguos con
  `?tour=1` siguen abriendo la escena, sin tutorial. `/entrevista` empieza por la
  elección de objetivo y vuelve a ella al reiniciar; solo esa escena de registro
  omite el encabezado con logo y avatar. Los modales de cliente se alojan dentro
  de la pantalla del móvil en ordenador, con desplazamiento propio, cierre con
  Escape y gestión del foco. Un recorte interior común ajusta las cuatro esquinas
  de la pantalla al marco. Publicación de estos ajustes pendiente.
- **Entrevista revisada el 18-09-2026:** investigación en Exteriores, Migraciones,
  Interior/Policía, Justicia y BOE. Sustituidas las tres preguntas fijas por
  preguntas condicionales: ubicación, nacionalidades, edad, entrada, situación
  actual, autorizaciones, protección, permanencia y contexto familiar/laboral.
  «Regularizar mi situación» se añade como objetivo. No se presupone residencia
  legal ni se determina elegibilidad. Respuestas sin precargar, opciones
  desconocidas y resumen editable. [Criterio y fuentes](vertical/diseno/entrevista/CRITERIO.md).
  Provincia y nacionalidades usan selectores con búsqueda; nacionalidad admite
  varias selecciones. La ciudadanía se obtiene de esas selecciones sin preguntar
  lo mismo dos veces; España se excluye cuando el objetivo es obtener nacionalidad.
  Editar una respuesta ofrece «Volver al resumen», conserva las respuestas
  pertinentes y marca las preguntas nuevas pendientes. El cierre tiene «Editar
  mis respuestas» y «Confirmar y enviar», con confirmación simulada, sin envío real.
- **Auditoría del cuestionario, 18-09-2026:** revisadas y corregidas las ramas antes
  de la prueba de Pol. Separados visita vencida, autorización vencida, tarjeta de
  larga duración y solicitudes pendientes; situación migratoria también para
  menores y personas temporalmente fuera de España. No se presume nacionalidad
  ni protección cuando se desconocen. Notificaciones prioritarias al principio;
  datos del familiar separados de los propios. País, permiso, trámite y parentesco
  usan selectores/opciones; texto libre solo para aclaraciones. La edición guarda
  al volver al resumen y puede cancelarse sin perder datos. Validadas fechas y
  combinaciones incompatibles. **41 casos completos en ordenador y móvil (82
  recorridos), selectores también a 320 px y 7.776 cruces del árbol.**
  [Hallazgos y validación](vertical/diseno/entrevista/REVISION-COHERENCIA.md).
  Compilación correcta; publicación pendiente.
- **Capturas y slides actualizadas el 18-09-2026:** localizadas **10 páginas con
  el marco de móvil anterior: 8–17**. Recapturadas las escenas a 3× y regeneradas
  las variantes seleccionadas, sus `index.pdf/png`, el librito final y las imágenes
  del visor. Esquinas inferiores ajustadas al bisel; las páginas 8–9 incorporan
  también la entrevista actual sin logo/avatar. Las muestras acumuladas antiguas
  se conservan como instantáneas históricas.
  [Auditoría de las 10 páginas](librito/VERIFICACION-MARCOS.json). Publicación pendiente.
- **Verificación local de estos ajustes:** TypeScript y compilación correctos;
  16 escenas a 320, 390, 768, 1280 y 1440 px, los cuatro modales de cliente,
  teclado, recorte del marco y cambio de tamaño con modal abierto. Diez
  situaciones de entrevista recorridas en ordenador y móvil, con edición,
  respuestas desconocidas y reinicio. Selectores comprobados también a 320 px,
  búsqueda sin tildes, teclado, doble nacionalidad, España según objetivo,
  vuelta directa al resumen y confirmación. Sin errores JavaScript. Ver
  [informe del 18-09-2026](vertical/diseno/movil/VERIFICACION.json).

- Investigación de contacto realizada el 17/09/2026: ficha individual del ICAB
  localizada con un móvil profesional distinto del WhatsApp general; correos
  públicos, antecedentes societarios y pistas históricas reunidos en
  `anexos/contacto-antonio-segura.md`, por petición de Pol. Se conserva una única
  versión del informe en anexos. La atención personal de Antonio no está
  confirmada. No se ha contactado con él; canal y momento pendientes de
  decisión de Pol.
- Estructura creada y contexto documentado.
- Base React con índice y 16 escenas autónomas. Entrevista, opciones, planes,
  compra, seguimiento, documentación, originales, práctica, consultas, perfil
  y gestión de rutas/cambios. Estado local y reinicio; sin tutoriales ni sesión global.
- Estilos compartidos creados a partir de la web y del proyecto antiguo.
- Logotipos, fotografías seleccionadas y fuentes locales con licencia guardados.
- Base de impresión actualizada a A5 horizontal en el formato, los tokens y
  el CSS. La estimación económica anterior era para otro formato; falta
  presupuesto actualizado y prueba de copistería.
- Tres diseños nuevos de portada en `librito/slides/01-portada/`: 02, editorial;
  03, diagonal; 04, conversación. Cada uno tiene PDF A5 y PNG, además de una
  comparativa conjunta y un generador editable. Verificados tamaño, texto,
  fuentes incrustadas y composición visual. **La 03 diagonal está elegida**;
  las otras se conservan como variantes. Sangrado de la elegida y prueba física
  pendientes para la fase de producción.
- La portada 1 conserva su PDF, PNG y PDF con sangrado. Los ajustes menores
  de cabecera se han apartado en `portada/descartadas/ajustes-de-cabecera/`.
- Eliminadas las propuestas verticales 01 a 04, su comparativa, su generador
  y el formato histórico, por petición de Pol. No quedan archivos con prefijo 05.
- Git inicializado en `as-abogados/` el 17-09-2026, con rama inicial `main`
  y remoto `origin` apuntando al repositorio indicado por Pol. Primer commit
  subido a `main` con la cuenta `antonio-segura-abogados`; la rama local sigue
  `origin/main`. La publicación inicial usaba `main → /docs`;
  compilación y recursos públicos verificados el 17-09-2026.
- Planificación editorial y funcional documentada el 17-09-2026: 24 fichas de
  instrucciones, estructura por parejas, 18 vistas propuestas y ocho guías.
  La primera ejecución añade tres variantes de la pareja 12–13, una maqueta
  vectorial ampliada de la home y dos URLs locales. Cada variante tiene fuente,
  PDF y PNG en la carpeta de su página. **Las tres se han rechazado**; su UX
  queda como base técnica. La dirección interior aprobada después es la de 2–5.
- Apertura actual: `librito/muestras/01-03-apertura/`, con las páginas 1–3 en
  orden y la pareja 2–3 enfrentada. La portada no se ha rediseñado. Las páginas
  2 y 3 tienen texto editable, PDF, PNG e instrucciones. Captura real del informe
  y QR directo en la 3. Tamaño, fuentes y composición revisados. Pol aprueba
  esta dirección y pide continuar; se conservan los PDF originales.
- Continuación 4–5 desarrollada en `librito/muestras/04-05-negocio/`: cadena de
  valor con bifurcación documental y propuesta «Vuestro criterio. A mayor escala».
  Cada página conserva instrucciones, texto editable, PDF y PNG. Hay una pareja
  enfrentada y un acumulado 01–05; tamaño, fuentes y composición revisados.
  Pol ha aprobado también esta línea. No requieren QR ni escenas
  nuevas: construyen el argumento que precede al producto.
- Continuación 6–7 desarrollada en `librito/muestras/06-07-modelo/`: referente
  Campmany contrastado y tres mecanismos que Pol propone para AS. Cada página
  conserva instrucciones, texto editable, PDF y PNG. La pareja y el acumulado
  01–07 están revisados visualmente; mantienen sus enlaces a fuentes. Las nuevas
  variantes están pendientes de revisión. La página 6 se ha rehecho como variante
  02 con recursos oficiales; el punto 2 de la 7 incorpora, por la última petición
  de Pol, la comparación salarial con Barcelona para perfiles equivalentes.
  El ahorro es una hipótesis por validar. No se han modificado las escenas web.
- Comparativa 12–13 histórica rechazada en `librito/muestras/12-13/`; conserva
  sus maquetas y reservas de QR originales, sin reutilizarlas en el nuevo relato.
- Tanda **08–13** desarrollada en `librito/muestras/08-13-app/`. Cada página
  conserva instrucciones, texto, PDF y PNG; 12–13 usan la nueva variante 04.
  Capturas de las escenas React con un marco HTML/CSS común. QR en 9–13,
  decodificados desde el PDF. Originales 01–07 conservados. Revisión de Pol pendiente.
  Demo de esta tanda publicada y verificada en GitHub Pages (`36f85d3`).
- Leídos los nueve bocetos, el PDF de LinkedIn y las cuatro fotografías.
  El PDF del informe se ha verificado como documento legible de 57 páginas.
- Tanda **14–24** completa: once páginas nuevas y PDF de **24 páginas A5**.
  CV desde LinkedIn, fotos originales y mapa vectorial de España documentados.
  Las muestras anteriores se conservan. Revisión de Pol pendiente en 06–24.
- Verificación: TypeScript/build, 16 URLs a 320/390 px y pruebas de las
  interacciones. Se usó Chrome con perfil temporal al no haber navegador
  integrado conectado. Puntuación/repaso, revisión documental, logística,
  consultas, publicación de versiones y excepciones comprobados. No hay
  errores de JavaScript ni desbordamientos horizontales en esos anchos.
- PDF revisado visualmente: tamaño, fuentes, imágenes, parejas y contacto.
  Trece QR leídos desde el PDF completo y desde los PNG de registro.
  La prueba física y la preparación de sangrado para imprenta quedan pendientes.

- Presentación completa publicada en la home, sin visor PDF insertado. Selección
  de variantes en `librito/seleccion.json`, `index.pdf`/`index.png` por carpeta
  y PDF final compilado. Actions ejecuta la compilación en cada push a `main`;
  verificado el primer despliegue (`1099bfb`). Navegación pública comprobada a
  320, 390, 768 y 1440 px, con carga de 24 páginas y 16 escenas con sus guías en aquella versión; retiradas localmente el 18-09-2026.
  El PDF de Actions conserva visualmente las 24 páginas, textos y enlaces del local.

### Revisión visual de los QR · 18/09/2026

Implementadas las etiquetas inclinadas en las trece páginas con QR, con marco
fino y texto breve. La zona de acceso se compone con el código a la izquierda
del texto en las páginas de producto; 18–19 usan una banda inferior compacta.
El PDF final, los `index` y los recursos de la presentación se regeneran desde
la selección vigente. Las muestras históricas de las tandas conservan su diseño
anterior. Esta revisión local todavía no se ha publicado; la prueba física
sigue pendiente.
Comprobados los trece códigos desde las páginas completas del PDF a 300 ppp
con Apple Vision, con coincidencia exacta de destinos y enlaces de las bandas.
Revisada la composición de las trece páginas; las otras once conservan el
render anterior. Evidencia en `recursos-compartidos/qr/VERIFICACION.json`,
apartado `etiquetas20260918`.

### Lectura responsive y enlaces QR · 18/09/2026

Implementado localmente: «Ampliar» abre `/#/presentacion?pagina=N` en una vista
independiente, sin modal. La diapositiva se ajusta al espacio disponible en
móvil, tableta y escritorio, también en horizontal. Incluye zoom opcional ×2,
texto accesible, índice, navegación y vuelta al inicio conservando la página.
En el inicio y en la vista ampliada, pulsar una diapositiva con QR abre su
URL en una pestaña nueva. Los enlaces de `https://antonio-segura-abogados.github.io/`
usan el origen local (incluido el puerto) al navegar desde `localhost`,
`127.0.0.1` o `::1`; en GitHub Pages conservan el destino publicado. La ruta,
los parámetros y el fragmento se mantienen. Los dominios externos no cambian.
Se usa el registro compartido de destinos;
las diapositivas sin QR mantienen su imagen sin enlace.

Verificación local: compilación y TypeScript correctos; navegación, recarga,
zoom, texto y controles a 320, 390, 768, 844 y 1440 px. Comprobadas las 24 páginas
en ambas vistas y la apertura de sus QR, con destinos externos
interceptados durante la prueba. [Registro](vertical/diseno/presentacion/VERIFICACION-LECTURA.json).
Publicación pendiente.

## CRM a pantalla completa · 18-09-2026

**Nueva petición de Pol:** el configurador existente es una base insuficiente;
quiere una UI mockeada de un CRM completo, profesional y a pantalla completa.
Amplía expresamente la petición a `/gestion/cambios`, con componentes
estructurales compartidos.

**Implementado localmente:** AS Workspace ocupa el navegador con menú lateral,
cabecera, búsqueda, notificaciones de muestra y diez vistas: vista general,
expedientes, ficha individual, tareas/agenda, documentos, conversaciones,
catálogo de rutas, constructor, control de cambios y equipo. Configurador y
Cambios mantienen sus URLs de QR y usan la misma estructura de producto.
Se puede editar, añadir y ordenar pasos, previsualizar la app, publicar una
versión simulada, seleccionar el alcance de un cambio, registrar una excepción,
crear expedientes, revisar documentos y responder conversaciones ficticias.

**Decisión de alcance:** las escenas de cliente siguen siendo autónomas.
Dentro de `/gestion/*` sí hay navegación y estado de demo compartido durante
la sesión, necesario para enseñar el backoffice solicitado. Cada URL sigue
admitiendo entrada directa. Recarga, salida del CRM o Reiniciar restauran la
muestra. No hay backend, autenticación ni comunicaciones reales. El control
de cambios usa un escenario preparado, no un motor jurídico general.

**Verificado:** compilación/TypeScript, diez vistas a 1280, 768, 390 y 320 px,
revisión visual en Chrome e interacciones principales; corregidos retorno de
foco en diálogos, búsqueda sin tildes y conservación del borrador al navegar.
[Alcance y verificación del CRM](vertical/diseno/crm/README.md).
**Capturas actualizadas por petición de Pol:** las slides 18–19 incorporan
ahora el CRM completo, incluido el menú y la cabecera, con imágenes reales de
Chrome a 1920 × 1250 px. Ajustada la distribución de imagen, párrafo y QR para
conservar toda la interfaz; titulares, textos y destinos sin cambios.
Regeneradas las variantes elegidas, `index.pdf/png`, el librito de 24 páginas
y los recursos del visor. Las otras 22 páginas conservan su render anterior.
Dos QR decodificados desde el PDF a 300 ppp; composición revisada.
[Verificación](librito/VERIFICACION-CRM.json).
**Pendientes:** revisión visual de Pol y publicación.

## Próximos pasos

1. Revisar **6–24** dentro del librito completo. La dirección de las páginas
   1–5 ya está aprobada; las nuevas variantes se mantienen editables por página.
2. Ajustar texto, fotos o composición a partir de esa revisión, preservando
   el relato y la independencia de las escenas.
3. Usar `npm run build:book` tras editar la variante y `git push` para publicar
   mediante Actions. Revisar siempre la ejecución del workflow.
4. Preparar el archivo de producción según el taller: sangrado de cubiertas,
   perfil de color si lo pide y prueba física A5 con todos los QR.
5. Conservar las URLs publicadas al revisar páginas y demos.

## Observaciones concretas para futuras sesiones

- Los logotipos públicos localizados son raster pequeños. El horizontal tiene
  270 × 109 px: sirve para la base web, pero hace falta un original vectorial
  o de mayor resolución para una portada con logo grande.
- Las imágenes `maps.jpeg` y `videocall.jpeg` del proyecto antiguo se han
  guardado como referencias, con procedencia original sin verificar.
- Se detectaron credenciales de Stripe en
  `../as-abogados-planteamiento-antiguo/src/app/slides/Backlog-TMS.md`, ajeno a
  esta propuesta. No se ha copiado. El usuario ha sido avisado para revisar y
  revocar las credenciales; no volver a volcarlas en documentación o registros.
- La marca y las fotos del despacho se catalogan con su procedencia; no se
  les atribuye una licencia libre. Las fuentes sí incluyen su licencia OFL.
- Mantener esta sección y las decisiones al día al terminar cada fase.
- `tmp/` contiene originales aportados por Pol, pese a su nombre: **no limpiarla
  como temporal**. Las fotos se asocian por sus nombres de archivo; los documentos
  personales se conservan. La web solo publica sus páginas maquetadas, conforme
  a la petición de mostrar la presentación completa.
- La exploración 12–13 fue rechazada. La nueva instrucción es desarrollar
  el librito secuencialmente, conservando la UX. No volver a recomendar las
  variantes rechazadas ni pedir elegir entre ellas. No se han usado subagentes.
- La independencia de URLs sigue vigente para las escenas de cliente. La
  petición posterior del CRM incorpora navegación y estado de demo entre las
  vistas `/gestion/*`, sin exigir un recorrido previo para abrir ninguna URL.

## Selección y renders vigentes

El 18-09-2026, por petición de Pol, se sustituye literalmente la introducción de
la diapositiva 15 por el texto sobre automatizar la logística y simplificar la
entrega del original. Regenerados la página, el PDF final y los recursos del
visor local; composición revisada. Publicación pendiente.

El 18-09-2026, por petición de Pol, se retira de la diapositiva 23 la foto de
Surreal Boost y su pie. Tras su corrección, la foto de VIEWNEXT vuelve a su
posición original a la izquierda, completa y sin retoques. A la derecha se añade
un QR al LinkedIn de Pol con la misma banda azul de las demos y el texto «Puedes
leer recomendaciones en mi perfil de LinkedIn». Actualizados los renders, el PDF
final y los recursos del visor local.
El archivo fotográfico original se conserva. Publicación pendiente.

Petición de Pol: conservar variantes y tener un `index.pdf` y un `index.png`
en la raíz de cada diapositiva. Implementado en las 24 carpetas. El compilador
utiliza `librito/seleccion.json`; la portada 03 también tiene ahora una carpeta
de variante normalizada y conserva sus archivos históricos. El mismo proceso
genera `librito/librito-final.pdf` y la presentación web.

La reproducción del compilador conserva el aspecto de las 24 páginas revisadas.
El nuevo visor permite abrir una página mediante `/#/?pagina=14` y su demo con
un botón contextual. La selección activa no cambia la aprobación editorial:
01–05 mantienen su dirección aprobada; 06–24 están pendientes de revisión de Pol.
