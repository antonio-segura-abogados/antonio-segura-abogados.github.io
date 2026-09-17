# Entender las opciones antes de decidir

Estado: **variante desarrollada, pendiente de revisión de Pol**, 17-09-2026. Página propuesta **10/24**;
identificador estable `opciones`. Pareja enfrentada 10–11.
Origen: **S07, pantalla p1**.

## Instrucción de Pol

Fragmento literal pertinente (saltos de línea normalizados). El
[registro completo del encargo](../../planificacion/ENCARGO-2026-09-17.md)
conserva el resto y las aclaraciones posteriores.

> Sería en punto 2, donde se muestra por ejemplo 3 opciones:
> Tarjeta de residencia por matrimonio (6 meses)
> Nacionalidad con examen (2 años)
> Nacionalidad por residencia (10 años)
> 
> Puedes ver el boceto de concepto en tmp/slide7p1.png, tmp/slide7p2.png y tmp/slide7p3.png .
> 
> La idea es que las pantallas que ve el usuario son p1 —> p2 —> p3

## Desarrollo propuesto, pendiente de revisión

Comparar condiciones, pasos y costes antes de elegir una ruta; continuar la contratación en la página enfrentada.

**Composición:** Tres tarjetas con distinto estado de aplicabilidad y una ampliación de la ruta elegida. Mantener condiciones a la vista en lugar de grandes promesas de tiempo.

**QR / demo:** #/opciones?tour=1. Guía propia; planes y pago son otra escena autónoma.

**Criterio de contenido:** Los tres ejemplos originales no son reglas válidas para programar. Corregir residencia/nacionalidad, elegibilidad y pruebas; no ofrecer alternativas incompatibles como equivalentes.

## Referencias

- [slide7p1.png](../../../tmp/slide7p1.png)
- [PLAN-DEMO.md](../../../vertical/PLAN-DEMO.md)
- [FUENTES-PROPUESTA.md](../../../recursos-compartidos/investigacion/FUENTES-PROPUESTA.md)

Aplicar las [reglas comunes de diseño y variantes](../../PLAN-EDITORIAL.md).
La variante desarrollada figura a continuación. Conservar futuras variantes
en esta misma carpeta y anotar la elegida tras la revisión.


## Tanda de seis páginas: desarrollo vigente

> haz una tanda de 6 diapositivas

Se desarrollan las páginas 08–13 en orden. Se conserva la dirección de la
portada diagonal y de 02–07, con la UX dentro de móviles hechos en HTML/CSS.
La paginación mantiene las parejas enfrentadas 8–9, 10–11 y 12–13.

**Variante actual:** [01-decision](variantes/01-decision/README.md), pendiente de revisión.

Una vía a estudiar, una revisión complementaria y una valoración individual; detalle y selección locales.

**URL de esta escena:** `#/opciones?tour=1`. QR vectorial de 28 mm, con tutorial opcional y reinicio. Cada URL es autónoma.

Las interfaces se capturan desde el navegador; las cifras y el caso son ficticios.
El generador conserva los PDF originales de 01–07 y todas las variantes rechazadas.

## Render vigente y publicación

Petición posterior de Pol: un `index.pdf` y un `index.png` en la raíz de cada
diapositiva, como render de la variante elegida, y la presentación completa en
la home del vertical. [Selección común](../../seleccion.json) y
[compilador](../../COMPILAR.md). Los `index` se regeneran, no se editan a mano.
