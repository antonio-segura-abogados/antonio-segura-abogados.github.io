// Revisión de modales, marco, registro y retirada de tutoriales.
// Dependencia de revisión: npm install --prefix /private/tmp/asa-browser playwright-core
import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { comprobarEntrevista } from '../entrevista/comprobar.mjs';

const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const captures = '/private/tmp/asa-revision-movil';
await mkdir(captures, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const routes = ['/entrevista', '/opciones', '/planes', '/contratacion', '/expediente', '/expediente/pasos/documentacion', '/documentos', '/originales', '/practica', '/consultas', '/consultas/sala-demo', '/perfil', '/gestion/rutas', '/gestion/rutas/residencia-demo', '/gestion/cambios', '/gestion/expedientes/lucia-demo'];
const sizes = [{ width: 1440, height: 1050 }, { width: 1280, height: 720 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 568 }];
const errors = [], checks = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.setDefaultTimeout(10000);
  async function open(route) {
    await page.goto('about:blank');
    await page.goto(`${base}/#${route}`);
    await page.locator('.scene-shell').waitFor();
    await page.evaluate(() => document.fonts.ready);
  }
  function inside(inner, outer) {
    assert.ok(inner.x >= outer.x - 1 && inner.y >= outer.y - 1 && inner.x + inner.width <= outer.x + outer.width + 1 && inner.y + inner.height <= outer.y + outer.height + 1, JSON.stringify({ inner, outer }));
  }
  async function assertModal(size) {
    const panel = page.getByRole('dialog');
    assert.equal(await panel.isVisible(), true);
    const boundary = size.width > 520 ? await page.locator('.device-viewport').boundingBox() : { x: 0, y: 0, ...size };
    inside(await page.locator('.scene-dialog-layer').boundingBox(), boundary);
    inside(await panel.boundingBox(), boundary);
    assert.equal(await panel.evaluate(el => el.scrollWidth <= el.clientWidth), true, 'El contenido del modal desborda');
    assert.equal(await page.locator('.client-screen').evaluate(el => el.inert), true);
    assert.equal(await page.getByRole('button', { name: 'Cerrar detalle' }).evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await panel.evaluate(el => el.contains(document.activeElement)), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.getByRole('button', { name: 'Cerrar detalle' }).evaluate(el => el === document.activeElement), true);
  }
  const modals = [
    ['/expediente', page.getByRole('button', { name: 'Ver qué falta' })],
    ['/opciones', page.locator('.option-card').first()],
    ['/planes', page.getByRole('button', { name: 'Elegir Acompañado' })],
    ['/documentos', page.getByRole('button', { name: /Subsanar Certificado de nacimiento/ })],
  ];
  for (const size of sizes) {
    await page.setViewportSize(size);
    for (const route of routes) {
      await open(`${route}?tour=1`);
      assert.equal(await page.locator('.tour-panel, .is-highlighted').count(), 0);
      assert.equal(await page.getByRole('button', { name: /Ver guía|Cerrar guía/ }).count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route}: ${size.width}px`);
      if (route === '/entrevista') {
        assert.equal(await page.getByRole('button', { name: 'Comenzar mi entrevista' }).isVisible(), true);
        assert.equal(await page.locator('.client-header').count(), 0);
      } else assert.equal(await page.locator('.client-header').count(), 1);
    }
    for (const [route, trigger] of modals) {
      await open(route);
      await trigger.click();
      await assertModal(size);
      if (route === '/expediente') {
        await page.screenshot({ path: `${captures}/modal-${size.width}.png`, fullPage: true });
        await page.getByRole('button', { name: 'Usar documento de ejemplo' }).click();
        assert.match(await page.getByRole('dialog').innerText(), /revisión del equipo sigue pendiente/);
      }
      if (route === '/opciones') {
        await page.getByRole('button', { name: 'Elegir para el ejemplo' }).click();
        assert.match(await page.locator('[role=status]').innerText(), /Pendiente de revisión/);
      } else if (route === '/planes') {
        await page.getByLabel('He revisado qué incluye el plan y su periodicidad.').check();
        await page.getByRole('button', { name: 'Simular contratación' }).click();
        assert.match(await page.getByRole('dialog').innerText(), /No se ha realizado ningún cobro/);
        // La confirmación retira el botón enfocado; Tab debe volver al modal.
        await page.keyboard.press('Tab');
        assert.equal(await page.getByRole('dialog').evaluate(el => el.contains(document.activeElement)), true);
        await page.keyboard.press('Escape');
      } else {
        if (route === '/documentos') await page.getByRole('button', { name: 'Usar copia completa de ejemplo' }).click();
        await page.keyboard.press('Escape');
      }
      assert.equal(await page.getByRole('dialog').count(), 0);
      assert.equal(await page.locator('.client-screen').evaluate(el => el.inert), false);
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
      if (route !== '/documentos') assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    }
    checks.push({ ...size, escenasSinTutorial: routes.length, modales: modals.length });
    console.log(`${size.width} × ${size.height}: 16 escenas y 4 modales correctos`);
  }
  await page.setViewportSize(sizes[0]);
  const entrevistas = await comprobarEntrevista(page, open, captures);

  await open('/expediente');
  await page.screenshot({ path: `${captures}/marco-completo.png`, fullPage: true });
  // Las cuatro esquinas se recortan contra el bisel, por encima de cualquier contenido.
  assert.equal(await page.locator('.device-viewport').evaluate(el => {
    const box = el.getBoundingClientRect();
    return [[box.left + 9, box.top + 9], [box.right - 9, box.top + 9], [box.left + 9, box.bottom - 9], [box.right - 9, box.bottom - 9]]
      .every(([x, y]) => document.elementFromPoint(x, y)?.classList.contains('device-frame'));
  }), true);
  await page.getByRole('button', { name: 'Ver qué falta' }).click();
  await page.setViewportSize(sizes[3]);
  await page.waitForFunction(() => document.body.style.overflow === 'hidden');
  inside(await page.getByRole('dialog').boundingBox(), { x: 0, y: 0, ...sizes[3] });
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
  await page.setViewportSize(sizes[0]);
  await page.waitForFunction(() => document.body.style.overflow === '');
  inside(await page.getByRole('dialog').boundingBox(), await page.locator('.device-viewport').boundingBox());
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');
  await page.getByRole('button', { name: 'Cerrar detalle' }).click();
  await page.getByRole('button', { name: 'Ver qué falta' }).click();
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  assert.equal(await page.getByRole('dialog').count(), 0);

  await open('/gestion/cambios');
  await page.getByRole('button', { name: 'Añadir excepción a Lucía' }).click();
  assert.equal(await page.locator('dialog:modal').count(), 1);
  await page.getByRole('button', { name: 'Guardar excepción de ejemplo' }).click();
  assert.equal(await page.locator('.exception-added').count(), 1);
  await page.goto(`${base}/#/`);
  await page.getByRole('button', { name: 'Ver índice' }).click();
  assert.equal(await page.locator('.book-dialog:modal').count(), 1);
  await page.keyboard.press('Escape');
  assert.deepEqual(errors, []);
  const report = { fecha: '2026-09-18', resultado: 'correcto', navegador: 'Chrome headless, perfil temporal', comprobaciones: checks, entrevistas, pruebas: ['Diálogos contenidos y sin desbordamiento; Escape, Tab y retorno de foco', 'Confirmación de plan, selección de opción y aportación documental', 'Recorte de las cuatro esquinas y redimensionado con modal abierto', 'Registro: objetivo inicial, cambio, entrevista, reinicio y recarga; sin header solo en /entrevista', 'Diálogos nativos de gestión y libro conservados', 'Sin tutoriales incluso con los enlaces anteriores ?tour=1', "Selectores a 1440, 390 y 320 px: provincia válida, tildes, teclado y nacionalidad múltiple", "España excluida al solicitar nacionalidad y disponible para reunión familiar; ciudadanía derivada", "Edición con vuelta directa al resumen, conservación de datos pertinentes y nuevas preguntas pendientes", "Dos acciones finales y confirmación de envío expresamente simulada", 'Sin errores JavaScript'], capturasLocales: captures };
  await writeFile(new URL('./VERIFICACION.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log('Revisión completada sin errores.');
} finally { await browser.close(); }
