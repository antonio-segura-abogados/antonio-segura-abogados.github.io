# Cierre del librito: 14–24

Las once páginas que faltaban están desarrolladas en orden. Conservan las
instrucciones de Pol y una variante editable en cada carpeta. Las primeras
trece páginas se mantienen visualmente iguales. Nuevos diseños pendientes
de revisión de Pol.

- [Librito vigente, compilado desde la selección](../../librito-final.pdf)
- [Tanda 14–24](cierre-14-24.pdf)
- [Cinco parejas enfrentadas 14–23](parejas-14-23.pdf)
- [Lectura completa al cerrar esta tanda](librito-completo-01-24.pdf)

La selección vigente está en [seleccion.json](../../seleccion.json). El PDF
de esta muestra es una instantánea; para las revisiones futuras usar el
[compilador](../../COMPILAR.md) y los `index.pdf` / `index.png` de cada página.

| Páginas | Qué aporta la pareja |
| --- | --- |
| 14–15 | Documentos digitales y originales: revisión, subsanación, entrega y devolución |
| 16–17 | Hábito de práctica y equipo cercano: preguntas, consulta, cita y resumen |
| 18–19 | Criterio del despacho dentro del proceso: rutas, versiones y excepciones |
| 20–21 | Alcance potencial, operación y propuesta de puesta en marcha |
| 22–23 | Trayectoria de Pol, dos fotos originales y contacto |
| 24 | Contraportada diagonal y acceso general a la propuesta |

Las escenas son independientes. Los datos operativos son ficticios; las preguntas
propias se contrastan con el manual CCSE 2026. La comparación salarial con Barcelona
se conserva como hipótesis, por la última instrucción de Pol. CV y fotos proceden
de sus materiales; el mapa usa geometría de Natural Earth en dominio público.

## Comprobación realizada

- [Interfaz](VERIFICACION-UI.json): diez nuevas URLs y sus interacciones, guías,
  reinicio y anchos de 320/390 px; sin errores JS ni desbordamientos.
- [PDF](VERIFICACION-PDF.json): 24 páginas A5, 01–13 idénticas al render anterior,
  trece QR leídos desde el PDF a 300 ppp y enlaces conservados en las parejas.
- Revisión visual de las once páginas; capturas reales de React, mapa vectorial,
  fotos completas y fuentes incrustadas. Prueba física pendiente.

`capturar.mjs` usa Chrome para capturar el marco HTML/CSS real. `generar.py`
reproduce esta tanda. El compilador general reutiliza sus funciones y permite
cambiar la variante seleccionada sin reconstruir muestras históricas.

**Actualización 18-09-2026:** capturas de móvil de 14–17 renovadas para ajustar las
esquinas inferiores al bisel. Regeneradas las variantes seleccionadas, los `index`,
el PDF vigente y los recursos del visor. Las muestras acumuladas y parejas de esta
carpeta conservan la instantánea histórica; las escenas actuales ya no tienen guías.

## CRM actualizado · 18-09-2026

Por petición de Pol, las capturas vigentes de las páginas 18–19 muestran ahora
AS Workspace a pantalla completa. La [pareja actualizada](pareja-18-19-crm.png)
recoge el nuevo encuadre de las dos páginas. Variantes, `index`, librito final
y visor local actualizados; las muestras acumuladas anteriores se conservan
como antecedentes. Los otros 22 renders no cambian.

El script `capturar.mjs` de esta tanda sigue describiendo los flujos antiguos;
para estas dos capturas se ha usado Chrome conectado, viewport 1920 × 1250,
página completa, borrador del constructor y Lucía seleccionada en Cambios.
Ver [procedencia](../../../recursos-compartidos/assets/demo/14-19/procedencia.json)
y [verificación](../../VERIFICACION-CRM.json). Publicación pendiente.
