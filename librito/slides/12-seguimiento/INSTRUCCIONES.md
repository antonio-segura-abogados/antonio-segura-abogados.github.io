# Saber dónde estoy y qué viene después

Estado: **variante 04 desarrollada en orden, pendiente de revisión; variantes 01–03 rechazadas**, 17-09-2026. Página propuesta **12/24**;
identificador estable `seguimiento`. Pareja enfrentada 12–13.
Origen: **S08, home**.

## Instrucción de Pol

Fragmento literal pertinente (saltos de línea normalizados). El
[registro completo del encargo](../../planificacion/ENCARGO-2026-09-17.md)
conserva el resto y las aclaraciones posteriores.

> El objetivo aqui es entender cómo es la “home” de la app. He dejado tmp/slide8.png con la idea de mostrar como se vería, aunque me gustaría añadir un bottom menú con una sección de mis documentos, mi perfil, etc.

## Exploración anterior (rechazada)

Hacer comprensible el estado del expediente y destacar la siguiente acción.

**Composición:** Una home grande con resumen, recorrido y menú inferior: Inicio, Documentos, Práctica, Consultas y Perfil. P. 13 explica la acción de un paso.

**QR / demo:** #/expediente?tour=1. Escena autónoma con instrucciones en un panel local.

**Criterio de contenido:** Distinguir completado, pendiente y espera externa. El porcentaje de pasos completados no es probabilidad de éxito ni plazo de resolución.

## Referencias

- [slide8.png](../../../tmp/slide8.png)
- [PLAN-DEMO.md](../../../vertical/PLAN-DEMO.md)

Aplicar las [reglas comunes de diseño y variantes](../../PLAN-EDITORIAL.md).
Se han desarrollado tres variantes que Pol ha rechazado. Se conservan en `descartadas/`.
No usar ninguna como base del libro ni volver a presentarlas como pendientes de elección.


## Aclaraciones posteriores de Pol

Se autoriza la primera prueba: tres variantes de la pareja 12–13 y home.

> El demo es cada url una pantalla, no pretendo hacer una aplicación funcional
> navegable. […] Las pages y urls del qr no tienen pq estar relacionadas.
> Obviamente estructura y reutilización de componentes necesitaremos.

La escena carga de forma autónoma. Esta pareja se desarrolla para probar
composición y relación papel/interfaz, sin imponer un orden al resto de demos.

## Variantes anteriores y resultado

- [01 Editorial](descartadas/01-editorial/README.md).
- [02 Diagonal](descartadas/02-diagonal/README.md).
- [03 Anotada](descartadas/03-anotada/README.md).

[Comparativa enfrentada y notas de revisión](../../muestras/12-13/README.md).
Interfaz del papel: maqueta vectorial editorial con datos ficticios; no captura
del navegador. El espacio QR está reservado, pendiente de URL pública.
La guía y el detalle web usan interacciones locales. Variantes 01, 02 y 03 rechazadas. La UX web sí recibe valoración positiva.

## Tanda de seis páginas: desarrollo vigente

> haz una tanda de 6 diapositivas

Se desarrollan las páginas 08–13 en orden. Se conserva la dirección de la
portada diagonal y de 02–07, con la UX dentro de móviles hechos en HTML/CSS.
La paginación mantiene las parejas enfrentadas 8–9, 10–11 y 12–13.

**Variante actual:** [04-movil](variantes/04-movil/README.md), pendiente de revisión.

La home conserva la UX valorada por Pol, dentro del marco de móvil HTML/CSS. Siguiente acción, responsables y menú inferior.

**URL de esta escena:** `#/expediente?tour=1`. QR vectorial de 28 mm, con tutorial opcional y reinicio. Cada URL es autónoma.

Las interfaces se capturan desde el navegador; las cifras y el caso son ficticios.
El generador conserva los PDF originales de 01–07 y todas las variantes rechazadas.

## Render vigente y publicación

Petición posterior de Pol: un `index.pdf` y un `index.png` en la raíz de cada
diapositiva, como render de la variante elegida, y la presentación completa en
la home del vertical. [Selección común](../../seleccion.json) y
[compilador](../../COMPILAR.md). Los `index` se regeneran, no se editan a mano.
