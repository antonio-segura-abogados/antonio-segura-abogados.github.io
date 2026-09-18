# Revisión del árbol de entrevista · 18-09-2026

Petición de Pol: revisar la coherencia y los campos antes de su prueba del flujo.
Se ha revisado y corregido la implementación, además de ampliar las pruebas.
La entrevista prepara una primera consulta; no decide un procedimiento ni acredita
requisitos jurídicos por sí sola.

## Problemas encontrados y corregidos

| Problema anterior | Comportamiento actual |
| --- | --- |
| Turismo vencido y permiso de residencia vencido compartían una respuesta. A un turista se le pedía tipo de permiso y renovación. | Son situaciones distintas; la visita solo pregunta por su estancia e historial de viajes. |
| «Solicitud pendiente» sustituía a la situación migratoria. | Se recoge aparte: una persona puede estar de turismo y tener una solicitud familiar pendiente. |
| Se podía equiparar una TIE de larga duración caducada con residencia vencida. | Rama propia para larga duración/permanente; pregunta por la tarjeta física, sin concluir que se perdió la autorización. |
| Desconocer la nacionalidad o protección se trataba como ausencia de ciudadanía europea o de protección. | Lo desconocido queda pendiente; no abre por defecto una rama de tercer país ni de regularización. |
| Los menores saltaban todas las preguntas de autorización. | Se recoge representación y también situación/permiso; no se les pide actividad laboral ni medios de un reagrupante adulto. |
| Estar fuera de España implicaba omitir la posible residencia española. | Se separa ubicación actual de autorización en España. |
| A una persona europea sin certificado se le presuponía residencia legal. | Sin registro declarado se pregunta por llegada; con registro se puede preguntar por el inicio de residencia para nacionalidad. |
| Nacer en España se confundía con no haber entrado desde otro país. | «He vivido siempre en España» evita pedir llegada. Quien nació aquí y regresó puede indicar ese regreso. |
| Entrar desde Schengen no aclaraba con qué documentación se viajaba. | Solo en esa rama se pregunta por la condición o documento de entrada. |
| Se preguntaba de nuevo por un permiso anterior después de declarar el permiso vencido. | Se reutiliza ese dato. No se repite la pregunta por la autorización anterior. |
| Notificaciones y posibles plazos aparecían al final. | Se detectan tras los datos básicos y antes del historial migratorio. |
| Familia mezclaba datos propios, del familiar y varios familiares en una frase. | Parentesco principal, ubicación, nacionalidades, edad y situación del familiar se recogen por separado; otros familiares tienen una aclaración propia. |
| Vivienda y medios se pedían indiscriminadamente a cualquier consulta familiar. | Solo primera recogida cuando un residente adulto de tercer país en España consulta por un familiar en el exterior; no se convierten en requisitos universales. |
| Trabajo, estudios y vínculos familiares se repetían en la rama de nacionalidad. | Nacionalidad pregunta por su contexto específico, con selección múltiple; omite actividad laboral y el bloque familiar genérico. |
| La consulta de residencia no distinguía qué gestión se quería hacer. | Opciones de primera autorización, renovación, cambio, larga duración, tarjeta o revisión según la situación declarada. |
| Muchas preguntas combinaban tipo, fechas y explicaciones en un único texto libre. | Catálogos/opciones para lo clasificable y fechas separadas donde hacen falta. |
| Al editar una nacionalidad se podían borrar otras ramas mientras se quitaba y reponía una selección. | La edición se guarda al volver al resumen; cancelar conserva todo. Cambiar una rama elimina solo respuestas y opciones que dejan de corresponder. |
| Fechas futuras o fin de estancia anterior a la llegada no tenían explicación. | Mensajes junto al campo, avance deshabilitado y corrección accesible desde el resumen. No se calcula elegibilidad ni un plazo de recurso. |

## Revisión de campos

| Información | Control | Texto libre |
| --- | --- | --- |
| Provincia / ciudad autónoma | Selector filtrable del catálogo del INE | No |
| País actual y país del familiar | Selector filtrable, con alternativa para país/territorio no incluido | Solo si no aparece |
| Nacionalidades propias y del familiar | Selector filtrable múltiple; apatridia excluyente | Solo si no aparece |
| Entrada, situación, registro europeo, representación | Opciones concretas, con «No lo sé» | No |
| Autorización actual o anterior | Selector filtrable; evita pedir el nombre jurídico de memoria | Solo «Otra» |
| Solicitud pendiente | Opciones de trámite y fecha separada | Solo «Otro» |
| Notificación | Tipo y fecha de recepción separados | Solo «Otra comunicación» |
| Parentesco principal | Opciones | Solo «Otro familiar» |
| Grupos familiares y parentescos | Selección múltiple | Solo otro parentesco |
| Vivienda y medios | Opciones / selección múltiple | No |
| Contexto de nacionalidad | Selección múltiple; ninguna/desconocida excluyen las demás | Solo otro vínculo |
| Varias ausencias o familiares adicionales | Área de texto, con ejemplo y espacio suficiente | Sí: son datos variables que no encajan en una lista cerrada |

El texto libre usa áreas de varias líneas (hasta 500 caracteres), no una línea
estrecha para respuestas largas. No se piden nombres, NIE, pasaportes ni documentos
personales en esta demo.

## Validación reproducible

Desde `as-abogados/`:

```sh
node vertical/diseno/entrevista/auditar.mjs
node vertical/diseno/entrevista/verificar.mjs
npm run build
```

- [AUDITORIA.json](AUDITORIA.json): 41 casos con preguntas exigidas y excluidas;
  7.776 cruces de objetivo, ubicación, edad, ciudadanía, situación y protección.
  Comprueba orden causal, ausencia de preguntas duplicadas, opciones coherentes,
  conservación de respuestas, retirada de ramas y validación de fechas.
- [VERIFICACION-UI.json](VERIFICACION-UI.json): los mismos 41 casos a 1440 y 390 px;
  selectores también a 320 px. Recorridos completos hasta resumen, edición,
  cancelación, selección temporalmente vacía, cambios reales de rama, pendientes,
  confirmación, reinicio, teclado y ausencia de errores de JavaScript.
- Revisión visual de entrada, selección múltiple, edición y cierre en ordenador
  y móvil. Las capturas de comprobación se guardan en la ruta temporal del informe.

En los casos preparados, el recorrido tiene entre 6 y 20 preguntas. No se anuncia
un total fijo antes de conocer las respuestas; otros casos pueden abrir preguntas
adicionales. El muestreo y los cruces no equivalen a todas las combinaciones
posibles de respuestas ni sustituyen una validación jurídica del despacho.

## Fuentes y alcance

Se han vuelto a contrastar las distinciones con las
[hojas informativas de Migraciones](https://www.inclusion.gob.es/es/web/migraciones/hojas-informativas),
la información sobre [residencia ya autorizada](https://www.inclusion.gob.es/es/web/migraciones/vivir-en-espana/si-tiene-autorizacion),
la [hoja de larga duración nacional](https://www.inclusion.gob.es/documents/410169/2260168/49.%2BAutorizaci%C3%B3n%2Bde%2Bresidencia%2Bde%2Blarga%2Bduraci%C3%B3n%2Bnacional.pdf/4c5ad5d9-38bc-9cee-c579-fd84fc2b0355?download=false&t=1751011397153&version=1.0),
la [residencia de familiares de españoles](https://www.inclusion.gob.es/web/migraciones/w/18.-autorizacion-de-residencia-temporal-de-familiares-de-personas-con-nacionalidad-espanola)
y la [nacionalidad por residencia de Justicia](https://www.mjusticia.gob.es/es/ciudadania/tramites/nacionalidad-residencia).
El [criterio general](CRITERIO.md) conserva las fuentes restantes y los catálogos.

El contenido y las ramas son una decisión de producto para recoger contexto, no
un formulario oficial ni un dictamen. La demo no asigna arraigos, no promete
regularización ni codifica campañas extraordinarias o plazos de recursos.
Confirmar y enviar mantiene su confirmación simulada, sin transmisión de datos.
Publicación pendiente.
