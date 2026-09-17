# Recursos oficiales de Campmany

Descargados el 17-09-2026 desde las URLs enlazadas por la
[página pública de Campmany Premium](https://www.campmanyabogados.com/premium),
tras la corrección de Pol sobre la página 6.

| Recurso | Original conservado | Derivado para el PDF |
| --- | --- | --- |
| Logo | [SVG oficial](logo-oficial.svg), viewBox 1644,88 × 234,66 | [PNG transparente](logo-oficial.png), 1800 × 257 px |
| Ilustración de Premium | [SVG oficial](premium-hero-oficial.svg), viewBox 2871,89 × 2912,26 | [PNG transparente](premium-hero-oficial.png), 1800 × 1825 px |

Las URLs directas, hashes SHA-256 y datos de conversión están en
[procedencia.json](procedencia.json). Los SVG permanecen intactos. Son recursos
de Campmany, usados para identificar el referente; no se presentan como creación
de Pol ni como parte de la identidad de AS. No se ha localizado una licencia libre.

Los PNG conservan los colores, degradados, proporciones y transparencia de los
originales. A su tamaño en la página 6 superan 600 ppp. Se usa `@resvg/resvg-js`
2.6.2 porque la lectura SVG directa de PyMuPDF no representaba correctamente
los degradados de estos archivos.

Para regenerar los PNG con un renderer instalado en una carpeta temporal:

```sh
npm install --prefix /private/tmp/asa-render-svg --no-audit --no-fund @resvg/resvg-js@2.6.2
node recursos-compartidos/assets/referentes/campmany/renderizar.cjs /private/tmp/asa-render-svg/node_modules/@resvg/resvg-js
```

No se añade esa dependencia al proyecto web. El generador del librito utiliza
los PNG guardados y no necesita acceso a internet.
