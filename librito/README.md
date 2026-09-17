# Librito

Aquí se desarrolla el documento que se entregará impreso, con el proyecto,
la presentación del candidato y enlaces QR a demostraciones concretas.

La base es **A5 horizontal, 210 × 148 mm**, por indicación de Pol. El interior
mantiene márgenes blancos y las dos cubiertas exteriores usan el azul corporativo **#0192E5** hasta el borde.
Se propone grapado al caballete, sujeto a presupuesto para el formato apaisado.
La elección y las condiciones de producción se explican en
[IMPRESION.md](IMPRESION.md); [formato.json](formato.json) guarda los parámetros.
Ya hay un **[PDF completo de 24 páginas](librito-final.pdf)**
para revisión, con todas las escenas implementadas. La preparación de sangrado
de las cubiertas y la prueba de copistería siguen pendientes.

## Ejemplos de portada

La carpeta [portada/](slides/01-portada/README.md) presenta tres direcciones completas:
**02, editorial a dos columnas; 03, diagonal; 04, conversación centrada con un
semicírculo azul**. Cada una tiene PDF y PNG. La portada 1 se conserva como
referencia, con PDF de revisión y con sangrado. Los ajustes anteriores que solo
cambiaban la cabecera se han apartado como descartados: Pol pidió composiciones
distintas, no variaciones de la primera frase. Las propuestas verticales siguen
eliminadas. **La portada 03 diagonal está elegida.** La primera versión completa del interior y las escenas ya está desarrollada.

## Apertura y orden de trabajo

Las 24 carpetas están numeradas en `slides/`, de `01-portada` a `24-contraportada`.
La portada se ha trasladado ahí conservando sus archivos. **Desarrollar en orden.**

[Apertura 01–03](muestras/01-03-apertura/README.md): portada elegida,
presentación personal y dirección tecnológica. Pol ha aprobado esta dirección.

[Pareja 04–05](muestras/04-05-negocio/README.md): cadena de valor de extranjería
y oportunidad de crecimiento, con dirección también aprobada por Pol.

[Nueva pareja 06–07](muestras/06-07-modelo/README.md): referente Campmany y
modelo operativo propuesto para AS, pendientes de revisión. Incluye la lectura
acumulada de las siete primeras páginas y la pareja enfrentada.
La página 6 usa ahora la variante 02 con logo e ilustración oficiales, tras
la corrección de Pol. Su última aclaración añade al punto 2 de la página 7
la comparación salarial con Barcelona para perfiles equivalentes, como posible
ventaja económica de un equipo distribuido, pendiente de validar.
La [tanda 08–13](muestras/08-13-app/README.md) desarrolla las seis páginas siguientes:
concepto, entrevista, opciones, contratación, home y paso actual. Incluye PDF
de las seis páginas, tres parejas enfrentadas y acumulado 01–13; interfaces
capturadas en móviles HTML/CSS y cinco QR con guías. Pendiente de revisión de Pol.
La [tanda 14–24](muestras/14-24-cierre/README.md) completa el relato: documentos,
originales, práctica, consultas, configuración, beneficios, puesta en marcha,
CV, fotografías y contraportada diagonal. Se incluyen once páginas, cinco
parejas enfrentadas y el librito completo; 01–13 permanecen intactas.
Las variantes nuevas están pendientes de revisión de Pol.

La [muestra 12–13](muestras/12-13/README.md) está **rechazada**. Sus tres variantes
se conservan en `descartadas/` dentro de cada página; no son opciones a elegir.
La UX de la demo sí se conserva. Ver [guía narrativa](GUIA-NARRATIVA.md).

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

## Render de la variante seleccionada

Cada carpeta de diapositiva tiene `index.pdf` e `index.png`. La selección está
en [seleccion.json](seleccion.json). Ejecutar `npm run build:book` para regenerar
los 24 renders, el PDF final y las imágenes web. [Instrucciones del compilador](COMPILAR.md).
La home pública muestra el libro entero slide por slide. Cada push a `main`
lo regenera y publica mediante GitHub Actions.
