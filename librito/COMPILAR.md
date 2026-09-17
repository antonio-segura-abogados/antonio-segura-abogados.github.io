# Una selección, tres salidas

[seleccion.json](seleccion.json) indica la variante vigente de cada página,
en orden. Cambiar `variante` selecciona otra carpeta bajo `variantes/`.
La selección es una decisión de trabajo; no cambia el estado de aprobación editorial.

Cada variante contiene `texto.json`, `pagina.pdf`, `pagina.png` y, si se genera
desde código, `render.json`. Este último identifica el generador y la función
de composición. El compilador permite también variantes exportadas desde otra
herramienta: si no hay `render.json`, utiliza su `pagina.pdf`.

## Uso habitual

```sh
npm run build:book
```

El comando regenera las variantes seleccionadas y produce:

- `slides/01-portada/index.pdf` e `index.png`, y lo mismo para las otras 23 carpetas.
- [librito-final.pdf](librito-final.pdf): páginas individuales, enlaces y marcadores.
- Imágenes WebP, miniaturas y PDF descargable para la presentación web.
- [COMPILACION.json](COMPILACION.json): selección efectiva y huellas de los archivos.

Los `index` son salidas generadas: editar la variante, no esas copias. El PNG se
renderiza del mismo PDF que se incorpora al librito, a 240 ppp. Las imágenes web
son derivados optimizados; el navegador no descarga el PDF para mostrar slides.
Los nombres web dependen del contenido para evitar imágenes antiguas en caché.

Para unir únicamente los PDFs ya exportados, sin volver a dibujar variantes:

```sh
npm run build:book -- --sin-renderizar
```

Los textos editables de las páginas están en `texto.json`; la disposición,
titulares de composición y recursos se controlan en la función de `render.json`.
Si cambia una pantalla React, actualizar su captura con los scripts de las
tandas antes de compilar: el compilador no inventa ni recaptura interfaces.

## Preparación en otro ordenador

```sh
python3 -m venv .venv-librito
.venv-librito/bin/pip install -r librito/requirements.txt
npm ci
npm run build:book
npm run dev
```

El lanzador usa `.venv-librito/bin/python`, si existe, o `python3`. Puede
indicarse otro intérprete con `AS_LIBRITO_PYTHON`. No depende de una carpeta
temporal del ordenador original.

## Publicación

```sh
npm run build:pages
```

Compila primero el librito y después la web. El workflow
[publicar.yml](../.github/workflows/publicar.yml) hace esos mismos pasos con
cada push a `main` y publica en GitHub Pages. Se pueden subir los cambios de
fuentes y de selección: Actions genera la presentación completa en el servidor.
La fuente de Pages debe ser **GitHub Actions**, no el antiguo `main → /docs`.

Las carpetas `docs/` y `vertical/public/presentacion/` son salidas de compilación.
No editar sus imágenes a mano. Las variantes descartadas permanecen en su sitio
y no se incorporan a la web. La presentación sí incluye las 24 páginas vigentes,
con CV, fotos y contacto, según la petición de mostrar el librito entero.

La compilación verifica orden, número de páginas, tamaño y límites de texto.
La revisión de composición y la prueba física siguen siendo necesarias para
preparar una tirada; `librito-final.pdf` conserva el formato A5 de revisión.
