# Librito

Aquí se desarrollará el documento que se entregará impreso, con el proyecto,
la presentación del candidato y enlaces QR a demostraciones concretas.

La base es **A5 horizontal, 210 × 148 mm**, por indicación de Pol. El interior
mantiene márgenes blancos y la portada usa el azul corporativo **#0192E5** hasta el borde.
Se propone grapado al caballete, sujeto a presupuesto para el formato apaisado.
La elección y las condiciones de producción se explican en
[IMPRESION.md](IMPRESION.md); [formato.json](formato.json) guarda los parámetros.
No hay todavía documento final ni PDF del librito completo para imprimir.

## Ejemplos de portada

La carpeta [portada/](slides/01-portada/README.md) presenta tres direcciones completas:
**02, editorial a dos columnas; 03, diagonal; 04, conversación centrada con un
semicírculo azul**. Cada una tiene PDF y PNG. La portada 1 se conserva como
referencia, con PDF de revisión y con sangrado. Los ajustes anteriores que solo
cambiaban la cabecera se han apartado como descartados: Pol pidió composiciones
distintas, no variaciones de la primera frase. Las propuestas verticales siguen
eliminadas. **La portada 03 diagonal está elegida.** Falta completar el interior
y las escenas de demostración.

## Primera muestra de interior

[Tres variantes de las páginas 12–13](muestras/12-13/README.md): editorial,
diagonal y anotada. Incluyen PDFs A5, PNG, comparativa enfrentada y generador.
Ninguna está elegida. Las carpetas de seguimiento y paso actual guardan cada
variante y sus instrucciones. La demo usa URLs autónomas, según aclaración de Pol.

## Base de maquetación

`impresion.css` deja preparada una base HTML/CSS opcional: importar primero
`../recursos-compartidos/estilos/base.css` y después esta hoja. Cada `.pagina`
es una página, y `.pagina.par` invierte los márgenes para el reverso.
La clase `.portada` elimina el margen interior de la página y aplica el fondo
azul; el sangrado se añade durante la exportación de producción. Las páginas
se exportan individualmente, en orden de lectura. El CSS no sustituye
la revisión de desbordamientos, fuentes y cajas de página del PDF final.

Si se utiliza otra herramienta de maquetación, aplicar las mismas medidas y
los originales tipográficos TTF de los recursos compartidos. No trasladar el
tamaño de las diapositivas 16:9 directamente al papel.
