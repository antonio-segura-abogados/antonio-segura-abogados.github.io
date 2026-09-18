# Página 03 · Variante 2 · Vais a necesitar un experto tecnológico

Creada por petición de Pol el 18-09-2026. **Aprobada y elegida por Pol** ese
mismo día: «esta es la buena». Seleccionada como versión vigente de la página 3.

El mensaje afirma que el despacho necesitará un experto para adaptarse a los
cambios de la IA y concreta su responsabilidad: decidir qué automatizar y
dirigir su implantación. La candidatura de Pol se presenta como respuesta a
esa necesidad. Es su argumento estratégico; el informe conserva sus escenarios
y límites, sin atribuirle una conclusión sobre la contratación en AS.

- [PDF de la variante 2](pagina.pdf).
- [Renderizado PNG](pagina.png).
- [Texto editable](texto.json).
- [Generador propio](generar.py).
- [Configuración para el compilador](render.json).

Conserva la composición A5 horizontal, la tipografía, la captura del informe y
el QR de la primera variante. El titular mantiene sus tres líneas, con un ajuste
de tamaño para encajar el texto nuevo. El argumento mantiene el cuerpo de
11,5 puntos y se adelanta 6 puntos para dar espacio antes del QR.

## Regenerar únicamente esta variante

Desde `as-abogados/`:

```sh
.venv-librito/bin/python librito/slides/03-direccion-tecnologica/variantes/02-experto-tecnologico/generar.py
```

El comando solo escribe `pagina.pdf` y `pagina.png` en esta carpeta. La
variante 01, su generador de apertura y sus renderizados permanecen intactos.
`seleccion.json`, los `index`, el librito final y los recursos de la presentación
local usan la variante 2 mediante el [compilador común](../../../../COMPILAR.md).
La publicación de este cambio en GitHub Pages sigue pendiente.
