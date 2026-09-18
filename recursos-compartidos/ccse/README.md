# Banco de preguntas CCSE 2026

[preguntas-2026.json](preguntas-2026.json) contiene las **300 preguntas oficiales**
del [manual aportado por Pol](../../anexos/Manual%20CCSE%202026.pdf), con todas sus
opciones y las respuestas del solucionario. Preparado el 18-09-2026 como base
para el replanteamiento de `/practica`.

## Alcance y estado

El banco está completo y verificado. Se han incluido las cinco tareas del manual:

| Tarea oficial | Códigos | Preguntas |
| --- | --- | ---: |
| 1. Gobierno, legislación y participación ciudadana | 1001–1120 | 120 |
| 2. Derechos y deberes fundamentales | 2001–2036 | 36 |
| 3. Organización territorial y geografía | 3001–3024 | 24 |
| 4. Cultura e historia de España | 4001–4036 | 36 |
| 5. Sociedad española | 5001–5084 | 84 |
| **Total** | | **300** |

Hay 264 preguntas con tres opciones y 36 de verdadero/falso. Cada código aparece
una sola vez. Se conservan las preguntas similares que el manual incluye con
códigos distintos: eliminarlas reduciría la cobertura del banco oficial.

La clasificación por temas es editorial y atraviesa las tareas originales. Por
ejemplo, gastronomía reúne la pregunta sobre Juan Mari Arzak de la tarea 4 y
las de platos, productos y horarios de la tarea 5. Cada pregunta conserva
también su tarea oficial, lo que permite recuperar esa distribución.

**Integrado localmente el 18-09-2026:** `/practica` importa este banco en los
cuatro modos solicitados por Pol: ruta de aprendizaje, repaso por temáticas,
repaso inteligente y simulacro de examen. La pequeña muestra de
`../demo/acompanamiento.json` queda como antecedente. Ver
[criterios de la vista](../../vertical/diseno/practica/README.md).
Pendientes la revisión de la estructura, la próxima fase de UX de cuestionarios
y la publicación. El PDF fuente permanece en anexos.

## Temáticas

| Temática | Preguntas |
| --- | ---: |
| Constitución e instituciones | 49 |
| Administración territorial | 20 |
| Participación ciudadana | 14 |
| Derechos y deberes | 19 |
| Seguridad y defensa | 12 |
| España y los organismos internacionales | 2 |
| Lenguas de España | 11 |
| Geografía y población | 28 |
| Historia de España | 10 |
| Cultura, arte y ciencia | 24 |
| Fiestas y tradiciones | 7 |
| Gastronomía | 9 |
| Deportes | 4 |
| Documentación y trámites | 11 |
| Familia, vivienda y convivencia | 11 |
| Educación | 17 |
| Salud y protección social | 16 |
| Medios de comunicación y consumo | 6 |
| Transporte y seguridad vial | 13 |
| Trabajo, economía e impuestos | 17 |
| **Total** | **300** |

Las temáticas amplias se subdividen, por ejemplo geografía en ciudades y
población, geografía física y clima, y parques nacionales. Hay **34 subcategorías**
en total. Las temáticas que ya forman un bloque manejable no se subdividen.
Se asigna un único tema principal por pregunta para no duplicar preguntas al
componer sesiones. Fiestas recoge las uvas de Nochevieja; gastronomía, los platos
y productos. Las preguntas sobre derechos educativos y sanitarios se estudian
en educación y salud, respectivamente.

## Estructura del JSON

| Campo | Uso |
| --- | --- |
| `id`, `edicion`, `idioma`, `versionEsquema` | Identificación y versión del formato de datos. |
| `fuente` | Documento original, autoría, huella SHA-256 y criterio de paginación. |
| `criterios` | Alcance, transcripción, clasificación y tratamiento de repeticiones. |
| `cobertura` | Recuentos del conjunto por formato de pregunta. |
| `tareasOficiales` | Las cinco tareas, códigos y rangos inclusivos de páginas `[inicio, fin]`. |
| `tematicas[]` | Temas con `id`, `nombre`, `descripcion`, recuento, subcategorías y preguntas. |
| `tematicas[].subcategorias[]` | Identificadores, nombres y recuentos de subcategorías; lista vacía si no se usan. |
| `tematicas[].preguntas[]` | Preguntas de ese tema, ordenadas por su código oficial. |

Cada pregunta tiene:

| Campo | Uso |
| --- | --- |
| `id` | Código oficial como texto, por ejemplo `"5019"`. |
| `tareaOficial` | Número entero del 1 al 5. |
| `subcategoriaId` | Referencia a una subcategoría del tema o `null`. |
| `tipo` | `opcion_multiple` o `verdadero_falso`. |
| `enunciado` | Texto del manual, con espacios de maquetación normalizados. |
| `opciones[]` | Opciones con `id` (`a`, `b`, `c`) y `texto`, en el orden original. |
| `respuestaCorrecta` | El `id` de la opción correcta, **no un índice numérico**. |
| `respuesta` | Texto íntegro de la opción correcta, útil para tarjetas de estudio. |
| `referencia.pregunta` | `paginaPdf` y `paginaManual` del enunciado. |
| `referencia.solucion` | `paginaPdf` y `paginaManual` de la respuesta en el solucionario. |

Para reunir todas las preguntas en la futura interfaz:

```ts
const preguntas = banco.tematicas.flatMap(tematica => tematica.preguntas);
const esCorrecta = opcionElegida.id === pregunta.respuestaCorrecta;
```

Se conserva la redacción y puntuación del PDF, incluidas sus erratas. Por ejemplo,
la pregunta 1031 dice «municiales» en el original; no se ha corregido silenciosamente.
Las respuestas corresponden al solucionario de la edición aportada. El banco no
incluye explicaciones añadidas ni preguntas inventadas a partir del texto teórico.

## Paginación y comprobación

El PDF aportado tiene 109 páginas e incluye cuatro páginas preliminares del
despacho. La página impresa 18 del manual es la página 22 del archivo. Todas
las referencias usan numeración desde 1 y conservan ambas cifras. El solucionario
está en las páginas **103–105 del PDF**, numeradas **99–101** en el manual.
Se ha seguido la numeración visible, porque el sumario tiene algunas referencias
que no coinciden con las páginas reales.

La extracción inicial se hizo con PyMuPDF. Una segunda extracción mediante
`pypdf` coteja los **300 enunciados, todas las opciones y las 300 respuestas**,
además de sus páginas. Solo se ignoran espacios de maquetación en ese cotejo.
También se han revisado visualmente páginas representativas de preguntas y
las tablas del solucionario.

Para repetir la verificación, desde `as-abogados/`:

```sh
.venv-librito/bin/python recursos-compartidos/ccse/verificar.py
```

Requiere `pypdf`, ya disponible en el entorno Python del librito. El verificador
es de solo lectura y comprueba también la huella del PDF, códigos únicos,
cobertura por tarea, tipos de pregunta, correspondencia entre letra y texto de
respuesta, subcategorías, recuentos y referencias de páginas. Falla si hay
diferencias con la fuente.
