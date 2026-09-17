# Muestra rechazada: páginas 12–13

**Rechazada por Pol el 17-09-2026.** Se conserva como historial. Las tres
maquetaciones se consideran descartadas y no son candidatas a elección. La UX
web sí ha recibido valoración positiva. Continuar desde la apertura y en orden.

## Revisar

- [Comparativa visual de las tres parejas](comparativa-12-13.png).
- [PDF con las tres parejas enfrentadas](comparativa-12-13.pdf): 3 páginas de
  420 × 148 mm, para comparar en pantalla. Orden: editorial, diagonal, anotada.
- [PDF de muestras A5](muestras-a5.pdf): 6 páginas de 210 × 148 mm, en el mismo
  orden; cada par reproduce 12–13. Para comprobar escala al 100 %, sin ajustar.
  No es un librito listo para imposición ni para imprimir seis caras seguidas.

| Variante | Composición | Cuándo funciona mejor |
| --- | --- | --- |
| 01 Editorial | Texto y tres argumentos a la izquierda; pantalla grande. Detalle horizontal en la página derecha | Lectura tranquila y continuidad en capítulos de producto |
| 02 Diagonal | Campo azul y oscuro inclinado, pantalla superpuesta. Detalle vertical y tipos de acción al lado | Mayor relación visual con la portada elegida |
| 03 Anotada | Pantalla central con llamadas numeradas. Detalle y acciones en banda horizontal | Explicar una interfaz más densa o un mecanismo |

La recomendación anterior de usar la 01 como base queda retirada. No reutilizar
esta muestra para fijar el interior. La [apertura nueva](../01-03-apertura/README.md)
sustituye ese punto de partida.

## Qué comparten

Mismos titulares, argumento, datos ficticios, etapa actual, documentos y cuatro
tipos de paso. Las variantes cambian composición, proporción, contraste y jerarquía.
La interfaz reducida sirve para entender el conjunto; la página 13 amplía la acción.

Los textos y datos proceden de
[`seguimiento.json`](../../../recursos-compartidos/demo/seguimiento.json).
La paleta y la fuente se leen de recursos compartidos. La interfaz impresa es una
**maqueta vectorial editorial**, no una captura de navegador; la escena React
usa esos mismos datos con su propio diseño adaptable. Las capturas finales se
prepararán una vez elegida y revisada la dirección.

Cada QR tiene un espacio de 28 mm explícitamente pendiente de publicación.
No hay patrones QR decorativos ni enlaces locales codificados para imprimir.

## Escenas locales

- `/#/expediente`: home y detalle en diálogo; guía opcional con `?tour=1`.
- `/#/expediente/pasos/documentacion`: instrucciones abiertas directamente.

El índice local permite revisar ambas. Son escenas autónomas, sin estado compartido
ni navegación funcional entre las secciones del menú inferior. «Usar documento
de ejemplo» cambia pendiente a recibido; la revisión sigue pendiente. Reinicio
y recarga devuelven el estado inicial. No se solicita ningún archivo real.

## Archivos por página y reproducción

Cada carpeta de [seguimiento](../../slides/12-seguimiento/INSTRUCCIONES.md) y
[paso actual](../../slides/13-paso-actual/INSTRUCCIONES.md) contiene `descartadas/`
con sus tres propuestas. Cada una tiene `pagina.pdf`, `pagina.png`, `fuente.json`
y una ficha propia. El generador común evita duplicar seis implementaciones.

Generador: [generar.py](generar.py). Dependencias: [requirements.txt](requirements.txt).
Puede ejecutarse desde cualquier directorio con un entorno que las tenga instaladas.
Lee el formato de impresión y la fuente compartida. Regenerar conserva los nombres
de archivo. Los PNG son de revisión; los PDF mantienen texto vectorial e incrustado.

## Comprobación y límites

- Seis páginas: A5 horizontal y textos dentro de las cajas; fuentes Jakarta incrustadas.
- Comparativa: tres parejas, cada página independiente y sin contenido sobre el lomo.
- Renderizados revisados visualmente; corregidos espacios junto a la home y al botón.
- TypeScript y compilación de la demo superados. El navegador integrado no estaba
  disponible, por lo que no se da por hecha una prueba interactiva web.
- Sin publicación ni QR definitivo. Prueba física de tamaño/legibilidad pendiente.
- Las pequeñas etiquetas de la home se apoyan en el detalle ampliado; no reemplazan
  el texto explicativo del papel.
