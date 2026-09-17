# Escenas de demostración

La demo usa React, TypeScript, Vite y HashRouter. **Cada URL es una escena
autónoma**: no hay obligación de navegar por una aplicación funcional ni de
completar pantallas anteriores. Se comparten componentes y estilos.

El [plan de demo](PLAN-DEMO.md) registra 18 vistas propuestas, interacciones
locales y tutoriales. Primeras muestras implementadas:

- `/#/expediente`: home, detalle en diálogo, guía opcional y reinicio.
- `/#/expediente?tour=1`: la misma home con la guía abierta.
- `/#/expediente/pasos/documentacion`: instrucciones y documentos de ejemplo,
  accesibles directamente con su propio estado.
- `/`: índice de revisión. Las rutas desconocidas tienen su propia pantalla.

El menú inferior es ilustrativo. La acción documental usa un ejemplo y deja
la revisión pendiente; no recoge archivos. No hay estado global ni persistencia.
La recarga y el reinicio restauran cada escena. Ver [muestra visual](diseno/seguimiento/README.md).

Ejecutar `npm ci`, `npm run dev` y `npm run build` desde `../`.
Para publicar, ejecutar `npm run build:pages` desde esa misma carpeta. El lockfile está
allí; no generar otro aquí. TypeScript/build verificados. Prueba interactiva
pendiente por indisponibilidad del navegador integrado en esta sesión.

## Recursos

La aplicación importa directamente los estilos y assets necesarios desde
`../recursos-compartidos/`. Vite los empaqueta y ajusta sus URLs en `dist/`.
No se copia toda la carpeta de investigación, anexos o fuentes TTF al sitio.
Las fuentes WOFF2 se sirven localmente, sin depender de Google Fonts al visitar
la demo.
La compilación incluye automáticamente la licencia de la fuente en
`dist/licencias/PlusJakartaSans-OFL.txt`, tomada del original compartido.

## Direcciones permanentes para QR

Se usa `HashRouter`. Las URLs implementadas y las pendientes se registran en
`../recursos-compartidos/qr/destinos.json`. La demo está publicada; HTML y
recursos verificados por HTTP el 17-09-2026. Quedan comprobar interacciones
y lectura física de los QR antes de imprimir. Las rutas propuestas sin
implementar siguen mostrando la pantalla de dirección no disponible.

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

La fuente de Pages es **Deploy from a branch → main → /docs**. El sitio está
publicado en `https://antonio-segura-abogados.github.io/`. La carpeta `docs/`
del repositorio se sirve en la raíz de la URL pública, sin añadir `/docs/`.

Desde la raíz del repositorio (`as-abogados/`):

```sh
npm run build:pages
git add docs
# Incluir también los cambios de código que originan esta compilación.
git commit -m "Actualizar demo publicada"
git push origin main
```

`build:pages` comprueba TypeScript y genera `docs/index.html`, assets y licencia.
Reemplaza el contenido de `docs/`: es una salida generada, no editarla a mano.
`vertical/public/.nojekyll` se copia automáticamente para servir archivos estáticos.
El build habitual (`npm run build`) sigue generando `vertical/dist/` para pruebas.

Cada push a `main` publica lo que esté compilado en `docs/`; GitHub no ejecuta
Vite en esta configuración. El resto del repositorio no forma parte del sitio.
Despliegue verificado el 17-09-2026: HTML y todos los recursos responden HTTP 200
y coinciden con los archivos locales. Prueba interactiva pendiente porque el
navegador integrado no está disponible.

Referencias consultadas el 14-09-2026:
[despliegue estático de Vite](https://vite.dev/guide/static-deploy),
[base relativa de Vite](https://vite.dev/guide/build#relative-base),
[assets de Vite](https://vite.dev/guide/assets) y
[HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter).
