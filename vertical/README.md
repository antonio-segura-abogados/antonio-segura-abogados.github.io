# Escenas de demostración

La demo usa React, TypeScript, Vite y HashRouter. **Cada URL es una escena
autónoma**: no hay obligación de navegar por una aplicación funcional ni de
completar pantallas anteriores. Se comparten componentes y estilos.

El [plan de demo](PLAN-DEMO.md) registra 18 vistas propuestas, interacciones
locales y tutoriales. La **home muestra las 24 páginas del librito** con un
visor propio de imágenes: flechas, teclado, miniaturas, índice, ampliación,
texto accesible y descarga de PDF. `/#/?pagina=14` abre una página concreta.
El índice de escenas está en `/#/demos`. Muestras implementadas:

- `/#/entrevista`: objetivo, preguntas, respuesta desconocida y resumen editable.
- `/#/opciones`: tres estados de orientación, detalle y selección local.
- `/#/planes`: dos planes, mensual/anual, desglose y confirmación simulada.
- `/#/contratacion`: entrada directa al resumen del plan Acompañado.
- `/#/expediente`: home, detalle en diálogo, guía opcional y reinicio.
- `/#/expediente?tour=1`: la misma home con la guía abierta.
- `/#/expediente/pasos/documentacion`: instrucciones y documentos de ejemplo,
  accesibles directamente con su propio estado.
- `/#/documentos`, `/#/originales` y `/#/practica`: carpeta, logística y sesión de estudio.
- `/#/consultas` y `/#/consultas/sala-demo`: conversación, cita, sala visual y resumen.
- `/#/perfil`: preferencias ficticias.
- `/#/gestion/rutas` y `/#/gestion/rutas/residencia-demo`: catálogo y editor.
- `/#/gestion/cambios` y `/#/gestion/expedientes/lucia-demo`: impacto y excepción individual.
- `/#/demos`: índice. Las rutas desconocidas tienen su propia pantalla.

El menú inferior es ilustrativo. La acción documental usa un ejemplo y deja
la revisión pendiente; no recoge archivos. No hay estado global ni persistencia.
La recarga y el reinicio restauran cada escena. Todas admiten `?tour=1` y tienen
guía opcional, cierre y repetición. El índice facilita revisar ejemplos autónomos.
La [tanda 08–13](../librito/muestras/08-13-app/README.md) utiliza capturas reales
del marco HTML/CSS compartido con estas escenas. El diseño anterior de seguimiento
se conserva como antecedente en `diseno/seguimiento/`.

Ejecutar `npm ci`, `npm run dev` y `npm run build` desde `../`.
Para publicar, ejecutar `npm run build:pages` desde esa misma carpeta. El lockfile está
allí; no generar otro aquí. TypeScript/build y pruebas interactivas locales
verificados con Chrome: respuestas desconocidas/edición, importes, confirmación,
documentos, acceso directo, recarga y guías a 320/390 px. Ver
[registro de revisión](../librito/muestras/08-13-app/VERIFICACION-UI.json).

## Recursos

La aplicación importa directamente los estilos y assets necesarios desde
`../recursos-compartidos/`. Vite los empaqueta y ajusta sus URLs en `dist/`.
No se copia toda la carpeta de investigación, anexos o fuentes TTF al sitio.
La presentación publica los renders vigentes, incluidas las páginas de CV y fotos,
por petición de Pol. El PDF original de LinkedIn y los demás anexos no se copian al sitio.
Las fuentes WOFF2 se sirven localmente, sin depender de Google Fonts al visitar
la demo.
La compilación incluye automáticamente la licencia de la fuente en
`dist/licencias/PlusJakartaSans-OFL.txt`, tomada del original compartido.

## Direcciones permanentes para QR

Se usa `HashRouter`. Las escenas conservan sus URLs en el registro de QR.
El QR general abre la nueva presentación, con acceso a las demos. La prueba
física sigue pendiente. Ver [compilación y selección](../librito/COMPILAR.md).

La base relativa de Vite (`./`) y las rutas con `#` permiten que el mismo
contenido compilado funcione en una raíz o subcarpeta de GitHub Pages.
URL pública de la escena de seguimiento:

```text
https://antonio-segura-abogados.github.io/#/expediente
```

Después de imprimir un QR, conservar su ruta. Si una pantalla cambia de sitio,
añadir una redirección en la aplicación. No renombrar la cuenta/repositorio
sin una estrategia para conservar los enlaces impresos.

## Publicación en GitHub Pages

La fuente de Pages se ha cambiado a **GitHub Actions**. El workflow
`../.github/workflows/publicar.yml` instala dependencias, compila el librito y
la web y publica `docs/` con cada push a `main`. No depende de que un PNG o un
PDF compilado se actualice a mano antes del push.

```sh
npm run build:book  # renders index por slide + librito-final.pdf + imágenes web
npm run build:pages # lo anterior y compilación web
```

La preparación de Python y el cambio de variante están en
[COMPILAR.md](../librito/COMPILAR.md). `npm run build` sigue siendo la compilación
web local, usando los derivados de la última compilación del librito.
La carpeta `docs/` es una salida, no se edita a mano. Pages recibe ese mismo
contenido como artefacto de Actions; no ejecuta Vite por su cuenta.

La demo de 16 escenas se ha comprobado con Chrome. El visor de 24 páginas se
ha probado a 320, 390, 768 y 1440 px: navegación, recarga, índice, ampliación,
PDF, lectura accesible y acceso a la escena contextual. Registros en
`diseno/presentacion/`. No había navegador integrado conectado; se utilizó
Chrome con perfil temporal.

Referencias consultadas el 14-09-2026:
[despliegue estático de Vite](https://vite.dev/guide/static-deploy),
[base relativa de Vite](https://vite.dev/guide/build#relative-base),
[assets de Vite](https://vite.dev/guide/assets) y
[HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter).
