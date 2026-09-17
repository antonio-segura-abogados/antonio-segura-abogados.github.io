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
concretas de una demo navegable. Esa demo será un *vertical slice*: una parte
acotada pero convincente de la experiencia que se podría desarrollar para ellos.

La demo está publicada en **GitHub Pages desde una cuenta dedicada a esta
candidatura**. El repositorio indicado es
`https://github.com/antonio-segura-abogados/antonio-segura-abogados.github.io.git`,
configurado como remoto `origin` del repositorio local en `as-abogados/`.
URL pública: `https://antonio-segura-abogados.github.io/`. Publicación desde
`main`, carpeta `/docs`, verificada el 17-09-2026: HTML y recursos responden
HTTP 200 y coinciden con la compilación local. Prueba interactiva pendiente.

```text
as-abogados/
├── librito/                 Documento imprimible y especificación de impresión
│   ├── portada/             Elegida: 03 diagonal; se conservan las demás variantes
│   ├── slides/              Fichas por tema; tres variantes de las páginas 12–13
│   ├── muestras/            Comparativas y generadores de las pruebas de interior
│   ├── planificacion/       Encargo y paginación propuesta
│   └── PLAN-EDITORIAL.md    Relato y estructura propuesta de 24 páginas
├── docs/                    Compilación publicada en GitHub Pages
├── vertical/                Aplicación de demostración
├── anexos/                  Investigación de contacto, futuro CV y otros apoyos
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
los anexos y el librito no forman parte de su contenido público.

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
antiguo **no son datos confirmados del despacho**. Tampoco está cerrado qué
pantallas entrarán en la demo. El librito no debe convertir esas hipótesis en
promesas ni atribuir al promotor experiencia o recomendaciones aún no aportadas.

## Alcance de la primera fase

1. Crear esta estructura independiente.
2. Inicializar un proyecto en blanco con una tecnología adecuada.
3. Analizar la presentación antigua y seleccionar recursos reutilizables.
4. Revisar la web del despacho y guardar fuentes, colores e imágenes.
5. Investigar impresión económica y definir las medidas iniciales.
6. Documentar el contexto para continuar en futuras conversaciones.

Esta fase no incluye redactar el librito final, diseñar el CV, implementar los
flujos de producto, crear la cuenta de GitHub o publicar la demo.

## Fase actual: primera muestra de interior y escenas autónomas

El **17-09-2026**, Pol pidió inicialmente planificación sin ejecución y después
autorizó la primera muestra: **tres variantes de la pareja 12–13 y propuesta
visual de la home**. Ha aportado el esquema, nueve bocetos, el PDF exportado
de LinkedIn y cuatro fotos. La portada 03 diagonal está elegida; el interior
sigue en revisión.

**Aclaración de alcance que prevalece:** cada URL de la demo representa una
escena autónoma. Pol no quiere construir una aplicación funcional navegable.
Las escenas pueden desarrollarse en cualquier orden y tener interacciones
locales. Se comparten componentes y estilos; no se exige un recorrido conectado
ni estado global. Empezar por la home es una prueba visual, no una dependencia.

La propuesta de estructura consta de **24 páginas**: portada; presentación y
dirección tecnológica; cadena de valor y oportunidad; referencia de mercado;
experiencia del cliente; configurador del despacho; beneficios y puesta en
marcha; CV/fotografías y contraportada. Se conserva la doble «slide 3» original
como `S03-IA` y `S03-CADENA` para no perder trazabilidad.

Los contenidos divididos se organizan en parejas enfrentadas **6–7, 10–11,
12–13, 14–15, 18–19 y 22–23**. Los números cuentan las caras de cubierta.
Las carpetas tienen identificadores por tema para permitir reordenarlas sin
renombrar los originales. Cada página propuesta tiene `INSTRUCCIONES.md`,
incluida la portada existente. Las páginas 12–13 ya tienen tres variantes
completas en sus respectivas carpetas; las demás siguen pendientes.

El plan del vertical conserva **18 vistas propuestas** y ocho temas de guía.
Cada QR abrirá un ejemplo preparado sin pasos previos. El configurador y su
previsualización compartirán datos dentro de su propia escena. Las primeras
vistas locales son `/expediente` y `/expediente/pasos/documentacion`; el resto
sigue pendiente. La home incluye un detalle local y una guía de tres pasos;
el menú inferior muestra la estructura, sin enlazar otras escenas.

Decisiones y matices incorporados al plan:

- Datos de clientes, precios, expedientes, pagos, envíos y actividad: simulados.
  Las fuentes citadas y la trayectoria de Pol son reales; no se inventa normativa.
- Informe de Anthropic confirmado por enlace de Pol: *Economic Scenarios for
  Transformative AI*, septiembre de 2026. PDF descargado en investigación,
  fuera de anexos conforme a la frase literal del encargo. La selección de
  captura está documentada; no se ha maquetado la página ni generado el QR.
- Campmany es una referencia de oferta digital comprobable. Rentabilidad,
  ahorros, dimensionamiento de mercado y estructura interna son hipótesis.
- La comparativa de opciones debe separar requisitos jurídicos, plazos de
  resolución y planes comerciales. Corregir los ejemplos de plazos/exámenes
  antes de convertirlos en interfaz o texto público.
- El configurador requiere revisión jurídica, versiones, vigencia y control
  de los expedientes existentes. No se promete adaptar cualquier cambio sin código.
- Pol pide omitir las skills desactualizadas de LinkedIn y centrarse en las
  experiencias. La base de CV extrae VIEWNEXT, Surreal Boost, docencia y formación,
  y relaciona las fotos aportadas. Primera selección y texto de trabajo preparados.
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
  Interior con márgenes blancos; portada excepcional con fondo azul corporativo
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
- **QR:** se preparan las convenciones, pero los QR finales se generarán cuando
  existan una URL pública y pantallas verificadas. El registro distingue las rutas
  implementadas localmente de las que siguen propuestas; ninguna está lista
  para un QR impreso.
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

`npm run build` comprueba TypeScript y genera `vertical/dist/` para pruebas
locales. `npm run build:pages` comprueba TypeScript y regenera `docs/`, la carpeta
publicada por GitHub Pages. Para actualizar la web, ejecutar ese comando,
incluir `docs/` en el commit junto con los cambios de código y hacer push a
`main`. El comando reemplaza el contenido generado de `docs/`; no editarlo a mano.
Se incluye `.nojekyll` y la licencia de la fuente. Pages sirve únicamente `docs/`. El servidor de desarrollo y el de previsualización
mostrarán su URL local al arrancar. `npm run typecheck` permite comprobar solo
los tipos. No hay backend, autenticación, cobros ni recogida de datos personales. Las
interacciones de las muestras usan exclusivamente datos ficticios locales.

## Documentación para retomar cada parte

- [Identidad visual y análisis del proyecto antiguo](recursos-compartidos/investigacion/identidad-visual.md).
- [Inventario, fuentes y límites de los assets](recursos-compartidos/investigacion/catalogo-assets.md).
- [Investigación de contacto de Antonio Segura y antecedentes societarios](anexos/contacto-antonio-segura.md).
- [Comparativa de impresión y presupuesto](librito/IMPRESION.md).
- [Portadas horizontales y comparativa de tres diseños nuevos](librito/slides/01-portada/README.md).
- [Especificación de formato](librito/formato.json).
- [Base técnica y futura publicación](vertical/README.md).
- [Convenciones de QR](recursos-compartidos/qr/README.md).
- [Material disponible y pendiente en anexos](anexos/README.md).
- [Plan editorial: páginas, parejas y trazas de diseño](librito/PLAN-EDITORIAL.md).
- [Primera muestra: variantes 12–13 y escena de seguimiento](librito/muestras/12-13/README.md).
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
- Base React con índice de muestras, dos URLs autónomas de seguimiento/detalle
  y manejo de direcciones inexistentes. La home abre instrucciones en un diálogo,
  permite aportar un ejemplo, reiniciar y ver una guía; las demás escenas están
  pendientes. No hay navegación funcional entre secciones del producto.
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
  `origin/main`. Demo publicada en GitHub Pages desde `main → /docs`;
  compilación y recursos públicos verificados el 17-09-2026.
- Planificación editorial y funcional documentada el 17-09-2026: 24 fichas de
  instrucciones, estructura por parejas, 18 vistas propuestas y ocho guías.
  La primera ejecución añade tres variantes de la pareja 12–13, una maqueta
  vectorial ampliada de la home y dos URLs locales. Cada variante tiene fuente,
  PDF y PNG en la carpeta de su página. Ninguna variante interior está elegida.
- Comparativa y muestras A5: `librito/muestras/12-13/`. Las interfaces del papel
  son maquetas vectoriales con los mismos datos que React; no se presentan como
  capturas reales. Los QR son reservas de espacio etiquetadas como pendientes.
- Leídos los nueve bocetos, el PDF de LinkedIn y las cuatro fotografías.
  El PDF del informe se ha verificado como documento legible de 57 páginas.
- Verificación: TypeScript/build superado para las nuevas escenas; PDFs
  renderizados y revisados, tamaño A5 y fuentes incrustadas comprobados. El
  navegador integrado no estaba disponible: prueba interactiva web pendiente,
  al igual que la prueba física. La escena está disponible en el servidor local
  mientras siga abierto. Demo publicada y recursos HTTP verificados;
  la prueba interactiva sigue pendiente por falta de navegador disponible.

## Próximos pasos

1. Revisar las tres variantes de 12–13 y la escena; elegir una dirección
   interior. Conservar las parejas enfrentadas al cambiar la numeración.
2. Con la portada 03 diagonal elegida, definir la dirección visual interior y
   cerrar el caso ficticio,
   comparativa de opciones y planes. Editar el CV desde el PDF y fotos aportados.
   Firma: Pol Surriel; nombre completo: Pol Surriel Muixench.
3. Desarrollar las siguientes escenas autónomas y parejas del libro según
   prioridad editorial. Reutilizar componentes sin crear un recorrido global.
4. Probar las interacciones de la demo publicada y mantener `docs/` actualizado
   con `npm run build:pages` antes de cada publicación.
5. Generar QR estables e incorporarlos a la maquetación.
6. Exportar el PDF, verificar cada página y pedir una prueba física antes de
   imprimir los ejemplares de entrega.

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
  personales no se incorporan automáticamente al contenido público de la demo.
- Primera muestra autorizada y desarrollada el 17-09-2026: tres variantes de
  12–13 y seguimiento. El resto del libro no se considera encargado ni diseñado
  automáticamente por esta prueba. Mantener un chat de coordinación y trabajar
  por parejas y escenas. No se han usado subagentes en esta muestra.
- La independencia de URLs es una decisión explícita de Pol. No restablecer
  el recorrido conectado ni el estado global del plan inicial. Las pantallas
  comparten componentes cuando aporta valor, no una sesión obligatoria.
