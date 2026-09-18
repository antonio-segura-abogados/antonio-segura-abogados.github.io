# Revisión de capturas · 18-09-2026

Petición: renovar las imágenes de 8, 9, 16 y 17; crear una alternativa de 16
con tres momentos de práctica sin seleccionarla; verificar visor local y PDF.

La URL `http://127.0.0.1:5173/#/entrevista?tour=1` ya no aparecía como texto en
el DOM ni en la captura de la entrevista al iniciar esta revisión. No se ha
modificado React para ocultar texto inexistente. La entrada de la 8 se recapturó
y coincide exactamente con el archivo anterior. La 9 muestra la ubicación
seleccionada; 16 y 17 recogen el rediseño actual de práctica y videollamada.

La alternativa [02-tres-momentos](../slides/16-practica/variantes/02-tres-momentos/README.md)
se preparó inicialmente sin seleccionarla. Pol la aprueba después y pide que
sea la visible: ahora alimenta el index de 16, el librito y el visor local.
La variante anterior permanece en su carpeta.

- `capturar.mjs`: seis capturas de Chrome a escala 3, con perfil temporal limpio.
- `CAPTURAS.json`: estados, rutas y procedencia. Sustituye los registros históricos
  de las tandas para estas seis imágenes.
- `verificar-local.mjs` y `VERIFICACION-LOCAL.json`: páginas 8/9/16/17 a 1440 y
  390 px; hashes de imágenes servidas frente a archivos compilados; PDF enlazado
  por el visor idéntico al final; sin errores JS ni desbordamiento horizontal.
- `VERIFICACION-PDF.json`: 24 páginas, textos y enlaces conservados, igualdad
  de los index con el PDF, alternativa con tres imágenes y tamaño A5.
- `local-*.png`: evidencia visual del visor de escritorio.

Revisión visual del PDF final y la alternativa completada; TypeScript/Vite
correctos. QR de la alternativa decodificado desde su render con Apple Vision:
`https://antonio-segura-abogados.github.io/#/practica?tour=1`.
No se alteran las muestras históricas ni se publica esta revisión.

Desde `as-abogados/`, con Playwright externo y Chrome como en las otras revisiones:

```sh
node librito/revision-capturas/capturar.mjs
.venv-librito/bin/python librito/slides/16-practica/variantes/02-tres-momentos/generar.py
npm run build:book
npm run build
node librito/revision-capturas/verificar-local.mjs
```
