# Enlaces del papel a las escenas

**Base indicada por Pol:** `https://antonio-segura-abogados.github.io/`.
`destinos.json` distingue implementación local, QR generado, lectura comprobada
y preparación para imprimir. Los ids y los fragmentos se mantienen estables.

El sitio usa GitHub Pages con compilación automática mediante Actions. El QR
general abre la presentación de 24 páginas; las escenas conservan sus URLs.
`VERIFICACION.json` registra las comprobaciones. `printReady` sigue en falso
hasta una prueba física a tamaño real.

## Generados

Catorce QR en [generados/](generados/registro.json), cada uno con SVG y PNG:
`inicio`, `entrevista`, `expediente`, `documentos`, `consultas`,
`paso-documentacion`, `opciones`, `planes`, `originales`, `practica`,
`configurador`, `cambios`, `informe-anthropic` y `linkedin-pol`.

Los QR ya generados de escenas incorporan `?tour=1`. Desde el 18-09-2026 se
ignora ese parámetro: Pol ha pedido retirar todos los tutoriales. Se conservan
los destinos y códigos existentes. Cada escena es autónoma y no exige visitar
pantallas anteriores. La presentación web permite abrir la demo de la página
mediante un botón, además del QR impreso.

El QR de Anthropic apunta **directamente al PDF oficial** facilitado por Pol,
como pidió, y se ha incorporado a la nueva página 3. No pasa por GitHub Pages.

## Generación y comprobación

[generar.py](generar.py) utiliza ReportLab y Pillow. Genera negro sobre blanco,
corrección M y cuatro módulos de zona limpia. Tamaño inicial de colocación:
**28 × 28 mm, incluida la zona blanca**. SVG para conservar el vector y PNG de
alta resolución para usos raster. La zona limpia sigue la
[referencia de DENSO WAVE](https://www.qrcode.com/en/howto/code.html).

### Presentación en las páginas · 18/09/2026

[etiqueta.py](etiqueta.py) reúne el QR vectorial y la banda inclinada del librito.
Usa Plus Jakarta Sans ExtraBold, el azul compartido, una inclinación de 5° y una
flecha orientada hacia el código. Texto: **«Demo interactiva»** en 9–19,
**«Informe completo aquí»** en la 3 y **«Explora el proyecto»** en la 24. Este
último QR abre la presentación, desde la que se accede a las demos.

La banda queda fuera de los cuatro módulos blancos de margen y es también un
enlace clicable en el PDF. El marco fino rodea el cuadrado sin cubrir módulos.
Se conservan las URLs exactas, la corrección M y los tamaños de 27–28 mm.
La consulta anterior sobre densidad no supuso cambiar a corrección L.

Los tres generadores de páginas usan el mismo componente. `npm run build:book`
actualiza las variantes seleccionadas, los `index`, el PDF final y la presentación
local; los PDFs de muestras históricas no son el render vigente. Diseño pendiente
de revisión de Pol y de publicación.

### Comprobaciones

Los trece PNG y los trece QR del PDF completo se han decodificado con Apple
Vision y coinciden con sus destinos. Páginas 3, 9–19 y 24; códigos de 27–28 mm.
[Registro de comprobación](VERIFICACION.json).
El apartado `etiquetas20260918` recoge la nueva lectura de los trece QR desde
las páginas completas a 300 ppp, la coincidencia de URLs, los enlaces de las
bandas y la huella del PDF revisado. Las etiquetas no invaden el código.

La presentación y las 16 escenas ya están publicadas y comprobadas.
Antes de imprimir la tirada, escanear una prueba física a tamaño real en un móvil.
Conservar los destinos después de imprimir. No sustituir enlaces por códigos
visualmente decorativos ni anunciar como publicada una ruta solo porque exista su QR.

### LinkedIn en la página 23 · 18/09/2026

Añadido un QR de 28 mm al perfil de Pol, con banda «Mi LinkedIn» y comentario
sobre las recomendaciones. Comparte el componente de las demos. Código y banda
enlazan al perfil, también desde el visor. Decodificados el PNG y la página
completa del PDF a 300 ppp con Apple Vision: destino exacto del registro.
Revisión visual correcta; las otras 23 páginas conservan sus renders.
Publicación y prueba física pendientes.
