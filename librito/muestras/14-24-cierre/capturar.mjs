// Capturas de la interfaz real y comprobaciones de los recorridos de ejemplo.
import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const out = `${root}recursos-compartidos/assets/demo/14-19`;
await mkdir(out, { recursive: true });
const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errors = [], records = [];
const routes = ['/documentos', '/originales', '/practica', '/consultas', '/consultas/sala-demo', '/perfil', '/gestion/rutas', '/gestion/rutas/residencia-demo', '/gestion/cambios', '/gestion/expedientes/lucia-demo'];
try {
  const context = await browser.newContext({ viewport: { width: 1200, height: 1100 }, deviceScaleFactor: 3 });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  async function open(route) { await page.goto('about:blank'); await page.goto(`${base}/#${route}`); await page.locator('.device-frame, .workspace-frame').waitFor(); await page.evaluate(() => document.fonts.ready); }
  async function capture(name, route, selector = '[data-capture="phone"]', prepare) {
    await open(route); if (prepare) await prepare();
    await page.addStyleTag({ content: '.scene-shell { background: transparent; } .device-frame { box-shadow: none; } html,body { background: transparent; }' });
    await page.locator(selector).screenshot({ path: `${out}/${name}.png`, omitBackground: true });
    records.push({ archivo: `${name}.png`, ruta: route, selector, escala: 3, origen: 'React en Chrome; misma escena del QR' });
  }
  await capture('14-documentos', '/documentos', undefined, () => page.getByRole('button', { name: 'Pendientes', exact: true }).click());
  await capture('15-originales', '/originales');
  await capture('16-practica', '/practica', undefined, async () => { await page.getByRole('button', { name: 'B Madrid' }).click(); await page.getByRole('button', { name: 'Comprobar respuesta' }).click(); });
  await capture('17-consultas', '/consultas/sala-demo');
  await capture('18-configurador', '/gestion/rutas/residencia-demo', '[data-capture="board"]');
  await capture('19-cambios', '/gestion/cambios', '[data-capture="board"]', async () => { await page.getByRole('button', { name: 'Añadir excepción a Lucía' }).click(); await page.getByRole('button', { name: 'Guardar excepción de ejemplo' }).click(); });

  await open('/documentos');
  assert.match(await page.locator('.document-overview').innerText(), /^2/);
  await page.getByRole('button', { name: 'Pendientes', exact: true }).click();
  assert.equal(await page.locator('.archive-card').count(), 2);
  await page.getByRole('button', { name: /Subsanar Certificado de nacimiento/ }).click();
  await page.getByRole('button', { name: 'Usar copia completa de ejemplo' }).click();
  assert.match(await page.getByRole('dialog').innerText(), /Pendiente de revisión/);
  await page.getByRole('button', { name: 'Cerrar detalle' }).click();
  assert.match(await page.locator('.document-overview').innerText(), /^1/);
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  assert.match(await page.locator('.document-overview').innerText(), /^2/);

  await open('/originales');
  await page.getByLabel('Ciudad del ejemplo').selectOption('Madrid');
  await page.getByRole('button', { name: /Punto Estación/ }).click();
  await page.getByRole('button', { name: 'Preparar la entrega' }).click();
  const receipt = page.getByRole('button', { name: 'Crear resguardo de ejemplo' });
  assert.equal(await receipt.isDisabled(), true);
  await page.getByLabel('He revisado la preparación del ejemplo.').check(); await receipt.click();
  assert.match(await page.locator('.shipment-receipt').innerText(), /Punto Estación · Madrid/);
  await page.getByRole('button', { name: 'Ver incidencia de ejemplo' }).click();
  assert.equal(await page.getByRole('button', { name: 'Simular siguiente estado' }).isDisabled(), true);
  await page.getByRole('button', { name: 'Resolver incidencia de ejemplo' }).click();
  for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Simular siguiente estado' }).click();
  assert.match(await page.locator('.shipment-status').innerText(), /revisión documental sigue pendiente/);
  for (let i = 0; i < 2; i++) await page.getByRole('button', { name: 'Simular siguiente estado' }).click();
  assert.equal(await page.getByRole('button', { name: 'Ejemplo completado' }).isDisabled(), true);
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  assert.equal(await page.getByLabel('Ciudad del ejemplo').inputValue(), 'Barcelona');

  await open('/practica');
  assert.equal(await page.getByRole('button', { name: 'Comprobar respuesta' }).isDisabled(), true);
  for (const [i, answer] of [0, 0, 2, 0, 2].entries()) {
    await page.locator('.quiz-options button').nth(answer).click();
    await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
    assert.equal(await page.locator('.quiz-options button:disabled').count(), 3);
    if (i === 0) assert.match(await page.locator('.quiz-explanation').innerText(), /repaso/);
    await page.getByRole('button', { name: i === 4 ? 'Ver mi resultado' : 'Siguiente pregunta' }).click();
  }
  assert.match(await page.locator('.quiz-result').innerText(), /40 puntos/);
  await page.getByRole('button', { name: 'Repasar errores' }).click();
  assert.match(await page.locator('.quiz-card').innerText(), /PREGUNTA 1 DE 1/);
  await page.locator('.quiz-options button').nth(1).click(); await page.getByRole('button', { name: 'Comprobar respuesta' }).click(); await page.getByRole('button', { name: 'Ver mi resultado' }).click();
  assert.equal(await page.getByRole('button', { name: 'Repasar errores' }).count(), 0);
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click(); assert.match(await page.locator('.practice-stats').innerText(), /0 puntos/);

  await open('/consultas');
  assert.equal(await page.getByRole('button', { name: 'Añadir al ejemplo' }).isDisabled(), true);
  await page.getByLabel('Escribe un mensaje de ejemplo').fill('¿Podemos revisar la copia?'); await page.getByRole('button', { name: 'Añadir al ejemplo' }).click();
  assert.equal(await page.locator('.message-list article').count(), 3);
  await page.getByRole('button', { name: 'Videollamada', exact: true }).click(); await page.locator('.appointment-list button').nth(1).click();
  await page.getByRole('button', { name: 'Reservar cita de ejemplo' }).click(); await page.getByRole('button', { name: 'Entrar en la sala de ejemplo' }).click();
  await page.getByRole('button', { name: 'Silenciar', exact: true }).click(); assert.equal(await page.getByRole('button', { name: 'Activar audio' }).getAttribute('aria-pressed'), 'false');
  await page.getByRole('button', { name: 'Apagar cámara' }).click(); assert.match(await page.locator('.video-self').innerText(), /Cámara apagada/);
  await page.getByRole('button', { name: 'Terminar', exact: true }).click(); assert.match(await page.locator('.consultation-summary').innerText(), /Llamada de ejemplo terminada/);
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click(); assert.equal(await page.locator('.message-list article').count(), 2);

  await open('/gestion/rutas/residencia-demo');
  const publish = page.getByRole('button', { name: 'Publicar versión de ejemplo' });
  assert.equal(await publish.isDisabled(), true);
  await page.getByLabel('Revisión profesional simulada').check(); assert.equal(await publish.isEnabled(), true);
  await page.getByLabel('Instrucciones para el cliente').fill('Copia legible del ejemplo de prueba.');
  assert.equal(await page.getByLabel('Revisión profesional simulada').isChecked(), false); assert.equal(await publish.isDisabled(), true);
  assert.match(await page.locator('.mini-phone').innerText(), /Copia legible del ejemplo/);
  await page.getByRole('button', { name: '↑ Subir' }).click(); assert.match(await page.locator('.route-steps li').first().innerText(), /Preparar documentación/);
  await page.getByRole('button', { name: '+ Añadir paso de ejemplo' }).click(); assert.equal(await page.locator('.route-steps li').count(), 6);
  await page.getByLabel('Revisión profesional simulada').check(); await page.getByLabel('Vigencia propuesta').fill(''); assert.equal(await publish.isDisabled(), true);
  await page.getByLabel('Vigencia propuesta').fill('2026-10-01'); await page.getByLabel('Revisión profesional simulada').check(); await publish.click();
  assert.match(await page.locator('.management-status').innerText(), /Lucía y Omar conservan la versión 1/);
  assert.equal(await page.getByLabel('Instrucciones para el cliente').isDisabled(), true);
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click(); assert.equal(await page.locator('.route-steps li').count(), 5);

  await open('/gestion/cambios');
  const apply = page.getByRole('button', { name: 'Aplicar a Lucía · ejemplo' }); assert.equal(await apply.isDisabled(), true);
  const omar = await page.locator('.affected-case').nth(1).innerText(); const template = await page.locator('.change-comparison').innerText();
  await page.getByLabel('He revisado el alcance del ejemplo').check(); await apply.click();
  assert.match(await page.locator('.affected-case').first().innerText(), /v2/); assert.match(await page.locator('.affected-case').first().innerText(), /1 paso completado/);
  await page.getByRole('button', { name: 'Añadir excepción a Lucía' }).click(); await page.getByLabel('Motivo e instrucciones del ejemplo').fill('Revisión individual documentada.'); await page.getByRole('button', { name: 'Guardar excepción de ejemplo' }).click();
  assert.equal(await page.locator('.affected-case').nth(1).innerText(), omar); assert.equal(await page.locator('.change-comparison').innerText(), template);
  assert.match(await page.locator('.case-exception').innerText(), /Revisión individual documentada/);
  await page.getByRole('button', { name: 'Ver excepción de Lucía' }).click(); await page.getByLabel('Motivo e instrucciones del ejemplo').fill('Borrador que se descarta'); await page.getByRole('button', { name: 'Cerrar detalle' }).click();
  assert.doesNotMatch(await page.locator('.case-exception').innerText(), /Borrador que se descarta/);
  await page.reload(); assert.match(await page.locator('.affected-case').first().innerText(), /v1/); assert.equal(await page.locator('.exception-added').count(), 0);

  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await open(`${route}?tour=1`);
      if (await page.getByRole('dialog').isVisible()) await page.getByRole('button', { name: 'Cerrar detalle' }).click();
      assert.equal(await page.getByRole('button', { name: 'Cerrar guía' }).isVisible(), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Desbordamiento ${route} a ${width}px`);
      await page.getByRole('button', { name: 'Cerrar guía' }).click(); await page.getByRole('button', { name: 'Ver guía' }).click();
      if (route === '/gestion/cambios' && width === 390) await page.screenshot({ path: `${out}/revision-movil-gestion.png`, fullPage: true });
    }
  }
  assert.deepEqual(errors, []);
  const report = { fecha: '2026-09-17', resultado: 'correcto', navegador: 'Chrome headless', capturas: records, rutas: routes, anchosMoviles: [320, 390], pruebas: ['Documentos: filtros, subsanación, recibido distinto de validado, reinicio', 'Originales: preparación, incidencia, recepción pendiente de revisión y devolución', 'Práctica: respuesta incorrecta, puntuación única, cinco preguntas, repaso y reinicio', 'Consultas: mensaje local, reserva, controles visuales y resumen', 'Configurador: vista previa, orden, nuevo paso, revisión invalidada al editar, fecha y publicación', 'Cambios: aplicación explícita, progreso conservado, excepción individual y cancelación del borrador', 'Diez URLs: acceso directo, guía y ausencia de desbordamiento a 320 y 390 px', 'Sin errores de JavaScript'], limitacion: 'Demostraciones con estado local; no servicios reales conectados' };
  await writeFile(`${out}/procedencia.json`, JSON.stringify(report, null, 2) + '\n');
  await writeFile(fileURLToPath(new URL('./VERIFICACION-UI.json', import.meta.url)), JSON.stringify(report, null, 2) + '\n');
  console.log('6 capturas editoriales. Diez rutas e interacciones verificadas a 320 y 390 px.');
} finally { await browser.close(); }
