# Elegir acompañamiento y contratar

Estado: **variante desarrollada, pendiente de revisión de Pol**, 17-09-2026. Página propuesta **11/24**;
identificador estable `contratacion`. Pareja enfrentada 10–11.
Origen: **S07, pantallas p2 y p3**.

## Instrucción de Pol

Fragmento literal pertinente (saltos de línea normalizados). El
[registro completo del encargo](../../planificacion/ENCARGO-2026-09-17.md)
conserva el resto y las aclaraciones posteriores.

> Tras seleccionar una, se pasa al pago. Por ejemplo con varios planes. Puede ser una suscripción mensual con opciones de pago anual.
> 
> El p2 es un ejemplo con números totalmente inventado pero creo que es una buena forma de ilustrar la información.
> 
> QR de vertical silbe incluido. Aquí como es algo más complejo, estaría bien usar un sistema de tutorial guiado.

## Desarrollo propuesto, pendiente de revisión

Mostrar la diferencia entre la ruta jurídica escogida, la suscripción y los servicios adicionales.

**Composición:** Comparativa breve de dos planes y detalle ampliado de compra. Evitar dos móviles enteros pequeños. El relato mantiene p1 → p2 → p3; cada escena web carga sus propios datos.

**QR / demo:** Entrada directa #/planes?tour=1; QR propio en la página 11.

**Criterio de contenido:** Todos los precios son ilustrativos, con importes coherentes y coste periódico separado de pago único. Pago simulado sin tarjeta ni pasarela externa.

## Referencias

- [slide7p2.png](../../../tmp/slide7p2.png)
- [slide7p3.png](../../../tmp/slide7p3.png)
- [PLAN-DEMO.md](../../../vertical/PLAN-DEMO.md)

Aplicar las [reglas comunes de diseño y variantes](../../PLAN-EDITORIAL.md).
La variante desarrollada figura a continuación. Conservar futuras variantes
en esta misma carpeta y anotar la elegida tras la revisión.


## Tanda de seis páginas: desarrollo vigente

> haz una tanda de 6 diapositivas

Se desarrollan las páginas 08–13 en orden. Se conserva la dirección de la
portada diagonal y de 02–07, con la UX dentro de móviles hechos en HTML/CSS.
La paginación mantiene las parejas enfrentadas 8–9, 10–11 y 12–13.

**Variante actual:** [01-acompanamiento](variantes/01-acompanamiento/README.md), pendiente de revisión.

Dos planes ficticios: 19/29 € al mes o 190/290 € al año. Resumen y confirmación simulada en panel; /contratacion es también autónoma.

**URL de esta escena:** `#/planes?tour=1`. QR vectorial de 28 mm, con tutorial opcional y reinicio. Cada URL es autónoma.

Las interfaces se capturan desde el navegador; las cifras y el caso son ficticios.
El generador conserva los PDF originales de 01–07 y todas las variantes rechazadas.

## Render vigente y publicación

Petición posterior de Pol: un `index.pdf` y un `index.png` en la raíz de cada
diapositiva, como render de la variante elegida, y la presentación completa en
la home del vertical. [Selección común](../../seleccion.json) y
[compilador](../../COMPILAR.md). Los `index` se regeneran, no se editan a mano.
