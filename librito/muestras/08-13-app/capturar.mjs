// Captura el mismo marco HTML/CSS y las mismas escenas que ve el lector del QR.
// Dependencia de revisión externa: npm install --prefix /private/tmp/asa-browser playwright-core
import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const out = `${root}recursos-compartidos/assets/demo/08-13`;
await mkdir(out, { recursive: true });
const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errors = [];
const records = [];
try {
  const context = await browser.newContext({ viewport: { width: 1200, height: 1100 }, deviceScaleFactor: 3 });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  async function open(route) { await page.goto('about:blank'); await page.goto(`${base}/#${route}`); await page.locator('.device-frame').waitFor(); await page.evaluate(() => document.fonts.ready); }
  async function capture(name, route, prepare) {
    await open(route);
    if (prepare) await prepare();
    await page.addStyleTag({ content: '.scene-shell { background: transparent; } .device-frame { box-shadow: none; } html,body { background: transparent; }' });
    await page.locator('[data-capture="phone"]').screenshot({ path: `${out}/${name}.png`, omitBackground: true });
    records.push({ archivo: `${name}.png`, ruta: route, origen: 'Captura de React en Chrome; móvil HTML/CSS compartido', escala: 3 });
  }
  await capture('08-objetivo', '/entrevista?vista=objetivo');
  await capture('09-entrevista', '/entrevista', async () => { await page.getByRole('button', { name: 'Comenzar mi entrevista' }).click(); });
  await capture('10-opciones', '/opciones');
  await capture('11-planes', '/planes');
  await capture('11-contratacion', '/contratacion');
  await capture('12-seguimiento', '/expediente');
  await capture('13-documentacion', '/expediente/pasos/documentacion');

  // Las ramas completas se prueban en vertical/diseno/entrevista/comprobar.mjs.
  await open('/entrevista?tour=1');
  await page.getByRole('button', { name: 'Comenzar mi entrevista' }).click();
  assert.equal(await page.getByRole('button', { name: 'Continuar', exact: true }).isDisabled(), true);
  await page.getByRole('radio', { name: 'No, estoy en otro país', exact: true }).check();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  assert.equal(await page.locator('[data-question]').getAttribute('data-question'), 'country');
  await page.getByRole('checkbox').check();
  assert.equal(await page.locator('#country').isDisabled(), true);
  await page.getByRole('button', { name: 'Volver a la pregunta anterior' }).click();
  assert.equal(await page.getByRole('radio', { name: 'No, estoy en otro país', exact: true }).isChecked(), true);
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Comenzar mi entrevista' }).isVisible(), true);

  await open('/opciones');
  await page.getByRole('button', { name: /A estudiar Nacionalidad/ }).click();
  assert.match(await page.getByRole('dialog').innerText(), /No es el tiempo de resolución/);
  await page.getByRole('button', { name: 'Elegir para el ejemplo' }).click();
  assert.match(await page.locator('[role=status]').innerText(), /Pendiente de revisión/);

  await open('/planes');
  await page.getByRole('button', { name: 'Anual · ahorra 2 meses' }).click();
  const prices = await page.locator('.plan-price').allTextContents();
  assert.match(prices[0], /190/); assert.match(prices[1], /290/);
  const annual = await page.locator('.annual-note').allTextContents();
  assert.match(annual[0], /15,83/); assert.match(annual[0], /38/);
  assert.match(annual[1], /24,17/); assert.match(annual[1], /58/);
  await page.getByRole('button', { name: 'Elegir Acompañado' }).click();
  assert.match(await page.locator('.checkout-total').innerText(), /290/);
  const confirm = page.getByRole('button', { name: 'Simular contratación' });
  assert.equal(await confirm.isDisabled(), true);
  await page.getByLabel('He revisado qué incluye el plan y su periodicidad.').check();
  await confirm.click();
  assert.match(await page.locator('.purchase-confirmation').innerText(), /No se ha realizado ningún cobro/);
  await page.getByRole('button', { name: 'Cerrar detalle' }).click();
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  assert.match((await page.locator('.plan-price').allTextContents())[1], /29\s*€\/mes/);

  await open('/expediente');
  await page.getByRole('button', { name: 'Ver qué falta' }).click();
  await page.getByRole('button', { name: 'Usar documento de ejemplo' }).click();
  assert.match(await page.locator('.review-message').innerText(), /revisión del equipo sigue pendiente/);
  await page.getByRole('button', { name: 'Cerrar detalle' }).click();
  await open('/expediente/pasos/documentacion?tour=1');
  assert.match(await page.locator('.document-list').innerText(), /Pendiente/);
  await page.getByRole('button', { name: 'Usar documento de ejemplo' }).click();
  assert.equal(await page.getByRole('button', { name: 'Ejemplo recibido' }).isDisabled(), true);
  await page.reload();
  assert.match(await page.locator('.document-list').innerText(), /Pendiente/);

  // Entrada directa y ancho móvil: ninguna escena depende de la anterior.
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/entrevista', '/opciones', '/planes', '/contratacion', '/expediente', '/expediente/pasos/documentacion']) {
      await open(`${route}?tour=1`);
      assert.equal(await page.locator('.tour-panel').count(), 0);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `Desbordamiento ${route} a ${width}px`);
    }
  }
  assert.deepEqual(errors, []);
  const report = { fecha: new Date().toISOString().slice(0, 10), navegador: 'Chrome headless, perfil temporal', capturas: records, pruebas: ['entrevista: elección de objetivo, entrada desde el exterior, respuesta desconocida, vuelta atrás y reinicio', 'opciones: detalle y selección', 'planes: importes mensual/anual, redondeo, resumen y confirmación', 'documentación: recibido distinto de revisado, aislamiento y recarga', 'seis URLs: acceso directo sin tutoriales a 320 y 390 px', 'sin errores de JavaScript ni desbordamientos horizontales'], resultado: 'correcto' };
  await writeFile(`${out}/procedencia.json`, JSON.stringify(report, null, 2) + '\n');
  await writeFile(fileURLToPath(new URL('./VERIFICACION-UI.json', import.meta.url)), JSON.stringify(report, null, 2) + '\n');
  console.log('7 capturas reales; interacciones, importes y móvil verificados.');
} finally { await browser.close(); }
