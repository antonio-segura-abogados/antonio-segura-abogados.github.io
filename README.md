# Candidatura proactiva · Antonio Segura Abogados

Este README conserva el contexto del proyecto para poder retomarlo en un chat
nuevo. Última actualización: **17 de septiembre de 2026**.

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
Pruebas locales del visor y las escenas superadas; primer despliegue automático en comprobación.

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
«Bien, continua en esta linea». Los PDF 1–5 permanecen intactos.
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
instrucciones, texto editable y exportaciones. Las páginas 01–13 siguen intactas.

**Corrección posterior en 6–7:** Pol pide recursos visuales reales de Campmany.
La página 6 usa ahora la variante 02 con logo e ilustración oficiales descargados;
la composición anterior se conserva. En su última aclaración, Pol pide
**añadir las comparaciones salariales al punto 2 de la página 7**. El equipo
distribuido permite explorar salarios inferiores a los de Barcelona para
perfiles equivalentes, como hipótesis de ahorro por validar, sin cifras inventadas.

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
en un panel local. Todas las escenas admiten guía y reinicio. El catálogo de
18 vistas queda cubierto sin sesión global ni navegación obligatoria de app.

Decisiones y matices incorporados al plan:

- Datos de clientes, precios, expedientes, pagos, envíos y actividad: simulados.
  Las fuentes citadas y la trayectoria de Pol son reales; no se inventa normativa.
- Informe de Anthropic confirmado por enlace de Pol: *Economic Scenarios for
  Transformative AI*, septiembre de 2026. PDF descargado en investigación,
  fuera de anexos conforme a la frase literal del encargo. La selección de
  figura 4 (primer panel, con todos sus escenarios) ya está en la propuesta
  de página 3. QR directo al PDF generado y decodificado, también desde el render.
- Campmany es una referencia de oferta digital comprobable. Rentabilidad,
  ahorros, dimensionamiento de mercado y estructura interna son hipótesis.
  El logo y la ilustración de su web se conservan con procedencia en
  `recursos-compartidos/assets/referentes/campmany/` y se usan en la página 6.
- La comparativa de opciones debe separar requisitos jurídicos, plazos de
  resolución y planes comerciales. Corregir los ejemplos de plazos/exámenes
  antes de convertirlos en interfaz o texto público.
- El configurador requiere revisión jurídica, versiones, vigencia y control
  de los expedientes existentes. No se promete adaptar cualquier cambio sin código.
- Pol pide omitir las skills desactualizadas de LinkedIn y centrarse en las
  experiencias. La base de CV extrae VIEWNEXT, Surreal Boost, docencia y formación,
  y relaciona las fotos aportadas. CV maquetado en p. 22 y dos fotos originales en p. 23, con contacto.
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
- **QR:** base pública indicada por Pol. Trece QR generados en SVG y PNG:
  doce de demo y uno externo del informe. Los trece se han decodificado también
  desde el PDF completo a 300 ppp. Páginas 3, 9–19 y 24. Generado no significa publicado:
  el registro conserva `printReady: false` hasta verificar destino y prueba física.
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
  y gestión de rutas/cambios. Estado local, guías y reinicio; no sesión global.
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
  Los PDF anteriores permanecen intactos. Revisión de Pol pendiente en 06–24.
- Verificación: TypeScript/build, 16 URLs a 320/390 px y pruebas de las
  interacciones. Se usó Chrome con perfil temporal al no haber navegador
  integrado conectado. Puntuación/repaso, revisión documental, logística,
  consultas, publicación de versiones y excepciones comprobados. No hay
  errores de JavaScript ni desbordamientos horizontales en esos anchos.
- PDF revisado visualmente: tamaño, fuentes, imágenes, parejas y contacto.
  Trece QR leídos desde el PDF completo y desde los PNG de registro.
  La prueba física y la preparación de sangrado para imprenta quedan pendientes.

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
- La independencia de URLs es una decisión explícita de Pol. No restablecer
  el recorrido conectado ni el estado global del plan inicial. Las pantallas
  comparten componentes cuando aporta valor, no una sesión obligatoria.

## Selección y renders vigentes

Petición de Pol: conservar variantes y tener un `index.pdf` y un `index.png`
en la raíz de cada diapositiva. Implementado en las 24 carpetas. El compilador
utiliza `librito/seleccion.json`; la portada 03 también tiene ahora una carpeta
de variante normalizada y conserva sus archivos históricos. El mismo proceso
genera `librito/librito-final.pdf` y la presentación web.

La reproducción del compilador conserva el aspecto de las 24 páginas revisadas.
El nuevo visor permite abrir una página mediante `/#/?pagina=14` y su demo con
un botón contextual. La selección activa no cambia la aprobación editorial:
01–05 mantienen su dirección aprobada; 06–24 están pendientes de revisión de Pol.
