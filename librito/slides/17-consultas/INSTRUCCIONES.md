# Consultas conectadas con el expediente

Estado: **desarrollada; pendiente de revisión de Pol**, 17-09-2026. Página **17/24**;
identificador estable `consultas`. Pareja enfrentada 16–17.
Origen: **S10**.

## Instrucción de Pol

Fragmento literal pertinente (saltos de línea normalizados). El
[registro completo del encargo](../../planificacion/ENCARGO-2026-09-17.md)
conserva el resto y las aclaraciones posteriores.

> Modernizar el sistema de consultas online que tienen, que actualmente es por teléfono. Podemos integrar videollamadas propias fácilmente. Tienes el concepto png tmb.
> 
> QR de vertical silbe incluido. Aquí como es algo más complejo, estaría bien usar un sistema de tutorial guiado.

## Desarrollo previsto en la planificación de origen

Unir consulta escrita, reserva, conversación y siguientes pasos dentro del expediente.

**Composición:** Sala de llamada como imagen principal con tres estados pequeños: motivo/documentos, cita y resumen. Mantener visible la alternativa asíncrona.

**QR / demo:** #/consultas?demo=consultas&tour=1. Guía hasta sala ficticia y resumen.

**Criterio de contenido:** La web permite verificar un formulario, no toda la atención posterior. La demo no activa cámara ni contacta con un abogado. Vídeo propio significa experiencia integrada; no obliga a construir infraestructura audiovisual.

## Referencias

- [slide10.png](../../../tmp/slide10.png)
- [PLAN-DEMO.md](../../../vertical/PLAN-DEMO.md)

Aplicar las [reglas comunes de diseño y variantes](../../PLAN-EDITORIAL.md).
Las instrucciones de origen se conservan arriba. El resultado actual se registra debajo.


## Implementación de la continuación

Petición posterior de Pol: «implementa las que faltan». Se desarrollan las páginas 14–24 en orden.

Consulta escrita, reserva y sala visual con resumen. Cámara, micrófono, agenda y mensajes no se conectan con servicios reales.

Variante actual: [`01-conversacion`](variantes/01-conversacion/README.md), con texto editable, PDF y PNG. No equivale a aprobación del diseño.

Destino implementado del QR: `https://antonio-segura-abogados.github.io/#/consultas?tour=1`. Esta dirección sustituye la URL orientativa de la planificación.

Ver [tanda 14–24 y comprobaciones](../../muestras/14-24-cierre/README.md).

## Render vigente y publicación

Petición posterior de Pol: un `index.pdf` y un `index.png` en la raíz de cada
diapositiva, como render de la variante elegida, y la presentación completa en
la home del vertical. [Selección común](../../seleccion.json) y
[compilador](../../COMPILAR.md). Los `index` se regeneran, no se editan a mano.
