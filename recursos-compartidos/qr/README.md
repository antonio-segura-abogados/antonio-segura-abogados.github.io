# Enlaces del papel a las escenas

**Base indicada por Pol:** `https://antonio-segura-abogados.github.io/`.
`destinos.json` distingue implementación local, QR generado, lectura comprobada
y preparación para imprimir. Los ids y los fragmentos se mantienen estables.

El sitio usa GitHub Pages con compilación automática mediante Actions. El QR
general abre la presentación de 24 páginas; las escenas conservan sus URLs.
`VERIFICACION.json` registra las comprobaciones. `printReady` sigue en falso
hasta una prueba física a tamaño real.

## Generados

Trece QR en [generados/](generados/registro.json), cada uno con SVG y PNG:
`inicio`, `entrevista`, `expediente`, `documentos`, `consultas`,
`paso-documentacion`, `opciones`, `planes`, `originales`, `practica`,
`configurador`, `cambios` e `informe-anthropic`.

Los de escenas incorporan `?tour=1`. Cada una es autónoma y no exige visitar
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

Los trece PNG y los trece QR del PDF completo se han decodificado con Apple
Vision y coinciden con sus destinos. Páginas 3, 9–19 y 24; códigos de 27–28 mm.
[Registro de comprobación](VERIFICACION.json).

La presentación y las 16 escenas ya están publicadas y comprobadas.
Antes de imprimir la tirada, escanear una prueba física a tamaño real en un móvil.
Conservar los destinos después de imprimir. No sustituir enlaces por códigos
visualmente decorativos ni anunciar como publicada una ruta solo porque exista su QR.
