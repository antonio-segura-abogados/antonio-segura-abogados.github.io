# Iconos de las temáticas CCSE

20 SVG aportados por Pol el 18-09-2026 en
[`familia-iconos-ccse.zip`](../../../../vertical/diseno/practica/familia-iconos-ccse.zip),
generados en su entorno a partir del
[encargo gráfico](../../../../vertical/diseno/practica/PROMPT-ICONOS-TEMATICAS.md).

Extraídos sin modificar de `familia-iconos-ccse/svg/`. El ZIP conserva los
originales PNG transparentes de 1024 × 1024, la lámina conjunta, el manifiesto
y las instrucciones de entrega. No se duplican los PNG en la aplicación.

Cada nombre de archivo coincide con el `id` de una de las 20 temáticas de
[`preguntas-2026.json`](../../../ccse/preguntas-2026.json). Comprobados los
nombres, el orden y los títulos frente al manifiesto del ZIP y al banco.
Los SVG contienen geometría vectorial nativa, sin imágenes incrustadas,
tipografía, scripts ni referencias externas. `viewBox`: `0 0 256 256`.
Los 20 archivos suman 41.727 bytes.

## Uso en la demo

`IconoTematica.tsx` importa esta familia compartida. Se conserva el dibujo,
su paleta y el margen del original. Se utiliza el mismo SVG en la galería de
secciones, el selector de repaso, la cabecera de la sección y el acceso a la
siguiente sección.

- Galerías: lienzo de 128 px; 112 px en pantallas de hasta 360 px de ancho.
- Cabecera: lienzo de 144 px, con aproximadamente 107 px de dibujo visible.
- Acceso a la siguiente sección: 64 px.
- Nombre, numeración y progreso: texto y componentes de interfaz separados.
- Las imágenes son decorativas para los lectores de pantalla: cada botón ya
  incluye el nombre de la temática en texto visible.

Integrados localmente. Revisión de Pol y publicación pendientes. Los iconos
corresponden a las 20 temáticas, no a los 43 cuestionarios de la ruta.
