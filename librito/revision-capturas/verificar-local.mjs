import { chromium } from '/private/tmp/asa-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const root = new URL('../../', import.meta.url);
const book = JSON.parse(await readFile(new URL('vertical/src/generated/presentacion.json', root)));
const base = process.env.ASA_DEMO_URL || 'http://127.0.0.1:5173';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errores = [], paginas = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', e => errores.push(e.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const numero of [8, 9, 16, 17]) {
      await page.goto(`${base}/#/presentacion?pagina=${numero}`);
      const img = page.locator('.book-current-slide');
      await img.waitFor();
      await img.evaluate(el => el.decode());
      const expected = book.slides[numero - 1];
      assert.ok((await img.getAttribute('src')).endsWith(expected.imagen));
      const response = await page.request.get(await img.evaluate(el => el.src));
      assert.equal(response.status(), 200);
      assert.equal(hash(await response.body()), hash(await readFile(new URL(`vertical/public/presentacion/${expected.imagen}`, root))));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (width === 1440) await page.screenshot({ path: new URL(`local-${numero}.png`, import.meta.url).pathname });
      paginas.push({ numero, width, imagen: expected.imagen, coincideConCompilacion: true });
    }
  }
  await page.goto(`${base}/#/`);
  const pdf = page.locator('a[href$=".pdf"]');
  const href = await pdf.getAttribute('href');
  assert.ok(href.endsWith(book.pdf));
  const response = await page.request.get(new URL(href, base).href);
  assert.equal(response.status(), 200);
  const sha256Pdf = hash(await response.body());
  assert.equal(sha256Pdf, hash(await readFile(new URL('librito/librito-final.pdf', root))));
  assert.equal(book.slides[15].variante, '02-tres-momentos');
  assert.deepEqual(errores, []);
  await writeFile(new URL('VERIFICACION-LOCAL.json', import.meta.url), JSON.stringify({ fecha: new Date().toISOString(), base, paginas, pdf: book.pdf, sha256Pdf, variante16: book.slides[15].variante, errores }, null, 2) + '\n');
  console.log('Visor a 1440/390 px y PDF descargable actualizados; variante 16 de tres capturas seleccionada.');
} finally { await browser.close(); }
