# Referente y modelo operativo: páginas 06–07

Continuación del 17-09-2026. Pol aprueba la línea de 4–5 con «Bien, continua en
esta linea». Se conservan los PDF de 1–5 y se desarrollan primero la página 6
y después la 7. Tras su corrección, la página 6 usa la **variante 02 con logo e
ilustración oficiales**. Por su última aclaración, el punto 2 de la 7 incorpora
la comparación salarial con Barcelona para perfiles equivalentes, como posible
ahorro de un equipo distribuido por validar. La pareja sigue en revisión.

## Leer la pareja y la secuencia

- [Páginas 01–07 en orden](librito-01-07.pdf): siete páginas A5 horizontales.
- [Pareja enfrentada 06–07](modelo-06-07.pdf): vista de 420 × 148 mm.
- [Vista de la pareja](modelo-06-07.png).

La página 5 pregunta qué aprender de otros despachos. La 6 responde con un
referente contrastado: Campmany Premium. La 7 explica qué cambios exploraría
Pol para AS y termina presentando el siguiente capítulo, la app de extranjería.

## Dirección editorial

- **P. 6:** «Asesoramiento por suscripción». Referente y argumento a la izquierda;
  logo e ilustración oficiales a la derecha; recorrido horizontal abajo. Oferta
  contrastada en la web oficial, con fuente fechada y enlace dentro del PDF.
  La ilustración proviene de Campmany; no reproduce su interfaz privada.
- **P. 7:** «Crecer también es organizar mejor». Tres relaciones entre cambios
  operativos y beneficios buscados. Son hipótesis para AS, señaladas como tales.
- Se mantienen la tipografía, el gesto diagonal, la paleta y los márgenes del
  libro. Cada página tiene composición propia dentro de la dirección aprobada.
- No hay QR de demo en esta pareja. Las pantallas de producto llegan después
  de justificar su razón de negocio. El marco de móvil HTML/CSS sigue previsto
  para esas páginas.

## Fuentes editables

- [Página 6, variante actual 02](../../slides/06-referente-campmany/variantes/02-referente-visual/README.md).
- [Página 6, variante anterior 01](../../slides/06-referente-campmany/variantes/01-suscripcion/README.md).
- [Página 7](../../slides/07-modelo-operativo/variantes/01-procesos/README.md).
- [Generador](generar.py). Reutiliza las primitivas de dibujo y la verificación
  de [04–05](../04-05-negocio/generar.py), además de los recursos tipográficos
  y la paleta comunes; no duplica esas utilidades.
- [Dependencias](../../slides/01-portada/requirements.txt).
- [Recursos oficiales y su procedencia](../../../recursos-compartidos/assets/referentes/campmany/README.md).

Desde `as-abogados/`, con las dependencias disponibles:

```sh
python librito/muestras/06-07-modelo/generar.py
```

Genera los dos PDF de página, sus PNG, la pareja y el acumulado 01–07. Comprueba
que los originales 01–05 permanezcan intactos. No modifica ni publica la demo.
El parámetro opcional `--referente 01` permite exportar la composición anterior
con un sufijo distinto, sin reemplazar las comparativas vigentes.

## Comprobación

Renders revisados visualmente. Tamaño A5, fuentes incrustadas, límites del texto
y ausencia de colisiones comprobados. El acumulado conserva siete páginas en
orden, el enlace al informe de Anthropic y la fuente de Campmany; la pareja
también conserva el enlace de su fuente. Son PDF de revisión, sin imposición.
Los recursos oficiales están incrustados con transparencia y más de 600 ppp
a su tamaño de impresión.
