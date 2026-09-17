# Enlaces del papel a la demo

`destinos.json` reserva identificadores orientativos; no obliga a implementar
todas esas pantallas. `publicBaseUrl` sigue vacío y no hay QR finales.
Solo se generarán códigos cuando la URL y la pantalla estén verificadas.

El [plan del vertical](../../vertical/PLAN-DEMO.md) propone rutas adicionales
y ocho temas de guía. El registro marca como implementadas localmente la home
`/expediente` y el detalle `/expediente/pasos/documentacion`; las demás rutas
de producto siguen pendientes. Cada URL es una escena autónoma, sin pasos previos.
El QR del informe de Anthropic será externo y apuntará directamente al PDF
oficial; los QR de la demo utilizarán la futura URL pública.

La URL se construirá como `publicBaseUrl + '#' + path`, manteniendo la barra
final en `publicBaseUrl`. Ejemplo de estructura, no destino real:
`https://CUENTA.github.io/REPOSITORIO/#/documentos`.

Para imprimir, exportar los códigos en SVG y opcionalmente PNG de alta
resolución. Reservar inicialmente **28 × 28 mm incluida la zona blanca**,
color negro sobre blanco, sin logotipo superpuesto, y al menos cuatro módulos
de margen limpio en cada lado. El tamaño definitivo depende de la longitud
del enlace y debe probarse físicamente. La regla de los cuatro módulos procede
de [DENSO WAVE](https://www.qrcode.com/en/howto/code.html); 28 mm es una decisión
de diseño para este librito, no un mínimo universal.

Imprimir también una etiqueta que describa el destino y un enlace legible.
Antes de entregar: abrir cada enlace en un móvil, recargar la pantalla y
escanear una prueba impresa al tamaño real. Mantener las URLs después de
imprimir. El generador se añadirá en la fase de publicación.
