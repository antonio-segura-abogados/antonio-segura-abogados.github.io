# Catálogo de recursos

Inventario de 14-09-2026. Rutas relativas a `recursos-compartidos/assets/`.
Los archivos descargados se conservan sin alteraciones. Las medidas en píxeles
se han comprobado con `sips`; no se ha aumentado artificialmente su resolución.

## Marca

| Archivo | Dimensiones | Procedencia y selección |
| --- | --- | --- |
| `marca/logo-azul-web.jpg` | 270 × 109 | [Logo horizontal de la web](https://segura-abogados.com/wp-content/uploads/2023/09/LOGO-AZUL-CORPORATIVO-e1720704870904.jpg). Base actual de la demo sobre blanco. |
| `marca/logo-azul-transparente-antiguo.png` | 270 × 109 | Copia de `public/assets/LOGO-AZUL-CORPORATIVO-e1720704870904.png` del proyecto antiguo; variante transparente de referencia. |
| `marca/logo-pie-web.png` | 103 × 106 | [Marca del pie web](https://segura-abogados.com/wp-content/uploads/2023/09/logo-segura-abogados-footer.png). Recurso pequeño. |
| `marca/favicon.png` | 97 × 97 | [Favicon oficial servido por la web](https://segura-abogados.com/wp-content/uploads/2023/09/as-favicon.png). Icono de pestaña. |

El logo horizontal tiene solo **22,9 mm de ancho a 300 ppp**, o 45,7 mm a
150 ppp. El icono del pie alcanza 8,7 mm a 300 ppp. No son originales adecuados
para un logo grande en portada. No se encontró una versión vectorial enlazada
en la página de inicio ni en sus estilos revisados. Para ampliarlo, conseguir
un SVG/PDF vectorial o un original de mayor resolución del despacho. No
redibujar ni alterar el símbolo suponiendo que será equivalente.

## Fotografías del despacho

| Archivo | Dimensiones | Ancho orientativo a 300 ppp | Procedencia |
| --- | --- | --- | --- |
| `fotografia/oficina.jpg` | 2560 × 1707 | 216,7 mm | [Fotografía de oficina](https://segura-abogados.com/wp-content/uploads/2024/09/DSC_2180-1-scaled.jpg), utilizada también en la primera diapositiva antigua. |
| `fotografia/recepcion-principal.jpg` | 1620 × 1080 | 137,2 mm | [Recepción](https://segura-abogados.com/wp-content/uploads/2024/07/RECEPCION-PRINCIPAL.jpg). |
| `fotografia/antonio.jpg` | 1620 × 1080 | 137,2 mm | [Archivo ANTONIO de la web](https://segura-abogados.com/wp-content/uploads/2024/07/ANTONIO.jpg). |
| `fotografia/marta-y-maria.jpg` | 1620 × 1080 | 137,2 mm | [Archivo MARTAYMARIA de la web](https://segura-abogados.com/wp-content/uploads/2024/07/MARTAYMARIA.jpg). |

La medida supone usar todo el ancho original: recortar reduce la resolución
efectiva. La oficina sirve para una franja ancha en A5, pero su proporción
horizontal no llena una portada vertical sin recorte. La fotografía no es
necesaria en la pantalla inicial mínima y no se ha añadido al paquete de la demo.
Los nombres de archivo de personas siguen la fuente; no se infieren cargos.

## Referencias del proyecto antiguo

| Archivo guardado | Original | Dimensiones | Tratamiento |
| --- | --- | --- | --- |
| `referencias/mapa-antiguo.jpeg` | `public/assets/maps.jpeg` | 1280 × 1125 | Referencia para la entrega de documentos; procedencia original sin verificar. |
| `referencias/videollamada-antigua.jpeg` | `public/assets/videocall.jpeg` | 1447 × 1536 | Referencia de la pantalla de consultas; procedencia original sin verificar. |

No se han importado estas dos referencias en la demo. Antes de una entrega
pública, decidir si se mantienen, se sustituyen o se obtienen los originales.

Se revisaron también estos archivos, sin duplicarlos:

- `public/assets/DSC_2180-1-scaled.jpg`: idéntico byte a byte a la descarga
  guardada como `fotografia/oficina.jpg`.
- `public/assets/LOGO-AZUL-CORPORATIVO-e1720704870904.jpg`: idéntico byte a
  byte a `marca/logo-azul-web.jpg`.
- `public/assets/logo.png`: variante de 270 × 109 con efecto de contorno y
  apariencia menos limpia. Se conserva en el original; no se elige como marca.
- `src/app/slides/img.png`: icono ZIP de 512 × 512; no aporta a la candidatura.

La igualdad de los dos primeros pares se comprobó por SHA-256:

```text
oficina.jpg       6def75e75c61b9be4559126b331063acc31120e1dcf68dbc3ef071d0e480ac03
logo-azul-web.jpg 69873ba067f9eab7678d374266b09104851b2555fd36ba9e11723c7ddf3a71df
```

## Fuentes locales

| Archivo | Fuente |
| --- | --- |
| `fuentes/plus-jakarta-sans-latin.woff2` | [Google Fonts, normal latino](https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2) |
| `fuentes/plus-jakarta-sans-latin-ext.woff2` | [Google Fonts, normal latino extendido](https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko40yyygA.woff2) |
| `fuentes/plus-jakarta-sans-italic-latin.woff2` | [Google Fonts, cursiva latina](https://fonts.gstatic.com/s/plusjakartasans/v12/LDIuaomQNQcsA88c7O9yZ4KMCoOg4Koz4y6qhA.woff2) |
| `fuentes/plus-jakarta-sans-italic-latin-ext.woff2` | [Google Fonts, cursiva latina extendida](https://fonts.gstatic.com/s/plusjakartasans/v12/LDIuaomQNQcsA88c7O9yZ4KMCoOg4Koz4yCqhMva.woff2) |
| `fuentes/PlusJakartaSans-Variable.ttf` | [TTF normal del repositorio oficial](https://github.com/google/fonts/blob/main/ofl/plusjakartasans/PlusJakartaSans%5Bwght%5D.ttf) |
| `fuentes/PlusJakartaSans-Italic-Variable.ttf` | [TTF cursiva del repositorio oficial](https://github.com/google/fonts/blob/main/ofl/plusjakartasans/PlusJakartaSans-Italic%5Bwght%5D.ttf) |
| `fuentes/OFL.txt` | [Licencia SIL Open Font License 1.1](https://github.com/google/fonts/blob/main/ofl/plusjakartasans/OFL.txt) |

Los subconjuntos cubren español y latín extendido; no hay cobertura árabe,
china u otros alfabetos preparada. Los TTF son variables 200–800. Si el programa
de maquetación no los admite, obtener o generar instancias estáticas antes de
exportar, y comprobar siempre las fuentes incrustadas en el PDF.

## Procedencia y uso

Los logotipos y las fotografías del despacho son recursos de su web pública,
sin licencia de reutilización libre localizada en esta revisión. Se guardan
para preparar la candidatura personalizada y no se presentan como creación
propia. Las referencias antiguas tienen origen no verificado. La licencia OFL
adjunta corresponde a la tipografía, no a las imágenes ni a la marca.

La copia local de HTML/CSS está en `investigacion/web/`, fuera de los assets
del sitio y excluida de Git. El nuevo proyecto no incluye el backlog TMS ajeno
a la propuesta ni sus credenciales.
