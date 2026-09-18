import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const book = JSON.parse(await readFile(new URL('../src/generated/presentacion.json', import.meta.url)));
const registry = JSON.parse(await readFile(new URL('../../recursos-compartidos/qr/destinos.json', import.meta.url)));
const urls = new Set([...registry.routes.map(item => item.qrUrl), ...registry.external.map(item => item.url)]);
const sizes = [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }, { width: 844, height: 390 }];
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errors = [];
try {
  const context = await browser.newContext();
  // Los destinos se interceptan: verificamos la pestaña y su URL sin depender de servicios externos.
  await context.route('https://**/*', route => route.fulfill({ body: 'Destino QR verificado' }));
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  async function ready(number) {
    await page.waitForFunction(n => {
      const img = document.querySelector('.book-current-slide');
      return img?.alt.startsWith(`Página ${n}.`) && img.complete && img.naturalWidth > 0;
    }, number);
    await page.evaluate(() => document.fonts.ready);
  }
  async function fits() {
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    for (const selector of ['.book-reader-top', '.book-reading-controls', '.book-reader-bottom']) {
      const box = await page.locator(selector).boundingBox();
      assert.ok(box.y >= 0 && box.y + box.height <= (await page.viewportSize()).height + 1, JSON.stringify({ selector, box, size: page.viewportSize(), reader: await page.locator('.book-reader').boundingBox() }));
    }
    assert.equal(await page.locator('.book-stage').evaluate(el => el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight), true);
  }
  for (const size of sizes) {
    await page.setViewportSize(size);
    await page.goto(`${base}/#/?pagina=14`); await ready(14);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.getByRole('link', { name: 'Ampliar', exact: true }).click(); await page.locator('.presentation-expanded').waitFor(); await ready(14);
    assert.match(page.url(), /#\/presentacion\?pagina=14$/);
    assert.equal(await page.getByRole('dialog').count(), 0);
    await fits();
    await page.screenshot({ path: `/private/tmp/asa-lectura-${size.width}.png` });
    await page.getByRole('button', { name: 'Acercar ×2' }).click();
    assert.equal(await page.locator('.book-stage').evaluate(el => el.scrollWidth > el.clientWidth), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.getByRole('button', { name: 'Leer el texto de esta página' }).click();
    assert.equal(await page.locator('#texto-pagina').isVisible(), true);
    assert.equal(await page.locator('.book-stage').evaluate(el => el.scrollWidth <= el.clientWidth), true);
    await page.getByRole('button', { name: 'Ocultar texto' }).click();
    await page.getByRole('button', { name: 'Ajustar página' }).click();
    await fits();
    await page.getByRole('button', { name: 'Página siguiente', exact: true }).click(); await ready(15);
    await page.reload(); await ready(15); await fits();
    await page.getByRole('button', { name: 'Ver índice', exact: true }).click();
    await page.getByRole('button', { name: /^Abrir página 22:/ }).click(); await ready(22);
    await page.keyboard.press('Home'); await ready(1);
    assert.equal(await page.getByRole('button', { name: 'Página anterior', exact: true }).isDisabled(), true);
    await page.keyboard.press('End'); await ready(24);
    assert.equal(await page.getByRole('button', { name: 'Página siguiente', exact: true }).isDisabled(), true);
    await page.getByRole('link', { name: 'Volver al inicio' }).click(); await page.locator('.book-header').waitFor(); await ready(24);
    assert.match(page.url(), /#\/\?pagina=24$/);
    await page.goBack(); await page.locator('.presentation-expanded').waitFor(); await ready(24);
    assert.match(page.url(), /#\/presentacion/);
    console.log(`Lectura responsive: ${size.width} × ${size.height}`);
  }
  for (const route of ['/', '/presentacion']) {
    for (const slide of book.slides) {
      await page.goto(`${base}/#${route}?pagina=${slide.numero}`); await ready(slide.numero);
      const qrUrl = slide.enlaces.find(url => urls.has(url));
      const expected = qrUrl?.startsWith('https://antonio-segura-abogados.github.io/')
        ? qrUrl.replace('https://antonio-segura-abogados.github.io', new URL(base).origin)
        : qrUrl;
      const link = page.locator('.book-slide-link');
      assert.equal(await link.count(), expected ? 1 : 0, `QR página ${slide.numero}`);
      if (!expected) continue;
      assert.equal(await link.getAttribute('href'), expected);
      const previous = page.url();
      const popupPromise = page.waitForEvent('popup');
      await link.click();
      const popup = await popupPromise;
      await popup.waitForLoadState('domcontentloaded');
      assert.equal(popup.url(), expected);
      assert.equal(await popup.evaluate(() => window.opener), null);
      assert.equal(page.url(), previous);
      await popup.close();
    }
  }
  await page.goto(`${base}/#/presentacion?pagina=3`); await ready(3);
  await page.locator('.book-slide-link').focus();
  const popupPromise = page.waitForEvent('popup');
  await page.keyboard.press('Enter');
  await (await popupPromise).close();
  assert.deepEqual(errors, []);
  await writeFile(new URL('../diseno/presentacion/VERIFICACION-LECTURA.json', import.meta.url), JSON.stringify({ fecha: '2026-09-18', resultado: 'correcto', base, tamaños: sizes, pruebas: ['Vista independiente, ajuste sin desbordamiento, zoom y texto accesible', 'Navegación, teclado, límites, índice, recarga, regreso y Atrás del navegador', '24 páginas en ambas vistas: los QR abren una pestaña nueva; las demos usan el origen local y los enlaces externos conservan su URL', 'Enlaces QR accesibles por teclado y sin window.opener', 'Sin errores JavaScript'], capturas: sizes.map(size => `/private/tmp/asa-lectura-${size.width}.png`) }, null, 2) + '\n');
} finally { await browser.close(); }
