# Una primera entrevista que prepara el trabajo del abogado

Estado: **variante desarrollada, pendiente de revisión de Pol**, 17-09-2026. Página propuesta **9/24**;
identificador estable `entrevista`. Pareja enfrentada 8–9.
Origen: **S06**.

## Instrucción de Pol

Fragmento literal pertinente (saltos de línea normalizados). El
[registro completo del encargo](../../planificacion/ENCARGO-2026-09-17.md)
conserva el resto y las aclaraciones posteriores.

> Sería el punto 1, a destacar que te he dejado el concepto para el slide el concepto de tmp/slide6.png con el concepto de la app con campos de texto en un chat. Esto permitiría sin gastar recursos targuetear el cliente.
> 
> QR de vertical silbe incluido. Aquí como es algo más complejo, estaría bien usar un sistema de tutorial guiado.

## Desarrollo propuesto, pendiente de revisión

Mostrar una entrada guiada que reúna contexto, reduzca preguntas repetidas y derive los casos que requieren atención profesional.

**Composición:** Pantalla de chat con respuesta de fecha, selector y texto breve; resumen final visible en un detalle. Mantener controles estructurados además del formato conversacional.

**QR / demo:** #/entrevista?tour=1. Guía: objetivo → respuestas → edición → resumen.

**Criterio de contenido:** La demo usa preguntas y ramas preparadas. No prometer coste cero, atención jurídica automática ni selección definitiva de clientes.

## Referencias

- [slide6.png](../../../tmp/slide6.png)
- [PLAN-DEMO.md](../../../vertical/PLAN-DEMO.md)

Aplicar las [reglas comunes de diseño y variantes](../../PLAN-EDITORIAL.md).
La variante desarrollada figura a continuación. Conservar futuras variantes
en esta misma carpeta y anotar la elegida tras la revisión.


## Tanda de seis páginas: desarrollo vigente

> haz una tanda de 6 diapositivas

Se desarrollan las páginas 08–13 en orden. Se conserva la dirección de la
portada diagonal y de 02–07, con la UX dentro de móviles hechos en HTML/CSS.
La paginación mantiene las parejas enfrentadas 8–9, 10–11 y 12–13.

**Variante actual:** [01-conversacion](variantes/01-conversacion/README.md), pendiente de revisión.

Chat con preguntas estructuradas, fecha de residencia legal, respuesta desconocida y resumen editable.

**URL de esta escena:** `#/entrevista?tour=1`. QR vectorial de 28 mm, con tutorial opcional y reinicio. Cada URL es autónoma.

Las interfaces se capturan desde el navegador; las cifras y el caso son ficticios.
El generador conserva los PDF originales de 01–07 y todas las variantes rechazadas.

## Render vigente y publicación

Petición posterior de Pol: un `index.pdf` y un `index.png` en la raíz de cada
diapositiva, como render de la variante elegida, y la presentación completa en
la home del vertical. [Selección común](../../seleccion.json) y
[compilador](../../COMPILAR.md). Los `index` se regeneran, no se editan a mano.
