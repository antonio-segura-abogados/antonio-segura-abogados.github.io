import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../../', import.meta.url));
const out = `${root}vertical/diseno/presentacion`;
await mkdir(out, { recursive: true });
const book = JSON.parse(await readFile(`${root}vertical/src/generated/presentacion.json`, 'utf8'));
const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errors = [], failed = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  async function ready(number) { await page.locator('.book-current-slide').waitFor(); if (number) await page.waitForFunction(n => document.querySelector('.book-current-slide')?.getAttribute('alt')?.startsWith(`Página ${n}.`), number); await page.waitForFunction(() => { const img = document.querySelector('.book-current-slide'); return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0; }); await page.evaluate(() => document.fonts.ready); }
  await page.goto(`${base}/#/`); await ready();
  assert.equal(await page.locator('iframe,embed,object').count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Página anterior', exact: true }).isDisabled(), true);
  assert.equal(await page.locator('.book-thumbnails > button').count(), 24);
  await page.screenshot({ path: `${out}/inicio-escritorio.png`, fullPage: true });
  for (let n = 1; n <= 24; n++) {
    await ready(n); assert.match(await page.locator('.book-current-slide').getAttribute('alt'), new RegExp(`^Página ${n}\\.`));
    if (n < 24) await page.getByRole('button', { name: 'Página siguiente', exact: true }).click();
  }
  assert.equal(await page.getByRole('button', { name: 'Página siguiente', exact: true }).isDisabled(), true);
  await page.keyboard.press('Home'); await ready(1); assert.match(await page.locator('.book-current-slide').getAttribute('alt'), /^Página 1\./);
  await page.keyboard.press('ArrowRight'); await ready(2); assert.match(await page.locator('.book-current-slide').getAttribute('alt'), /^Página 2\./);
  await page.keyboard.press('End'); await ready(24); assert.match(await page.locator('.book-current-slide').getAttribute('alt'), /^Página 24\./);
  await page.getByRole('button', { name: 'Ver índice', exact: true }).click();
  assert.equal(await page.locator('.book-index-grid > button').count(), 24);
  await page.getByRole('button', { name: /^Abrir página 14:/ }).click(); await ready(14);
  assert.match(page.url(), /pagina=14/); assert.equal(await page.getByRole('dialog').count(), 0);
  await page.screenshot({ path: `${out}/pagina-14-escritorio.png`, fullPage: true });
  const demo = page.getByRole('link', { name: 'Probar esta idea' });
  assert.match(await demo.getAttribute('href'), /#\/documentos\?tour=1$/);
  await demo.click(); await page.locator('.device-frame').waitFor(); assert.equal(await page.getByRole('button', { name: 'Cerrar guía' }).isVisible(), true);
  await page.getByRole('link', { name: 'Volver a la presentación', exact: true }).click(); await ready();
  await page.getByRole('button', { name: /^Ir a página 23:/ }).click(); await ready(23);
  await page.getByRole('button', { name: 'Leer el texto de esta página' }).click(); assert.match(await page.locator('.book-transcript').innerText(), /psurrielm@gmail.com/);
  await page.reload(); await ready(23); assert.match(await page.locator('.book-current-slide').getAttribute('alt'), /^Página 23\./);
  await page.goto(`${base}/#/?pagina=999`); await ready(24); assert.match(await page.locator('.book-current-slide').getAttribute('alt'), /^Página 24\./);
  await page.goto(`${base}/#/?pagina=no`); await ready(1); assert.match(await page.locator('.book-current-slide').getAttribute('alt'), /^Página 1\./);
  const pdfPath = await page.getByRole('link', { name: 'Descargar librito' }).getAttribute('href');
  const pdf = await context.request.get(new URL(pdfPath, base).href); assert.equal(pdf.status(), 200); assert.equal((await pdf.body()).subarray(0,5).toString(), '%PDF-');
  for (const width of [320,390,768]) {
    await page.setViewportSize({ width,height:844 }); await page.goto(`${base}/#/?pagina=16`); await ready();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Ancho ${width}`);
    await page.getByRole('button', { name: 'Ver índice', exact: true }).click();
    assert.equal(await page.evaluate(() => { const d=document.querySelector('dialog[open]');return d.scrollWidth > d.clientWidth; }), false);
    await page.getByRole('button', { name: /^Abrir página 22:/ }).click(); await ready(22);
    await page.getByRole('button', { name: 'Ampliar', exact: true }).click();
    assert.equal(await page.locator('.book-zoom-scroll').isVisible(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').count(), 0);
    if (width===390) await page.screenshot({ path: `${out}/inicio-movil.png`, fullPage:true });
  }
  await page.setViewportSize({width:1440,height:1100});await page.goto(`${base}/#/?pagina=14`);await ready();await page.getByRole('button',{name:'Ver índice',exact:true}).click();
  await page.screenshot({path:`${out}/indice.png`,fullPage:true});
  const scenes = ['/entrevista','/opciones','/planes','/contratacion','/expediente','/expediente/pasos/documentacion','/documentos','/originales','/practica','/consultas','/consultas/sala-demo','/perfil','/gestion/rutas','/gestion/rutas/residencia-demo','/gestion/cambios','/gestion/expedientes/lucia-demo'];
  for (const route of scenes) {
    await page.goto(`${base}/#${route}?tour=1`);
    await page.locator('.client-screen').waitFor();
    assert.equal(await page.locator('.tour-panel').isVisible(), true, route);
    assert.equal(await page.getByRole('link', { name: 'Volver a la presentación', exact: true }).isVisible(), true, route);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  const report={fecha:'2026-09-17',base,version:pdfPath.match(/librito-([a-f0-9]+)\.pdf/)?.[1]||book.version,resultado:'correcto',paginas:24,anchos:[320,390,768,1440],escenasVerificadas:scenes,pruebas:['24 imágenes cargadas sin errores','navegación, límites y teclado','índice, miniaturas y enlace de página persistente al recargar','texto accesible y PDF descargable','acceso a la demo contextual con guía','ampliación con desplazamiento y cierre Escape','sin visor PDF insertado','16 escenas cargadas con guía y enlace de vuelta','sin desbordamiento horizontal ni errores JS'],capturas:['inicio-escritorio.png','pagina-14-escritorio.png','inicio-movil.png','indice.png']};
  await writeFile(`${out}/${base.includes('github.io')?'VERIFICACION-PUBLICA':'VERIFICACION'}.json`,JSON.stringify(report,null,2)+'\n');console.log('Presentación de 24 páginas verificada: navegación, índice, ampliación, móvil, texto, PDF y demos.');
} finally {await browser.close();}
