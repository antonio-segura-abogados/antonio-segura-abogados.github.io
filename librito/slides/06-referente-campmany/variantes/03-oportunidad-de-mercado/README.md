# Página 06 · Una oportunidad de mercado para Antonio Segura

Variante 03, 18-09-2026. Seleccionada para revisión en la presentación local;
frase de cierre de Campmany aprobada por Pol. Variantes 01 y 02 conservadas.

Pol corrige el foco: la página debe presentar su estudio de mercado y el
espacio que ha detectado para gestionar procesos de extranjería mediante una
app. Campmany es un respaldo a esa oportunidad, no el protagonista.

## Recorrido de lectura

1. «Extranjería vía app. Un espacio por ocupar.»
2. El trabajo de Pol y su conclusión de mercado, en primera persona.
3. La oportunidad concreta para Antonio Segura: liderar ese espacio.
4. Campmany como caso de éxito en bajas e incapacidades, en una franja secundaria.

Se mantienen la tipografía y los colores compartidos, el logo oficial de
Campmany, el número de página y el enlace a su servicio. El logo tiene menor
peso que el argumento de AS. La ilustración y el recorrido detallado de la
variante 02 se conservan en aquella composición.

## Procedencia del argumento

El estudio y la conclusión de mercado proceden de la declaración de Pol del
18-09-2026. Pol aclara después que conoce personalmente la historia de
Campmany y su buena evolución, pero no dispone de cifras. Se corrige la
atribución de su crecimiento al estudio de mercado.

La investigación encuentra un [caso publicado por HubSpot](https://www.hubspot.com/case-studies/campmany-abogados):
ingresos duplicados en cuatro meses tras adoptar en 2017 una estrategia de
marketing y ventas digitales. Es un caso publicado por el proveedor, no una
auditoría independiente ni una medición del efecto de la app.

Pol aprueba esta redacción, aplicada sin añadir cifras al bloque:

> Campmany demuestra que un despacho especializado puede crecer con un modelo
> digital. Mi propuesta es llevar estos principios a extranjería.

La web oficial de Campmany, reconsultada el 18-09-2026, acredita la oferta:
aplicación privada, suscripción, consultas escritas y revisión documental.
El pie atribuye el estudio a Pol y enlaza por separado Campmany Premium y
el caso de éxito de HubSpot. Ver [fuentes y límites](../../../../../recursos-compartidos/investigacion/FUENTES-PROPUESTA.md).

## Archivos y reproducción

- [Texto editable](texto.json).
- [Composición](generar.py) y [configuración del compilador](render.json).
- [PDF](pagina.pdf) y [PNG](pagina.png).

Desde `as-abogados/`:

```sh
.venv-librito/bin/python librito/slides/06-referente-campmany/variantes/03-oportunidad-de-mercado/generar.py
npm run build:book -- --sin-renderizar
```

El segundo comando actualiza la presentación y el librito desde la selección
vigente. `npm run build:book` también reproduce la variante desde sus fuentes.
La web pública se conserva hasta una publicación posterior.

## Verificación

Composición revisada en el PNG de la variante y en la página 6 extraída del
PDF completo. A5, fuentes incrustadas, límites y los dos enlaces comprobados.
La recompilación del libro es correcta. El último `npm run build` se detiene
por TS2345 en `Practica.tsx:90` (subcategoriaId null/string), ajeno a esta
revisión editorial. El servidor local devuelve HTTP 200 para la
presentación y el nuevo WebP. Las otras 23 páginas y las variantes 01 y 02
conservan sus huellas. No hubo navegador conectado para comprobar interacción.
[Registro de verificación](VERIFICACION.json).
