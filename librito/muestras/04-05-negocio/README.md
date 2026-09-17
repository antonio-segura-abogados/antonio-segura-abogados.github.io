# Negocio y oportunidad: páginas 04–05

Continuación del 17-09-2026. Pol ha aprobado la dirección de la apertura con
«EXCELENTE. ESTE ES EL CAMINO. Sigue así». Después aprueba la línea de 4–5 con
«Bien, continua en esta linea». Los originales 1–5 se conservan como base.
La [continuación 6–7](../06-07-modelo/README.md) ya está desarrollada y en revisión;
incluye la lectura acumulada 01–07.

## Leer el relato

- [Páginas 01–05 en orden](librito-01-05.pdf): cinco páginas A5 horizontales,
  desde la portada elegida hasta la nueva oportunidad.
- [Pareja enfrentada 04–05](negocio-04-05.pdf): revisión de 420 × 148 mm.
- [Vista de la pareja](negocio-04-05.png).

La página 3 termina proponiendo entender el negocio. La 4 responde con un
mapa de extranjería y del valor que aporta el despacho. La 5 plantea cómo llevar
ese valor a más clientes y termina preparando el referente de las páginas 6–7.

## Decisiones de composición

- **P. 4, «Empiezo por extranjería»:** recorrido vectorial basado en el boceto
  de Pol, con bifurcación documental y el trabajo del despacho alineado debajo.
  El esquema es una interpretación externa, señalada como tal en la página.
- **P. 5, «Vuestro criterio. A mayor escala»:** titular protagonista y tres
  resultados en un campo continuo. La diagonal mantiene relación con la portada.
- La pareja usa márgenes blancos y no cruza el lomo. No hay QR en estas páginas:
  aquí se establece el argumento de negocio que justificará las escenas de producto.
- Las fricciones operativas se desarrollarán al hablar de los mecanismos de
  crecimiento en 6–7, sin saturar el mapa ni atribuir a AS problemas no comprobados.

## Fuentes editables

- [Página 4: texto, instrucciones y exportaciones](../../slides/04-cadena-de-valor/variantes/01-recorrido/README.md).
- [Página 5: texto, instrucciones y exportaciones](../../slides/05-oportunidad/variantes/01-escala/README.md).
- [Generador](generar.py), con las mismas dependencias de la
  [portada](../../slides/01-portada/requirements.txt).

Desde `as-abogados/`, con esas dependencias disponibles:

```sh
python librito/muestras/04-05-negocio/generar.py
```

Lee los textos de cada variante y utiliza las fuentes, colores y formato comunes.
Exporta ambas páginas, la pareja y el acumulado 01–05. Comprueba que no se alteren
los PDF aprobados 01–03. No regenera la apertura ni modifica la demo.

## Comprobación

Revisión visual de los renders y de la pareja enfrentada. Tamaño A5, fuentes
incrustadas y texto dentro de los límites de página comprobados. El acumulado
mantiene cinco páginas en orden y el enlace del informe en la página 3.
Son PDF de revisión, sin imposición ni preparación final de imprenta.
