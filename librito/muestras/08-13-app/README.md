# Tu app de extranjería: páginas 08–13

Tanda solicitada por Pol: «haz una tanda de 6 diapositivas». Desarrollada en
orden el 17-09-2026, **pendiente de revisión**. Conserva intactas las páginas
01–07 y las variantes anteriores rechazadas de 12–13.

## Lectura

- [Las seis páginas nuevas](app-08-13.pdf).
- [Las tres parejas enfrentadas](parejas-08-13.pdf): 8–9, 10–11 y 12–13.
- [Librito acumulado 01–13](librito-01-13.pdf), con portada diagonal.

| Página | Idea | Variante |
| --- | --- | --- |
| 8 | Tu app de extranjería: del objetivo al acompañamiento | [Concepto e índice](../../slides/08-concepto-app/variantes/01-producto/README.md) |
| 9 | La primera entrevista prepara el trabajo del abogado | [Conversación](../../slides/09-entrevista/variantes/01-conversacion/README.md) |
| 10 | Entender condiciones, pasos y costes antes de elegir | [Decisión](../../slides/10-opciones/variantes/01-decision/README.md) |
| 11 | Saber qué incluye el plan y cuánto se paga | [Acompañamiento](../../slides/11-contratacion/variantes/01-acompanamiento/README.md) |
| 12 | Saber dónde está el expediente y quién debe actuar | [Home en móvil](../../slides/12-seguimiento/variantes/04-movil/README.md) |
| 13 | Convertir el paso actual en una acción concreta | [Tarea en móvil](../../slides/13-paso-actual/variantes/04-movil/README.md) |

## Dirección visual y contenido

Titulares grandes y gesto diagonal de la dirección aprobada, con composiciones
alternadas para leer las parejas. La 8 presenta producto e índice; la 11 amplía
los precios; la 12 convierte una pregunta del cliente en un reparto de turnos.
Las interfaces son capturas reales de la demo, dentro de un móvil HTML/CSS
compartido. Cada página conserva sus instrucciones y texto editable.

El caso de Lucía es ficticio. La entrevista distingue fecha de llegada y
residencia legal y permite responder «No lo sé». Las opciones son una vía a
estudiar, una revisión complementaria y una valoración individual; no se usan
las promesas de plazos del boceto. La revisión corresponde al equipo jurídico.

Planes ilustrativos: 19/29 € al mes o 190/290 € al año, IVA incluido. En la demo
se ve el total anual y su equivalente mensual; trámites, tasas y gastos aparte.
La contratación es simulada. Ninguna pantalla recoge tarjetas o documentos reales.

## Pantallas y QR

Las páginas 9–13 llevan cinco QR vectoriales de 28 mm con guía opcional:
`/entrevista`, `/opciones`, `/planes`, `/expediente` y
`/expediente/pasos/documentacion`. Existe también `/contratacion` como entrada
directa al resumen. Cada URL tiene sus propios datos y estado local; no exige
pasar por otra escena. El índice de muestras permite revisarlas por separado.

Base: `https://antonio-segura-abogados.github.io/`. Esta revisión está publicada
en el commit `36f85d3`; HTML y nueve recursos coinciden con el build local.
El estado está en [destinos.json](../../../recursos-compartidos/qr/destinos.json).
La comprobación física de los QR sigue pendiente.

## Reproducir

Desde `as-abogados/`, con el servidor local disponible y las dependencias del
proyecto instaladas:

```sh
npm run dev
# En otra terminal:
npm install --prefix /private/tmp/asa-browser playwright-core
node librito/muestras/08-13-app/capturar.mjs
python recursos-compartidos/qr/generar.py
python librito/muestras/08-13-app/generar.py
python librito/muestras/08-13-app/verificar.py
```

Python usa las [dependencias de maquetación](../../slides/01-portada/requirements.txt).
En esta sesión se emplea `/private/tmp/as-portada-venv/bin/python`.
La captura requiere Chrome en macOS, con perfil temporal independiente; la
verificación de QR utiliza Swift y Apple Vision. `ASA_DEMO_URL` permite indicar
otro servidor. No añade Playwright como dependencia de la aplicación publicada.

## Verificación

- [Interacciones, importes, guías y anchos de 320/390 px](VERIFICACION-UI.json).
- [Secuencia, formato, enlaces y QR decodificados desde PDF](VERIFICACION-PDF.json).
- [Publicación y comparación con la compilación local](VERIFICACION-PUBLICACION.json).
- Renders de las tres parejas inspeccionados; tipografía incrustada, márgenes
  y límites del texto comprobados por el generador.
- TypeScript y compilación de GitHub Pages comprobados.

La siguiente pareja es **14–15: documentos y originales**. Esta tanda no modifica
su planificación ni presenta como terminadas las páginas restantes del libro.
