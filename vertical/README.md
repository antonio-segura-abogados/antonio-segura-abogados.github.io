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

Ejecutar `npm ci`, `npm run dev` y `npm run build` desde `../`. El lockfile está
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
`../recursos-compartidos/qr/destinos.json`. Ninguna tiene todavía URL pública ni
QR definitivo. La publicación continúa prevista para la cuenta dedicada de GitHub Pages.

La base relativa de Vite (`./`) y las rutas con `#` permiten que el mismo
contenido compilado funcione en una raíz o subcarpeta de GitHub Pages.
Ejemplo de estructura, todavía sin URL real:

```text
https://CUENTA.github.io/REPOSITORIO/#/expediente
```

Después de imprimir un QR, conservar su ruta. Si una pantalla cambia de sitio,
añadir una redirección en la aplicación. No renombrar la cuenta/repositorio
sin una estrategia para conservar los enlaces impresos.

## Publicación futura

Cuando se decida la cuenta y el repositorio, configurar GitHub Pages con GitHub
Actions. El build será `npm ci && npm run build` desde `as-abogados/` si el
repositorio contiene todo este workspace, o desde la raíz si el repositorio
empieza en esta carpeta. El artefacto será `as-abogados/vertical/dist/` o
`vertical/dist/`, respectivamente.

No hay publicación automática configurada todavía, porque no se ha elegido el
repositorio. No publicar la carpeta raíz completa como contenido del sitio.

Referencias consultadas el 14-09-2026:
[despliegue estático de Vite](https://vite.dev/guide/static-deploy),
[base relativa de Vite](https://vite.dev/guide/build#relative-base),
[assets de Vite](https://vite.dev/guide/assets) y
[HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter).
