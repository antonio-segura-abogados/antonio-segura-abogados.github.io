# Actualizar los procesos desde un configurador

Estado: **desarrollada; pendiente de revisión de Pol**, 17-09-2026. Página **18/24**;
identificador estable `configurador`. Pareja enfrentada 18–19.
Origen: **S11, rutas por tipología**.

## Instrucción de Pol

Fragmento literal pertinente (saltos de línea normalizados). El
[registro completo del encargo](../../planificacion/ENCARGO-2026-09-17.md)
conserva el resto y las aclaraciones posteriores.

> Reactividad al BOE. Básicamente, hacerles entender en esta slide de alguna manera que esta app a cada cambio del BOE no estaría ligado a tener a un informático cambiando el código. Todo se haría modular y escaladle, con un Configurador de las “rutas de pasos” por cada tipología de cliente

## Desarrollo previsto en la planificación de origen

Mostrar cómo el conocimiento del despacho se convierte en plantillas mantenibles por responsables autorizados.

**Composición:** Recorte legible de configurador: lista de pasos, formulario y vista cliente. Un cambio documental pequeño hace visible el efecto. Pareja con p. 19.

**QR / demo:** #/gestion/rutas?demo=configurador&tour=1. Guía de edición y publicación.

**Criterio de contenido:** Cambios de contenido/secuencia pueden configurarse; nuevas capacidades pueden requerir código. Detección o lectura de BOE no equivale a interpretación/aprobación jurídica automática.

## Referencias

- [PLAN-DEMO.md](../../../vertical/PLAN-DEMO.md)

Aplicar las [reglas comunes de diseño y variantes](../../PLAN-EDITORIAL.md).
Las instrucciones de origen se conservan arriba. El resultado actual se registra debajo.


## Implementación de la continuación

Petición posterior de Pol: «implementa las que faltan». Se desarrollan las páginas 14–24 en orden.

Editor de pasos y vista cliente con la misma definición. Cambiar el borrador invalida la revisión; publicar conserva los casos existentes.

Variante actual: [`01-rutas`](variantes/01-rutas/README.md), con texto editable, PDF y PNG. No equivale a aprobación del diseño.

Destino implementado del QR: `https://antonio-segura-abogados.github.io/#/gestion/rutas/residencia-demo?tour=1`. Esta dirección sustituye la URL orientativa de la planificación.

Ver [tanda 14–24 y comprobaciones](../../muestras/14-24-cierre/README.md).

## Render vigente y publicación

Petición posterior de Pol: un `index.pdf` y un `index.png` en la raíz de cada
diapositiva, como render de la variante elegida, y la presentación completa en
la home del vertical. [Selección común](../../seleccion.json) y
[compilador](../../COMPILAR.md). Los `index` se regeneran, no se editan a mano.
