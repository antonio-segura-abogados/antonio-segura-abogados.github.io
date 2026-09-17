# Identidad visual: evidencias y base del proyecto

Consulta: 14-09-2026. Fuentes: presentación Angular antigua,
[web del despacho](https://segura-abogados.com/) y su
[CSS dinámico de Avada](https://segura-abogados.com/wp-content/uploads/fusion-styles/d3d09e2df03218b22f9a7889c0efaac8.min.css?ver=3.15.3).
Se han guardado copias locales de HTML y CSS en `web/`. Son una captura de
referencia, no un manual de marca oficial ni código que deba incorporarse al sitio.

## Presentación anterior

La presentación consta de 12 componentes Angular. `src/styles.scss` carga
**Plus Jakarta Sans**, pesos 200–800, desde Google Fonts, y define estos colores:

| Variable anterior | Valor | Función |
| --- | --- | --- |
| `--color-primary` | `#47B5FF` | Titulares y acentos |
| `--color-secondary` | `#2172BC` | Titulares finos y elementos secundarios |
| `--color-bg` | `#FFFFFF` | Fondo |
| `--color-text-normal` | `#000000` | Texto |

Alterna títulos muy gruesos (800) y muy finos (200), maquetas de móvil,
tarjetas redondeadas y fotografía de la oficina. Se recuperan la familia,
los azules y las imágenes pertinentes. Las dimensiones y los estilos de
pantalla no se trasladan automáticamente al documento impreso. La portada
horizontal posterior usa tipografía de gran escala diseñada para su formato;
las animaciones y `overflow: hidden` no forman parte de la propuesta impresa.

La plantilla Angular que queda en `app.html` contiene colores e identidad del
starter de Angular: no es la presentación activa, que se define en `app.ts`.
Por eso sus violetas, degradados y fuentes auxiliares no se tratan como marca.
Material Icons es una fuente de iconos de las diapositivas, no la tipografía
del despacho; no se ha incorporado esa dependencia remota.

La narrativa anterior pasa por entrevista, opciones, seguimiento, documentos,
exámenes, consultas y pagos. El catálogo documenta los archivos reutilizados.

## Valores extraídos de la web

| Valor observado | Evidencia exacta | Uso de partida en la candidatura |
| --- | --- | --- |
| `#0192E5` | CSS `--primary_color` | Azul de marca, acentos y gráficos |
| `#47B5FF` | CSS `--awb-color5` | Azul claro de apoyo |
| `#2172BC` | HTML `--wp--preset--color--awb-color-custom-3` | Enlaces y acciones |
| `#06283D` | HTML `--wp--preset--color--awb-color-custom-1` | Azul oscuro, contraste |
| `#FFFFFF` | CSS `--awb-color1` | Papel y fondo principal |
| `#F4F4F4` | CSS `--awb-color2` | Superficie secundaria |
| `#E4E4E4` | CSS `--awb-color3` | Separadores |
| `#464646` | CSS `--awb-color6` | Texto de lectura |
| `#262626` | CSS `--awb-color7` | Oscuro secundario |
| `#161616` | CSS `--awb-color8` | Titulares |
| `#E7CEA6` | CSS `--awb-color4` | Arena: conservar como paleta auxiliar |
| `#DEECDF` | HTML `--wp--preset--color--awb-color-custom-2` | Verde pálido auxiliar |

Los últimos dos tonos existen en la configuración, pero no se les atribuye un
papel central en la identidad. Tampoco se incorporan como colores corporativos
los presets genéricos de WordPress ni los colores de todos los widgets de Avada.
La asignación de roles de la tercera columna es una decisión para este proyecto.

## Tipografía

La familia de texto configurada en la web es **Plus Jakarta Sans**, con
fallback Arial/Helvetica/sans-serif. El CSS define pesos normales 400, 600, 700
y 800 y cursivas 400, 600 y 700. Sus presets incluyen:

| Preset web | Tamaño / peso | Interlineado |
| --- | --- | --- |
| `--awb-typography1` | 40 px / 700 | 1,2 |
| `--awb-typography2` | 22 px / 400 | 1,6 |
| `--awb-typography3` | 16 px / 600 | 1,2 |
| `--awb-typography4` | 16 px / 400 | 1,9 |
| `--awb-typography5` | 14 px / 400 | 1,72 |

Estos son valores configurados: los componentes pueden sobrescribirlos. Por
ejemplo, el h1 global tiene 62 px y el h2 48 px. No son medidas para el papel.

Se han descargado los WOFF2 latinos normal/cursiva y sus extensiones desde las
URLs del CSS, más los TTF variables normal/cursiva y su licencia del repositorio
oficial [Google Fonts](https://github.com/google/fonts/tree/main/ofl/plusjakartasans).
Los TTF contienen el eje de peso 200–800, comprobado en sus tablas `fvar`.
WOFF2 para web; TTF para instalar en la herramienta de maquetación.

## Adaptación propuesta

- Una sola familia en los tres entregables. Texto 400, etiquetas 600 y títulos
  700; reservar 800 para énfasis y evitar 200 en textos pequeños impresos.
- Blanco dominante, grises para la lectura y azul como acento. Fotografías de
  espacios y equipo del propio despacho cuando aporten contexto.
- Excepción de portada solicitada por Pol: fondo azul corporativo **`#0192E5`**
  hasta el borde, grandes titulares blancos y azul oscuro `#06283D`, con una
  franja blanca para destacar la prueba de trabajo. Corrige el primer ensayo
  horizontal con `#47B5FF`, un azul de apoyo que Pol pidió sustituir por el
  principal. Tras rechazar cambios limitados a la cabecera, se exploran tres
  composiciones completas: dos columnas, diagonal y una invitación centrada.
  El blanco y el azul oscuro también pueden ocupar campos amplios de portada;
  el azul de marca se mantiene en todos los diseños.
- Escala digital flexible; para A5, cuerpo 10,5 pt, interlineado 1,5,
  titulares interiores 20–28 pt y notas de al menos 8,5 pt como base editorial.
  El formato actual es horizontal, 210 × 148 mm. La portada tiene escala propia:
  titular de hasta 132 pt, peso 800, y espaciado ajustado para la composición.
- Los tokens de espacios y radios son decisiones nuevas, no valores extraídos
  de un manual del despacho.

El contraste calculado con luminancia sRGB es de 3,36:1 para `#0192E5` sobre
blanco y 2,25:1 para `#47B5FF` sobre blanco. Se reserva `#2172BC` (5,00:1)
para texto de enlaces y botones con texto blanco. El cuerpo `#464646` sobre
blanco da 9,44:1. Es una comprobación numérica de estos pares, no una auditoría
completa de accesibilidad de la futura aplicación.

Los HEX son RGB. No se ha inventado una equivalencia Pantone o CMYK oficial.
La conversión para papel dependerá del perfil y la máquina de la copistería;
el azul debe comprobarse en una muestra física.
