# Primera dirección visual de seguimiento

Muestra desarrollada el 17-09-2026, pendiente de elección/revisión. Jerarquía:
siguiente acción, recorrido y responsable de cada etapa. Menú inferior ilustrativo.
Azules y Plus Jakarta Sans compartidos con el librito.

[`home-maqueta.png`](home-maqueta.png) es la versión vectorial ampliada utilizada
en el papel, **no una captura de la escena web**. La genera
[el generador del interior](../../../librito/muestras/12-13/generar.py).
Los datos proceden del mismo
[JSON](../../../recursos-compartidos/demo/seguimiento.json) que la escena React.

Implementación: `src/features/seguimiento/Seguimiento.tsx` y `src/app.css`.
URLs autónomas: `/#/expediente` y `/#/expediente/pasos/documentacion`.
La primera acepta `?tour=1`. No requieren registro, sesión previa ni visitar
ninguna otra pantalla. Los cambios duran dentro de la muestra abierta y se
restauran al reiniciar o recargar. Cada detalle abierto empieza con su ejemplo.

Solo hay interacción local: abrir/cerrar instrucciones, aportar un documento
ficticio, reiniciar y recorrer una guía. No se solicitan archivos, datos personales,
pagos ni permisos de cámara/micrófono. El menú no tiene enlaces vacíos o rotos.

TypeScript/build comprobados. Prueba interactiva y capturas del navegador pendientes:
el navegador integrado no estaba disponible. Publicación posterior en GitHub Pages.
