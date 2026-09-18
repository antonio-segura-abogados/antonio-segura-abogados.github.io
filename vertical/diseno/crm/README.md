# CRM de demostración · AS Workspace

Implementado localmente el 18-09-2026 por petición de Pol: sustituir las
escenas aisladas de gestión por una UI de CRM a pantalla completa y con
apariencia de producto terminado. La petición se aplica expresamente tanto
al configurador como a Control de cambios.

## Estructura e interacciones

`src/features/crm/` contiene el backoffice. Menú lateral, cabecera, búsqueda,
identidad, botones, estados, avatares, tablas y diálogos comparten estructura y
estilos. Se reutilizan la fuente local y los tokens de marca del proyecto.

- `/gestion`: vista general, indicadores calculados desde la muestra, tareas y
  expedientes en seguimiento.
- `/gestion/expedientes`: tabla, búsqueda, filtros y creación de casos ficticios.
- `/gestion/expedientes/lucia-demo`: ficha, recorrido y excepción individual.
  También se puede abrir Omar y los otros expedientes desde la tabla.
- `/gestion/tareas`: tareas que se pueden completar y agenda ilustrativa.
- `/gestion/documentos`: bandeja por estado, validación y subsanación con notas.
- `/gestion/mensajes`: conversaciones con respuestas simuladas.
- `/gestion/rutas`: catálogo de cuatro tipologías. Residencia tiene editor;
  las otras tres se identifican como plantillas ilustrativas pendientes.
- `/gestion/rutas/residencia-demo`: constructor con secuencia, configuración,
  documentos solicitados, responsable, revisión y previsualización del cliente.
  Admite añadir y reordenar pasos, guardar el borrador durante la sesión y
  publicar una versión simulada tras confirmar revisión y vigencia. Pestañas
  de reglas, versiones y expedientes vinculados.
- `/gestion/cambios`: comparación de instrucciones, responsable, vigencia,
  tabla de impacto y selección explícita del alcance. El ejemplo permite
  aplicar a Lucía y mantiene a Omar para revisión individual. Registro de actividad.
- `/gestion/equipo`: perfiles ficticios, responsabilidades y carga de trabajo.

Cada URL permite entrar directamente. El estado de esta muestra de CRM se
conserva al navegar entre sus vistas; recargar, salir a otras escenas o usar
Reiniciar restaura la muestra. Los diálogos usan `dialog` nativo, etiqueta
accesible, Escape y retorno del foco. En móvil se colapsa el menú, la secuencia
se desplaza horizontalmente y la vista previa pasa debajo del editor. Las tablas
mantienen desplazamiento dentro de su contenedor.

## Límites de la maqueta

No hay backend, autenticación, documentos personales, envío de mensajes,
notificaciones externas ni publicación real. Los permisos del equipo, las citas,
los plazos y las reglas automáticas son ejemplos visuales; los recordatorios no
se ejecutan. Guardar conserva el estado solo durante la sesión de la demo.

La comparación de Control de cambios es un escenario preparado, con el texto
ficticio de `recursos-compartidos/demo/gestion.json`; no es un motor que calcule
el impacto jurídico de cualquier edición del constructor. La creación de una
ruta completamente nueva y la configuración de las otras tres tipologías no
forman parte de esta maqueta.

La implementación anterior en `features/gestion/Gestion.tsx` se conserva como
antecedente, sin rutas activas. Las capturas vigentes del librito se han actualizado al CRM completo por
petición posterior de Pol; las muestras históricas conservan la versión anterior.
Los scripts antiguos que buscan `.workspace-frame` describen esa maqueta y
no validan el nuevo CRM.

## Verificación local · 18-09-2026

- `npm run build`: TypeScript y Vite correctos.
- `git diff --check`: correcto.
- Revisión mediante la extensión de Chrome conectada: constructor y Control
  de cambios a 1440 px, vista general y constructor móvil a 320 px.
- Diez rutas anteriores a 1280, 768, 390 y 320 px: un único H1 visible por
  vista y sin desbordamiento horizontal de la página (40 comprobaciones).
- Edición del paso y vista previa; guardado; navegación a Cambios y vuelta al
  editor conservando el borrador; creación y reordenación de un sexto paso;
  revisión/publicación y bloqueo posterior de edición.
- Selección de Lucía, confirmación de alcance, aplicación y registro del cambio.
- Creación de expediente, paso inicial sin completar y excepción individual.
- Validación documental con nota, actualización del contador y respuesta
  simulada en una conversación.
- Reinicio, menú móvil, búsqueda de Lucía sin tilde, cierre del diálogo con
  Escape y retorno del foco al botón que lo abrió.

La consola del navegador registró avisos repetidos de canal de mensajería
cerrado (`A listener indicated an asynchronous response…`), coincidentes con
la conexión de la extensión. No se observó un fallo de la aplicación en los
recorridos comprobados; no se presenta esta revisión como una consola vacía.

Capturas editoriales 18–19 actualizadas el 18-09-2026: Chrome a 1920 × 1250,
menú y cabecera incluidos, sin retoques de la interfaz. Ver
[composición y verificación](../../../librito/VERIFICACION-CRM.json).
Pendientes: valoración visual de Pol y publicación en GitHub Pages. No se ha hecho push ni despliegue.
